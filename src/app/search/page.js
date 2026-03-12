'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { T } from '@/lib/design-tokens';
import Card from '@/components/ui/Card';

export default function SearchPage() {
    const [activeTab, setActiveTab] = useState('recruitments'); // 'recruitments' | 'events' | 'organizers'
    const [query, setQuery] = useState('');
    
    const [recruitments, setRecruitments] = useState([]);
    const [events, setEvents] = useState([]);
    const [organizers, setOrganizers] = useState([]);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { createClient } = await import('@/utils/supabase/client');
            const sb = createClient();
            
            // 1. 공고 목록 (행사와 주최측 정보 Join)
            const { data: recData } = await sb.from('recruitments')
                .select(`*, event:events(name, location), organizer:organizers(name)`)
                .order('created_at', { ascending: false });
            
            // 2. 장소(행사) 목록
            const { data: evtData } = await sb.from('events')
                .select('*')
                .order('total_reviews', { ascending: false });

            // 3. 주최측(기획사) 목록
            const { data: orgData } = await sb.from('organizers')
                .select('*')
                .order('total_reviews', { ascending: false });

            if (recData) setRecruitments(recData);
            if (evtData) setEvents(evtData);
            if (orgData) setOrganizers(orgData);
            
            setLoading(false);
        };
        fetchData();
    }, []);

    const filteredRecruitments = recruitments.filter(r => {
        if (!query.trim()) return true;
        const lowerQ = query.toLowerCase();
        return (
            (r.title || '').toLowerCase().includes(lowerQ) ||
            (r.event?.location || '').toLowerCase().includes(lowerQ) ||
            (r.event?.name || '').toLowerCase().includes(lowerQ) ||
            (r.organizer?.name || '').toLowerCase().includes(lowerQ)
        );
    });

    const filteredEvents = events.filter(e => {
        if (!query.trim()) return true;
        const lowerQ = query.toLowerCase();
        return (
            (e.name || '').toLowerCase().includes(lowerQ) ||
            (e.location || '').toLowerCase().includes(lowerQ) ||
            (e.category || '').toLowerCase().includes(lowerQ)
        );
    });

    const filteredOrganizers = organizers.filter(o => {
        if (!query.trim()) return true;
        const lowerQ = query.toLowerCase();
        return (
            (o.name || '').toLowerCase().includes(lowerQ)
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
                        placeholder="지역, 장소, 기획사 명칭을 검색해보세요"
                        style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: 15 }}
                    />
                </div>
            </div>

            {/* 뷰 전환 탭 (3단 분리) */}
            <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}`, background: T.white }}>
                <div 
                    onClick={() => setActiveTab('recruitments')}
                    style={{ 
                        flex: 1, textAlign: 'center', padding: '14px 0', fontSize: 14, fontWeight: activeTab === 'recruitments' ? 800 : 500,
                        color: activeTab === 'recruitments' ? T.text : T.gray, cursor: 'pointer',
                        borderBottom: activeTab === 'recruitments' ? `2px solid ${T.text}` : '2px solid transparent',
                        transition: 'all 0.2s'
                    }}
                >
                    📢 현재공고
                </div>
                <div 
                    onClick={() => setActiveTab('events')}
                    style={{ 
                        flex: 1, textAlign: 'center', padding: '14px 0', fontSize: 14, fontWeight: activeTab === 'events' ? 800 : 500,
                        color: activeTab === 'events' ? T.text : T.gray, cursor: 'pointer',
                        borderBottom: activeTab === 'events' ? `2px solid ${T.text}` : '2px solid transparent',
                        transition: 'all 0.2s'
                    }}
                >
                    📍 장소평가
                </div>
                <div 
                    onClick={() => setActiveTab('organizers')}
                    style={{ 
                        flex: 1, textAlign: 'center', padding: '14px 0', fontSize: 14, fontWeight: activeTab === 'organizers' ? 800 : 500,
                        color: activeTab === 'organizers' ? T.text : T.gray, cursor: 'pointer',
                        borderBottom: activeTab === 'organizers' ? `2px solid ${T.text}` : '2px solid transparent',
                        transition: 'all 0.2s'
                    }}
                >
                    🏢 주최측평가
                </div>
            </div>

            {/* 컨텐츠 영역 */}
            <div className="page-padding" style={{ paddingTop: 20 }}>
                {activeTab === 'recruitments' && (
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
                                            <div style={{ fontSize: 12, color: T.gray }}>
                                                마감 {new Date(rec.end_date).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 4, lineHeight: 1.4 }}>
                                            {rec.title}
                                        </div>
                                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 12 }}>
                                            {rec.organizer?.name} | {rec.event?.name}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ fontSize: 13, color: T.gray, fontWeight: 500 }}>
                                                📍 {rec.event?.location || '장소 미정'}
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
                )}
                
                {activeTab === 'events' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} style={{ height: 100, background: '#f0f0f0', borderRadius: 16, animation: 'pulse 1.5s infinite' }} />
                            ))
                        ) : filteredEvents.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: T.gray, fontSize: 15 }}>
                                등록된 장소가 없습니다.
                            </div>
                        ) : (
                            filteredEvents.map(evt => (
                                <Link href={`/events/${evt.id}`} key={evt.id} style={{ textDecoration: 'none' }}>
                                    <Card padding={16}>
                                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                            <div style={{ 
                                                width: 60, height: 60, borderRadius: 12, background: T.border,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 24, overflow: 'hidden'
                                            }}>
                                                📍
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 17, fontWeight: 800, color: T.text, marginBottom: 2 }}>
                                                    {evt.name}
                                                </div>
                                                <div style={{ fontSize: 13, color: T.gray, marginBottom: 8 }}>
                                                    {evt.location} ({evt.category || '행사장'})
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: T.green }}>
                                                        <span style={{ fontSize: 12 }}>매출</span>
                                                        <span style={{ fontSize: 14, fontWeight: 800 }}>⭐{Number(evt.average_profit || 0).toFixed(1)}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: T.blue }}>
                                                        <span style={{ fontSize: 12 }}>집객</span>
                                                        <span style={{ fontSize: 14, fontWeight: 800 }}>⭐{Number(evt.average_traffic || 0).toFixed(1)}</span>
                                                    </div>
                                                    <div style={{ fontSize: 12, color: T.gray, marginLeft: 'auto' }}>
                                                        리뷰 {evt.total_reviews || 0}
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
                
                {activeTab === 'organizers' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} style={{ height: 100, background: '#f0f0f0', borderRadius: 16, animation: 'pulse 1.5s infinite' }} />
                            ))
                        ) : filteredOrganizers.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: T.gray, fontSize: 15 }}>
                                등록된 주최측이 없습니다.
                            </div>
                        ) : (
                            filteredOrganizers.map(org => (
                                <Link href={`/organizers/${org.id}`} key={org.id} style={{ textDecoration: 'none' }}>
                                    <Card padding={16}>
                                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                            <div style={{ 
                                                width: 60, height: 60, borderRadius: 12, background: T.border,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 24, overflow: 'hidden'
                                            }}>
                                                🏢
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 17, fontWeight: 800, color: T.text, marginBottom: 4 }}>
                                                    {org.name}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#FF9800' }}>
                                                        <span style={{ fontSize: 12 }}>지원</span>
                                                        <span style={{ fontSize: 14, fontWeight: 800 }}>⭐{Number(org.average_support || 0).toFixed(1)}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#E91E63' }}>
                                                        <span style={{ fontSize: 12 }}>매너</span>
                                                        <span style={{ fontSize: 14, fontWeight: 800 }}>⭐{Number(org.average_manners || 0).toFixed(1)}</span>
                                                    </div>
                                                    <div style={{ fontSize: 12, color: T.gray, marginLeft: 'auto' }}>
                                                        리뷰 {org.total_reviews || 0}
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
