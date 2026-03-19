'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Search, X, Plus } from 'lucide-react';
import { T, inputStyle } from '@/lib/design-tokens';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';
import ChipGroup from '@/components/ui/ChipGroup';

/* ─── 상수 ───────────────────────────────────────────────────── */
const CHIPS = {
    seller: {
        pros: [
            '높은 집객력', '높은 구매력', '친절한 운영진', '체계적인 행사 운영',
            '넓은 부스 공간', '주차 편의', '적극적인 SNS 홍보', '합리적인 참가비',
            '좋은 접근성', '다양한 셀러 구성',
        ],
        cons: [
            '비싼 부스비', '홍보 부족', '그늘 없음', '운영 미흡',
            '좁은 통로', '불친절한 담당자', '주차 불편', '좁은 부스 공간',
            '주최사 소통 부재', '불공정 자리 배정',
        ],
    },
    foodtruck: {
        pros: [
            '높은 집객력', '안정적 전력 공급', '넓은 진입로', '효율적 폐수처리',
            '메뉴 보호 정책', '우수한 입지', '충분한 공간', '적극적인 홍보',
            '합리적인 참가비', '좋은 접근성',
        ],
        cons: [
            '전압 불안정', '좁은 진입로', '불공정 자리배정', '수도 미연결',
            '폐기물 처리 불편', '주최사 소통 부재', '홍보 부족', '비싼 참가비',
            '그늘 없음', '주차 불편',
        ],
    },
};

const REVENUE_RANGES = {
    seller: ['0~20만', '20~40만', '40~60만', '60~80만', '80~100만', '100~150만', '150~200만', '200만 이상'],
    foodtruck: ['0~30만', '30~70만', '70~100만', '100~150만', '150~200만', '200~300만', '300~400만', '400~500만', '500만 이상'],
};

const AGE_GROUPS = ['10대', '20대', '30대', '40대', '50대 이상', '전 연령층'];

const VISITOR_TYPES = [
    '가족 단위 (아이 동반)',
    '커플 / 연인',
    '친구 / 지인',
    '나홀로 방문객 (혼쇼족)',
    '관광객 / 외국인',
];

/* ─── Progress Bar ───────────────────────────────────────────── */
function ProgressBar({ count }) {
    const MAX = 3;
    const filled = Math.min(count, MAX);
    const isDone = filled >= MAX;
    const pct = Math.round((filled / MAX) * 100);
    return (
        <div style={{ background: isDone ? T.greenLt : T.blueLt, borderRadius: T.radiusLg, padding: '14px 18px', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: isDone ? T.green : T.blue }}>
                    {isDone ? '🎉 첫 달 무료 혜택 달성!' : `리뷰 ${filled}/${MAX} 완료 — ${MAX - filled}개 더 쓰면 첫 달 0원!`}
                </span>
                <span style={{ fontSize: 13, fontWeight: 900, color: isDone ? T.green : T.blue }}>{filled}/{MAX}</span>
            </div>
            <div style={{ height: 7, background: isDone ? T.green + '33' : T.blue + '33', borderRadius: 99 }}>
                <div style={{ height: '100%', borderRadius: 99, width: `${pct}%`, background: isDone ? T.green : T.blue, transition: 'width 0.4s ease', minWidth: filled > 0 ? 24 : 0 }} />
            </div>
        </div>
    );
}

/* ─── Star Rating Row ────────────────────────────────────────── */
const STAR_LABELS = ['', '별로에요', '아쉬워요', '보통이에요', '좋아요', '최고예요'];

function StarRow({ label, value, onChange }) {
    return (
        <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: value > 0 ? '#FFB800' : T.gray }}>
                    {value > 0 ? STAR_LABELS[value] : '선택하세요'}
                </span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 3, 4, 5].map(s => (
                    <div
                        key={s}
                        onClick={() => onChange(s)}
                        style={{
                            flex: 1, height: 44, borderRadius: T.radiusMd,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                            background: s <= value ? '#FFB800' : T.bg,
                            border: `1.5px solid ${s <= value ? '#FFB800' : T.border}`,
                            transition: 'all 0.15s',
                            fontSize: 18,
                        }}
                    >
                        {s <= value ? '★' : '☆'}
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Single Select Chips ────────────────────────────────────── */
function SingleChips({ options, value, onChange }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {options.map(opt => (
                <div
                    key={opt}
                    onClick={() => onChange(opt === value ? '' : opt)}
                    style={{
                        padding: '8px 16px', borderRadius: T.radiusFull, cursor: 'pointer',
                        fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
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
    );
}

/* ─── Multi Select Chips ─────────────────────────────────────── */
function MultiChips({ options, values, onChange }) {
    const toggle = (opt) => {
        const next = new Set(values);
        next.has(opt) ? next.delete(opt) : next.add(opt);
        onChange(next);
    };
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {options.map(opt => {
                const active = values.has(opt);
                return (
                    <div
                        key={opt}
                        onClick={() => toggle(opt)}
                        style={{
                            padding: '8px 16px', borderRadius: T.radiusFull, cursor: 'pointer',
                            fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
                            background: active ? T.blue : T.white,
                            color: active ? T.white : T.gray,
                            border: `1px solid ${active ? T.blue : T.border}`,
                            transition: 'all 0.15s',
                        }}
                    >
                        {opt}
                    </div>
                );
            })}
        </div>
    );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function ReviewWritePage() {
    const router = useRouter();

    const [events, setEvents] = useState([]);
    const [organizers, setOrganizers] = useState([]);
    const [reviewCount, setReviewCount] = useState(0);

    const [selectedEventId, setSelectedEventId] = useState('');
    const [selectedOrgId, setSelectedOrgId] = useState('');
    const [sellerType, setSellerType] = useState('seller');

    const [evtKeyword, setEvtKeyword] = useState('');
    const [orgKeyword, setOrgKeyword] = useState('');
    const [isEvtOpen, setIsEvtOpen] = useState(false);
    const [isOrgOpen, setIsOrgOpen] = useState(false);

    // 인라인 신규 추가 폼
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEvtName, setNewEvtName] = useState('');
    const [addingEvent, setAddingEvent] = useState(false);

    const [showAddOrg, setShowAddOrg] = useState(false);
    const [newOrgName, setNewOrgName] = useState('');
    const [addingOrg, setAddingOrg] = useState(false);

    // 별점 (일반셀러: 구매력/유동인구/운영지원/주최매너/홍보, 푸드트럭: 수익성/집객력/운영지원/매너)
    const [rPurchase, setRPurchase] = useState(0);   // 구매력 (seller)
    const [rProfit, setRProfit] = useState(0);        // 수익성 (foodtruck)
    const [rTraffic, setRTraffic] = useState(0);      // 유동인구 / 집객력
    const [rSupport, setRSupport] = useState(0);      // 운영지원
    const [rManners, setRManners] = useState(0);      // 주최 매너
    const [rPromotion, setRPromotion] = useState(0);  // 홍보 (seller only)

    // 일반셀러 전용 추가 항목
    const [revenueRange, setRevenueRange] = useState('');
    const [ageGroups, setAgeGroups] = useState(new Set());
    const [visitorTypes, setVisitorTypes] = useState(new Set());

    const [pros, setPros] = useState('');
    const [cons, setCons] = useState('');
    const [content, setContent] = useState('');
    const [showOverall, setShowOverall] = useState(false);

    const [prosChips, setProsChips] = useState(new Set());
    const [consChips, setConsChips] = useState(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);

    const evtRef = useRef(null);
    const orgRef = useRef(null);

    useEffect(() => {
        (async () => {
            const sb = createClient();
            const { data: { session } } = await sb.auth.getSession();
            const [eRes, oRes] = await Promise.all([
                sb.from('events').select('id, name, location').order('name'),
                sb.from('organizers').select('id, name').order('name'),
            ]);
            if (eRes.data) setEvents(eRes.data);
            if (oRes.data) setOrganizers(oRes.data);
            if (session?.user) {
                const { data: p } = await sb.from('profiles').select('review_count').eq('id', session.user.id).single();
                if (p) setReviewCount(p.review_count ?? 0);
            }
        })();
    }, []);

    useEffect(() => {
        const handler = e => {
            if (evtRef.current && !evtRef.current.contains(e.target)) setIsEvtOpen(false);
            if (orgRef.current && !orgRef.current.contains(e.target)) setIsOrgOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => {
        setProsChips(new Set()); setConsChips(new Set()); setPros(''); setCons('');
        setRPurchase(0); setRProfit(0); setRTraffic(0); setRSupport(0); setRManners(0); setRPromotion(0);
        setRevenueRange(''); setAgeGroups(new Set()); setVisitorTypes(new Set());
    }, [sellerType]);

    const toggleChip = (text, setValue, selected, setSelected) => {
        const next = new Set(selected);
        if (next.has(text)) {
            next.delete(text);
            setValue(prev => prev.split('\n').filter(l => l.trim() !== text).join('\n').trim());
        } else {
            next.add(text);
            setValue(prev => prev ? `${prev}\n${text}` : text);
        }
        setSelected(next);
    };

    const handleAddEvent = async () => {
        if (!newEvtName.trim()) return alert('행사명을 입력해주세요.');
        setAddingEvent(true);
        try {
            const sb = createClient();
            const { data, error } = await sb.from('events').insert({
                name: newEvtName.trim(), is_approved: false, source: 'user',
            }).select('id, name, location').single();
            if (error) throw error;
            setEvents(prev => [...prev, data]);
            setSelectedEventId(data.id); setEvtKeyword(data.name);
            setShowAddEvent(false); setNewEvtName('');
        } catch { alert('행사 추가 중 오류가 발생했습니다.'); }
        finally { setAddingEvent(false); }
    };

    const handleAddOrg = async () => {
        if (!newOrgName.trim()) return alert('주최사명을 입력해주세요.');
        setAddingOrg(true);
        try {
            const sb = createClient();
            const { data, error } = await sb.from('organizers').insert({ name: newOrgName.trim() }).select('id, name').single();
            if (error) throw error;
            setOrganizers(prev => [...prev, data]);
            setSelectedOrgId(data.id); setOrgKeyword(data.name);
            setShowAddOrg(false); setNewOrgName('');
        } catch { alert('주최사 추가 중 오류가 발생했습니다.'); }
        finally { setAddingOrg(false); }
    };

    const handleSubmit = async () => {
        if (!selectedEventId) return alert('참여하신 행사(장소)를 선택해주세요.');
        if (!selectedOrgId) return alert('주최사를 선택해주세요.');
        if ([rPurchase, rTraffic, rSupport, rManners, rPromotion].some(r => !r)) return alert('모든 항목의 별점을 입력해주세요.');
        if (!pros.trim()) return alert('장점을 입력해주세요.');
        if (!cons.trim()) return alert('단점을 입력해주세요.');

        setIsSubmitting(true);
        try {
            const sb = createClient();
            const { data: { session } } = await sb.auth.getSession();
            if (!session?.user) { alert('로그인이 필요합니다.'); router.push('/login'); return; }

            const payload = {
                event_id: selectedEventId,
                organizer_id: selectedOrgId,
                user_id: session.user.id,
                seller_type: sellerType,
                rating_profit: rPurchase,
                rating_traffic: rTraffic,
                rating_support: rSupport,
                rating_manners: rManners,
                rating_promotion: rPromotion,
                content: content || null,
                pros,
                cons,
                is_verified: false,
            };
            if (revenueRange) payload.revenue_range = revenueRange;
            if (ageGroups.size > 0) payload.age_groups = [...ageGroups];
            if (visitorTypes.size > 0) payload.visitor_types = [...visitorTypes];

            const { error } = await sb.from('company_reviews').insert(payload);
            if (error) throw error;
            alert('소중한 리뷰가 등록되었습니다! 혜택 카운트가 1 증가합니다.');
            router.push('/mypage');
        } catch (err) {
            console.error('리뷰 등록 에러:', err);
            alert('저장 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredEvents = evtKeyword
        ? events.filter(e =>
            e.name.toLowerCase().includes(evtKeyword.toLowerCase()) ||
            (e.location || '').toLowerCase().includes(evtKeyword.toLowerCase())
          )
        : events.slice(0, 20);
    const filteredOrgs = orgKeyword
        ? organizers.filter(o => o.name.toLowerCase().includes(orgKeyword.toLowerCase()))
        : organizers.slice(0, 20);

    const isSeller = sellerType === 'seller';
    const ratingValues = [rPurchase, rTraffic, rSupport, rManners, rPromotion];
    const overall = ratingValues.every(r => r > 0)
        ? (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1) : null;
    const currentChips = CHIPS[sellerType];

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 60 }}>
            <TopBar title="행사 리뷰 작성" back />

            <div className="page-padding">
                <ProgressBar count={reviewCount} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* ── 행사/주최사 선택 ── */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 18 }}>
                            어디서, 누구와 진행하셨나요?
                        </div>

                        {/* 행사 검색 */}
                        <div style={{ marginBottom: 20 }} ref={evtRef}>
                            <label style={{ fontSize: 13, fontWeight: 700, color: T.gray, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                                진행된 행사 (장소)
                                <span style={{ fontSize: 11, fontWeight: 700, color: T.red, background: T.redLt, padding: '1px 6px', borderRadius: T.radiusFull }}>필수</span>
                            </label>

                            {selectedEventId ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: T.blueLt, border: `1.5px solid ${T.blue}`, borderRadius: T.radiusMd, padding: '13px 16px' }}>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: T.blue }}>{evtKeyword}</div>
                                        <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>{events.find(e => e.id === selectedEventId)?.location || ''}</div>
                                    </div>
                                    <X size={16} color={T.blue} style={{ cursor: 'pointer' }} onClick={() => { setSelectedEventId(''); setEvtKeyword(''); setShowAddEvent(false); }} />
                                </div>
                            ) : (
                                <div style={{ position: 'relative' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.bg, borderRadius: T.radiusMd, border: `1.5px solid ${isEvtOpen ? T.blue : T.border}`, padding: '0 14px' }}>
                                        <Search size={15} color={isEvtOpen ? T.blue : T.gray} style={{ flexShrink: 0 }} />
                                        <input type="text" placeholder="행사명 또는 장소 검색..." value={evtKeyword}
                                            onChange={e => { setEvtKeyword(e.target.value); setIsEvtOpen(true); setShowAddEvent(false); }}
                                            onFocus={() => setIsEvtOpen(true)}
                                            style={{ flex: 1, padding: '13px 0', border: 'none', background: 'transparent', fontSize: 14, color: T.text, outline: 'none' }} />
                                        {evtKeyword && <X size={15} color={T.gray} style={{ cursor: 'pointer' }} onClick={() => { setEvtKeyword(''); setShowAddEvent(false); }} />}
                                    </div>
                                    {isEvtOpen && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd, boxShadow: T.shadowMd, maxHeight: 220, overflowY: 'auto', zIndex: 200 }}>
                                            {filteredEvents.length > 0 ? filteredEvents.map((item, i) => (
                                                <div key={item.id} onClick={() => { setSelectedEventId(item.id); setEvtKeyword(item.name); setIsEvtOpen(false); }}
                                                    style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: i < filteredEvents.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                                                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{item.name}</div>
                                                    {item.location && <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>📍 {item.location}</div>}
                                                </div>
                                            )) : (
                                                <div style={{ padding: '12px 16px', color: T.gray, fontSize: 13 }}>검색 결과가 없어요.</div>
                                            )}
                                            <div onClick={() => { setIsEvtOpen(false); setShowAddEvent(true); setNewEvtName(evtKeyword); }}
                                                style={{ padding: '13px 16px', cursor: 'pointer', borderTop: `1px solid ${T.border}`, fontSize: 14, fontWeight: 700, color: T.blue, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <Plus size={15} /> 새 행사 직접 추가하기
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {showAddEvent && (
                                <div style={{ marginTop: 12, background: T.blueLt, borderRadius: T.radiusMd, padding: 16, border: `1.5px solid ${T.blue}` }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: T.blue, marginBottom: 12 }}>새 행사 추가</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        <input value={newEvtName} onChange={e => setNewEvtName(e.target.value)} placeholder="행사명을 입력해주세요" style={{ ...inputStyle(newEvtName), marginBottom: 0 }} />
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <div onClick={() => { setShowAddEvent(false); setNewEvtName(''); }} style={{ flex: 1, padding: '11px 0', textAlign: 'center', border: `1px solid ${T.border}`, borderRadius: T.radiusMd, fontSize: 14, fontWeight: 700, color: T.gray, cursor: 'pointer', background: T.white }}>취소</div>
                                            <div onClick={addingEvent ? null : handleAddEvent} style={{ flex: 2, padding: '11px 0', textAlign: 'center', background: addingEvent ? T.gray : T.blue, borderRadius: T.radiusMd, fontSize: 14, fontWeight: 700, color: '#fff', cursor: addingEvent ? 'default' : 'pointer' }}>{addingEvent ? '추가 중...' : '추가하기'}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 주최사 검색 */}
                        <div ref={orgRef}>
                            <label style={{ fontSize: 13, fontWeight: 700, color: T.gray, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                                주최사
                                <span style={{ fontSize: 11, fontWeight: 700, color: T.red, background: T.redLt, padding: '1px 6px', borderRadius: T.radiusFull }}>필수</span>
                            </label>

                            {selectedOrgId ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: T.blueLt, border: `1.5px solid ${T.blue}`, borderRadius: T.radiusMd, padding: '13px 16px' }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: T.blue }}>{orgKeyword}</div>
                                    <X size={16} color={T.blue} style={{ cursor: 'pointer' }} onClick={() => { setSelectedOrgId(''); setOrgKeyword(''); setShowAddOrg(false); }} />
                                </div>
                            ) : (
                                <div style={{ position: 'relative' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.bg, borderRadius: T.radiusMd, border: `1.5px solid ${isOrgOpen ? T.blue : T.border}`, padding: '0 14px' }}>
                                        <Search size={15} color={isOrgOpen ? T.blue : T.gray} style={{ flexShrink: 0 }} />
                                        <input type="text" placeholder="주최사 검색..." value={orgKeyword}
                                            onChange={e => { setOrgKeyword(e.target.value); setIsOrgOpen(true); setShowAddOrg(false); }}
                                            onFocus={() => setIsOrgOpen(true)}
                                            style={{ flex: 1, padding: '13px 0', border: 'none', background: 'transparent', fontSize: 14, color: T.text, outline: 'none' }} />
                                        {orgKeyword && <X size={15} color={T.gray} style={{ cursor: 'pointer' }} onClick={() => { setOrgKeyword(''); setShowAddOrg(false); }} />}
                                    </div>
                                    {isOrgOpen && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd, boxShadow: T.shadowMd, maxHeight: 220, overflowY: 'auto', zIndex: 200 }}>
                                            {filteredOrgs.length > 0 ? filteredOrgs.map((item, i) => (
                                                <div key={item.id} onClick={() => { setSelectedOrgId(item.id); setOrgKeyword(item.name); setIsOrgOpen(false); }}
                                                    style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: i < filteredOrgs.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                                                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{item.name}</div>
                                                </div>
                                            )) : (
                                                <div style={{ padding: '12px 16px', color: T.gray, fontSize: 13 }}>검색 결과가 없어요.</div>
                                            )}
                                            <div onClick={() => { setIsOrgOpen(false); setShowAddOrg(true); setNewOrgName(orgKeyword); }}
                                                style={{ padding: '13px 16px', cursor: 'pointer', borderTop: `1px solid ${T.border}`, fontSize: 14, fontWeight: 700, color: T.blue, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <Plus size={15} /> 주최사 직접 추가하기
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {showAddOrg && (
                                <div style={{ marginTop: 12, background: T.blueLt, borderRadius: T.radiusMd, padding: 16, border: `1.5px solid ${T.blue}` }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: T.blue, marginBottom: 12 }}>주최사 추가</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        <input value={newOrgName} onChange={e => setNewOrgName(e.target.value)} placeholder="주최사명을 입력해주세요" style={{ ...inputStyle(newOrgName), marginBottom: 0 }} />
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <div onClick={() => { setShowAddOrg(false); setNewOrgName(''); }} style={{ flex: 1, padding: '11px 0', textAlign: 'center', border: `1px solid ${T.border}`, borderRadius: T.radiusMd, fontSize: 14, fontWeight: 700, color: T.gray, cursor: 'pointer', background: T.white }}>취소</div>
                                            <div onClick={addingOrg ? null : handleAddOrg} style={{ flex: 2, padding: '11px 0', textAlign: 'center', background: addingOrg ? T.gray : T.blue, borderRadius: T.radiusMd, fontSize: 14, fontWeight: 700, color: '#fff', cursor: addingOrg ? 'default' : 'pointer' }}>{addingOrg ? '추가 중...' : '추가하기'}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* ── 셀러 유형 ── */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 14 }}>셀러 유형 선택</div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            {[
                                { key: 'seller', label: '💎 일반 셀러', desc: '소품, 핸드메이드, 의류 등' },
                                { key: 'foodtruck', label: '🚚 푸드트럭', desc: '음식, 음료, 식품 판매' },
                            ].map(({ key, label, desc }) => (
                                <div key={key} onClick={() => setSellerType(key)} style={{ flex: 1, padding: '14px 12px', borderRadius: T.radiusLg, cursor: 'pointer', border: `2px solid ${sellerType === key ? T.blue : T.border}`, background: sellerType === key ? T.blueLt : T.white, transition: 'all 0.15s' }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: sellerType === key ? T.blue : T.text, marginBottom: 3 }}>{label}</div>
                                    <div style={{ fontSize: 11, color: T.gray }}>{desc}</div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* ── 상세 별점 ── */}
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>상세 평가</div>
                            {overall && (
                                <div style={{ background: T.blueLt, borderRadius: 10, padding: '6px 14px', fontSize: 13, fontWeight: 700, color: T.blue }}>종합 ★ {overall}</div>
                            )}
                        </div>

                        <div style={{ fontSize: 12, color: T.gray, fontWeight: 600, marginBottom: 12 }}>📍 행사/장소 관련</div>
                        <StarRow label="💳 구매력" value={rPurchase} onChange={setRPurchase} />
                        <StarRow label="👥 유동인구" value={rTraffic} onChange={setRTraffic} />

                        <div style={{ fontSize: 12, color: T.gray, fontWeight: 600, marginBottom: 12, marginTop: 8 }}>🏢 주최사 관련</div>
                        <StarRow label="🤝 운영지원" value={rSupport} onChange={setRSupport} />
                        <StarRow label="😊 주최사 매너" value={rManners} onChange={setRManners} />
                        <StarRow label="📣 홍보" value={rPromotion} onChange={setRPromotion} />
                    </Card>

                    {/* ── 매출액 ── */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 6 }}>💰 매출액</div>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 14 }}>이번 행사에서의 대략적인 매출을 선택해주세요</div>
                        <SingleChips options={REVENUE_RANGES[sellerType] ?? REVENUE_RANGES.seller} value={revenueRange} onChange={setRevenueRange} />
                    </Card>

                    {/* ── 연령대 ── */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 6 }}>👥 방문객 연령대</div>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 14 }}>주로 어떤 연령대가 방문했나요? (복수 선택)</div>
                        <MultiChips options={AGE_GROUPS} values={ageGroups} onChange={setAgeGroups} />
                    </Card>

                    {/* ── 방문 유형 ── */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 6 }}>🚶 방문 유형 / 구성</div>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 14 }}>주요 방문객 유형을 선택해주세요 (복수 선택)</div>
                        <MultiChips options={VISITOR_TYPES} values={visitorTypes} onChange={setVisitorTypes} />
                    </Card>

                    {/* ── 장점 ── */}
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 16, fontWeight: 800, color: T.text }}>👍 장점</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: T.red, background: T.redLt, padding: '2px 7px', borderRadius: T.radiusFull }}>필수</span>
                        </div>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 12 }}>직접 쓰거나 아래 키워드를 눌러 빠르게 추가하세요</div>
                        <textarea value={pros} onChange={e => setPros(e.target.value)} placeholder="좋았던 점을 적어주세요." rows={3} style={{ ...inputStyle(pros), resize: 'none', fontFamily: 'inherit' }} />
                        <div style={{ marginTop: 12 }}>
                            <ChipGroup chips={currentChips.pros} selected={prosChips} onToggle={text => toggleChip(text, setPros, prosChips, setProsChips)} />
                        </div>
                    </Card>

                    {/* ── 단점 ── */}
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 16, fontWeight: 800, color: T.text }}>👎 단점</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: T.red, background: T.redLt, padding: '2px 7px', borderRadius: T.radiusFull }}>필수</span>
                        </div>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 12 }}>직접 쓰거나 아래 키워드를 눌러 빠르게 추가하세요</div>
                        <textarea value={cons} onChange={e => setCons(e.target.value)} placeholder="아쉬웠던 점을 적어주세요." rows={3} style={{ ...inputStyle(cons), resize: 'none', fontFamily: 'inherit' }} />
                        <div style={{ marginTop: 12 }}>
                            <ChipGroup chips={currentChips.cons} selected={consChips} onToggle={text => toggleChip(text, setCons, consChips, setConsChips)} />
                        </div>
                    </Card>

                    {/* ── 종합 평가 (선택) ── */}
                    <Card padding={0}>
                        <div onClick={() => setShowOverall(v => !v)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', cursor: 'pointer' }}>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>📝 종합 평가</div>
                                <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>선택 사항 — 자세한 경험을 자유롭게 공유해보세요</div>
                            </div>
                            <ChevronDown size={20} color={T.gray} style={{ transform: showOverall ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                        </div>
                        {showOverall && (
                            <div style={{ padding: '0 20px 20px' }}>
                                <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="자세한 경험을 자유롭게 공유해주세요." rows={4} style={{ ...inputStyle(content), resize: 'none', fontFamily: 'inherit' }} />
                            </div>
                        )}
                    </Card>

                    {/* ── 제출 ── */}
                    <div onClick={isSubmitting ? null : handleSubmit} style={{ background: isSubmitting ? T.gray : T.blue, borderRadius: T.radiusMd, padding: 18, textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: 800, cursor: isSubmitting ? 'default' : 'pointer', transition: 'background 0.15s' }}>
                        {isSubmitting ? '처리 중...' : '리뷰 등록하고 무료 혜택 받기 🎁'}
                    </div>

                </div>
            </div>
        </div>
    );
}
