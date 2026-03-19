-- 멤버십 플랜 컬럼 추가
-- 실행 위치: Supabase Dashboard > SQL Editor

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free'
    CHECK (plan IN ('free', 'flea_market', 'foodtruck', 'organizer'));

-- 기존 is_subscribed = true 사용자는 flea_market으로 마이그레이션 (필요 시)
-- UPDATE public.profiles SET plan = 'flea_market' WHERE is_subscribed = true AND seller_type = 'seller';
-- UPDATE public.profiles SET plan = 'foodtruck'   WHERE is_subscribed = true AND seller_type = 'foodtruck';
