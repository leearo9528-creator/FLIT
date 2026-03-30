'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';

const ROLES = [
    {
        key: 'seller',
        emoji: '🛍️',
        label: '행사 참여하러 왔어요',
        desc: '플리마켓·팝업마켓에 셀러로\n참가하고 싶어요',
        color: T.blue,
        bg: T.blueLt,
    },
    {
        key: 'organizer',
        emoji: '🏢',
        label: '행사 의뢰하러 왔어요',
        desc: '플리마켓·팝업마켓을 기획하고\n셀러를 모집하고 싶어요',
        color: '#B45309',
        bg: '#FFFBEB',
    },
];

function currentRoleKey(plan) {
    if (plan === 'organizer' || plan === 'organizer_pending') return 'organizer';
    return 'seller';
}

export default function RoleChangePage() {
    const router = useRouter();
    const { user, loading: authLoading, plan, refreshPlan } = useAuth();
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) { router.replace('/login'); return; }
    }, [user, authLoading, router]);

    useEffect(() => {
        setSelected(currentRoleKey(plan));
    }, [plan]);

    const currentKey = currentRoleKey(plan);
    const isDirty = selected !== null && selected !== currentKey;

    const handleSave = async () => {
        if (!isDirty || !user) return;
        setLoading(true);
        try {
            const sb = createClient();
            const isOrganizer = selected === 'organizer';
            const update = isOrganizer
                ? { plan: 'organizer_pending', seller_type: null }
                : { plan: 'free', seller_type: 'seller' };
            const { error } = await sb.from('profiles').update(update).eq('id', user.id);
            if (error) throw error;
            await refreshPlan();
            router.back();
        } catch (err) {
            console.error('역할 변경 실패:', err);
            alert('저장 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 40 }}>
            <TopBar title="역할 변경" back />

            <div style={{ padding: '24px 20px' }}>

                {/* 현재 역할 */}
                <div style={{
                    background: T.white, borderRadius: T.radiusLg,
                    border: `1px solid ${T.border}`, padding: '14px 16px',
                    marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10,
                }}>
                    <span style={{ fontSize: 13, color: T.gray }}>현재 역할</span>
                    {plan === 'organizer' && (
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#B45309' }}>🏢 주최사</span>
                    )}
                    {plan === 'organizer_pending' && (
                        <span style={{ fontSize: 13, fontWeight: 700, color: T.gray }}>⏳ 주최사 승인 대기 중</span>
                    )}
                    {plan !== 'organizer' && plan !== 'organizer_pending' && (
                        <span style={{ fontSize: 13, fontWeight: 700, color: T.blue }}>🛍️ 셀러</span>
                    )}
                </div>

                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 12 }}>변경할 역할 선택</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                    {ROLES.map(r => {
                        const isActive = selected === r.key;
                        const isCurrent = currentKey === r.key;
                        return (
                            <div
                                key={r.key}
                                onClick={() => setSelected(r.key)}
                                style={{
                                    padding: '20px 18px', borderRadius: 16, cursor: 'pointer',
                                    border: isActive ? `2.5px solid ${r.color}` : `1.5px solid ${T.border}`,
                                    background: isActive ? r.bg : T.white,
                                    display: 'flex', alignItems: 'center', gap: 16,
                                    boxShadow: isActive ? `0 0 0 3px ${r.color}18` : T.shadowSm,
                                    transition: 'all 0.15s',
                                    position: 'relative',
                                }}
                            >
                                <div style={{
                                    width: 52, height: 52, borderRadius: 14,
                                    background: r.bg, flexShrink: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 26,
                                }}>
                                    {r.emoji}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                        <span style={{ fontSize: 15, fontWeight: 800, color: T.text }}>{r.label}</span>
                                        {isCurrent && (
                                            <span style={{
                                                fontSize: 10, fontWeight: 700, color: T.blue,
                                                background: T.blueLt, padding: '2px 6px', borderRadius: 4,
                                            }}>현재</span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: 13, color: T.gray, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                                        {r.desc}
                                    </div>
                                </div>
                                <div style={{
                                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                                    border: `2px solid ${isActive ? r.color : T.border}`,
                                    background: isActive ? r.color : T.white,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {isActive && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 주최사 전환 안내 */}
                {selected === 'organizer' && currentKey !== 'organizer' && (
                    <div style={{
                        background: '#FFFBEB', border: '1px solid #FCD34D',
                        borderRadius: T.radiusLg, padding: '12px 16px', marginBottom: 20,
                        fontSize: 13, color: '#92400E', lineHeight: 1.6,
                    }}>
                        ⚠️ 주최사 전환은 관리자 승인이 필요합니다. 승인 전까지 공고 등록이 제한됩니다.
                    </div>
                )}

                <button
                    onClick={isDirty && !loading ? handleSave : undefined}
                    style={{
                        width: '100%', padding: '16px 0', borderRadius: T.radiusFull,
                        background: isDirty ? T.blue : T.border,
                        color: '#fff', border: 'none',
                        fontSize: 16, fontWeight: 800,
                        cursor: isDirty && !loading ? 'pointer' : 'default',
                        opacity: loading ? 0.7 : 1,
                        transition: 'background 0.15s',
                    }}
                >
                    {loading ? '저장 중...' : isDirty ? '변경하기' : '현재 역할과 동일해요'}
                </button>
            </div>
        </div>
    );
}
