import { createClient } from '@/utils/supabase/server';
import EventDetailClient from './EventDetailClient';
import { notFound } from 'next/navigation';

// ISR: 행사 상세는 5분 주기 재생성
export const revalidate = 300;

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: event } = await supabase
        .from('base_events')
        .select('name, category, image_url, total_reviews')
        .eq('id', id)
        .maybeSingle();

    if (!event) return { title: '행사를 찾을 수 없습니다' };

    const title = `${event.name} — 셀러 리뷰`;
    const description = `${event.name}${event.category ? ` (${event.category})` : ''} 행사에 대한 셀러들의 실제 수익성·집객력 평가 ${event.total_reviews || 0}건을 확인해보세요.`;
    const images = event.image_url ? [{ url: event.image_url }] : undefined;

    return {
        title,
        description,
        openGraph: { title, description, type: 'article', images },
        twitter: { card: 'summary_large_image', title, description, images },
    };
}

export default async function EventPage({ params }) {
    const { id } = await params;
    const supabase = await createClient();

    // base_event 조회
    const { data: event } = await supabase
        .from('base_events')
        .select('id, name, category, image_url, total_instances, total_reviews, avg_event_rating')
        .eq('id', id)
        .maybeSingle();
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
                .select(`id, event_instance_id, seller_type, is_verified, created_at,
                    rating_profit, rating_traffic, rating_promotion, rating_support, rating_manners,
                    revenue_range, age_groups, visitor_types, pros, cons, content,
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
