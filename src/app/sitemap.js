import { createClient } from '@/utils/supabase/server';

export const revalidate = 3600; // 1시간마다 재생성

export default async function sitemap() {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://flit-black.vercel.app';
    const now = new Date();

    // 정적 페이지
    const staticRoutes = [
        '',
        '/search',
        '/calendar',
        '/community',
        '/notices',
        '/notices/guide',
        '/terms',
        '/contact',
        '/login',
    ].map((path) => ({
        url: `${base}${path}`,
        lastModified: now,
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1.0 : 0.7,
    }));

    // 동적 페이지 (DB에서 가져오기)
    let dynamicRoutes = [];
    try {
        const sb = await createClient();
        const [{ data: events }, { data: recruitments }, { data: organizers }, { data: posts }] = await Promise.all([
            sb.from('base_events').select('id, created_at').limit(1000),
            sb.from('recruitments').select('id, created_at').eq('status', 'OPEN').limit(1000),
            sb.from('organizers').select('id, updated_at').limit(500),
            sb.from('posts').select('id, updated_at').order('created_at', { ascending: false }).limit(500),
        ]);

        dynamicRoutes = [
            ...(events || []).map((e) => ({
                url: `${base}/events/${e.id}`,
                lastModified: e.created_at ? new Date(e.created_at) : now,
                changeFrequency: 'weekly',
                priority: 0.8,
            })),
            ...(recruitments || []).map((r) => ({
                url: `${base}/recruitments/${r.id}`,
                lastModified: r.created_at ? new Date(r.created_at) : now,
                changeFrequency: 'daily',
                priority: 0.9,
            })),
            ...(organizers || []).map((o) => ({
                url: `${base}/organizers/${o.id}`,
                lastModified: o.updated_at ? new Date(o.updated_at) : now,
                changeFrequency: 'weekly',
                priority: 0.6,
            })),
            ...(posts || []).map((p) => ({
                url: `${base}/community/${p.id}`,
                lastModified: p.updated_at ? new Date(p.updated_at) : now,
                changeFrequency: 'weekly',
                priority: 0.5,
            })),
        ];
    } catch (err) {
        console.error('sitemap 생성 실패:', err);
    }

    return [...staticRoutes, ...dynamicRoutes];
}
