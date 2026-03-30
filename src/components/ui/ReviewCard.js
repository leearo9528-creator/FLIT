'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { timeAgo } from '@/lib/helpers';

/* ─── 리뷰 잠금 ─── */
export function ReviewLock({ isLoggedIn }) {
    return (
        <div style={{
            background: 'rgba(248,249,250,0.92)',
            backdropFilter: 'blur(6px)',
            borderRadius: 10, padding: '16px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            border: `1px solid ${T.border}`,
            marginTop: 8,
        }}>
            <Lock size={20} color={T.gray} />
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>
                {isLoggedIn ? '리뷰를 작성하면 볼 수 있어요' : '로그인이 필요해요'}
            </div>
            <div style={{ fontSize: 12, color: T.gray, textAlign: 'center', lineHeight: 1.6 }}>
                {isLoggedIn
                    ? '리뷰 1개 이상 작성하면\n매출·별점·방문객 상세 내용을 볼 수 있어요'
                    : '로그인 후 리뷰를 작성하면\n모든 리뷰 상세 내용을 열람할 수 있어요'}
            </div>
            <Link href={isLoggedIn ? '/reviews/write' : '/login'} style={{
                fontSize: 12, fontWeight: 700, color: T.white,
                background: T.blue, padding: '8px 20px', borderRadius: T.radiusFull,
                textDecoration: 'none', marginTop: 4,
            }}>
                {isLoggedIn ? '리뷰 작성하기' : '로그인하기'}
            </Link>
        </div>
    );
}

/* ─── 리뷰 카드 ─── */
export default function ReviewCard({ review, canView, isLoggedIn, showEventLink, showOrgInfo }) {
    const [expanded, setExpanded] = useState(false);
    const inst = review.event_instance || {};
    const ev   = inst.base_event || {};
    const org  = inst.organizer || {};
    const isFoodtruck = review.seller_type === 'foodtruck';

    const allScores = [review.rating_profit, review.rating_traffic, review.rating_promotion, review.rating_support, review.rating_manners].filter(v => v != null);
    const overall   = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
    const scoreLabel = overall >= 4.5 ? '최고예요' : overall >= 3.5 ? '좋아요' : overall >= 2.5 ? '보통이에요' : '아쉬워요';
    const sColor = overall >= 4.0 ? T.green : overall >= 3.0 ? T.blue : T.gray;

    const prosChips    = review.pros ? review.pros.split('\n').map(s => s.trim()).filter(Boolean) : [];
    const consChips    = review.cons ? review.cons.split('\n').map(s => s.trim()).filter(Boolean) : [];
    const ageGroups    = Array.isArray(review.age_groups)    ? review.age_groups    : [];
    const visitorTypes = Array.isArray(review.visitor_types) ? review.visitor_types : [];

    return (
        <div style={{ background: T.white, borderRadius: 14, border: `1px solid ${T.border}`, padding: '16px' }}>

            {/* 행사명 링크 (주최사 페이지에서 사용) */}
            {showEventLink && ev.name && (
                <Link href={`/events/${ev.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.blue, marginBottom: 10 }}>
                        🎪 {ev.name}
                        {inst.event_date && (
                            <span style={{ fontWeight: 400, color: T.gray, marginLeft: 6 }}>
                                {new Date(inst.event_date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                            </span>
                        )}
                    </div>
                </Link>
            )}

            {/* 상단: 셀러 유형 + 점수 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                    <span style={{ fontSize: 11, color: T.gray, fontWeight: 600 }}>
                        {isFoodtruck ? '🚚 푸드트럭' : '🛍️ 일반셀러'}
                        {review.is_verified && ' · ✅ 인증'}
                    </span>
                    {showOrgInfo && (org.name || inst.event_date) && (
                        <div style={{ fontSize: 12, color: T.gray, marginTop: 3, display: 'flex', gap: 8 }}>
                            {org.name && <span>{org.name}</span>}
                            {inst.event_date && <span>{new Date(inst.event_date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}</span>}
                        </div>
                    )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: sColor, lineHeight: 1 }}>{overall.toFixed(1)}</div>
                    <div style={{ fontSize: 10, color: T.gray, marginTop: 2 }}>{scoreLabel}</div>
                </div>
            </div>

            <div style={{ height: 1, background: T.border, marginBottom: 12 }} />

            {canView ? (
                <>
                    {/* 매출 */}
                    {review.revenue_range && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <span style={{ fontSize: 12, color: T.gray, width: 40, flexShrink: 0 }}>매출</span>
                            <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>{review.revenue_range}</span>
                        </div>
                    )}

                    {/* 항목별 평가 (바 차트) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 12 }}>
                        {[
                            { field: 'rating_profit',    label: isFoodtruck ? '수익성' : '구매력' },
                            { field: 'rating_traffic',   label: '유동인구' },
                            { field: 'rating_support',   label: '운영지원' },
                            { field: 'rating_manners',   label: '주최매너' },
                            { field: 'rating_promotion', label: '홍보' },
                        ].filter(({ field }) => review[field] != null).map(({ field, label }) => {
                            const val = review[field];
                            const c = val >= 4.0 ? T.green : val >= 3.0 ? T.blue : T.gray;
                            return (
                                <div key={field} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 12, color: T.gray, width: 48, flexShrink: 0 }}>{label}</span>
                                    <div style={{ flex: 1, height: 5, background: T.border, borderRadius: 3, overflow: 'hidden' }}>
                                        <div style={{ width: `${(val / 5) * 100}%`, height: '100%', background: c, borderRadius: 3 }} />
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 800, color: c, width: 28, textAlign: 'right', flexShrink: 0 }}>{val}.0</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* 방문객 */}
                    {(ageGroups.length > 0 || visitorTypes.length > 0) && (
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
                            <span style={{ fontSize: 11, color: T.gray }}>방문객</span>
                            {[...ageGroups, ...visitorTypes].map(tag => (
                                <span key={tag} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: T.bg, color: T.gray, fontWeight: 600 }}>{tag}</span>
                            ))}
                        </div>
                    )}

                    {/* 장단점 */}
                    {(prosChips.length > 0 || consChips.length > 0) && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
                            {prosChips.length > 0 && (
                                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center' }}>
                                    <span style={{ fontSize: 11, color: T.gray }}>👍</span>
                                    {prosChips.map(c => <span key={c} style={{ fontSize: 12, padding: '2px 9px', borderRadius: 20, background: T.bg, color: T.gray, fontWeight: 600 }}>{c}</span>)}
                                </div>
                            )}
                            {consChips.length > 0 && (
                                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center' }}>
                                    <span style={{ fontSize: 11, color: T.gray }}>👎</span>
                                    {consChips.map(c => <span key={c} style={{ fontSize: 12, padding: '2px 9px', borderRadius: 20, background: T.bg, color: T.gray, fontWeight: 600 }}>{c}</span>)}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 종합 평가 */}
                    {review.content && (
                        <>
                            <div style={{ height: 1, background: T.border, marginBottom: 10 }} />
                            <div style={{
                                fontSize: 13, color: T.textSub, lineHeight: 1.7,
                                display: expanded ? 'block' : '-webkit-box',
                                WebkitLineClamp: expanded ? undefined : 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: expanded ? 'visible' : 'hidden',
                            }}>
                                {review.content}
                            </div>
                            {review.content.length > 60 && (
                                <button
                                    onClick={() => setExpanded(v => !v)}
                                    style={{ background: 'none', border: 'none', padding: 0, fontSize: 12, color: T.blue, fontWeight: 700, cursor: 'pointer', marginTop: 4 }}
                                >
                                    {expanded ? '접기 ▲' : '더 보기 ▼'}
                                </button>
                            )}
                        </>
                    )}
                </>
            ) : (
                <ReviewLock isLoggedIn={isLoggedIn} />
            )}

            {/* 작성 시간 */}
            <div style={{ fontSize: 11, color: T.gray, textAlign: 'right', marginTop: 10 }}>{timeAgo(review.created_at)}</div>
        </div>
    );
}
