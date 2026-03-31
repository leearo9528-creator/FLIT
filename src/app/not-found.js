import Link from 'next/link';
import { T } from '@/lib/design-tokens';

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh', background: T.bg,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '0 24px', textAlign: 'center',
        }}>
            <div style={{ fontSize: 64, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: T.text, marginBottom: 8 }}>
                페이지를 찾을 수 없어요
            </div>
            <div style={{ fontSize: 14, color: T.gray, lineHeight: 1.7, marginBottom: 32 }}>
                요청하신 페이지가 존재하지 않거나<br />
                삭제되었을 수 있어요.
            </div>
            <Link href="/" style={{
                display: 'inline-block', padding: '14px 32px',
                borderRadius: T.radiusFull, background: T.blue,
                color: '#fff', fontSize: 15, fontWeight: 700,
                textDecoration: 'none',
            }}>
                홈으로 돌아가기
            </Link>
        </div>
    );
}
