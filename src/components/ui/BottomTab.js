'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';

const tabs = [
    { key: 'home', label: '홈', icon: '🏠', href: '/' },
    { key: 'search', label: '마켓 찾기', icon: '🔍', href: '/search' },
    { key: 'community', label: '커뮤니티', icon: '💬', href: '/community' },
    { key: 'my', label: '마이', icon: '👤', href: '/mypage' },
];

export default function BottomTab() {
    const pathname = usePathname();
    const { user } = useAuth();

    const getHref = (tab) => {
        if (tab.key === 'my') return user ? '/mypage' : '/login';
        if (tab.key === 'community') return user ? '/community' : '/login';
        return tab.href;
    };

    const isActive = (tab) => {
        if (tab.key === 'home') return pathname === '/';
        return pathname.startsWith(tab.href);
    };

    const showFAB = pathname === '/' || pathname.startsWith('/search');

    return (
        <>
            {/* 플로팅 리뷰 작성 버튼 (홈 & 마켓 찾기 화면에서만) */}
            {showFAB && (
                <div style={{
                    position: 'fixed', bottom: 84, right: 20, zIndex: 99,
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8
                }}>
                    <div style={{
                        background: '#333', color: '#fff', fontSize: 12, fontWeight: 700,
                        padding: '6px 12px', borderRadius: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        position: 'relative'
                    }}>
                        리뷰 3개 쓰면 첫 달 0원! 🎁
                        <div style={{
                            position: 'absolute', bottom: -4, right: 24, width: 8, height: 8,
                            background: '#333', transform: 'rotate(45deg)'
                        }} />
                    </div>
                    <Link href={user ? '/reviews/write' : '/login'} style={{ textDecoration: 'none' }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: '50%',
                            background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.25)', cursor: 'pointer',
                            color: '#fff', fontSize: 24
                        }}>
                            ✏️
                        </div>
                    </Link>
                </div>
            )}

            {/* 하단 탭 바 */}
            <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, height: 64,
                background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)',
                borderTop: `1px solid ${T.border}`, display: 'flex',
                justifyContent: 'space-around', alignItems: 'center', zIndex: 100,
                paddingBottom: 'env(safe-area-inset-bottom)', // 아이폰 하단 바 대응
            }}>
                {tabs.map(tab => {
                    const active = isActive(tab);
                    return (
                        <Link key={tab.key} href={getHref(tab)} style={{ textDecoration: 'none', flex: 1 }}>
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                                padding: '8px 0', cursor: 'pointer',
                            }}>
                                <span style={{ fontSize: 22, filter: active ? 'none' : 'grayscale(1) opacity(0.3)' }}>
                                    {tab.icon}
                                </span>
                                <span style={{
                                    fontSize: 10, fontWeight: active ? 700 : 500,
                                    color: active ? T.blue : T.gray,
                                }}>
                                    {tab.label}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
