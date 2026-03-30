'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MoreVertical, Edit3, Trash2, XCircle, CheckCircle } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';

function calcDDay(dateStr) {
    if (!dateStr) return null;
    const diff = Math.ceil((new Date(dateStr) - Date.now()) / 86400000);
    if (diff < 0) return { label: '마감', color: T.gray };
    if (diff === 0) return { label: 'D-Day', color: T.red };
    return { label: `D-${diff}`, color: diff <= 3 ? T.red : T.blue };
}

export default function MyRecruitmentsPage() {
    const router = useRouter();
    const { user, loading: authLoading, plan } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(null);

    useEffect(() => {
        if (!authLoading && !user) { router.replace('/login'); return; }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!user) return;
        if (plan !== 'organizer') { setLoading(false); return; }
        fetchItems();
    }, [user, plan]);

    async function fetchItems() {
        try {
            const sb = createClient();
            const { data: instances } = await sb.from('event_instances').select('id').eq('organizer_id', user.id);
            if (!instances?.length) { setLoading(false); return; }

            const { data } = await sb
                .from('recruitments')
                .select('id, title, status, end_date, created_at, event_instance:event_instances(location, event_date, base_event:base_events(name))')
                .in('event_instance_id', instances.map(i => i.id))
                .order('created_at', { ascending: false });

            setItems(data || []);
        } catch (err) { console.error('내 공고 로드 실패:', err); }
        finally { setLoading(false); }
    }

    const handleDelete = async (id) => {
        if (!confirm('이 공고를 삭제하시겠습니까? 되돌릴 수 없습니다.')) return;
        const sb = createClient();
        const { error } = await sb.from('recruitments').delete().eq('id', id);
        if (error) { alert('삭제 실패: ' + error.message); return; }
        setItems(prev => prev.filter(r => r.id !== id));
        setMenuOpen(null);
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'OPEN' ? 'CLOSED' : 'OPEN';
        const sb = createClient();
        const { error } = await sb.from('recruitments').update({ status: newStatus }).eq('id', id);
        if (error) { alert('상태 변경 실패: ' + error.message); return; }
        setItems(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
        setMenuOpen(null);
    };

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="내 공고 관리" back />

            {/* 공고 등록 버튼 */}
            {plan === 'organizer' && (
                <div style={{ padding: '12px 16px 0' }}>
                    <div onClick={() => router.push('/recruitments/write')} style={{
                        textAlign: 'center', padding: 14, borderRadius: T.radiusLg,
                        border: `1.5px dashed ${T.blue}`, color: T.blue,
                        fontSize: 14, fontWeight: 700, cursor: 'pointer', background: T.blueLt,
                    }}>
                        + 새 공고 등록하기
                    </div>
                </div>
            )}

            <div style={{ padding: '12px 16px 0' }}>
                {loading ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} style={{ height: 100, background: T.grayLt, borderRadius: T.radiusLg, marginBottom: 10, animation: 'pulse 1.5s infinite' }} />
                    ))
                ) : items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>
                        등록한 공고가 없어요.
                    </div>
                ) : (
                    items.map(rec => {
                        const dday = calcDDay(rec.end_date);
                        const event = rec.event_instance?.base_event;
                        const isOpen = rec.status === 'OPEN';
                        return (
                            <div key={rec.id} style={{
                                background: T.white, borderRadius: T.radiusLg,
                                border: `1px solid ${T.border}`, padding: '14px 16px',
                                marginBottom: 10, boxShadow: T.shadowSm, position: 'relative',
                            }}>
                                {/* 상단 */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{
                                            fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                                            background: isOpen ? T.greenLt : T.grayLt, color: isOpen ? T.green : T.gray,
                                        }}>
                                            {isOpen ? '모집중' : '마감됨'}
                                        </span>
                                        {dday && <span style={{ fontSize: 11, fontWeight: 700, color: dday.color }}>{dday.label}</span>}
                                    </div>
                                    <div onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === rec.id ? null : rec.id); }}
                                        style={{ padding: 4, cursor: 'pointer' }}>
                                        <MoreVertical size={18} color={T.gray} />
                                    </div>
                                </div>

                                {/* 메뉴 드롭다운 */}
                                {menuOpen === rec.id && (
                                    <div style={{
                                        position: 'absolute', top: 40, right: 16, zIndex: 10,
                                        background: T.white, borderRadius: T.radiusMd,
                                        border: `1px solid ${T.border}`, boxShadow: T.shadowMd,
                                        overflow: 'hidden', minWidth: 140,
                                    }}>
                                        <div onClick={() => { setMenuOpen(null); router.push(`/recruitments/${rec.id}`); }}
                                            style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: T.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${T.border}` }}>
                                            <Edit3 size={14} /> 상세 보기
                                        </div>
                                        <div onClick={() => handleToggleStatus(rec.id, rec.status)}
                                            style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: isOpen ? T.gray : T.green, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${T.border}` }}>
                                            {isOpen ? <><XCircle size={14} /> 마감 처리</> : <><CheckCircle size={14} /> 모집 재개</>}
                                        </div>
                                        <div onClick={() => handleDelete(rec.id)}
                                            style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: T.red, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <Trash2 size={14} /> 삭제
                                        </div>
                                    </div>
                                )}

                                {/* 내용 */}
                                <div onClick={() => router.push(`/recruitments/${rec.id}`)} style={{ cursor: 'pointer' }}>
                                    {event?.name && <div style={{ fontSize: 12, color: T.gray, marginBottom: 3 }}>{event.name}</div>}
                                    <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{rec.title}</div>
                                    {rec.event_instance?.location && (
                                        <div style={{ fontSize: 12, color: T.gray, marginTop: 4 }}>📍 {rec.event_instance.location}</div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
