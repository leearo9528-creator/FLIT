'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bookmark, MapPin, Calendar } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
import EmptyState from '@/components/ui/EmptyState';

const TABS = [
    { key: 'recruitments', label: '공고 스크랩' },
    { key: 'events', label: '행사 스크랩' },
];

export default function MyScrapsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [tab, setTab] = useState('recruitments');
    const [recScraps, setRecScraps] = useState([]);
    const [evtScraps, setEvtScraps] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loading && !user) { router.replace('/login'); return; }
        if (user) fetchAll();
    }, [user, loading]);

    async function fetchAll() {
        const sb = createClient();
        const [recRes, evtRes] = await Promise.all([
            sb.from('scraps')
                .select('created_at, recruitment:recruitments(id, title, fee, status, instance:event_instances(location, event_date, base_event:base_events(id, name)))')
                .eq('user_id', user.id).order('created_at', { ascending: false }),
            sb.from('event_scraps')
                .select('created_at, base_event:base_events(id, name, category, total_reviews, avg_event_rating)')
                .eq('user_id', user.id).order('created_at', { ascending: false }),
        ]);
        setRecScraps((recRes.data || []).filter(s => s.recruitment));
        setEvtScraps((evtRes.data || []).filter(s => s.base_event));
        setFetching(false);
    }

    const unscrapRec = async (recId) => {
        const sb = createClient();
        await sb.from('scraps').delete().eq('user_id', user.id).eq('recruitment_id', recId);
        setRecScraps(prev => prev.filter(s => s.recruitment?.id !== recId));
    };

    const unscrapEvt = async (evtId) => {
        const sb = createClient();
        await sb.from('event_scraps').delete().eq('user_id', user.id).eq('base_event_id', evtId);
        setEvtScraps(prev => prev.filter(s => s.base_event?.id !== evtId));
    };

    if (loading || !user) return null;

    const recCount = recScraps.length;
    const evtCount = evtScraps.length;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="스크랩" back />

            {/* 탭 */}
            <div style={{ display: 'flex', background: T.white, borderBottom: `1px solid ${T.border}` }}>
                {TABS.map(t => {
                    const active = tab === t.key;
                    const count = t.key === 'recruitments' ? recCount : evtCount;
                    return (
                        <div key={t.key} onClick={() => setTab(t.key)} style={{
                            flex: 1, padding: '14px 0', textAlign: 'center', cursor: 'pointer',
                            borderBottom: active ? `2.5px solid ${T.blue}` : '2.5px solid transparent',
                        }}>
                            <span style={{ fontSize: 14, fontWeight: active ? 800 : 600, color: active ? T.blue : T.gray }}>
                                {t.label}
                            </span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: active ? T.blue : T.gray, marginLeft: 4 }}>{count}</span>
                        </div>
                    );
                })}
            </div>

            {fetching ? (
                <div style={{ padding: 16 }}>
                    {Array(3).fill(0).map((_, i) => <div key={i} style={{ height: 80, background: T.grayLt, borderRadius: T.radiusLg, marginBottom: 10, animation: 'pulse 1.5s infinite' }} />)}
                </div>
            ) : tab === 'recruitments' ? (
                recScraps.length === 0 ? (
                    <EmptyState icon="📋" title="스크랩한 공고가 없어요" sub="마음에 드는 공고에 북마크를 눌러보세요" cta="공고 찾기" href="/search" router={router} />
                ) : (
                    <div style={{ background: T.white }}>
                        {recScraps.map((s, i) => {
                            const rec = s.recruitment;
                            const inst = rec?.instance || {};
                            const ev = inst.base_event || {};
                            return (
                                <div key={rec.id} style={{ padding: '14px 20px', borderBottom: i < recScraps.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: rec.status === 'OPEN' ? T.greenLt : T.grayLt, color: rec.status === 'OPEN' ? T.green : T.gray }}>
                                            {rec.status === 'OPEN' ? '모집중' : '마감'}
                                        </span>
                                        <Bookmark size={18} fill={T.blue} color={T.blue} style={{ cursor: 'pointer' }} onClick={() => unscrapRec(rec.id)} />
                                    </div>
                                    <div onClick={() => router.push(`/recruitments/${rec.id}`)} style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 4, cursor: 'pointer' }}>
                                        {rec.title}
                                    </div>
                                    <div style={{ display: 'flex', gap: 10, fontSize: 12, color: T.gray, flexWrap: 'wrap' }}>
                                        {ev.name && <span>🎪 {ev.name}</span>}
                                        {inst.location && <span><MapPin size={11} style={{ verticalAlign: -1 }} /> {inst.location.split(' ').slice(0, 2).join(' ')}</span>}
                                        {inst.event_date && <span><Calendar size={11} style={{ verticalAlign: -1 }} /> {new Date(inst.event_date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            ) : (
                evtScraps.length === 0 ? (
                    <EmptyState icon="🎪" title="스크랩한 행사가 없어요" sub="행사 상세에서 북마크를 눌러보세요" cta="행사 찾기" href="/search" router={router} />
                ) : (
                    <div style={{ background: T.white }}>
                        {evtScraps.map((s, i) => {
                            const ev = s.base_event;
                            const rating = ev.avg_event_rating ? Number(ev.avg_event_rating).toFixed(1) : '-';
                            return (
                                <div key={ev.id} style={{ padding: '14px 20px', borderBottom: i < evtScraps.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            {ev.category && <span style={{ fontSize: 11, fontWeight: 700, color: T.blue, background: T.blueLt, padding: '3px 8px', borderRadius: 4 }}>{ev.category}</span>}
                                            {ev.total_reviews > 0 && <span style={{ fontSize: 11, color: T.gray }}>⭐ {rating} · 리뷰 {ev.total_reviews}개</span>}
                                        </div>
                                        <Bookmark size={18} fill={T.blue} color={T.blue} style={{ cursor: 'pointer' }} onClick={() => unscrapEvt(ev.id)} />
                                    </div>
                                    <div onClick={() => router.push(`/events/${ev.id}`)} style={{ fontSize: 15, fontWeight: 700, color: T.text, cursor: 'pointer' }}>
                                        {ev.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            )}
        </div>
    );
}

