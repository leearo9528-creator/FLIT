'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { T } from '@/lib/design-tokens';
import Link from 'next/link';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
    return new Date(year, month, 1).getDay();
}

function toYMD(date) {
    return date.toISOString().slice(0, 10);
}

export default function CalendarClient() {
    const router = useRouter();
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth()); // 0-indexed
    const [events, setEvents] = useState([]); // event_instances for this month
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
        const lastDay = getDaysInMonth(year, month);
        const endDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

        (async () => {
            const sb = createClient();
            const { data } = await sb
                .from('event_instances')
                .select(`
                    id, event_date, event_date_end, location,
                    base_event:base_events(id, name, category),
                    organizer:organizers(id, name),
                    recruitments(id, title, status, end_date)
                `)
                .gte('event_date', startDate)
                .lte('event_date', endDate)
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

    // 날짜별 이벤트 맵
    const eventsByDate = {};
    events.forEach(ev => {
        const d = ev.event_date?.slice(0, 10);
        if (!d) return;
        if (!eventsByDate[d]) eventsByDate[d] = [];
        eventsByDate[d].push(ev);
    });

    const daysInMonth = getDaysInMonth(year, month);
    const firstDow = getFirstDayOfWeek(year, month);
    const today = toYMD(now);

    // 달력 그리드 (빈칸 + 날짜)
    const cells = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const selectedDateStr = selectedDate
        ? `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
        : null;
    const selectedEvents = selectedDateStr ? (eventsByDate[selectedDateStr] || []) : [];

    return (
        <div style={{ minHeight: '100vh', background: '#F3F4F6', paddingBottom: 80 }}>

            {/* 헤더 */}
            <div style={{ background: T.white, borderBottom: `1px solid ${T.border}`, padding: '56px 20px 16px' }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: T.text, marginBottom: 2 }}>📅 행사 달력</div>
                <div style={{ fontSize: 13, color: T.gray }}>이달의 플리마켓·팝업 일정을 한눈에</div>
            </div>

            {/* 월 네비 */}
            <div style={{
                background: T.white, padding: '14px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: `1px solid ${T.border}`,
            }}>
                <button onClick={prevMonth} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: T.text, padding: '0 8px' }}>‹</button>
                <span style={{ fontSize: 17, fontWeight: 800, color: T.text }}>{year}년 {month + 1}월</span>
                <button onClick={nextMonth} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: T.text, padding: '0 8px' }}>›</button>
            </div>

            {/* 달력 */}
            <div style={{ background: T.white, margin: '12px 12px 0', borderRadius: 16, overflow: 'hidden', boxShadow: T.shadowSm }}>
                {/* 요일 헤더 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: `1px solid ${T.border}` }}>
                    {DAYS.map((d, i) => (
                        <div key={d} style={{
                            textAlign: 'center', padding: '10px 0', fontSize: 12, fontWeight: 700,
                            color: i === 0 ? T.red : i === 6 ? T.blue : T.gray,
                        }}>{d}</div>
                    ))}
                </div>

                {/* 날짜 그리드 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                    {cells.map((day, idx) => {
                        if (!day) return <div key={`empty-${idx}`} style={{ padding: '10px 0', minHeight: 52 }} />;

                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const dayEvents = eventsByDate[dateStr] || [];
                        const isToday = dateStr === today;
                        const isSelected = selectedDate === day;
                        const dow = (firstDow + day - 1) % 7;
                        const isOpen = dayEvents.some(e => e.recruitments?.some(r => r.status === 'OPEN'));

                        return (
                            <div
                                key={day}
                                onClick={() => setSelectedDate(isSelected ? null : day)}
                                style={{
                                    padding: '8px 4px', minHeight: 52, cursor: 'pointer',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                                    background: isSelected ? T.blueLt : 'transparent',
                                    borderRadius: isSelected ? 8 : 0,
                                    position: 'relative',
                                }}
                            >
                                <div style={{
                                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: isToday ? T.blue : 'transparent',
                                    fontSize: 13, fontWeight: isToday || isSelected ? 800 : 400,
                                    color: isToday ? '#fff' : dow === 0 ? T.red : dow === 6 ? T.blue : T.text,
                                }}>
                                    {day}
                                </div>
                                {/* 이벤트 도트 */}
                                {dayEvents.length > 0 && (
                                    <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 28 }}>
                                        {dayEvents.slice(0, 3).map((ev, i) => (
                                            <div key={i} style={{
                                                width: 5, height: 5, borderRadius: '50%',
                                                background: isOpen ? T.green : T.gray,
                                            }} />
                                        ))}
                                        {dayEvents.length > 3 && (
                                            <div style={{ fontSize: 8, color: T.gray, fontWeight: 700 }}>+{dayEvents.length - 3}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 범례 */}
            <div style={{ display: 'flex', gap: 16, padding: '10px 16px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: T.gray }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.green }} /> 모집 중 행사
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: T.gray }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.gray }} /> 행사 일정
                </div>
            </div>

            {/* 선택된 날짜 이벤트 목록 */}
            {selectedDate && (
                <div style={{ margin: '0 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: T.text, padding: '4px 4px 0' }}>
                        {month + 1}월 {selectedDate}일 행사 {selectedEvents.length > 0 ? `(${selectedEvents.length}개)` : '없음'}
                    </div>

                    {selectedEvents.length === 0 ? (
                        <div style={{
                            background: T.white, borderRadius: 14, padding: '28px 20px',
                            textAlign: 'center', color: T.gray, fontSize: 13,
                            boxShadow: T.shadowSm,
                        }}>
                            이 날은 등록된 행사가 없습니다
                        </div>
                    ) : (
                        selectedEvents.map(ev => {
                            const openRec = ev.recruitments?.find(r => r.status === 'OPEN');
                            const dateLabel = ev.event_date?.slice(5).replace('-', '/')
                                + (ev.event_date_end && ev.event_date_end !== ev.event_date ? ` ~ ${ev.event_date_end.slice(5).replace('-', '/')}` : '');
                            return (
                                <div
                                    key={ev.id}
                                    onClick={() => openRec ? router.push(`/recruitments/${openRec.id}`) : router.push(`/events/${ev.base_event?.id}`)}
                                    style={{
                                        background: T.white, borderRadius: 14, padding: '14px 16px',
                                        boxShadow: T.shadowSm, cursor: 'pointer',
                                    }}
                                >
                                    <div style={{ fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 4 }}>
                                        <span style={{ color: T.blue }}>[{dateLabel}]</span> {ev.base_event?.name}
                                    </div>
                                    {ev.organizer?.name && (
                                        <div style={{ fontSize: 12, color: T.gray, marginBottom: 2 }}>
                                            주최사 · {ev.organizer.name}
                                        </div>
                                    )}
                                    {ev.location && (
                                        <div style={{ fontSize: 12, color: T.gray }}>
                                            장소 · {ev.location}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            )}

            {/* 이달 전체 행사 (날짜 미선택 시) */}
            {!selectedDate && (
                <div style={{ margin: '0 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: T.text, padding: '4px 4px 0' }}>
                        {loading ? '불러오는 중...' : `이달의 행사 (${events.length}개)`}
                    </div>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: 40, color: T.gray, fontSize: 13 }}>⏳ 로딩 중...</div>
                    ) : events.length === 0 ? (
                        <div style={{ background: T.white, borderRadius: 14, padding: '32px 20px', textAlign: 'center', color: T.gray, fontSize: 13, boxShadow: T.shadowSm }}>
                            이달에 등록된 행사가 없습니다
                        </div>
                    ) : (
                        events.map(ev => {
                            const openRec = ev.recruitments?.find(r => r.status === 'OPEN');
                            const dateLabel = ev.event_date?.slice(5).replace('-', '/')
                                + (ev.event_date_end && ev.event_date_end !== ev.event_date ? ` ~ ${ev.event_date_end.slice(5).replace('-', '/')}` : '');
                            return (
                                <div
                                    key={ev.id}
                                    onClick={() => openRec ? router.push(`/recruitments/${openRec.id}`) : router.push(`/events/${ev.base_event?.id}`)}
                                    style={{
                                        background: T.white, borderRadius: 14, padding: '14px 16px',
                                        boxShadow: T.shadowSm, cursor: 'pointer',
                                    }}
                                >
                                    <div style={{ fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 4 }}>
                                        <span style={{ color: T.blue }}>[{dateLabel}]</span> {ev.base_event?.name}
                                    </div>
                                    {ev.organizer?.name && (
                                        <div style={{ fontSize: 12, color: T.gray, marginBottom: 2 }}>
                                            주최사 · {ev.organizer.name}
                                        </div>
                                    )}
                                    {ev.location && (
                                        <div style={{ fontSize: 12, color: T.gray }}>
                                            장소 · {ev.location}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            )}

        </div>
    );
}
