'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';

const tabs = [
    { key: 'home', label: '홈', icon: '🏠', href: '/' },
    { key: 'search', label: '행사 찾기', icon: '🔍', href: '/search' },
    { key: 'community', label: '커뮤니티', icon: '💬', href: '/community' },
    { key: 'my', label: '마이', icon: '👤', href: '/mypage' },
];

const FREE_REVIEW_TARGET = 3;

export default function BottomTab() {
    const pathname = usePathname();
    const { user } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [reviewCount, setReviewCount] = useState(null);
    const [pendingPath, setPendingPath] = useState(null);
    const router = useRouter();

    // 실제 navigation 완료되면 pending 초기화
    useEffect(() => { setPendingPath(null); }, [pathname]);

    /* fetch user review count for the tooltip */
    useEffect(() => {
        if (!user) { setReviewCount(null); return; }
        (async () => {
            const sb = createClient();
            const { data } = await sb
                .from('profiles')
                .select('review_count, is_subscribed')
                .eq('id', user.id)
                .single();
            if (data) setReviewCount(data.review_count ?? 0);
        })();
    }, [user]);

    const remaining = reviewCount !== null
        ? Math.max(0, FREE_REVIEW_TARGET - reviewCount)
        : null;

    const getHref = (tab) => {
        if (tab.key === 'my') return user ? '/mypage' : '/login';
        if (tab.key === 'community') return user ? '/community' : '/login';
        return tab.href;
    };

    const isActive = (tab) => {
        const activePath = pendingPath ?? pathname;
        if (tab.key === 'home') return activePath === '/';
        return activePath.startsWith(tab.href);
    };

    const handleTabClick = (tab) => {
        const href = getHref(tab);
        setPendingPath(href);
        router.push(href);
    };

    const showFAB = pathname === '/' || pathname.startsWith('/search') || pathname.startsWith('/community');

    const handleWriteClick = (path) => {
        setIsMenuOpen(false);
        if (!user) {
            alert('로그인이 필요한 기능입니다.');
            router.push('/login');
            return;
        }
        router.push(path);
    };

    return (
        <>
            {/* 글쓰기 메뉴 배경 (열렸을 때) */}
            {isMenuOpen && (
                <div 
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.5)', zIndex: 98,
                        backdropFilter: 'blur(2px)'
                    }}
                />
            )}

            {/* 플로팅 리뷰 작성 버튼 (홈, 마켓 찾기, 커뮤니티) */}
            {showFAB && (
                <div style={{
                    position: 'fixed', bottom: 84, right: 20, zIndex: 99,
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12
                }}>
                    {/* 글쓰기 옵션 메뉴 */}
                    {isMenuOpen && (
                        <div style={{
                            display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end',
                            animation: 'slideUp 0.2s ease-out'
                        }}>
                            <div 
                                onClick={() => handleWriteClick('/reviews/write')}
                                style={{ 
                                    background: T.white, padding: '12px 20px', borderRadius: 24, 
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer',
                                    fontSize: 15, fontWeight: 700, color: T.text,
                                    display: 'flex', alignItems: 'center', gap: 8
                                }}
                            >
                                ✏️ 리뷰 작성하기 
                            </div>
                            <div 
                                onClick={() => handleWriteClick('/community/write')}
                                style={{ 
                                    background: T.white, padding: '12px 20px', borderRadius: 24, 
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer',
                                    fontSize: 15, fontWeight: 700, color: T.text,
                                    display: 'flex', alignItems: 'center', gap: 8
                                }}
                            >
                                💬 커뮤니티 글쓰기
                            </div>
                        </div>
                    )}

                    {!isMenuOpen && (
                        <div style={{
                            background: '#1A1A1A', color: '#fff', fontSize: 12, fontWeight: 700,
                            padding: '7px 13px', borderRadius: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                            position: 'relative', animation: 'fadeIn 0.3s ease-in',
                            whiteSpace: 'nowrap',
                        }}>
                            {remaining !== null && remaining > 0
                                ? `이번 달 무료 혜택까지 ${remaining}개 남음 🎁`
                                : remaining === 0
                                    ? '혜택 달성! 구독하고 혜택 받기 🎉'
                                    : '리뷰 3개 쓰면 첫 달 0원! 🎁'
                            }
                            <div style={{
                                position: 'absolute', bottom: -4, right: 24, width: 8, height: 8,
                                background: '#1A1A1A', transform: 'rotate(45deg)',
                            }} />
                        </div>
                    )}

                    <div 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{
                            width: 56, height: 56, borderRadius: '50%',
                            background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.25)', cursor: 'pointer',
                            color: '#fff', fontSize: 24,
                            transform: isMenuOpen ? 'rotate(45deg)' : 'none',
                            transition: 'transform 0.2s ease'
                        }}
                    >
                        {isMenuOpen ? '➕' : '✏️'}
                    </div>
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
                        <div
                            key={tab.key}
                            onClick={() => handleTabClick(tab)}
                            style={{
                                flex: 1, display: 'flex', flexDirection: 'column',
                                alignItems: 'center', gap: 4, padding: '8px 0',
                                cursor: 'pointer', touchAction: 'manipulation',
                                WebkitTapHighlightColor: 'transparent',
                                userSelect: 'none', WebkitUserSelect: 'none',
                                transition: 'transform 0.08s',
                                transform: active ? 'scale(1.08)' : 'scale(1)',
                            }}
                        >
                            <span style={{ fontSize: 22, filter: active ? 'none' : 'grayscale(1) opacity(0.3)', transition: 'filter 0.1s' }}>
                                {tab.icon}
                            </span>
                            <span style={{
                                fontSize: 10, fontWeight: active ? 700 : 500,
                                color: active ? T.blue : T.gray,
                                transition: 'color 0.1s',
                            }}>
                                {tab.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
