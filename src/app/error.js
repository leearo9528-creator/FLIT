'use client';

import { useEffect } from 'react';
import { T } from '@/lib/design-tokens';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div style={{
            minHeight: '100vh', background: T.bg,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '0 20px', textAlign: 'center',
        }}>
            <div style={{
                width: 80, height: 80, borderRadius: T.radiusXl,
                background: T.redLt, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                marginBottom: 24, fontSize: 36,
            }}>
                ⚠️
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: T.border, marginBottom: 8, letterSpacing: -2 }}>
                500
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 8, letterSpacing: -0.5 }}>
                오류가 발생했어요
            </div>
            <div style={{ fontSize: 14, color: T.gray, lineHeight: 1.6, marginBottom: 36, maxWidth: 280 }}>
                일시적인 문제가 발생했어요.<br />잠시 후 다시 시도해 주세요.
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                    onClick={() => reset()}
                    style={{
                        background: T.blue, color: T.white,
                        padding: '14px 28px', borderRadius: T.radiusFull,
                        fontSize: 15, fontWeight: 700, letterSpacing: -0.3,
                        border: 'none', cursor: 'pointer',
                    }}
                >
                    다시 시도
                </button>
                <a href="/" style={{
                    display: 'inline-block',
                    background: T.white, color: T.textSub,
                    padding: '14px 28px', borderRadius: T.radiusFull,
                    fontSize: 15, fontWeight: 700, letterSpacing: -0.3,
                    border: `1.5px solid ${T.border}`, textDecoration: 'none',
                }}>
                    홈으로
                </a>
            </div>
        </div>
    );
}
