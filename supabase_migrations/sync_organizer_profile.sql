-- organizers 테이블에 연락처/홍보링크 컬럼 추가
ALTER TABLE organizers ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE organizers ADD COLUMN IF NOT EXISTS promo_link TEXT;
ALTER TABLE organizers ADD COLUMN IF NOT EXISTS contact_name TEXT;

-- 프로필 → 주최사 동기화 트리거 업데이트
CREATE OR REPLACE FUNCTION public.handle_organizer_plan()
RETURNS TRIGGER AS $$
DECLARE
    v_name TEXT;
BEGIN
    IF NEW.plan = 'organizer' THEN
        v_name := COALESCE(
            NEW.organizer_name,
            (SELECT raw_user_meta_data->>'full_name' FROM auth.users WHERE id = NEW.id),
            '주최사'
        );

        INSERT INTO public.organizers (id, name, description, phone, promo_link, contact_name)
        VALUES (
            NEW.id,
            v_name,
            NEW.organizer_desc,
            NEW.phone,
            NEW.promo_link,
            NEW.real_name
        )
        ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            description = COALESCE(EXCLUDED.description, organizers.description),
            phone = COALESCE(EXCLUDED.phone, organizers.phone),
            promo_link = COALESCE(EXCLUDED.promo_link, organizers.promo_link),
            contact_name = COALESCE(EXCLUDED.contact_name, organizers.contact_name),
            updated_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
