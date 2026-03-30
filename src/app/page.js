import { createClient } from '@/utils/supabase/server';
import HomeClient from './HomeClient';

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
