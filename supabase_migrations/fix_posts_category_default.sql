-- posts.category 컬럼 default 값 설정
-- (커뮤니티 글쓰기에서 카테고리 선택 UI 제거 이후 INSERT 실패 방지)
ALTER TABLE public.posts
    ALTER COLUMN category SET DEFAULT '일반';
