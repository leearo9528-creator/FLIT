'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, CheckCircle, XCircle, Users, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';

/* ─── 탭 ─── */
const TABS = [
    { key: 'pending', label: '승인 대기', icon: Clock },
    { key: 'organizers', label: '주최사 목록', icon: Users },
];

/* ─── 유저 카드 ─── */
function UserCard({ profile, onApprove, onReject, showActions }) {
    const [expanded, setExpanded] = useState(false);
    const createdAt = profile.created_at ? new Date(profile.created_at).toLocaleDateString('ko-KR') : '-';

    return (
        <div style={{
            background: T.white, borderRadius: T.radiusLg,
            border: `1px solid ${T.border}`, marginBottom: 10,
            boxShadow: T.shadowSm, overflow: 'hidden',
        }}>
            <div
                onClick={() => setExpanded(!expanded)}
                style={{
                    padding: '14px 16px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
            >
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark || '#1B64DA'})`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 15, color: '#fff', fontWeight: 800, flexShrink: 0,
                        }}>
                            {(profile.name?.[0] || '?').toUpperCase()}
                        </div>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>
                                {profile.name || '이름 없음'}
                            </div>
                            <div style={{ fontSize: 12, color: T.gray }}>
                                {profile.email || profile.id?.slice(0, 8)}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                        fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                        background: profile.plan === 'organizer' ? '#FFFBEB' : T.grayLt,
                        color: profile.plan === 'organizer' ? '#B45309' : T.gray,
                    }}>
                        {profile.plan === 'organizer' ? '주최사' : '승인 대기'}
                    </span>
                    {expanded ? <ChevronUp size={16} color={T.gray} /> : <ChevronDown size={16} color={T.gray} />}
                </div>
            </div>

            {expanded && (
                <div style={{ padding: '0 16px 14px', borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                        <InfoItem label="주최사명" value={profile.organizer_name || '-'} />
                        <InfoItem label="가입일" value={createdAt} />
                        <InfoItem label="리뷰 수" value={profile.review_count ?? 0} />
                        <InfoItem label="셀러 유형" value={profile.seller_type || '-'} />
                    </div>

                    {showActions && (
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button
                                onClick={(e) => { e.stopPropagation(); onApprove(profile.id); }}
                                style={{
                                    flex: 1, padding: '10px 0', borderRadius: T.radiusMd,
                                    background: T.blue, color: '#fff', border: 'none',
                                    fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                }}
                            >
                                <CheckCircle size={15} /> 승인
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onReject(profile.id); }}
                                style={{
                                    flex: 1, padding: '10px 0', borderRadius: T.radiusMd,
                                    background: T.white, color: T.red, border: `1.5px solid ${T.red}`,
                                    fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                }}
                            >
                                <XCircle size={15} /> 거절
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function InfoItem({ label, value }) {
    return (
        <div>
            <div style={{ fontSize: 11, color: T.gray, marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{value}</div>
        </div>
    );
}

/* ─── Admin Page ─── */
export default function AdminPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkingAdmin, setCheckingAdmin] = useState(true);
    const [tab, setTab] = useState('pending');
    const [pending, setPending] = useState([]);
    const [organizers, setOrganizers] = useState([]);
    const [loading, setLoading] = useState(true);

    // 관리자 권한 확인
    useEffect(() => {
        if (authLoading) return;
        if (!user) { router.replace('/login'); return; }
        (async () => {
            try {
                const sb = createClient();
                const { data } = await sb.from('profiles').select('is_admin').eq('id', user.id).single();
                if (!data?.is_admin) { router.replace('/'); return; }
                setIsAdmin(true);
            } catch { router.replace('/'); }
            finally { setCheckingAdmin(false); }
        })();
    }, [user, authLoading, router]);

    // 데이터 로드
    const fetchData = useCallback(async () => {
        if (!isAdmin) return;
        setLoading(true);
        try {
            const sb = createClient();
            const [pendingRes, orgRes] = await Promise.all([
                sb.from('profiles')
                    .select('id, name, email, plan, organizer_name, seller_type, review_count, created_at')
                    .eq('plan', 'organizer_pending')
                    .order('created_at', { ascending: false }),
                sb.from('profiles')
                    .select('id, name, email, plan, organizer_name, seller_type, review_count, created_at')
                    .eq('plan', 'organizer')
                    .order('created_at', { ascending: false }),
            ]);
            setPending(pendingRes.data || []);
            setOrganizers(orgRes.data || []);
        } catch (err) {
            console.error('관리자 데이터 로드 실패:', err);
        } finally { setLoading(false); }
    }, [isAdmin]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleApprove = async (profileId) => {
        if (!confirm('이 사용자를 주최사로 승인하시겠습니까?')) return;
        try {
            const sb = createClient();
            const { error } = await sb.from('profiles').update({ plan: 'organizer' }).eq('id', profileId);
            if (error) throw error;
            await fetchData();
        } catch (err) {
            alert('승인 처리 중 오류가 발생했습니다.');
            console.error(err);
        }
    };

    const handleReject = async (profileId) => {
        if (!confirm('이 사용자의 주최사 신청을 거절하시겠습니까?\n(셀러 역할로 되돌립니다)')) return;
        try {
            const sb = createClient();
            const { error } = await sb.from('profiles').update({ plan: 'free' }).eq('id', profileId);
            if (error) throw error;
            await fetchData();
        } catch (err) {
            alert('거절 처리 중 오류가 발생했습니다.');
            console.error(err);
        }
    };

    if (authLoading || checkingAdmin || !isAdmin) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray, fontSize: 15 }}>로딩 중...</div>
        </div>
    );

    const activeList = tab === 'pending' ? pending : organizers;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 40 }}>
            <TopBar title={<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Shield size={18} /> 관리자</span>} back />

            {/* 통계 */}
            <div style={{ padding: '16px 16px 0', display: 'flex', gap: 10 }}>
                <StatCard label="승인 대기" count={pending.length} color={T.red} />
                <StatCard label="주최사" count={organizers.length} color="#B45309" />
            </div>

            {/* 탭 */}
            <div style={{ display: 'flex', padding: '16px 16px 0', gap: 8 }}>
                {TABS.map(t => {
                    const isActive = tab === t.key;
                    return (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            style={{
                                flex: 1, padding: '10px 0', borderRadius: T.radiusMd,
                                background: isActive ? T.text : T.white,
                                color: isActive ? '#fff' : T.text,
                                border: isActive ? 'none' : `1.5px solid ${T.border}`,
                                fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                            }}
                        >
                            <t.icon size={15} /> {t.label}
                            {t.key === 'pending' && pending.length > 0 && (
                                <span style={{
                                    background: isActive ? T.red : T.red,
                                    color: '#fff', fontSize: 10, fontWeight: 800,
                                    padding: '1px 6px', borderRadius: 10, marginLeft: 2,
                                }}>
                                    {pending.length}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* 목록 */}
            <div style={{ padding: '12px 16px 0' }}>
                {loading ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} style={{ height: 70, background: T.grayLt, borderRadius: T.radiusLg, marginBottom: 10, animation: 'pulse 1.5s infinite' }} />
                    ))
                ) : activeList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>
                        {tab === 'pending' ? '승인 대기 중인 사용자가 없어요.' : '등록된 주최사가 없어요.'}
                    </div>
                ) : (
                    activeList.map(p => (
                        <UserCard
                            key={p.id}
                            profile={p}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            showActions={tab === 'pending'}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

function StatCard({ label, count, color }) {
    return (
        <div style={{
            flex: 1, background: T.white, borderRadius: T.radiusLg,
            border: `1px solid ${T.border}`, padding: '14px 16px',
            boxShadow: T.shadowSm,
        }}>
            <div style={{ fontSize: 11, color: T.gray, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color }}>{count}</div>
        </div>
    );
}
