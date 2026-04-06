import { T } from '@/lib/design-tokens';

export default function EmptyState({ icon, title, sub, cta, href, router }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', color: T.gray }}>
            <div style={{ fontSize: 40, marginBottom: 10, opacity: 0.4 }}>{icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13, color: T.gray, marginBottom: cta ? 20 : 0 }}>{sub}</div>
            {cta && href && router && (
                <div onClick={() => router.push(href)} style={{ background: T.blue, color: '#fff', padding: '9px 22px', borderRadius: T.radiusFull, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                    {cta}
                </div>
            )}
        </div>
    );
}
