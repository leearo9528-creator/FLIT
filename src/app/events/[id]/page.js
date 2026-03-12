import { createClient } from '@/utils/supabase/server';
import EventDetailClient from './EventDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: event } = await supabase.from('events').select('name, location_sido').eq('id', id).single();
    
    if (!event) {
        return { title: '행사를 찾을 수 없습니다 - 플릿(FLIT)' };
    }
    
    return {
        title: `${event.name} - 플릿(FLIT) | 셀러 진짜 리뷰`,
        description: `${event.location_sido} 지역에서 진행되는 ${event.name}에 대한 셀러들의 솔직한 평가를 확인해보세요.`,
    };
}

export default async function EventPage({ params }) {
    const { id } = await params;
    
    const supabase = await createClient();
    
    // 행사 정보 가져오기
    const { data: event } = await supabase.from('events').select('*').eq('id', id).single();
    if (!event) return notFound();

    // 관련 리뷰 목록 가져오기
    const { data: reviews } = await supabase.from('reviews')
        .select('*')
        .eq('event_id', id)
        .order('created_at', { ascending: false });

    return (
        <EventDetailClient event={event} initialReviews={reviews || []} />
    );
}
