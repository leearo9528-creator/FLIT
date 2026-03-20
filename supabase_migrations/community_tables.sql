-- ═══════════════════════════════════════════════════════════════
-- 커뮤니티 테이블 전체 생성 스크립트
-- community_schema.sql 삭제 후 재생성용
-- ═══════════════════════════════════════════════════════════════
-- Supabase SQL Editor에서 이 파일 전체를 실행하세요.
-- ═══════════════════════════════════════════════════════════════

-- ── posts ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.posts (
    id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id        UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author         TEXT,
    seller_type    TEXT,                  -- 'seller' | 'foodtruck' | 'organizer' | NULL
    category       TEXT,                  -- '실시간 행사 현황' | '자유게시판' | '질문/답변' | '팁/정보' | '사고팔고'
    title          TEXT NOT NULL,
    content        TEXT,
    location       TEXT,
    is_anonymous   BOOLEAN DEFAULT false,
    anonymous_name TEXT,
    likes          INT DEFAULT 0,
    event_id       UUID REFERENCES public.base_events(id) ON DELETE SET NULL,
    created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── post_comments ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.post_comments (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id      UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author       TEXT,
    content      TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT false,
    likes        INT DEFAULT 0,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── contact_requests ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_requests (
    id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    org_type       TEXT,
    org_name       TEXT NOT NULL,
    contact_name   TEXT NOT NULL,
    contact_phone  TEXT,
    contact_email  TEXT,
    event_type     TEXT,
    scale          TEXT,
    location       TEXT,
    scheduled_date DATE,
    message        TEXT,
    created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── 인덱스 ───────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS posts_created_at_idx     ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS posts_category_idx       ON public.posts(category);
CREATE INDEX IF NOT EXISTS posts_user_id_idx        ON public.posts(user_id);
CREATE INDEX IF NOT EXISTS post_comments_post_id_idx ON public.post_comments(post_id);

-- ── RLS ─────────────────────────────────────────────────────
ALTER TABLE public.posts           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- posts 정책
DROP POLICY IF EXISTS "posts_select"  ON public.posts;
DROP POLICY IF EXISTS "posts_insert"  ON public.posts;
DROP POLICY IF EXISTS "posts_update"  ON public.posts;
DROP POLICY IF EXISTS "posts_delete"  ON public.posts;

CREATE POLICY "posts_select" ON public.posts
    FOR SELECT USING (true);                              -- 누구나 읽기 가능

CREATE POLICY "posts_insert" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);        -- 로그인한 본인만 작성

CREATE POLICY "posts_update" ON public.posts
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);                   -- 본인 글만 수정

CREATE POLICY "posts_delete" ON public.posts
    FOR DELETE USING (auth.uid() = user_id);             -- 본인 글만 삭제

-- post_comments 정책
DROP POLICY IF EXISTS "comments_select" ON public.post_comments;
DROP POLICY IF EXISTS "comments_insert" ON public.post_comments;
DROP POLICY IF EXISTS "comments_update" ON public.post_comments;
DROP POLICY IF EXISTS "comments_delete" ON public.post_comments;

CREATE POLICY "comments_select" ON public.post_comments
    FOR SELECT USING (true);

CREATE POLICY "comments_insert" ON public.post_comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "comments_update" ON public.post_comments
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "comments_delete" ON public.post_comments
    FOR DELETE USING (auth.uid() = user_id);

-- contact_requests 정책
DROP POLICY IF EXISTS "contact_insert" ON public.contact_requests;
DROP POLICY IF EXISTS "contact_select" ON public.contact_requests;

CREATE POLICY "contact_insert" ON public.contact_requests
    FOR INSERT WITH CHECK (true);                        -- 누구나 제출 가능

CREATE POLICY "contact_select" ON public.contact_requests
    FOR SELECT USING (false);                            -- 관리자 직접 조회만 허용
