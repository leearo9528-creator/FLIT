'use client';

import { X, Check, Sparkles, PenLine } from 'lucide-react';
import Link from 'next/link';
import { T } from '@/lib/design-tokens';

const BENEFITS = [
    '셀러들의 실제 수익·집객 후기 전체 열람',
    '행사별 매출 데이터 및 평점 상세 확인',
    '주최사 운영 만족도 리뷰 무제한 열람',
    '신규 공고 알림 즉시 수신',
];

export default function SubscriptionModal({ open, onClose, reviewCount = 0 }) {
    if (!open) return null;

    const remaining = Math.max(0, 3 - reviewCount);

    return (
        <>
            {/* dim */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0, zIndex: 300,
                    background: 'rgba(0,0,0,0.5)',
                }}
            />

            {/* bottom sheet */}
            <div style={{
                position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 301,
                background: T.white,
                borderRadius: `${T.radiusXl}px ${T.radiusXl}px 0 0`,
                padding: '28px 24px 40px',
                maxWidth: 480,
                margin: '0 auto',
            }}>
                {/* 핸들 */}
                <div style={{
                    width: 36, height: 4, borderRadius: 2,
                    background: T.border, margin: '0 auto 24px',
                }} />

                {/* 닫기 */}
                <div
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: 20, right: 20,
                        cursor: 'pointer', padding: 4,
                    }}
                >
                    <X size={20} color={T.gray} />
                </div>

                {/* 헤더 */}
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{
                        width: 52, height: 52, borderRadius: '50%',
                        background: T.blueLt,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 12px',
                    }}>
                        <span style={{ fontSize: 24 }}>🔓</span>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: T.text, marginBottom: 6 }}>
                        플릿 구독
                    </div>
                    <div style={{ fontSize: 14, color: T.gray, lineHeight: 1.6 }}>
                        셀러들의 솔직한 리뷰를 제한 없이 확인하세요
                    </div>
                </div>

                {/* 무료 체험 배너 */}
                {remaining > 0 && (
                    <div style={{
                        background: T.blueLt,
                        borderRadius: T.radiusMd,
                        padding: '12px 16px',
                        display: 'flex', alignItems: 'center', gap: 10,
                        marginBottom: 20,
                    }}>
                        <Sparkles size={18} color={T.blue} />
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: T.blue }}>
                                리뷰 {remaining}개 더 쓰면 첫 달 무료!
                            </div>
                            <div style={{ fontSize: 12, color: T.textSub, marginTop: 2 }}>
                                지금까지 {reviewCount}개 작성 · {3}개 작성 시 한 달 0원
                            </div>
                        </div>
                    </div>
                )}

                {/* 혜택 리스트 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {BENEFITS.map((b, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                            <div style={{
                                width: 18, height: 18, borderRadius: '50%',
                                background: T.greenLt, flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginTop: 1,
                            }}>
                                <Check size={11} color={T.green} strokeWidth={3} />
                            </div>
                            <span style={{ fontSize: 14, color: T.text, lineHeight: 1.5 }}>{b}</span>
                        </div>
                    ))}
                </div>

                {/* 가격 + CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {remaining > 0 && (
                        <Link
                            href="/reviews/write"
                            onClick={onClose}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                background: T.bg, color: T.text,
                                padding: '14px', borderRadius: T.radiusMd,
                                fontSize: 14, fontWeight: 700, textDecoration: 'none',
                                border: `1px solid ${T.border}`,
                            }}
                        >
                            <PenLine size={15} />
                            리뷰 작성하고 무료로 시작하기
                        </Link>
                    )}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: T.blue, color: '#fff',
                        padding: '16px', borderRadius: T.radiusMd,
                        fontSize: 15, fontWeight: 800, cursor: 'pointer',
                        gap: 8,
                    }}>
                        월 5,900원으로 구독 시작
                    </div>
                    <div style={{ fontSize: 12, color: T.gray, textAlign: 'center' }}>
                        언제든지 해지 가능 · 자동 갱신
                    </div>
                </div>
            </div>
        </>
    );
}
