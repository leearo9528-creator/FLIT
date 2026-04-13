'use client';

import { useEffect } from 'react';
import { T } from '@/lib/design-tokens';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error('페이지 오류 발생');
    }, [error]);

    return (
        <div style={{
            minHeight: '100vh', background: T.bg,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '0 24px', textAlign: 'center',
        }}>
            <div style={{ fontSize: 64, marginBottom: 8 }}>⚠️</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: T.text, marginBottom: 8 }}>
                오류가 발생했어요
            </div>
            <div style={{ fontSize: 14, color: T.gray, lineHeight: 1.7, marginBottom: 32 }}>
                일시적인 오류가 발생했어요.<br />
                잠시 후 다시 시도해주세요.
            </div>
            <button
                onClick={reset}
                style={{
                    padding: '14px 32px', borderRadius: T.radiusFull,
                    background: T.blue, color: '#fff',
                    fontSize: 15, fontWeight: 700,
                    border: 'none', cursor: 'pointer',
                }}
            >
                다시 시도
            </button>
        </div>
    );
}
