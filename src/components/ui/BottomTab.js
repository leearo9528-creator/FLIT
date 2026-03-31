'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';

const tabs = [
    { key: 'home', label: '홈', icon: '🏠', href: '/' },
    { key: 'search', label: '행사 찾기', icon: '🔍', href: '/search' },
    { key: 'calendar', label: '달력', icon: '📅', href: '/calendar' },
    { key: 'community', label: '커뮤니티', icon: '💬', href: '/community' },
    { key: 'my', label: '마이', icon: '👤', href: '/mypage' },
];

export default function BottomTab() {
    const pathname = usePathname();
    const { user, plan, canViewReviews } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pendingPath, setPendingPath] = useState(null);
    const router = useRouter();

    // 실제 navigation 완료되면 pending 초기화
    useEffect(() => { setPendingPath(null); }, [pathname]);

    const isOrganizer = plan === 'organizer';

    const getHref = (tab) => {
        if (tab.key === 'my') return user ? '/mypage' : '/login';
        if (tab.key === 'community') return '/community';
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

    const showFAB = pathname === '/' || pathname.startsWith('/search') || pathname === '/community' || pathname.startsWith('/calendar');
    const showPromo = showFAB && !isOrganizer && !canViewReviews;

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
                    {/* 리뷰 홍보 말풍선 */}
                    {showPromo && !isMenuOpen && (
                        <div style={{
                            background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
                            color: '#fff', borderRadius: 20, padding: '8px 14px',
                            fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap',
                            boxShadow: '0 4px 14px rgba(255,107,107,0.45)',
                            position: 'relative',
                        }}>
                            ✍️ 리뷰 1개 작성하고 리뷰 전체 보기!
                            {/* 말풍선 꼬리 */}
                            <div style={{
                                position: 'absolute', bottom: -7, right: 20,
                                width: 0, height: 0,
                                borderLeft: '7px solid transparent',
                                borderRight: '7px solid transparent',
                                borderTop: '8px solid #FF8E53',
                            }} />
                        </div>
                    )}
                    {/* 글쓰기 옵션 메뉴 */}
                    {isMenuOpen && (
                        <div style={{
                            display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end',
                            animation: 'slideUp 0.2s ease-out'
                        }}>
                            {isOrganizer && (
                                <div
                                    onClick={() => handleWriteClick('/recruitments/write')}
                                    style={{
                                        background: '#FFFBEB', padding: '12px 20px', borderRadius: 24,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer',
                                        fontSize: 15, fontWeight: 700, color: '#B45309',
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        border: '1px solid #FCD34D',
                                    }}
                                >
                                    📢 공고 올리기
                                </div>
                            )}
                            {!isOrganizer && (
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
                            )}
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
