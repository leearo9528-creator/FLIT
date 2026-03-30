import { createClient } from '@/utils/supabase/server';
import HomeClient from './HomeClient';

export const metadata = {
    title: '플릿(FLIT) - 셀러들이 말하는 진짜 행사 정보',
    description: '플리마켓·팝업스토어 셀러를 위한 행사 정보 플랫폼. 실제 셀러 리뷰, 모집공고, 주최사 정보를 한눈에 확인하세요.',
    keywords: '플리마켓, 팝업스토어, 셀러, 행사정보, 모집공고, 플릿, FLIT',
    openGraph: {
        title: '플릿(FLIT) - 셀러들이 말하는 진짜 행사 정보',
        description: '플리마켓·팝업스토어 셀러를 위한 행사 정보 플랫폼. 실제 셀러 리뷰와 모집공고를 확인하세요.',
        type: 'website',
        locale: 'ko_KR',
        siteName: '플릿(FLIT)',
    },
};

export default async function HomePage() {
    const sb = await createClient();

    const [
        { data: recruitments },
        { data: reviews },
        { data: posts },
    ] = await Promise.all([
        sb.from('recruitments')
            .select(`
                id, title, fee, end_date, status,
                instance:event_instances(
                    id, location, event_date, event_date_end,
                    base_event:base_events(id, name),
                    organizer:organizers(id, name)
                )
            `)
            .eq('status', 'OPEN')
            .order('created_at', { ascending: false })
            .limit(5),
        sb.from('reviews')
            .select(`
                id, seller_type,
                rating_profit, rating_traffic, rating_promotion, rating_support, rating_manners,
                content, created_at,
                event_instance:event_instances(
                    id, event_date,
                    base_event:base_events(id, name)
                )
            `)
            .order('created_at', { ascending: false })
            .limit(5),
        sb.from('posts')
            .select('id, title, content, category, likes, created_at')
            .order('likes', { ascending: false })
            .limit(5),
    ]);

    return (
        <HomeClient
            initialRecruitments={recruitments ?? []}
            initialReviews={reviews ?? []}
            initialPosts={posts ?? []}
        />
    );
}
