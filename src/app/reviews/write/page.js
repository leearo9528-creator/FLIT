'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { T, inputStyle } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function ReviewWritePage() {
    const router = useRouter();
    
    // 데이터 목록
    const [events, setEvents] = useState([]);
    const [organizers, setOrganizers] = useState([]);

    // 선택된 값
    const [selectedEventId, setSelectedEventId] = useState('');
    const [selectedOrgId, setSelectedOrgId] = useState('');

    // 검색 키워드 및 드롭다운 상태
    const [evtKeyword, setEvtKeyword] = useState('');
    const [orgKeyword, setOrgKeyword] = useState('');
    const [isEvtOpen, setIsEvtOpen] = useState(false);
    const [isOrgOpen, setIsOrgOpen] = useState(false);
    
    // 평가 항목
    const [rProfit, setRProfit] = useState(0);    // 수익성 (행사/장소)
    const [rTraffic, setRTraffic] = useState(0);  // 집객력 (행사/장소)
    const [rSupport, setRSupport] = useState(0);  // 운영지원 (주최측)
    const [rManners, setRManners] = useState(0);  // 주최측 매너 (주최측)

    const [title, setTitle] = useState('');       // 한줄평
    const [content, setContent] = useState('');   // 종합 리뷰
    const [pros, setPros] = useState('');         // 장점
    const [cons, setCons] = useState('');         // 단점
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
             const { createClient } = await import('@/utils/supabase/client');
             const sb = createClient();
             
             const { data: eData } = await sb.from('events').select('id, name, location').order('name');
             const { data: oData } = await sb.from('organizers').select('id, name').order('name');
             
             if (eData) setEvents(eData);
             if (oData) setOrganizers(oData);
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        if (!selectedEventId) return alert('참여하신 행사(장소)를 선택해주세요.');
        if (!selectedOrgId) return alert('주최측(기획사)을 선택해주세요.');
        if (!rProfit || !rTraffic || !rSupport || !rManners) return alert('모든 항목의 별점을 입력해주세요.');
        if (!title.trim()) return alert('한줄평(제목)을 입력해주세요.');

        setIsSubmitting(true);
        try {
            const { createClient } = await import('@/utils/supabase/client');
            const sb = createClient();
            const { data: { session } } = await sb.auth.getSession();

            if (!session?.user) {
                alert('로그인이 필요합니다.');
                router.push('/login');
                return;
            }

            const { error } = await sb.from('company_reviews').insert({
                event_id: selectedEventId,
                organizer_id: selectedOrgId,
                user_id: session.user.id,
                rating_profit: rProfit,
                rating_traffic: rTraffic,
                rating_support: rSupport,
                rating_manners: rManners,
                title: title,
                content: content,
                pros: pros,
                cons: cons,
                is_verified: false
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

    const filteredEvents = events.filter(e => e.name.includes(evtKeyword) || e.location?.includes(evtKeyword));
    const filteredOrganizers = organizers.filter(o => o.name.includes(orgKeyword));
    const overall = rProfit && rTraffic && rSupport && rManners ? ((rProfit + rTraffic + rSupport + rManners) / 4).toFixed(1) : null;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 60 }}>
            <TopBar title="행사 리뷰 작성" hasBack onBack={() => router.back()} />

            <div className="page-padding">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    
                    {/* 대상 선택 구역 */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 18 }}>어디서, 누구와 진행하셨나요?</div>
                        
                        {/* 행사/장소 선택 */}
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ fontSize: 13, fontWeight: 700, color: T.gray, marginBottom: 8, display: 'block' }}>진행된 행사(장소)</label>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', background: T.bg, borderRadius: T.radiusMd,
                                    border: `1.5px solid ${selectedEventId ? T.blue : T.border}`, padding: '0 16px',
                                }}>
                                    <input
                                        type="text"
                                        placeholder="어떤 행사였나요? (예: 한강 달빛야시장)"
                                        value={evtKeyword}
                                        onChange={(e) => { setEvtKeyword(e.target.value); setIsEvtOpen(true); if(selectedEventId) setSelectedEventId(''); }}
                                        onFocus={() => setIsEvtOpen(true)}
                                        style={{ flex: 1, padding: '13px 0', border: 'none', background: 'transparent', fontSize: 14, color: T.text, outline: 'none' }}
                                    />
                                </div>
                                {isEvtOpen && (
                                    <div style={{
                                        position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                                        background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxHeight: 200, overflowY: 'auto', zIndex: 100
                                    }}>
                                        {filteredEvents.map(e => (
                                            <div key={e.id} onClick={() => { setSelectedEventId(e.id); setEvtKeyword(e.name); setIsEvtOpen(false); }}
                                                style={{ padding: '12px 16px', borderBottom: `1px solid ${T.border}`, cursor: 'pointer' }}>
                                                <div style={{ fontSize: 14, fontWeight: 700 }}>{e.name}</div>
                                                <div style={{ fontSize: 12, color: T.gray }}>{e.location}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 주최측 선택 */}
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 700, color: T.gray, marginBottom: 8, display: 'block' }}>주최측(기획사)</label>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', background: T.bg, borderRadius: T.radiusMd,
                                    border: `1.5px solid ${selectedOrgId ? T.blue : T.border}`, padding: '0 16px',
                                }}>
                                    <input
                                        type="text"
                                        placeholder="주최측을 선택해주세요"
                                        value={orgKeyword}
                                        onChange={(e) => { setOrgKeyword(e.target.value); setIsOrgOpen(true); if(selectedOrgId) setSelectedOrgId(''); }}
                                        onFocus={() => setIsOrgOpen(true)}
                                        style={{ flex: 1, padding: '13px 0', border: 'none', background: 'transparent', fontSize: 14, color: T.text, outline: 'none' }}
                                    />
                                </div>
                                {isOrgOpen && (
                                    <div style={{
                                        position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                                        background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxHeight: 200, overflowY: 'auto', zIndex: 100
                                    }}>
                                        {filteredOrganizers.map(o => (
                                            <div key={o.id} onClick={() => { setSelectedOrgId(o.id); setOrgKeyword(o.name); setIsOrgOpen(false); }}
                                                style={{ padding: '12px 16px', borderBottom: `1px solid ${T.border}`, cursor: 'pointer' }}>
                                                <div style={{ fontSize: 14, fontWeight: 700 }}>{o.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* 항목별 별점 */}
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
                            <div style={{ fontSize: 12, color: T.gray, marginBottom: 12 }}>📍 행사/장소 관련</div>
                            {[
                                ['💰 수익성 (매출)', rProfit, setRProfit],
                                ['👥 집객력 (유동인구)', rTraffic, setRTraffic]
                            ].map(([l, v, sv]) => (
                                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: T.text, width: 140, flexShrink: 0 }}>{l}</span>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <span key={s} onClick={() => sv(s)} style={{
                                                fontSize: 26, cursor: 'pointer',
                                                filter: s <= v ? 'none' : 'grayscale(1) opacity(0.3)',
                                                transition: 'filter 0.1s',
                                            }}>⭐</span>
                                        ))}
                                    </div>
                                    {v > 0 && <span style={{ fontSize: 15, fontWeight: 800, color: T.text }}>{v}.0</span>}
                                </div>
                            ))}
                        </div>

                        <div>
                            <div style={{ fontSize: 12, color: T.gray, marginBottom: 12 }}>🏢 주최측/기획사 관련</div>
                            {[
                                ['🤝 운영지원', rSupport, setRSupport],
                                ['😊 주최측 매너', rManners, setRManners]
                            ].map(([l, v, sv]) => (
                                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: T.text, width: 140, flexShrink: 0 }}>{l}</span>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <span key={s} onClick={() => sv(s)} style={{
                                                fontSize: 26, cursor: 'pointer',
                                                filter: s <= v ? 'none' : 'grayscale(1) opacity(0.3)',
                                                transition: 'filter 0.1s',
                                            }}>⭐</span>
                                        ))}
                                    </div>
                                    {v > 0 && <span style={{ fontSize: 15, fontWeight: 800, color: T.text }}>{v}.0</span>}
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* 한줄평 & 상세리뷰 */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 14 }}>상세 내용</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 8, display: 'block' }}>한줄평 (제목)</label>
                                <input value={title} onChange={(e) => setTitle(e.target.value)}
                                    placeholder="어떤 점이 가장 기억에 남나요?" style={inputStyle(title)} />
                            </div>
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 8, display: 'block' }}>장점 <span style={{ color: T.blue, fontWeight: 400 }}>(선택)</span></label>
                                <textarea value={pros} onChange={(e) => setPros(e.target.value)}
                                    placeholder="좋았던 점을 적어주세요." rows={2}
                                    style={{ ...inputStyle(pros), resize: 'none' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 8, display: 'block' }}>단점 <span style={{ color: T.blue, fontWeight: 400 }}>(선택)</span></label>
                                <textarea value={cons} onChange={(e) => setCons(e.target.value)}
                                    placeholder="아쉬웠던 점을 적어주세요." rows={2}
                                    style={{ ...inputStyle(cons), resize: 'none' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 8, display: 'block' }}>종합 평가 <span style={{ color: T.blue, fontWeight: 400 }}>(선택)</span></label>
                                <textarea value={content} onChange={(e) => setContent(e.target.value)}
                                    placeholder="자세한 경험을 공유해주세요." rows={4}
                                    style={{ ...inputStyle(content), resize: 'none' }} />
                            </div>
                        </div>
                    </Card>

                    {/* 등록 버튼 */}
                    <div
                        onClick={isSubmitting ? null : handleSubmit}
                        style={{
                            background: isSubmitting ? T.gray : T.blue, borderRadius: T.radiusMd,
                            padding: 18, textAlign: 'center', color: '#fff', fontSize: 16,
                            fontWeight: 800, cursor: isSubmitting ? 'default' : 'pointer',
                        }}
                    >
                        {isSubmitting ? '처리 중...' : '리뷰 등록하고 무료 혜택 받기'}
                    </div>
                </div>
            </div>
        </div>
    );
}
