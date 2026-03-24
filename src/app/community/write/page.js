'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, MapPin, UserCheck, UserX, Search, X, ChevronRight } from 'lucide-react';
import { T, inputStyle } from '@/lib/design-tokens';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

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
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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

    const filteredEvents = events.filter(e =>
        e.name.toLowerCase().includes(eventKeyword.toLowerCase()) ||
        e.location?.toLowerCase().includes(eventKeyword.toLowerCase())
    );

    /* mock location suggestions */
    const LOCATIONS = ['반포 한강공원', '여의도 한강공원', '뚝섬 한강공원', '성수동 카페거리', '홍대 걷고싶은거리', '잠실 석촌호수', '강남 코엑스', '이태원 경리단길'];
    const filteredLocs = LOCATIONS.filter(l => l.includes(locationKeyword));

    const handleSubmit = async () => {
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
                            placeholder="내용을 자유롭게 입력해주세요."
                            rows={6}
                            style={{
                                width: '100%', border: 'none', fontSize: 15, color: T.text,
                                outline: 'none', background: 'transparent', resize: 'none',
                                lineHeight: 1.7, fontFamily: 'inherit', boxSizing: 'border-box',
                            }}
                        />
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
