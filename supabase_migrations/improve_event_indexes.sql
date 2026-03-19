-- ────────────────────────────────────────────────────────────────
-- DB 구조 개선: events 중심 데이터 조회 최적화
-- 실행 위치: Supabase Dashboard > SQL Editor
-- ────────────────────────────────────────────────────────────────

-- 1. events 테이블에 캐시 컬럼 추가
--    - latest_review_at : 최신 리뷰 기준 정렬용
--    - open_recruitment_count : 모집중 공고 수 (필터용)
ALTER TABLE public.events
    ADD COLUMN IF NOT EXISTS latest_review_at   TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS open_recruitment_count INT DEFAULT 0;

-- 2. 기존 데이터 초기화
UPDATE public.events e
SET
    latest_review_at = (
        SELECT MAX(created_at) FROM public.company_reviews WHERE event_id = e.id
    ),
    open_recruitment_count = (
        SELECT COUNT(*) FROM public.recruitments WHERE event_id = e.id AND status = 'OPEN'
    );

-- 3. 인덱스 추가 (조회 성능)
CREATE INDEX IF NOT EXISTS idx_reviews_event_created    ON public.company_reviews(event_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_seller_type      ON public.company_reviews(seller_type);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at       ON public.company_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recruitments_status      ON public.recruitments(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recruitments_event_id    ON public.recruitments(event_id);

-- 4. 리뷰 통계 트리거에 latest_review_at, open_recruitment_count 갱신 추가
CREATE OR REPLACE FUNCTION public.recalc_event_cache()
RETURNS TRIGGER AS $$
DECLARE v_event_id UUID;
BEGIN
    v_event_id := CASE WHEN TG_OP = 'DELETE' THEN OLD.event_id ELSE NEW.event_id END;
    IF v_event_id IS NULL THEN RETURN COALESCE(NEW, OLD); END IF;

    UPDATE public.events
    SET latest_review_at = (
        SELECT MAX(created_at) FROM public.company_reviews WHERE event_id = v_event_id
    )
    WHERE id = v_event_id;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_review_cache ON public.company_reviews;
CREATE TRIGGER on_review_cache
    AFTER INSERT OR DELETE ON public.company_reviews
    FOR EACH ROW EXECUTE PROCEDURE public.recalc_event_cache();

-- 5. 공고 상태 변경 시 open_recruitment_count 갱신
CREATE OR REPLACE FUNCTION public.recalc_recruitment_count()
RETURNS TRIGGER AS $$
DECLARE v_event_id UUID;
BEGIN
    v_event_id := CASE WHEN TG_OP = 'DELETE' THEN OLD.event_id ELSE NEW.event_id END;
    IF v_event_id IS NULL THEN RETURN COALESCE(NEW, OLD); END IF;

    UPDATE public.events
    SET open_recruitment_count = (
        SELECT COUNT(*) FROM public.recruitments WHERE event_id = v_event_id AND status = 'OPEN'
    )
    WHERE id = v_event_id;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_recruitment_count ON public.recruitments;
CREATE TRIGGER on_recruitment_count
    AFTER INSERT OR UPDATE OF status OR DELETE ON public.recruitments
    FOR EACH ROW EXECUTE PROCEDURE public.recalc_recruitment_count();
