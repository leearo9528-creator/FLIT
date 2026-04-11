-- 공고 작성 폼 재구성:
-- 1) profiles에 저장된 기본 신청 방법/연락처 (프로필 수정에서 저장)
-- 2) recruitments에 공고별 연락처 필드
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS default_application_method TEXT,
ADD COLUMN IF NOT EXISTS default_contact            TEXT;

ALTER TABLE public.recruitments
ADD COLUMN IF NOT EXISTS contact TEXT;
