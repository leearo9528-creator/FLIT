'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ChevronRight, LogOut,
    Star, Bookmark, MessageSquare, MessageCircle as CommentIcon, Megaphone,
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
    const [profileName, setProfileName] = useState('');
    const [counts, setCounts] = useState({ recruitments: 0 });

    useEffect(() => {
        if (!loading && !user) router.replace('/login');
    }, [user, loading, router]);

    useEffect(() => {
        if (!user) return;
        (async () => {
            try {
                const sb = createClient();
                const isOrganizer = plan === 'organizer';
                const [profile, rc] = await Promise.all([
                    sb.from('profiles').select('name').eq('id', user.id).maybeSingle(),
                    isOrganizer
                        ? sb.from('recruitments').select('id', { count: 'exact', head: true })
                            .in('event_instance_id',
                                (await sb.from('event_instances').select('id').eq('organizer_id', user.id)).data?.map(e => e.id) || []
                            )
                        : Promise.resolve({ count: 0 }),
                ]);
                setCounts({ recruitments: rc.count || 0 });
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
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
                    <div
                        onClick={() => router.push('/mypage/profile')}
                        style={{
                            padding: '7px 14px', borderRadius: T.radiusFull,
                            border: `1.5px solid ${T.border}`, background: T.white,
                            fontSize: 13, fontWeight: 700, color: T.text, cursor: 'pointer', flexShrink: 0,
                        }}
                    >
                        프로필 수정
                    </div>
                </div>
            </div>

            <SectionGap />

            {/* ── 내 활동 ── */}
            <div style={{ background: T.white }}>
                <MenuItem icon={Star} label="내 활동" sub="리뷰 · 글 · 댓글 관리" href="/mypage/activity" />
                {isOrganizer && (
                    <>
                        <Divider />
                        <MenuItem icon={Megaphone} label="내 공고 관리" href="/mypage/recruitments" badge={counts.recruitments} />
                    </>
                )}
            </div>

            <SectionGap />

            {/* ── 스크랩 ── */}
            <div style={{ background: T.white }}>
                <MenuItem icon={Bookmark} label="스크랩" sub="공고 · 행사 관리" href="/mypage/events" />
            </div>

            <SectionGap />

            {/* ── 설정 ── */}
            <div style={{ background: T.white }}>
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
