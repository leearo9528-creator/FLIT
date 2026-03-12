'use client';

import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';

export default function EventDetailClient({ event, initialReviews }) {
    const router = useRouter();

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title={event.name} hasBack onBack={() => router.back()} />

            <div style={{ background: T.white, borderBottom: `1px solid ${T.border}`, padding: '24px 20px', marginBottom: 8 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                     <div style={{ 
                         width: 72, height: 72, borderRadius: 16, background: T.border,
                         display: 'flex', alignItems: 'center', justifyContent: 'center',
                         fontSize: 28, overflow: 'hidden', flexShrink: 0
                     }}>
                         📍
                     </div>
                     <div>
                         <div style={{ fontSize: 24, fontWeight: 900, color: T.text, lineHeight: 1.3, marginBottom: 4 }}>
                             {event.name}
                         </div>
                         <div style={{ fontSize: 13, color: T.gray }}>
                             {event.location} · {event.category}
                         </div>
                     </div>
                </div>

                <div style={{ display: 'flex', background: T.bg, borderRadius: 12, padding: 16, gap: 16 }}>
                    <div style={{ flex: 1, textAlign: 'center', borderRight: `1px solid ${T.border}` }}>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 4 }}>수익성 (매출)</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: T.green }}>
                            <span style={{ fontSize: 16 }}>⭐</span> {Number(event.average_profit || 0).toFixed(1)}
                        </div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', borderRight: `1px solid ${T.border}` }}>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 4 }}>집객력 (유동인구)</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: T.blue }}>
                            <span style={{ fontSize: 16 }}>⭐</span> {Number(event.average_traffic || 0).toFixed(1)}
                        </div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 4 }}>셀러 리뷰</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: T.text }}>
                            {event.total_reviews || 0}개
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '24px 20px', minHeight: 400 }}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, color: T.text }}>행사 리뷰 ({initialReviews.length})</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {initialReviews.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: T.gray, fontSize: 15 }}>
                            아직 등록된 행사 리뷰가 없습니다.<br/>
                        </div>
                    ) : (
                        initialReviews.map(review => (
                            <div key={review.id} style={{ background: T.white, padding: 20, borderRadius: 12, border: `1px solid ${T.border}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
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
                                               {review.is_verified ? '✅ 인증된 셀러' : '셀러'}
                                            </div>
                                            <div style={{ fontSize: 12, color: T.gray }}>
                                                {new Date(review.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={{ background: T.bg, padding: 12, borderRadius: 8, marginBottom: 16 }}>
                                    <div style={{ display: 'flex', gap: 24, fontSize: 13 }}>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <span style={{ color: T.gray }}>수익성</span> 
                                            <span style={{ fontWeight: 800, color: T.green }}>⭐ {review.rating_profit}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <span style={{ color: T.gray }}>집객력</span> 
                                            <span style={{ fontWeight: 800, color: T.blue }}>⭐ {review.rating_traffic}</span>
                                        </div>
                                    </div>
                                </div>

                                {review.title && <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>"{review.title}"</div>}
                                
                                <div style={{ fontSize: 14, color: T.text, lineHeight: 1.5 }}>
                                    {review.pros && (
                                        <div style={{ display: 'flex', gap: 6, marginBottom: 8, background: T.blueLt, padding: 12, borderRadius: 8 }}>
                                            <span style={{ color: T.blue, fontWeight: 700, flexShrink: 0 }}>장점</span>
                                            <span style={{ whiteSpace: 'pre-wrap' }}>{review.pros}</span>
                                        </div>
                                    )}
                                    {review.cons && (
                                        <div style={{ display: 'flex', gap: 6, marginBottom: 8, background: T.redLt, padding: 12, borderRadius: 8 }}>
                                            <span style={{ color: T.red, fontWeight: 700, flexShrink: 0 }}>단점</span>
                                            <span style={{ whiteSpace: 'pre-wrap' }}>{review.cons}</span>
                                        </div>
                                    )}
                                    {review.content && (
                                         <div style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{review.content}</div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
