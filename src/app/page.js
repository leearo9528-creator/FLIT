import { createClient } from '@/utils/supabase/server';
import HomeClient from './HomeClient';

export const metadata = {
    title: '플릿 (FLIT) — 셀러들이 말하는 진짜 행사 정보',
    description: '플리마켓·팝업스토어 셀러를 위한 행사 정보 플랫폼. 모집공고, 셀러 리뷰, 주최사 정보를 한 곳에서 확인하세요.',
};

export default async function HomePage() {
    const sb = await createClient();

    const { data: recruitments } = await sb.from('recruitments')
        .select(`
            id, title, fee, fee_description, end_date, status,
            instance:event_instances(
                id, location, event_date, event_date_end,
                base_event:base_events(id, name),
                organizer:organizers(id, name)
            )
        `)
        .eq('status', 'OPEN')
        .order('created_at', { ascending: false })
        .limit(5);

    return <HomeClient initialRecruitments={recruitments ?? []} />;
}
