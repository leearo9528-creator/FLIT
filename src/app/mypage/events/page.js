'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function MyEventsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
            return;
        }

        if (user) {
            fetchMyEvents();
        }
    }, [user, loading, router]);

    async function fetchMyEvents() {
        const sb = createClient();
        const { data } = await sb
            .from('events')
            .select('*')
            .eq('submitted_by', user.id)
            .order('created_at', { ascending: false });
        
        if (data) setEvents(data);
        setIsFetching(false);
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation(); // 카드 클릭 이동 방지
        if (!window.confirm('정말 제보한 행사를 삭제하시겠습니까?')) return;
        try {
            const sb = createClient();
            const { error } = await sb.from('events').delete().eq('id', id);
            if (error) throw error;
            alert('삭제되었습니다.');
            fetchMyEvents();
        } catch (err) {
            console.error(err);
            alert('삭제에 실패했습니다.');
        }
    };

    if (loading || isFetching) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray, fontSize: 15 }}>로딩 중...</div>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="내가 제보한 행사" back />

            <div className="page-padding">
                {events.length === 0 ? (
                    <div style={{ textAlign: 'center', color: T.gray, marginTop: 40, fontSize: 15 }}>
                        아직 제보한 행사가 없습니다.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {events.map(event => (
                            <Card key={event.id} padding={16} onClick={() => router.push(`/events/${event.id}`)} style={{ cursor: 'pointer' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <div style={{
                                        padding: '4px 8px', borderRadius: 4,
                                        background: event.is_approved ? T.blueLt : T.redLt,
                                        color: event.is_approved ? T.blue : T.red,
                                        fontSize: 11, fontWeight: 700
                                    }}>
                                        {event.is_approved ? '승인됨' : '승인 대기중'}
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        <span onClick={(e) => { e.stopPropagation(); alert('수정 기능은 준비중입니다.'); }} style={{ fontSize: 13, color: T.gray, cursor: 'pointer', fontWeight: 600 }}>수정</span>
                                        <span onClick={(e) => handleDelete(e, event.id)} style={{ fontSize: 13, color: T.red, cursor: 'pointer', fontWeight: 600 }}>삭제</span>
                                    </div>
                                </div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 4 }}>
                                    {event.name}
                                </div>
                                <div style={{ fontSize: 13, color: T.gray }}>
                                    📍 {event.location_sido} {event.location_sigungu}
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
