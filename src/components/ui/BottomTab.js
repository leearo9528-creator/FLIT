'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';

const tabs = [
    { key: 'home', label: '홈', icon: '🏠', href: '/' },
    { key: 'review', label: '리뷰작성', icon: '✏️', href: '/reviews/write' },
    { key: 'my', label: '마이', icon: '👤', href: '/mypage' },
];

export default function BottomTab() {
    const pathname = usePathname();
    const { user } = useAuth();

    const getHref = (tab) => {
        if (tab.key === 'my') return user ? '/mypage' : '/login';
        if (tab.key === 'review') return user ? '/reviews/write' : '/login';
        return tab.href;
    };

    const isActive = (tab) => {
        if (tab.key === 'home') return pathname === '/';
        return pathname.startsWith(tab.href);
    };

    return (
        <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, height: 64,
            background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)',
            borderTop: `1px solid ${T.border}`, display: 'flex',
            justifyContent: 'space-around', alignItems: 'center', zIndex: 100,
        }}>
            {tabs.map(tab => {
                const active = isActive(tab);
                return (
                    <Link key={tab.key} href={getHref(tab)} style={{ textDecoration: 'none' }}>
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                            padding: '6px 16px', cursor: 'pointer',
                        }}>
                            <span style={{ fontSize: 20, filter: active ? 'none' : 'grayscale(1) opacity(0.5)' }}>
                                {tab.icon}
                            </span>
                            <span style={{
                                fontSize: 11, fontWeight: active ? 700 : 500,
                                color: active ? T.blue : T.gray,
                            }}>
                                {tab.label}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
