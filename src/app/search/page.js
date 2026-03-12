'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, MapPin, Tag, ArrowUpDown } from 'lucide-react';
import { T, FILTERS } from '@/lib/design-tokens';
import Card from '@/components/ui/Card';

/* ─── helpers ────────────────────────────────────────────────── */
function calcRating(event) {
    if (!event) return '0.0';
    if (event.avg_rating) return parseFloat(event.avg_rating).toFixed(1);
    if (event.average_profit && event.average_traffic)
        return ((event.average_profit + event.average_traffic) / 2).toFixed(1);
    return '0.0';
}

/* ─── Filter Chip Row ─────────────────────────────────────────── */
function ChipRow({ label, icon, options, value, onChange }) {
    return (
        <div>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 16px 6px', fontSize: 12, fontWeight: 700, color: T.gray,
            }}>
                {icon}
                {label}
            </div>
            <div style={{
                display: 'flex', gap: 8, overflowX: 'auto',
                padding: '0 16px 12px',
                scrollbarWidth: 'none', msOverflowStyle: 'none',
            }}>
                {options.map(opt => (
                    <div
                        key={opt}
                        onClick={() => onChange(opt === value ? '전체' : opt)}
                        style={{
                            padding: '7px 14px', borderRadius: T.radiusFull,
                            fontSize: 13, fontWeight: 600, cursor: 'pointer',
                            whiteSpace: 'nowrap', flexShrink: 0,
                            background: value === opt ? T.text : T.white,
                            color: value === opt ? T.white : T.gray,
                            border: `1px solid ${value === opt ? T.text : T.border}`,
                            transition: 'all 0.15s',
                        }}
                    >
                        {opt}
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Sort Bar ────────────────────────────────────────────────── */
const SORT_OPTIONS = [
    { key: 'latest', label: '최신순' },
    { key: 'fee_asc', label: '참가비 낮은순' },
    { key: 'fee_desc', label: '참가비 높은순' },
    { key: 'rating', label: '평점 높은순' },
];

function SortBar({ value, onChange }) {
    return (
        <div style={{
            display: 'flex', gap: 8, overflowX: 'auto',
            padding: '0 16px 12px',
            scrollbarWidth: 'none',
        }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 4,
                marginRight: 4, fontSize: 12, color: T.gray, flexShrink: 0,
            }}>
                <ArrowUpDown size={13} />
                정렬
            </div>
            {SORT_OPTIONS.map(opt => (
                <div
                    key={opt.key}
                    onClick={() => onChange(opt.key)}
                    style={{
                        padding: '6px 12px', borderRadius: T.radiusFull,
                        fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        whiteSpace: 'nowrap', flexShrink: 0,
                        background: value === opt.key ? T.blue : T.white,
                        color: value === opt.key ? T.white : T.gray,
                        border: `1px solid ${value === opt.key ? T.blue : T.border}`,
                        transition: 'all 0.15s',
                    }}
                >
                    {opt.label}
                </div>
            ))}
        </div>
    );
}

/* ─── Recruitment Card ────────────────────────────────────────── */
function RecruitCard({ rec }) {
    const ev = rec.event || rec.events || {};
    const org = rec.organizer || rec.organizers || {};
    const rating = calcRating(ev);
    const reviewCount = ev.total_reviews ?? ev.review_count ?? 0;
    const daysLeft = rec.end_date
        ? Math.ceil((new Date(rec.end_date) - Date.now()) / 86400000)
        : null;

    return (
        <Link href={`/recruitments/${rec.id}`} style={{ textDecoration: 'none' }}>
            <Card padding={16} style={{ border: `1px solid ${T.border}` }}>
                {/* top row: status badge + deadline */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{
                        padding: '4px 9px', borderRadius: 6,
                        background: rec.status === 'OPEN' ? T.greenLt : T.grayLt,
                        color: rec.status === 'OPEN' ? T.green : T.gray,
                        fontSize: 11, fontWeight: 700,
                    }}>
                        {rec.status === 'OPEN' ? '모집중' : '마감됨'}
                    </div>
                    {daysLeft !== null && daysLeft >= 0 && (
                        <div style={{
                            fontSize: 12, fontWeight: 700,
                            color: daysLeft <= 3 ? T.red : T.gray,
                        }}>
                            {daysLeft === 0 ? 'D-Day' : `D-${daysLeft}`}
                        </div>
                    )}
                </div>

                {/* title */}
                <div style={{
                    fontSize: 16, fontWeight: 700, color: T.text,
                    lineHeight: 1.4, marginBottom: 6,
                }}>
                    {rec.title}
                </div>

                {/* organizer | event */}
                {(org.name || ev.name) && (
                    <div style={{ fontSize: 13, color: T.gray, marginBottom: 10 }}>
                        {[org.name, ev.name].filter(Boolean).join(' · ')}
                    </div>
                )}

                {/* location + fee row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: T.textSub }}>
                        <MapPin size={13} color={T.gray} />
                        {ev.location || ev.location_sido || '장소 미정'}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: T.blue }}>
                        {rec.fee === 0 || rec.fee === null
                            ? '참가비 무료'
                            : `${Number(rec.fee).toLocaleString()}원`}
                    </div>
                </div>

                {/* event date */}
                {rec.event_date && (
                    <div style={{ fontSize: 12, color: T.gray, marginBottom: 12 }}>
                        🗓 행사일 {new Date(rec.event_date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                    </div>
                )}

                {/* divider + rating */}
                <div style={{
                    borderTop: `1px solid ${T.border}`, paddingTop: 10,
                    display: 'flex', alignItems: 'center', gap: 10,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span style={{ fontSize: 14 }}>⭐</span>
                        <span style={{ fontSize: 14, fontWeight: 800, color: T.text }}>{rating}</span>
                    </div>
                    <span style={{ color: T.border }}>|</span>
                    <span style={{ fontSize: 13, color: T.gray }}>리뷰 {reviewCount}개</span>
                    {reviewCount >= 10 && (
                        <span style={{
                            fontSize: 11, fontWeight: 700, color: T.blue,
                            background: T.blueLt, padding: '2px 7px', borderRadius: 4, marginLeft: 2,
                        }}>
                            인기
                        </span>
                    )}
                </div>
            </Card>
        </Link>
    );
}

/* ─── Event Card ──────────────────────────────────────────────── */
function EventCard({ evt }) {
    const totalRating = ((evt.average_profit || 0) + (evt.average_traffic || 0)) / 2;
    return (
        <Link href={`/events/${evt.id}`} style={{ textDecoration: 'none' }}>
            <Card padding={16} style={{ border: `1px solid ${T.border}` }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{
                        width: 52, height: 52, borderRadius: T.radiusMd,
                        background: T.blueLt, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                    }}>
                        📍
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 3 }}>
                            {evt.name}
                        </div>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 10 }}>
                            {evt.location}{evt.category ? ` · ${evt.category}` : ''}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontSize: 11, color: T.gray, width: 28 }}>매출</span>
                                    <div style={{ width: 60, height: 5, background: T.border, borderRadius: 3, overflow: 'hidden' }}>
                                        <div style={{ width: `${(evt.average_profit / 5) * 100}%`, height: '100%', background: T.green, borderRadius: 3 }} />
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: T.green }}>{Number(evt.average_profit || 0).toFixed(1)}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontSize: 11, color: T.gray, width: 28 }}>집객</span>
                                    <div style={{ width: 60, height: 5, background: T.border, borderRadius: 3, overflow: 'hidden' }}>
                                        <div style={{ width: `${(evt.average_traffic / 5) * 100}%`, height: '100%', background: T.blue, borderRadius: 3 }} />
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: T.blue }}>{Number(evt.average_traffic || 0).toFixed(1)}</span>
                                </div>
                            </div>
                            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                <div style={{ fontSize: 13, fontWeight: 800, color: T.text }}>
                                    ⭐ {totalRating.toFixed(1)}
                                </div>
                                <div style={{ fontSize: 12, color: T.gray }}>리뷰 {evt.total_reviews || 0}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

/* ─── Organizer Card ──────────────────────────────────────────── */
function OrganizerCard({ org }) {
    return (
        <Link href={`/organizers/${org.id}`} style={{ textDecoration: 'none' }}>
            <Card padding={16} style={{ border: `1px solid ${T.border}` }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{
                        width: 52, height: 52, borderRadius: T.radiusMd,
                        background: T.yellowLt, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                        overflow: 'hidden',
                    }}>
                        {org.logo_url
                            ? <img src={org.logo_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : '🏢'}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 10 }}>
                            {org.name}
                        </div>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontSize: 11, color: T.gray, width: 28 }}>지원</span>
                                    <div style={{ width: 60, height: 5, background: T.border, borderRadius: 3, overflow: 'hidden' }}>
                                        <div style={{ width: `${(org.average_support / 5) * 100}%`, height: '100%', background: T.yellow, borderRadius: 3 }} />
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: T.yellow }}>{Number(org.average_support || 0).toFixed(1)}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontSize: 11, color: T.gray, width: 28 }}>매너</span>
                                    <div style={{ width: 60, height: 5, background: T.border, borderRadius: 3, overflow: 'hidden' }}>
                                        <div style={{ width: `${(org.average_manners / 5) * 100}%`, height: '100%', background: '#E91E63', borderRadius: 3 }} />
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#E91E63' }}>{Number(org.average_manners || 0).toFixed(1)}</span>
                                </div>
                            </div>
                            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                <div style={{ fontSize: 12, color: T.gray }}>리뷰 {org.total_reviews || 0}개</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

/* ─── Skeleton ───────────────────────────────────────────────── */
function Skeleton({ count = 3, height = 130 }) {
    return Array(count).fill(0).map((_, i) => (
        <div key={i} style={{
            height, background: T.grayLt, borderRadius: T.radiusXl,
            animation: 'pulse 1.5s infinite',
        }} />
    ));
}

/* ─── Tab Bar ────────────────────────────────────────────────── */
const TABS = [
    { key: 'recruitments', label: '📢 현재공고' },
    { key: 'events', label: '📍 행사평가' },
    { key: 'organizers', label: '🏢 주최측평가' },
];

/* ─── Main Content (needs Suspense for useSearchParams) ─────── */
function SearchContent() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState('recruitments');
    const [query, setQuery] = useState(searchParams.get('q') || '');

    /* filter / sort state */
    const [regionFilter, setRegionFilter] = useState('전체');
    const [categoryFilter, setCategoryFilter] = useState('전체');
    const [sortBy, setSortBy] = useState('latest');
    const [showFilters, setShowFilters] = useState(false);

    /* data */
    const [recruitments, setRecruitments] = useState([]);
    const [events, setEvents] = useState([]);
    const [organizers, setOrganizers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { createClient } = await import('@/utils/supabase/client');
            const sb = createClient();

            const [{ data: recData }, { data: evtData }, { data: orgData }] = await Promise.all([
                sb.from('recruitments')
                    .select('*, event:events(id, name, location, location_sido, avg_rating, average_profit, average_traffic, total_reviews, review_count, category), organizer:organizers(name)')
                    .order('created_at', { ascending: false }),
                sb.from('events')
                    .select('*')
                    .order('total_reviews', { ascending: false }),
                sb.from('organizers')
                    .select('*')
                    .order('total_reviews', { ascending: false }),
            ]);

            if (recData) setRecruitments(recData);
            if (evtData) setEvents(evtData);
            if (orgData) setOrganizers(orgData);
            setLoading(false);
        })();
    }, []);

    /* ── filtered & sorted recruitments ── */
    const filteredRecruitments = useCallback(() => {
        let list = recruitments;

        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(r =>
                (r.title || '').toLowerCase().includes(q) ||
                (r.event?.name || '').toLowerCase().includes(q) ||
                (r.event?.location || '').toLowerCase().includes(q) ||
                (r.event?.location_sido || '').toLowerCase().includes(q) ||
                (r.organizer?.name || '').toLowerCase().includes(q)
            );
        }

        if (regionFilter !== '전체') {
            list = list.filter(r => {
                const loc = (r.event?.location || '') + (r.event?.location_sido || '');
                return loc.includes(regionFilter);
            });
        }

        if (categoryFilter !== '전체') {
            list = list.filter(r => (r.event?.category || '').includes(categoryFilter));
        }

        if (sortBy === 'fee_asc') list = [...list].sort((a, b) => (a.fee ?? 0) - (b.fee ?? 0));
        else if (sortBy === 'fee_desc') list = [...list].sort((a, b) => (b.fee ?? 0) - (a.fee ?? 0));
        else if (sortBy === 'rating') {
            list = [...list].sort((a, b) => {
                const rA = parseFloat(calcRating(a.event));
                const rB = parseFloat(calcRating(b.event));
                return rB - rA;
            });
        }

        return list;
    }, [recruitments, query, regionFilter, categoryFilter, sortBy])();

    const filteredEvents = events.filter(e => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (e.name || '').toLowerCase().includes(q) ||
            (e.location || '').toLowerCase().includes(q) ||
            (e.category || '').toLowerCase().includes(q);
    });

    const filteredOrganizers = organizers.filter(o => {
        if (!query.trim()) return true;
        return (o.name || '').toLowerCase().includes(query.toLowerCase());
    });

    const activeFilterCount = [regionFilter !== '전체', categoryFilter !== '전체', sortBy !== 'latest']
        .filter(Boolean).length;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            {/* ── sticky header ── */}
            <div style={{
                background: T.white, borderBottom: `1px solid ${T.border}`,
                position: 'sticky', top: 0, zIndex: 20,
            }}>
                <div style={{ padding: '20px 16px 12px' }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: T.text, letterSpacing: -0.5, marginBottom: 12 }}>
                        마켓 찾기
                    </div>

                    {/* search bar */}
                    <div style={{
                        display: 'flex', alignItems: 'center', background: T.bg,
                        borderRadius: T.radiusMd, padding: '11px 14px',
                        border: `1.5px solid ${query ? T.blue : T.border}`,
                        gap: 10,
                    }}>
                        <Search size={16} color={T.gray} strokeWidth={2} />
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="지역, 행사명, 기획사 검색"
                            style={{
                                border: 'none', background: 'transparent', outline: 'none',
                                flex: 1, fontSize: 14, color: T.text,
                            }}
                        />
                        {activeTab === 'recruitments' && (
                            <div
                                onClick={() => setShowFilters(f => !f)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 4,
                                    padding: '5px 10px', borderRadius: T.radiusMd,
                                    background: showFilters || activeFilterCount > 0 ? T.text : T.white,
                                    color: showFilters || activeFilterCount > 0 ? T.white : T.gray,
                                    border: `1px solid ${T.border}`,
                                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                    flexShrink: 0,
                                }}
                            >
                                <SlidersHorizontal size={13} />
                                필터{activeFilterCount > 0 ? ` ${activeFilterCount}` : ''}
                            </div>
                        )}
                    </div>
                </div>

                {/* filter panel (collapse) */}
                {activeTab === 'recruitments' && showFilters && (
                    <div style={{ borderTop: `1px solid ${T.border}`, background: T.bg, paddingBottom: 4 }}>
                        <ChipRow
                            label="지역"
                            icon={<MapPin size={12} />}
                            options={['전체', ...FILTERS.region]}
                            value={regionFilter}
                            onChange={setRegionFilter}
                        />
                        <ChipRow
                            label="카테고리"
                            icon={<Tag size={12} />}
                            options={['전체', ...FILTERS.boothCategory]}
                            value={categoryFilter}
                            onChange={setCategoryFilter}
                        />
                        <SortBar value={sortBy} onChange={setSortBy} />
                    </div>
                )}

                {/* tab bar */}
                <div style={{ display: 'flex', borderTop: `1px solid ${T.border}` }}>
                    {TABS.map(tab => (
                        <div
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            style={{
                                flex: 1, textAlign: 'center', padding: '13px 0',
                                fontSize: 13, fontWeight: activeTab === tab.key ? 800 : 500,
                                color: activeTab === tab.key ? T.text : T.gray,
                                cursor: 'pointer',
                                borderBottom: activeTab === tab.key
                                    ? `2.5px solid ${T.text}`
                                    : '2.5px solid transparent',
                                transition: 'all 0.2s',
                            }}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── content ── */}
            <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* recruitments tab */}
                {activeTab === 'recruitments' && (
                    <>
                        {!loading && (
                            <div style={{ fontSize: 12, color: T.gray, paddingBottom: 4 }}>
                                {filteredRecruitments.length}개의 공고
                            </div>
                        )}
                        {loading
                            ? <Skeleton />
                            : filteredRecruitments.length === 0
                                ? <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 15 }}>
                                    진행 중인 공고가 없습니다.
                                </div>
                                : filteredRecruitments.map(r => <RecruitCard key={r.id} rec={r} />)
                        }
                    </>
                )}

                {/* events tab */}
                {activeTab === 'events' && (
                    loading
                        ? <Skeleton count={4} height={110} />
                        : filteredEvents.length === 0
                            ? <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 15 }}>
                                등록된 행사가 없습니다.
                            </div>
                            : filteredEvents.map(e => <EventCard key={e.id} evt={e} />)
                )}

                {/* organizers tab */}
                {activeTab === 'organizers' && (
                    loading
                        ? <Skeleton count={4} height={100} />
                        : filteredOrganizers.length === 0
                            ? <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 15 }}>
                                등록된 주최측이 없습니다.
                            </div>
                            : filteredOrganizers.map(o => <OrganizerCard key={o.id} org={o} />)
                )}
            </div>

            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                div::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
}

/* ─── Page Export (Suspense boundary for useSearchParams) ────── */
export default function SearchPage() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: T.gray, fontSize: 14 }}>불러오는 중...</div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
