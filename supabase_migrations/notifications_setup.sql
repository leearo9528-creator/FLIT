-- ── notifications 테이블 생성 ────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notifications (
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type       TEXT NOT NULL,           -- 'comment', 'recruitment_closed', 기타
    title      TEXT NOT NULL,
    body       TEXT,
    link       TEXT,                    -- 클릭 시 이동할 경로
    is_read    BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "notif_select" ON public.notifications;
DROP POLICY IF EXISTS "notif_update" ON public.notifications;
CREATE POLICY "notif_select" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notif_update" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Realtime 활성화 (Supabase 대시보드 > Database > Replication 에서도 활성화 필요)
ALTER TABLE public.notifications REPLICA IDENTITY FULL;

-- ── 인덱스 ────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON public.notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread  ON public.notifications(user_id, is_read) WHERE is_read = false;


-- ── 댓글 작성 시 게시글 작성자에게 알림 ─────────────────────
CREATE OR REPLACE FUNCTION public.notify_on_comment()
RETURNS TRIGGER AS $$
DECLARE
    v_post_user_id UUID;
    v_post_title   TEXT;
    v_commenter    TEXT;
BEGIN
    -- 게시글 작성자와 제목 조회
    SELECT user_id, title INTO v_post_user_id, v_post_title
    FROM public.posts WHERE id = NEW.post_id;

    -- 자기 자신의 글에 댓글 달면 알림 없음
    IF v_post_user_id IS NULL OR v_post_user_id = NEW.user_id THEN
        RETURN NEW;
    END IF;

    -- 댓글 작성자 이름 (익명이면 '익명')
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
