'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';

const TYPES = [
    {
        key: 'seller',
        emoji: '🛍️',
        label: '일반 셀러',
        desc: '핸드메이드, 의류, 소품 등\n플리마켓에 참가하는 셀러',
        color: T.blue,
        bg: T.blueLt,
        role: 'seller',
    },
    {
        key: 'foodtruck',
        emoji: '🚚',
        label: '푸드트럭 운영자',
        desc: '음식, 음료 등을\n판매하는 푸드트럭 운영자',
        color: T.green,
        bg: T.greenLt,
        role: 'seller',
    },
    {
        key: 'organizer',
        emoji: '🏢',
        label: '주최사',
        desc: '플리마켓·팝업마켓을 기획하고\n셀러를 모집하는 주최사',
        color: '#B45309',
        bg: '#FFFBEB',
        role: 'organizer',
    },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { user, refreshPlan } = useAuth();
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        if (!selected || !user) return;
        setLoading(true);
        try {
            const sb = createClient();
            const isOrganizer = selected === 'organizer';
            const update = isOrganizer
                ? { plan: 'organizer_pending' }
                : { seller_type: selected };
            const { error } = await sb.from('profiles').update(update).eq('id', user.id);
            if (error) throw error;
            await refreshPlan();
            router.replace('/');
        } catch (err) {
            console.error('온보딩 저장 실패:', err);
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', background: T.white,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '40px 24px',
        }}>
            <div style={{ width: '100%', maxWidth: 420 }}>
                {/* 헤더 */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ fontSize: 36, fontWeight: 900, color: T.text, letterSpacing: -1, marginBottom: 12 }}>
                        플릿 <span style={{ color: T.blue }}>●</span>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 8 }}>
                        어떤 역할로 활동하시나요?
                    </div>
                    <div style={{ fontSize: 14, color: T.gray, lineHeight: 1.6 }}>
                        선택한 유형에 맞는 기능을<br />제공해 드릴게요
                    </div>
                </div>

                {/* 선택 카드 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                    {TYPES.map(t => (
                        <div
                            key={t.key}
                            onClick={() => setSelected(t.key)}
                            style={{
                                padding: '22px 20px',
                                borderRadius: 16,
                                border: selected === t.key ? `2.5px solid ${t.color}` : `1.5px solid ${T.border}`,
                                background: selected === t.key ? t.bg : T.white,
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: 16,
                                boxShadow: selected === t.key ? `0 0 0 3px ${t.color}18` : T.shadowSm,
                                transition: 'all 0.15s',
                            }}
                        >
                            <div style={{
                                width: 56, height: 56, borderRadius: 14,
                                background: t.bg, flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 28,
                            }}>
                                {t.emoji}
                            </div>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 4 }}>
                                    {t.label}
                                </div>
                                <div style={{ fontSize: 13, color: T.gray, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                                    {t.desc}
                                </div>
                            </div>
                            <div style={{
                                marginLeft: 'auto', flexShrink: 0,
                                width: 22, height: 22, borderRadius: '50%',
                                border: `2px solid ${selected === t.key ? t.color : T.border}`,
                                background: selected === t.key ? t.color : T.white,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {selected === t.key && (
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 확인 버튼 */}
                <div
                    onClick={handleConfirm}
                    style={{
                        width: '100%', padding: '16px 0', borderRadius: T.radiusFull,
                        background: selected ? T.blue : T.border,
                        color: '#fff', textAlign: 'center',
                        fontSize: 16, fontWeight: 800, cursor: selected ? 'pointer' : 'default',
                        transition: 'background 0.15s',
                        opacity: loading ? 0.7 : 1,
                        boxSizing: 'border-box',
                    }}
                >
                    {loading ? '저장 중...' : '시작하기'}
                </div>

                <div
                    onClick={() => router.replace('/')}
                    style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: T.gray, cursor: 'pointer' }}
                >
                    나중에 설정하기
                </div>
            </div>
        </div>
    );
}
