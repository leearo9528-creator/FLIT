-- ═══════════════════════════════════════════════════════════════
-- 커뮤니티 테이블 누락 컬럼 보완
-- posts / post_comments 양쪽 스키마 통일
-- ═══════════════════════════════════════════════════════════════

-- posts: 혹시 누락된 컬럼 추가
ALTER TABLE public.posts
    ADD COLUMN IF NOT EXISTS author         TEXT,
    ADD COLUMN IF NOT EXISTS anonymous_name TEXT,
    ADD COLUMN IF NOT EXISTS is_anonymous   BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS seller_type    TEXT,
    ADD COLUMN IF NOT EXISTS location       TEXT,
    ADD COLUMN IF NOT EXISTS event_id       UUID REFERENCES public.base_events(id) ON DELETE SET NULL;

-- post_comments: anonymous_name 컬럼 추가 (supabase_schema.sql 기준)
ALTER TABLE public.post_comments
    ADD COLUMN IF NOT EXISTS anonymous_name TEXT,
    ADD COLUMN IF NOT EXISTS is_anonymous   BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS author         TEXT;

-- RLS 재확인 (이미 존재하면 무시)
ALTER TABLE public.posts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "posts_select"    ON public.posts;
DROP POLICY IF EXISTS "comments_select" ON public.post_comments;

CREATE POLICY "posts_select"    ON public.posts         FOR SELECT USING (true);
CREATE POLICY "comments_select" ON public.post_comments FOR SELECT USING (true);
