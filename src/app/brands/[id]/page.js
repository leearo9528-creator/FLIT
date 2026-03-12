import { createClient } from '@/utils/supabase/server';
import BrandDetailClient from './BrandDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: brand } = await supabase.from('brands').select('name, category').eq('id', id).single();
    
    if (!brand) {
        return { title: '브랜드를 찾을 수 없습니다 - 플릿(FLIT)' };
    }
    
    return {
        title: `${brand.name} 셀러 진짜 리뷰 - 플릿(FLIT)`,
        description: `${brand.name} 브랜드에 대한 셀러들의 수익성, 집객력 등 솔직한 평가와 현재 진행 중인 공고를 확인해보세요.`,
    };
}

export default async function BrandPage({ params }) {
    const { id } = await params;
    
    const supabase = await createClient();
    
    // 주최측 정보 가져오기
    const { data: brand } = await supabase.from('brands').select('*').eq('id', id).single();
    if (!brand) return notFound();

    // 해당 주최측의 모집 공고 목록 가져오기
    const { data: recruitments } = await supabase.from('recruitments')
        .select('*')
        .eq('brand_id', id)
        .order('created_at', { ascending: false });

    // 해당 주최측의 리뷰 목록 가져오기
    const { data: reviews } = await supabase.from('company_reviews')
        .select('*')
        .eq('brand_id', id)
        .order('created_at', { ascending: false });

    return (
        <BrandDetailClient brand={brand} initialRecruitments={recruitments || []} initialReviews={reviews || []} />
    );
}
