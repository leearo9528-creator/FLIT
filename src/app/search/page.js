'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { T } from '@/lib/design-tokens';
import Card from '@/components/ui/Card';

export default function SearchPage() {
    const [activeTab, setActiveTab] = useState('recruitments'); // 'recruitments' | 'brands'
    const [query, setQuery] = useState('');
    const [recruitments, setRecruitments] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { createClient } = await import('@/utils/supabase/client');
            const sb = createClient();
            
            // 공고 목록 (브랜드 정보 Join)
            const { data: recData } = await sb.from('recruitments')
                .select(`*, brand:brands(name, category, logo_url)`)
                .order('created_at', { ascending: false });
            
            // 브랜드 목록
            const { data: brdData } = await sb.from('brands')
                .select('*')
                .order('average_rating', { ascending: false });

            if (recData) setRecruitments(recData);
            if (brdData) setBrands(brdData);
            
            setLoading(false);
        };
        fetchData();
    }, []);

    const filteredRecruitments = recruitments.filter(r => {
        if (!query.trim()) return true;
        const lowerQ = query.toLowerCase();
        return (
            (r.title || '').toLowerCase().includes(lowerQ) ||
            (r.location || '').toLowerCase().includes(lowerQ) ||
            (r.brand?.name || '').toLowerCase().includes(lowerQ)
        );
    });

    const filteredBrands = brands.filter(b => {
        if (!query.trim()) return true;
        const lowerQ = query.toLowerCase();
        return (
            (b.name || '').toLowerCase().includes(lowerQ) ||
            (b.category || '').toLowerCase().includes(lowerQ)
        );
    });

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            {/* 상단 헤더 영역 */}
            <div style={{
                padding: '24px 20px', background: T.white,
                borderBottom: `1px solid ${T.border}`,
                position: 'sticky', top: 0, zIndex: 10
            }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: T.text, letterSpacing: -0.5, marginBottom: 12 }}>
                    마켓 찾기
                </div>
                
                {/* 검색 바 */}
                <div style={{
                    display: 'flex', alignItems: 'center', background: T.border,
                    borderRadius: 8, padding: '12px 16px'
                }}>
                    <span style={{ fontSize: 16, marginRight: 8 }}>🔍</span>
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={activeTab === 'recruitments' ? "어떤 행사의 셀러 모집을 찾으시나요?" : "행사 브랜드명을 검색해보세요"}
                        style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: 15 }}
                    />
                </div>
            </div>

            {/* 뷰 전환 탭 (공고 / 주최측) */}
            <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}`, background: T.white }}>
                <div 
                    onClick={() => setActiveTab('recruitments')}
                    style={{ 
                        flex: 1, textAlign: 'center', padding: '14px 0', fontSize: 15, fontWeight: activeTab === 'recruitments' ? 700 : 500,
                        color: activeTab === 'recruitments' ? T.text : T.gray, cursor: 'pointer',
                        borderBottom: activeTab === 'recruitments' ? `2px solid ${T.text}` : '2px solid transparent',
                        transition: 'all 0.2s'
                    }}
                >
                    📢 모집 공고
                </div>
                <div 
                    onClick={() => setActiveTab('brands')}
                    style={{ 
                        flex: 1, textAlign: 'center', padding: '14px 0', fontSize: 15, fontWeight: activeTab === 'brands' ? 700 : 500,
                        color: activeTab === 'brands' ? T.text : T.gray, cursor: 'pointer',
                        borderBottom: activeTab === 'brands' ? `2px solid ${T.text}` : '2px solid transparent',
                        transition: 'all 0.2s'
                    }}
                >
                    🏢 주최측 (브랜드)
                </div>
            </div>

            {/* 컨텐츠 영역 */}
            <div className="page-padding" style={{ paddingTop: 20 }}>
                {activeTab === 'recruitments' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} style={{ height: 120, background: '#f0f0f0', borderRadius: 16, animation: 'pulse 1.5s infinite' }} />
                            ))
                        ) : filteredRecruitments.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: T.gray, fontSize: 15 }}>
                                진행 중인 공고가 없습니다.
                            </div>
                        ) : (
                            filteredRecruitments.map(rec => (
                                <Link href={`/recruitments/${rec.id}`} key={rec.id} style={{ textDecoration: 'none' }}>
                                    <Card padding={16}>
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
                                        <div style={{ fontSize: 17, fontWeight: 700, color: T.text, marginBottom: 4, lineHeight: 1.4 }}>
                                            {rec.title}
                                        </div>
                                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 12 }}>
                                            {rec.brand?.name}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ fontSize: 14, color: T.gray, fontWeight: 500 }}>
                                                📍 {rec.location}
                                            </div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>
                                                {rec.fee === 0 ? '참가비 무료' : `${rec.fee.toLocaleString()}원`}
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))
                        )}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} style={{ height: 100, background: '#f0f0f0', borderRadius: 16, animation: 'pulse 1.5s infinite' }} />
                            ))
                        ) : filteredBrands.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: T.gray, fontSize: 15 }}>
                                등록된 브랜드가 없습니다.
                            </div>
                        ) : (
                            filteredBrands.map(brand => (
                                <Link href={`/brands/${brand.id}`} key={brand.id} style={{ textDecoration: 'none' }}>
                                    <Card padding={16}>
                                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                            <div style={{ 
                                                width: 60, height: 60, borderRadius: 12, background: T.border,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 24, overflow: 'hidden'
                                            }}>
                                                {brand.logo_url ? (
                                                    <img src={brand.logo_url} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : '🏢'}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 18, fontWeight: 800, color: T.text, marginBottom: 4 }}>
                                                    {brand.name}
                                                </div>
                                                <div style={{ fontSize: 14, color: T.gray, marginBottom: 8 }}>
                                                    {brand.category || '행사 기획사'}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <span style={{ fontSize: 14 }}>⭐</span>
                                                        <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{Number(brand.average_rating || 0).toFixed(1)}</span>
                                                    </div>
                                                    <div style={{ fontSize: 13, color: T.gray }}>
                                                        리뷰 {brand.total_reviews || 0}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
