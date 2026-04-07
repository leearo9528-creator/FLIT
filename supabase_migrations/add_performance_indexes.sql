-- ═══════════════════════════════════════════════════════════
-- 성능 개선용 핵심 인덱스 (운영 DB에 한 번 실행)
-- 풀 테이블 스캔 → 인덱스 탐색으로 응답 속도 5~10배 개선
--
-- 안전한 실행: 각 블록이 테이블 존재 여부를 먼저 확인하므로
-- 일부 신규 테이블(event_scraps, notifications 등)이 아직
-- 운영 DB에 없어도 에러 없이 통과합니다.
-- ═══════════════════════════════════════════════════════════

DO $$
BEGIN
    -- recruitments
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='recruitments') THEN
        CREATE INDEX IF NOT EXISTS idx_recruitments_status_created
            ON public.recruitments(status, created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_recruitments_event_instance
            ON public.recruitments(event_instance_id);
        CREATE INDEX IF NOT EXISTS idx_recruitments_end_date
            ON public.recruitments(end_date);
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='recruitments' AND column_name='seller_type') THEN
            CREATE INDEX IF NOT EXISTS idx_recruitments_seller_type
                ON public.recruitments(seller_type);
        END IF;
    END IF;

    -- event_instances
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='event_instances') THEN
        CREATE INDEX IF NOT EXISTS idx_event_instances_event_date
            ON public.event_instances(event_date DESC);
        CREATE INDEX IF NOT EXISTS idx_event_instances_organizer
            ON public.event_instances(organizer_id);
        CREATE INDEX IF NOT EXISTS idx_event_instances_base_event
            ON public.event_instances(base_event_id);
        CREATE INDEX IF NOT EXISTS idx_event_instances_organizer_date
            ON public.event_instances(organizer_id, event_date DESC);
    END IF;

    -- reviews
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='reviews') THEN
        CREATE INDEX IF NOT EXISTS idx_reviews_event_instance
            ON public.reviews(event_instance_id, created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_reviews_user
            ON public.reviews(user_id);
        CREATE INDEX IF NOT EXISTS idx_reviews_created
            ON public.reviews(created_at DESC);
    END IF;

    -- posts
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='posts') THEN
        CREATE INDEX IF NOT EXISTS idx_posts_created
            ON public.posts(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_posts_likes
            ON public.posts(likes DESC);
        CREATE INDEX IF NOT EXISTS idx_posts_category
            ON public.posts(category);
        CREATE INDEX IF NOT EXISTS idx_posts_user
            ON public.posts(user_id);
    END IF;

    -- post_comments
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='post_comments') THEN
        CREATE INDEX IF NOT EXISTS idx_post_comments_post
            ON public.post_comments(post_id);
        CREATE INDEX IF NOT EXISTS idx_post_comments_user
            ON public.post_comments(user_id);
    END IF;

    -- scraps
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='scraps') THEN
        CREATE INDEX IF NOT EXISTS idx_scraps_user
            ON public.scraps(user_id);
    END IF;

    -- event_scraps (신규 테이블 — 없을 수 있음)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='event_scraps') THEN
        CREATE INDEX IF NOT EXISTS idx_event_scraps_user
            ON public.event_scraps(user_id);
    END IF;

    -- notifications (신규 테이블 — 없을 수 있음)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='notifications') THEN
        CREATE INDEX IF NOT EXISTS idx_notifications_user_created
            ON public.notifications(user_id, created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
            ON public.notifications(user_id, is_read) WHERE is_read = false;
    END IF;
END $$;
