-- organizer_pending 플랜 추가: 주최사 승인 대기 상태 지원
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_plan_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_plan_check
    CHECK (plan IN ('free', 'flea_market', 'foodtruck', 'organizer', 'organizer_pending'));
