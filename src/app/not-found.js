'use client';

import Link from 'next/link';
import { T } from '@/lib/design-tokens';

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh', background: T.bg,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '0 20px', textAlign: 'center',
        }}>
            <div style={{
                width: 80, height: 80, borderRadius: T.radiusXl,
                background: T.grayLt, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                marginBottom: 24, fontSize: 36,
            }}>
                🔍
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: T.border, marginBottom: 8, letterSpacing: -2 }}>
                404
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 8, letterSpacing: -0.5 }}>
                페이지를 찾을 수 없어요
            </div>
            <div style={{ fontSize: 14, color: T.gray, lineHeight: 1.6, marginBottom: 36, maxWidth: 280 }}>
                요청하신 페이지가 삭제되었거나<br />주소가 변경되었을 수 있어요.
            </div>
            <Link href="/" style={{
                display: 'inline-block',
                background: T.blue, color: T.white,
                padding: '14px 32px', borderRadius: T.radiusFull,
                fontSize: 15, fontWeight: 700, letterSpacing: -0.3,
                textDecoration: 'none',
            }}>
                홈으로 돌아가기
            </Link>
        </div>
    );
}
