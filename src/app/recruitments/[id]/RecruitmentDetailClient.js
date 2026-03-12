'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { T } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function RecruitmentDetailClient({ recruitment }) {
    const router = useRouter();
    const organizer = recruitment.organizer;
    const event = recruitment.event;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title="공고 상세" hasBack onBack={() => router.back()} />

            <div className="page-padding" style={{ paddingTop: 20 }}>
                {/* 주최측 정보 띠배너 */}
                {organizer && (
                <Link href={`/organizers/${organizer.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ 
                        background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, 
                        padding: 16, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 
                    }}>
                        <div style={{ width: 48, height: 48, borderRadius: 8, background: T.bg, flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                            {organizer.logo_url ? <img src={organizer.logo_url} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '🏢'}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, color: T.gray, marginBottom: 2 }}>주최측</div>
                            <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>{organizer.name}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 13, color: T.text, fontWeight: 700 }}>운영지원 ⭐ {Number(organizer.average_support || 0).toFixed(1)}</div>
                            <div style={{ fontSize: 12, color: T.blue }}>리뷰 {organizer.total_reviews || 0}개 &gt;</div>
                        </div>
                    </div>
                </Link>
                )}

                {/* 공고 본문 카드 */}
                <Card>
                    <div style={{
                        padding: '4px 8px', borderRadius: 4, display: 'inline-block',
                        background: recruitment.status === 'OPEN' ? T.blueLt : T.border,
                        color: recruitment.status === 'OPEN' ? T.blue : T.gray,
                        fontSize: 12, fontWeight: 700, marginBottom: 12
                    }}>
                        {recruitment.status === 'OPEN' ? '모집중' : '마감됨'}
                    </div>

                    <div style={{ fontSize: 22, fontWeight: 900, color: T.text, lineHeight: 1.4, marginBottom: 16 }}>
                        {recruitment.title}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: T.bg, padding: 16, borderRadius: 12, marginBottom: 24 }}>
                        {event && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: T.gray, fontSize: 14 }}>장소 정보</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{event.location}</span>
                                <Link href={`/events/${event.id}`} style={{ fontSize: 12, color: T.blue, textDecoration: 'none', background: T.blueLt, padding: '4px 8px', borderRadius: 4, fontWeight: 700 }}>
                                    매출/집객 리뷰 보기 &gt;
                                </Link>
                            </div>
                        </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: T.gray, fontSize: 14 }}>행사 일자</span>
                            <span style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{new Date(recruitment.event_date).toLocaleDateString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: T.gray, fontSize: 14 }}>모집 기간</span>
                            <span style={{ fontWeight: 700, fontSize: 14, color: T.red }}>
                                ~ {new Date(recruitment.end_date).toLocaleDateString()} 까지
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: T.gray, fontSize: 14 }}>참가비</span>
                            <span style={{ fontWeight: 700, fontSize: 14, color: T.text }}>
                                {recruitment.fee === 0 ? '무료' : `${recruitment.fee.toLocaleString()}원`}
                            </span>
                        </div>
                    </div>

                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: T.text }}>상세 모집 요강</div>
                    <div style={{ fontSize: 15, color: T.text, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                        {recruitment.content}
                    </div>
                </Card>
            </div>

            {/* 하단 고정 버튼 */}
            <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px 20px',
                background: T.white, borderTop: `1px solid ${T.border}`,
                display: 'flex', gap: 12, zIndex: 100
            }}>
                <div style={{
                    width: 56, height: 56, borderRadius: 12, border: `1px solid ${T.border}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer'
                }}>
                    <span style={{ fontSize: 20 }}>⭐</span>
                    <span style={{ fontSize: 10, color: T.gray, fontWeight: 600, marginTop: 2 }}>스크랩</span>
                </div>
                <div style={{
                    flex: 1, height: 56, borderRadius: 12,
                    background: recruitment.status === 'OPEN' ? T.blue : T.gray,
                    color: T.white, fontSize: 16, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: recruitment.status === 'OPEN' ? 'pointer' : 'default'
                }}>
                    {recruitment.status === 'OPEN' ? '이 공고 지원하기' : '마감된 공고입니다'}
                </div>
            </div>
        </div>
    );
}
