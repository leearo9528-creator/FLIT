'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Building2, Lock } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { timeAgo } from '@/lib/helpers';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { canViewReviewDetail } from '@/lib/plans';

/* ─── 잠금 오버레이 ─────────────────────────────────────────── */
function ReviewLock({ sellerType }) {
    const isFoodtruck = sellerType === 'foodtruck';
    return (
        <div style={{
            background: T.bg, borderRadius: 10, padding: '16px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            border: `1px solid ${T.border}`, marginTop: 8,
        }}>
            <Lock size={20} color={T.gray} />
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>
                {isFoodtruck ? '푸드트럭 플랜' : '구독 플랜'}이 필요해요
            </div>
            <div style={{ fontSize: 12, color: T.gray, textAlign: 'center', lineHeight: 1.6 }}>
                매출·별점·방문객 등 상세 내용은<br />
                {isFoodtruck ? '푸드트럭 구독자' : '구독 회원'}만 열람 가능해요
            </div>
            <Link href="/subscribe" style={{
                fontSize: 12, fontWeight: 700, color: T.white,
                background: T.blue, padding: '8px 20px', borderRadius: T.radiusFull,
                textDecoration: 'none', marginTop: 4,
            }}>
                구독하고 보기
            </Link>
        </div>
    );
}

/* ─── 리뷰 카드 ─────────────────────────────────────────────── */
function ReviewCard({ review, userPlan }) {
    const [expanded, setExpanded] = useState(false);
    const inst = review.event_instance || {};
    const ev   = inst.base_event || {};
    const isFoodtruck = review.seller_type === 'foodtruck';
    const canView = canViewReviewDetail(userPlan, review.seller_type);

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

            {/* 행사명 링크 */}
            {ev.name && (
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
                <ReviewLock sellerType={review.seller_type} />
            )}

            <div style={{ fontSize: 11, color: T.gray, textAlign: 'right', marginTop: 10 }}>{timeAgo(review.created_at)}</div>
        </div>
    );
}

/* ─── 모집공고 카드 ─────────────────────────────────────────── */
function RecruitCard({ rec }) {
    const inst = rec.instance || {};
    const ev   = inst.base_event || {};
    const daysLeft = rec.end_date
        ? Math.ceil((new Date(rec.end_date) - Date.now()) / 86400000)
        : null;

    return (
        <Link href={`/recruitments/${rec.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: T.white, borderRadius: 14, border: `1px solid ${T.border}`, padding: '16px' }}>

                {/* 상태 + D-day */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{
                        padding: '3px 9px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                        background: rec.status === 'OPEN' ? T.greenLt : T.grayLt,
                        color: rec.status === 'OPEN' ? T.green : T.gray,
                    }}>
                        {rec.status === 'OPEN' ? '🟢 모집중' : '⚫ 마감됨'}
                    </span>
                    {daysLeft !== null && daysLeft >= 0 && (
                        <span style={{ fontSize: 12, fontWeight: 700, color: daysLeft <= 3 ? T.red : T.gray }}>
                            {daysLeft === 0 ? 'D-Day' : `D-${daysLeft}`}
                        </span>
                    )}
                </div>

                {/* 공고 제목 */}
                <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 6, lineHeight: 1.4 }}>
                    {rec.title}
                </div>

                {/* 행사명 */}
                {ev.name && (
                    <div style={{ fontSize: 12, color: T.gray, marginBottom: 8 }}>🎪 {ev.name}</div>
                )}

                <div style={{ height: 1, background: T.border, marginBottom: 10 }} />

                {/* 참가비 + 날짜 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: T.blue }}>
                        {!rec.fee ? '참가비 무료' : `${Number(rec.fee).toLocaleString()}원`}
                    </span>
                    {inst.event_date && (
                        <span style={{ fontSize: 12, color: T.gray }}>
                            🗓 {new Date(inst.event_date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                            {inst.event_date_end && inst.event_date_end !== inst.event_date && (
                                <> ~ {new Date(inst.event_date_end).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}</>
                            )}
                        </span>
                    )}
                </div>
                {inst.location && (
                    <div style={{ fontSize: 12, color: T.gray, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={11} color={T.gray} />{inst.location}
                    </div>
                )}
            </div>
        </Link>
    );
}

/* ─── 행사 이력 카드 ─────────────────────────────────────────── */
function InstanceCard({ inst }) {
    const ev     = inst.base_event || {};
    const isPast = inst.event_date && new Date(inst.event_date) < new Date();
    const rating = ev.avg_event_rating;
    const sColor = rating >= 4.0 ? T.green : rating >= 3.0 ? T.blue : T.gray;

    return (
        <Link href={`/events/${ev.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                background: T.white, borderRadius: 12, border: `1px solid ${T.border}`,
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14,
            }}>
                {/* 날짜 블록 */}
                <div style={{
                    flexShrink: 0, width: 52, textAlign: 'center',
                    background: isPast ? T.grayLt : T.blueLt,
                    borderRadius: 10, padding: '8px 4px',
                }}>
                    {inst.event_date ? (
                        <>
                            <div style={{ fontSize: 11, color: isPast ? T.gray : T.blue, fontWeight: 700 }}>
                                {new Date(inst.event_date).toLocaleDateString('ko-KR', { month: 'short' })}
                            </div>
                            <div style={{ fontSize: 20, fontWeight: 900, color: isPast ? T.gray : T.blue, lineHeight: 1 }}>
                                {new Date(inst.event_date).getDate()}
                            </div>
                        </>
                    ) : (
                        <div style={{ fontSize: 11, color: T.gray }}>미정</div>
                    )}
                </div>

                {/* 본문 */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ev.name || '행사명 없음'}
                    </div>
                    {ev.category && (
                        <span style={{
                            fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                            background: T.bg, color: T.gray, marginBottom: 3, display: 'inline-block',
                        }}>{ev.category}</span>
                    )}
                    {inst.location && (
                        <div style={{ fontSize: 12, color: T.gray, display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                            <MapPin size={11} color={T.gray} />{inst.location}
                        </div>
                    )}
                </div>

                {/* 평점 */}
                {rating != null ? (
                    <div style={{ flexShrink: 0, textAlign: 'center' }}>
                        <div style={{ fontSize: 16, fontWeight: 900, color: sColor }}>{Number(rating).toFixed(1)}</div>
                        <div style={{ fontSize: 10, color: T.gray, marginTop: 1 }}>점</div>
                    </div>
                ) : isPast ? (
                    <div style={{ flexShrink: 0, fontSize: 10, color: T.gray, background: T.grayLt, padding: '3px 8px', borderRadius: 6 }}>종료</div>
                ) : null}
            </div>
        </Link>
    );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function OrganizerDetailClient({ organizer, instances, initialRecruitments, initialReviews }) {
    const router = useRouter();
    const { plan } = useAuth();
    const [activeTab, setActiveTab] = useState('recruit');

    const openRecruits   = initialRecruitments.filter(r => r.status === 'OPEN');
    const closedRecruits = initialRecruitments.filter(r => r.status !== 'OPEN');

    const ratingFields = ['rating_profit', 'rating_traffic', 'rating_promotion', 'rating_support', 'rating_manners'];
    const avgRatings = ratingFields.reduce((acc, field) => {
        const vals = initialReviews.map(r => r[field]).filter(v => v != null);
        if (vals.length > 0) acc[field] = vals.reduce((a, b) => a + b, 0) / vals.length;
        return acc;
    }, {});
    const hasFoodtruck = initialReviews.some(r => r.seller_type === 'foodtruck');

    const allScores = initialReviews.flatMap(r => ratingFields.map(f => r[f]).filter(v => v != null));
    const overallAvg = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : null;
    const overallColor = overallAvg >= 4.0 ? T.green : overallAvg >= 3.0 ? T.blue : T.gray;

    const TABS = [
        { key: 'recruit', label: '모집공고', count: initialRecruitments.length },
        { key: 'history', label: '행사 이력', count: instances.length },
        { key: 'reviews', label: '셀러 리뷰', count: initialReviews.length },
    ];

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>

            {/* ── 상단 네비 바 ── */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)',
                borderBottom: `1px solid ${T.border}`,
                display: 'flex', alignItems: 'center', gap: 8, padding: '14px 16px',
            }}>
                <div onClick={() => router.back()} style={{ cursor: 'pointer', padding: 4, flexShrink: 0 }}>
                    <ChevronLeft size={22} color={T.text} />
                </div>
                <div style={{ flex: 1, fontSize: 16, fontWeight: 800, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {organizer.name}
                </div>
            </div>

            {/* ── 히어로 ── */}
            <div style={{ background: T.white, borderBottom: `1px solid ${T.border}` }}>
                <div style={{ padding: '24px 20px 20px' }}>

                    {/* 로고 + 이름 */}
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
                        <div style={{
                            width: 68, height: 68, borderRadius: 16, flexShrink: 0,
                            background: T.grayLt, overflow: 'hidden',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {organizer.logo_url
                                ? <img src={organizer.logo_url} alt={organizer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                : <span style={{ fontSize: 28 }}>🏢</span>
                            }
                        </div>
                        <div>
                            <div style={{ fontSize: 22, fontWeight: 900, color: T.text, lineHeight: 1.3, marginBottom: 4 }}>
                                {organizer.name}
                            </div>
                            <div style={{ fontSize: 12, color: T.gray }}>행사 기획 · 주최</div>
                        </div>
                    </div>

                    {/* 설명 */}
                    {organizer.description && (
                        <div style={{ fontSize: 14, color: T.textSub, lineHeight: 1.65, marginBottom: 16 }}>
                            {organizer.description}
                        </div>
                    )}

                    {/* 통계 카드 */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                        background: T.bg, borderRadius: 14, padding: '14px 8px', gap: 4,
                    }}>
                        {[
                            { label: '개최 수',  value: `${organizer.total_instances ?? 0}회`, color: T.text },
                            { label: '리뷰 수',  value: `${organizer.total_reviews   ?? 0}개`, color: T.text },
                            { label: '종합 평점', value: overallAvg ? overallAvg.toFixed(1) : '-', color: overallAvg ? overallColor : T.gray },
                        ].map(({ label, value, color }, i, arr) => (
                            <div key={label} style={{
                                textAlign: 'center',
                                borderRight: i < arr.length - 1 ? `1px solid ${T.border}` : 'none',
                            }}>
                                <div style={{ fontSize: 11, color: T.gray, marginBottom: 4 }}>{label}</div>
                                <div style={{ fontSize: 16, fontWeight: 800, color }}>{value}</div>
                            </div>
                        ))}
                    </div>

                    {/* 항목별 평균 */}
                    {Object.keys(avgRatings).length > 0 && (
                        <div style={{ marginTop: 16 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 10 }}>항목별 평균</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[
                                    { field: 'rating_profit',    label: hasFoodtruck ? '수익성' : '구매력' },
                                    { field: 'rating_traffic',   label: '유동인구' },
                                    { field: 'rating_support',   label: '운영지원' },
                                    { field: 'rating_manners',   label: '주최매너' },
                                    { field: 'rating_promotion', label: '홍보' },
                                ].filter(({ field }) => avgRatings[field] != null).map(({ field, label }) => {
                                    const val   = avgRatings[field];
                                    const color = val >= 4.0 ? T.green : val >= 3.0 ? T.blue : T.gray;
                                    return (
                                        <div key={field} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ fontSize: 12, color: T.gray, width: 48, flexShrink: 0 }}>{label}</span>
                                            <div style={{ flex: 1, height: 5, background: T.border, borderRadius: 3, overflow: 'hidden' }}>
                                                <div style={{ width: `${(val / 5) * 100}%`, height: '100%', background: color, borderRadius: 3 }} />
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 800, color, width: 28, textAlign: 'right', flexShrink: 0 }}>
                                                {val.toFixed(1)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* 모집 중 배지 */}
                {openRecruits.length > 0 && (
                    <div style={{ padding: '0 20px 16px' }}>
                        <div
                            onClick={() => setActiveTab('recruit')}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                background: T.greenLt, borderRadius: 10, padding: '10px 14px', cursor: 'pointer',
                            }}
                        >
                            <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>
                                🟢 지금 모집 중 ({openRecruits.length}개 공고)
                            </span>
                            <span style={{ fontSize: 12, color: T.green, fontWeight: 700 }}>공고 보기 →</span>
                        </div>
                    </div>
                )}
            </div>

            {/* ── 탭 바 ── */}
            <div style={{
                position: 'sticky', top: 52, zIndex: 99,
                background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)',
                borderBottom: `1px solid ${T.border}`,
                display: 'flex',
            }}>
                {TABS.map(tab => (
                    <div
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            flex: 1, textAlign: 'center', padding: '13px 0',
                            fontSize: 13, fontWeight: activeTab === tab.key ? 800 : 500,
                            color: activeTab === tab.key ? T.text : T.gray,
                            cursor: 'pointer',
                            borderBottom: activeTab === tab.key ? `2.5px solid ${T.text}` : '2.5px solid transparent',
                            transition: 'all 0.2s',
                        }}
                    >
                        {tab.label}{tab.count > 0 ? ` (${tab.count})` : ''}
                    </div>
                ))}
            </div>

            {/* ── 탭 콘텐츠 ── */}
            <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* 모집공고 */}
                {activeTab === 'recruit' && (
                    initialRecruitments.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>
                            등록된 모집공고가 없어요.
                        </div>
                    ) : (
                        <>
                            {openRecruits.length > 0 && (
                                <>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: T.green, paddingLeft: 2 }}>🟢 모집 중 ({openRecruits.length})</div>
                                    {openRecruits.map(r => <RecruitCard key={r.id} rec={r} />)}
                                </>
                            )}
                            {closedRecruits.length > 0 && (
                                <>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, paddingLeft: 2, marginTop: 4 }}>지난 공고</div>
                                    {closedRecruits.map(r => <RecruitCard key={r.id} rec={r} />)}
                                </>
                            )}
                        </>
                    )
                )}

                {/* 행사 이력 */}
                {activeTab === 'history' && (
                    instances.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>
                            개최 이력이 없어요.
                        </div>
                    ) : (
                        instances.map(inst => <InstanceCard key={inst.id} inst={inst} />)
                    )
                )}

                {/* 셀러 리뷰 */}
                {activeTab === 'reviews' && (
                    initialReviews.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>
                            아직 등록된 리뷰가 없어요.
                        </div>
                    ) : (
                        initialReviews.map(r => <ReviewCard key={r.id} review={r} userPlan={plan} />)
                    )
                )}
            </div>
        </div>
    );
}
