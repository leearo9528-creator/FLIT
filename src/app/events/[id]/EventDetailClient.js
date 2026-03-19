'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Tag, Calendar, Building2, Star, Lock } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { timeAgo } from '@/lib/helpers';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { canViewReviewDetail } from '@/lib/plans';

const TABS = [
    { key: 'recruit', label: '모집공고' },
    { key: 'reviews', label: '리뷰' },
];

/* ─── 매출 금액 칩 ──────────────────────────────────────────── */
const REVENUE_COLOR = {
    '100만원 이상': { bg: '#DCFCE7', color: '#16A34A' },
    '50-100만원':   { bg: '#DCFCE7', color: '#16A34A' },
    '30-50만원':    { bg: '#DBEAFE', color: '#2563EB' },
    '10-30만원':    { bg: '#FEF3C7', color: '#D97706' },
    '10만원 미만':  { bg: '#FEE2E2', color: '#DC2626' },
};

function RevenueChip({ value }) {
    const style = REVENUE_COLOR[value] || { bg: '#F3F4F6', color: '#6B7280' };
    return (
        <span style={{
            fontSize: 13, fontWeight: 800,
            padding: '4px 12px', borderRadius: 20,
            background: style.bg, color: style.color,
        }}>
            💰 {value}
        </span>
    );
}

/* ─── 별점 행 ───────────────────────────────────────────────── */
function StarRow({ label, value }) {
    if (value == null) return null;
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: T.gray, width: 52, flexShrink: 0 }}>{label}</span>
            <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(i => (
                    <span key={i} style={{ fontSize: 14, color: i <= value ? '#F59E0B' : '#E5E7EB', lineHeight: 1 }}>★</span>
                ))}
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: T.text, marginLeft: 2 }}>{value}.0</span>
        </div>
    );
}

/* ─── 히어로 평점 바 (행사 상세 요약 전용) ─────────────────── */
function RatingBar({ label, value, color }) {
    if (!value && value !== 0) return null;
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: T.gray, width: 28, flexShrink: 0 }}>{label}</span>
            <div style={{ flex: 1, height: 6, background: T.border, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${(value / 5) * 100}%`, height: '100%', background: color, borderRadius: 3 }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color, width: 28, textAlign: 'right' }}>
                {Number(value).toFixed(1)}
            </span>
        </div>
    );
}

/* ─── 개최 이력 카드 ────────────────────────────────────────── */
function InstanceCard({ inst }) {
    const isPast = inst.event_date && new Date(inst.event_date) < new Date();
    const scoreColor = inst.avg_event_rating >= 4.0 ? T.green : inst.avg_event_rating >= 3.0 ? T.blue : T.gray;

    return (
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
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {inst.organizer?.name ?? '주최사 미상'}
                </div>
                {inst.location && (
                    <div style={{ fontSize: 12, color: T.gray, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={11} color={T.gray} />
                        {inst.location}
                    </div>
                )}
                {inst.event_date_end && inst.event_date_end !== inst.event_date && (
                    <div style={{ fontSize: 11, color: T.gray, marginTop: 2 }}>
                        ~ {new Date(inst.event_date_end).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                    </div>
                )}
            </div>

            {/* 평점 */}
            {inst.review_count > 0 && (
                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: scoreColor }}>
                        {Number(inst.avg_event_rating).toFixed(1)}
                    </div>
                    <div style={{ fontSize: 10, color: T.gray, marginTop: 1 }}>
                        리뷰 {inst.review_count}
                    </div>
                </div>
            )}
            {isPast && inst.review_count === 0 && (
                <div style={{ flexShrink: 0, fontSize: 10, color: T.gray, background: T.grayLt, padding: '3px 8px', borderRadius: 6 }}>
                    종료
                </div>
            )}
        </div>
    );
}

/* ─── 모집공고 카드 ─────────────────────────────────────────── */
function RecruitCard({ rec }) {
    const inst = rec.instance || {};
    const org  = inst.organizer || {};
    const daysLeft = rec.end_date
        ? Math.ceil((new Date(rec.end_date) - Date.now()) / 86400000)
        : null;

    return (
        <div style={{
            background: T.white, borderRadius: 14,
            border: `1px solid ${T.border}`, padding: '16px',
            boxShadow: T.shadowSm,
        }}>
            {/* 상태 + D-day */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{
                    padding: '4px 9px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                    background: rec.status === 'OPEN' ? T.greenLt : T.grayLt,
                    color: rec.status === 'OPEN' ? T.green : T.gray,
                }}>
                    {rec.status === 'OPEN' ? '🟢 모집중' : '⚫ 마감됨'}
                </div>
                {daysLeft !== null && daysLeft >= 0 && (
                    <span style={{ fontSize: 12, fontWeight: 700, color: daysLeft <= 3 ? T.red : T.gray }}>
                        {daysLeft === 0 ? 'D-Day' : `D-${daysLeft}`}
                    </span>
                )}
            </div>

            {/* 공고 제목 */}
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 8, lineHeight: 1.4 }}>
                {rec.title}
            </div>

            {/* 주최사 */}
            {org.name && (
                <div style={{ fontSize: 13, color: T.gray, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Building2 size={12} color={T.gray} />
                    {org.name}
                </div>
            )}

            {/* 참가비 + 날짜 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: inst.location ? 8 : 0 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: T.blue }}>
                    {!rec.fee ? '참가비 무료' : `참가비 ${Number(rec.fee).toLocaleString()}원`}
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

            {/* 장소 */}
            {inst.location && (
                <div style={{ fontSize: 12, color: T.gray, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={11} color={T.gray} />
                    {inst.location}
                </div>
            )}
        </div>
    );
}

/* ─── 구분선 ────────────────────────────────────────────────── */
function Divider() {
    return <div style={{ height: 1, background: T.border, margin: '10px 0' }} />;
}

/* ─── 잠금 오버레이 ─────────────────────────────────────────── */
function ReviewLock({ sellerType }) {
    const isFoodtruck = sellerType === 'foodtruck';
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
    const org  = inst.organizer || {};
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

            {/* ── 상단: 셀러 유형 + 점수 ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                    <span style={{ fontSize: 11, color: T.gray, fontWeight: 600 }}>
                        {isFoodtruck ? '🚚 푸드트럭' : '🛍️ 일반셀러'}
                        {review.is_verified && ' · ✅ 인증'}
                    </span>
                    {(org.name || inst.event_date) && (
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
                    {/* ── 매출 ── */}
                    {review.revenue_range && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <span style={{ fontSize: 12, color: T.gray, width: 40, flexShrink: 0 }}>매출</span>
                            <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>{review.revenue_range}</span>
                        </div>
                    )}

                    {/* ── 항목별 평가 (바 차트) ── */}
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

                    {/* ── 방문객 ── */}
                    {(ageGroups.length > 0 || visitorTypes.length > 0) && (
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
                            <span style={{ fontSize: 11, color: T.gray }}>방문객</span>
                            {[...ageGroups, ...visitorTypes].map(tag => (
                                <span key={tag} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: T.bg, color: T.gray, fontWeight: 600 }}>{tag}</span>
                            ))}
                        </div>
                    )}

                    {/* ── 장단점 ── */}
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

                    {/* ── 종합 평가 ── */}
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

            {/* ── 작성 시간 ── */}
            <div style={{ fontSize: 11, color: T.gray, textAlign: 'right', marginTop: 10 }}>{timeAgo(review.created_at)}</div>
        </div>
    );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function EventDetailClient({ event, instances, initialReviews, initialRecruitments }) {
    const router = useRouter();
    const { plan } = useAuth();
    const [activeTab, setActiveTab] = useState('reviews');

    const fleaReviews      = initialReviews.filter(r => r.seller_type !== 'foodtruck');
    const foodtruckReviews = initialReviews.filter(r => r.seller_type === 'foodtruck');
    const [reviewSellerTab, setReviewSellerTab] = useState(
        fleaReviews.length > 0 ? 'flea' : 'foodtruck'
    );
    const activeReviews = reviewSellerTab === 'foodtruck' ? foodtruckReviews : fleaReviews;
    const isFoodtruckTab = reviewSellerTab === 'foodtruck';

    const openRecruits   = initialRecruitments.filter(r => r.status === 'OPEN');
    const closedRecruits = initialRecruitments.filter(r => r.status !== 'OPEN');
    const revenueOrder = ['100만원 이상', '50-100만원', '30-50만원', '10-30만원', '10만원 미만'];
    const ratingFields = ['rating_profit', 'rating_traffic', 'rating_promotion', 'rating_support', 'rating_manners'];

    // 활성 탭 기준 통계
    const activeOverallScore = (() => {
        const vals = activeReviews.flatMap(r => ratingFields.map(f => r[f]).filter(v => v != null));
        return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    })();
    const scoreColor = activeOverallScore >= 4.0 ? T.green : activeOverallScore >= 3.0 ? T.blue : T.gray;

    const revenueDistribution = activeReviews.reduce((acc, r) => {
        if (r.revenue_range) acc[r.revenue_range] = (acc[r.revenue_range] || 0) + 1;
        return acc;
    }, {});

    const avgRatings = ratingFields.reduce((acc, field) => {
        const vals = activeReviews.map(r => r[field]).filter(v => v != null);
        if (vals.length > 0) acc[field] = vals.reduce((a, b) => a + b, 0) / vals.length;
        return acc;
    }, {});

    const ageGroupCount = activeReviews.reduce((acc, r) => {
        (Array.isArray(r.age_groups) ? r.age_groups : []).forEach(a => { acc[a] = (acc[a] || 0) + 1; });
        return acc;
    }, {});
    const ageGroupTotal = Object.values(ageGroupCount).reduce((a, b) => a + b, 0);

    const visitorTypeCount = activeReviews.reduce((acc, r) => {
        (Array.isArray(r.visitor_types) ? r.visitor_types : []).forEach(v => { acc[v] = (acc[v] || 0) + 1; });
        return acc;
    }, {});
    const visitorTypeTotal = Object.values(visitorTypeCount).reduce((a, b) => a + b, 0);

    // 주최사별 평균 평점 (상세 탭용)
    const organizerStats = instances.reduce((acc, inst) => {
        if (!inst.organizer) return acc;
        const name = inst.organizer.name;
        if (!acc[name]) acc[name] = { name, count: 0, reviewCount: 0, avgEvent: 0, avgOrg: 0 };
        acc[name].count++;
        if (inst.review_count > 0) {
            acc[name].reviewCount += inst.review_count;
            acc[name].avgEvent   += inst.avg_event_rating || 0;
            acc[name].avgOrg     += inst.avg_organizer_rating || 0;
        }
        return acc;
    }, {});

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
                <div style={{
                    flex: 1, fontSize: 16, fontWeight: 800, color: T.text,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                    {event.name}
                </div>
            </div>

            {/* ── 히어로 섹션 ── */}
            <div style={{ background: T.white, borderBottom: `1px solid ${T.border}` }}>

                {/* 행사 제목 영역 */}
                <div style={{ padding: '20px 20px 16px' }}>
                    {event.category && (
                        <span style={{
                            fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4,
                            background: T.blueLt, color: T.blue, display: 'inline-block', marginBottom: 8,
                        }}>
                            {event.category}
                        </span>
                    )}
                    <div style={{ fontSize: 22, fontWeight: 900, color: T.text, lineHeight: 1.3, marginBottom: 10 }}>
                        {event.name}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {instances[0]?.location && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: T.gray }}>
                                <MapPin size={13} color={T.gray} strokeWidth={2} />
                                {instances[0].location}
                            </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: T.gray }}>
                            <Calendar size={13} color={T.gray} strokeWidth={2} />
                            총 {event.total_instances || 0}회 개최
                        </div>
                    </div>
                </div>

                {/* 상세 사진 */}
                {event.image_url ? (
                    <img src={event.image_url} alt={event.name}
                        style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
                ) : (
                    <div style={{
                        width: '100%', height: 160, background: `linear-gradient(135deg, ${T.blueLt}, #dbeafe)`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}>
                        <span style={{ fontSize: 44 }}>
                            {event.category === '푸드트럭페스티벌' ? '🚚'
                                : event.category === '팝업마켓' ? '🏪'
                                : event.category === '복합문화행사' ? '🎪'
                                : '🛍️'}
                        </span>
                        <span style={{ fontSize: 12, color: T.gray }}>대표 사진 없음</span>
                    </div>
                )}

                {/* 모집 중 배지 */}
                {openRecruits.length > 0 && (
                    <div style={{ padding: '12px 20px 16px' }}>
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
                {TABS.map(tab => {
                    const count = tab.key === 'recruit'
                        ? initialRecruitments.length
                        : tab.key === 'reviews'
                            ? initialReviews.length
                            : null;
                    return (
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
                            {tab.label}{count !== null && count > 0 ? ` (${count})` : ''}
                        </div>
                    );
                })}
            </div>

            {/* ── 탭 콘텐츠 ── */}
            <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* ── 모집공고 탭 ── */}
                {activeTab === 'recruit' && (
                    initialRecruitments.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>
                            등록된 모집공고가 없어요.
                        </div>
                    ) : (
                        <>
                            {openRecruits.length > 0 && (
                                <>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: T.green, paddingLeft: 2 }}>
                                        🟢 모집 중 ({openRecruits.length})
                                    </div>
                                    {openRecruits.map(r => <RecruitCard key={r.id} rec={r} />)}
                                </>
                            )}
                            {closedRecruits.length > 0 && (
                                <>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, paddingLeft: 2, marginTop: 4 }}>
                                        지난 공고
                                    </div>
                                    {closedRecruits.map(r => <RecruitCard key={r.id} rec={r} />)}
                                </>
                            )}
                        </>
                    )
                )}

                {/* ── 리뷰 탭 ── */}
                {activeTab === 'reviews' && (
                    <>
                        {/* 셀러 유형 서브탭 */}
                        <div style={{ display: 'flex', gap: 8 }}>
                            {[
                                { key: 'flea',      label: '🛍️ 플리마켓', count: fleaReviews.length },
                                { key: 'foodtruck', label: '🚚 푸드트럭', count: foodtruckReviews.length },
                            ].map(({ key, label, count }) => (
                                <button
                                    key={key}
                                    onClick={() => setReviewSellerTab(key)}
                                    style={{
                                        flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                                        fontSize: 13, fontWeight: 700,
                                        background: reviewSellerTab === key ? T.text : T.bg,
                                        color: reviewSellerTab === key ? T.white : T.gray,
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    {label} {count > 0 ? `(${count})` : ''}
                                </button>
                            ))}
                        </div>

                        {/* 셀러 평가 요약 */}
                        <div style={{ background: T.white, borderRadius: 14, border: `1px solid ${T.border}`, padding: '20px' }}>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 14 }}>셀러 평가 요약</div>

                            {activeReviews.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '20px 0', color: T.gray, fontSize: 13 }}>아직 리뷰가 없어요.</div>
                            ) : (
                                <>
                                    {/* 종합 점수 + 별 */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                                        <div style={{
                                            width: 60, height: 60, borderRadius: '50%', flexShrink: 0,
                                            background: `${scoreColor}18`, border: `2px solid ${scoreColor}40`,
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <div style={{ fontSize: 20, fontWeight: 900, color: scoreColor, lineHeight: 1 }}>
                                                {activeOverallScore.toFixed(1)}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
                                                {[1,2,3,4,5].map(i => (
                                                    <span key={i} style={{ fontSize: 16, color: i <= Math.round(activeOverallScore) ? '#F59E0B' : '#E5E7EB' }}>★</span>
                                                ))}
                                            </div>
                                            <div style={{ fontSize: 12, color: T.gray }}>
                                                셀러 <strong style={{ color: T.text }}>{activeReviews.length}</strong>명 리뷰 기준
                                            </div>
                                        </div>
                                    </div>

                                    {/* 항목별 평균 별점 */}
                                    {Object.keys(avgRatings).length > 0 && (
                                        <>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 8 }}>⭐ 항목별 평균</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                                                {[
                                                    { field: 'rating_profit',    label: isFoodtruckTab ? '수익성' : '구매력' },
                                                    { field: 'rating_traffic',   label: '유동인구' },
                                                    { field: 'rating_support',   label: '운영지원' },
                                                    { field: 'rating_manners',   label: '주최매너' },
                                                    { field: 'rating_promotion', label: '홍보'     },
                                                ].filter(({ field }) => avgRatings[field] != null).map(({ field, label }) => {
                                                    const val = avgRatings[field];
                                                    const color = val >= 4.0 ? T.green : val >= 3.0 ? T.blue : T.gray;
                                                    return (
                                                        <div key={field} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                            <span style={{ fontSize: 12, color: T.gray, width: 48, flexShrink: 0 }}>{label}</span>
                                                            <div style={{ flex: 1, height: 6, background: T.border, borderRadius: 3, overflow: 'hidden' }}>
                                                                <div style={{ width: `${(val / 5) * 100}%`, height: '100%', background: color, borderRadius: 3 }} />
                                                            </div>
                                                            <span style={{ fontSize: 12, fontWeight: 800, color, width: 28, textAlign: 'right', flexShrink: 0 }}>
                                                                {val.toFixed(1)}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}

                                    {/* 매출 분포 */}
                                    {Object.keys(revenueDistribution).length > 0 && (
                                        <>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 8 }}>💰 셀러 매출 분포</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                                                {revenueOrder.filter(k => revenueDistribution[k]).map(range => {
                                                    const cnt   = revenueDistribution[range];
                                                    const total = activeReviews.filter(r => r.revenue_range).length;
                                                    const pct   = Math.round((cnt / total) * 100);
                                                    const s     = REVENUE_COLOR[range] || { bg: '#F3F4F6', color: '#6B7280' };
                                                    return (
                                                        <div key={range} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                            <span style={{ fontSize: 12, fontWeight: 700, color: s.color, width: 80, flexShrink: 0 }}>{range}</span>
                                                            <div style={{ flex: 1, height: 8, background: T.border, borderRadius: 4, overflow: 'hidden' }}>
                                                                <div style={{ width: `${pct}%`, height: '100%', background: s.color, borderRadius: 4 }} />
                                                            </div>
                                                            <span style={{ fontSize: 12, color: T.gray, width: 32, textAlign: 'right', flexShrink: 0 }}>{cnt}명</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}

                                    {/* 방문객 연령대 분포 */}
                                    {ageGroupTotal > 0 && (
                                        <>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 8 }}>👥 방문객 연령대</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                                                {Object.entries(ageGroupCount).sort((a, b) => b[1] - a[1]).map(([age, cnt]) => {
                                                    const pct = Math.round((cnt / ageGroupTotal) * 100);
                                                    return (
                                                        <div key={age} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                            <span style={{ fontSize: 12, color: '#7C3AED', fontWeight: 700, width: 36, flexShrink: 0 }}>{age}</span>
                                                            <div style={{ flex: 1, height: 6, background: T.border, borderRadius: 3, overflow: 'hidden' }}>
                                                                <div style={{ width: `${pct}%`, height: '100%', background: '#7C3AED', borderRadius: 3 }} />
                                                            </div>
                                                            <span style={{ fontSize: 12, color: T.gray, width: 32, textAlign: 'right', flexShrink: 0 }}>{pct}%</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}

                                    {/* 방문 유형 분포 */}
                                    {visitorTypeTotal > 0 && (
                                        <>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 8 }}>🧭 방문 유형</div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                                                {Object.entries(visitorTypeCount).sort((a, b) => b[1] - a[1]).map(([type, cnt]) => {
                                                    const pct = Math.round((cnt / visitorTypeTotal) * 100);
                                                    return (
                                                        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 20, background: '#FEF3C7' }}>
                                                            <span style={{ fontSize: 12, fontWeight: 700, color: '#D97706' }}>{type}</span>
                                                            <span style={{ fontSize: 11, color: '#92400E', fontWeight: 600 }}>{pct}%</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}

                                    {/* 주최사별 평가 */}
                                    {Object.values(organizerStats).filter(s => s.reviewCount > 0).length > 0 && (
                                        <>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 8 }}>🏢 주최사별 평가</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                {Object.values(organizerStats).filter(s => s.reviewCount > 0).map(s => {
                                                    const avgE = s.avgEvent / s.count;
                                                    const avgO = s.avgOrg / s.count;
                                                    const c = avgE >= 4.0 ? T.green : avgE >= 3.0 ? T.blue : T.gray;
                                                    return (
                                                        <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: T.bg, borderRadius: 10 }}>
                                                            <div>
                                                                <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{s.name}</div>
                                                                <div style={{ fontSize: 11, color: T.gray, marginTop: 2 }}>리뷰 {s.reviewCount}개</div>
                                                            </div>
                                                            <div style={{ display: 'flex', gap: 14 }}>
                                                                <div style={{ textAlign: 'center' }}>
                                                                    <div style={{ fontSize: 10, color: T.gray }}>행사</div>
                                                                    <div style={{ fontSize: 15, fontWeight: 800, color: c }}>{avgE.toFixed(1)}</div>
                                                                </div>
                                                                <div style={{ textAlign: 'center' }}>
                                                                    <div style={{ fontSize: 10, color: T.gray }}>운영</div>
                                                                    <div style={{ fontSize: 15, fontWeight: 800, color: '#F59E0B' }}>{avgO.toFixed(1)}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>

                        {/* 최신 리뷰 */}
                        <div style={{ background: T.white, borderRadius: 14, border: `1px solid ${T.border}`, padding: '20px' }}>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 14 }}>최신 리뷰</div>
                            {activeReviews.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '20px 0', color: T.gray, fontSize: 13 }}>아직 등록된 리뷰가 없어요.</div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {activeReviews.map(r => <ReviewCard key={r.id} review={r} userPlan={plan} />)}
                                </div>
                            )}
                        </div>

                        <Link href={`/reviews/write?event_id=${event.id}`} style={{ textDecoration: 'none' }}>
                            <div style={{
                                textAlign: 'center', padding: '14px', borderRadius: 12,
                                border: `1.5px dashed ${T.border}`,
                                fontSize: 14, fontWeight: 700, color: T.gray,
                            }}>
                                + 리뷰 작성하기
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
