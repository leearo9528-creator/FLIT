-- 행사 스크랩 테이블 추가
CREATE TABLE IF NOT EXISTS public.event_scraps (
    user_id       UUID REFERENCES public.profiles(id)     ON DELETE CASCADE,
    base_event_id UUID REFERENCES public.base_events(id)  ON DELETE CASCADE,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, base_event_id)
);

ALTER TABLE event_scraps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own event_scraps" ON event_scraps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own event_scraps" ON event_scraps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own event_scraps" ON event_scraps FOR DELETE USING (auth.uid() = user_id);
