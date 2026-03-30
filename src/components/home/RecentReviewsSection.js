'use client';

import Link from 'next/link';
import { T } from '@/lib/design-tokens';
import { timeAgo } from '@/lib/helpers';

function ReviewPreviewCard({ review }) {
    const inst = review.event_instance || {};
    const ev   = inst.base_event || {};
    const isFoodtruck = review.seller_type === 'foodtruck';

    const allScores = [review.rating_profit, review.rating_traffic, review.rating_promotion, review.rating_support, review.rating_manners].filter(v => v != null);
    const overall   = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
    const sColor    = overall >= 4.0 ? T.green : overall >= 3.0 ? T.blue : T.gray;
    const scoreLabel = overall >= 4.0 ? '좋음' : overall >= 3.0 ? '보통' : '아쉬움';
    const isRecent  = (Date.now() - new Date(review.created_at)) < 86400000;

    return (
        <Link href={ev.id ? `/events/${ev.id}` : '#'} style={{ textDecoration: 'none' }}>
            <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: '14px 16px',
                border: `1px solid ${T.border}`,
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {isRecent && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 700, color: '#EF4444' }}>
                                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
                                실시간
                            </span>
                        )}
                        <span style={{ fontSize: 11, color: T.gray }}>{isFoodtruck ? '🚚 푸드트럭' : '🛍️ 셀러'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                        <span style={{ fontSize: 16, fontWeight: 900, color: sColor }}>{overall.toFixed(1)}</span>
                        <span style={{ fontSize: 11, color: T.gray }}>{scoreLabel}</span>
                    </div>
                </div>

                <div style={{
                    fontSize: 15, fontWeight: 800, color: T.text, lineHeight: 1.4, marginBottom: 6,
                    display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                    {ev.name || '행사명 없음'}
                </div>

                {review.content && (
                    <div style={{
                        fontSize: 12, color: T.textSub, lineHeight: 1.6,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                        &ldquo;{review.content}&rdquo;
                    </div>
                )}

                <div style={{ fontSize: 11, color: T.gray, marginTop: 6 }}>{timeAgo(review.created_at)}</div>
            </div>
        </Link>
    );
}

export default function RecentReviewsSection({ reviews }) {
    return (
        <div style={{ marginBottom: 24 }}>
            <div style={{
                padding: '0 16px 10px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>💬 실시간 리뷰</div>
                <Link href="/search?tab=reviews" style={{ fontSize: 13, color: T.blue, fontWeight: 600, textDecoration: 'none' }}>전체보기 →</Link>
            </div>
            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {reviews.length === 0
                    ? <div style={{ textAlign: 'center', padding: '24px 0', color: T.gray, fontSize: 14 }}>아직 리뷰가 없어요.</div>
                    : reviews.map(r => <ReviewPreviewCard key={r.id} review={r} />)
                }
            </div>
        </div>
    );
}
