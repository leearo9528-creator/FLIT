import { createClient } from '@/utils/supabase/server';
import EventDetailClient from './EventDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: event } = await supabase
        .from('base_events')
        .select('name')
        .eq('id', id)
        .single();

    if (!event) return { title: '행사를 찾을 수 없습니다 - 플릿(FLIT)' };

    return {
        title: `${event.name} 행사 진짜 리뷰 - 플릿(FLIT)`,
        description: `${event.name} 행사에 대한 셀러들의 실제 수익성·집객력 평가를 확인해보세요.`,
    };
}

export default async function EventPage({ params }) {
    const { id } = await params;
    const supabase = await createClient();

    // base_event 조회
    const { data: event } = await supabase
        .from('base_events')
        .select('*')
        .eq('id', id)
        .single();
    if (!event) return notFound();

    // 개최 이력 (instances)
    const { data: instances } = await supabase
        .from('event_instances')
        .select('*, organizer:organizers(id, name, logo_url)')
        .eq('base_event_id', id)
        .order('event_date', { ascending: false });

    const instanceIds = (instances || []).map(i => i.id);

    // 리뷰 + 공고 병렬 조회
    const [{ data: reviews }, { data: recruitments }] = await Promise.all([
        instanceIds.length > 0
            ? supabase
                .from('reviews')
                .select(`*,
                    event_instance:event_instances(id, location, event_date, organizer:organizers(name))`)
                .in('event_instance_id', instanceIds)
                .order('created_at', { ascending: false })
            : { data: [] },
        instanceIds.length > 0
            ? supabase
                .from('recruitments')
                .select('*, instance:event_instances(id, location, event_date, event_date_end, organizer:organizers(name))')
                .in('event_instance_id', instanceIds)
                .order('created_at', { ascending: false })
            : { data: [] },
    ]);

    return (
        <EventDetailClient
            event={event}
            instances={instances || []}
            initialReviews={reviews || []}
            initialRecruitments={recruitments || []}
        />
    );
}
