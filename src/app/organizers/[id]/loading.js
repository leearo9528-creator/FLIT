import { T } from '@/lib/design-tokens';

export default function Loading() {
    return (
        <div style={{ minHeight: '100vh', background: T.bg }}>
            <div style={{ height: 48, background: T.white }} />
            <div style={{ padding: '16px 16px 80px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: T.grayLt }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ height: 18, background: T.grayLt, borderRadius: 6, width: '50%', marginBottom: 8 }} />
                        <div style={{ height: 13, background: T.grayLt, borderRadius: 6, width: '35%' }} />
                    </div>
                </div>
                <div style={{ height: 1, background: T.border }} />
                {Array(4).fill(0).map((_, i) => (
                    <div key={i} style={{
                        background: T.white, borderRadius: T.radiusLg,
                        border: `1px solid ${T.border}`, padding: 16, height: 72,
                    }} />
                ))}
            </div>
        </div>
    );
}
