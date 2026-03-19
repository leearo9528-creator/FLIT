'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { timeAgo } from '@/lib/helpers';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
import Link from 'next/link';

const REVENUE_COLOR = {
    '100만원 이상': { bg: '#DCFCE7', color: '#16A34A' },
    '50-100만원':   { bg: '#DCFCE7', color: '#16A34A' },
    '30-50만원':    { bg: '#DBEAFE', color: '#2563EB' },
    '10-30만원':    { bg: '#FEF3C7', color: '#D97706' },
    '10만원 미만':  { bg: '#FEE2E2', color: '#DC2626' },
};

function Stars({ value }) {
    return (
        <div style={{ display: 'flex', gap: 1 }}>
            {[1,2,3,4,5].map(i => (
                <span key={i} style={{ fontSize: 13, color: i <= value ? '#F59E0B' : '#E5E7EB' }}>★</span>
            ))}
        </div>
    );
}

function MiniRating({ label, value }) {
    if (value == null) return null;
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 11, color: T.gray, flexShrink: 0 }}>{label}</span>
            <Stars value={value} />
            <span style={{ fontSize: 11, fontWeight: 700, color: T.text }}>{value}</span>
        </div>
    );
}

export default function MyReviewsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [reviews, setReviews] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loading && !user) { router.replace('/login'); return; }
        if (user) fetchReviews();
    }, [user, loading]);

    async function fetchReviews() {
        const sb = createClient();
        const { data } = await sb
            .from('reviews')
            .select(`
                id, seller_type, is_verified, created_at,
                rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion,
                revenue_range, age_groups, visitor_types, pros, cons, content,
                event_instance:event_instances(
                    id, location, event_date,
                    base_event:base_events(id, name),
                    organizer:organizers(name)
                )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        if (data) setReviews(data);
        setFetching(false);
    }

    const handleDelete = async (id) => {
        if (!window.confirm('리뷰를 삭제할까요?')) return;
        const sb = createClient();
        const { error } = await sb.from('reviews').delete().eq('id', id);
        if (!error) setReviews(prev => prev.filter(r => r.id !== id));
    };

    if (loading || fetching) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray }}>로딩 중...</div>
        </div>
    );

    const allScoresList = reviews.map(r =>
        [r.rating_profit, r.rating_traffic, r.rating_support, r.rating_manners, r.rating_promotion]
            .filter(v => v != null)
    );
    const avgRating = reviews.length
        ? (allScoresList.reduce((sum, scores) => {
            if (scores.length === 0) return sum;
            return sum + scores.reduce((a, b) => a + b, 0) / scores.length;
        }, 0) / reviews.length).toFixed(1)
        : null;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="내가 쓴 리뷰" back />

            {/* 요약 */}
            {reviews.length > 0 && (
                <div style={{
                    background: T.white, padding: '16px 20px',
                    borderBottom: `1px solid ${T.border}`,
                    display: 'flex', alignItems: 'center', gap: 24,
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 26, fontWeight: 900, color: T.text }}>{reviews.length}</div>
                        <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>총 리뷰</div>
                    </div>
                    <div style={{ width: 1, height: 32, background: T.border }} />
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 26, fontWeight: 900, color: '#F59E0B' }}>{avgRating}</div>
                        <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>평균 평점</div>
                    </div>
                </div>
            )}

            {reviews.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 20px', color: T.gray }}>
                    <div style={{ fontSize: 44, marginBottom: 12, opacity: 0.4 }}>✏️</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 6 }}>아직 작성한 리뷰가 없어요</div>
                    <div style={{ fontSize: 13, color: T.gray, marginBottom: 24 }}>행사 참가 후 솔직한 후기를 남겨보세요</div>
                    <div
                        onClick={() => router.push('/reviews/write')}
                        style={{ background: T.blue, color: '#fff', padding: '10px 24px', borderRadius: T.radiusFull, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
                    >
                        리뷰 작성하기
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '12px 16px' }}>
                    {reviews.map(review => {
                        const inst = review.event_instance || {};
                        const ev   = inst.base_event || {};
                        const org  = inst.organizer || {};
                        const isFoodtruck = review.seller_type === 'foodtruck';
                        const scores = [review.rating_profit, review.rating_traffic, review.rating_support, review.rating_manners, review.rating_promotion].filter(v => v != null);
                        const overall = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
                        const prosChips = review.pros ? review.pros.split('\n').map(s => s.trim()).filter(Boolean) : [];
                        const consChips = review.cons ? review.cons.split('\n').map(s => s.trim()).filter(Boolean) : [];
                        const ageGroups    = Array.isArray(review.age_groups)    ? review.age_groups    : [];
                        const visitorTypes = Array.isArray(review.visitor_types) ? review.visitor_types : [];
                        const revStyle = REVENUE_COLOR[review.revenue_range] || { bg: '#F3F4F6', color: '#6B7280' };

                        return (
                            <div key={review.id} style={{
                                background: T.white, borderRadius: 14,
                                border: `1px solid ${T.border}`, padding: '16px',
                                boxShadow: T.shadowSm,
                            }}>
                                {/* 행사명 */}
                                {ev.id && (
                                    <Link href={`/events/${ev.id}`} style={{ textDecoration: 'none' }}>
                                        <div style={{ fontSize: 14, fontWeight: 800, color: T.blue, marginBottom: 6 }}>
                                            🎪 {ev.name || '행사명 없음'}
                                            {inst.event_date && (
                                                <span style={{ fontWeight: 400, color: T.gray, marginLeft: 6, fontSize: 12 }}>
                                                    {new Date(inst.event_date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                )}

                                {/* 헤더: 셀러 유형 + 종합 점수 */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        <span style={{
                                            fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4,
                                            background: isFoodtruck ? T.greenLt : T.blueLt,
                                            color: isFoodtruck ? T.green : T.blue,
                                        }}>
                                            {isFoodtruck ? '🚚 푸드트럭' : '🛍️ 일반 셀러'}
                                        </span>
                                        {review.is_verified && (
                                            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: T.greenLt, color: T.green }}>✅ 인증</span>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <Stars value={Math.round(overall)} />
                                        <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{overall.toFixed(1)}</span>
                                    </div>
                                </div>

                                <div style={{ height: 1, background: T.border, margin: '8px 0' }} />

                                {/* 매출 */}
                                {review.revenue_range && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                        <span style={{ fontSize: 12, color: T.gray }}>💰 매출</span>
                                        <span style={{ fontSize: 12, fontWeight: 800, padding: '3px 10px', borderRadius: 20, background: revStyle.bg, color: revStyle.color }}>
                                            {review.revenue_range}
                                        </span>
                                    </div>
                                )}

                                {/* 항목별 평점 (2열) */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 12px', marginBottom: 8 }}>
                                    {review.rating_profit    != null && <MiniRating label={isFoodtruck ? '수익성' : '구매력'} value={review.rating_profit} />}
                                    {review.rating_support   != null && <MiniRating label="운영지원" value={review.rating_support} />}
                                    {review.rating_traffic   != null && <MiniRating label="유동인구" value={review.rating_traffic} />}
                                    {review.rating_manners   != null && <MiniRating label="주최매너" value={review.rating_manners} />}
                                    {review.rating_promotion != null && <MiniRating label="홍보"     value={review.rating_promotion} />}
                                </div>

                                {/* 방문객 */}
                                {(ageGroups.length > 0 || visitorTypes.length > 0) && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                                        <span style={{ fontSize: 11, color: T.gray }}>👥</span>
                                        {ageGroups.map(a => (
                                            <span key={a} style={{ fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 20, background: '#EDE9FE', color: '#7C3AED' }}>{a}</span>
                                        ))}
                                        {visitorTypes.map(v => (
                                            <span key={v} style={{ fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 20, background: '#FEF3C7', color: '#D97706' }}>{v}</span>
                                        ))}
                                    </div>
                                )}

                                {/* 장단점 */}
                                {(prosChips.length > 0 || consChips.length > 0) && (
                                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                                        {prosChips.map(c => <span key={c} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: T.greenLt, color: T.green, fontWeight: 600 }}>👍 {c}</span>)}
                                        {consChips.map(c => <span key={c} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: '#FEE2E2', color: '#EF4444', fontWeight: 600 }}>👎 {c}</span>)}
                                    </div>
                                )}

                                {/* 종합 평가 */}
                                {review.content && (
                                    <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.6, marginBottom: 8 }}>
                                        {review.content}
                                    </div>
                                )}

                                {/* 주최사 + 날짜 + 삭제 */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                                    <div style={{ fontSize: 11, color: T.gray }}>
                                        {org.name && <span>🏢 {org.name} · </span>}
                                        {timeAgo(review.created_at)}
                                    </div>
                                    <span
                                        onClick={() => handleDelete(review.id)}
                                        style={{ fontSize: 12, color: T.gray, cursor: 'pointer' }}
                                    >
                                        삭제
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
