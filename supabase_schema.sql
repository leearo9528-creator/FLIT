-- ⚠️ 기존 테이블 전체 삭제 후 재생성 ⚠️
DROP TABLE IF EXISTS public.company_reviews CASCADE;
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.scraps CASCADE;
DROP TABLE IF EXISTS public.recruitments CASCADE;
DROP TABLE IF EXISTS public.organizers CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;


-- ────────────────────────────────────────────────
-- 1. 프로필
-- ────────────────────────────────────────────────
CREATE TABLE public.profiles (
  id                   UUID REFERENCES auth.users(id) PRIMARY KEY,
  email                TEXT UNIQUE NOT NULL,
  name                 TEXT,
  avatar_url           TEXT,

  -- 셀러 유형 (일반셀러 / 푸드트럭)
  seller_type          TEXT CHECK (seller_type IN ('seller', 'foodtruck')),

  -- 구독 관련
  is_subscribed        BOOLEAN DEFAULT false,
  subscription_date    TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,        -- 구독 만료일
  has_free_trial_used  BOOLEAN DEFAULT false,

  -- 리뷰 카운트 (트리거로 관리)
  review_count         INT DEFAULT 0,

  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- 트리거: 신규 유저 가입 시 profiles 자동 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ────────────────────────────────────────────────
-- 2. 행사/장소
-- ────────────────────────────────────────────────
CREATE TABLE public.events (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT UNIQUE NOT NULL,
  location         TEXT,           -- 상세 주소 (예: 서울 영등포구 여의도동)
  location_sido    TEXT,           -- 시/도 (예: 서울, 경기) — 필터용
  category         TEXT,           -- 플리마켓, 푸드트럭, 팝업 등
  image_url        TEXT,

  -- 리뷰 통계 (트리거로 자동 갱신)
  average_profit   FLOAT DEFAULT 0.0,
  average_traffic  FLOAT DEFAULT 0.0,
  total_reviews    INT DEFAULT 0,

  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 3. 주최측/기획사
-- ────────────────────────────────────────────────
CREATE TABLE public.organizers (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT UNIQUE NOT NULL,
  description      TEXT,
  logo_url         TEXT,

  -- 리뷰 통계 (트리거로 자동 갱신)
  average_support  FLOAT DEFAULT 0.0,
  average_manners  FLOAT DEFAULT 0.0,
  total_reviews    INT DEFAULT 0,

  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 4. 모집 공고
-- ────────────────────────────────────────────────
CREATE TABLE public.recruitments (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id      UUID REFERENCES public.events(id) ON DELETE CASCADE,
  organizer_id  UUID REFERENCES public.organizers(id) ON DELETE CASCADE,

  title         TEXT NOT NULL,
  content       TEXT NOT NULL,
  fee           INT NOT NULL DEFAULT 0,

  start_date    TIMESTAMPTZ NOT NULL,
  end_date      TIMESTAMPTZ NOT NULL,
  event_date    TIMESTAMPTZ NOT NULL,

  status        TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 5. 리뷰
-- ────────────────────────────────────────────────
CREATE TABLE public.company_reviews (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

  event_id       UUID REFERENCES public.events(id) ON DELETE CASCADE,
  organizer_id   UUID REFERENCES public.organizers(id) ON DELETE SET NULL,

  -- 셀러 유형 (리뷰 작성 시점 기준)
  seller_type    TEXT CHECK (seller_type IN ('seller', 'foodtruck')),

  -- 행사/장소 평가
  rating_profit  INT CHECK (rating_profit BETWEEN 1 AND 5),
  rating_traffic INT CHECK (rating_traffic BETWEEN 1 AND 5),

  -- 주최측 평가
  rating_support INT CHECK (rating_support BETWEEN 1 AND 5),
  rating_manners INT CHECK (rating_manners BETWEEN 1 AND 5),

  title          TEXT,
  content        TEXT,
  pros           TEXT,
  cons           TEXT,

  is_verified    BOOLEAN DEFAULT false,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- 트리거 함수: 리뷰 생성/삭제 시 통계 재계산
CREATE OR REPLACE FUNCTION public.recalc_review_stats()
RETURNS TRIGGER AS $$
DECLARE
  v_event_id UUID;
  v_organizer_id UUID;
  v_user_id UUID;
BEGIN
  -- INSERT면 new, DELETE면 old 사용
  IF TG_OP = 'DELETE' THEN
    v_event_id     := OLD.event_id;
    v_organizer_id := OLD.organizer_id;
    v_user_id      := OLD.user_id;
  ELSE
    v_event_id     := NEW.event_id;
    v_organizer_id := NEW.organizer_id;
    v_user_id      := NEW.user_id;
  END IF;

  -- 1) 유저 review_count 갱신
  UPDATE public.profiles
  SET review_count = (
    SELECT COUNT(*) FROM public.company_reviews WHERE user_id = v_user_id
  )
  WHERE id = v_user_id;

  -- 2) 행사 통계 갱신
  UPDATE public.events
  SET
    total_reviews   = (SELECT COUNT(*)      FROM public.company_reviews WHERE event_id = v_event_id),
    average_profit  = (SELECT COALESCE(AVG(rating_profit),  0) FROM public.company_reviews WHERE event_id = v_event_id),
    average_traffic = (SELECT COALESCE(AVG(rating_traffic), 0) FROM public.company_reviews WHERE event_id = v_event_id)
  WHERE id = v_event_id;

  -- 3) 주최측 통계 갱신
  IF v_organizer_id IS NOT NULL THEN
    UPDATE public.organizers
    SET
      total_reviews    = (SELECT COUNT(*)     FROM public.company_reviews WHERE organizer_id = v_organizer_id),
      average_support  = (SELECT COALESCE(AVG(rating_support), 0) FROM public.company_reviews WHERE organizer_id = v_organizer_id),
      average_manners  = (SELECT COALESCE(AVG(rating_manners), 0) FROM public.company_reviews WHERE organizer_id = v_organizer_id)
    WHERE id = v_organizer_id;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_review_changed ON public.company_reviews;
CREATE TRIGGER on_review_changed
  AFTER INSERT OR DELETE ON public.company_reviews
  FOR EACH ROW EXECUTE PROCEDURE public.recalc_review_stats();


-- ────────────────────────────────────────────────
-- 6. 스크랩 (유저 ↔ 공고 즐겨찾기)
-- ────────────────────────────────────────────────
CREATE TABLE public.scraps (
  user_id         UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  recruitment_id  UUID REFERENCES public.recruitments(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, recruitment_id)
);


-- ────────────────────────────────────────────────
-- 7. 커뮤니티 게시글
-- ────────────────────────────────────────────────
CREATE TABLE public.posts (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- 행사 연결 (선택)
  event_id        UUID REFERENCES public.events(id) ON DELETE SET NULL,

  title           TEXT NOT NULL,
  content         TEXT NOT NULL,
  category        TEXT NOT NULL,  -- '실시간 현황', '자유게시판', '질문/답변' 등

  -- 위치 (실시간 현황 전용)
  location        TEXT,

  -- 셀러 유형
  seller_type     TEXT CHECK (seller_type IN ('seller', 'foodtruck')),

  -- 익명 처리
  is_anonymous    BOOLEAN DEFAULT false,
  anonymous_name  TEXT,

  -- 통계
  likes           INT DEFAULT 0,

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- RLS 정책
-- ────────────────────────────────────────────────

-- profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "events_select" ON public.events;
CREATE POLICY "events_select" ON public.events FOR SELECT USING (true);

-- organizers
ALTER TABLE public.organizers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "organizers_select" ON public.organizers;
CREATE POLICY "organizers_select" ON public.organizers FOR SELECT USING (true);

-- recruitments
ALTER TABLE public.recruitments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "recruitments_select" ON public.recruitments;
CREATE POLICY "recruitments_select" ON public.recruitments FOR SELECT USING (true);

-- company_reviews
ALTER TABLE public.company_reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "reviews_select" ON public.company_reviews;
DROP POLICY IF EXISTS "reviews_insert" ON public.company_reviews;
DROP POLICY IF EXISTS "reviews_update" ON public.company_reviews;
DROP POLICY IF EXISTS "reviews_delete" ON public.company_reviews;
CREATE POLICY "reviews_select" ON public.company_reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert" ON public.company_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews_update" ON public.company_reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "reviews_delete" ON public.company_reviews FOR DELETE USING (auth.uid() = user_id);

-- posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "posts_select" ON public.posts;
DROP POLICY IF EXISTS "posts_insert" ON public.posts;
DROP POLICY IF EXISTS "posts_update" ON public.posts;
DROP POLICY IF EXISTS "posts_delete" ON public.posts;
CREATE POLICY "posts_select" ON public.posts FOR SELECT USING (true);
CREATE POLICY "posts_insert" ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "posts_update" ON public.posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "posts_delete" ON public.posts FOR DELETE USING (auth.uid() = user_id);

-- scraps
ALTER TABLE public.scraps ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "scraps_select" ON public.scraps;
DROP POLICY IF EXISTS "scraps_insert" ON public.scraps;
DROP POLICY IF EXISTS "scraps_delete" ON public.scraps;
CREATE POLICY "scraps_select" ON public.scraps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "scraps_insert" ON public.scraps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "scraps_delete" ON public.scraps FOR DELETE USING (auth.uid() = user_id);
