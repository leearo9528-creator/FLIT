-- 리뷰 열람 권한: 1개 작성 시 1주일 열람 가능 (매주 월요일 00:00 리셋)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_review_at TIMESTAMPTZ;
