-- posts 테이블에 author 컬럼 추가
-- Supabase Dashboard > SQL Editor에서 실행

ALTER TABLE public.posts
    ADD COLUMN IF NOT EXISTS author TEXT;
