-- 관리자 삭제 권한: is_admin = true인 유저가 데이터를 삭제할 수 있도록 RLS 정책 추가

-- base_events
ALTER TABLE base_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read base_events" ON base_events FOR SELECT USING (true);
CREATE POLICY "Admin can insert base_events" ON base_events FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admin can update base_events" ON base_events FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admin can delete base_events" ON base_events FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- organizers
ALTER TABLE organizers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read organizers" ON organizers FOR SELECT USING (true);
CREATE POLICY "Admin can insert organizers" ON organizers FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admin can update organizers" ON organizers FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admin can delete organizers" ON organizers FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- event_instances
ALTER TABLE event_instances ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read event_instances" ON event_instances FOR SELECT USING (true);
CREATE POLICY "Admin can insert event_instances" ON event_instances FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admin can delete event_instances" ON event_instances FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- recruitments
ALTER TABLE recruitments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read recruitments" ON recruitments FOR SELECT USING (true);
CREATE POLICY "Admin can insert recruitments" ON recruitments FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admin can update recruitments" ON recruitments FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admin can delete recruitments" ON recruitments FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin can delete reviews" ON reviews FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Users can insert own posts" ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users or admin can delete posts" ON posts FOR DELETE USING (
    auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- post_comments
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read post_comments" ON post_comments FOR SELECT USING (true);
CREATE POLICY "Users can insert own comments" ON post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON post_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users or admin can delete comments" ON post_comments FOR DELETE USING (
    auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin can update any profile" ON profiles FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- scraps
ALTER TABLE scraps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own scraps" ON scraps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scraps" ON scraps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own scraps" ON scraps FOR DELETE USING (auth.uid() = user_id);
