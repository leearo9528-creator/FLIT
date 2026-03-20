-- ═══════════════════════════════════════════════════════════════
-- 커뮤니티 테이블 누락 컬럼 추가
-- ═══════════════════════════════════════════════════════════════

-- posts: 행사 연결 컬럼 추가 (community/write 에서 event_id INSERT 사용)
ALTER TABLE public.posts
    ADD COLUMN IF NOT EXISTS event_id UUID REFERENCES public.base_events(id) ON DELETE SET NULL;

-- post_comments: 좋아요 카운트 컬럼 추가
ALTER TABLE public.post_comments
    ADD COLUMN IF NOT EXISTS likes INT DEFAULT 0;

-- ═══════════════════════════════════════════════════════════════
-- 행사 개최 문의 테이블
-- ═══════════════════════════════════════════════════════════════
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

ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "contact_insert" ON public.contact_requests;
CREATE POLICY "contact_insert" ON public.contact_requests FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "contact_select" ON public.contact_requests;
CREATE POLICY "contact_select" ON public.contact_requests FOR SELECT USING (false); -- 관리자만 조회
