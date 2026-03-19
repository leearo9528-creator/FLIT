-- ═══════════════════════════════════════════════════════════════
-- 커뮤니티 테이블 스키마
-- Supabase Dashboard > SQL Editor에서 실행
-- ═══════════════════════════════════════════════════════════════

-- ── 1. posts 테이블 (없으면 생성) ──────────────────────────────
CREATE TABLE IF NOT EXISTS public.posts (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title       TEXT NOT NULL,
    content     TEXT,
    category    TEXT,
    location    TEXT,
    seller_type TEXT CHECK (seller_type IN ('seller', 'foodtruck')),
    is_anonymous BOOLEAN DEFAULT false,
    anonymous_name TEXT,
    author      TEXT,
    likes       INT DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- author 컬럼 없으면 추가
ALTER TABLE public.posts
    ADD COLUMN IF NOT EXISTS author         TEXT,
    ADD COLUMN IF NOT EXISTS anonymous_name TEXT;

-- ── 2. post_comments 테이블 (없으면 생성) ───────────────────────
CREATE TABLE IF NOT EXISTS public.post_comments (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id     UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author      TEXT,
    content     TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT false,
    likes       INT DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);
