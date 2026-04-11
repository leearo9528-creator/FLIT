-- 모집공고: 모집 품목 컬럼 추가 (예: "먹거리 불가, 악세사리 마감" 등)
ALTER TABLE public.recruitments
ADD COLUMN IF NOT EXISTS recruitment_items TEXT;
