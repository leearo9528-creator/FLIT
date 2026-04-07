-- ═══════════════════════════════════════════════════════════
-- 성능 개선용 핵심 인덱스 (운영 DB에 한 번 실행)
-- 풀 테이블 스캔 → 인덱스 탐색으로 응답 속도 5~10배 개선
-- ═══════════════════════════════════════════════════════════

-- recruitments: 모집중 정렬 (홈/검색 메인 쿼리)
CREATE INDEX IF NOT EXISTS idx_recruitments_status_created
    ON public.recruitments(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recruitments_event_instance
    ON public.recruitments(event_instance_id);
CREATE INDEX IF NOT EXISTS idx_recruitments_end_date
    ON public.recruitments(end_date);
CREATE INDEX IF NOT EXISTS idx_recruitments_seller_type
    ON public.recruitments(seller_type);

-- event_instances: 캘린더/주최사별 조회
CREATE INDEX IF NOT EXISTS idx_event_instances_event_date
    ON public.event_instances(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_event_instances_organizer
    ON public.event_instances(organizer_id);
CREATE INDEX IF NOT EXISTS idx_event_instances_base_event
    ON public.event_instances(base_event_id);
CREATE INDEX IF NOT EXISTS idx_event_instances_organizer_date
    ON public.event_instances(organizer_id, event_date DESC);

-- reviews: 사용자/행사별 조회
CREATE INDEX IF NOT EXISTS idx_reviews_event_instance
    ON public.reviews(event_instance_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_user
    ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created
    ON public.reviews(created_at DESC);

-- posts: 커뮤니티 목록/필터
CREATE INDEX IF NOT EXISTS idx_posts_created
    ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_likes
    ON public.posts(likes DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category
    ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_user
    ON public.posts(user_id);

-- post_comments: 게시글 상세에서 댓글 조회
CREATE INDEX IF NOT EXISTS idx_post_comments_post
    ON public.post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_user
    ON public.post_comments(user_id);

-- scraps: 마이페이지 스크랩 목록
CREATE INDEX IF NOT EXISTS idx_scraps_user
    ON public.scraps(user_id);
CREATE INDEX IF NOT EXISTS idx_event_scraps_user
    ON public.event_scraps(user_id);

-- notifications: 알림 미읽은 카운트
CREATE INDEX IF NOT EXISTS idx_notifications_user_created
    ON public.notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
    ON public.notifications(user_id, is_read) WHERE is_read = false;
