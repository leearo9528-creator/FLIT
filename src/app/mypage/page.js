'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Settings, Bell, LogOut, HelpCircle, FileText, Star, Bookmark, MessageSquare } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';

const ACTIVITY_MENUS = [
    { icon: Star,        label: '내가 쓴 리뷰',   href: '/mypage/reviews',  countKey: 'reviews' },
    { icon: Bookmark,    label: '관심 가는 행사', href: '/mypage/events',   countKey: 'events' },
    { icon: MessageSquare, label: '내가 쓴 글',  href: '/mypage/posts',    countKey: 'posts' },
];

const SETTING_MENUS = [
    { icon: Bell,       label: '알림 설정',  href: '/mypage/settings' },
    { icon: FileText,   label: '내 프로필', href: '/mypage/profile' },
    { icon: HelpCircle, label: '공지사항 / 도움말', href: null },
];

export default function MyPage() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [counts, setCounts] = useState({ reviews: 0, events: 0, posts: 0 });

    useEffect(() => {
        if (!loading && !user) router.replace('/login');
    }, [user, loading, router]);

    useEffect(() => {
        if (!user) return;
        (async () => {
            const sb = createClient();
            const [rv, ev, pt] = await Promise.all([
                sb.from('reviews').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
                sb.from('scraps').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
                sb.from('posts').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
            ]);
            setCounts({ reviews: rv.count || 0, events: ev.count || 0, posts: pt.count || 0 });
        })();
    }, [user]);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray, fontSize: 15 }}>로딩 중...</div>
        </div>
    );

    if (!user) return null;

    const displayName = user.user_metadata?.full_name || user.user_metadata?.name || '셀러';
    const initial = (displayName[0] || '?').toUpperCase();
    const provider = user.app_metadata?.provider;

    const handleLogout = async () => {
        await signOut();
        router.replace('/login');
    };

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar
                title="나의 플릿"
                action={
                    <div onClick={() => router.push('/mypage/profile')} style={{ cursor: 'pointer', padding: 4 }}>
                        <Settings size={20} color={T.gray} />
                    </div>
                }
            />

            {/* ── 프로필 영역 ── */}
            <div style={{ background: T.white, padding: '28px 20px 24px', borderBottom: `1px solid ${T.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                    {/* 아바타 */}
                    <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 26, color: '#fff', fontWeight: 800, flexShrink: 0,
                    }}>
                        {initial}
                    </div>
                    {/* 이름 + 이메일 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: T.text, marginBottom: 3 }}>
                            {displayName}
                        </div>
                        <div style={{
                            fontSize: 13, color: T.gray,
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                            {user.email}
                        </div>
                        {provider && (
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 4,
                                marginTop: 6, padding: '3px 8px', borderRadius: 6,
                                background: provider === 'kakao' ? '#FFF3CD' : T.blueLt,
                                color: provider === 'kakao' ? '#92400E' : T.blue,
                                fontSize: 11, fontWeight: 700,
                            }}>
                                {provider === 'kakao' ? '카카오' : '구글'} 연결됨
                            </div>
                        )}
                    </div>
                    {/* 프로필 수정 */}
                    <div
                        onClick={() => router.push('/mypage/profile')}
                        style={{
                            padding: '7px 14px', borderRadius: T.radiusFull,
                            border: `1.5px solid ${T.border}`, background: T.white,
                            fontSize: 13, fontWeight: 700, color: T.text, cursor: 'pointer',
                            flexShrink: 0,
                        }}
                    >
                        프로필 수정
                    </div>
                </div>

                {/* 활동 통계 */}
                <div style={{
                    display: 'flex', background: T.bg, borderRadius: T.radiusLg,
                    overflow: 'hidden',
                }}>
                    {[
                        { label: '리뷰', count: counts.reviews, href: '/mypage/reviews' },
                        { label: '관심 행사', count: counts.events, href: '/mypage/events' },
                        { label: '게시글', count: counts.posts, href: '/mypage/posts' },
                    ].map((item, i, arr) => (
                        <div
                            key={item.label}
                            onClick={() => router.push(item.href)}
                            style={{
                                flex: 1, padding: '14px 0', textAlign: 'center', cursor: 'pointer',
                                borderRight: i < arr.length - 1 ? `1px solid ${T.border}` : 'none',
                            }}
                        >
                            <div style={{ fontSize: 20, fontWeight: 900, color: T.text, lineHeight: 1.2 }}>
                                {item.count}
                            </div>
                            <div style={{ fontSize: 12, color: T.gray, marginTop: 3, fontWeight: 500 }}>
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── 나의 활동 ── */}
            <div style={{ marginTop: 8, background: T.white, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
                <div style={{ padding: '14px 20px 6px', fontSize: 12, fontWeight: 700, color: T.gray }}>
                    나의 활동
                </div>
                {ACTIVITY_MENUS.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.label}
                            onClick={() => router.push(item.href)}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '14px 20px', cursor: 'pointer',
                                borderBottom: i < ACTIVITY_MENUS.length - 1 ? `1px solid ${T.border}` : 'none',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <Icon size={20} color={T.text} strokeWidth={1.8} />
                                <span style={{ fontSize: 15, fontWeight: 600, color: T.text }}>{item.label}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                {counts[item.countKey] > 0 && (
                                    <span style={{ fontSize: 14, fontWeight: 700, color: T.blue }}>
                                        {counts[item.countKey]}
                                    </span>
                                )}
                                <ChevronRight size={16} color={T.gray} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── 설정 ── */}
            <div style={{ marginTop: 8, background: T.white, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
                <div style={{ padding: '14px 20px 6px', fontSize: 12, fontWeight: 700, color: T.gray }}>
                    설정
                </div>
                {SETTING_MENUS.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.label}
                            onClick={() => item.href ? router.push(item.href) : alert('준비 중이에요.')}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '14px 20px', cursor: 'pointer',
                                borderBottom: i < SETTING_MENUS.length - 1 ? `1px solid ${T.border}` : 'none',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <Icon size={20} color={T.text} strokeWidth={1.8} />
                                <span style={{ fontSize: 15, fontWeight: 600, color: T.text }}>{item.label}</span>
                            </div>
                            <ChevronRight size={16} color={T.gray} />
                        </div>
                    );
                })}
            </div>

            {/* ── 로그아웃 ── */}
            <div style={{ marginTop: 8, background: T.white, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
                <div
                    onClick={handleLogout}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '14px 20px', cursor: 'pointer',
                    }}
                >
                    <LogOut size={20} color={T.red} strokeWidth={1.8} />
                    <span style={{ fontSize: 15, fontWeight: 600, color: T.red }}>로그아웃</span>
                </div>
            </div>

            {/* 앱 버전 */}
            <div style={{ textAlign: 'center', padding: '24px 0', fontSize: 12, color: T.gray }}>
                플릿(FLIT) v1.0.0
            </div>
        </div>
    );
}
