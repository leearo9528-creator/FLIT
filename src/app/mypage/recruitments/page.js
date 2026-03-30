'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';

function calcDDay(dateStr) {
    if (!dateStr) return null;
    const diff = Math.ceil((new Date(dateStr) - Date.now()) / 86400000);
    if (diff < 0) return { label: '마감', color: T.gray };
    if (diff === 0) return { label: 'D-Day', color: T.red };
    return { label: `D-${diff}`, color: diff <= 3 ? T.red : T.blue };
}

export default function MyRecruitmentsPage() {
    const router = useRouter();
    const { user, loading: authLoading, plan } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) { router.replace('/login'); return; }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!user || plan !== 'organizer') return;
        (async () => {
            try {
                const sb = createClient();
                const { data: instances } = await sb
                    .from('event_instances')
                    .select('id')
                    .eq('organizer_id', user.id);

                if (!instances?.length) { setLoading(false); return; }
                const ids = instances.map(i => i.id);

                const { data } = await sb
                    .from('recruitments')
                    .select('id, title, status, end_date, bumped_at, created_at, event_instance:event_instances(location, event_date, base_event:base_events(name))')
                    .in('event_instance_id', ids)
                    .order('created_at', { ascending: false });

                setItems(data || []);
            } catch (err) {
                console.error('내 공고 로드 실패:', err);
            } finally {
                setLoading(false);
            }
        })();
    }, [user, plan]);

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="내 공고" back />

            <div style={{ padding: '12px 16px 0' }}>
                {loading ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} style={{ height: 100, background: T.grayLt, borderRadius: T.radiusLg, marginBottom: 10, animation: 'pulse 1.5s infinite' }} />
                    ))
                ) : items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>
                        등록한 공고가 없어요.
                    </div>
                ) : (
                    items.map(rec => {
                        const dday = calcDDay(rec.end_date);
                        const event = rec.event_instance?.base_event;
                        return (
                            <div
                                key={rec.id}
                                onClick={() => router.push(`/recruitments/${rec.id}`)}
                                style={{
                                    background: T.white, borderRadius: T.radiusLg,
                                    border: `1px solid ${T.border}`, padding: '14px 16px',
                                    marginBottom: 10, cursor: 'pointer', boxShadow: T.shadowSm,
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    <span style={{
                                        fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                                        background: rec.status === 'OPEN' ? T.greenLt : T.grayLt,
                                        color: rec.status === 'OPEN' ? T.green : T.gray,
                                    }}>
                                        {rec.status === 'OPEN' ? '모집중' : '마감됨'}
                                    </span>
                                    {dday && (
                                        <span style={{ fontSize: 11, fontWeight: 700, color: dday.color }}>{dday.label}</span>
                                    )}
                                    {rec.bumped_at && (
                                        <span style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED', background: '#EDE9FE', padding: '2px 8px', borderRadius: 4 }}>
                                            📢 끌올됨
                                        </span>
                                    )}
                                </div>
                                {event?.name && (
                                    <div style={{ fontSize: 12, color: T.gray, marginBottom: 3 }}>{event.name}</div>
                                )}
                                <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{rec.title}</div>
                                {rec.event_instance?.location && (
                                    <div style={{ fontSize: 12, color: T.gray, marginTop: 4 }}>📍 {rec.event_instance.location}</div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
