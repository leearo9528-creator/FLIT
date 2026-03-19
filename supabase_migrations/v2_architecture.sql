-- ═══════════════════════════════════════════════════════════════
-- FLIT v2 Architecture Migration
-- BaseEvent + EventInstance 분리 구조
-- ⚠️  기존 events, company_reviews, recruitments 데이터가 삭제됩니다.
-- ═══════════════════════════════════════════════════════════════

-- ── 1. 기존 이벤트 관련 테이블 삭제 ──────────────────────────
DROP TABLE IF EXISTS public.reviews         CASCADE;
DROP TABLE IF EXISTS public.company_reviews CASCADE;
DROP TABLE IF EXISTS public.recruitments    CASCADE;
DROP TABLE IF EXISTS public.events          CASCADE;
DROP TABLE IF EXISTS public.event_instances CASCADE;
DROP TABLE IF EXISTS public.base_events     CASCADE;

-- organizers는 유지하되 컬럼 정리
ALTER TABLE public.organizers
  DROP COLUMN IF EXISTS average_support,
  DROP COLUMN IF EXISTS average_manners,
  DROP COLUMN IF EXISTS total_reviews;

ALTER TABLE public.organizers
  ADD COLUMN IF NOT EXISTS avg_support    FLOAT   DEFAULT 0,
  ADD COLUMN IF NOT EXISTS avg_manners    FLOAT   DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_reviews  INT     DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_instances INT    DEFAULT 0;


-- ── 2. base_events — 행사 원형 ────────────────────────────────
-- "광화문 벼룩시장"이라는 행사 자체의 정체성
CREATE TABLE public.base_events (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name            TEXT UNIQUE NOT NULL,
  category        TEXT,        -- 플리마켓 / 푸드트럭페스티벌 / 팝업마켓 / 복합문화행사
  description     TEXT,
  image_url       TEXT,

  -- 모든 instance를 종합한 '행사 브랜드' 통계 (트리거 관리)
  avg_event_rating  FLOAT  DEFAULT 0,   -- 전체 rating_profit, rating_traffic 평균
  total_reviews     INT    DEFAULT 0,
  total_instances   INT    DEFAULT 0,

  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ── 3. event_instances — 개최 실체 ───────────────────────────
-- 특정 주최사가 특정 날짜·장소에서 여는 행사 1회
CREATE TABLE public.event_instances (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  base_event_id   UUID REFERENCES public.base_events(id)  ON DELETE CASCADE,
  organizer_id    UUID REFERENCES public.organizers(id)   ON DELETE SET NULL,

  location        TEXT,
  location_sido   TEXT,     -- 필터용 시/도
  event_date      DATE,
  event_date_end  DATE,     -- 멀티데이 행사용

  -- 이 개최 건에 대한 통계 (트리거 관리)
  avg_event_rating      FLOAT  DEFAULT 0,
  avg_organizer_rating  FLOAT  DEFAULT 0,
  review_count          INT    DEFAULT 0,

  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ── 4. recruitments — 모집공고 ────────────────────────────────
-- event_instance 에 종속
CREATE TABLE public.recruitments (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_instance_id UUID REFERENCES public.event_instances(id) ON DELETE CASCADE,

  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  fee         INT  DEFAULT 0,

  start_date  TIMESTAMPTZ,
  end_date    TIMESTAMPTZ,
  status      TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED')),

  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ── 5. reviews — 리뷰 ────────────────────────────────────────
-- event_instance를 대상으로 작성
-- 행사 점수(profit/traffic) + 주최사 점수(support/manners) 이원화
CREATE TABLE public.reviews (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_instance_id UUID REFERENCES public.event_instances(id) ON DELETE CASCADE,
  user_id           UUID REFERENCES public.profiles(id)        ON DELETE CASCADE,

  seller_type TEXT CHECK (seller_type IN ('seller', 'foodtruck')),

  -- 행사 내용 평가 → base_event 통계에 반영
  rating_profit   INT CHECK (rating_profit  BETWEEN 1 AND 5),
  rating_traffic  INT CHECK (rating_traffic BETWEEN 1 AND 5),

  -- 주최사 운영 평가 → organizer 통계에 반영
  rating_support  INT CHECK (rating_support BETWEEN 1 AND 5),
  rating_manners  INT CHECK (rating_manners BETWEEN 1 AND 5),

  revenue_range TEXT,
  title         TEXT,
  content       TEXT,
  pros          TEXT,
  cons          TEXT,
  is_verified   BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);


-- ── 6. 통계 트리거 ────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.recalc_review_stats_v2()
RETURNS TRIGGER AS $$
DECLARE
  v_instance_id   UUID;
  v_base_event_id UUID;
  v_organizer_id  UUID;
BEGIN
  v_instance_id := CASE WHEN TG_OP = 'DELETE' THEN OLD.event_instance_id ELSE NEW.event_instance_id END;
  IF v_instance_id IS NULL THEN RETURN COALESCE(NEW, OLD); END IF;

  -- event_instances 통계
  UPDATE public.event_instances SET
    avg_event_rating = (
      SELECT COALESCE(AVG((COALESCE(rating_profit,0) + COALESCE(rating_traffic,0)) / 2.0), 0)
      FROM public.reviews WHERE event_instance_id = v_instance_id
        AND (rating_profit IS NOT NULL OR rating_traffic IS NOT NULL)
    ),
    avg_organizer_rating = (
      SELECT COALESCE(AVG((COALESCE(rating_support,0) + COALESCE(rating_manners,0)) / 2.0), 0)
      FROM public.reviews WHERE event_instance_id = v_instance_id
        AND (rating_support IS NOT NULL OR rating_manners IS NOT NULL)
    ),
    review_count = (SELECT COUNT(*) FROM public.reviews WHERE event_instance_id = v_instance_id)
  WHERE id = v_instance_id;

  -- base_events 통계
  SELECT base_event_id, organizer_id INTO v_base_event_id, v_organizer_id
  FROM public.event_instances WHERE id = v_instance_id;

  IF v_base_event_id IS NOT NULL THEN
    UPDATE public.base_events SET
      avg_event_rating = (
        SELECT COALESCE(AVG((COALESCE(r.rating_profit,0) + COALESCE(r.rating_traffic,0)) / 2.0), 0)
        FROM public.reviews r
        JOIN public.event_instances ei ON r.event_instance_id = ei.id
        WHERE ei.base_event_id = v_base_event_id
          AND (r.rating_profit IS NOT NULL OR r.rating_traffic IS NOT NULL)
      ),
      total_reviews = (
        SELECT COUNT(*) FROM public.reviews r
        JOIN public.event_instances ei ON r.event_instance_id = ei.id
        WHERE ei.base_event_id = v_base_event_id
      )
    WHERE id = v_base_event_id;
  END IF;

  -- organizers 통계
  IF v_organizer_id IS NOT NULL THEN
    UPDATE public.organizers SET
      avg_support = (
        SELECT COALESCE(AVG(r.rating_support), 0)
        FROM public.reviews r
        JOIN public.event_instances ei ON r.event_instance_id = ei.id
        WHERE ei.organizer_id = v_organizer_id AND r.rating_support IS NOT NULL
      ),
      avg_manners = (
        SELECT COALESCE(AVG(r.rating_manners), 0)
        FROM public.reviews r
        JOIN public.event_instances ei ON r.event_instance_id = ei.id
        WHERE ei.organizer_id = v_organizer_id AND r.rating_manners IS NOT NULL
      ),
      total_reviews = (
        SELECT COUNT(*) FROM public.reviews r
        JOIN public.event_instances ei ON r.event_instance_id = ei.id
        WHERE ei.organizer_id = v_organizer_id
      )
    WHERE id = v_organizer_id;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_review_v2 ON public.reviews;
CREATE TRIGGER on_review_v2
  AFTER INSERT OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE PROCEDURE public.recalc_review_stats_v2();


-- instance 수 트리거
CREATE OR REPLACE FUNCTION public.recalc_instance_count()
RETURNS TRIGGER AS $$
DECLARE v_base UUID; v_org UUID;
BEGIN
  v_base := CASE WHEN TG_OP = 'DELETE' THEN OLD.base_event_id ELSE NEW.base_event_id END;
  v_org  := CASE WHEN TG_OP = 'DELETE' THEN OLD.organizer_id  ELSE NEW.organizer_id  END;

  IF v_base IS NOT NULL THEN
    UPDATE public.base_events SET
      total_instances = (SELECT COUNT(*) FROM public.event_instances WHERE base_event_id = v_base)
    WHERE id = v_base;
  END IF;

  IF v_org IS NOT NULL THEN
    UPDATE public.organizers SET
      total_instances = (SELECT COUNT(*) FROM public.event_instances WHERE organizer_id = v_org)
    WHERE id = v_org;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_instance_count ON public.event_instances;
CREATE TRIGGER on_instance_count
  AFTER INSERT OR DELETE ON public.event_instances
  FOR EACH ROW EXECUTE PROCEDURE public.recalc_instance_count();


-- ── 7. 인덱스 ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_instances_base_event  ON public.event_instances(base_event_id);
CREATE INDEX IF NOT EXISTS idx_instances_organizer   ON public.event_instances(organizer_id);
CREATE INDEX IF NOT EXISTS idx_instances_event_date  ON public.event_instances(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_recruitments_instance ON public.recruitments(event_instance_id);
CREATE INDEX IF NOT EXISTS idx_recruitments_status   ON public.recruitments(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_instance      ON public.reviews(event_instance_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_created       ON public.reviews(created_at DESC);
