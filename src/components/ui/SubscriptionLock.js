'use client';

import { useState } from 'react';
import { Lock, Sparkles, PenLine } from 'lucide-react';
import Link from 'next/link';
import { T } from '@/lib/design-tokens';
import SubscriptionModal from './SubscriptionModal';

/**
 * Paywall overlay displayed when a non-subscribed user tries to view locked content.
 * @param {number} reviewCount - number of reviews the current user has written
 * @param {string} variant     - 'inline' (full card) | 'overlay' (absolute overlay)
 */
export default function SubscriptionLock({ reviewCount = 0, variant = 'inline' }) {
    const [showModal, setShowModal] = useState(false);
    const remaining = Math.max(0, 3 - reviewCount);

    const card = (
        <>
            <div style={{
                background: T.white,
                borderRadius: T.radiusXl,
                padding: 28,
                textAlign: 'center',
                boxShadow: T.shadowLg,
                border: `1px solid ${T.border}`,
            }}>
                {/* icon */}
                <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: T.blueLt,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                }}>
                    <Lock size={24} color={T.blue} strokeWidth={2.5} />
                </div>

                <div style={{ fontSize: 18, fontWeight: 900, color: T.text, marginBottom: 8 }}>
                    구독 후 모든 리뷰 확인
                </div>
                <div style={{ fontSize: 14, color: T.gray, lineHeight: 1.7, marginBottom: 20 }}>
                    셀러들의 솔직한 수익·집객 후기를<br />지금 바로 확인하세요
                </div>

                {/* free-trial progress */}
                {remaining > 0 && (
                    <div style={{
                        background: T.blueLt, borderRadius: T.radiusMd,
                        padding: '12px 16px', marginBottom: 20,
                        display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                        <Sparkles size={16} color={T.blue} />
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 13, color: T.blue, fontWeight: 700 }}>
                                리뷰 {remaining}개 더 쓰면 첫 달 0원!
                            </div>
                            <div style={{ fontSize: 12, color: T.textSub, marginTop: 2 }}>
                                지금까지 {reviewCount}개 작성 완료
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {remaining > 0 && (
                        <Link
                            href="/reviews/write"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                background: T.blue, color: '#fff',
                                padding: '14px', borderRadius: T.radiusMd,
                                fontSize: 15, fontWeight: 700, textDecoration: 'none',
                            }}
                        >
                            <PenLine size={16} />
                            리뷰 작성하고 무료 혜택 받기
                        </Link>
                    )}
                    <div
                        onClick={() => setShowModal(true)}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            background: remaining > 0 ? T.bg : T.blue,
                            color: remaining > 0 ? T.text : '#fff',
                            padding: '14px', borderRadius: T.radiusMd,
                            fontSize: 15, fontWeight: 700, cursor: 'pointer',
                            border: remaining > 0 ? `1px solid ${T.border}` : 'none',
                        }}
                    >
                        {remaining > 0 ? '월 5,900원으로 바로 구독하기' : '구독하고 전체 리뷰 보기'}
                    </div>
                </div>
            </div>

            <SubscriptionModal
                open={showModal}
                onClose={() => setShowModal(false)}
                reviewCount={reviewCount}
            />
        </>
    );

    if (variant === 'overlay') {
        return (
            <div style={{
                position: 'absolute', inset: 0,
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                background: 'rgba(245,246,248,0.8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 20, zIndex: 10, borderRadius: 'inherit',
            }}>
                {card}
            </div>
        );
    }

    return card;
}
