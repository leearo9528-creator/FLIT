'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { T, FILTERS } from '@/lib/design-tokens';
import Card from '@/components/ui/Card';

export default function HomePage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('전체');

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

    const filteredEvents = filter === '전체'
        ? events
        : events.filter(e => e.recruitment_type === filter);

    return (
        <div style={{ minHeight: '100vh', paddingBottom: 80 }}>
            {/* 상단 헤더 */}
            <div style={{
                padding: '24px 20px', background: T.white,
                borderBottom: `1px solid ${T.border}`,
                position: 'sticky', top: 0, zIndex: 10
            }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: T.text, letterSpacing: -0.5 }}>
                    플릿 <span style={{ color: T.blue }}>●</span>
                </div>
                <div style={{ fontSize: 13, color: T.gray, marginTop: 4 }}>셀러들이 직접 말하는 진짜 행사 정보</div>
            </div>

            {/* 필터 칩 */}
            <div style={{
                display: 'flex', gap: 8, padding: '16px 20px',
                overflowX: 'auto', background: T.bg
            }}>
                {FILTERS.recruitmentType.map(f => (
                    <div
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600,
                            whiteSpace: 'nowrap', cursor: 'pointer',
                            background: filter === f ? T.text : T.white,
                            color: filter === f ? T.white : T.gray,
                            border: `1px solid ${filter === f ? T.text : T.border}`,
                            transition: 'all 0.15s'
                        }}
                    >
                        {f}
                    </div>
                ))}
            </div>

            {/* 리스트 */}
            <div className="page-padding">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {loading ? (
                        Array(5).fill(0).map((_, i) => (
                            <Card key={i} style={{ height: 120, background: '#f8f9fa' }} />
                        ))
                    ) : (
                        filteredEvents.map(event => (
                            <Link href={`/events/${event.id}`} key={event.id}>
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
                                    <div style={{ fontSize: 17, fontWeight: 700, color: T.text, marginBottom: 8 }}>
                                        {event.name}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: 14, color: T.gray }}>
                                            📍 {event.location_sido} {event.location_sigungu}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <span style={{ fontSize: 13 }}>⭐</span>
                                                <span style={{ fontSize: 14, fontWeight: 700 }}>{event.avg_rating || '0.0'}</span>
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
            </div>
        </div>
    );
}
