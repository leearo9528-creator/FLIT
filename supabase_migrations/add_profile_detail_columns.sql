-- 프로필 상세 정보 컬럼 추가 (셀러/주최사 공통)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS brand_name TEXT;        -- 셀러: 브랜드명 / 주최사: 주최사명
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS real_name TEXT;         -- 성함
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;             -- 연락처
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS products TEXT;          -- 셀러: 판매 제품
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS promo_link TEXT;        -- 홍보 링크 (인스타, 블로그 등)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS organizer_desc TEXT;    -- 주최사: 주최사 설명
