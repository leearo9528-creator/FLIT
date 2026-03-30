'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ChevronRight, LogOut,
    Star, Bookmark, MessageSquare, Megaphone,
    UserCog, Bell, Shield, FileText, HelpCircle, MessageCircle,
} from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';

function Section({ title, children }) {
    return (
        <div style={{ marginTop: 8, background: T.white, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
            {title && (
                <div style={{ padding: '14px 20px 6px', fontSize: 11, fontWeight: 700, color: T.gray, letterSpacing: 0.5 }}>
                    {title}
                </div>
            )}
            {children}
        </div>
    );
}

function MenuItem({ icon: Icon, label, href, badge, danger, onPress }) {
    const router = useRouter();
    const handleClick = () => {
        if (onPress) { onPress(); return; }
        if (href) router.push(href);
    };
    return (
        <div
            onClick={handleClick}
            style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '15px 20px', cursor: 'pointer',
                borderBottom: `1px solid ${T.border}`,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Icon size={20} color={danger ? T.red : T.text} strokeWidth={1.8} />
                <span style={{ fontSize: 15, fontWeight: 600, color: danger ? T.red : T.text }}>{label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {badge != null && badge > 0 && (
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.blue }}>{badge}</span>
                )}
                <ChevronRight size={16} color={T.gray} />
            </div>
        </div>
    );
}

function RoleBadge({ plan }) {
    if (plan === 'organizer') return (
        <span style={{ fontSize: 11, fontWeight: 700, color: '#B45309', background: '#FFFBEB', padding: '3px 8px', borderRadius: 6, border: '1px solid #FCD34D' }}>
            🏢 주최사
        </span>
    );
    if (plan === 'organizer_pending') return (
        <span style={{ fontSize: 11, fontWeight: 700, color: T.gray, background: T.grayLt, padding: '3px 8px', borderRadius: 6 }}>
            ⏳ 주최사 승인 대기
        </span>
    );
    return (
        <span style={{ fontSize: 11, fontWeight: 700, color: T.blue, background: T.blueLt, padding: '3px 8px', borderRadius: 6 }}>
            🛍️ 셀러
        </span>
    );
}

export default function MyPage() {
    const { user, loading, plan, signOut } = useAuth();
    const router = useRouter();
    const [counts, setCounts] = useState({ reviews: 0, events: 0, posts: 0, recruitments: 0 });
    const [profileName, setProfileName] = useState('');

    useEffect(() => {
        if (!loading && !user) router.replace('/login');
    }, [user, loading, router]);

    useEffect(() => {
        if (!user) return;
        (async () => {
            try {
                const sb = createClient();
                const isOrganizer = plan === 'organizer';
                const [rv, ev, pt, profile, rc] = await Promise.all([
                    sb.from('reviews').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
                    sb.from('scraps').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
                    sb.from('posts').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
                    sb.from('profiles').select('name').eq('id', user.id).maybeSingle(),
                    isOrganizer
                        ? sb.from('recruitments').select('id', { count: 'exact', head: true })
                            .in('event_instance_id',
                                (await sb.from('event_instances').select('id').eq('organizer_id', user.id)).data?.map(e => e.id) || []
                            )
                        : Promise.resolve({ count: 0 }),
                ]);
                setCounts({ reviews: rv.count || 0, events: ev.count || 0, posts: pt.count || 0, recruitments: rc.count || 0 });
                if (profile.data?.name) setProfileName(profile.data.name);
            } catch (err) {
                console.error('마이페이지 로드 실패:', err);
            }
        })();
    }, [user, plan]);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray, fontSize: 15 }}>로딩 중...</div>
        </div>
    );
    if (!user) return null;

    const displayName = profileName || user.user_metadata?.full_name || user.user_metadata?.name || '사용자';
    const initial = (displayName[0] || '?').toUpperCase();
    const provider = user.app_metadata?.provider;
    const isOrganizer = plan === 'organizer';

    const STATS = [
        { label: '리뷰', count: counts.reviews, href: '/mypage/reviews' },
        { label: '관심 행사', count: counts.events, href: '/mypage/events' },
        { label: '게시글', count: counts.posts, href: '/mypage/posts' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title="나의 플릿" />

            {/* ── 프로필 카드 ── */}
            <div style={{ background: T.white, padding: '24px 20px 20px', borderBottom: `1px solid ${T.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                    <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 26, color: '#fff', fontWeight: 800, flexShrink: 0,
                    }}>
                        {initial}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 18, fontWeight: 800, color: T.text }}>{displayName}</span>
                            <RoleBadge plan={plan} />
                        </div>
                        <div style={{ fontSize: 13, color: T.gray, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {user.email}
                        </div>
                        {provider && (
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5,
                                padding: '2px 8px', borderRadius: 6,
                                background: provider === 'kakao' ? '#FFF3CD' : T.blueLt,
                                color: provider === 'kakao' ? '#92400E' : T.blue,
                                fontSize: 11, fontWeight: 700,
                            }}>
                                {provider === 'kakao' ? '카카오' : '구글'} 연결됨
                            </div>
                        )}
                    </div>
                    <div
                        onClick={() => router.push('/mypage/profile')}
                        style={{
                            padding: '7px 14px', borderRadius: T.radiusFull,
                            border: `1.5px solid ${T.border}`, background: T.white,
                            fontSize: 13, fontWeight: 700, color: T.text, cursor: 'pointer', flexShrink: 0,
                        }}
                    >
                        수정
                    </div>
                </div>

                {/* 활동 통계 */}
                <div style={{ display: 'flex', background: T.bg, borderRadius: T.radiusLg, overflow: 'hidden' }}>
                    {STATS.map((item, i) => (
                        <div
                            key={item.label}
                            onClick={() => router.push(item.href)}
                            style={{
                                flex: 1, padding: '13px 0', textAlign: 'center', cursor: 'pointer',
                                borderRight: i < STATS.length - 1 ? `1px solid ${T.border}` : 'none',
                            }}
                        >
                            <div style={{ fontSize: 20, fontWeight: 900, color: T.text, lineHeight: 1.2 }}>{item.count}</div>
                            <div style={{ fontSize: 12, color: T.gray, marginTop: 3, fontWeight: 500 }}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── 나의 활동 ── */}
            <Section title="나의 활동">
                <MenuItem icon={Star} label="내가 쓴 리뷰" href="/mypage/reviews" badge={counts.reviews} />
                <MenuItem icon={Bookmark} label="관심 가는 행사" href="/mypage/events" badge={counts.events} />
                <MenuItem icon={MessageSquare} label="내가 쓴 글" href="/mypage/posts" badge={counts.posts} />
                {isOrganizer && (
                    <MenuItem icon={Megaphone} label="내 공고" href="/mypage/recruitments" badge={counts.recruitments} />
                )}
            </Section>

            {/* ── 계정 설정 ── */}
            <Section title="계정 설정">
                <MenuItem icon={UserCog} label="내 프로필 편집" href="/mypage/profile" />
                <MenuItem icon={Shield} label="역할 변경" href="/mypage/role" />
                <MenuItem icon={Bell} label="알림 설정" href="/mypage/settings" />
            </Section>

            {/* ── 고객지원 ── */}
            <Section title="고객지원">
                <MenuItem icon={HelpCircle} label="공지사항" onPress={() => alert('준비 중이에요.')} />
                <MenuItem icon={MessageCircle} label="1:1 문의" href="/contact" />
                <MenuItem icon={FileText} label="이용약관" onPress={() => alert('준비 중이에요.')} />
                <MenuItem icon={FileText} label="개인정보처리방침" onPress={() => alert('준비 중이에요.')} />
            </Section>

            {/* ── 로그아웃 ── */}
            <Section>
                <MenuItem icon={LogOut} label="로그아웃" danger onPress={async () => { await signOut(); router.replace('/login'); }} />
            </Section>

            <div style={{ textAlign: 'center', padding: '20px 0', fontSize: 12, color: T.gray }}>
                플릿(FLIT) v1.0.0
            </div>
        </div>
    );
}
