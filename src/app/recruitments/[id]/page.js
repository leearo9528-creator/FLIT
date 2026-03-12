import { createClient } from '@/utils/supabase/server';
import RecruitmentDetailClient from './RecruitmentDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: rec } = await supabase.from('recruitments').select('title, location, brand:brands(name)').eq('id', id).single();
    
    if (!rec) {
        return { title: '공고를 찾을 수 없습니다 - 플릿(FLIT)' };
    }
    
    return {
        title: `${rec.title} - 플릿(FLIT)`,
        description: `${rec.brand?.name}에서 진행하는 ${rec.location} 지역 셀러 모집 공고입니다.`,
    };
}

export default async function RecruitmentPage({ params }) {
    const { id } = await params;
    
    const supabase = await createClient();
    
    // 모집 공고 가져오기 (브랜드 조인)
    const { data: recruitment } = await supabase.from('recruitments')
        .select(`*, brand:brands(id, name, logo_url, average_rating, total_reviews)`)
        .eq('id', id)
        .single();
        
    if (!recruitment) return notFound();

    return <RecruitmentDetailClient recruitment={recruitment} />;
}
