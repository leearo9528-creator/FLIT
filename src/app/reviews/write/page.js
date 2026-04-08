'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Plus } from 'lucide-react';
import { T, inputStyle } from '@/lib/design-tokens';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/lib/auth-context';
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
    seller:    ['0~20만', '20~40만', '40~60만', '60~80만', '80~100만', '100~150만', '150~200만', '200만 이상'],
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

/* ─── 열람권 안내 배너 ────────────────────────────────────────── */
function ReviewBanner() {
    return (
        <div style={{ background: T.blueLt, borderRadius: T.radiusLg, padding: '14px 18px', marginBottom: 20, border: `1px solid ${T.blue}30` }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: T.blue, marginBottom: 4 }}>
                📝 리뷰 1개 작성 → 1주일간 전체 열람
            </div>
            <div style={{ fontSize: 12, color: T.gray, lineHeight: 1.6 }}>
                다른 셀러의 매출·평점·방문객 데이터를 확인할 수 있어요. 매주 월요일 자정에 리셋됩니다.
            </div>
        </div>
    );
}

/* ─── Star Rating Row ────────────────────────────────────────── */
const STAR_LABELS = ['', '별로에요', '아쉬워요', '보통이에요', '좋아요', '최고예요'];

function StarRow({ label, value, onChange, color = '#FFB800' }) {
    return (
        <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: value > 0 ? color : T.gray }}>
                    {value > 0 ? STAR_LABELS[value] : '선택하세요'}
                </span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 3, 4, 5].map(s => (
                    <div
                        key={s}
                        onClick={() => onChange(s === value ? 0 : s)}
                        style={{
                            flex: 1, height: 44, borderRadius: T.radiusMd,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                            background: s <= value ? color + '22' : T.bg,
                            border: `1.5px solid ${s <= value ? color : T.border}`,
                            transition: 'all 0.12s',
                            fontSize: 18,
                            color: s <= value ? color : T.gray,
                        }}
                    >
                        {s <= value ? '★' : '☆'}
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Chips ──────────────────────────────────────────────────── */
function SingleChips({ options, value, onChange }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {options.map(opt => (
                <div key={opt} onClick={() => onChange(opt === value ? '' : opt)} style={{
                    padding: '8px 16px', borderRadius: T.radiusFull, cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
                    background: value === opt ? T.text : T.white,
                    color: value === opt ? T.white : T.gray,
                    border: `1px solid ${value === opt ? T.text : T.border}`,
                    transition: 'all 0.15s',
                }}>{opt}</div>
            ))}
        </div>
    );
}

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
                    <div key={opt} onClick={() => toggle(opt)} style={{
                        padding: '8px 16px', borderRadius: T.radiusFull, cursor: 'pointer',
                        fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
                        background: active ? T.blue : T.white,
                        color: active ? T.white : T.gray,
                        border: `1px solid ${active ? T.blue : T.border}`,
                        transition: 'all 0.15s',
                    }}>{opt}</div>
                );
            })}
        </div>
    );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function ReviewWritePage() {
    const router = useRouter();
    const { user, loading: authLoading, refreshPlan } = useAuth();

    const [instances, setInstances] = useState([]);
    const [reviewCount, setReviewCount] = useState(0);

    // 행사 선택 (event_instance 기준)
    const [selectedInstance, setSelectedInstance] = useState(null); // { id, event_date, base_event, organizer }
    const [instKeyword, setInstKeyword] = useState('');
    const [isInstOpen, setIsInstOpen] = useState(false);

    // 새 행사 직접 추가
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEvtName, setNewEvtName] = useState('');
    const [newEvtStart, setNewEvtStart] = useState('');
    const [newEvtEnd, setNewEvtEnd] = useState('');
    const [addingEvent, setAddingEvent] = useState(false);

    const [sellerType, setSellerType] = useState('seller');

    const [rProfit, setRProfit]     = useState(0);
    const [rTraffic, setRTraffic]   = useState(0);
    const [rSupport, setRSupport]   = useState(0);
    const [rManners, setRManners]   = useState(0);
    const [rPromotion, setRPromotion] = useState(0);

    const [revenueRange, setRevenueRange]   = useState('');
    const [ageGroups, setAgeGroups]         = useState(new Set());
    const [visitorTypes, setVisitorTypes]   = useState(new Set());

    const [pros, setPros]     = useState('');
    const [cons, setCons]     = useState('');
    const [content, setContent] = useState('');

    const [prosChips, setProsChips] = useState(new Set());
    const [consChips, setConsChips] = useState(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);

    const instRef = useRef(null);

    useEffect(() => {
        if (authLoading) return;
        if (!user) { router.replace('/login'); return; }
        (async () => {
            const sb = createClient();
            const [instRes, profileRes] = await Promise.all([
                sb.from('event_instances')
                    .select('id, event_date, event_date_end, location, base_event:base_events(id, name), organizer:organizers(id, name)')
                    .order('event_date', { ascending: false })
                    .limit(200),
                sb.from('profiles').select('review_count').eq('id', user.id).maybeSingle(),
            ]);
            if (instRes.data) setInstances(instRes.data);
            if (profileRes.data) setReviewCount(profileRes.data.review_count ?? 0);
        })();
    }, [user, authLoading, router]);

    useEffect(() => {
        const handler = e => {
            if (instRef.current && !instRef.current.contains(e.target)) setIsInstOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => {
        setProsChips(new Set()); setConsChips(new Set()); setPros(''); setCons('');
        setRProfit(0); setRTraffic(0); setRSupport(0); setRManners(0); setRPromotion(0);
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
        if (!newEvtStart) return alert('행사 시작일을 선택해주세요.');
        if (!newEvtEnd) return alert('행사 마감일을 선택해주세요.');
        if (newEvtEnd < newEvtStart) return alert('마감일은 시작일 이후여야 합니다.');
        setAddingEvent(true);
        try {
            const sb = createClient();
            // 1. base_event 생성
            const { data: ev, error: evErr } = await sb
                .from('base_events').insert({ name: newEvtName.trim() }).select('id, name').maybeSingle();
            if (evErr) throw evErr;
            // 2. event_instance 생성
            const { data: inst, error: instErr } = await sb
                .from('event_instances').insert({
                    base_event_id: ev.id,
                    event_date: newEvtStart,
                    event_date_end: newEvtEnd,
                }).select('id, event_date, event_date_end, base_event:base_events(id, name), organizer:organizers(id, name)').maybeSingle();
            if (instErr) throw instErr;
            setInstances(prev => [inst, ...prev]);
            setSelectedInstance(inst);
            setInstKeyword(ev.name);
            setShowAddEvent(false); setNewEvtName(''); setNewEvtStart(''); setNewEvtEnd('');
        } catch (err) {
            console.error(err);
            alert('행사 추가 중 오류가 발생했습니다.');
        } finally {
            setAddingEvent(false); }
    };

    const handleSubmit = async () => {
        if (!selectedInstance) return alert('참여하신 행사를 선택해주세요.');
        if ([rProfit, rTraffic, rSupport, rManners].some(r => !r)) return alert('필수 별점 항목을 모두 입력해주세요.');
        if (!pros.trim()) return alert('장점을 입력해주세요.');
        if (!cons.trim()) return alert('단점을 입력해주세요.');

        if (!user) { alert('로그인이 필요합니다.'); router.push('/login'); return; }
        setIsSubmitting(true);
        try {
            const sb = createClient();

            const payload = {
                event_instance_id: selectedInstance.id,
                user_id: user.id,
                seller_type: sellerType,
                rating_profit: rProfit,
                rating_traffic: rTraffic,
                rating_support: rSupport,
                rating_manners: rManners,
                rating_promotion: rPromotion || null,
                content: content.trim() || null,
                pros: pros.trim(),
                cons: cons.trim(),
                is_verified: false,
            };
            if (revenueRange) payload.revenue_range = revenueRange;
            if (ageGroups.size > 0) payload.age_groups = [...ageGroups];
            if (visitorTypes.size > 0) payload.visitor_types = [...visitorTypes];

            const { error } = await sb.from('reviews').insert(payload);
            if (error) throw error;

            // 리뷰 카운트 갱신 + 열람 권한 타이머 시작
            const { error: profileErr } = await sb.from('profiles').update({
                review_count: reviewCount + 1,
                last_review_at: new Date().toISOString(),
            }).eq('id', user.id);
            if (profileErr) console.error('프로필 업데이트 실패:', profileErr);

            await refreshPlan();
            router.push('/mypage');
        } catch (err) {
            console.error('리뷰 등록 에러:', err);
            alert('저장 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredInsts = instKeyword
        ? instances.filter(i =>
            (i.base_event?.name || '').toLowerCase().includes(instKeyword.toLowerCase()) ||
            (i.organizer?.name || '').toLowerCase().includes(instKeyword.toLowerCase()) ||
            (i.location || '').toLowerCase().includes(instKeyword.toLowerCase())
          )
        : instances.slice(0, 30);

    const isSeller = sellerType === 'seller';
    const currentChips = CHIPS[sellerType];

    const ratingScores = [rProfit, rTraffic, rSupport, rManners, rPromotion].filter(r => r > 0);
    const overall = ratingScores.length >= 4
        ? (ratingScores.reduce((a, b) => a + b, 0) / ratingScores.length).toFixed(1) : null;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 60 }}>
            <TopBar title="행사 리뷰 작성" back />

            <div className="page-padding">
                <ReviewBanner />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* ── 행사 선택 ── */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 4 }}>어떤 행사에 참여하셨나요?</div>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 16 }}>행사명 또는 주최사로 검색하세요</div>

                        <div ref={instRef}>
                            {selectedInstance ? (
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    background: T.blueLt, border: `1.5px solid ${T.blue}`, borderRadius: T.radiusMd, padding: '14px 16px',
                                }}>
                                    <div>
                                        <div style={{ fontSize: 15, fontWeight: 800, color: T.blue }}>
                                            {selectedInstance.base_event?.name || '행사명 없음'}
                                        </div>
                                        <div style={{ fontSize: 12, color: T.textSub, marginTop: 3 }}>
                                            {selectedInstance.organizer?.name && `${selectedInstance.organizer.name} · `}
                                            {selectedInstance.event_date && new Date(selectedInstance.event_date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                    </div>
                                    <X size={16} color={T.blue} style={{ cursor: 'pointer', flexShrink: 0 }}
                                        onClick={() => { setSelectedInstance(null); setInstKeyword(''); }} />
                                </div>
                            ) : (
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 8, background: T.bg,
                                        borderRadius: T.radiusMd, border: `1.5px solid ${isInstOpen ? T.blue : T.border}`, padding: '0 14px',
                                    }}>
                                        <Search size={15} color={isInstOpen ? T.blue : T.gray} style={{ flexShrink: 0 }} />
                                        <input
                                            type="text" placeholder="행사명, 주최사, 장소 검색..."
                                            value={instKeyword}
                                            onChange={e => { setInstKeyword(e.target.value); setIsInstOpen(true); setShowAddEvent(false); }}
                                            onFocus={() => setIsInstOpen(true)}
                                            style={{ flex: 1, padding: '13px 0', border: 'none', background: 'transparent', fontSize: 14, color: T.text, outline: 'none' }}
                                        />
                                        {instKeyword && <X size={15} color={T.gray} style={{ cursor: 'pointer' }} onClick={() => { setInstKeyword(''); setShowAddEvent(false); }} />}
                                    </div>
                                    {isInstOpen && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd, boxShadow: T.shadowMd, maxHeight: 240, overflowY: 'auto', zIndex: 200 }}>
                                            {filteredInsts.length > 0 ? filteredInsts.map((inst, i) => (
                                                <div key={inst.id}
                                                    onClick={() => { setSelectedInstance(inst); setInstKeyword(inst.base_event?.name || ''); setIsInstOpen(false); }}
                                                    style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: i < filteredInsts.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                                                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{inst.base_event?.name || '행사명 없음'}</div>
                                                    <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>
                                                        {[inst.organizer?.name, inst.event_date && new Date(inst.event_date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })].filter(Boolean).join(' · ')}
                                                    </div>
                                                </div>
                                            )) : (
                                                <div style={{ padding: '12px 16px', color: T.gray, fontSize: 13 }}>검색 결과가 없어요.</div>
                                            )}
                                            <div
                                                onClick={() => { setIsInstOpen(false); setShowAddEvent(true); setNewEvtName(instKeyword); }}
                                                style={{ padding: '13px 16px', cursor: 'pointer', borderTop: `1px solid ${T.border}`, fontSize: 14, fontWeight: 700, color: T.blue, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <Plus size={15} /> 행사가 없으면 직접 추가하기
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {showAddEvent && (
                                <div style={{ marginTop: 12, background: T.blueLt, borderRadius: T.radiusMd, padding: 16, border: `1.5px solid ${T.blue}` }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: T.blue, marginBottom: 12 }}>새 행사 추가</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        <input value={newEvtName} onChange={e => setNewEvtName(e.target.value)}
                                            placeholder="행사명을 입력해주세요"
                                            style={{ width: '100%', padding: '11px 14px', fontSize: 14, color: T.text, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, outline: 'none', background: T.white, boxSizing: 'border-box' }} />
                                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 11, fontWeight: 700, color: T.blue, marginBottom: 4 }}>시작일</div>
                                                <input type="date" value={newEvtStart} onChange={e => setNewEvtStart(e.target.value)}
                                                    style={{ width: '100%', padding: '11px 14px', fontSize: 14, color: T.text, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, outline: 'none', background: T.white, boxSizing: 'border-box' }} />
                                            </div>
                                            <div style={{ fontSize: 14, color: T.gray, marginTop: 16 }}>~</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 11, fontWeight: 700, color: T.blue, marginBottom: 4 }}>마감일</div>
                                                <input type="date" value={newEvtEnd} min={newEvtStart || undefined} onChange={e => setNewEvtEnd(e.target.value)}
                                                    style={{ width: '100%', padding: '11px 14px', fontSize: 14, color: T.text, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, outline: 'none', background: T.white, boxSizing: 'border-box' }} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <div onClick={() => { setShowAddEvent(false); setNewEvtName(''); setNewEvtStart(''); setNewEvtEnd(''); }}
                                                style={{ flex: 1, padding: '11px 0', textAlign: 'center', border: `1px solid ${T.border}`, borderRadius: T.radiusMd, fontSize: 14, fontWeight: 700, color: T.gray, cursor: 'pointer', background: T.white }}>취소</div>
                                            <div onClick={addingEvent ? null : handleAddEvent}
                                                style={{ flex: 2, padding: '11px 0', textAlign: 'center', background: addingEvent ? T.gray : T.blue, borderRadius: T.radiusMd, fontSize: 14, fontWeight: 700, color: '#fff', cursor: addingEvent ? 'default' : 'pointer' }}>{addingEvent ? '추가 중...' : '추가하기'}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* ── 셀러 유형 ── */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 14 }}>셀러 유형</div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            {[
                                { key: 'seller', label: '💎 일반 셀러', desc: '소품, 핸드메이드, 의류 등' },
                                { key: 'foodtruck', label: '🚚 푸드트럭', desc: '음식, 음료, 식품 판매' },
                            ].map(({ key, label, desc }) => (
                                <div key={key} onClick={() => setSellerType(key)} style={{
                                    flex: 1, padding: '14px 12px', borderRadius: T.radiusLg, cursor: 'pointer',
                                    border: `2px solid ${sellerType === key ? T.blue : T.border}`,
                                    background: sellerType === key ? T.blueLt : T.white, transition: 'all 0.15s',
                                }}>
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
                                <div style={{ background: T.blueLt, borderRadius: 10, padding: '6px 14px', fontSize: 13, fontWeight: 700, color: T.blue }}>
                                    종합 ★ {overall}
                                </div>
                            )}
                        </div>

                        <div style={{ fontSize: 12, color: T.gray, fontWeight: 700, marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${T.border}` }}>
                            📍 행사/장소 관련
                        </div>
                        <StarRow label="💰 구매력" value={rProfit} onChange={setRProfit} color="#10B981" />
                        <StarRow label="👥 유동인구 / 집객력" value={rTraffic} onChange={setRTraffic} color="#3B82F6" />

                        <div style={{ fontSize: 12, color: T.gray, fontWeight: 700, marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${T.border}`, marginTop: 6 }}>
                            🏢 주최사 관련
                        </div>
                        <StarRow label="🤝 운영지원" value={rSupport} onChange={setRSupport} color="#F59E0B" />
                        <StarRow label="😊 주최사 매너" value={rManners} onChange={setRManners} color="#E91E63" />
                        <StarRow label="📣 홍보 (선택)" value={rPromotion} onChange={setRPromotion} color="#8B5CF6" />
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
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 6 }}>🚶 방문 유형</div>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 14 }}>주요 방문객 유형을 선택해주세요 (복수 선택)</div>
                        <MultiChips options={VISITOR_TYPES} values={visitorTypes} onChange={setVisitorTypes} />
                    </Card>

                    {/* ── 장점 ── */}
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 16, fontWeight: 800, color: T.text }}>👍 장점</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: T.red, background: T.redLt, padding: '2px 7px', borderRadius: T.radiusFull }}>필수</span>
                        </div>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 12 }}>아래 키워드를 탭하거나 직접 입력하세요</div>
                        <div style={{ marginBottom: 12 }}>
                            <ChipGroup chips={currentChips.pros} selected={prosChips} onToggle={text => toggleChip(text, setPros, prosChips, setProsChips)} />
                        </div>
                        <textarea value={pros} onChange={e => setPros(e.target.value)}
                            placeholder="좋았던 점을 적어주세요." rows={3}
                            style={{ width: '100%', padding: '12px 14px', fontSize: 14, color: T.text, border: `1.5px solid ${pros ? T.green : T.border}`, borderRadius: T.radiusMd, outline: 'none', background: T.bg, resize: 'none', lineHeight: 1.7, fontFamily: 'inherit', boxSizing: 'border-box' }}
                        />
                    </Card>

                    {/* ── 단점 ── */}
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 16, fontWeight: 800, color: T.text }}>👎 단점</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: T.red, background: T.redLt, padding: '2px 7px', borderRadius: T.radiusFull }}>필수</span>
                        </div>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 12 }}>아래 키워드를 탭하거나 직접 입력하세요</div>
                        <div style={{ marginBottom: 12 }}>
                            <ChipGroup chips={currentChips.cons} selected={consChips} onToggle={text => toggleChip(text, setCons, consChips, setConsChips)} />
                        </div>
                        <textarea value={cons} onChange={e => setCons(e.target.value)}
                            placeholder="아쉬웠던 점을 적어주세요." rows={3}
                            style={{ width: '100%', padding: '12px 14px', fontSize: 14, color: T.text, border: `1.5px solid ${cons ? T.red : T.border}`, borderRadius: T.radiusMd, outline: 'none', background: T.bg, resize: 'none', lineHeight: 1.7, fontFamily: 'inherit', boxSizing: 'border-box' }}
                        />
                    </Card>

                    {/* ── 종합 평가 (선택) ── */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 4 }}>📝 종합 평가</div>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 12 }}>선택 사항 — 자유롭게 경험을 공유해보세요</div>
                        <textarea value={content} onChange={e => setContent(e.target.value)}
                            placeholder="자세한 경험을 자유롭게 공유해주세요." rows={4}
                            style={{ width: '100%', padding: '12px 14px', fontSize: 14, color: T.text, border: `1.5px solid ${content ? T.blue : T.border}`, borderRadius: T.radiusMd, outline: 'none', background: T.bg, resize: 'none', lineHeight: 1.7, fontFamily: 'inherit', boxSizing: 'border-box' }}
                        />
                    </Card>

                    {/* ── 제출 ── */}
                    <div
                        onClick={isSubmitting ? null : handleSubmit}
                        style={{
                            background: isSubmitting ? T.gray : `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
                            borderRadius: T.radiusMd, padding: '18px', textAlign: 'center',
                            color: '#fff', fontSize: 16, fontWeight: 800,
                            cursor: isSubmitting ? 'default' : 'pointer', transition: 'opacity 0.15s',
                        }}
                    >
                        {isSubmitting ? '처리 중...' : '리뷰 등록하기'}
                    </div>
                </div>
            </div>
        </div>
    );
}
