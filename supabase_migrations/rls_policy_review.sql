-- ═══════════════════════════════════════════════════════════════
-- RLS 정책 보완 (2026-03-30)
-- 주요 수정:
--   1. profiles INSERT: auth.uid() = id 로 강화
--   2. recruitments DELETE: 주최사 본인 삭제 추가
--   3. event_instances UPDATE/DELETE: 주최사 본인 권한 추가
--   4. reviews DELETE: 본인 + 관리자 병합
-- ═══════════════════════════════════════════════════════════════


-- ── profiles ─────────────────────────────────────────────────
-- INSERT: auth trigger(SECURITY DEFINER)는 RLS 우회하므로
--         일반 클라이언트는 자기 id로만 삽입 가능하게 강화
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
CREATE POLICY "profiles_insert" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);


-- ── event_instances: 주최사 본인 UPDATE/DELETE 추가 ──────────
DROP POLICY IF EXISTS "event_instances_update" ON public.event_instances;
CREATE POLICY "event_instances_update" ON public.event_instances
    FOR UPDATE USING (
        organizer_id = auth.uid()
        OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
    );

DROP POLICY IF EXISTS "event_instances_delete" ON public.event_instances;
CREATE POLICY "event_instances_delete" ON public.event_instances
    FOR DELETE USING (
        organizer_id = auth.uid()
        OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
    );


-- ── recruitments: 주최사 본인 DELETE 추가 ───────────────────
DROP POLICY IF EXISTS "recruitments_delete" ON public.recruitments;
CREATE POLICY "recruitments_delete" ON public.recruitments
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.event_instances ei
            WHERE ei.id = event_instance_id AND ei.organizer_id = auth.uid()
        )
        OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
    );


-- ── reviews: 본인 + 관리자 DELETE ───────────────────────────
DROP POLICY IF EXISTS "reviews_delete" ON public.reviews;
CREATE POLICY "reviews_delete" ON public.reviews
    FOR DELETE USING (
        auth.uid() = user_id
        OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
    );


-- ── organizers: 관리자 INSERT 허용 ──────────────────────────
-- (트리거가 SECURITY DEFINER로 처리하지만 혹시 모를 경우를 위해)
DROP POLICY IF EXISTS "organizers_insert" ON public.organizers;
CREATE POLICY "organizers_insert" ON public.organizers
    FOR INSERT WITH CHECK (
        auth.uid() = id
        OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
    );
