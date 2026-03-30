-- ═══════════════════════════════════════════════════════════════
-- Supabase Storage 버킷 및 정책 설정
-- ═══════════════════════════════════════════════════════════════

-- ── images 버킷 생성 (이미 있으면 무시) ──────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'images',
    'images',
    true,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];


-- ── Storage RLS 정책 ─────────────────────────────────────────

-- 공개 읽기
CREATE POLICY "images: 공개 읽기"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

-- 로그인 사용자 업로드
CREATE POLICY "images: 로그인 사용자 업로드"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- 본인 파일 수정/삭제 (avatars/ 폴더는 user id 기준)
CREATE POLICY "images: 본인 파일 수정"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[2]);

CREATE POLICY "images: 본인 파일 삭제"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[2]);
