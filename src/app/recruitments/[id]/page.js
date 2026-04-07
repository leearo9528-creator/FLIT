import { createClient } from '@/utils/supabase/server';
import RecruitmentDetailClient from './RecruitmentDetailClient';
import { notFound } from 'next/navigation';

// ISR: 공고 상세는 60초 주기 재생성 (모집중/마감 상태 빠른 반영)
export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: rec } = await supabase
        .from('recruitments')
        .select(`
            title, images, fee_description,
            instance:event_instances(
                location, event_date,
                base_event:base_events(name, image_url),
                organizer:organizers(name)
            )
        `)
        .eq('id', id)
        .maybeSingle();

    if (!rec) return { title: '공고를 찾을 수 없습니다' };

    const eventName = rec.instance?.base_event?.name || '';
    const orgName = rec.instance?.organizer?.name || '';
    const loc = rec.instance?.location || '';
    const date = rec.instance?.event_date || '';

    const title = rec.title;
    const description = [
        orgName,
        eventName,
        loc && `📍${loc}`,
        date && `📅${date}`,
        rec.fee_description && `💰${rec.fee_description}`,
    ].filter(Boolean).join(' · ');

    const ogImage = rec.images?.[0] || rec.instance?.base_event?.image_url;
    const images = ogImage ? [{ url: ogImage }] : undefined;

    return {
        title,
        description,
        openGraph: { title, description, type: 'article', images },
        twitter: { card: 'summary_large_image', title, description, images },
    };
}

export default async function RecruitmentPage({ params }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: recruitment } = await supabase
        .from('recruitments')
        .select(`
            *,
            instance:event_instances(
                id, location, event_date, event_date_end,
                base_event:base_events(id, name, category, avg_event_rating, total_reviews),
                organizer:organizers(id, name, logo_url)
            )
        `)
        .eq('id', id)
        .maybeSingle();

    if (!recruitment) return notFound();

    return <RecruitmentDetailClient recruitment={recruitment} />;
}
