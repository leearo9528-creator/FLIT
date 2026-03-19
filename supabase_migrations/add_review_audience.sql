-- reviews 테이블에 누락된 컬럼 추가
-- Supabase Dashboard > SQL Editor에서 실행

ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS rating_promotion  INT CHECK (rating_promotion BETWEEN 1 AND 5),
  ADD COLUMN IF NOT EXISTS age_groups        TEXT[],   -- 방문객 연령대 (복수 선택): ['20대','30대']
  ADD COLUMN IF NOT EXISTS visitor_types     TEXT[];   -- 방문 유형 (복수 선택): ['커플 / 연인','친구 / 지인']
