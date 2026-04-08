'use client';

// Root layout 자체가 크래시했을 때 렌더되는 최후의 폴백.
// 여기서는 자체 <html>/<body>를 가져야 함 (layout이 살아있지 않음).

export default function GlobalError({ error, reset }) {
    return (
        <html lang="ko">
            <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#F7F8FA' }}>
                <div style={{
                    minHeight: '100vh',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: '0 24px', textAlign: 'center',
                }}>
                    <div style={{ fontSize: 64, marginBottom: 8 }}>💥</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#1A1D1F', marginBottom: 8 }}>
                        앗, 문제가 생겼어요
                    </div>
                    <div style={{ fontSize: 14, color: '#6F767E', lineHeight: 1.7, marginBottom: 32 }}>
                        예기치 못한 오류로 앱이 멈췄어요.<br />
                        새로고침하거나 잠시 후 다시 시도해주세요.
                    </div>
                    <button
                        onClick={() => reset()}
                        style={{
                            padding: '14px 32px', borderRadius: 999,
                            background: '#1A73E8', color: '#fff',
                            fontSize: 15, fontWeight: 700,
                            border: 'none', cursor: 'pointer',
                        }}
                    >
                        다시 시도
                    </button>
                </div>
            </body>
        </html>
    );
}
