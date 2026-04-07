import { T } from '@/lib/design-tokens';

/* 카드 스켈레톤 (shimmer) */
function CardSkeleton() {
    return (
        <div style={{
            background: T.white, borderRadius: T.radiusLg,
            border: `1px solid ${T.border}`, padding: 16,
            marginBottom: 10,
        }}>
            <div style={{ display: 'flex', gap: 12 }}>
                <div className="skeleton" style={{ width: 56, height: 56, borderRadius: T.radiusMd, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                    <div className="skeleton" style={{ height: 14, marginBottom: 8, width: '60%' }} />
                    <div className="skeleton" style={{ height: 12, marginBottom: 6, width: '40%' }} />
                    <div className="skeleton" style={{ height: 12, width: '80%' }} />
                </div>
            </div>
        </div>
    );
}

export default function Loading() {
    return (
        <div style={{ minHeight: '100vh', background: T.bg, padding: '16px 16px 80px' }}>
            <div style={{ height: 48, background: T.white, marginBottom: 16 }} />
            {Array(5).fill(0).map((_, i) => <CardSkeleton key={i} />)}
        </div>
    );
}
