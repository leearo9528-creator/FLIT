-- 모집공고, 게시글에 이미지 배열 컬럼 추가
ALTER TABLE recruitments ADD COLUMN IF NOT EXISTS images TEXT[];
ALTER TABLE posts ADD COLUMN IF NOT EXISTS images TEXT[];

-- Supabase Storage 버킷 생성 (SQL로는 불가 — 대시보드에서 수동 생성 필요)
-- 버킷명: images
-- Public: true
