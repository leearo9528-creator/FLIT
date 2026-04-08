-- ═══════════════════════════════════════════════════════════
-- 누락된 테이블 추가 (event_scraps, notices, notifications)
-- + 댓글 알림 트리거 + RLS 정책
-- 모두 IF NOT EXISTS 라서 여러 번 실행해도 안전.
-- ═══════════════════════════════════════════════════════════

-- ────────────────────────────────────────────────
-- 1) event_scraps — 행사 브랜드 스크랩
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.event_scraps (
    user_id        UUID REFERENCES public.profiles(id)    ON DELETE CASCADE,
    base_event_id  UUID REFERENCES public.base_events(id) ON DELETE CASCADE,
    created_at     TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, base_event_id)
);

ALTER TABLE public.event_scraps ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "event_scraps_select" ON public.event_scraps;
DROP POLICY IF EXISTS "event_scraps_insert" ON public.event_scraps;
DROP POLICY IF EXISTS "event_scraps_delete" ON public.event_scraps;
CREATE POLICY "event_scraps_select" ON public.event_scraps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "event_scraps_insert" ON public.event_scraps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "event_scraps_delete" ON public.event_scraps FOR DELETE USING (auth.uid() = user_id);


-- ────────────────────────────────────────────────
-- 2) notices — 공지사항
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notices (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title       TEXT NOT NULL,
    content     TEXT NOT NULL,
    is_pinned   BOOLEAN DEFAULT false,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "notices_select" ON public.notices;
DROP POLICY IF EXISTS "notices_admin_all" ON public.notices;
CREATE POLICY "notices_select" ON public.notices FOR SELECT USING (true);
CREATE POLICY "notices_admin_all" ON public.notices FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);


-- ────────────────────────────────────────────────
-- 3) notifications — 실시간 알림
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notifications (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type        TEXT NOT NULL,    -- 'comment', 'recruitment_closed' 등
    title       TEXT NOT NULL,
    body        TEXT,
    link        TEXT,
    is_read     BOOLEAN DEFAULT false,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Realtime 구독을 위한 설정
ALTER TABLE public.notifications REPLICA IDENTITY FULL;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "notifications_select" ON public.notifications;
DROP POLICY IF EXISTS "notifications_update" ON public.notifications;
CREATE POLICY "notifications_select" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notifications_update" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);


-- ────────────────────────────────────────────────
-- 4) 댓글 작성 시 게시글 작성자에게 알림 트리거
-- ────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.notify_on_comment()
RETURNS TRIGGER AS $$
DECLARE
    v_post_user_id UUID;
    v_post_title   TEXT;
    v_commenter    TEXT;
BEGIN
    SELECT user_id, title INTO v_post_user_id, v_post_title
    FROM public.posts WHERE id = NEW.post_id;

    -- 자기 자신의 글에 댓글 달면 알림 안 보냄
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
-- 5) 인덱스 (위 테이블 전용)
-- ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_event_scraps_user
    ON public.event_scraps(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_created
    ON public.notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
    ON public.notifications(user_id, is_read) WHERE is_read = false;
