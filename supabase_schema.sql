-- ⚠️⚠️⚠️ [중요] 기존 구버전 테이블들을 모두 삭제하고 완전히 새롭게 생성합니다 ⚠️⚠️⚠️
DROP TABLE IF EXISTS public.company_reviews CASCADE;
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.scraps CASCADE;
DROP TABLE IF EXISTS public.recruitments CASCADE;
DROP TABLE IF EXISTS public.organizers CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.brands CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 1. 프로필 테이블 (구독 및 리뷰 수 트래킹)
CREATE TABLE public.profiles (
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

-- (트리거) 유저 가입 시 profiles 테이블 복사
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


-- 2. 행사/장소 테이블 ("장소에 대한 매출과 집객력" 평가 대상)
-- 예: 여의도 한강공원 벚꽃축제, 코엑스 윈터페스티벌
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,    
  location TEXT,                -- 예: 서울 영등포구
  category TEXT,                -- 예: 플리마켓, 푸드트럭, 팝업
  image_url TEXT,
  
  -- 장소에 대한 통계 (수익성, 집객력)
  average_profit FLOAT DEFAULT 0.0,
  average_traffic FLOAT DEFAULT 0.0,
  total_reviews INT DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- 3. 주최측/기획사 테이블 ("주최측의 일처리와 매너" 평가 대상)
-- 예: A플리마켓 기획단, B컴퍼니
CREATE TABLE public.organizers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,    
  description TEXT,
  logo_url TEXT,
  
  -- 주최측에 대한 통계 (운영지원, 매너)
  average_support FLOAT DEFAULT 0.0,
  average_manners FLOAT DEFAULT 0.0,
  total_reviews INT DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- 4. 모집 공고 테이블
-- 어떤 행사(Event)에 대해, 어떤 주최측(Organizer)이 셀러를 모집하는가
CREATE TABLE public.recruitments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  organizer_id UUID REFERENCES public.organizers(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,          -- 예: [3/20] 여의도 벚꽃축제 셀러 10팀 모집
  content TEXT NOT NULL,        -- 상세 모집 요강 정보
  fee INT NOT NULL DEFAULT 0,   -- 참가비
  
  start_date TIMESTAMPTZ NOT NULL,  -- 모집 시작
  end_date TIMESTAMPTZ NOT NULL,    -- 모집 마감
  event_date TIMESTAMPTZ NOT NULL,  -- 실제 행사 일자
  
  status TEXT DEFAULT 'OPEN',   -- 'OPEN', 'CLOSED'
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- 5. 리뷰 테이블
CREATE TABLE public.company_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- 두 가지 대상을 모두 참조
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  organizer_id UUID REFERENCES public.organizers(id) ON DELETE SET NULL,  
  
  -- [행사/장소 평가]
  rating_profit INT CHECK (rating_profit BETWEEN 1 AND 5),     
  rating_traffic INT CHECK (rating_traffic BETWEEN 1 AND 5),   
  
  -- [주최측 평가]
  rating_support INT CHECK (rating_support BETWEEN 1 AND 5),   
  rating_manners INT CHECK (rating_manners BETWEEN 1 AND 5),   
  
  title TEXT,       
  content TEXT,     
  pros TEXT,        
  cons TEXT,        
  
  is_verified BOOLEAN DEFAULT false, 
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- (트리거) 리뷰 작성 시 장소(events)와 주최측(organizers) 양쪽의 평점을 업데이트
CREATE OR REPLACE FUNCTION public.handle_new_advanced_review()
RETURNS TRIGGER AS $$
BEGIN
  -- 1) 유저 작성글 갯수 업데이트
  UPDATE public.profiles 
  SET review_count = review_count + 1 
  WHERE id = new.user_id;

  -- 2) 장소(Event) 통계 업데이트: 수익성, 집객력 별점 평균 계산
  UPDATE public.events 
  SET total_reviews = total_reviews + 1,
      average_profit = (SELECT AVG(rating_profit) FROM public.company_reviews WHERE event_id = new.event_id),
      average_traffic = (SELECT AVG(rating_traffic) FROM public.company_reviews WHERE event_id = new.event_id)
  WHERE id = new.event_id;

  -- 3) 주최측(Organizer) 통계 업데이트: 운영지원, 매너 별점 평균 계산
  IF new.organizer_id IS NOT NULL THEN
    UPDATE public.organizers 
    SET total_reviews = total_reviews + 1,
        average_support = (SELECT AVG(rating_support) FROM public.company_reviews WHERE organizer_id = new.organizer_id),
        average_manners = (SELECT AVG(rating_manners) FROM public.company_reviews WHERE organizer_id = new.organizer_id)
    WHERE id = new.organizer_id;
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_advanced_review_created ON public.company_reviews;
CREATE TRIGGER on_advanced_review_created
  AFTER INSERT ON public.company_reviews
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_advanced_review();


-- 6. 스크랩 (유저 - 공고 즐겨찾기 N:M)
CREATE TABLE public.scraps (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  recruitment_id UUID REFERENCES public.recruitments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, recruitment_id)
);


-- 무시해도 되는 자유게시판 테이블
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, 
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 해제 (개발용 오픈)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public Insert Profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public Update Profiles" ON public.profiles;
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Insert Profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Profiles" ON public.profiles FOR UPDATE USING (true);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Events" ON public.events;
CREATE POLICY "Public Read Events" ON public.events FOR SELECT USING (true);

ALTER TABLE public.organizers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Organizers" ON public.organizers;
CREATE POLICY "Public Read Organizers" ON public.organizers FOR SELECT USING (true);

ALTER TABLE public.recruitments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Recruitments" ON public.recruitments;
CREATE POLICY "Public Read Recruitments" ON public.recruitments FOR SELECT USING (true);

ALTER TABLE public.company_reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Reviews" ON public.company_reviews;
DROP POLICY IF EXISTS "Public Insert Reviews" ON public.company_reviews;
CREATE POLICY "Public Read Reviews" ON public.company_reviews FOR SELECT USING (true);
CREATE POLICY "Public Insert Reviews" ON public.company_reviews FOR INSERT WITH CHECK (true);
