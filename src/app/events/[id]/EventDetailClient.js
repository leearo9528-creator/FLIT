'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Building2 } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { timeAgo } from '@/lib/helpers';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import ReviewCard from '@/components/ui/ReviewCard';

const REVENUE_COLOR = {
    '100만원 이상': { bg: '#DCFCE7', color: '#16A34A' },
    '50-100만원': { bg: '#DCFCE7', color: '#16A34A' },
    '30-50만원': { bg: '#DBEAFE', color: '#2563EB' },
    '10-30만원': { bg: '#FEF3C7', color: '#D97706' },
    '10만원 미만': { bg: '#FEE2E2', color: '#DC2626' },
};

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
        <Link href={`/recruitments/${rec.id}`} style={{ textDecoration: 'none' }}>
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
        </Link>
    );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function EventDetailClient({ event, instances, initialReviews, initialRecruitments }) {
    const router = useRouter();
    const { user, plan, canViewReviews } = useAuth();
    const canView = !!(user && canViewReviews);
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

    const TABS = [
        { key: 'reviews', label: '리뷰', count: initialReviews.length },
        { key: 'recruit', label: '모집공고', count: initialRecruitments.length },
        { key: 'history', label: '개최이력', count: instances.length },
    ];
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
        if (!acc[name]) acc[name] = { id: inst.organizer.id, name, count: 0, reviewCount: 0, avgEvent: 0, avgOrg: 0 };
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

            {/* ── Hero Header ── */}
            <div style={{
                background: 'linear-gradient(160deg, #1A2A4A 0%, #1B64DA 100%)',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ position: 'absolute', bottom: -60, left: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

                {/* 뒤로가기 */}
                <div style={{ padding: '16px 16px 0', position: 'relative', zIndex: 2 }}>
                    <button onClick={() => router.back()} style={{
                        background: 'rgba(255,255,255,0.15)', border: 'none',
                        borderRadius: T.radiusFull, width: 36, height: 36,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }}>
                        <ChevronLeft size={18} color="#fff" />
                    </button>
                </div>

                <div style={{ padding: '14px 20px 28px', position: 'relative', zIndex: 2 }}>
                    {event.category && (
                        <div style={{
                            display: 'inline-block', padding: '4px 10px', borderRadius: 6,
                            fontSize: 12, fontWeight: 700, background: 'rgba(255,255,255,0.25)', color: '#fff',
                            marginBottom: 10,
                        }}>
                            {event.category}
                        </div>
                    )}
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1.35, marginBottom: 10 }}>
                        {event.name}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {instances[0]?.location && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                                <MapPin size={13} /> {instances[0].location}
                            </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                            <Calendar size={13} /> 총 {event.total_instances || 0}회 개최
                            {event.total_reviews > 0 && <> · 리뷰 {event.total_reviews}개</>}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 대표 사진 ── */}
            {event.image_url && (
                <div style={{ position: 'relative', width: '100%', height: 200 }}>
                    <Image src={event.image_url} alt={event.name} fill style={{ objectFit: 'cover' }} sizes="100vw" />
                </div>
            )}

            {/* ── 탭 바 ── */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 99,
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
                        {tab.label} {tab.count > 0 ? `(${tab.count})` : ''}
                    </div>
                ))}
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
                        <div style={{ background: T.white, borderRadius: 14, border: `1px solid ${T.border}`, padding: '20px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 14 }}>셀러 평가 요약</div>

                            {!canView ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 0' }}>
                                    <div style={{ fontSize: 28 }}>🔒</div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>
                                        {user ? '리뷰 1개 작성하면 볼 수 있어요' : '로그인이 필요해요'}
                                    </div>
                                    <div style={{ fontSize: 12, color: T.gray, textAlign: 'center', lineHeight: 1.6 }}>
                                        {user ? '리뷰를 1개 이상 작성하면\n항목별 평점·매출 분포 등을 확인할 수 있어요' : '로그인 후 리뷰를 작성하면\n셀러 평가 요약을 볼 수 있어요'}
                                    </div>
                                    <a href={user ? '/reviews/write' : '/login'} style={{
                                        fontSize: 12, fontWeight: 700, color: '#fff',
                                        background: T.blue, padding: '8px 20px', borderRadius: 99,
                                        textDecoration: 'none', marginTop: 4,
                                    }}>
                                        {user ? '리뷰 작성하기' : '로그인하기'}
                                    </a>
                                </div>
                            ) : activeReviews.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '20px 0', color: T.gray, fontSize: 13 }}>아직 리뷰가 없어요.</div>
                            ) : (
                                <>
                                    {/* 종합 요약 카드 */}
                                    <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                                        <div style={{ flex: 1, background: T.bg, borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                                            <div style={{ fontSize: 11, color: T.gray, marginBottom: 4 }}>종합 평점</div>
                                            <div style={{ fontSize: 22, fontWeight: 900, color: scoreColor, lineHeight: 1 }}>{activeOverallScore.toFixed(1)}</div>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: 1, marginTop: 4 }}>
                                                {[1,2,3,4,5].map(i => (
                                                    <span key={i} style={{ fontSize: 12, color: i <= Math.round(activeOverallScore) ? '#F59E0B' : '#E5E7EB' }}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, background: T.bg, borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                                            <div style={{ fontSize: 11, color: T.gray, marginBottom: 4 }}>리뷰</div>
                                            <div style={{ fontSize: 22, fontWeight: 900, color: T.text, lineHeight: 1 }}>{activeReviews.length}</div>
                                            <div style={{ fontSize: 11, color: T.gray, marginTop: 4 }}>명 참여</div>
                                        </div>
                                        {(() => {
                                            const topRev = Object.entries(revenueDistribution).sort((a, b) => b[1] - a[1])[0];
                                            return topRev ? (
                                                <div style={{ flex: 1, background: T.bg, borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                                                    <div style={{ fontSize: 11, color: T.gray, marginBottom: 4 }}>최다 매출</div>
                                                    <div style={{ fontSize: 15, fontWeight: 800, color: T.green, lineHeight: 1.2 }}>{topRev[0]}</div>
                                                    <div style={{ fontSize: 11, color: T.gray, marginTop: 4 }}>{topRev[1]}명</div>
                                                </div>
                                            ) : null;
                                        })()}
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
                                    {ageGroupTotal > 0 && (() => {
                                        const AGE_ORDER = ['10대','20대','30대','40대','50대 이상','전 연령층'];
                                        const sorted = AGE_ORDER.filter(a => ageGroupCount[a]);
                                        return (
                                        <>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 8 }}>👥 방문객 연령대</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                                                {sorted.map(age => {
                                                    const cnt = ageGroupCount[age];
                                                    const pct = Math.round((cnt / ageGroupTotal) * 100);
                                                    return (
                                                        <div key={age} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                            <span style={{ fontSize: 12, color: '#7C3AED', fontWeight: 700, width: 56, flexShrink: 0 }}>{age}</span>
                                                            <div style={{ flex: 1, height: 6, background: T.border, borderRadius: 3, overflow: 'hidden' }}>
                                                                <div style={{ width: `${pct}%`, height: '100%', background: '#7C3AED', borderRadius: 3 }} />
                                                            </div>
                                                            <span style={{ fontSize: 12, color: T.gray, width: 32, textAlign: 'right', flexShrink: 0 }}>{pct}%</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                        );
                                    })()}

                                    {/* 방문 유형 분포 */}
                                    {/* 방문 유형 분포 */}
                                    {visitorTypeTotal > 0 && (() => {
                                        const TYPE_ORDER = ['가족 단위 (아이 동반)','커플 / 연인','친구 / 지인','나홀로 방문객 (혼쇼족)','관광객 / 외국인'];
                                        const sorted = TYPE_ORDER.filter(t => visitorTypeCount[t]);
                                        return (
                                        <>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 8 }}>🧭 방문 유형</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                                                {sorted.map(type => {
                                                    const cnt = visitorTypeCount[type];
                                                    const pct = Math.round((cnt / visitorTypeTotal) * 100);
                                                    return (
                                                        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                            <span style={{ fontSize: 11, color: '#D97706', fontWeight: 700, width: 80, flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{type.replace(/ \(.*\)/, '')}</span>
                                                            <div style={{ flex: 1, height: 6, background: T.border, borderRadius: 3, overflow: 'hidden' }}>
                                                                <div style={{ width: `${pct}%`, height: '100%', background: '#D97706', borderRadius: 3 }} />
                                                            </div>
                                                            <span style={{ fontSize: 12, color: T.gray, width: 32, textAlign: 'right', flexShrink: 0 }}>{pct}%</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                        );
                                    })()}

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
                                                        <a key={s.name} href={s.id ? `/organizers/${s.id}` : '#'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: T.bg, borderRadius: 10, cursor: 'pointer' }}>
                                                            <div>
                                                                <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{s.name}</div>
                                                                <div style={{ fontSize: 11, color: T.gray, marginTop: 2 }}>리뷰 {s.reviewCount}개</div>
                                                            </div>
                                                            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                                                                <div style={{ textAlign: 'center' }}>
                                                                    <div style={{ fontSize: 10, color: T.gray }}>행사</div>
                                                                    <div style={{ fontSize: 15, fontWeight: 800, color: c }}>{avgE.toFixed(1)}</div>
                                                                </div>
                                                                <div style={{ textAlign: 'center' }}>
                                                                    <div style={{ fontSize: 10, color: T.gray }}>운영</div>
                                                                    <div style={{ fontSize: 15, fontWeight: 800, color: '#F59E0B' }}>{avgO.toFixed(1)}</div>
                                                                </div>
                                                                <ChevronRight size={14} color={T.gray} />
                                                            </div>
                                                        </a>
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
                                    {activeReviews.map(r => <ReviewCard key={r.id} review={r} canView={!!(user && canViewReviews)} isLoggedIn={!!user} showOrgInfo />)}
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

                {/* ── 개최이력 탭 ── */}
                {activeTab === 'history' && (
                    instances.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>개최 이력이 없어요.</div>
                    ) : (
                        instances.map((inst, i) => {
                            const org = inst.organizer || {};
                            return (
                                <div key={inst.id} style={{
                                    background: T.white, borderRadius: 14,
                                    border: `1px solid ${T.border}`, padding: 16,
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>
                                                {inst.event_date && new Date(inst.event_date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                {inst.event_date_end && inst.event_date_end !== inst.event_date && (
                                                    <> ~ {new Date(inst.event_date_end).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}</>
                                                )}
                                            </div>
                                            {inst.location && (
                                                <div style={{ fontSize: 12, color: T.gray, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <MapPin size={12} /> {inst.location}
                                                </div>
                                            )}
                                        </div>
                                        {inst.review_count > 0 && (
                                            <span style={{ fontSize: 11, fontWeight: 700, color: T.blue, background: T.blueLt, padding: '3px 8px', borderRadius: 6 }}>
                                                리뷰 {inst.review_count}개
                                            </span>
                                        )}
                                    </div>
                                    {org.name && (
                                        <Link href={`/organizers/${org.id}`} style={{ textDecoration: 'none' }}>
                                            <div style={{ fontSize: 12, color: T.blue, fontWeight: 600 }}>🏢 {org.name} →</div>
                                        </Link>
                                    )}
                                </div>
                            );
                        })
                    )
                )}
            </div>
        </div>
    );
}
