-- RLS 정책 보완
-- 1. profiles_insert: 비인증 사용자 차단 (handle_new_user 트리거는 SECURITY DEFINER로 RLS 우회)
-- 2. event_instances: 주최사 본인 UPDATE 추가
-- 3. recruitments: 주최사 본인 DELETE 추가

-- ── 1. profiles_insert 수정 ───────────────────────────────────
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- ── 2. event_instances UPDATE (주최사 본인) ───────────────────
DROP POLICY IF EXISTS "event_instances_update" ON public.event_instances;
CREATE POLICY "event_instances_update" ON public.event_instances
    FOR UPDATE USING (auth.uid() = organizer_id);

-- ── 3. recruitments DELETE (주최사 본인) ─────────────────────
DROP POLICY IF EXISTS "recruitments_delete" ON public.recruitments;
CREATE POLICY "recruitments_delete" ON public.recruitments
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.event_instances ei
            JOIN public.organizers o ON o.id = ei.organizer_id
            WHERE ei.id = event_instance_id AND o.id = auth.uid()
        )
    );
