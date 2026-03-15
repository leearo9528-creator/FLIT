'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';

function StarDisplay({ value }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {[1,2,3,4,5].map(s => (
                <Star
                    key={s}
                    size={13}
                    fill={s <= value ? '#FFB800' : 'none'}
                    color={s <= value ? '#FFB800' : T.border}
                    strokeWidth={1.5}
                />
            ))}
            <span style={{ fontSize: 13, fontWeight: 700, color: '#FFB800', marginLeft: 4 }}>
                {value?.toFixed(1) || '-'}
            </span>
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
            .from('company_reviews')
            .select('*, event:events(name, location), organizer:organizers(name)')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        if (data) setReviews(data);
        setFetching(false);
    }

    const handleDelete = async (id) => {
        if (!window.confirm('리뷰를 삭제할까요?')) return;
        const sb = createClient();
        const { error } = await sb.from('company_reviews').delete().eq('id', id);
        if (!error) setReviews(prev => prev.filter(r => r.id !== id));
    };

    if (loading || fetching) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray }}>로딩 중...</div>
        </div>
    );

    const avgRating = reviews.length
        ? (reviews.reduce((s, r) => s + (r.rating_profit + r.rating_traffic) / 2, 0) / reviews.length).toFixed(1)
        : null;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="내가 쓴 리뷰" back />

            {/* 요약 */}
            {reviews.length > 0 && (
                <div style={{
                    background: T.white, padding: '20px',
                    borderBottom: `1px solid ${T.border}`,
                    display: 'flex', alignItems: 'center', gap: 20,
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 28, fontWeight: 900, color: T.text }}>{reviews.length}</div>
                        <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>총 리뷰</div>
                    </div>
                    <div style={{ width: 1, height: 36, background: T.border }} />
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 28, fontWeight: 900, color: '#FFB800' }}>{avgRating}</div>
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
                        style={{
                            background: T.blue, color: '#fff',
                            padding: '10px 24px', borderRadius: T.radiusFull,
                            fontSize: 14, fontWeight: 700, cursor: 'pointer',
                        }}
                    >
                        리뷰 작성하기
                    </div>
                </div>
            ) : (
                <div style={{ background: T.white }}>
                    {reviews.map((review, i) => {
                        const avgScore = ((review.rating_profit ?? 0) + (review.rating_traffic ?? 0)) / 2;
                        return (
                            <div
                                key={review.id}
                                style={{
                                    padding: '18px 20px',
                                    borderBottom: i < reviews.length - 1 ? `1px solid ${T.border}` : 'none',
                                }}
                            >
                                {/* 상단: 행사명 + 삭제 */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 2 }}>
                                            {review.event?.name || '행사 정보 없음'}
                                        </div>
                                        {review.event?.location && (
                                            <div style={{ fontSize: 12, color: T.gray }}>📍 {review.event.location}</div>
                                        )}
                                    </div>
                                    <span
                                        onClick={() => handleDelete(review.id)}
                                        style={{ fontSize: 12, color: T.gray, cursor: 'pointer', flexShrink: 0, marginLeft: 12 }}
                                    >
                                        삭제
                                    </span>
                                </div>

                                {/* 별점 */}
                                <div style={{ marginBottom: 8 }}>
                                    <StarDisplay value={avgScore} />
                                </div>

                                {/* 상세 평점 칩 */}
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                                    {review.rating_profit && (
                                        <span style={{ fontSize: 11, color: T.blue, background: T.blueLt, padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                                            수익성 {review.rating_profit}점
                                        </span>
                                    )}
                                    {review.rating_traffic && (
                                        <span style={{ fontSize: 11, color: T.green, background: T.greenLt, padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                                            집객력 {review.rating_traffic}점
                                        </span>
                                    )}
                                    {review.seller_type && (
                                        <span style={{ fontSize: 11, color: T.gray, background: T.grayLt, padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                                            {review.seller_type === 'foodtruck' ? '🚚 푸드트럭' : '💎 일반셀러'}
                                        </span>
                                    )}
                                </div>

                                {/* 장점 */}
                                {review.pros && (
                                    <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.5, marginBottom: 4 }}>
                                        <span style={{ fontWeight: 700, color: T.green }}>👍 </span>{review.pros}
                                    </div>
                                )}
                                {review.cons && (
                                    <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.5 }}>
                                        <span style={{ fontWeight: 700, color: T.red }}>👎 </span>{review.cons}
                                    </div>
                                )}

                                {/* 날짜 */}
                                <div style={{ fontSize: 12, color: T.gray, marginTop: 10 }}>
                                    {new Date(review.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
