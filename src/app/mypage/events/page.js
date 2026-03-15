'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bookmark, MapPin, Calendar } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';

export default function MyEventsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [scraps, setScraps] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loading && !user) { router.replace('/login'); return; }
        if (user) fetchScraps();
    }, [user, loading]);

    async function fetchScraps() {
        const sb = createClient();
        const { data } = await sb
            .from('scraps')
            .select(`
                created_at,
                recruitment:recruitments (
                    id, title, fee, start_date, end_date, event_date, status,
                    event:events (name, location, location_sido, category)
                )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        if (data) setScraps(data.filter(s => s.recruitment));
        setFetching(false);
    }

    const handleUnscrap = async (recruitmentId) => {
        const sb = createClient();
        await sb.from('scraps').delete().eq('user_id', user.id).eq('recruitment_id', recruitmentId);
        setScraps(prev => prev.filter(s => s.recruitment?.id !== recruitmentId));
    };

    if (loading || fetching) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray }}>로딩 중...</div>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="관심 가는 행사" back />

            {scraps.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 20px' }}>
                    <div style={{ fontSize: 44, marginBottom: 12, opacity: 0.4 }}>🎪</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 6 }}>관심 등록한 공고가 없어요</div>
                    <div style={{ fontSize: 13, color: T.gray, marginBottom: 24 }}>마음에 드는 공고에 북마크를 눌러보세요</div>
                    <div
                        onClick={() => router.push('/search')}
                        style={{
                            background: T.blue, color: '#fff',
                            padding: '10px 24px', borderRadius: T.radiusFull,
                            fontSize: 14, fontWeight: 700, cursor: 'pointer',
                        }}
                    >
                        행사 찾아보기
                    </div>
                </div>
            ) : (
                <div style={{ background: T.white }}>
                    {scraps.map((scrap, i) => {
                        const rec = scrap.recruitment;
                        const ev = rec?.event;
                        const isOpen = rec?.status === 'OPEN';
                        const eventDate = rec?.event_date
                            ? new Date(rec.event_date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
                            : null;

                        return (
                            <div
                                key={rec.id}
                                style={{
                                    padding: '18px 20px',
                                    borderBottom: i < scraps.length - 1 ? `1px solid ${T.border}` : 'none',
                                }}
                            >
                                {/* 상단 배지 + 북마크 해제 */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        <span style={{
                                            fontSize: 11, fontWeight: 700,
                                            padding: '3px 8px', borderRadius: 4,
                                            background: isOpen ? T.greenLt : T.grayLt,
                                            color: isOpen ? T.green : T.gray,
                                        }}>
                                            {isOpen ? '모집 중' : '마감'}
                                        </span>
                                        {ev?.category && (
                                            <span style={{
                                                fontSize: 11, fontWeight: 700, color: T.blue,
                                                background: T.blueLt, padding: '3px 8px', borderRadius: 4,
                                            }}>
                                                {ev.category}
                                            </span>
                                        )}
                                    </div>
                                    <Bookmark
                                        size={18}
                                        fill={T.blue}
                                        color={T.blue}
                                        style={{ cursor: 'pointer', flexShrink: 0 }}
                                        onClick={() => handleUnscrap(rec.id)}
                                    />
                                </div>

                                {/* 공고 제목 */}
                                <div
                                    onClick={() => router.push(`/recruitments/${rec.id}`)}
                                    style={{
                                        fontSize: 15, fontWeight: 700, color: T.text,
                                        marginBottom: 6, lineHeight: 1.4, cursor: 'pointer',
                                        display: '-webkit-box', WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                    }}
                                >
                                    {rec.title}
                                </div>

                                {/* 행사 정보 */}
                                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                    {ev?.name && (
                                        <span style={{ fontSize: 13, color: T.textSub }}>
                                            🎪 {ev.name}
                                        </span>
                                    )}
                                    {ev?.location_sido && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 13, color: T.gray }}>
                                            <MapPin size={12} /> {ev.location_sido}
                                        </span>
                                    )}
                                    {eventDate && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 13, color: T.gray }}>
                                            <Calendar size={12} /> {eventDate}
                                        </span>
                                    )}
                                </div>

                                {/* 참가비 */}
                                <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, color: rec.fee === 0 ? T.green : T.text }}>
                                    {rec.fee === 0 ? '무료 입점' : `참가비 ${rec.fee.toLocaleString()}원`}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
