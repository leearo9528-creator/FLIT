'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ChevronRight, LogOut,
    Star, Bookmark, MessageSquare, Megaphone,
    Bell, FileText, HelpCircle, MessageCircle, Settings,
} from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';

function MenuItem({ icon: Icon, label, href, badge, danger, sub, onPress }) {
    const router = useRouter();
    const handleClick = () => {
        if (onPress) { onPress(); return; }
        if (href) router.push(href);
    };
    return (
        <div onClick={handleClick} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px', cursor: 'pointer',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Icon size={20} color={danger ? T.red : T.gray} strokeWidth={1.8} />
                <div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: danger ? T.red : T.text }}>{label}</span>
                    {sub && <div style={{ fontSize: 12, color: T.gray, marginTop: 1 }}>{sub}</div>}
                </div>
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

function Divider() {
    return <div style={{ height: 1, background: T.border, margin: '0 20px' }} />;
}

function SectionGap() {
    return <div style={{ height: 8, background: T.bg }} />;
}

function RoleBadge({ plan }) {
    if (plan === 'organizer') return (
        <span style={{ fontSize: 11, fontWeight: 700, color: '#B45309', background: '#FFFBEB', padding: '3px 8px', borderRadius: 6, border: '1px solid #FCD34D' }}>
            주최사
        </span>
    );
    if (plan === 'organizer_pending') return (
        <span style={{ fontSize: 11, fontWeight: 700, color: T.gray, background: T.grayLt, padding: '3px 8px', borderRadius: 6 }}>
            승인 대기
        </span>
    );
    return (
        <span style={{ fontSize: 11, fontWeight: 700, color: T.blue, background: T.blueLt, padding: '3px 8px', borderRadius: 6 }}>
            셀러
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
                    sb.from('scraps').select('user_id', { count: 'exact', head: true }).eq('user_id', user.id),
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
    const isOrganizer = plan === 'organizer';

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>

            {/* ── 프로필 ── */}
            <div style={{ background: T.white, padding: '24px 20px 20px' }}>
                <div
                    onClick={() => router.push('/mypage/profile')}
                    style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', marginBottom: 16 }}
                >
                    <div style={{
                        width: 56, height: 56, borderRadius: '50%',
                        background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 24, color: '#fff', fontWeight: 800, flexShrink: 0,
                    }}>
                        {initial}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                            <span style={{ fontSize: 18, fontWeight: 800, color: T.text }}>{displayName}</span>
                            <RoleBadge plan={plan} />
                        </div>
                        <div style={{ fontSize: 13, color: T.gray }}>{user.email}</div>
                    </div>
                    <ChevronRight size={20} color={T.gray} />
                </div>

                {/* 활동 통계 */}
                <div style={{ display: 'flex', background: T.bg, borderRadius: T.radiusLg, overflow: 'hidden' }}>
                    {[
                        { label: '리뷰', count: counts.reviews, href: '/mypage/reviews' },
                        { label: '스크랩', count: counts.events, href: '/mypage/events' },
                        { label: '게시글', count: counts.posts, href: '/mypage/posts' },
                    ].map((item, i, arr) => (
                        <div
                            key={item.label}
                            onClick={() => router.push(item.href)}
                            style={{
                                flex: 1, padding: '13px 0', textAlign: 'center', cursor: 'pointer',
                                borderRight: i < arr.length - 1 ? `1px solid ${T.border}` : 'none',
                            }}
                        >
                            <div style={{ fontSize: 20, fontWeight: 900, color: T.text, lineHeight: 1.2 }}>{item.count}</div>
                            <div style={{ fontSize: 12, color: T.gray, marginTop: 3, fontWeight: 500 }}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <SectionGap />

            {/* ── 나의 활동 ── */}
            <div style={{ background: T.white }}>
                <MenuItem icon={Star} label="내가 쓴 리뷰" href="/mypage/reviews" badge={counts.reviews} />
                <Divider />
                <MenuItem icon={Bookmark} label="스크랩한 공고" href="/mypage/events" badge={counts.events} />
                <Divider />
                <MenuItem icon={MessageSquare} label="내가 쓴 글" href="/mypage/posts" badge={counts.posts} />
                {isOrganizer && (
                    <>
                        <Divider />
                        <MenuItem icon={Megaphone} label="내 공고 관리" href="/mypage/recruitments" badge={counts.recruitments} />
                    </>
                )}
            </div>

            <SectionGap />

            {/* ── 설정 ── */}
            <div style={{ background: T.white }}>
                <MenuItem icon={Settings} label="역할 변경" sub={isOrganizer ? '현재: 주최사' : '현재: 셀러'} href="/mypage/role" />
                <Divider />
                <MenuItem icon={Bell} label="알림 설정" href="/mypage/settings" />
            </div>

            <SectionGap />

            {/* ── 기타 ── */}
            <div style={{ background: T.white }}>
                <MenuItem icon={HelpCircle} label="공지사항" href="/notices" />
                <Divider />
                <MenuItem icon={MessageCircle} label="행사 개최 문의" href="/contact" />
                <Divider />
                <MenuItem icon={FileText} label="약관 및 정책" href="/terms" />
            </div>

            <SectionGap />

            {/* ── 로그아웃 ── */}
            <div style={{ background: T.white }}>
                <MenuItem icon={LogOut} label="로그아웃" danger onPress={async () => { await signOut(); router.replace('/login'); }} />
            </div>

            <div style={{ textAlign: 'center', padding: '20px 0', fontSize: 12, color: T.gray }}>
                플릿(FLIT) v1.0.0
            </div>
        </div>
    );
}
