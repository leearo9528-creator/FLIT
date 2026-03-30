-- 끌올 기능: recruitments 테이블에 bumped_at 컬럼 추가
ALTER TABLE recruitments ADD COLUMN IF NOT EXISTS bumped_at TIMESTAMPTZ;

-- 끌올 시 목록 상단 노출을 위한 정렬 인덱스
CREATE INDEX IF NOT EXISTS idx_recruitments_bumped ON recruitments (GREATEST(bumped_at, created_at) DESC);
