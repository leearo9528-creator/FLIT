export default function robots() {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.flitunion.com';
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
                    '/reviews/write',
                    '/recruitments/write',
                ],
            },
        ],
        sitemap: `${base}/sitemap.xml`,
    };
}
