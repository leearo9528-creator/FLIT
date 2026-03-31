import { T } from '@/lib/design-tokens';

export default function Loading() {
    return (
        <div style={{ minHeight: '100vh', background: T.bg }}>
            {/* 헤더 */}
            <div style={{ height: 48, background: T.white, marginBottom: 0 }} />
            {/* 이미지 영역 */}
            <div style={{ height: 220, background: T.grayLt }} />
            {/* 컨텐츠 */}
            <div style={{ padding: '16px 16px 80px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ height: 24, background: T.grayLt, borderRadius: 6, width: '55%' }} />
                <div style={{ height: 14, background: T.grayLt, borderRadius: 6, width: '35%' }} />
                <div style={{ height: 1, background: T.border, marginTop: 4 }} />
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
