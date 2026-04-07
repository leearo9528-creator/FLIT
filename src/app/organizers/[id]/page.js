import { createClient } from '@/utils/supabase/server';
import OrganizerDetailClient from './OrganizerDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: org } = await supabase
        .from('organizers')
        .select('name, description, logo_url, total_reviews, total_instances')
        .eq('id', id)
        .maybeSingle();
    if (!org) return { title: '주최사를 찾을 수 없습니다' };

    const title = `${org.name} 주최사 리뷰`;
    const description = org.description
        || `${org.name}의 운영지원·매너 평점과 개최 행사 ${org.total_instances || 0}건, 셀러 리뷰 ${org.total_reviews || 0}건을 확인해보세요.`;
    const images = org.logo_url ? [{ url: org.logo_url }] : undefined;

    return {
        title,
        description,
        openGraph: { title, description, type: 'profile', images },
        twitter: { card: 'summary', title, description, images },
    };
}

export default async function OrganizerPage({ params }) {
    const { id } = await params;
    const supabase = await createClient();

    // 주최사 기본 정보
    const { data: organizer } = await supabase
        .from('organizers')
        .select('id, name, description, logo_url, total_instances, total_reviews, phone, promo_link, contact_name')
        .eq('id', id)
        .maybeSingle();
    if (!organizer) return notFound();

    // 이 주최사가 개최한 행사 인스턴스
    const { data: instances } = await supabase
        .from('event_instances')
        .select('*, base_event:base_events(id, name, category, image_url, total_reviews, avg_event_rating)')
        .eq('organizer_id', id)
        .order('event_date', { ascending: false });

    const instanceIds = (instances || []).map(i => i.id);

    // 모집공고 + 리뷰 병렬 조회
    const [{ data: recruitments }, { data: reviews }] = await Promise.all([
        instanceIds.length > 0
            ? supabase
                .from('recruitments')
                .select('*, instance:event_instances(id, location, event_date, event_date_end, base_event:base_events(id, name))')
                .in('event_instance_id', instanceIds)
                .order('created_at', { ascending: false })
            : { data: [] },
        instanceIds.length > 0
            ? supabase
                .from('reviews')
                .select(`id, event_instance_id, seller_type, is_verified, created_at,
                    rating_profit, rating_traffic, rating_promotion, rating_support, rating_manners,
                    revenue_range, age_groups, visitor_types, pros, cons, content,
                    event_instance:event_instances(id, location, event_date, base_event:base_events(id, name))`)
                .in('event_instance_id', instanceIds)
                .order('created_at', { ascending: false })
            : { data: [] },
    ]);

    return (
        <OrganizerDetailClient
            organizer={organizer}
            instances={instances || []}
            initialRecruitments={recruitments || []}
            initialReviews={reviews || []}
        />
    );
}
