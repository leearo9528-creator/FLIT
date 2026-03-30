'use client';

import { useState, useEffect, useRef } from 'react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useRouter } from 'next/navigation';
import { Search, X, Plus, MapPin, Calendar, Banknote, Clock, ChevronDown, ClipboardList } from 'lucide-react';
import { T, inputStyle } from '@/lib/design-tokens';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/lib/auth-context';
import TopBar from '@/components/ui/TopBar';
import ImageUploader from '@/components/ui/ImageUploader';
import { AddressSearchMap } from '@/components/ui/NaverMap';

/* ─── Section 컴포넌트 ───────────────────────────────────────── */
function Section({ title, required, hint, children }) {
    return (
        <div style={{
            background: T.white, borderRadius: T.radiusLg,
            border: `1px solid ${T.border}`, padding: '18px 16px',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: hint ? 4 : 14 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: T.text }}>{title}</span>
                {required && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.red, background: T.redLt, padding: '2px 7px', borderRadius: T.radiusFull }}>
                        필수
                    </span>
                )}
            </div>
            {hint && <div style={{ fontSize: 12, color: T.gray, marginBottom: 12 }}>{hint}</div>}
            {children}
        </div>
    );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function RecruitmentWritePage() {
    const router = useRouter();
    const { user, plan, loading: authLoading } = useAuth();

    const [organizer, setOrganizer] = useState(null);

    // 행사 검색
    const [baseEvents, setBaseEvents] = useState([]);
    const [eventKeyword, setEventKeyword] = useState('');
    const [selectedBaseEvent, setSelectedBaseEvent] = useState(null);
    const [isEventOpen, setIsEventOpen] = useState(false);
    const eventRef = useRef(null);

    // 행사 상세
    const [eventDate, setEventDate] = useState('');
    const [eventDateEnd, setEventDateEnd] = useState('');
    const [location, setLocation] = useState('');

    // 공고 정보
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [fee, setFee] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sellerType, setSellerType] = useState('');

    // 신청 방법
    const [applicationMethod, setApplicationMethod] = useState('');

    // 이미지
    const [images, setImages] = useState([]);

    // 새 행사 추가
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEventName, setNewEventName] = useState('');
    const [newEventCategory, setNewEventCategory] = useState('플리마켓');
    const [addingEvent, setAddingEvent] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    /* 비주최사 접근 차단 */
    useEffect(() => {
        if (authLoading) return;
        if (plan !== 'organizer') router.replace('/');
    }, [authLoading, plan, router]);

    /* organizer 확인 + 행사 목록 로드 */
    useEffect(() => {
        if (!user) return;
        (async () => {
            const sb = createClient();

            // profiles.id = organizers.id 1:1 매핑으로 조회
            const { data: org } = await sb
                .from('organizers')
                .select('id, name')
                .eq('id', user.id)
                .maybeSingle();

            if (org) {
                setOrganizer(org);
            } else {
                // 없으면 profiles 이름 기반으로 자동 생성
                const { data: profile } = await sb
                    .from('profiles')
                    .select('organizer_name')
                    .eq('id', user.id)
                    .maybeSingle();
                const orgName = profile?.organizer_name
                    || user.user_metadata?.full_name
                    || user.user_metadata?.name
                    || user.email?.split('@')[0]
                    || '주최사';
                const { data: newOrg } = await sb
                    .from('organizers')
                    .insert({ id: user.id, name: orgName })
                    .select('id, name')
                    .single();
                if (newOrg) setOrganizer(newOrg);
            }

            const { data: evData } = await sb
                .from('base_events')
                .select('id, name, category')
                .order('name');
            if (evData) setBaseEvents(evData);
        })();
    }, [user]);

    /* 외부 클릭 시 드롭다운 닫기 */
    useEffect(() => {
        const handler = e => {
            if (eventRef.current && !eventRef.current.contains(e.target)) setIsEventOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const filteredEvents = baseEvents.filter(e =>
        e.name.toLowerCase().includes(eventKeyword.toLowerCase())
    );

    const handleAddEvent = async () => {
        if (!newEventName.trim()) return alert('행사명을 입력해주세요.');
        setAddingEvent(true);
        try {
            const sb = createClient();
            const { data, error } = await sb.from('base_events')
                .insert({ name: newEventName.trim(), category: newEventCategory })
                .select('id, name, category').single();
            if (error) throw error;
            setBaseEvents(prev => [data, ...prev]);
            setSelectedBaseEvent(data);
            setEventKeyword(data.name);
            setShowAddEvent(false);
            setNewEventName('');
        } catch (err) {
            alert(`행사 추가 실패: ${err.message}`);
        } finally { setAddingEvent(false); }
    };

    const handleSubmit = async () => {
        if (!selectedBaseEvent) return alert('행사를 선택해주세요.');
        if (!eventDate) return alert('행사 일자를 입력해주세요.');
        if (!location.trim()) return alert('장소를 입력해주세요.');
        if (!title.trim()) return alert('공고 제목을 입력해주세요.');
        if (!endDate) return alert('모집 마감일을 입력해주세요.');
        if (!content.trim()) return alert('모집 요강을 입력해주세요.');

        setIsSubmitting(true);
        try {
            const orderId = `NEW_${Date.now()}_${user.id.replace(/-/g, '').slice(0, 8)}`;

            // 결제 후 성공 페이지에서 사용할 폼 데이터 저장
            sessionStorage.setItem(`draft_${orderId}`, JSON.stringify({
                selectedBaseEvent,
                eventDate, eventDateEnd, location,
                title, content,
                fee: fee ? parseInt(fee.replace(/,/g, ''), 10) : 0,
                endDate,
                applicationMethod: applicationMethod.trim() || null,
                organizerId: organizer?.id || null,
                images: images.length > 0 ? images : null,
            }));

            const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
            const tossPayments = await loadTossPayments(clientKey);
            const payment = tossPayments.payment({ customerKey: user.id });
            await payment.requestPayment({
                method: 'CARD',
                amount: { currency: 'KRW', value: 10000 },
                orderId,
                orderName: '모집공고 등록 1건',
                successUrl: `${window.location.origin}/recruitments/write/success`,
                failUrl: `${window.location.origin}/recruitments/write`,
                customerEmail: user.email || undefined,
                customerName: user.user_metadata?.full_name || user.user_metadata?.name || '주최사',
            });
        } catch (err) {
            console.error('결제 오류:', err);
            alert('결제 중 오류가 발생했습니다.\n' + (err.message || ''));
            setIsSubmitting(false);
        }
    };

    /* 비주최사는 useEffect에서 리다이렉트, 로딩 중엔 빈 화면 */
    if (authLoading || plan !== 'organizer') return null;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title="공고 올리기" back />

            <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* ── 주최사 표시 ── */}
                {organizer && (
                    <div style={{
                        background: T.blueLt, borderRadius: T.radiusMd,
                        padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
                        border: `1px solid ${T.blue}30`,
                    }}>
                        <span style={{ fontSize: 18 }}>🏢</span>
                        <div>
                            <div style={{ fontSize: 11, color: T.blue, fontWeight: 700 }}>주최사</div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.text }}>{organizer.name}</div>
                        </div>
                    </div>
                )}

                {/* ── 행사 선택 ── */}
                <Section title="행사" required>
                    <div ref={eventRef} style={{ position: 'relative' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            background: T.bg, borderRadius: T.radiusMd, padding: '0 14px',
                            border: `1.5px solid ${selectedBaseEvent ? T.blue : T.border}`,
                        }}>
                            <Search size={15} color={T.gray} style={{ flexShrink: 0 }} />
                            <input
                                type="text"
                                placeholder="행사명 검색..."
                                value={eventKeyword}
                                onChange={e => {
                                    setEventKeyword(e.target.value);
                                    setIsEventOpen(true);
                                    if (selectedBaseEvent) setSelectedBaseEvent(null);
                                }}
                                onFocus={() => setIsEventOpen(true)}
                                style={{ flex: 1, padding: '13px 0', border: 'none', background: 'transparent', fontSize: 14, color: T.text, outline: 'none' }}
                            />
                            {eventKeyword && (
                                <X size={15} color={T.gray} style={{ cursor: 'pointer' }} onClick={() => { setEventKeyword(''); setSelectedBaseEvent(null); }} />
                            )}
                        </div>
                        {isEventOpen && (
                            <div style={{
                                position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                                background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
                                boxShadow: T.shadowMd, maxHeight: 200, overflowY: 'auto', zIndex: 200,
                            }}>
                                {filteredEvents.length === 0 ? (
                                    <div style={{ padding: '12px 16px', color: T.gray, fontSize: 13 }}>
                                        검색 결과가 없어요.
                                    </div>
                                ) : filteredEvents.map((e, i) => (
                                    <div
                                        key={e.id}
                                        onClick={() => { setSelectedBaseEvent(e); setEventKeyword(e.name); setIsEventOpen(false); }}
                                        style={{
                                            padding: '12px 16px', cursor: 'pointer',
                                            background: selectedBaseEvent?.id === e.id ? T.blueLt : T.white,
                                            borderBottom: i < filteredEvents.length - 1 ? `1px solid ${T.border}` : 'none',
                                        }}
                                    >
                                        <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{e.name}</div>
                                        {e.category && <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>{e.category}</div>}
                                    </div>
                                ))}
                                <div
                                    onClick={() => { setIsEventOpen(false); setShowAddEvent(true); setNewEventName(eventKeyword); }}
                                    style={{ padding: '12px 16px', cursor: 'pointer', borderTop: `1px solid ${T.border}`, fontSize: 13, fontWeight: 700, color: T.blue, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Plus size={14} /> 새 행사 추가하기
                                </div>
                            </div>
                        )}

                        {/* 새 행사 추가 폼 */}
                        {showAddEvent && (
                            <div style={{ marginTop: 12, background: T.blueLt, borderRadius: T.radiusMd, padding: 16, border: `1.5px solid ${T.blue}` }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: T.blue, marginBottom: 10 }}>새 행사 추가</div>
                                <input value={newEventName} onChange={e => setNewEventName(e.target.value)} placeholder="행사명"
                                    style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, outline: 'none', background: T.white, boxSizing: 'border-box', marginBottom: 8 }} />
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                                    {['플리마켓', '푸드트럭', '플리+푸드 전체'].map(c => (
                                        <div key={c} onClick={() => setNewEventCategory(c)} style={{
                                            padding: '6px 12px', borderRadius: T.radiusFull, cursor: 'pointer', fontSize: 12, fontWeight: 600,
                                            background: newEventCategory === c ? T.blue : T.white, color: newEventCategory === c ? '#fff' : T.gray,
                                            border: `1px solid ${newEventCategory === c ? T.blue : T.border}`,
                                        }}>{c}</div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button onClick={() => { setShowAddEvent(false); setNewEventName(''); }} style={{ flex: 1, padding: '10px 0', border: `1px solid ${T.border}`, borderRadius: T.radiusMd, fontSize: 13, fontWeight: 700, color: T.gray, cursor: 'pointer', background: T.white }}>취소</button>
                                    <button onClick={addingEvent ? null : handleAddEvent} style={{ flex: 2, padding: '10px 0', borderRadius: T.radiusMd, fontSize: 13, fontWeight: 700, color: '#fff', cursor: addingEvent ? 'default' : 'pointer', background: addingEvent ? T.gray : T.blue, border: 'none' }}>{addingEvent ? '추가 중...' : '추가하기'}</button>
                                </div>
                            </div>
                        )}
                    </div>
                </Section>

                {/* ── 행사 일자 + 장소 ── */}
                <Section title="행사 일자 / 장소" required>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Calendar size={12} /> 시작일
                                </div>
                                <input
                                    type="date"
                                    value={eventDate}
                                    onChange={e => setEventDate(e.target.value)}
                                    style={{ ...inputStyle(!!eventDate), padding: '11px 12px' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Calendar size={12} /> 종료일 <span style={{ fontWeight: 400 }}>(선택)</span>
                                </div>
                                <input
                                    type="date"
                                    value={eventDateEnd}
                                    onChange={e => setEventDateEnd(e.target.value)}
                                    min={eventDate}
                                    style={{ ...inputStyle(!!eventDateEnd), padding: '11px 12px' }}
                                />
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <MapPin size={12} /> 장소
                            </div>
                            <AddressSearchMap
                                value={location}
                                onChange={({ address }) => setLocation(address)}
                            />
                        </div>
                    </div>
                </Section>

                {/* ── 공고 제목 ── */}
                <Section title="공고 제목" required>
                    <input
                        type="text"
                        placeholder="예: 2025 홍대 플리마켓 셀러 모집"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        style={inputStyle(!!title)}
                    />
                </Section>

                {/* ── 모집 조건 ── */}
                <Section title="모집 조건">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Clock size={12} /> 모집 마감일
                            </div>
                            <input
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                style={{ ...inputStyle(!!endDate), padding: '11px 12px' }}
                            />
                        </div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Banknote size={12} /> 참가비
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="0 (무료)"
                                    value={fee}
                                    onChange={e => {
                                        const raw = e.target.value.replace(/[^0-9]/g, '');
                                        setFee(raw ? Number(raw).toLocaleString() : '');
                                    }}
                                    style={{ ...inputStyle(!!fee), paddingRight: 36 }}
                                />
                                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: T.gray }}>원</span>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6 }}>모집 셀러 유형</div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {[
                                    { key: '', label: '전체' },
                                    { key: 'seller', label: '💎 일반셀러' },
                                    { key: 'foodtruck', label: '🚚 푸드트럭' },
                                ].map(opt => (
                                    <div
                                        key={opt.key}
                                        onClick={() => setSellerType(opt.key)}
                                        style={{
                                            flex: 1, padding: '10px 6px', borderRadius: T.radiusMd,
                                            textAlign: 'center', cursor: 'pointer',
                                            border: `1.5px solid ${sellerType === opt.key ? T.blue : T.border}`,
                                            background: sellerType === opt.key ? T.blueLt : T.white,
                                            fontSize: 13, fontWeight: 700,
                                            color: sellerType === opt.key ? T.blue : T.gray,
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        {opt.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ── 상세 모집 요강 ── */}
                <Section title="상세 모집 요강" required hint="부스 크기, 전기 공급, 주의 사항 등을 자유롭게 입력해주세요.">
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder={'예:\n- 부스 크기: 2m x 2m\n- 전기: 220V 1구 제공\n- 주의사항: 천막 설치 불가\n- 정산: 행사 종료 후 3일 이내'}
                        rows={8}
                        style={{
                            width: '100%', border: `1.5px solid ${content ? T.blue : T.border}`,
                            borderRadius: T.radiusMd, padding: '12px 14px',
                            fontSize: 14, color: T.text, lineHeight: 1.8,
                            outline: 'none', resize: 'vertical', background: T.bg,
                            fontFamily: 'inherit', boxSizing: 'border-box',
                            transition: 'border-color 0.15s',
                        }}
                    />
                </Section>

                {/* ── 신청 방법 ── */}
                <Section
                    title="신청 방법"
                    hint="지원자가 어떻게 신청하면 되는지 알려주세요."
                >
                    <div style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                            {[
                                '구글폼으로 신청해주세요.',
                                '인스타 DM으로 신청해주세요.',
                                '이메일로 신청해주세요.',
                                '카카오채널로 신청해주세요.',
                            ].map(template => (
                                <div
                                    key={template}
                                    onClick={() => setApplicationMethod(prev =>
                                        prev ? `${prev}\n${template}` : template
                                    )}
                                    style={{
                                        padding: '6px 12px', borderRadius: T.radiusFull, cursor: 'pointer',
                                        fontSize: 12, fontWeight: 600,
                                        background: T.grayLt, color: T.textSub,
                                        border: `1px solid ${T.border}`,
                                    }}
                                >
                                    + {template}
                                </div>
                            ))}
                        </div>
                        <textarea
                            value={applicationMethod}
                            onChange={e => setApplicationMethod(e.target.value)}
                            placeholder={'예:\n구글폼 링크: https://forms.gle/...\n인스타 DM: @flit_market\n이메일: apply@example.com\n\n신청 시 품목명, 예상 매출, 판매 경력을 함께 보내주세요.'}
                            rows={5}
                            style={{
                                width: '100%', border: `1.5px solid ${applicationMethod ? T.blue : T.border}`,
                                borderRadius: T.radiusMd, padding: '12px 14px',
                                fontSize: 14, color: T.text, lineHeight: 1.8,
                                outline: 'none', resize: 'vertical', background: T.bg,
                                fontFamily: 'inherit', boxSizing: 'border-box',
                                transition: 'border-color 0.15s',
                            }}
                        />
                    </div>
                </Section>

                {/* ── 사진 첨부 ── */}
                <Section title="사진 첨부" hint="행사장, 부스 배치 등 참고 사진을 첨부하세요. (최대 5장)">
                    <ImageUploader images={images} onChange={setImages} folder="recruitments" max={5} />
                </Section>

                {/* ── 등록 버튼 ── */}
                <button
                    onClick={isSubmitting ? undefined : handleSubmit}
                    disabled={isSubmitting}
                    style={{
                        width: '100%', padding: 16, borderRadius: T.radiusMd,
                        background: isSubmitting ? T.gray : T.blue,
                        border: 'none', color: '#fff', fontSize: 16, fontWeight: 800,
                        cursor: isSubmitting ? 'default' : 'pointer', transition: 'background 0.15s',
                        marginTop: 8,
                    }}
                >
                    {isSubmitting ? '결제 페이지로 이동 중...' : '공고 등록하기 (10,000원)'}
                </button>

            </div>
        </div>
    );
}
