'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, ChevronLeft } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { PLANS, getPlan } from '@/lib/plans';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';

export default function SubscribePage() {
    const router = useRouter();
    const { user, refreshPlan } = useAuth();
    const [currentPlan, setCurrentPlan] = useState('free');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        (async () => {
            const sb = createClient();
            const { data } = await sb
                .from('profiles')
                .select('plan')
                .eq('id', user.id)
                .single();
            if (data?.plan) setCurrentPlan(data.plan);
        })();
    }, [user]);

    const handleSelect = async (plan) => {
        if (!user) {
            router.push('/login');
            return;
        }
        if (plan.contact) {
            alert('주최사 회원은 별도 문의가 필요합니다.\n카카오채널: @flit 으로 연락해주세요.');
            return;
        }
        if (plan.key === currentPlan) return;

        const confirmed = window.confirm(
            plan.key === 'free'
                ? '구독을 해지하고 일반회원으로 변경할까요?'
                : `${plan.label} 플랜(${plan.priceLabel})으로 변경할까요?\n실제 결제 연동 전 테스트 모드입니다.`
        );
        if (!confirmed) return;

        setLoading(true);
        const sb = createClient();
        const { error } = await sb
            .from('profiles')
            .update({
                plan: plan.key,
                is_subscribed: plan.key !== 'free',
                seller_type: plan.key === 'foodtruck' ? 'foodtruck' : plan.key === 'free' ? null : 'seller',
            })
            .eq('id', user.id);

        setLoading(false);
        if (!error) {
            setCurrentPlan(plan.key);
            await refreshPlan();
            alert(`${plan.label}으로 변경됐습니다.`);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 40 }}>
            {/* 헤더 */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)',
                borderBottom: `1px solid ${T.border}`,
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '16px 16px',
            }}>
                <div onClick={() => router.back()} style={{ cursor: 'pointer', padding: 4 }}>
                    <ChevronLeft size={22} color={T.text} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: T.text }}>
                    멤버십 플랜
                </div>
            </div>

            {/* 소개 */}
            <div style={{ padding: '28px 20px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: T.text, marginBottom: 8 }}>
                    나에게 맞는 플랜을 선택하세요
                </div>
                <div style={{ fontSize: 14, color: T.gray, lineHeight: 1.7 }}>
                    플리마켓 셀러부터 푸드트럭 운영자,<br />
                    행사 주최사까지 — 맞춤 혜택을 제공해요.
                </div>
            </div>

            {/* 플랜 카드 목록 */}
            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {PLANS.map(plan => {
                    const isCurrent = currentPlan === plan.key;
                    return (
                        <div
                            key={plan.key}
                            style={{
                                background: T.white,
                                borderRadius: 16,
                                border: isCurrent
                                    ? `2.5px solid ${plan.color}`
                                    : `1.5px solid ${T.border}`,
                                overflow: 'hidden',
                                boxShadow: isCurrent ? `0 0 0 3px ${plan.bgColor}` : T.shadowSm,
                                position: 'relative',
                            }}
                        >
                            {/* 인기 배지 */}
                            {plan.popular && (
                                <div style={{
                                    position: 'absolute', top: 14, right: 14,
                                    background: plan.color, color: '#fff',
                                    fontSize: 11, fontWeight: 800,
                                    padding: '3px 10px', borderRadius: 20,
                                }}>
                                    인기
                                </div>
                            )}

                            {/* 현재 플랜 배지 */}
                            {isCurrent && (
                                <div style={{
                                    position: 'absolute', top: 14, right: 14,
                                    background: plan.color, color: '#fff',
                                    fontSize: 11, fontWeight: 800,
                                    padding: '3px 10px', borderRadius: 20,
                                }}>
                                    현재 플랜
                                </div>
                            )}

                            {/* 헤더 */}
                            <div style={{
                                background: plan.bgColor,
                                padding: '20px 20px 16px',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                    <span style={{ fontSize: 28 }}>{plan.emoji}</span>
                                    <div>
                                        <div style={{ fontSize: 17, fontWeight: 800, color: T.text }}>
                                            {plan.label}
                                        </div>
                                        <div style={{
                                            display: 'inline-block',
                                            fontSize: 11, fontWeight: 700,
                                            color: plan.color,
                                            background: `${plan.color}20`,
                                            padding: '2px 8px', borderRadius: 4, marginTop: 2,
                                        }}>
                                            {plan.badge}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ fontSize: 24, fontWeight: 900, color: plan.color }}>
                                    {plan.priceLabel}
                                </div>
                            </div>

                            {/* 혜택 목록 */}
                            <div style={{ padding: '16px 20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {plan.features.map(f => (
                                        <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                            <div style={{
                                                width: 18, height: 18, borderRadius: '50%',
                                                background: plan.bgColor, flexShrink: 0,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                marginTop: 1,
                                            }}>
                                                <Check size={11} color={plan.color} strokeWidth={3} />
                                            </div>
                                            <span style={{ fontSize: 14, color: T.text, lineHeight: 1.4 }}>{f}</span>
                                        </div>
                                    ))}
                                    {plan.locked.map(f => (
                                        <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, opacity: 0.4 }}>
                                            <div style={{
                                                width: 18, height: 18, borderRadius: '50%',
                                                background: T.grayLt, flexShrink: 0,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                marginTop: 1,
                                            }}>
                                                <X size={11} color={T.gray} strokeWidth={3} />
                                            </div>
                                            <span style={{ fontSize: 14, color: T.gray, lineHeight: 1.4 }}>{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA 버튼 */}
                            <div style={{ padding: '0 20px 20px' }}>
                                <div
                                    onClick={() => !loading && handleSelect(plan)}
                                    style={{
                                        width: '100%',
                                        padding: '14px 0',
                                        borderRadius: T.radiusFull,
                                        textAlign: 'center',
                                        fontSize: 15,
                                        fontWeight: 800,
                                        cursor: isCurrent ? 'default' : 'pointer',
                                        background: isCurrent
                                            ? T.grayLt
                                            : plan.contact
                                                ? plan.color
                                                : `linear-gradient(135deg, ${plan.color}, ${plan.color}CC)`,
                                        color: isCurrent ? T.gray : '#fff',
                                        transition: 'opacity 0.15s',
                                        opacity: loading ? 0.7 : 1,
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    {isCurrent
                                        ? '현재 이용 중'
                                        : plan.contact
                                            ? '별도 문의하기'
                                            : plan.key === 'free'
                                                ? '구독 해지'
                                                : '이 플랜 시작하기'}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 안내 */}
            <div style={{ padding: '24px 20px 0', fontSize: 12, color: T.gray, lineHeight: 1.8 }}>
                · 구독은 매월 자동 갱신됩니다.<br />
                · 언제든지 플랜을 변경하거나 해지할 수 있습니다.<br />
                · 주최사 플랜은 별도 문의 후 계약이 진행됩니다.<br />
                · 결제 관련 문의: support@flit.kr
            </div>
        </div>
    );
}
