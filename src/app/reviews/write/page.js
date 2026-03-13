'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Search, X } from 'lucide-react';
import { T, inputStyle } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

/* ─── Keyword chip data ─────────────────────────────────────── */
const CHIPS = {
    seller: {
        pros: ['높은 집객력', '친절한 운영진', '주차 편의', '매출 우수', '체계적 운영', '넓은 부스 공간'],
        cons: ['비싼 부스비', '홍보 부족', '그늘 없음', '운영 미흡', '좁은 통로', '불친절한 담당자'],
    },
    foodtruck: {
        pros: ['안정적 전력 공급', '넓은 진입로', '효율적 폐수처리', '메뉴 보호 정책', '우수한 입지', '충분한 공간'],
        cons: ['전압 불안정', '좁은 진입로', '불공정 자리배정', '수도 미연결', '폐기물 처리 불편', '주최측 소통 부재'],
    },
};

/* ─── Progress Bar ───────────────────────────────────────────── */
function ProgressBar({ count }) {
    const MAX = 3;
    const filled = Math.min(count, MAX);
    const isDone = filled >= MAX;
    const pct = Math.round((filled / MAX) * 100);

    return (
        <div style={{
            background: isDone ? T.greenLt : T.blueLt,
            borderRadius: T.radiusLg,
            padding: '14px 18px',
            marginBottom: 20,
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: isDone ? T.green : T.blue }}>
                    {isDone
                        ? '🎉 첫 달 무료 혜택 달성!'
                        : `리뷰 ${filled}/${MAX} 완료 — ${MAX - filled}개 더 쓰면 첫 달 0원!`}
                </span>
                <span style={{ fontSize: 13, fontWeight: 900, color: isDone ? T.green : T.blue }}>
                    {filled}/{MAX}
                </span>
            </div>
            <div style={{ height: 7, background: isDone ? T.green + '33' : T.blue + '33', borderRadius: 99 }}>
                <div style={{
                    height: '100%', borderRadius: 99,
                    width: `${pct}%`,
                    background: isDone ? T.green : T.blue,
                    transition: 'width 0.4s ease',
                    minWidth: filled > 0 ? 24 : 0,
                }} />
            </div>
        </div>
    );
}

/* ─── Chip Group ─────────────────────────────────────────────── */
function ChipGroup({ chips, selected, onToggle }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {chips.map(chip => {
                const active = selected.has(chip);
                return (
                    <button
                        key={chip}
                        type="button"
                        onClick={() => onToggle(chip)}
                        style={{
                            padding: '7px 14px',
                            borderRadius: T.radiusFull,
                            fontSize: 13, fontWeight: 600,
                            cursor: 'pointer',
                            border: `1.5px solid ${active ? T.blue : T.border}`,
                            background: active ? T.blue : T.blueLt,
                            color: active ? '#fff' : T.blue,
                            transition: 'all 0.15s',
                        }}
                    >
                        {chip}
                    </button>
                );
            })}
        </div>
    );
}

/* ─── Autocomplete Input ─────────────────────────────────────── */
function AutocompleteInput({ label, required, placeholder, value, onChange, open, setOpen, items, onSelect, footer, inputRef }) {
    return (
        <div ref={inputRef}>
            <label style={{ fontSize: 13, fontWeight: 700, color: T.gray, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                {label}
                {required && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.red, background: T.redLt, padding: '1px 6px', borderRadius: T.radiusFull }}>
                        필수
                    </span>
                )}
            </label>
            <div style={{ position: 'relative' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: T.bg, borderRadius: T.radiusMd,
                    border: `1.5px solid ${value ? T.blue : T.border}`, padding: '0 14px',
                }}>
                    <Search size={15} color={T.gray} style={{ flexShrink: 0 }} />
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        onFocus={() => setOpen(true)}
                        style={{ flex: 1, padding: '13px 0', border: 'none', background: 'transparent', fontSize: 14, color: T.text, outline: 'none' }}
                    />
                    {value && (
                        <X size={15} color={T.gray} style={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => onChange('')} />
                    )}
                </div>
                {open && (
                    <div style={{
                        position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                        background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
                        boxShadow: T.shadowMd, maxHeight: 220, overflowY: 'auto', zIndex: 200,
                    }}>
                        {items.length === 0 && value ? (
                            <div style={{ padding: '12px 16px', color: T.gray, fontSize: 13 }}>검색 결과가 없습니다.</div>
                        ) : items.map((item, i) => (
                            <div
                                key={item.id}
                                onClick={() => onSelect(item)}
                                style={{
                                    padding: '12px 16px', cursor: 'pointer',
                                    borderBottom: i < items.length - 1 ? `1px solid ${T.border}` : 'none',
                                }}
                            >
                                <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{item.name}</div>
                                {item.sub && <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>{item.sub}</div>}
                            </div>
                        ))}
                        {footer && (
                            <div
                                onClick={footer.onClick}
                                style={{
                                    padding: '13px 16px', cursor: 'pointer',
                                    borderTop: `1px solid ${T.border}`,
                                    fontSize: 14, fontWeight: 700, color: T.blue,
                                    display: 'flex', alignItems: 'center', gap: 6,
                                }}
                            >
                                + {footer.label}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─── Star Rating Row ────────────────────────────────────────── */
function StarRow({ label, value, onChange }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: T.text, width: 148, flexShrink: 0 }}>{label}</span>
            <div style={{ display: 'flex', gap: 4 }}>
                {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} onClick={() => onChange(s)} style={{
                        fontSize: 26, cursor: 'pointer',
                        filter: s <= value ? 'none' : 'grayscale(1) opacity(0.3)',
                        transition: 'filter 0.1s',
                    }}>⭐</span>
                ))}
            </div>
            {value > 0 && <span style={{ fontSize: 15, fontWeight: 800, color: T.text }}>{value}.0</span>}
        </div>
    );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function ReviewWritePage() {
    const router = useRouter();

    // remote data
    const [events, setEvents] = useState([]);
    const [organizers, setOrganizers] = useState([]);
    const [reviewCount, setReviewCount] = useState(0);

    // selections
    const [selectedEventId, setSelectedEventId] = useState('');
    const [selectedOrgId, setSelectedOrgId] = useState('');
    const [sellerType, setSellerType] = useState('seller');

    // autocomplete state
    const [evtKeyword, setEvtKeyword] = useState('');
    const [orgKeyword, setOrgKeyword] = useState('');
    const [isEvtOpen, setIsEvtOpen] = useState(false);
    const [isOrgOpen, setIsOrgOpen] = useState(false);

    // ratings
    const [rProfit, setRProfit] = useState(0);
    const [rTraffic, setRTraffic] = useState(0);
    const [rSupport, setRSupport] = useState(0);
    const [rManners, setRManners] = useState(0);

    // text content
    const [pros, setPros] = useState('');
    const [cons, setCons] = useState('');
    const [content, setContent] = useState('');
    const [showOverall, setShowOverall] = useState(false);

    // chip selection state
    const [prosChips, setProsChips] = useState(new Set());
    const [consChips, setConsChips] = useState(new Set());

    const [isSubmitting, setIsSubmitting] = useState(false);

    const evtRef = useRef(null);
    const orgRef = useRef(null);

    /* fetch events, organizers, review count */
    useEffect(() => {
        (async () => {
            const { createClient } = await import('@/utils/supabase/client');
            const sb = createClient();
            const { data: { session } } = await sb.auth.getSession();

            const [eRes, oRes] = await Promise.all([
                sb.from('events').select('id, name, location').order('name'),
                sb.from('organizers').select('id, name').order('name'),
            ]);
            if (eRes.data) setEvents(eRes.data);
            if (oRes.data) setOrganizers(oRes.data);

            if (session?.user) {
                const { data: p } = await sb
                    .from('profiles')
                    .select('review_count')
                    .eq('id', session.user.id)
                    .single();
                if (p) setReviewCount(p.review_count ?? 0);
            }
        })();
    }, []);

    /* close dropdowns on outside click */
    useEffect(() => {
        const handler = e => {
            if (evtRef.current && !evtRef.current.contains(e.target)) setIsEvtOpen(false);
            if (orgRef.current && !orgRef.current.contains(e.target)) setIsOrgOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* reset chips when seller type changes */
    useEffect(() => {
        setProsChips(new Set());
        setConsChips(new Set());
        setPros('');
        setCons('');
    }, [sellerType]);

    /* chip toggle: append or remove text from textarea */
    const toggleChip = (text, setValue, selected, setSelected) => {
        const next = new Set(selected);
        if (next.has(text)) {
            next.delete(text);
            setValue(prev => prev
                .split('\n')
                .filter(line => line.trim() !== text)
                .join('\n')
                .trim()
            );
        } else {
            next.add(text);
            setValue(prev => prev ? `${prev}\n${text}` : text);
        }
        setSelected(next);
    };

    const handleSubmit = async () => {
        if (!selectedEventId) return alert('참여하신 행사(장소)를 선택해주세요.');
        if (!selectedOrgId) return alert('주최측(기획사)을 선택해주세요.');
        if (!rProfit || !rTraffic || !rSupport || !rManners) return alert('모든 항목의 별점을 입력해주세요.');
        if (!pros.trim()) return alert('장점을 입력해주세요.');
        if (!cons.trim()) return alert('단점을 입력해주세요.');

        setIsSubmitting(true);
        try {
            const { createClient } = await import('@/utils/supabase/client');
            const sb = createClient();
            const { data: { session } } = await sb.auth.getSession();
            if (!session?.user) { alert('로그인이 필요합니다.'); router.push('/login'); return; }

            const { error } = await sb.from('company_reviews').insert({
                event_id: selectedEventId,
                organizer_id: selectedOrgId,
                user_id: session.user.id,
                rating_profit: rProfit,
                rating_traffic: rTraffic,
                rating_support: rSupport,
                rating_manners: rManners,
                content: content || null,
                pros,
                cons,
                is_verified: false,
            });
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

    const filteredEvents = events.filter(e =>
        e.name.toLowerCase().includes(evtKeyword.toLowerCase()) ||
        e.location?.toLowerCase().includes(evtKeyword.toLowerCase())
    );
    const filteredOrgs = organizers.filter(o =>
        o.name.toLowerCase().includes(orgKeyword.toLowerCase())
    );
    const overall = rProfit && rTraffic && rSupport && rManners
        ? ((rProfit + rTraffic + rSupport + rManners) / 4).toFixed(1) : null;
    const currentChips = CHIPS[sellerType];

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 60 }}>
            <TopBar title="행사 리뷰 작성" back />

            <div className="page-padding">
                {/* ── Progress bar ── */}
                <ProgressBar count={reviewCount} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* ── 대상 선택 ── */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 18 }}>
                            어디서, 누구와 진행하셨나요?
                        </div>

                        <div style={{ marginBottom: 20 }}>
                            <AutocompleteInput
                                label="진행된 행사(장소)"
                                required
                                placeholder="행사명 또는 장소 검색..."
                                value={evtKeyword}
                                onChange={v => { setEvtKeyword(v); setIsEvtOpen(true); if (selectedEventId) setSelectedEventId(''); }}
                                open={isEvtOpen}
                                setOpen={setIsEvtOpen}
                                items={filteredEvents.map(e => ({ id: e.id, name: e.name, sub: e.location }))}
                                onSelect={item => { setSelectedEventId(item.id); setEvtKeyword(item.name); setIsEvtOpen(false); }}
                                footer={evtKeyword ? {
                                    label: `"${evtKeyword}" 신규 행사 등록하기`,
                                    onClick: () => { alert('신규 행사 등록 기능은 준비중입니다.'); setIsEvtOpen(false); },
                                } : null}
                                inputRef={evtRef}
                            />
                        </div>

                        <AutocompleteInput
                            label="주최측(기획사)"
                            required
                            placeholder="주최측 검색..."
                            value={orgKeyword}
                            onChange={v => { setOrgKeyword(v); setIsOrgOpen(true); if (selectedOrgId) setSelectedOrgId(''); }}
                            open={isOrgOpen}
                            setOpen={setIsOrgOpen}
                            items={filteredOrgs.map(o => ({ id: o.id, name: o.name }))}
                            onSelect={item => { setSelectedOrgId(item.id); setOrgKeyword(item.name); setIsOrgOpen(false); }}
                            inputRef={orgRef}
                        />
                    </Card>

                    {/* ── 셀러 유형 ── */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 14 }}>셀러 유형 선택</div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            {[
                                { key: 'seller', label: '💎 일반 셀러', desc: '소품, 핸드메이드, 의류 등' },
                                { key: 'foodtruck', label: '🚚 푸드트럭', desc: '음식, 음료, 식품 판매' },
                            ].map(({ key, label, desc }) => (
                                <div
                                    key={key}
                                    onClick={() => setSellerType(key)}
                                    style={{
                                        flex: 1, padding: '14px 12px', borderRadius: T.radiusLg, cursor: 'pointer',
                                        border: `2px solid ${sellerType === key ? T.blue : T.border}`,
                                        background: sellerType === key ? T.blueLt : T.white,
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    <div style={{ fontSize: 14, fontWeight: 700, color: sellerType === key ? T.blue : T.text, marginBottom: 3 }}>
                                        {label}
                                    </div>
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

                        <div style={{ marginBottom: 20 }}>
                            <div style={{ fontSize: 12, color: T.gray, fontWeight: 600, marginBottom: 12 }}>📍 행사/장소 관련</div>
                            <StarRow label="💰 수익성 (매출)" value={rProfit} onChange={setRProfit} />
                            <StarRow label="👥 집객력 (유동인구)" value={rTraffic} onChange={setRTraffic} />
                        </div>
                        <div>
                            <div style={{ fontSize: 12, color: T.gray, fontWeight: 600, marginBottom: 12 }}>🏢 주최측/기획사 관련</div>
                            <StarRow label="🤝 운영지원" value={rSupport} onChange={setRSupport} />
                            <StarRow label="😊 주최측 매너" value={rManners} onChange={setRManners} />
                        </div>
                    </Card>

                    {/* ── 장점 (필수 + chips) ── */}
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 16, fontWeight: 800, color: T.text }}>👍 장점</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: T.red, background: T.redLt, padding: '2px 7px', borderRadius: T.radiusFull }}>
                                필수
                            </span>
                        </div>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 12 }}>
                            직접 쓰거나 아래 키워드를 눌러 빠르게 추가하세요
                        </div>
                        <textarea
                            value={pros}
                            onChange={e => setPros(e.target.value)}
                            placeholder="좋았던 점을 적어주세요."
                            rows={3}
                            style={{ ...inputStyle(pros), resize: 'none', fontFamily: 'inherit' }}
                        />
                        <ChipGroup
                            chips={currentChips.pros}
                            selected={prosChips}
                            onToggle={text => toggleChip(text, setPros, prosChips, setProsChips)}
                        />
                    </Card>

                    {/* ── 단점 (필수 + chips) ── */}
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 16, fontWeight: 800, color: T.text }}>👎 단점</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: T.red, background: T.redLt, padding: '2px 7px', borderRadius: T.radiusFull }}>
                                필수
                            </span>
                        </div>
                        <div style={{ fontSize: 13, color: T.gray, marginBottom: 12 }}>
                            직접 쓰거나 아래 키워드를 눌러 빠르게 추가하세요
                        </div>
                        <textarea
                            value={cons}
                            onChange={e => setCons(e.target.value)}
                            placeholder="아쉬웠던 점을 적어주세요."
                            rows={3}
                            style={{ ...inputStyle(cons), resize: 'none', fontFamily: 'inherit' }}
                        />
                        <ChipGroup
                            chips={currentChips.cons}
                            selected={consChips}
                            onToggle={text => toggleChip(text, setCons, consChips, setConsChips)}
                        />
                    </Card>

                    {/* ── 종합 평가 (선택, 아코디언) ── */}
                    <Card padding={0}>
                        <div
                            onClick={() => setShowOverall(v => !v)}
                            style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '18px 20px', cursor: 'pointer',
                            }}
                        >
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>📝 종합 평가</div>
                                <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>선택 사항 — 자세한 경험을 자유롭게 공유해보세요</div>
                            </div>
                            <ChevronDown
                                size={20} color={T.gray}
                                style={{ transform: showOverall ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
                            />
                        </div>
                        {showOverall && (
                            <div style={{ padding: '0 20px 20px' }}>
                                <textarea
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    placeholder="자세한 경험을 자유롭게 공유해주세요."
                                    rows={4}
                                    style={{ ...inputStyle(content), resize: 'none', fontFamily: 'inherit' }}
                                />
                            </div>
                        )}
                    </Card>

                    {/* ── 제출 버튼 ── */}
                    <div
                        onClick={isSubmitting ? null : handleSubmit}
                        style={{
                            background: isSubmitting ? T.gray : T.blue,
                            borderRadius: T.radiusMd, padding: 18, textAlign: 'center',
                            color: '#fff', fontSize: 16, fontWeight: 800,
                            cursor: isSubmitting ? 'default' : 'pointer',
                            transition: 'background 0.15s',
                        }}
                    >
                        {isSubmitting ? '처리 중...' : '리뷰 등록하고 무료 혜택 받기 🎁'}
                    </div>

                </div>
            </div>
        </div>
    );
}
