'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, Plus, MapPin, Calendar, Banknote, Copy } from 'lucide-react';
import { T, inputStyle } from '@/lib/design-tokens';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/lib/auth-context';
import TopBar from '@/components/ui/TopBar';
import ImageUploader from '@/components/ui/ImageUploader';
// 네이버 지도 주소 검색은 추후 재적용

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

/* ─── 공통 스타일 / 헬퍼 ──────────────────────────────────── */
const chipStyle = {
    padding: '6px 12px', borderRadius: T.radiusFull, cursor: 'pointer',
    fontSize: 12, fontWeight: 600,
    background: T.grayLt, color: T.textSub,
    border: `1px solid ${T.border}`,
};

const textareaStyle = (hasValue) => ({
    width: '100%', border: `1.5px solid ${hasValue ? T.blue : T.border}`,
    borderRadius: T.radiusMd, padding: '12px 14px',
    fontSize: 14, color: T.text, lineHeight: 1.8,
    outline: 'none', resize: 'vertical', background: T.bg,
    fontFamily: 'inherit', boxSizing: 'border-box',
    transition: 'border-color 0.15s',
});

const loadBtnStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    width: '100%', padding: '10px 14px', marginBottom: 10,
    background: T.white, border: `1.5px dashed ${T.blue}`,
    borderRadius: T.radiusMd, cursor: 'pointer',
    fontSize: 13, fontWeight: 700, color: T.blue,
};

const appendChip = (prev, chip) => {
    if (!prev) return `- ${chip}`;
    if (prev.includes(chip)) return prev;
    return `${prev}\n- ${chip}`;
};

/* ─── Page ───────────────────────────────────────────────────── */
export default function RecruitmentWritePage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: T.bg }} />}>
            <RecruitmentWriteContent />
        </Suspense>
    );
}

function RecruitmentWriteContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('edit');
    const { user, plan, loading: authLoading } = useAuth();
    const [editInstanceId, setEditInstanceId] = useState(null);

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
    const [feeText, setFeeText] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sellerType, setSellerType] = useState('');
    const [recruitmentItems, setRecruitmentItems] = useState('');

    // 신청 방법 + 추가 정보
    const [applicationMethod, setApplicationMethod] = useState('');
    const [contact, setContact] = useState('');
    const [refundPolicy, setRefundPolicy] = useState('');
    const [parkingInfo, setParkingInfo] = useState('');
    const [onsiteSupport, setOnsiteSupport] = useState('');

    // 프로필에 저장된 기본 정보 (불러오기용)
    const [profileDefaults, setProfileDefaults] = useState({ application: '', contact: '' });

    // 이미지
    const [images, setImages] = useState([]);

    // 새 행사 추가
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEventName, setNewEventName] = useState('');
    const [newEventCategory, setNewEventCategory] = useState('플리마켓');
    const [addingEvent, setAddingEvent] = useState(false);

    // 이전 공고 불러오기
    const [pastRecs, setPastRecs] = useState([]);
    const [showPastModal, setShowPastModal] = useState(false);

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
                    .maybeSingle();
                if (newOrg) setOrganizer(newOrg);
            }

            // 프로필에 저장된 기본 신청 방법 / 연락처 불러오기
            const { data: profileData } = await sb
                .from('profiles')
                .select('default_application_method, default_contact, phone')
                .eq('id', user.id)
                .maybeSingle();
            if (profileData) {
                setProfileDefaults({
                    application: profileData.default_application_method || '',
                    contact: profileData.default_contact || profileData.phone || '',
                });
            }

            const { data: evData } = await sb
                .from('base_events')
                .select('id, name, category')
                .order('name');
            if (evData) setBaseEvents(evData);

            // 이전 공고 목록 (본인 주최사)
            if (!editId) {
                const { data: pastData } = await sb
                    .from('recruitments')
                    .select('id, title, recruitment_items, fee_description, application_method, contact, refund_policy, parking_info, onsite_support, seller_type, images, created_at, event_instance:event_instances!inner(id, location, organizer_id, base_event:base_events(id, name, category))')
                    .eq('event_instance.organizer_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(20);
                if (pastData) setPastRecs(pastData);
            }

            // 수정 모드: 기존 공고/회차 로드
            if (editId) {
                const { data: rec, error: recErr } = await sb
                    .from('recruitments')
                    .select('*, event_instance:event_instances(id, base_event_id, organizer_id, location, event_date, event_date_end, base_event:base_events(id, name, category))')
                    .eq('id', editId)
                    .maybeSingle();
                if (recErr || !rec) {
                    alert('공고를 불러오지 못했습니다.');
                    router.replace('/mypage/recruitments');
                    return;
                }
                if (rec.event_instance?.organizer_id !== user.id) {
                    alert('본인이 등록한 공고만 수정할 수 있습니다.');
                    router.replace('/mypage/recruitments');
                    return;
                }
                setEditInstanceId(rec.event_instance.id);
                setSelectedBaseEvent(rec.event_instance.base_event || null);
                setEventKeyword(rec.event_instance.base_event?.name || '');
                setEventDate(rec.event_instance.event_date || '');
                setEventDateEnd(rec.event_instance.event_date_end && rec.event_instance.event_date_end !== rec.event_instance.event_date ? rec.event_instance.event_date_end : '');
                setLocation(rec.event_instance.location || '');
                setTitle(rec.title || '');
                setRecruitmentItems(rec.recruitment_items || '');
                setFeeText(rec.fee_description || '');
                setEndDate(rec.end_date || '');
                setSellerType(rec.seller_type || '');
                setApplicationMethod(rec.application_method || '');
                setContact(rec.contact || '');
                setRefundPolicy(rec.refund_policy || '');
                setParkingInfo(rec.parking_info || '');
                setOnsiteSupport(rec.onsite_support || '');
                setImages(rec.images || []);
            }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, editId]);

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
                .select('id, name, category').maybeSingle();
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

    const applyPastRecruitment = (rec) => {
        const baseEv = rec.event_instance?.base_event;
        if (baseEv) {
            setSelectedBaseEvent(baseEv);
            setEventKeyword(baseEv.name || '');
        }
        if (rec.event_instance?.location) setLocation(rec.event_instance.location);
        setTitle(rec.title || '');
        setRecruitmentItems(rec.recruitment_items || '');
        setFeeText(rec.fee_description || '');
        setSellerType(rec.seller_type || '');
        setApplicationMethod(rec.application_method || '');
        setContact(rec.contact || '');
        setRefundPolicy(rec.refund_policy || '');
        setParkingInfo(rec.parking_info || '');
        setOnsiteSupport(rec.onsite_support || '');
        setImages(rec.images || []);
        setShowPastModal(false);
    };

    const handleSubmit = async () => {
        if (!selectedBaseEvent) return alert('행사를 선택해주세요.');
        if (!eventDate) return alert('행사 일자를 입력해주세요.');
        if (eventDateEnd && eventDateEnd < eventDate) return alert('행사 종료일은 시작일보다 빠를 수 없습니다.');
        if (endDate && endDate > eventDate) return alert('모집 마감일은 행사 시작일보다 늦을 수 없습니다.');
        if (!location.trim()) return alert('장소를 입력해주세요.');
        if (!title.trim()) return alert('공고 제목을 입력해주세요.');

        setIsSubmitting(true);
        try {
            const sb = createClient();

            const instancePayload = {
                base_event_id: selectedBaseEvent.id,
                organizer_id: organizer?.id || null,
                location: location.trim(),
                location_sido: location.trim().split(' ')[0],
                event_date: eventDate,
                event_date_end: eventDateEnd || eventDate,
            };

            const recPayload = {
                title: title.trim(),
                recruitment_items: recruitmentItems.trim() || null,
                fee_description: feeText.trim() || null,
                end_date: endDate || null,
                application_method: applicationMethod.trim() || null,
                contact: contact.trim() || null,
                refund_policy: refundPolicy.trim() || null,
                parking_info: parkingInfo.trim() || null,
                onsite_support: onsiteSupport.trim() || null,
                seller_type: sellerType || null,
                images: images.length > 0 ? images : null,
            };

            if (editId) {
                // 수정: event_instance + recruitment 동시 업데이트
                const { error: instErr } = await sb
                    .from('event_instances')
                    .update(instancePayload)
                    .eq('id', editInstanceId);
                if (instErr) throw instErr;

                const { error: recErr } = await sb
                    .from('recruitments')
                    .update(recPayload)
                    .eq('id', editId);
                if (recErr) throw recErr;

                router.push(`/recruitments/${editId}`);
            } else {
                // 신규: event_instance 생성 → recruitment 생성
                const { data: instance, error: instErr } = await sb
                    .from('event_instances')
                    .insert(instancePayload)
                    .select('id')
                    .maybeSingle();
                if (instErr) throw instErr;

                const { data: rec, error: recErr } = await sb
                    .from('recruitments')
                    .insert({ ...recPayload, event_instance_id: instance.id, status: 'OPEN' })
                    .select('id')
                    .maybeSingle();
                if (recErr) throw recErr;

                router.push(`/recruitments/${rec.id}`);
            }
        } catch (err) {
            console.error('공고 등록 오류:', err);
            alert((editId ? '수정' : '등록') + ' 중 오류가 발생했습니다.\n' + (err.message || ''));
            setIsSubmitting(false);
        }
    };

    /* 비주최사는 useEffect에서 리다이렉트, 로딩 중엔 빈 화면 */
    if (authLoading || plan !== 'organizer') return null;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title={editId ? '공고 수정' : '공고 올리기'} back />

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

                {/* ── 이전 공고 불러오기 ── */}
                {!editId && pastRecs.length > 0 && (
                    <button
                        onClick={() => setShowPastModal(true)}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            width: '100%', padding: '12px 16px',
                            background: T.white, border: `1.5px dashed ${T.blue}`,
                            borderRadius: T.radiusMd, cursor: 'pointer',
                            fontSize: 13, fontWeight: 700, color: T.blue,
                        }}
                    >
                        <Copy size={14} /> 이전 공고에서 정보 불러오기
                        <span style={{ fontSize: 11, fontWeight: 600, color: T.gray }}>({pastRecs.length}개)</span>
                    </button>
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
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Calendar size={12} /> 시작일
                                </div>
                                <input
                                    type="date"
                                    value={eventDate}
                                    onChange={e => setEventDate(e.target.value)}
                                    style={{ ...inputStyle(!!eventDate), padding: '11px 8px', fontSize: 13, minWidth: 0, width: '100%' }}
                                />
                            </div>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Calendar size={12} /> 종료일<span style={{ fontWeight: 400, marginLeft: 2 }}>(선택)</span>
                                </div>
                                <input
                                    type="date"
                                    value={eventDateEnd}
                                    onChange={e => setEventDateEnd(e.target.value)}
                                    min={eventDate}
                                    style={{ ...inputStyle(!!eventDateEnd), padding: '11px 8px', fontSize: 13, minWidth: 0, width: '100%' }}
                                />
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <MapPin size={12} /> 장소
                            </div>
                            <input
                                type="text"
                                placeholder="예: 서울 마포구 홍대 걷고싶은거리"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px 14px', fontSize: 14, color: T.text,
                                    border: `1.5px solid ${location ? T.blue : T.border}`, borderRadius: T.radiusMd,
                                    outline: 'none', background: T.bg, boxSizing: 'border-box',
                                }}
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

                {/* ── 사진 첨부 ── */}
                <Section title="사진 첨부" hint="행사장, 부스 배치 등 참고 사진을 첨부하세요. (최대 5장)">
                    <ImageUploader images={images} onChange={setImages} folder="recruitments" max={5} />
                </Section>

                {/* ── 모집 마감일 ── */}
                <Section title="모집 마감일">
                    <div style={{ display: 'flex', gap: 8 }}>
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            style={{ ...inputStyle(!!endDate), padding: '11px 12px', flex: 1, minWidth: 0 }}
                        />
                        <div
                            onClick={() => setEndDate('')}
                            style={{
                                padding: '11px 16px', borderRadius: T.radiusMd, cursor: 'pointer',
                                border: `1.5px solid ${!endDate ? T.blue : T.border}`,
                                background: !endDate ? T.blueLt : T.white,
                                fontSize: 13, fontWeight: 700,
                                color: !endDate ? T.blue : T.gray, whiteSpace: 'nowrap',
                            }}
                        >없음</div>
                    </div>
                    {eventDate && (
                        <div style={{
                            marginTop: 10,
                            display: 'flex', alignItems: 'center', gap: 10,
                            background: T.bg, borderRadius: T.radiusMd, padding: '10px 14px',
                            border: `1px solid ${T.border}`,
                        }}>
                            <span style={{ fontSize: 12, color: T.gray, fontWeight: 600 }}>행사일수</span>
                            <span style={{ fontSize: 15, fontWeight: 800, color: T.blue }}>
                                {(() => {
                                    if (!eventDateEnd || eventDateEnd === eventDate) return '1일';
                                    const d = Math.round((new Date(eventDateEnd) - new Date(eventDate)) / 86400000) + 1;
                                    return `${d}일`;
                                })()}
                            </span>
                            <span style={{ fontSize: 12, color: T.gray }}>
                                ({eventDate}{eventDateEnd && eventDateEnd !== eventDate ? ` ~ ${eventDateEnd}` : ''})
                            </span>
                        </div>
                    )}
                </Section>

                {/* ── 상세 공고 ── */}
                <Section title="상세 공고">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                        {/* 모집 셀러 유형 */}
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6 }}>모집 셀러 유형</div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {[
                                    { key: '', label: '전체' },
                                    { key: 'seller', label: '💎 일반셀러' },
                                    { key: 'foodtruck', label: '🚚 푸드트럭' },
                                ].map(opt => (
                                    <div key={opt.key} onClick={() => setSellerType(opt.key)} style={{
                                        flex: 1, padding: '10px 6px', borderRadius: T.radiusMd,
                                        textAlign: 'center', cursor: 'pointer',
                                        border: `1.5px solid ${sellerType === opt.key ? T.blue : T.border}`,
                                        background: sellerType === opt.key ? T.blueLt : T.white,
                                        fontSize: 13, fontWeight: 700,
                                        color: sellerType === opt.key ? T.blue : T.gray,
                                        transition: 'all 0.15s',
                                    }}>{opt.label}</div>
                                ))}
                            </div>
                        </div>

                        {/* 참가비 */}
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Banknote size={12} /> 참가비
                            </div>
                            <input
                                type="text"
                                placeholder="예) 무료 / 1일 80,000원 / 2일 150,000원 / 매출의 20%"
                                value={feeText}
                                onChange={e => setFeeText(e.target.value)}
                                style={inputStyle(!!feeText)}
                            />
                        </div>

                        {/* 모집 품목 */}
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6 }}>
                                모집 품목
                            </div>
                            <input
                                type="text"
                                placeholder="예) 먹거리 불가 / 악세사리 마감 / 핸드메이드만 가능"
                                value={recruitmentItems}
                                onChange={e => setRecruitmentItems(e.target.value)}
                                style={inputStyle(!!recruitmentItems)}
                            />
                        </div>

                        {/* 현장 지원 */}
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6 }}>
                                현장 지원
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                                {['1800 테이블', '1500 테이블', '의자', '파라솔', '천막', '스트링조명'].map(chip => (
                                    <div
                                        key={chip}
                                        onClick={() => setOnsiteSupport(prev => appendChip(prev, chip))}
                                        style={chipStyle}
                                    >+ {chip}</div>
                                ))}
                            </div>
                            <textarea
                                value={onsiteSupport}
                                onChange={e => setOnsiteSupport(e.target.value)}
                                placeholder={'예:\n- 현장 스텝 상주\n- 테이블·의자 제공\n- SNS 홍보'}
                                rows={3}
                                style={textareaStyle(!!onsiteSupport)}
                            />
                        </div>

                        {/* 주차 지원 */}
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6 }}>
                                주차 지원
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                                {['무료 주차', '지원 불가'].map(chip => (
                                    <div
                                        key={chip}
                                        onClick={() => setParkingInfo(chip)}
                                        style={chipStyle}
                                    >+ {chip}</div>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="예) 행사장 인근 공영주차장 이용 / 셀러 전용 주차 2대 제공"
                                value={parkingInfo}
                                onChange={e => setParkingInfo(e.target.value)}
                                style={inputStyle(!!parkingInfo)}
                            />
                        </div>

                        {/* 환불 규정 */}
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.gray, marginBottom: 6 }}>
                                환불 규정
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                                {['주최측 취소 시 환불'].map(chip => (
                                    <div
                                        key={chip}
                                        onClick={() => setRefundPolicy(prev => appendChip(prev, chip))}
                                        style={chipStyle}
                                    >+ {chip}</div>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="예) 행사 7일 전 100% 환불 / 3일 전 50% / 이후 환불 불가"
                                value={refundPolicy}
                                onChange={e => setRefundPolicy(e.target.value)}
                                style={inputStyle(!!refundPolicy)}
                            />
                        </div>

                    </div>
                </Section>

                {/* ── 신청 방법 ── */}
                <Section
                    title="신청 방법"
                    hint="지원자가 어떻게 신청하면 되는지 알려주세요."
                >
                    {profileDefaults.application && (
                        <button
                            type="button"
                            onClick={() => setApplicationMethod(profileDefaults.application)}
                            style={loadBtnStyle}
                        >
                            <Copy size={13} /> 저장된 정보 불러오기
                        </button>
                    )}
                    <textarea
                        value={applicationMethod}
                        onChange={e => setApplicationMethod(e.target.value)}
                        placeholder={'예:\n구글폼 링크: https://forms.gle/...\n인스타 DM: @flit_market\n이메일: apply@example.com\n\n신청 시 품목명, 예상 매출, 판매 경력을 함께 보내주세요.'}
                        rows={5}
                        style={textareaStyle(!!applicationMethod)}
                    />
                    {!profileDefaults.application && (
                        <div style={{ fontSize: 11, color: T.gray, marginTop: 8, lineHeight: 1.6 }}>
                            💡 마이페이지 &gt; 프로필 수정 &gt; 공고 기본 정보에서 기본 신청 방법을 저장하면 한 번에 불러올 수 있어요.
                        </div>
                    )}
                </Section>

                {/* ── 연락처 ── */}
                <Section title="연락처" hint="문의를 받을 연락처를 입력해주세요.">
                    {profileDefaults.contact && (
                        <button
                            type="button"
                            onClick={() => setContact(profileDefaults.contact)}
                            style={loadBtnStyle}
                        >
                            <Copy size={13} /> 저장된 정보 불러오기
                        </button>
                    )}
                    <input
                        type="text"
                        placeholder="예) 010-1234-5678 / 카카오 오픈채팅 링크"
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        style={inputStyle(!!contact)}
                    />
                    {!profileDefaults.contact && (
                        <div style={{ fontSize: 11, color: T.gray, marginTop: 8, lineHeight: 1.6 }}>
                            💡 마이페이지 &gt; 프로필 수정 &gt; 공고 기본 정보에서 기본 연락처를 저장하면 한 번에 불러올 수 있어요.
                        </div>
                    )}
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
                    {isSubmitting ? (editId ? '수정 중...' : '등록 중...') : (editId ? '공고 수정하기' : '공고 등록하기')}
                </button>

            </div>

            {/* ── 이전 공고 선택 모달 ── */}
            {showPastModal && (
                <div
                    onClick={(e) => { if (e.target === e.currentTarget) setShowPastModal(false); }}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 500,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                    }}
                >
                    <div style={{
                        width: '100%', maxWidth: 430, background: T.white,
                        borderTopLeftRadius: 20, borderTopRightRadius: 20,
                        maxHeight: '85vh', display: 'flex', flexDirection: 'column',
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '20px 20px 12px', borderBottom: `1px solid ${T.border}`,
                        }}>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>이전 공고 불러오기</div>
                                <div style={{ fontSize: 12, color: T.gray, marginTop: 4 }}>
                                    선택한 공고의 내용이 자동으로 채워져요. 날짜는 새로 입력해주세요.
                                </div>
                            </div>
                            <button
                                onClick={() => setShowPastModal(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0 }}
                            >
                                <X size={22} color={T.gray} />
                            </button>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px 20px' }}>
                            {pastRecs.map(rec => {
                                const evName = rec.event_instance?.base_event?.name || '행사 정보 없음';
                                const date = rec.created_at ? new Date(rec.created_at).toLocaleDateString('ko-KR') : '';
                                return (
                                    <div
                                        key={rec.id}
                                        onClick={() => applyPastRecruitment(rec)}
                                        style={{
                                            padding: '14px 16px', marginBottom: 8,
                                            background: T.bg, borderRadius: T.radiusMd,
                                            border: `1px solid ${T.border}`,
                                            cursor: 'pointer',
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        <div style={{ fontSize: 11, fontWeight: 700, color: T.blue, marginBottom: 4 }}>
                                            🎪 {evName}
                                        </div>
                                        <div style={{
                                            fontSize: 14, fontWeight: 700, color: T.text,
                                            marginBottom: 4,
                                            overflow: 'hidden', textOverflow: 'ellipsis',
                                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                                        }}>
                                            {rec.title || '(제목 없음)'}
                                        </div>
                                        <div style={{ fontSize: 11, color: T.gray }}>
                                            {date}
                                            {rec.event_instance?.location && ` · ${rec.event_instance.location}`}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
