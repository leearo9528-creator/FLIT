import { createClient } from '@/utils/supabase/server';
import RecruitmentDetailClient from './RecruitmentDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: rec } = await supabase
        .from('recruitments')
        .select(`
            title,
            instance:event_instances(
                base_event:base_events(name),
                organizer:organizers(name)
            )
        `)
        .eq('id', id)
        .maybeSingle();

    if (!rec) return { title: '공고를 찾을 수 없습니다 - 플릿(FLIT)' };

    const eventName = rec.instance?.base_event?.name || '';
    const orgName = rec.instance?.organizer?.name || '';

    return {
        title: `${rec.title} - 플릿(FLIT)`,
        description: `${orgName}에서 ${eventName}에서 진행하는 모집 공고입니다.`,
    };
}

export default async function RecruitmentPage({ params }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: recruitment } = await supabase
        .from('recruitments')
        .select(`
            *,
            instance:event_instances(
                id, location, event_date, event_date_end,
                base_event:base_events(id, name, category, avg_event_rating, total_reviews),
                organizer:organizers(id, name, logo_url)
            )
        `)
        .eq('id', id)
        .maybeSingle();

    if (!recruitment) return notFound();

    return <RecruitmentDetailClient recruitment={recruitment} />;
}
