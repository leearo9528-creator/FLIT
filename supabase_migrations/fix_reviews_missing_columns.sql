-- ═══════════════════════════════════════════════════════════════
-- reviews 테이블 누락 컬럼 추가
-- ═══════════════════════════════════════════════════════════════

-- 앱 코드에서 사용 중이나 v2_architecture.sql에 없던 컬럼들
ALTER TABLE public.reviews
    ADD COLUMN IF NOT EXISTS rating_promotion INT CHECK (rating_promotion BETWEEN 1 AND 5),
    ADD COLUMN IF NOT EXISTS age_groups       TEXT[],
    ADD COLUMN IF NOT EXISTS visitor_types    TEXT[];

-- organizers: name UNIQUE 제약 완화 (profiles.id 1:1 매핑 방식에서 충돌 방지)
-- name이 빈 문자열이거나 NULL인 케이스 허용
ALTER TABLE public.organizers
    ALTER COLUMN name DROP NOT NULL;

DROP INDEX IF EXISTS organizers_name_key;
