import { createClient } from '@/utils/supabase/server';
import EventDetailClient from './EventDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: event } = await supabase.from('events').select('name, location').eq('id', id).single();
    
    if (!event) {
        return { title: '장소를 찾을 수 없습니다 - 플릿(FLIT)' };
    }
    
    return {
        title: `${event.name} 장소 진짜 리뷰 - 플릿(FLIT)`,
        description: `${event.name} 장소에 대한 셀러들의 수익성, 집객력 진짜 평가를 확인해보세요.`,
    };
}

export default async function EventPage({ params }) {
    const { id } = await params;
    
    const supabase = await createClient();
    
    // 장소(행사) 정보 가져오기
    const { data: event } = await supabase.from('events').select('*').eq('id', id).single();
    if (!event) return notFound();

    // 해당 장소의 리뷰 목록 가져오기
    const { data: reviews } = await supabase.from('company_reviews')
        .select('*')
        .eq('event_id', id)
        .order('created_at', { ascending: false });

    return (
        <EventDetailClient event={event} initialReviews={reviews || []} />
    );
}
