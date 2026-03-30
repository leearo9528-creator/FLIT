-- 공지사항 테이블
CREATE TABLE IF NOT EXISTS public.notices (
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title      TEXT NOT NULL,
    content    TEXT NOT NULL,
    is_pinned  BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Admin can manage notices" ON notices FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
