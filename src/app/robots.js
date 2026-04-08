export default function robots() {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://flit-black.vercel.app';
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin',
                    '/mypage',
                    '/api/',
                    '/auth/',
                    '/onboarding',
                    '/reviews/write',
                    '/recruitments/write',
                ],
            },
        ],
        sitemap: `${base}/sitemap.xml`,
    };
}
