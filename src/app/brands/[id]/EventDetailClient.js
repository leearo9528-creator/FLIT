'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';

export default function EventDetailClient({ event, initialReviews }) {
    const router = useRouter();
    const [reviews] = useState(initialReviews);

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            {/* 상단바 */}
            <TopBar title={event.name} hasBack onBack={() => router.back()} />

            {/* 행사 기본 정보 카드 */}
            <div style={{ background: T.white, borderBottom: `1px solid ${T.border}`, padding: '24px 20px', marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{
                        padding: '4px 8px', borderRadius: 4,
                        background: event.recruitment_type === '플리마켓' ? T.blueLt : T.greenLt,
                        color: event.recruitment_type === '플리마켓' ? T.blue : T.green,
                        fontSize: 12, fontWeight: 700
                    }}>
                        {event.recruitment_type}
                    </div>
                </div>

                <div style={{ fontSize: 24, fontWeight: 900, color: T.text, lineHeight: 1.3, marginBottom: 8 }}>
                    {event.name}
                </div>

                <div style={{ fontSize: 15, color: T.gray, marginBottom: 16 }}>
                    📍 {event.location_sido} {event.location_sigungu} {event.location_detail || ''}
                </div>

                {/* 요약 박스 */}
                <div style={{ display: 'flex', background: T.bg, borderRadius: 12, padding: 16, gap: 16 }}>
                    <div style={{ flex: 1, textAlign: 'center', borderRight: `1px solid ${T.border}` }}>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 4 }}>행사 기간</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>
                            {event.event_period || '미정/상시'}
                        </div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 4 }}>참가비</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>
                            {event.participation_fee ? `${event.participation_fee}원` : '무료/미정'}
                        </div>
                    </div>
                </div>
                
                {event.detailed_description && (
                   <div style={{ marginTop: 24, fontSize: 15, color: T.text, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                       {event.detailed_description}
                   </div>
                )}
            </div>

            {/* 리뷰 섹션 */}
            <div style={{ background: T.white, padding: '24px 20px', minHeight: 400 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: T.text }}>
                        셀러 리뷰 <span style={{ color: T.blue }}>{reviews.length}</span>
                    </div>
                    
                    {/* 리뷰 평균 요약 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 20 }}>⭐</span>
                        <span style={{ fontSize: 20, fontWeight: 900 }}>{event.avg_rating || '0.0'}</span>
                    </div>
                </div>

                {reviews.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: T.gray, fontSize: 15 }}>
                        아직 등록된 리뷰가 없습니다.<br/>
                        <span style={{ fontSize: 13, marginTop: 8, display: 'inline-block' }}>화면 우측 하단의 ✏️ 버튼을 통해 첫 번째 리뷰를 남겨주세요! 🎉</span>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {reviews.map(review => (
                            <div key={review.id} style={{ borderBottom: `1px solid ${T.border}`, paddingBottom: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{
                                            width: 32, height: 32, borderRadius: '50%', background: T.border,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 14, color: T.gray, fontWeight: 700
                                        }}>
                                            익명
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>
                                               ⭐ {review.overall_rating || review.rating || '5.0'}
                                            </div>
                                            <div style={{ fontSize: 12, color: T.gray }}>
                                                {new Date(review.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={{ fontSize: 15, color: T.text, lineHeight: 1.5 }}>
                                    {review.pros && (
                                        <div style={{ display: 'flex', gap: 6, marginBottom: 8, background: T.blueLt, padding: 12, borderRadius: 8 }}>
                                            <span style={{ color: T.blue, fontWeight: 700, flexShrink: 0 }}>장점</span>
                                            <span>{review.pros}</span>
                                        </div>
                                    )}
                                    {review.cons && (
                                        <div style={{ display: 'flex', gap: 6, marginBottom: 8, background: T.redLt, padding: 12, borderRadius: 8 }}>
                                            <span style={{ color: T.red, fontWeight: 700, flexShrink: 0 }}>단점</span>
                                            <span>{review.cons}</span>
                                        </div>
                                    )}
                                    {review.tips && (
                                        <div style={{ display: 'flex', gap: 6, background: T.greenLt, padding: 12, borderRadius: 8 }}>
                                            <span style={{ color: T.green, fontWeight: 700, flexShrink: 0 }}>꿀팁</span>
                                            <span>{review.tips}</span>
                                        </div>
                                    )}
                                    {(!review.pros && !review.cons && !review.tips && review.content) && (
                                         <div style={{ marginTop: 8 }}>{review.content}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
        </div>
    );
}
