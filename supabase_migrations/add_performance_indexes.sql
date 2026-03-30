-- 성능 개선용 인덱스
-- Supabase 콘솔 > SQL Editor에서 실행

-- reviews 테이블
CREATE INDEX IF NOT EXISTS idx_reviews_event_instance_id ON public.reviews(event_instance_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id            ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at         ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_seller_type        ON public.reviews(seller_type);

-- posts 테이블
CREATE INDEX IF NOT EXISTS idx_posts_user_id       ON public.posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at    ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_likes         ON public.posts(likes DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category      ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_seller_type   ON public.posts(seller_type);
CREATE INDEX IF NOT EXISTS idx_posts_is_anonymous  ON public.posts(is_anonymous);

-- recruitments 테이블
CREATE INDEX IF NOT EXISTS idx_recruitments_status           ON public.recruitments(status);
CREATE INDEX IF NOT EXISTS idx_recruitments_event_instance   ON public.recruitments(event_instance_id);
CREATE INDEX IF NOT EXISTS idx_recruitments_end_date         ON public.recruitments(end_date);

-- event_instances 테이블
CREATE INDEX IF NOT EXISTS idx_event_instances_organizer_id   ON public.event_instances(organizer_id);
CREATE INDEX IF NOT EXISTS idx_event_instances_base_event_id  ON public.event_instances(base_event_id);
CREATE INDEX IF NOT EXISTS idx_event_instances_organizer_date ON public.event_instances(organizer_id, event_date DESC);

-- scraps 테이블
CREATE INDEX IF NOT EXISTS idx_scraps_user_id ON public.scraps(user_id);

-- notifications 테이블 (알림 연동 대비)
CREATE INDEX IF NOT EXISTS idx_notifications_user_id    ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read    ON public.notifications(user_id, is_read);
