-- ═══════════════════════════════════════════════════════════════
-- 마스터 계정 설정
-- UUID: 8065160c-3a6d-43db-b2c5-ea339dbb4eae
-- ═══════════════════════════════════════════════════════════════

-- profiles에 organizer 플랜 설정
UPDATE public.profiles
SET plan = 'organizer'
WHERE id = '8065160c-3a6d-43db-b2c5-ea339dbb4eae';

-- organizers 테이블에 마스터 주최사 레코드 생성
INSERT INTO public.organizers (id, name, description)
VALUES (
    '8065160c-3a6d-43db-b2c5-ea339dbb4eae',
    '마스터',
    '마스터 계정'
)
ON CONFLICT (id) DO UPDATE
    SET name = EXCLUDED.name;
