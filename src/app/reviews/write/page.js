'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { T, REVENUE_RANGES, FILTERS, inputStyle } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function ReviewWritePage() {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [boothType, setBoothType] = useState('seller');
    const [year, setYear] = useState('2025');
    const [month, setMonth] = useState('3');
    const [categories, setCategories] = useState([]); // 판매 품목 (복수)
    const [catPrivate, setCatPrivate] = useState(false);
    const [priceRange, setPriceRange] = useState('');
    const [r1, setR1] = useState(0);
    const [r2, setR2] = useState(0);
    const [r3, setR3] = useState(0);
    const [r4, setR4] = useState(0); // 구매력 별점
    const [ageGroups, setAgeGroups] = useState([]); // 주요 연령층 (복수)
    const [customerGroups, setCustomerGroups] = useState([]); // 주요 고객층 (복수)
    const [revenue, setRevenue] = useState(null);
    const [pros, setPros] = useState('');
    const [cons, setCons] = useState('');
    const [repurchase, setRepurchase] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!selectedEventId) return alert('행사를 선택해주세요.');
        if (categories.length === 0) return alert('판매 품목을 하나 이상 선택해주세요.');
        if (!r1 || !r2 || !r3 || !r4) return alert('모든 항목의 별점을 입력해주세요.');
        if (ageGroups.length === 0) return alert('주요 연령층을 하나 이상 선택해주세요.');
        if (customerGroups.length === 0) return alert('주요 고객층을 하나 이상 선택해주세요.');
        if (revenue === null) return alert('매출 구간을 선택해주세요.');

        setIsSubmitting(true);
        try {
            const { getSupabase } = await import('@/lib/supabase');
            const sb = getSupabase();
            const { data: { session } } = await sb.auth.getSession();

            if (!session?.user) {
                alert('로그인이 필요합니다.');
                return;
            }

            const { error } = await sb.from('reviews').insert({
                event_id: selectedEventId,
                user_id: session.user.id,
                booth_type: boothType,
                participated_year: parseInt(year),
                participated_month: parseInt(month),
                categories: categories, // 배열로 전송
                price_range: priceRange,
                rating_visitors: r1,
                rating_organizer: r2,
                rating_atmosphere: r3,
                rating_buypower: r4,
                overall_rating: parseFloat(overall),
                age_groups: ageGroups,
                customer_groups: customerGroups,
                revenue_range: revenue,
                pros: pros,
                cons: cons,
                repurchase_intent: repurchase,
                is_approved: true // 임시로 자동 승인
            });

            if (error) throw error;

            alert('리뷰가 등록되었습니다!');
            window.history.back();
        } catch (err) {
            console.error('리뷰 등록 에러 상세:', err);
            // Supabase 에러 객체 내부 속성을 직접 추출
            const msg = err.message || (typeof err === 'object' ? JSON.stringify(err) : '알 수 없는 오류');
            const code = err.code ? `\n[Code: ${err.code}]` : '';
            const detail = err.details ? `\n[Detail: ${err.details}]` : '';
            const hint = err.hint ? `\n[Hint: ${err.hint}]` : '';

            alert(`등록 중 오류가 발생했습니다:\n${msg}${code}${detail}${hint}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            const { getSupabase } = await import('@/lib/supabase');
            const sb = getSupabase();
            const { data: { session } } = await sb.auth.getSession();

            let query = sb.from('events')
                .select('id, name, location_sido, location_sigungu, is_approved, submitted_by')
                .order('created_at', { ascending: false });

            if (session?.user) {
                // 승인됨 OR 본인이 제보함
                query = query.or(`is_approved.eq.true,submitted_by.eq.${session.user.id}`);
            } else {
                // 로그인 안된 경우 승인된 것만
                query = query.eq('is_approved', true);
            }

            const { data } = await query;
            if (data) setEvents(data);
        };
        fetchEvents();
    }, []);

    const selectedEvent = events.find(e => e.id === selectedEventId);

    const filteredEvents = events.filter(e =>
        e.name.includes(searchKeyword) ||
        (e.location_sido && e.location_sido.includes(searchKeyword)) ||
        (e.location_sigungu && e.location_sigungu.includes(searchKeyword))
    );

    const overall = r1 && r2 && r3 && r4 ? ((r1 + r2 + r3 + r4) / 4).toFixed(1) : null;
    const revenues = boothType === 'seller' ? REVENUE_RANGES.seller : REVENUE_RANGES.foodtruck;



    return (
        <div style={{ minHeight: '100vh', background: T.bg }}>
            <TopBar
                title="리뷰 작성"
                subtitle={null}
                hasBack
                onBack={() => window.history.back()}
                action={null}
            />

            <div className="page-padding">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {/* 메인 폼 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* 행사 선택 */}
                        <Card>
                            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 14 }}>어떤 행사의 리뷰인가요?</div>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', background: T.bg, borderRadius: T.radiusMd,
                                    border: `1.5px solid ${selectedEventId ? T.blue : T.border}`, padding: '0 16px',
                                }}>
                                    <span style={{ fontSize: 16 }}>🔍</span>
                                    <input
                                        type="text"
                                        placeholder="행사명, 장소로 검색해주세요"
                                        value={searchKeyword}
                                        onChange={(e) => {
                                            setSearchKeyword(e.target.value);
                                            setIsDropdownOpen(true);
                                            if (selectedEventId) setSelectedEventId(''); // reset selection if typing again
                                        }}
                                        onFocus={() => setIsDropdownOpen(true)}
                                        style={{
                                            flex: 1, padding: '13px 8px', border: 'none', background: 'transparent',
                                            fontSize: 14, color: T.text, outline: 'none'
                                        }}
                                    />
                                    {isDropdownOpen && (
                                        <div
                                            onClick={() => {
                                                setSearchKeyword('');
                                                setSelectedEventId('');
                                                setIsDropdownOpen(false);
                                            }}
                                            style={{
                                                width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                cursor: 'pointer', color: T.gray, fontSize: 18, marginRight: -8
                                            }}
                                        >
                                            ×
                                        </div>
                                    )}
                                </div>
                                {isDropdownOpen && (
                                    <div style={{
                                        position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                                        background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxHeight: 240, overflowY: 'auto', zIndex: 10
                                    }}>
                                        {filteredEvents.length > 0 ? (
                                            filteredEvents.map(e => (
                                                <div
                                                    key={e.id}
                                                    onClick={() => {
                                                        setSelectedEventId(e.id);
                                                        setSearchKeyword(e.name);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    style={{
                                                        padding: '12px 16px', borderBottom: `1px solid ${T.border}`,
                                                        cursor: 'pointer', display: 'flex', flexDirection: 'column'
                                                    }}
                                                >
                                                    <span style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 2 }}>{e.name}</span>
                                                    <span style={{ fontSize: 12, color: T.gray }}>{e.location_sido || ''} {e.location_sigungu || ''}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{ padding: '24px 16px', textAlign: 'center', color: T.gray, fontSize: 13 }}>
                                                검색 결과가 없습니다 😢<br />다른 검색어를 입력해주세요.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <Link href="/events/register">
                                <div style={{ marginTop: 16, fontSize: 12, color: T.gray, fontWeight: 500, cursor: 'pointer', textAlign: 'center', lineHeight: 1.5 }}>
                                    찾으시는 행사가 없으신가요?<br />
                                    <span style={{ color: T.blue, textDecoration: 'underline', fontWeight: 700 }}>+ 행사 제보하고 리뷰 바로 쓰기</span>
                                </div>
                            </Link>
                        </Card>

                        {/* 참가 유형 */}
                        <Card>
                            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 14 }}>참가 유형</div>
                            <div style={{ display: 'flex', gap: 10 }}>
                                {[['seller', '🛍️ 일반 셀러'], ['foodtruck', '🍔 푸드트럭']].map(([v, l]) => (
                                    <div key={v} onClick={() => setBoothType(v)} style={{
                                        flex: 1, padding: 14, borderRadius: T.radiusMd, cursor: 'pointer',
                                        border: `2px solid ${boothType === v ? T.blue : T.border}`,
                                        background: boothType === v ? T.blueLt : T.white,
                                        textAlign: 'center', fontSize: 14, fontWeight: 700,
                                        color: boothType === v ? T.blue : T.gray, transition: 'all 0.15s',
                                    }}>{l}</div>
                                ))}
                            </div>
                        </Card>

                        {/* 참가 시기 */}
                        <Card>
                            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 14 }}>참가 시기</div>
                            <div style={{ display: 'flex', gap: 10 }}>
                                <select value={year} onChange={(e) => setYear(e.target.value)} style={inputStyle(true)}>
                                    {['2026', '2025', '2024', '2023'].map((y) => <option key={y} value={y}>{y}년</option>)}
                                </select>
                                <select value={month} onChange={(e) => setMonth(e.target.value)} style={inputStyle(true)}>
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                                        <option key={m} value={m}>{m}월</option>
                                    ))}
                                </select>
                            </div>
                        </Card>

                        {/* 판매 품목 */}
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>판매 품목</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 13, color: T.gray }}>비공개</span>
                                    <div onClick={() => setCatPrivate(!catPrivate)} style={{
                                        width: 40, height: 22, borderRadius: 11, background: catPrivate ? T.blue : T.border,
                                        position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
                                    }}>
                                        <div style={{
                                            position: 'absolute', top: 2, left: catPrivate ? 20 : 2,
                                            width: 18, height: 18, borderRadius: '50%', background: '#fff',
                                            transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {FILTERS.boothCategory.map((c) => {
                                    const isSelected = categories.includes(c);
                                    return (
                                        <span key={c} onClick={() => {
                                            setCategories(prev => isSelected ? prev.filter(x => x !== c) : [...prev, c]);
                                        }} style={{
                                            padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                            background: isSelected ? T.text : T.bg, color: isSelected ? '#fff' : T.gray,
                                            border: `1px solid ${isSelected ? T.text : T.border}`, transition: 'all 0.15s',
                                        }}>{c}</span>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* 제품 가격대 */}
                        <Card>
                            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 14 }}>제품 가격대</div>
                            <input value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                                placeholder="예) 1~3만원대, 소품 5천원~" style={inputStyle(priceRange)} />
                        </Card>

                        {/* 항목별 별점 */}
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>항목별 별점</div>
                                {overall && (
                                    <div style={{ background: T.blueLt, borderRadius: 10, padding: '6px 14px', fontSize: 13, fontWeight: 700, color: T.blue }}>
                                        종합 ★ {overall}
                                    </div>
                                )}
                            </div>
                            {[['방문객 수 / 유동인구', r1, setR1], ['주최측 대응', r2, setR2], ['마켓 분위기', r3, setR3], ['구매력', r4, setR4]].map(([l, v, sv]) => (
                                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                    <span style={{ fontSize: 13, color: T.gray, width: 160, flexShrink: 0 }}>{l}</span>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <span key={s} onClick={() => sv(s)} style={{
                                                fontSize: 28, cursor: 'pointer',
                                                filter: s <= v ? 'none' : 'grayscale(1) opacity(0.3)',
                                                transition: 'filter 0.1s',
                                            }}>⭐</span>
                                        ))}
                                    </div>
                                    {v > 0 && <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{v}.0</span>}
                                </div>
                            ))}
                        </Card>

                        {/* 연령층 & 고객층 */}
                        <Card>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 12 }}>주요 연령층 (복수 선택 가능)</div>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {FILTERS.ageGroup.map((v) => {
                                            const isSelected = ageGroups.includes(v);
                                            return (
                                                <span key={v} onClick={() => {
                                                    setAgeGroups(prev => isSelected ? prev.filter(x => x !== v) : [...prev, v]);
                                                }} style={{
                                                    padding: '8px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                                                    background: isSelected ? T.text : T.bg, color: isSelected ? '#fff' : T.gray,
                                                    border: `1px solid ${isSelected ? T.text : T.border}`, transition: 'all 0.15s',
                                                }}>{v}</span>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 20 }}>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 12 }}>주요 고객층 (복수 선택 가능)</div>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {FILTERS.customerGroup.map((v) => {
                                            const isSelected = customerGroups.includes(v);
                                            return (
                                                <span key={v} onClick={() => {
                                                    setCustomerGroups(prev => isSelected ? prev.filter(x => x !== v) : [...prev, v]);
                                                }} style={{
                                                    padding: '8px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                                                    background: isSelected ? T.blue : T.bg, color: isSelected ? '#fff' : T.gray,
                                                    border: `1px solid ${isSelected ? T.blue : T.border}`, transition: 'all 0.15s',
                                                }}>{v}</span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* 매출 구간 */}
                        <Card>
                            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 14 }}>
                                매출 구간 <span style={{ fontSize: 12, color: T.gray, fontWeight: 400 }}>(구독자 공개)</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {revenues.map((r, i) => (
                                    <div key={i} onClick={() => setRevenue(i)} style={{
                                        padding: '10px 16px', borderRadius: T.radiusMd, cursor: 'pointer',
                                        border: `2px solid ${revenue === i ? T.blue : T.border}`,
                                        background: revenue === i ? T.blueLt : T.white,
                                        fontSize: 13, fontWeight: 600,
                                        color: revenue === i ? T.blue : T.gray, transition: 'all 0.15s',
                                    }}>{r}</div>
                                ))}
                            </div>
                        </Card>

                        {/* 장점/단점 */}
                        <Card>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 8 }}>
                                        👍 장점 <span style={{ fontSize: 12, color: T.green, fontWeight: 400 }}>전체 공개</span>
                                    </div>
                                    <textarea value={pros} onChange={(e) => setPros(e.target.value)}
                                        placeholder="이 행사의 좋았던 점을 알려주세요" rows={4}
                                        style={{ ...inputStyle(pros), resize: 'none', fontFamily: 'inherit' }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 8 }}>
                                        👎 단점 <span style={{ fontSize: 12, color: T.gray, fontWeight: 400 }}>🔒 구독자 공개</span>
                                    </div>
                                    <textarea value={cons} onChange={(e) => setCons(e.target.value)}
                                        placeholder="아쉬웠던 점이 있다면 솔직하게 작성해주세요" rows={4}
                                        style={{ ...inputStyle(cons), resize: 'none', fontFamily: 'inherit' }} />
                                </div>
                            </div>
                        </Card>

                        {/* 재참가 의향 */}
                        <Card>
                            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 14 }}>재참가 의향</div>
                            <div style={{ display: 'flex', gap: 10 }}>
                                {[[true, '✅ 다시 참가할게요'], [false, '❌ 다음엔 다른 곳으로']].map(([v, l]) => (
                                    <div key={String(v)} onClick={() => setRepurchase(v)} style={{
                                        flex: 1, padding: 14, borderRadius: T.radiusMd, cursor: 'pointer',
                                        border: `2px solid ${repurchase === v ? (v ? T.green : T.red) : T.border}`,
                                        background: repurchase === v ? (v ? T.greenLt : T.redLt) : T.white,
                                        textAlign: 'center', fontSize: 14, fontWeight: 700,
                                        color: repurchase === v ? (v ? T.green : T.red) : T.gray,
                                        transition: 'all 0.15s',
                                    }}>{l}</div>
                                ))}
                            </div>
                        </Card>
                    </div>
                    {/* 하단 등록 버튼 */}
                    <div
                        onClick={isSubmitting ? null : handleSubmit}
                        style={{
                            marginTop: 16, background: isSubmitting ? T.gray : T.blue, borderRadius: T.radiusMd,
                            padding: 16, textAlign: 'center', color: '#fff', fontSize: 15,
                            fontWeight: 700, cursor: isSubmitting ? 'default' : 'pointer',
                            opacity: isSubmitting ? 0.7 : 1
                        }}
                    >
                        {isSubmitting ? '등록 중...' : '등록하기'}
                    </div>
                </div>
            </div>
        </div>
    );
}
