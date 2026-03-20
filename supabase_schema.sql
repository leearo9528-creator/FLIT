-- ═══════════════════════════════════════════════════════════════
-- FLIT 메인 스키마 (V2)
-- base_events + event_instances 분리 구조
-- ═══════════════════════════════════════════════════════════════

-- ────────────────────────────────────────────────
-- 0. 기존 테이블 초기화 (순서 주의: FK 역순)
-- ────────────────────────────────────────────────
DROP TABLE IF EXISTS public.post_comments  CASCADE;
DROP TABLE IF EXISTS public.posts          CASCADE;
DROP TABLE IF EXISTS public.scraps         CASCADE;
DROP TABLE IF EXISTS public.reviews        CASCADE;
DROP TABLE IF EXISTS public.recruitments   CASCADE;
DROP TABLE IF EXISTS public.event_instances CASCADE;
DROP TABLE IF EXISTS public.base_events    CASCADE;
DROP TABLE IF EXISTS public.organizers     CASCADE;
DROP TABLE IF EXISTS public.profiles       CASCADE;


-- ────────────────────────────────────────────────
-- 1. profiles
-- ────────────────────────────────────────────────
CREATE TABLE public.profiles (
    id                    UUID REFERENCES auth.users(id) PRIMARY KEY,
    email                 TEXT UNIQUE NOT NULL,
    name                  TEXT,
    avatar_url            TEXT,

    -- 셀러 유형 (리뷰/게시글 표시용)
    seller_type           TEXT CHECK (seller_type IN ('seller', 'foodtruck')),

    -- 멤버십 플랜
    plan                  TEXT DEFAULT 'free' CHECK (plan IN ('free', 'flea_market', 'foodtruck', 'organizer')),

    -- 주최사 표시 이름 (plan = 'organizer'일 때 organizers.name 초기값)
    organizer_name        TEXT,

    -- 구독 관련
    is_subscribed         BOOLEAN DEFAULT false,
    subscription_date     TIMESTAMPTZ,
    subscription_end_date TIMESTAMPTZ,
    has_free_trial_used   BOOLEAN DEFAULT false,

    -- 리뷰 카운트 (트리거 관리)
    review_count          INT DEFAULT 0,

    created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- 신규 가입 시 profiles 자동 생성
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
-- 2. organizers
-- ────────────────────────────────────────────────
CREATE TABLE public.organizers (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name            TEXT,
    description     TEXT,
    logo_url        TEXT,

    -- 통계 (트리거 관리)
    avg_support     FLOAT   DEFAULT 0,
    avg_manners     FLOAT   DEFAULT 0,
    total_reviews   INT     DEFAULT 0,
    total_instances INT     DEFAULT 0,

    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- plan = 'organizer' 설정 시 organizers 레코드 자동 생성
CREATE OR REPLACE FUNCTION public.handle_organizer_plan()
RETURNS TRIGGER AS $$
DECLARE
    v_name TEXT;
BEGIN
    IF NEW.plan = 'organizer' THEN
        SELECT COALESCE(
            NEW.organizer_name,
            (SELECT raw_user_meta_data->>'full_name' FROM auth.users WHERE id = NEW.id),
            (SELECT raw_user_meta_data->>'name'      FROM auth.users WHERE id = NEW.id),
            (SELECT split_part(email, '@', 1)        FROM auth.users WHERE id = NEW.id),
            '주최사'
        ) INTO v_name;

        INSERT INTO public.organizers (id, name)
        VALUES (NEW.id, v_name)
        ON CONFLICT (id) DO UPDATE
            SET name = EXCLUDED.name
            WHERE public.organizers.name IS NULL OR public.organizers.name = '';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_plan_organizer ON public.profiles;
CREATE TRIGGER on_profile_plan_organizer
    AFTER INSERT OR UPDATE OF plan ON public.profiles
    FOR EACH ROW
    WHEN (NEW.plan = 'organizer')
    EXECUTE FUNCTION public.handle_organizer_plan();


-- ────────────────────────────────────────────────
-- 3. base_events — 행사 브랜드 원형
-- ────────────────────────────────────────────────
CREATE TABLE public.base_events (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name            TEXT UNIQUE NOT NULL,
    category        TEXT,         -- 플리마켓 / 푸드트럭페스티벌 / 팝업마켓 / 복합문화행사
    description     TEXT,
    image_url       TEXT,

    -- 통계 (트리거 관리)
    avg_event_rating  FLOAT  DEFAULT 0,
    total_reviews     INT    DEFAULT 0,
    total_instances   INT    DEFAULT 0,

    created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 4. event_instances — 개최 실체 (1회)
-- ────────────────────────────────────────────────
CREATE TABLE public.event_instances (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    base_event_id   UUID REFERENCES public.base_events(id)  ON DELETE CASCADE,
    organizer_id    UUID REFERENCES public.organizers(id)   ON DELETE SET NULL,

    location        TEXT,
    location_sido   TEXT,
    event_date      DATE,
    event_date_end  DATE,

    -- 통계 (트리거 관리)
    avg_event_rating      FLOAT  DEFAULT 0,
    avg_organizer_rating  FLOAT  DEFAULT 0,
    review_count          INT    DEFAULT 0,

    created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 5. recruitments — 모집공고
-- ────────────────────────────────────────────────
CREATE TABLE public.recruitments (
    id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_instance_id UUID REFERENCES public.event_instances(id) ON DELETE CASCADE,

    title              TEXT NOT NULL,
    content            TEXT,
    fee                INT  DEFAULT 0,
    application_method TEXT,

    start_date  TIMESTAMPTZ,
    end_date    TIMESTAMPTZ,
    status      TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED')),

    created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 6. reviews — 리뷰
-- ────────────────────────────────────────────────
CREATE TABLE public.reviews (
    id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_instance_id UUID REFERENCES public.event_instances(id) ON DELETE CASCADE,
    user_id           UUID REFERENCES public.profiles(id)        ON DELETE CASCADE,

    seller_type TEXT CHECK (seller_type IN ('seller', 'foodtruck')),

    -- 행사 평가
    rating_profit    INT CHECK (rating_profit    BETWEEN 1 AND 5),
    rating_traffic   INT CHECK (rating_traffic   BETWEEN 1 AND 5),
    rating_promotion INT CHECK (rating_promotion BETWEEN 1 AND 5),

    -- 주최사 운영 평가
    rating_support   INT CHECK (rating_support   BETWEEN 1 AND 5),
    rating_manners   INT CHECK (rating_manners   BETWEEN 1 AND 5),

    revenue_range   TEXT,
    age_groups      TEXT[],
    visitor_types   TEXT[],

    title       TEXT,
    content     TEXT,
    pros        TEXT,
    cons        TEXT,
    is_verified BOOLEAN DEFAULT false,

    created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 7. scraps — 스크랩
-- ────────────────────────────────────────────────
CREATE TABLE public.scraps (
    user_id        UUID REFERENCES public.profiles(id)     ON DELETE CASCADE,
    recruitment_id UUID REFERENCES public.recruitments(id) ON DELETE CASCADE,
    created_at     TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, recruitment_id)
);


-- ────────────────────────────────────────────────
-- 8. posts — 커뮤니티 게시글
-- ────────────────────────────────────────────────
CREATE TABLE public.posts (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id      UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    title        TEXT NOT NULL,
    content      TEXT NOT NULL,
    category     TEXT NOT NULL,

    location     TEXT,
    seller_type  TEXT CHECK (seller_type IN ('seller', 'foodtruck')),
    author       TEXT,

    is_anonymous   BOOLEAN DEFAULT false,
    anonymous_name TEXT,

    likes       INT DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 9. post_comments — 커뮤니티 댓글
-- ────────────────────────────────────────────────
CREATE TABLE public.post_comments (
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id    UUID REFERENCES public.posts(id)     ON DELETE CASCADE,
    user_id    UUID REFERENCES public.profiles(id)  ON DELETE CASCADE,

    content     TEXT NOT NULL,
    author      TEXT,

    is_anonymous   BOOLEAN DEFAULT false,
    anonymous_name TEXT,

    created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 10. 통계 트리거
-- ────────────────────────────────────────────────

-- 리뷰 통계 재계산
CREATE OR REPLACE FUNCTION public.recalc_review_stats_v2()
RETURNS TRIGGER AS $$
DECLARE
    v_instance_id   UUID;
    v_base_event_id UUID;
    v_organizer_id  UUID;
    v_user_id       UUID;
BEGIN
    v_instance_id := CASE WHEN TG_OP = 'DELETE' THEN OLD.event_instance_id ELSE NEW.event_instance_id END;
    v_user_id     := CASE WHEN TG_OP = 'DELETE' THEN OLD.user_id           ELSE NEW.user_id           END;

    IF v_instance_id IS NULL THEN RETURN COALESCE(NEW, OLD); END IF;

    -- event_instances 통계
    UPDATE public.event_instances SET
        avg_event_rating = (
            SELECT COALESCE(AVG(
                (COALESCE(rating_profit,0) + COALESCE(rating_traffic,0) + COALESCE(rating_promotion,0))
                / NULLIF((CASE WHEN rating_profit IS NOT NULL THEN 1 ELSE 0 END
                        + CASE WHEN rating_traffic IS NOT NULL THEN 1 ELSE 0 END
                        + CASE WHEN rating_promotion IS NOT NULL THEN 1 ELSE 0 END), 0)
            ), 0)
            FROM public.reviews WHERE event_instance_id = v_instance_id
        ),
        avg_organizer_rating = (
            SELECT COALESCE(AVG(
                (COALESCE(rating_support,0) + COALESCE(rating_manners,0)) / 2.0
            ), 0)
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
                SELECT COALESCE(AVG(
                    (COALESCE(r.rating_profit,0) + COALESCE(r.rating_traffic,0)) / 2.0
                ), 0)
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

    -- profiles review_count 갱신
    IF v_user_id IS NOT NULL THEN
        UPDATE public.profiles
        SET review_count = (SELECT COUNT(*) FROM public.reviews WHERE user_id = v_user_id)
        WHERE id = v_user_id;
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_review_v2 ON public.reviews;
CREATE TRIGGER on_review_v2
    AFTER INSERT OR DELETE ON public.reviews
    FOR EACH ROW EXECUTE PROCEDURE public.recalc_review_stats_v2();


-- event_instances 수 트리거
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


-- ────────────────────────────────────────────────
-- 11. 인덱스
-- ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_instances_base_event  ON public.event_instances(base_event_id);
CREATE INDEX IF NOT EXISTS idx_instances_organizer   ON public.event_instances(organizer_id);
CREATE INDEX IF NOT EXISTS idx_instances_event_date  ON public.event_instances(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_recruitments_instance ON public.recruitments(event_instance_id);
CREATE INDEX IF NOT EXISTS idx_recruitments_status   ON public.recruitments(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_instance      ON public.reviews(event_instance_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_user          ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created       ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_created         ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_post_comments_post    ON public.post_comments(post_id);


-- ────────────────────────────────────────────────
-- 12. RLS 정책
-- ────────────────────────────────────────────────

-- profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- organizers
ALTER TABLE public.organizers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "organizers_select" ON public.organizers;
DROP POLICY IF EXISTS "organizers_insert" ON public.organizers;
DROP POLICY IF EXISTS "organizers_update" ON public.organizers;
CREATE POLICY "organizers_select" ON public.organizers FOR SELECT USING (true);
CREATE POLICY "organizers_insert" ON public.organizers FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "organizers_update" ON public.organizers FOR UPDATE USING (auth.uid() = id);

-- base_events
ALTER TABLE public.base_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "base_events_select" ON public.base_events;
DROP POLICY IF EXISTS "base_events_insert" ON public.base_events;
CREATE POLICY "base_events_select" ON public.base_events FOR SELECT USING (true);
CREATE POLICY "base_events_insert" ON public.base_events FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND plan = 'organizer')
);

-- event_instances
ALTER TABLE public.event_instances ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "event_instances_select" ON public.event_instances;
DROP POLICY IF EXISTS "event_instances_insert" ON public.event_instances;
CREATE POLICY "event_instances_select" ON public.event_instances FOR SELECT USING (true);
CREATE POLICY "event_instances_insert" ON public.event_instances FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND plan = 'organizer')
);

-- recruitments
ALTER TABLE public.recruitments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "recruitments_select" ON public.recruitments;
DROP POLICY IF EXISTS "recruitments_insert" ON public.recruitments;
DROP POLICY IF EXISTS "recruitments_update" ON public.recruitments;
CREATE POLICY "recruitments_select" ON public.recruitments FOR SELECT USING (true);
CREATE POLICY "recruitments_insert" ON public.recruitments FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.event_instances ei
        JOIN public.organizers o ON o.id = ei.organizer_id
        WHERE ei.id = event_instance_id AND o.id = auth.uid()
    )
);
CREATE POLICY "recruitments_update" ON public.recruitments FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM public.event_instances ei
        JOIN public.organizers o ON o.id = ei.organizer_id
        WHERE ei.id = event_instance_id AND o.id = auth.uid()
    )
);

-- reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "reviews_select" ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert" ON public.reviews;
DROP POLICY IF EXISTS "reviews_update" ON public.reviews;
DROP POLICY IF EXISTS "reviews_delete" ON public.reviews;
CREATE POLICY "reviews_select" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews_update" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "reviews_delete" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- scraps
ALTER TABLE public.scraps ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "scraps_select" ON public.scraps;
DROP POLICY IF EXISTS "scraps_insert" ON public.scraps;
DROP POLICY IF EXISTS "scraps_delete" ON public.scraps;
CREATE POLICY "scraps_select" ON public.scraps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "scraps_insert" ON public.scraps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "scraps_delete" ON public.scraps FOR DELETE USING (auth.uid() = user_id);

-- posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "posts_select" ON public.posts;
DROP POLICY IF EXISTS "posts_insert" ON public.posts;
DROP POLICY IF EXISTS "posts_update" ON public.posts;
DROP POLICY IF EXISTS "posts_delete" ON public.posts;
CREATE POLICY "posts_select"  ON public.posts FOR SELECT USING (true);
CREATE POLICY "posts_insert"  ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "posts_update"  ON public.posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "posts_delete"  ON public.posts FOR DELETE USING (auth.uid() = user_id);

-- post_comments
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "comments_select" ON public.post_comments;
DROP POLICY IF EXISTS "comments_insert" ON public.post_comments;
DROP POLICY IF EXISTS "comments_update" ON public.post_comments;
DROP POLICY IF EXISTS "comments_delete" ON public.post_comments;
CREATE POLICY "comments_select" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "comments_insert" ON public.post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_update" ON public.post_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "comments_delete" ON public.post_comments FOR DELETE USING (auth.uid() = user_id);
