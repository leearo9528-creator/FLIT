'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { T } from '@/lib/design-tokens';
import Card from '@/components/ui/Card';

export default function SearchPage() {
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
    const [query, setQuery] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            const { createClient } = await import('@/utils/supabase/client');
            const sb = createClient();
            const { data } = await sb.from('events')
                .select('*')
                .eq('is_approved', true)
                .order('created_at', { ascending: false });
            if (data) setEvents(data);
            setLoading(false);
        };
        fetchEvents();
    }, []);

    const filteredEvents = events.filter(e => {
        if (!query.trim()) return true;
        const lowerQ = query.toLowerCase();
        return (
            (e.name || '').toLowerCase().includes(lowerQ) ||
            (e.location_sido || '').toLowerCase().includes(lowerQ) ||
            (e.location_sigungu || '').toLowerCase().includes(lowerQ) ||
            (e.recruitment_type || '').toLowerCase().includes(lowerQ)
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
                        placeholder="지역이나 행사명을 검색해보세요"
                        style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: 15 }}
                    />
                </div>
            </div>

            {/* 뷰 전환 탭 (리스트 / 지도) */}
            <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}`, background: T.white }}>
                <div 
                    onClick={() => setViewMode('list')}
                    style={{ 
                        flex: 1, textAlign: 'center', padding: '14px 0', fontSize: 15, fontWeight: viewMode === 'list' ? 700 : 500,
                        color: viewMode === 'list' ? T.text : T.gray, cursor: 'pointer',
                        borderBottom: viewMode === 'list' ? `2px solid ${T.text}` : '2px solid transparent',
                        transition: 'all 0.2s'
                    }}
                >
                    📝 리스트 뷰
                </div>
                <div 
                    onClick={() => setViewMode('map')}
                    style={{ 
                        flex: 1, textAlign: 'center', padding: '14px 0', fontSize: 15, fontWeight: viewMode === 'map' ? 700 : 500,
                        color: viewMode === 'map' ? T.text : T.gray, cursor: 'pointer',
                        borderBottom: viewMode === 'map' ? `2px solid ${T.text}` : '2px solid transparent',
                        transition: 'all 0.2s'
                    }}
                >
                    🗺️ 지도 뷰
                </div>
            </div>

            {/* 컨텐츠 영역 */}
            <div className="page-padding" style={{ paddingTop: 20 }}>
                {viewMode === 'list' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {loading && events.length === 0 ? (
                            [1, 2, 3, 4, 5].map(i => (
                                <div key={i} style={{ height: 120, background: '#f0f0f0', borderRadius: 16, animation: 'pulse 1.5s infinite' }} />
                            ))
                        ) : filteredEvents.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: T.gray, fontSize: 15 }}>
                                검색 결과가 없습니다.
                            </div>
                        ) : (
                            filteredEvents.map(event => (
                                <Link href={`/events/${event.id}`} key={event.id} style={{ textDecoration: 'none' }}>
                                    <Card padding={16}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{
                                                padding: '4px 8px', borderRadius: 4,
                                                background: event.recruitment_type === '플리마켓' ? T.blueLt : T.greenLt,
                                                color: event.recruitment_type === '플리마켓' ? T.blue : T.green,
                                                fontSize: 11, fontWeight: 700, marginBottom: 8
                                            }}>
                                                {event.recruitment_type}
                                            </div>
                                            <div style={{ fontSize: 12, color: T.gray }}>
                                                {event.status}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 17, fontWeight: 700, color: T.text, marginBottom: 8, lineHeight: 1.4 }}>
                                            {event.name}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ fontSize: 14, color: T.gray }}>
                                                📍 {event.location_sido} {event.location_sigungu}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <span style={{ fontSize: 13 }}>⭐</span>
                                                    <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{event.avg_rating || '0.0'}</span>
                                                </div>
                                                <div style={{ fontSize: 13, color: T.gray }}>
                                                    리뷰 {event.review_count || 0}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))
                        )}
                    </div>
                ) : (
                    <div style={{ 
                        width: '100%', height: 'calc(100vh - 260px)', 
                        background: '#e0e0e0', borderRadius: 16, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: T.gray, fontSize: 15, fontWeight: 600
                    }}>
                        지도 연동 준비중... 🗺️
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
