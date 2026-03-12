import { createClient } from '@/utils/supabase/server';
import RecruitmentDetailClient from './RecruitmentDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: rec } = await supabase.from('recruitments').select('title, event:events(name, location), organizer:organizers(name)').eq('id', id).single();
    
    if (!rec) {
        return { title: '공고를 찾을 수 없습니다 - 플릿(FLIT)' };
    }
    
    return {
        title: `${rec.title} - 플릿(FLIT)`,
        description: `${rec.organizer?.name}에서 ${rec.event?.name}에서 진행하는 모집 공고입니다.`,
    };
}

export default async function RecruitmentPage({ params }) {
    const { id } = await params;
    
    const supabase = await createClient();
    
    // 모집 공고 가져오기 (이벤트, 주최측 조인)
    const { data: recruitment } = await supabase.from('recruitments')
        .select(`
            *,
            organizer:organizers(id, name, logo_url, average_support, average_manners, total_reviews),
            event:events(id, name, location, location_sido, category, avg_rating, average_profit, average_traffic, total_reviews, review_count)
        `)
        .eq('id', id)
        .single();
        
    if (!recruitment) return notFound();

    return <RecruitmentDetailClient recruitment={recruitment} />;
}
