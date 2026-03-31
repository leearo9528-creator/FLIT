import { T } from '@/lib/design-tokens';

export default function Loading() {
    return (
        <div style={{ minHeight: '100vh', background: T.bg }}>
            <div style={{ height: 48, background: T.white }} />
            <div style={{ padding: '16px 16px 80px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ height: 22, background: T.grayLt, borderRadius: 6, width: '70%' }} />
                <div style={{ height: 14, background: T.grayLt, borderRadius: 6, width: '40%' }} />
                <div style={{ height: 1, background: T.border }} />
                {Array(5).fill(0).map((_, i) => (
                    <div key={i} style={{
                        background: T.white, borderRadius: T.radiusLg,
                        border: `1px solid ${T.border}`, padding: 20, height: 90,
                    }} />
                ))}
            </div>
        </div>
    );
}
