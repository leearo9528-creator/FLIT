'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { T } from '@/lib/design-tokens';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDow(year, month) {
    return new Date(year, month, 1).getDay();
}
function toYMD(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function HomeCalendarSection() {
    const router = useRouter();
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const start = `${year}-${String(month + 1).padStart(2, '0')}-01`;
        const last = getDaysInMonth(year, month);
        const end = `${year}-${String(month + 1).padStart(2, '0')}-${String(last).padStart(2, '0')}`;

        (async () => {
            const sb = createClient();
            const { data } = await sb
                .from('event_instances')
                .select(`id, event_date, event_date_end, location,
                    base_event:base_events(id, name),
                    recruitments(id, title, status)`)
                .gte('event_date', start)
                .lte('event_date', end)
                .order('event_date', { ascending: true });
            setEvents(data || []);
            setLoading(false);
        })();
    }, [year, month]);

    const prevMonth = () => {
        if (month === 0) { setYear(y => y - 1); setMonth(11); }
        else setMonth(m => m - 1);
        setSelectedDate(null);
    };
    const nextMonth = () => {
        if (month === 11) { setYear(y => y + 1); setMonth(0); }
        else setMonth(m => m + 1);
        setSelectedDate(null);
    };

    const eventsByDate = {};
    events.forEach(ev => {
        const d = ev.event_date?.slice(0, 10);
        if (!d) return;
        if (!eventsByDate[d]) eventsByDate[d] = [];
        eventsByDate[d].push(ev);
    });

    const daysInMonth = getDaysInMonth(year, month);
    const firstDow = getFirstDow(year, month);
    const today = toYMD(now);

    const cells = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const selStr = selectedDate
        ? `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
        : null;
    const selEvents = selStr ? (eventsByDate[selStr] || []) : [];

    // 날짜 미선택 시: 오늘 이후 가장 가까운 행사 3개
    const upcomingEvents = !selectedDate
        ? events.filter(ev => ev.event_date >= today).slice(0, 4)
        : selEvents;

    return (
        <div style={{ background: T.white, margin: '0 0 12px', borderBottom: `1px solid ${T.border}` }}>
            {/* 섹션 타이틀 */}
            <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: T.text }}>📅 이달의 행사 캘린더</div>
                <Link href="/calendar" style={{ fontSize: 13, color: T.blue, fontWeight: 600, textDecoration: 'none' }}>전체 보기 →</Link>
            </div>

            {/* 월 네비 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px 10px' }}>
                <button onClick={prevMonth} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: T.text, lineHeight: 1 }}>‹</button>
                <span style={{ fontSize: 15, fontWeight: 800, color: T.text }}>{year}년 {month + 1}월</span>
                <button onClick={nextMonth} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: T.text, lineHeight: 1 }}>›</button>
            </div>

            {/* 달력 그리드 */}
            <div style={{ padding: '0 12px' }}>
                {/* 요일 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
                    {DAYS.map((d, i) => (
                        <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: i === 0 ? T.red : i === 6 ? T.blue : T.gray, padding: '4px 0' }}>{d}</div>
                    ))}
                </div>
                {/* 날짜 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px 0' }}>
                    {cells.map((day, idx) => {
                        if (!day) return <div key={`e-${idx}`} style={{ height: 44 }} />;
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const dayEvs = eventsByDate[dateStr] || [];
                        const isToday = dateStr === today;
                        const isSel = selectedDate === day;
                        const dow = (firstDow + day - 1) % 7;
                        const hasOpen = dayEvs.some(e => e.recruitments?.some(r => r.status === 'OPEN'));

                        return (
                            <div key={day} onClick={() => setSelectedDate(isSel ? null : day)}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 2px', cursor: 'pointer', borderRadius: 8, background: isSel ? T.blueLt : 'transparent' }}>
                                <div style={{
                                    width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: isToday ? T.blue : 'transparent',
                                    fontSize: 12, fontWeight: isToday ? 800 : 400,
                                    color: isToday ? '#fff' : dow === 0 ? T.red : dow === 6 ? T.blue : T.text,
                                }}>
                                    {day}
                                </div>
                                {dayEvs.length > 0 && (
                                    <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                        {dayEvs.slice(0, 2).map((_, i) => (
                                            <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: hasOpen ? T.green : T.gray }} />
                                        ))}
                                        {dayEvs.length > 2 && <div style={{ width: 4, height: 4, borderRadius: '50%', background: T.gray }} />}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 범례 */}
            <div style={{ display: 'flex', gap: 14, padding: '8px 16px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: T.gray }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.green }} /> 모집 중
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: T.gray }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.gray }} /> 행사 일정
                </div>
            </div>

            {/* 행사 목록 */}
            <div style={{ padding: '0 14px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: T.text, marginBottom: 8 }}>
                    {selectedDate
                        ? `${month + 1}월 ${selectedDate}일 행사 (${selEvents.length}개)`
                        : `${month + 1}월 행사 일정`}
                </div>
                {loading ? (
                    <div style={{ fontSize: 12, color: T.gray, padding: '12px 0' }}>불러오는 중...</div>
                ) : upcomingEvents.length === 0 ? (
                    <div style={{ fontSize: 12, color: T.gray, padding: '12px 0' }}>
                        {selectedDate ? '이 날은 등록된 행사가 없습니다' : '이달에 등록된 행사가 없습니다'}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {upcomingEvents.map(ev => {
                            const openRec = ev.recruitments?.find(r => r.status === 'OPEN');
                            return (
                                <div key={ev.id}
                                    onClick={() => openRec ? router.push(`/recruitments/${openRec.id}`) : router.push(`/events/${ev.base_event?.id}`)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                                        background: '#F9FAFB', borderRadius: 10, cursor: 'pointer',
                                        borderLeft: `3px solid ${openRec ? T.green : T.border}`,
                                    }}>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 1 }}>{ev.base_event?.name}</div>
                                        <div style={{ fontSize: 11, color: T.gray }}>
                                            {ev.event_date?.slice(5).replace('-', '/')}
                                            {ev.event_date_end && ev.event_date_end !== ev.event_date && ` ~ ${ev.event_date_end.slice(5).replace('-', '/')}`}
                                            {ev.location ? ` · ${ev.location.split(' ').slice(0, 2).join(' ')}` : ''}
                                        </div>
                                    </div>
                                    {openRec
                                        ? <div style={{ fontSize: 10, fontWeight: 800, color: T.green, background: T.greenLt, borderRadius: 99, padding: '3px 8px', flexShrink: 0 }}>모집중</div>
                                        : <div style={{ fontSize: 10, color: T.gray, background: T.grayLt, borderRadius: 99, padding: '3px 8px', flexShrink: 0, fontWeight: 600 }}>행사만</div>
                                    }
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 전체 보기 버튼 */}
                {!selectedDate && !loading && events.length > 0 && (
                    <Link href="/calendar" style={{ textDecoration: 'none' }}>
                        <div style={{
                            marginTop: 8, padding: '10px 0', borderRadius: 10,
                            border: `1.5px solid ${T.border}`, textAlign: 'center',
                            fontSize: 13, fontWeight: 700, color: T.gray,
                        }}>
                            이달 행사 전체 보기 ({events.length}개) →
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}
