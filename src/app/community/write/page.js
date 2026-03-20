'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, MapPin, UserCheck, UserX, Search, X, ChevronRight } from 'lucide-react';
import { T, inputStyle } from '@/lib/design-tokens';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';
import ChipGroup from '@/components/ui/ChipGroup';

/* ─── Constants ─────────────────────────────────────────────── */
const CATEGORIES = [
    { key: 'realtime', label: '📡 실시간 행사 현황' },
    { key: 'free', label: '💬 자유게시판' },
    { key: 'qna', label: '❓ 질문/답변' },
    { key: 'tips', label: '💡 팁/정보' },
];

const QUICK_CHIPS = {
    general: [
        { text: '👥 사람 엄청 많아요!', label: '인파 엄청' },
        { text: '🅿️ 주차 자리 없어요', label: '주차 만차' },
        { text: '🌧️ 비 오고 있어요', label: '우천 중' },
        { text: '💨 바람 강하게 불어요', label: '강풍 주의' },
        { text: '✅ 오늘 일찍 완판됐어요!', label: '조기 완판' },
    ],
    foodtruck: [
        { text: '⚡ 전력 공급 안정적이에요', label: '전력 안정' },
        { text: '🚰 수도 연결 정상이에요', label: '수도 OK' },
        { text: '🚛 진입로 좁으니 주의하세요', label: '진입로 좁음' },
    ],
};

/* ─── Random anon name generator ────────────────────────────── */
const ANON_ADJECTIVES = ['바쁜', '열정적인', '능숙한', '씩씩한', '수줍은', '활발한'];
const ANON_NOUNS = ['타코야키 셀러', '액세서리 장인', '푸드트럭 요리사', '핸드메이드 작가', '빈티지 큐레이터', '향수 제조자'];
function randomAnonName() {
    const adj = ANON_ADJECTIVES[Math.floor(Math.random() * ANON_ADJECTIVES.length)];
    const noun = ANON_NOUNS[Math.floor(Math.random() * ANON_NOUNS.length)];
    return `${adj} ${noun}`;
}

/* ─── Photo Upload Slot ──────────────────────────────────────── */
function PhotoSlots({ photos, onAdd, onRemove }) {
    const inputRef = useRef(null);
    const MAX = 5;

    const handleFileChange = e => {
        const files = Array.from(e.target.files);
        files.slice(0, MAX - photos.length).forEach(file => {
            const url = URL.createObjectURL(file);
            onAdd({ file, url });
        });
        e.target.value = '';
    };

    return (
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {/* Add button */}
            {photos.length < MAX && (
                <div
                    onClick={() => inputRef.current?.click()}
                    style={{
                        width: 80, height: 80, flexShrink: 0,
                        borderRadius: T.radiusMd, border: `2px dashed ${T.border}`,
                        background: T.bg, display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: 4,
                    }}
                >
                    <Camera size={20} color={T.gray} />
                    <span style={{ fontSize: 11, color: T.gray, fontWeight: 600 }}>{photos.length}/{MAX}</span>
                </div>
            )}
            <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFileChange} />

            {/* Previews */}
            {photos.map((p, i) => (
                <div key={i} style={{ position: 'relative', flexShrink: 0 }}>
                    <img src={p.url} alt="" style={{ width: 80, height: 80, borderRadius: T.radiusMd, objectFit: 'cover', border: `1px solid ${T.border}` }} />
                    <div
                        onClick={() => onRemove(i)}
                        style={{
                            position: 'absolute', top: -6, right: -6,
                            width: 20, height: 20, borderRadius: '50%',
                            background: T.text, color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', fontSize: 11, fontWeight: 700,
                        }}
                    >
                        ×
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function CommunityWritePage() {
    const router = useRouter();

    // identity
    const [isAnon, setIsAnon] = useState(true);
    const [anonName] = useState(randomAnonName());
    const [userNickname, setUserNickname] = useState('');

    // form fields
    const [mainType, setMainType] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // chips
    const [selectedChips, setSelectedChips] = useState(new Set());
    const [chipSubtype, setChipSubtype] = useState('general'); // 'general' | 'foodtruck'

    // location
    const [locationKeyword, setLocationKeyword] = useState('');
    const [locationSelected, setLocationSelected] = useState('');
    const [isLocOpen, setIsLocOpen] = useState(false);

    // event link
    const [events, setEvents] = useState([]);
    const [eventKeyword, setEventKeyword] = useState('');
    const [selectedEventId, setSelectedEventId] = useState('');
    const [isEventOpen, setIsEventOpen] = useState(false);

    // photos
    const [photos, setPhotos] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const locRef = useRef(null);
    const eventRef = useRef(null);

    /* fetch user + events */
    useEffect(() => {
        (async () => {
            const sb = createClient();
            const { data: { session } } = await sb.auth.getSession();
            if (session?.user) {
                const name = session.user.user_metadata?.full_name || session.user.user_metadata?.name || '셀러';
                setUserNickname(name);
            }
            const { data: eData } = await sb.from('base_events').select('id, name').order('name');
            if (eData) setEvents(eData);
        })();
    }, []);

    /* close dropdowns on outside click */
    useEffect(() => {
        const handler = e => {
            if (locRef.current && !locRef.current.contains(e.target)) setIsLocOpen(false);
            if (eventRef.current && !eventRef.current.contains(e.target)) setIsEventOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* reset chips when category changes */
    useEffect(() => {
        setSelectedChips(new Set());
    }, [category]);

    const toggleChip = text => {
        const next = new Set(selectedChips);
        if (next.has(text)) {
            next.delete(text);
            setContent(prev => prev.split('\n').filter(l => l.trim() !== text).join('\n').trim());
        } else {
            next.add(text);
            setContent(prev => prev ? `${prev}\n${text}` : text);
        }
        setSelectedChips(next);
    };

    const filteredEvents = events.filter(e =>
        e.name.toLowerCase().includes(eventKeyword.toLowerCase()) ||
        e.location?.toLowerCase().includes(eventKeyword.toLowerCase())
    );

    /* mock location suggestions */
    const LOCATIONS = ['반포 한강공원', '여의도 한강공원', '뚝섬 한강공원', '성수동 카페거리', '홍대 걷고싶은거리', '잠실 석촌호수', '강남 코엑스', '이태원 경리단길'];
    const filteredLocs = LOCATIONS.filter(l => l.includes(locationKeyword));

    const handleSubmit = async () => {
        if (!category) return alert('카테고리를 선택해주세요.');
        if (!title.trim()) return alert('제목을 입력해주세요.');
        if (!content.trim()) return alert('내용을 입력해주세요.');

        setIsSubmitting(true);
        try {
            const sb = createClient();
            const { data: { session } } = await sb.auth.getSession();
            if (!session?.user) { alert('로그인이 필요합니다.'); router.push('/login'); return; }

            const { error } = await sb.from('posts').insert({
                user_id: session.user.id,
                author: isAnon ? null : (session.user.user_metadata?.full_name || session.user.user_metadata?.name || '셀러'),
                seller_type: mainType || null,
                category: { realtime: '실시간 행사 현황', free: '자유게시판', qna: '질문/답변', tips: '팁/정보', trade: '사고팔고' }[category] || category,
                title: title.trim(),
                content: content.trim(),
                location: locationSelected || null,
                is_anonymous: isAnon,
                anonymous_name: isAnon ? anonName : null,
            });
            if (error) throw error;
            router.push('/community');
        } catch (err) {
            console.error('글쓰기 에러:', err);
            alert('저장 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const showQuickChips = category === 'realtime';

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title="글쓰기" back />

            <div className="page-padding">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* ── 정체성 토글 ── */}
                    <Card>
                        <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 12 }}>작성자 표시</div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <div
                                onClick={() => setIsAnon(false)}
                                style={{
                                    flex: 1, padding: '12px 14px', borderRadius: T.radiusLg, cursor: 'pointer',
                                    border: `2px solid ${!isAnon ? T.blue : T.border}`,
                                    background: !isAnon ? T.blueLt : T.white,
                                    display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.15s',
                                }}
                            >
                                <UserCheck size={20} color={!isAnon ? T.blue : T.gray} />
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: !isAnon ? T.blue : T.text }}>실명</div>
                                    <div style={{ fontSize: 11, color: T.gray, marginTop: 1 }}>{userNickname || '내 닉네임'}</div>
                                </div>
                            </div>
                            <div
                                onClick={() => setIsAnon(true)}
                                style={{
                                    flex: 1, padding: '12px 14px', borderRadius: T.radiusLg, cursor: 'pointer',
                                    border: `2px solid ${isAnon ? T.blue : T.border}`,
                                    background: isAnon ? T.blueLt : T.white,
                                    display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.15s',
                                }}
                            >
                                <UserX size={20} color={isAnon ? T.blue : T.gray} />
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: isAnon ? T.blue : T.text }}>익명</div>
                                    <div style={{ fontSize: 11, color: T.gray, marginTop: 1 }}>{anonName}</div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* ── 대카테고리 ── */}
                    <Card>
                        <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 12 }}>
                            누구를 위한 글인가요?
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {[
                                { key: 'seller', label: '💎 일반셀러' },
                                { key: 'foodtruck', label: '🚚 푸드트럭' },
                                { key: 'organizer', label: '🏢 주최사' },
                            ].map(t => (
                                <div
                                    key={t.key}
                                    onClick={() => setMainType(prev => prev === t.key ? '' : t.key)}
                                    style={{
                                        flex: 1, padding: '12px 6px', borderRadius: T.radiusMd,
                                        textAlign: 'center', cursor: 'pointer',
                                        border: `1.5px solid ${mainType === t.key ? T.blue : T.border}`,
                                        background: mainType === t.key ? T.blueLt : T.white,
                                        fontSize: 13, fontWeight: 700,
                                        color: mainType === t.key ? T.blue : T.gray,
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    {t.label}
                                </div>
                            ))}
                        </div>
                        <div style={{ fontSize: 11, color: T.gray, marginTop: 8 }}>선택하지 않으면 전체 공개입니다.</div>
                    </Card>

                    {/* ── 카테고리 (필수) ── */}
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <span style={{ fontSize: 15, fontWeight: 800, color: T.text }}>카테고리</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: T.red, background: T.redLt, padding: '2px 7px', borderRadius: T.radiusFull }}>필수</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {CATEGORIES.map(c => (
                                <button
                                    key={c.key}
                                    type="button"
                                    onClick={() => setCategory(c.key)}
                                    style={{
                                        padding: '8px 14px', borderRadius: T.radiusFull,
                                        fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                        border: `1.5px solid ${category === c.key ? T.blue : T.border}`,
                                        background: category === c.key ? T.blue : T.white,
                                        color: category === c.key ? '#fff' : T.gray,
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* ── 제목 + 내용 ── */}
                    <Card>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                            style={{
                                width: '100%', border: 'none', borderBottom: `1px solid ${T.border}`,
                                padding: '0 0 14px', fontSize: 17, fontWeight: 700,
                                color: T.text, outline: 'none', background: 'transparent',
                                marginBottom: 14, boxSizing: 'border-box',
                            }}
                        />
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder={category === 'realtime'
                                ? '지금 마켓 현장 분위기는 어때요?'
                                : '내용을 자유롭게 입력해주세요.'}
                            rows={6}
                            style={{
                                width: '100%', border: 'none', fontSize: 15, color: T.text,
                                outline: 'none', background: 'transparent', resize: 'none',
                                lineHeight: 1.7, fontFamily: 'inherit', boxSizing: 'border-box',
                            }}
                        />

                        {/* Quick chips — 실시간 현황 전용 */}
                        {showQuickChips && (
                            <div>
                                <div style={{ height: 1, background: T.border, margin: '12px 0' }} />
                                {/* subtype toggle */}
                                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                                    {[
                                        { key: 'general', label: '일반' },
                                        { key: 'foodtruck', label: '🚚 푸드트럭' },
                                    ].map(s => (
                                        <button
                                            key={s.key}
                                            type="button"
                                            onClick={() => setChipSubtype(s.key)}
                                            style={{
                                                padding: '5px 12px', borderRadius: T.radiusFull,
                                                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                                                border: `1.5px solid ${chipSubtype === s.key ? T.blue : T.border}`,
                                                background: chipSubtype === s.key ? T.blueLt : T.white,
                                                color: chipSubtype === s.key ? T.blue : T.gray,
                                                transition: 'all 0.15s',
                                            }}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                                <ChipGroup
                                    chips={QUICK_CHIPS[chipSubtype]}
                                    selected={selectedChips}
                                    onToggle={toggleChip}
                                />
                            </div>
                        )}
                    </Card>

                    {/* ── 사진 업로드 ── */}
                    <Card>
                        <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 12 }}>
                            사진 첨부 <span style={{ fontSize: 12, fontWeight: 500, color: T.gray }}>최대 5장</span>
                        </div>
                        <PhotoSlots
                            photos={photos}
                            onAdd={p => setPhotos(prev => [...prev, p])}
                            onRemove={i => setPhotos(prev => prev.filter((_, idx) => idx !== i))}
                        />
                    </Card>

                    {/* ── 위치 태그 ── */}
                    <Card>
                        <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 12 }}>
                            <MapPin size={16} color={T.blue} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                            장소 태그
                        </div>
                        <div ref={locRef} style={{ position: 'relative' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                background: T.bg, borderRadius: T.radiusMd,
                                border: `1.5px solid ${locationSelected ? T.blue : T.border}`, padding: '0 14px',
                            }}>
                                <Search size={15} color={T.gray} style={{ flexShrink: 0 }} />
                                <input
                                    type="text"
                                    placeholder="마켓 장소 검색... (예: 반포 한강공원)"
                                    value={locationKeyword}
                                    onChange={e => { setLocationKeyword(e.target.value); setIsLocOpen(true); if (locationSelected) setLocationSelected(''); }}
                                    onFocus={() => setIsLocOpen(true)}
                                    style={{ flex: 1, padding: '12px 0', border: 'none', background: 'transparent', fontSize: 14, color: T.text, outline: 'none' }}
                                />
                                {locationKeyword && <X size={15} color={T.gray} style={{ cursor: 'pointer' }} onClick={() => { setLocationKeyword(''); setLocationSelected(''); }} />}
                            </div>
                            {isLocOpen && locationKeyword && (
                                <div style={{
                                    position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                                    background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
                                    boxShadow: T.shadowMd, zIndex: 200,
                                }}>
                                    {filteredLocs.length === 0 ? (
                                        <div style={{ padding: '12px 16px', color: T.gray, fontSize: 13 }}>"{locationKeyword}" 직접 입력</div>
                                    ) : filteredLocs.map((loc, i) => (
                                        <div
                                            key={loc}
                                            onClick={() => { setLocationSelected(loc); setLocationKeyword(loc); setIsLocOpen(false); }}
                                            style={{
                                                padding: '12px 16px', cursor: 'pointer', fontSize: 14,
                                                fontWeight: 600, color: T.text,
                                                borderBottom: i < filteredLocs.length - 1 ? `1px solid ${T.border}` : 'none',
                                            }}
                                        >
                                            📍 {loc}
                                        </div>
                                    ))}
                                    <div
                                        onClick={() => { setLocationSelected(locationKeyword); setIsLocOpen(false); }}
                                        style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: T.blue, borderTop: `1px solid ${T.border}` }}
                                    >
                                        + "{locationKeyword}" 직접 입력
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* ── 행사 연결 (선택) ── */}
                    <Card>
                        <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 4 }}>행사 연결</div>
                        <div style={{ fontSize: 12, color: T.gray, marginBottom: 12 }}>선택 사항 — 관련 행사를 태그하면 노출이 늘어요</div>
                        <div ref={eventRef} style={{ position: 'relative' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                background: T.bg, borderRadius: T.radiusMd,
                                border: `1.5px solid ${selectedEventId ? T.blue : T.border}`, padding: '0 14px',
                            }}>
                                <Search size={15} color={T.gray} style={{ flexShrink: 0 }} />
                                <input
                                    type="text"
                                    placeholder="행사명 검색..."
                                    value={eventKeyword}
                                    onChange={e => { setEventKeyword(e.target.value); setIsEventOpen(true); if (selectedEventId) setSelectedEventId(''); }}
                                    onFocus={() => setIsEventOpen(true)}
                                    style={{ flex: 1, padding: '12px 0', border: 'none', background: 'transparent', fontSize: 14, color: T.text, outline: 'none' }}
                                />
                                {eventKeyword && <X size={15} color={T.gray} style={{ cursor: 'pointer' }} onClick={() => { setEventKeyword(''); setSelectedEventId(''); }} />}
                            </div>
                            {isEventOpen && (
                                <div style={{
                                    position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                                    background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
                                    boxShadow: T.shadowMd, maxHeight: 200, overflowY: 'auto', zIndex: 200,
                                }}>
                                    {filteredEvents.length === 0 ? (
                                        <div style={{ padding: '12px 16px', color: T.gray, fontSize: 13 }}>검색 결과가 없어요.</div>
                                    ) : filteredEvents.map((e, i) => (
                                        <div
                                            key={e.id}
                                            onClick={() => { setSelectedEventId(e.id); setEventKeyword(e.name); setIsEventOpen(false); }}
                                            style={{
                                                padding: '12px 16px', cursor: 'pointer',
                                                borderBottom: i < filteredEvents.length - 1 ? `1px solid ${T.border}` : 'none',
                                            }}
                                        >
                                            <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{e.name}</div>
                                            {e.location && <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>{e.location}</div>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* ── 게시 버튼 ── */}
                    <button
                        onClick={isSubmitting ? null : handleSubmit}
                        disabled={isSubmitting}
                        style={{
                            width: '100%', padding: 16, borderRadius: T.radiusMd,
                            background: isSubmitting ? T.gray : T.blue,
                            border: 'none', color: '#fff', fontSize: 16, fontWeight: 800,
                            cursor: isSubmitting ? 'default' : 'pointer', transition: 'background 0.15s',
                            marginTop: 8,
                        }}
                    >
                        {isSubmitting ? '게시 중...' : '게시하기'}
                    </button>

                </div>
            </div>
        </div>
    );
}
