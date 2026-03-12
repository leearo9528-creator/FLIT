'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { T } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function OrganizerDetailClient({ organizer, initialRecruitments, initialReviews }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('recruitments'); 

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title={organizer.name} hasBack onBack={() => router.back()} />

            <div style={{ background: T.white, borderBottom: `1px solid ${T.border}`, padding: '24px 20px', marginBottom: 8 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                     <div style={{ 
                         width: 72, height: 72, borderRadius: 16, background: T.border,
                         display: 'flex', alignItems: 'center', justifyContent: 'center',
                         fontSize: 28, overflow: 'hidden', flexShrink: 0
                     }}>
                         {organizer.logo_url ? (
                             <img src={organizer.logo_url} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                         ) : '🏢'}
                     </div>
                     <div>
                         <div style={{ fontSize: 24, fontWeight: 900, color: T.text, lineHeight: 1.3, marginBottom: 4 }}>
                             {organizer.name}
                         </div>
                         <div style={{ fontSize: 13, color: T.gray }}>
                             행사 기획 / 주최
                         </div>
                     </div>
                </div>

                <div style={{ display: 'flex', background: T.bg, borderRadius: 12, padding: 16, gap: 16 }}>
                    <div style={{ flex: 1, textAlign: 'center', borderRight: `1px solid ${T.border}` }}>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 4 }}>운영 지원</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#FF9800' }}>
                            <span style={{ fontSize: 16 }}>⭐</span> {Number(organizer.average_support || 0).toFixed(1)}
                        </div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', borderRight: `1px solid ${T.border}` }}>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 4 }}>주최측 매너</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#E91E63' }}>
                            <span style={{ fontSize: 16 }}>⭐</span> {Number(organizer.average_manners || 0).toFixed(1)}
                        </div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 4 }}>셀러 리뷰</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: T.text }}>
                            {organizer.total_reviews || 0}개
                        </div>
                    </div>
                </div>
                
                {organizer.description && (
                   <div style={{ marginTop: 24, fontSize: 15, color: T.text, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                       {organizer.description}
                   </div>
                )}
            </div>

            <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}`, background: T.white }}>
                <div 
                    onClick={() => setActiveTab('recruitments')}
                    style={{ 
                        flex: 1, textAlign: 'center', padding: '16px 0', fontSize: 15, fontWeight: activeTab === 'recruitments' ? 700 : 500,
                        color: activeTab === 'recruitments' ? T.text : T.gray, cursor: 'pointer',
                        borderBottom: activeTab === 'recruitments' ? `2px solid ${T.text}` : '2px solid transparent',
                        transition: 'all 0.2s'
                    }}
                >
                    진행 공고 <span style={{ color: T.blue, fontWeight: 800 }}>{initialRecruitments.length}</span>
                </div>
                <div 
                    onClick={() => setActiveTab('reviews')}
                    style={{ 
                        flex: 1, textAlign: 'center', padding: '16px 0', fontSize: 15, fontWeight: activeTab === 'reviews' ? 700 : 500,
                        color: activeTab === 'reviews' ? T.text : T.gray, cursor: 'pointer',
                        borderBottom: activeTab === 'reviews' ? `2px solid ${T.text}` : '2px solid transparent',
                        transition: 'all 0.2s'
                    }}
                >
                    셀러 리뷰
                </div>
            </div>

            <div style={{ padding: '24px 20px', minHeight: 400 }}>
                {activeTab === 'recruitments' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {initialRecruitments.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: T.gray, fontSize: 15 }}>
                                현재 이 주최측에서 진행 중인 공고가 없습니다.
                            </div>
                        ) : (
                            initialRecruitments.map(rec => (
                                <Link href={`/recruitments/${rec.id}`} key={rec.id} style={{ textDecoration: 'none' }}>
                                    <Card padding={16} style={{ border: `1px solid ${T.border}`, boxShadow: 'none' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{
                                                padding: '4px 8px', borderRadius: 4,
                                                background: rec.status === 'OPEN' ? T.blueLt : T.border,
                                                color: rec.status === 'OPEN' ? T.blue : T.gray,
                                                fontSize: 11, fontWeight: 700, marginBottom: 8
                                            }}>
                                                {rec.status === 'OPEN' ? '모집중' : '마감됨'}
                                            </div>
                                            <div style={{ fontSize: 13, color: T.gray }}>
                                                마감 {new Date(rec.end_date).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 8, lineHeight: 1.4 }}>
                                            {rec.title}
                                        </div>
                                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 12 }}>
                                            📍 {rec.event?.location || '장소 미정'} | {rec.event?.name}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>
                                                {rec.fee === 0 ? '무료' : `${rec.fee.toLocaleString()}원`}
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))
                        )}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {initialReviews.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: T.gray, fontSize: 15 }}>
                                아직 등록된 리뷰가 없습니다.<br/>
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
                                                <span style={{ color: T.gray }}>지원</span> 
                                                <span style={{ fontWeight: 800 }}>⭐ {review.rating_support}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <span style={{ color: T.gray }}>매너</span> 
                                                <span style={{ fontWeight: 800 }}>⭐ {review.rating_manners}</span>
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
                )}
            </div>
        </div>
    );
}
