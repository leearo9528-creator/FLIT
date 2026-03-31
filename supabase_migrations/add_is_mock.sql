-- 목데이터 구분을 위한 is_mock 컬럼 추가
ALTER TABLE organizers      ADD COLUMN IF NOT EXISTS is_mock boolean DEFAULT false;
ALTER TABLE base_events     ADD COLUMN IF NOT EXISTS is_mock boolean DEFAULT false;
ALTER TABLE event_instances ADD COLUMN IF NOT EXISTS is_mock boolean DEFAULT false;
ALTER TABLE recruitments    ADD COLUMN IF NOT EXISTS is_mock boolean DEFAULT false;
ALTER TABLE reviews         ADD COLUMN IF NOT EXISTS is_mock boolean DEFAULT false;
ALTER TABLE posts           ADD COLUMN IF NOT EXISTS is_mock boolean DEFAULT false;
ALTER TABLE post_comments   ADD COLUMN IF NOT EXISTS is_mock boolean DEFAULT false;
