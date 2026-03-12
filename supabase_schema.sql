-- ⚠️ [주의] 이 스크립트를 Supabase 대시보드 -> SQL Editor 에 복사해서 실행하세요.
-- ✅ 기존 데이터가 있다면 덮어쓰기 위해 테이블 이름들이 전부 새로 추가되거나 변경됩니다.

-- 1. 프로필 테이블 (Supabase Auth 연동 확장을 위한 User 모델)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  is_subscribed BOOLEAN DEFAULT false,
  subscription_date TIMESTAMPTZ,
  review_count INT DEFAULT 0,
  has_free_trial_used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- (트리거) 유저 가입 시 profiles 테이블에도 동일 인물 자동 복사
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 과거에 가입했던 유저들도 profiles 테이블에 수동 복사 (에러 방지용)
INSERT INTO public.profiles (id, email, name, avatar_url)
SELECT id, email, raw_user_meta_data->>'full_name', raw_user_meta_data->>'avatar_url' 
FROM auth.users
ON CONFLICT (id) DO NOTHING;


-- 2. 주최측 / 브랜드 테이블 (잡플래닛의 기업)
CREATE TABLE IF NOT EXISTS public.brands (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,    -- 예: 문호리 리버마켓
  description TEXT,
  category TEXT,                -- 예: 예술, 플리마켓, 푸드트럭
  logo_url TEXT,
  website_url TEXT,
  average_rating FLOAT DEFAULT 0.0,
  total_reviews INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- 3. 모집 공고 테이블 (잡플래닛의 채용 형태)
CREATE TABLE IF NOT EXISTS public.recruitments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
  title TEXT NOT NULL,          -- 예: [3/20] 문호리 셀러 10팀 모집
  content TEXT NOT NULL,        -- 상세 모집 요강 정보
  location TEXT NOT NULL,
  fee INT NOT NULL DEFAULT 0,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'OPEN',   -- 'OPEN', 'CLOSED'
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- 4. 리뷰 테이블 (주최측에 대한 평가)
CREATE TABLE IF NOT EXISTS public.company_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
  
  -- 구체적인 4대 평가 별점 (1~5)
  rating_profit INT CHECK (rating_profit BETWEEN 1 AND 5),     -- 수익성
  rating_traffic INT CHECK (rating_traffic BETWEEN 1 AND 5),   -- 집객력
  rating_support INT CHECK (rating_support BETWEEN 1 AND 5),   -- 운영지원
  rating_manners INT CHECK (rating_manners BETWEEN 1 AND 5),   -- 주최측 매너
  
  title TEXT,       -- 한 줄 리뷰
  content TEXT,     -- 종합 리뷰 또는 기타
  pros TEXT,        -- 장점
  cons TEXT,        -- 단점
  
  is_verified BOOLEAN DEFAULT false, -- 에디터 입증(영수증 등)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- (트리거) 리뷰가 작성될 때마다 해당 유저의 review_count 를 1씩 증가시키고 브랜드의 평균 별점 갱신
CREATE OR REPLACE FUNCTION public.handle_new_review()
RETURNS TRIGGER AS $$
BEGIN
  -- 유저 작성글 갯수 업데이트
  UPDATE public.profiles 
  SET review_count = review_count + 1 
  WHERE id = new.user_id;

  -- 브랜드 평균점수 재계산 (최대치를 넘기므로 로직은 필요에 따라 백그라운드로 처리하지만 간단히 구현)
  UPDATE public.brands 
  SET total_reviews = total_reviews + 1,
      average_rating = (
         SELECT AVG( (rating_profit + rating_traffic + rating_support + rating_manners) / 4.0 ) 
         FROM public.company_reviews 
         WHERE brand_id = new.brand_id
      )
  WHERE id = new.brand_id;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_review_created ON public.company_reviews;
CREATE TRIGGER on_review_created
  AFTER INSERT ON public.company_reviews
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_review();


-- 5. 스크랩 (유저 - 공고 즐겨찾기 N:M)
CREATE TABLE IF NOT EXISTS public.scraps (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  recruitment_id UUID REFERENCES public.recruitments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, recruitment_id)
);


-- 6. 커뮤니티 (자유게시판)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- 자유게시판, 실시간, 질문 등
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 로우 레벨 시큐리티(RLS) 해제 - 현재 개발용이므로 SELECT/INSERT 모두 오픈.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Insert Profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Profiles" ON public.profiles FOR UPDATE USING (true);

ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Brands" ON public.brands FOR SELECT USING (true);

ALTER TABLE public.recruitments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Recruitments" ON public.recruitments FOR SELECT USING (true);

ALTER TABLE public.company_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Reviews" ON public.company_reviews FOR SELECT USING (true);
CREATE POLICY "Public Insert Reviews" ON public.company_reviews FOR INSERT WITH CHECK (true);

ALTER TABLE public.scraps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Select Scraps" ON public.scraps FOR SELECT USING (true);
CREATE POLICY "Public Insert Scraps" ON public.scraps FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Delete Scraps" ON public.scraps FOR DELETE USING (true);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Select Posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Public Insert Posts" ON public.posts FOR INSERT WITH CHECK (true);
