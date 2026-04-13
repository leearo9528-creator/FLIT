-- ═══════════════════════════════════════════════════════════════
-- FLIT 메인 스키마 (V3 — 최신, 2026-04-08)
-- base_events + event_instances 분리 구조
-- 모든 마이그레이션을 통합한 단일 설치 스크립트
-- ═══════════════════════════════════════════════════════════════

-- ────────────────────────────────────────────────
-- 0. 기존 테이블 초기화 (FK 역순)
-- ────────────────────────────────────────────────
DROP TABLE IF EXISTS public.notifications   CASCADE;
DROP TABLE IF EXISTS public.notices         CASCADE;
DROP TABLE IF EXISTS public.post_comments   CASCADE;
DROP TABLE IF EXISTS public.posts           CASCADE;
DROP TABLE IF EXISTS public.event_scraps    CASCADE;
DROP TABLE IF EXISTS public.scraps          CASCADE;
DROP TABLE IF EXISTS public.reviews         CASCADE;
DROP TABLE IF EXISTS public.recruitments    CASCADE;
DROP TABLE IF EXISTS public.event_instances CASCADE;
DROP TABLE IF EXISTS public.base_events     CASCADE;
DROP TABLE IF EXISTS public.organizers      CASCADE;
DROP TABLE IF EXISTS public.profiles        CASCADE;


-- ────────────────────────────────────────────────
-- 1. profiles
-- ────────────────────────────────────────────────
CREATE TABLE public.profiles (
    id                  UUID REFERENCES auth.users(id) PRIMARY KEY,
    email               TEXT UNIQUE NOT NULL,
    name                TEXT,
    avatar_url          TEXT,

    -- 셀러 유형 (리뷰/게시글 표시용)
    seller_type         TEXT CHECK (seller_type IN ('seller', 'foodtruck')),

    -- 멤버십 플랜 (organizer = 주최사, 즉시 전환)
    plan                TEXT DEFAULT 'free'
                        CHECK (plan IN ('free', 'flea_market', 'foodtruck', 'organizer')),

    -- 관리자 권한
    is_admin            BOOLEAN DEFAULT false,

    -- 프로필 상세 (셀러/주최사 공통)
    brand_name          TEXT,   -- 셀러: 브랜드명 / 주최사: 주최사명
    real_name           TEXT,   -- 성함
    phone               TEXT,   -- 연락처
    products            TEXT,   -- 셀러: 판매 제품
    promo_link          TEXT,   -- 홍보 링크 (인스타, 블로그 등)
    instagram_handle    TEXT,
    business_number     TEXT,
    organizer_name      TEXT,   -- 주최사 표시 이름 (organizers.name 초기값)
    organizer_desc      TEXT,   -- 주최사 설명

    -- 공고 작성 시 기본값 (프로필에 저장)
    default_application_method TEXT,
    default_contact            TEXT,

    -- 리뷰 카운트 (트리거 관리)
    review_count        INT DEFAULT 0,

    -- 마지막 리뷰 작성 시각 (1주일 열람 권한 기준)
    last_review_at      TIMESTAMPTZ,

    created_at          TIMESTAMPTZ DEFAULT NOW()
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
-- 2. organizers (profiles와 1:1, id 동일)
-- ────────────────────────────────────────────────
CREATE TABLE public.organizers (
    id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name              TEXT,
    description       TEXT,
    logo_url          TEXT,

    -- 연락처/홍보 정보 (profiles와 동기화)
    contact_name      TEXT,
    phone             TEXT,
    promo_link        TEXT,
    instagram_handle  TEXT,
    business_number   TEXT,

    -- 통계 (트리거 관리)
    avg_support       FLOAT DEFAULT 0,
    avg_manners       FLOAT DEFAULT 0,
    total_reviews     INT   DEFAULT 0,
    total_instances   INT   DEFAULT 0,

    is_mock           BOOLEAN DEFAULT false,

    created_at        TIMESTAMPTZ DEFAULT NOW(),
    updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- plan = 'organizer' 설정 시 organizers 레코드 자동 생성/동기화
CREATE OR REPLACE FUNCTION public.handle_organizer_plan()
RETURNS TRIGGER AS $$
DECLARE
    v_name TEXT;
BEGIN
    IF NEW.plan = 'organizer' THEN
        v_name := COALESCE(
            NEW.organizer_name,
            (SELECT raw_user_meta_data->>'full_name' FROM auth.users WHERE id = NEW.id),
            (SELECT raw_user_meta_data->>'name'      FROM auth.users WHERE id = NEW.id),
            (SELECT split_part(email, '@', 1)        FROM auth.users WHERE id = NEW.id),
            '주최사'
        );

        INSERT INTO public.organizers (id, name, description, phone, promo_link, contact_name)
        VALUES (
            NEW.id,
            v_name,
            NEW.organizer_desc,
            NEW.phone,
            NEW.promo_link,
            NEW.real_name
        )
        ON CONFLICT (id) DO UPDATE SET
            name         = EXCLUDED.name,
            description  = COALESCE(EXCLUDED.description,  organizers.description),
            phone        = COALESCE(EXCLUDED.phone,        organizers.phone),
            promo_link   = COALESCE(EXCLUDED.promo_link,   organizers.promo_link),
            contact_name = COALESCE(EXCLUDED.contact_name, organizers.contact_name),
            updated_at   = NOW();
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
    id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name              TEXT UNIQUE NOT NULL,
    category          TEXT,                -- 플리마켓 / 푸드트럭 / 플리+푸드 전체
    description       TEXT,
    image_url         TEXT,

    -- 통계 (트리거 관리)
    avg_event_rating  FLOAT DEFAULT 0,
    total_reviews     INT   DEFAULT 0,
    total_instances   INT   DEFAULT 0,

    is_mock           BOOLEAN DEFAULT false,

    created_at        TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 4. event_instances — 개최 실체 (1회)
-- ────────────────────────────────────────────────
CREATE TABLE public.event_instances (
    id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    base_event_id         UUID REFERENCES public.base_events(id) ON DELETE CASCADE,
    organizer_id          UUID REFERENCES public.organizers(id)  ON DELETE SET NULL,

    location              TEXT,
    location_sido         TEXT,
    event_date            DATE,
    event_date_end        DATE,

    -- 통계 (트리거 관리)
    avg_event_rating      FLOAT DEFAULT 0,
    avg_organizer_rating  FLOAT DEFAULT 0,
    review_count          INT   DEFAULT 0,

    is_mock               BOOLEAN DEFAULT false,

    created_at            TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 5. recruitments — 모집공고
-- ────────────────────────────────────────────────
CREATE TABLE public.recruitments (
    id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_instance_id   UUID REFERENCES public.event_instances(id) ON DELETE CASCADE,

    title               TEXT NOT NULL,
    content             TEXT,

    -- 참가비 (최신: fee_description 자유 텍스트 / 레거시 필드 유지)
    fee                 INT  DEFAULT 0,        -- 레거시 숫자 필드
    fee_description     TEXT,                  -- 최신: "무료 / 1일 80,000원" 같은 자유 텍스트
    fee_type            TEXT,                  -- 레거시: 'fixed' | 'rate' | 'free'
    fee_foodtruck       INT,                   -- 레거시: 푸드트럭 전용 참가비
    extra_costs         JSONB,                 -- 레거시: [{label, amount}, ...]

    application_method  TEXT,
    contact             TEXT,                  -- 연락처
    recruitment_items   TEXT,                  -- 모집 품목
    recruitment_scale   TEXT,                  -- 모집 규모
    refund_policy       TEXT,                  -- 환불규정
    parking_info        TEXT,                  -- 주차지원
    onsite_support      TEXT,                  -- 현장지원
    special_notes       TEXT,                  -- 특이사항

    -- 모집 대상 셀러 유형 (null = 전체)
    seller_type         TEXT CHECK (seller_type IN ('seller', 'foodtruck')),

    images              TEXT[],

    start_date          TIMESTAMPTZ,
    end_date            TIMESTAMPTZ,
    status              TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED')),

    is_mock             BOOLEAN DEFAULT false,

    created_at          TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 6. reviews — 리뷰
-- ────────────────────────────────────────────────
CREATE TABLE public.reviews (
    id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_instance_id  UUID REFERENCES public.event_instances(id) ON DELETE CASCADE,
    user_id            UUID REFERENCES public.profiles(id)        ON DELETE CASCADE,

    seller_type        TEXT CHECK (seller_type IN ('seller', 'foodtruck')),

    -- 행사 평가
    rating_profit      INT CHECK (rating_profit    BETWEEN 1 AND 5),
    rating_traffic     INT CHECK (rating_traffic   BETWEEN 1 AND 5),
    rating_promotion   INT CHECK (rating_promotion BETWEEN 1 AND 5),

    -- 주최사 운영 평가
    rating_support     INT CHECK (rating_support   BETWEEN 1 AND 5),
    rating_manners     INT CHECK (rating_manners   BETWEEN 1 AND 5),

    revenue_range      TEXT,
    age_groups         TEXT[],
    visitor_types      TEXT[],

    title              TEXT,
    content            TEXT,
    pros               TEXT,
    cons               TEXT,
    is_verified        BOOLEAN DEFAULT false,

    is_mock            BOOLEAN DEFAULT false,

    created_at         TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 7. scraps — 공고 스크랩
-- ────────────────────────────────────────────────
CREATE TABLE public.scraps (
    user_id        UUID REFERENCES public.profiles(id)     ON DELETE CASCADE,
    recruitment_id UUID REFERENCES public.recruitments(id) ON DELETE CASCADE,
    created_at     TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, recruitment_id)
);


-- ────────────────────────────────────────────────
-- 7b. event_scraps — 행사 브랜드 스크랩
-- ────────────────────────────────────────────────
CREATE TABLE public.event_scraps (
    user_id        UUID REFERENCES public.profiles(id)    ON DELETE CASCADE,
    base_event_id  UUID REFERENCES public.base_events(id) ON DELETE CASCADE,
    created_at     TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, base_event_id)
);


-- ────────────────────────────────────────────────
-- 8. posts — 커뮤니티 게시글
-- ────────────────────────────────────────────────
CREATE TABLE public.posts (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id         UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    title           TEXT NOT NULL,
    content         TEXT NOT NULL,
    category        TEXT NOT NULL,

    location        TEXT,
    seller_type     TEXT CHECK (seller_type IN ('seller', 'foodtruck')),
    author          TEXT,

    is_anonymous    BOOLEAN DEFAULT false,
    anonymous_name  TEXT,

    images          TEXT[],

    likes           INT DEFAULT 0,

    is_mock         BOOLEAN DEFAULT false,

    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 9. post_comments — 커뮤니티 댓글
-- ────────────────────────────────────────────────
CREATE TABLE public.post_comments (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id         UUID REFERENCES public.posts(id)     ON DELETE CASCADE,
    user_id         UUID REFERENCES public.profiles(id)  ON DELETE CASCADE,

    content         TEXT NOT NULL,
    author          TEXT,

    is_anonymous    BOOLEAN DEFAULT false,
    anonymous_name  TEXT,

    is_mock         BOOLEAN DEFAULT false,

    created_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 10. notices — 공지사항
-- ────────────────────────────────────────────────
CREATE TABLE public.notices (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title       TEXT NOT NULL,
    content     TEXT NOT NULL,
    is_pinned   BOOLEAN DEFAULT false,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 11. notifications — 알림
-- ────────────────────────────────────────────────
CREATE TABLE public.notifications (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type        TEXT NOT NULL,    -- 'comment', 'recruitment_closed' 등
    title       TEXT NOT NULL,
    body        TEXT,
    link        TEXT,
    is_read     BOOLEAN DEFAULT false,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Realtime 활성화 (Supabase 대시보드 > Database > Replication 에서도 활성화 필요)
ALTER TABLE public.notifications REPLICA IDENTITY FULL;


-- ────────────────────────────────────────────────
-- 12. contact_requests — 행사 개최 문의
-- ────────────────────────────────────────────────
CREATE TABLE public.contact_requests (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    org_type        TEXT,
    org_name        TEXT NOT NULL,
    contact_name    TEXT NOT NULL,
    contact_phone   TEXT,
    contact_email   TEXT,
    event_type      TEXT NOT NULL,
    scale           TEXT,
    location        TEXT,
    scheduled_date  DATE,
    message         TEXT,
    status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'done')),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ────────────────────────────────────────────────
-- 13. reports — 신고
-- ────────────────────────────────────────────────
CREATE TABLE public.reports (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    reporter_id  UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    target_type  TEXT NOT NULL,      -- 'recruitment', 'review', 'post', 'post_comment'
    target_id    UUID NOT NULL,
    reason       TEXT NOT NULL,
    detail       TEXT,
    status       TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (reporter_id, target_type, target_id)
);


-- ────────────────────────────────────────────────
-- 13. 통계 트리거
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

    -- profiles review_count + last_review_at 갱신
    IF v_user_id IS NOT NULL THEN
        UPDATE public.profiles
        SET review_count   = (SELECT COUNT(*) FROM public.reviews WHERE user_id = v_user_id),
            last_review_at = (SELECT MAX(created_at) FROM public.reviews WHERE user_id = v_user_id)
        WHERE id = v_user_id;
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_review_v2 ON public.reviews;
CREATE TRIGGER on_review_v2
    AFTER INSERT OR DELETE ON public.reviews
    FOR EACH ROW EXECUTE PROCEDURE public.recalc_review_stats_v2();


-- event_instances 개최 수 트리거
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


-- 댓글 작성 시 게시글 작성자에게 알림
CREATE OR REPLACE FUNCTION public.notify_on_comment()
RETURNS TRIGGER AS $$
DECLARE
    v_post_user_id UUID;
    v_post_title   TEXT;
    v_commenter    TEXT;
BEGIN
    SELECT user_id, title INTO v_post_user_id, v_post_title
    FROM public.posts WHERE id = NEW.post_id;

    -- 자기 자신의 글에는 알림 없음
    IF v_post_user_id IS NULL OR v_post_user_id = NEW.user_id THEN
        RETURN NEW;
    END IF;

    v_commenter := CASE
        WHEN NEW.is_anonymous THEN COALESCE(NEW.anonymous_name, '익명')
        ELSE COALESCE(NEW.author, '누군가')
    END;

    INSERT INTO public.notifications (user_id, type, title, body, link)
    VALUES (
        v_post_user_id,
        'comment',
        v_commenter || '님이 댓글을 달았어요',
        SUBSTRING(NEW.content FROM 1 FOR 60),
        '/community/' || NEW.post_id
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_comment_created ON public.post_comments;
CREATE TRIGGER on_comment_created
    AFTER INSERT ON public.post_comments
    FOR EACH ROW EXECUTE PROCEDURE public.notify_on_comment();


-- ────────────────────────────────────────────────
-- 13. 인덱스
-- ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_instances_base_event       ON public.event_instances(base_event_id);
CREATE INDEX IF NOT EXISTS idx_instances_organizer        ON public.event_instances(organizer_id);
CREATE INDEX IF NOT EXISTS idx_instances_event_date       ON public.event_instances(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_instances_organizer_date   ON public.event_instances(organizer_id, event_date DESC);

CREATE INDEX IF NOT EXISTS idx_recruitments_instance      ON public.recruitments(event_instance_id);
CREATE INDEX IF NOT EXISTS idx_recruitments_status        ON public.recruitments(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recruitments_end_date      ON public.recruitments(end_date);

CREATE INDEX IF NOT EXISTS idx_reviews_instance           ON public.reviews(event_instance_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_user               ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created            ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_seller_type        ON public.reviews(seller_type);

CREATE INDEX IF NOT EXISTS idx_posts_user                 ON public.posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created              ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_likes                ON public.posts(likes DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category             ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_seller_type          ON public.posts(seller_type);
CREATE INDEX IF NOT EXISTS idx_posts_is_anonymous         ON public.posts(is_anonymous);

CREATE INDEX IF NOT EXISTS idx_post_comments_post         ON public.post_comments(post_id);

CREATE INDEX IF NOT EXISTS idx_scraps_user                ON public.scraps(user_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON public.notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread  ON public.notifications(user_id, is_read) WHERE is_read = false;


-- ────────────────────────────────────────────────
-- 14. RLS 정책
-- ────────────────────────────────────────────────

-- profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select"       ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert"       ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id); -- handle_new_user 트리거는 SECURITY DEFINER로 RLS 우회
CREATE POLICY "profiles_update_self"  ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_update_admin" ON public.profiles FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- organizers
ALTER TABLE public.organizers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "organizers_select"      ON public.organizers FOR SELECT USING (true);
CREATE POLICY "organizers_insert_self" ON public.organizers FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "organizers_update_self" ON public.organizers FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "organizers_admin_all"   ON public.organizers FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- base_events
ALTER TABLE public.base_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "base_events_select"     ON public.base_events FOR SELECT USING (true);
CREATE POLICY "base_events_insert_org" ON public.base_events FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (plan = 'organizer' OR is_admin = true))
);
CREATE POLICY "base_events_admin_all"  ON public.base_events FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- event_instances
ALTER TABLE public.event_instances ENABLE ROW LEVEL SECURITY;
CREATE POLICY "event_instances_select"     ON public.event_instances FOR SELECT USING (true);
CREATE POLICY "event_instances_insert_org" ON public.event_instances FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (plan = 'organizer' OR is_admin = true))
);
CREATE POLICY "event_instances_update_org" ON public.event_instances FOR UPDATE USING (
    auth.uid() = organizer_id
);
CREATE POLICY "event_instances_admin_all"  ON public.event_instances FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- recruitments
ALTER TABLE public.recruitments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "recruitments_select"      ON public.recruitments FOR SELECT USING (true);
CREATE POLICY "recruitments_insert_org"  ON public.recruitments FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.event_instances ei
        JOIN public.organizers o ON o.id = ei.organizer_id
        WHERE ei.id = event_instance_id AND o.id = auth.uid()
    )
);
CREATE POLICY "recruitments_update_org"  ON public.recruitments FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM public.event_instances ei
        JOIN public.organizers o ON o.id = ei.organizer_id
        WHERE ei.id = event_instance_id AND o.id = auth.uid()
    )
);
CREATE POLICY "recruitments_delete_org"  ON public.recruitments FOR DELETE USING (
    EXISTS (
        SELECT 1 FROM public.event_instances ei
        JOIN public.organizers o ON o.id = ei.organizer_id
        WHERE ei.id = event_instance_id AND o.id = auth.uid()
    )
);
CREATE POLICY "recruitments_admin_all"   ON public.recruitments FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_select"       ON public.reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert_self"  ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews_update_self"  ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "reviews_delete_self"  ON public.reviews FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "reviews_delete_admin" ON public.reviews FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- scraps (공고)
ALTER TABLE public.scraps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "scraps_select" ON public.scraps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "scraps_insert" ON public.scraps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "scraps_delete" ON public.scraps FOR DELETE USING (auth.uid() = user_id);

-- event_scraps (행사)
ALTER TABLE public.event_scraps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "event_scraps_select" ON public.event_scraps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "event_scraps_insert" ON public.event_scraps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "event_scraps_delete" ON public.event_scraps FOR DELETE USING (auth.uid() = user_id);

-- posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "posts_select"       ON public.posts FOR SELECT USING (true);
CREATE POLICY "posts_insert_self"  ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "posts_update_self"  ON public.posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "posts_delete"       ON public.posts FOR DELETE USING (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- post_comments
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "comments_select"       ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "comments_insert_self"  ON public.post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_update_self"  ON public.post_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "comments_delete"       ON public.post_comments FOR DELETE USING (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- notices
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notices_select"      ON public.notices FOR SELECT USING (true);
CREATE POLICY "notices_admin_all"   ON public.notices FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- reports
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reports_insert_self"  ON public.reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "reports_select_admin" ON public.reports FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "reports_admin_all"    ON public.reports FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- contact_requests
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "contact_requests_insert" ON public.contact_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_requests_admin_all" ON public.contact_requests FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifications_select" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notifications_insert" ON public.notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "notifications_update" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
