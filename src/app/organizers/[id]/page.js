import { createClient } from '@/utils/supabase/server';
import OrganizerDetailClient from './OrganizerDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: organizer } = await supabase.from('organizers').select('name, description').eq('id', id).single();
    
    if (!organizer) {
        return { title: '주최측을 찾을 수 없습니다 - 플릿(FLIT)' };
    }
    
    return {
        title: `${organizer.name} 셀러 진짜 리뷰 - 플릿(FLIT)`,
        description: `${organizer.name} 기획사에 대한 운영지원, 매너 평점과 현재 진행 중인 공고를 확인해보세요.`,
    };
}

export default async function OrganizerPage({ params }) {
    const { id } = await params;
    
    const supabase = await createClient();
    
    // 주최측 정보 가져오기
    const { data: organizer } = await supabase.from('organizers').select('*').eq('id', id).single();
    if (!organizer) return notFound();

    // 해당 주최측의 모집 공고 목록 가져오기 (행사 주소 포함)
    const { data: recruitments } = await supabase.from('recruitments')
        .select('*, event:events(name, location)')
        .eq('organizer_id', id)
        .order('created_at', { ascending: false });

    // 해당 주최측의 리뷰 목록 가져오기
    const { data: reviews } = await supabase.from('company_reviews')
        .select('*')
        .eq('organizer_id', id)
        .order('created_at', { ascending: false });

    return (
        <OrganizerDetailClient organizer={organizer} initialRecruitments={recruitments || []} initialReviews={reviews || []} />
    );
}
