'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { T } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function RecruitmentDetailClient({ recruitment }) {
    const router = useRouter();
    const brand = recruitment.brand;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title="공고 상세" hasBack onBack={() => router.back()} />

            <div className="page-padding" style={{ paddingTop: 20 }}>
                {/* 주최측(브랜드) 정보 미니 배너 */}
                <Link href={`/brands/${brand.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ 
                        background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, 
                        padding: 16, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 
                    }}>
                        <div style={{ width: 48, height: 48, borderRadius: 8, background: T.bg, flexShrink: 0, overflow: 'hidden' }}>
                            {brand.logo_url ? <img src={brand.logo_url} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '🏢'}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, color: T.gray, marginBottom: 2 }}>주최측</div>
                            <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>{brand.name}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 13, color: T.text, fontWeight: 700 }}>⭐ {Number(brand.average_rating || 0).toFixed(1)}</div>
                            <div style={{ fontSize: 12, color: T.blue }}>리뷰 {brand.total_reviews || 0}개 &gt;</div>
                        </div>
                    </div>
                </Link>

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
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: T.gray, fontSize: 14 }}>장소</span>
                            <span style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{recruitment.location}</span>
                        </div>
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
