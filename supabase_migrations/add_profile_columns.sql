-- profiles 테이블에 프로필 정보 컬럼 추가
ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS name TEXT,
    ADD COLUMN IF NOT EXISTS phone TEXT,
    ADD COLUMN IF NOT EXISTS instagram_handle TEXT,
    ADD COLUMN IF NOT EXISTS business_number TEXT;

-- organizers 테이블에도 동일 컬럼 추가 (주최사 전용)
ALTER TABLE organizers
    ADD COLUMN IF NOT EXISTS phone TEXT,
    ADD COLUMN IF NOT EXISTS instagram_handle TEXT,
    ADD COLUMN IF NOT EXISTS business_number TEXT;
