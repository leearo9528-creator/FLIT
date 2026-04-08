-- ═══════════════════════════════════════════════════════════
-- reports — 콘텐츠 신고 (모집공고/리뷰/커뮤니티 글/댓글)
-- target_type: 'recruitment' | 'review' | 'post' | 'post_comment'
-- ═══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.reports (
    id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    reporter_id   UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    target_type   TEXT NOT NULL CHECK (target_type IN ('recruitment', 'review', 'post', 'post_comment')),
    target_id     UUID NOT NULL,
    reason        TEXT NOT NULL,
    detail        TEXT,
    status        TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(reporter_id, target_type, target_id)
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "reports_insert" ON public.reports;
DROP POLICY IF EXISTS "reports_select_own" ON public.reports;
DROP POLICY IF EXISTS "reports_admin_all" ON public.reports;

-- 로그인 사용자는 자기 이름으로만 신고 가능
CREATE POLICY "reports_insert" ON public.reports
    FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- 신고자 본인은 자기 신고 내역만 조회 가능
CREATE POLICY "reports_select_own" ON public.reports
    FOR SELECT USING (auth.uid() = reporter_id);

-- 관리자는 전체 조회/수정/삭제 가능
CREATE POLICY "reports_admin_all" ON public.reports
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
    );

CREATE INDEX IF NOT EXISTS idx_reports_status_created
    ON public.reports(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_target
    ON public.reports(target_type, target_id);
