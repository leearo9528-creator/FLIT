-- ═══════════════════════════════════════════════════════════════
-- profiles.plan = 'organizer' 설정 시 organizers 자동 연동
-- ═══════════════════════════════════════════════════════════════

-- ── 1. profiles에 주최사 표시 이름 컬럼 추가 ────────────────────
ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS organizer_name TEXT;

-- ── 2. recruitments에 신청 방법 컬럼 추가 ───────────────────────
ALTER TABLE public.recruitments
    ADD COLUMN IF NOT EXISTS application_method TEXT;

-- ── 3. plan = 'organizer' 설정 시 organizers 레코드 자동 생성 트리거 ──
CREATE OR REPLACE FUNCTION public.handle_organizer_plan()
RETURNS TRIGGER AS $$
DECLARE
    v_name TEXT;
BEGIN
    IF NEW.plan = 'organizer' THEN
        -- auth.users의 메타데이터에서 이름 추출
        SELECT COALESCE(
            NEW.organizer_name,
            (SELECT raw_user_meta_data->>'full_name' FROM auth.users WHERE id = NEW.id),
            (SELECT raw_user_meta_data->>'name'      FROM auth.users WHERE id = NEW.id),
            (SELECT split_part(email, '@', 1)        FROM auth.users WHERE id = NEW.id),
            '주최사'
        ) INTO v_name;

        INSERT INTO public.organizers (id, name)
        VALUES (NEW.id, v_name)
        ON CONFLICT (id) DO UPDATE
            SET name = EXCLUDED.name
            WHERE public.organizers.name IS NULL OR public.organizers.name = '';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_plan_organizer ON public.profiles;
CREATE TRIGGER on_profile_plan_organizer
    AFTER INSERT OR UPDATE OF plan ON public.profiles
    FOR EACH ROW
    WHEN (NEW.plan = 'organizer')
    EXECUTE FUNCTION public.handle_organizer_plan();

-- ── 4. 이미 plan = 'organizer'인 기존 유저들 소급 적용 ──────────
INSERT INTO public.organizers (id, name)
SELECT
    p.id,
    COALESCE(
        p.organizer_name,
        u.raw_user_meta_data->>'full_name',
        u.raw_user_meta_data->>'name',
        split_part(u.email, '@', 1),
        '주최사'
    )
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.plan = 'organizer'
ON CONFLICT (id) DO NOTHING;
