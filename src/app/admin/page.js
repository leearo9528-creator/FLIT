'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    Shield, CheckCircle, XCircle, Users, Clock, ChevronDown, ChevronUp,
    Calendar, Megaphone, Upload, Trash2, Edit3, Plus, Building2,
} from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
import * as XLSX from 'xlsx';

/* ─── 공통 스타일 ─── */
const btnPrimary = { padding: '8px 16px', borderRadius: T.radiusMd, background: T.blue, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer' };
const btnDanger = { ...btnPrimary, background: T.white, color: T.red, border: `1.5px solid ${T.red}` };
const btnOutline = { ...btnPrimary, background: T.white, color: T.text, border: `1.5px solid ${T.border}` };
const cellStyle = { fontSize: 13, color: T.text, padding: '10px 8px', borderBottom: `1px solid ${T.border}`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 };
const thStyle = { ...cellStyle, fontWeight: 700, fontSize: 11, color: T.gray, background: T.bg, position: 'sticky', top: 0 };

/* ─── 탭 설정 ─── */
const TABS = [
    { key: 'pending', label: '승인 대기', icon: Clock },
    { key: 'events', label: '행사', icon: Calendar },
    { key: 'recruitments', label: '모집공고', icon: Megaphone },
    { key: 'organizers', label: '주최사', icon: Building2 },
    { key: 'upload', label: '엑셀 업로드', icon: Upload },
];

/* ─── InfoItem ─── */
function InfoItem({ label, value }) {
    return (
        <div>
            <div style={{ fontSize: 11, color: T.gray, marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{value}</div>
        </div>
    );
}

/* ─── StatCard ─── */
function StatCard({ label, count, color }) {
    return (
        <div style={{ flex: 1, background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: '12px 14px', boxShadow: T.shadowSm }}>
            <div style={{ fontSize: 11, color: T.gray, marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color }}>{count}</div>
        </div>
    );
}

/* ─── 승인 대기 카드 ─── */
function UserCard({ profile, onApprove, onReject }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, marginBottom: 10, boxShadow: T.shadowSm }}>
            <div onClick={() => setOpen(!open)} style={{ padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg,${T.blue},${T.blueDark||'#1B64DA'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff', fontWeight: 800 }}>
                        {(profile.name?.[0] || '?').toUpperCase()}
                    </div>
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{profile.name || '이름 없음'}</div>
                        <div style={{ fontSize: 12, color: T.gray }}>{profile.email}</div>
                    </div>
                </div>
                {open ? <ChevronUp size={16} color={T.gray}/> : <ChevronDown size={16} color={T.gray}/>}
            </div>
            {open && (
                <div style={{ padding: '0 16px 14px', borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                        <InfoItem label="주최사명" value={profile.organizer_name || '-'} />
                        <InfoItem label="가입일" value={profile.created_at ? new Date(profile.created_at).toLocaleDateString('ko-KR') : '-'} />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => onApprove(profile.id)} style={{ ...btnPrimary, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><CheckCircle size={14}/> 승인</button>
                        <button onClick={() => onReject(profile.id)} style={{ ...btnDanger, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><XCircle size={14}/> 거절</button>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── 데이터 테이블 ─── */
function DataTable({ columns, rows, onDelete, emptyMsg }) {
    if (rows.length === 0) return <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>{emptyMsg}</div>;
    return (
        <div style={{ overflowX: 'auto', background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>{columns.map(c => <th key={c.key} style={thStyle}>{c.label}</th>)}<th style={thStyle}></th></tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <tr key={row.id}>
                            {columns.map(c => <td key={c.key} style={cellStyle}>{c.render ? c.render(row) : (row[c.key] ?? '-')}</td>)}
                            <td style={{ ...cellStyle, textAlign: 'center' }}>
                                <Trash2 size={14} color={T.red} style={{ cursor: 'pointer' }} onClick={() => onDelete(row.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ─── 엑셀 업로드 ─── */
function ExcelUploader({ onComplete }) {
    const fileRef = useRef(null);
    const [status, setStatus] = useState('');
    const [log, setLog] = useState([]);
    const [uploading, setUploading] = useState(false);

    const addLog = (msg) => setLog(prev => [...prev, `${new Date().toLocaleTimeString()} ${msg}`]);

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true); setLog([]); setStatus('파싱 중...');

        try {
            const data = await file.arrayBuffer();
            const wb = XLSX.read(data);
            const sb = createClient();

            // 1. 주최사
            const orgSheet = wb.Sheets['1_주최사'];
            if (orgSheet) {
                const orgRows = XLSX.utils.sheet_to_json(orgSheet).filter(r => r['주최사명 *']);
                if (orgRows.length > 0) {
                    setStatus(`주최사 ${orgRows.length}건 입력 중...`);
                    for (const r of orgRows) {
                        const { error } = await sb.from('organizers').upsert({ name: r['주최사명 *'], description: r['소개 (선택)'] || null, logo_url: r['로고 URL (선택)'] || null }, { onConflict: 'name', ignoreDuplicates: true });
                        if (error) addLog(`주최사 "${r['주최사명 *']}" 실패: ${error.message}`);
                        else addLog(`주최사 "${r['주최사명 *']}" OK`);
                    }
                }
            }

            // 2. 행사
            const evtSheet = wb.Sheets['2_행사'];
            if (evtSheet) {
                const evtRows = XLSX.utils.sheet_to_json(evtSheet).filter(r => r['행사명 *']);
                if (evtRows.length > 0) {
                    setStatus(`행사 ${evtRows.length}건 입력 중...`);
                    for (const r of evtRows) {
                        const { error } = await sb.from('base_events').upsert({ name: r['행사명 *'], category: r['카테고리 *'] || null, description: r['소개 (선택)'] || null, image_url: r['이미지 URL (선택)'] || null }, { onConflict: 'name', ignoreDuplicates: false });
                        if (error) addLog(`행사 "${r['행사명 *']}" 실패: ${error.message}`);
                        else addLog(`행사 "${r['행사명 *']}" OK`);
                    }
                }
            }

            // 3. 행사 개최
            const instSheet = wb.Sheets['3_행사개최'];
            if (instSheet) {
                const instRows = XLSX.utils.sheet_to_json(instSheet).filter(r => r['행사명 *'] && r['장소 *']);
                if (instRows.length > 0) {
                    setStatus(`행사 개최 ${instRows.length}건 입력 중...`);
                    // base_event / organizer 이름 → id 매핑
                    const { data: allEvents } = await sb.from('base_events').select('id, name');
                    const { data: allOrgs } = await sb.from('organizers').select('id, name');
                    const evtMap = Object.fromEntries((allEvents || []).map(e => [e.name, e.id]));
                    const orgMap = Object.fromEntries((allOrgs || []).map(o => [o.name, o.id]));

                    for (const r of instRows) {
                        const baseId = evtMap[r['행사명 *']];
                        const orgId = orgMap[r['주최사명 *']];
                        if (!baseId) { addLog(`개최 "${r['행사명 *']}" 실패: 행사를 찾을 수 없음`); continue; }
                        const startDate = r['시작일 *'];
                        const endDate = r['종료일'] || startDate;
                        const { error } = await sb.from('event_instances').insert({
                            base_event_id: baseId, organizer_id: orgId || null,
                            location: r['장소 *'], location_sido: r['시/도 *'] || null,
                            event_date: startDate, event_date_end: endDate,
                        });
                        if (error) addLog(`개최 "${r['행사명 *']} ${startDate}" 실패: ${error.message}`);
                        else addLog(`개최 "${r['행사명 *']} ${startDate}" OK`);
                    }
                }
            }

            // 4. 모집공고
            const recSheet = wb.Sheets['4_모집공고'];
            if (recSheet) {
                const recRows = XLSX.utils.sheet_to_json(recSheet).filter(r => r['공고 제목 *']);
                if (recRows.length > 0) {
                    setStatus(`모집공고 ${recRows.length}건 입력 중...`);
                    // event_instance 찾기: base_event name → 가장 최근 instance
                    const { data: allInst } = await sb.from('event_instances').select('id, base_event:base_events(name)').order('event_date', { ascending: false });
                    const instMap = {};
                    (allInst || []).forEach(i => {
                        const name = i.base_event?.name;
                        if (name && !instMap[name]) instMap[name] = i.id;
                    });

                    for (const r of recRows) {
                        const instId = instMap[r['행사명 *']];
                        if (!instId) { addLog(`공고 "${r['공고 제목 *']}" 실패: 행사 개최를 찾을 수 없음`); continue; }
                        const fee = r['참가비(원)'] != null ? Number(r['참가비(원)']) : null;
                        const { error } = await sb.from('recruitments').insert({
                            event_instance_id: instId,
                            title: r['공고 제목 *'],
                            content: (r['공고 내용 *'] || '').replace(/\\n/g, '\n'),
                            fee: isNaN(fee) ? null : fee,
                            application_method: r['신청 방법'] || null,
                            start_date: r['모집 시작일'] || null,
                            end_date: r['모집 마감일 *'] || null,
                            status: r['상태'] || 'OPEN',
                        });
                        if (error) addLog(`공고 "${r['공고 제목 *']}" 실패: ${error.message}`);
                        else addLog(`공고 "${r['공고 제목 *']}" OK`);
                    }
                }
            }

            setStatus('완료!');
            addLog('--- 업로드 완료 ---');
            onComplete?.();
        } catch (err) {
            setStatus('오류 발생');
            addLog(`치명적 오류: ${err.message}`);
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
        }
    };

    return (
        <div style={{ padding: '0 16px' }}>
            <div style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 4 }}>엑셀 파일 업로드</div>
                <div style={{ fontSize: 12, color: T.gray, marginBottom: 16, lineHeight: 1.6 }}>
                    FLIT_데이터입력양식_v2.xlsx 파일을 선택하세요.<br/>
                    시트 순서: 1_주최사 → 2_행사 → 3_행사개최 → 4_모집공고
                </div>
                <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={handleUpload} disabled={uploading}
                    style={{ display: 'block', marginBottom: 12 }} />
                {status && (
                    <div style={{ fontSize: 13, fontWeight: 700, color: status === '완료!' ? T.green : status === '오류 발생' ? T.red : T.blue, marginBottom: 8 }}>
                        {uploading ? '⏳' : status === '완료!' ? '✅' : '❌'} {status}
                    </div>
                )}
            </div>
            {log.length > 0 && (
                <div style={{ background: '#1a1a2e', borderRadius: T.radiusLg, padding: 16, maxHeight: 300, overflowY: 'auto' }}>
                    {log.map((l, i) => (
                        <div key={i} style={{ fontSize: 12, color: l.includes('실패') ? '#EF4444' : l.includes('OK') ? '#10B981' : '#94A3B8', fontFamily: 'monospace', lineHeight: 1.8 }}>
                            {l}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ─── Admin Page ─── */
export default function AdminPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkingAdmin, setCheckingAdmin] = useState(true);
    const [tab, setTab] = useState('pending');
    const [pending, setPending] = useState([]);
    const [events, setEvents] = useState([]);
    const [instances, setInstances] = useState([]);
    const [recruitments, setRecruitments] = useState([]);
    const [orgList, setOrgList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;
        if (!user) { router.replace('/login'); return; }
        (async () => {
            try {
                const sb = createClient();
                const { data } = await sb.from('profiles').select('is_admin').eq('id', user.id).single();
                if (!data?.is_admin) { router.replace('/'); return; }
                setIsAdmin(true);
            } catch { router.replace('/'); }
            finally { setCheckingAdmin(false); }
        })();
    }, [user, authLoading, router]);

    const fetchAll = useCallback(async () => {
        if (!isAdmin) return;
        setLoading(true);
        try {
            const sb = createClient();
            const [pRes, eRes, iRes, rRes, oRes] = await Promise.all([
                sb.from('profiles').select('id, name, email, plan, organizer_name, created_at').eq('plan', 'organizer_pending').order('created_at', { ascending: false }),
                sb.from('base_events').select('id, name, category, total_reviews, total_instances, created_at').order('created_at', { ascending: false }),
                sb.from('event_instances').select('id, location, location_sido, event_date, event_date_end, base_event:base_events(name), organizer:organizers(name)').order('event_date', { ascending: false }).limit(100),
                sb.from('recruitments').select('id, title, status, fee, end_date, event_instance:event_instances(base_event:base_events(name))').order('created_at', { ascending: false }).limit(100),
                sb.from('organizers').select('id, name, total_reviews, total_instances, created_at').order('created_at', { ascending: false }),
            ]);
            setPending(pRes.data || []);
            setEvents(eRes.data || []);
            setInstances(iRes.data || []);
            setRecruitments(rRes.data || []);
            setOrgList(oRes.data || []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }, [isAdmin]);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    const handleApprove = async (id) => {
        if (!confirm('주최사로 승인하시겠습니까?')) return;
        const sb = createClient();
        await sb.from('profiles').update({ plan: 'organizer' }).eq('id', id);
        fetchAll();
    };
    const handleReject = async (id) => {
        if (!confirm('주최사 신청을 거절하시겠습니까?')) return;
        const sb = createClient();
        await sb.from('profiles').update({ plan: 'free' }).eq('id', id);
        fetchAll();
    };

    const handleDelete = (table) => async (id) => {
        if (!confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;
        const sb = createClient();
        const { error } = await sb.from(table).delete().eq('id', id);
        if (error) alert(`삭제 실패: ${error.message}`);
        else fetchAll();
    };

    if (authLoading || checkingAdmin || !isAdmin) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray, fontSize: 15 }}>로딩 중...</div>
        </div>
    );

    const evtCols = [
        { key: 'name', label: '행사명' },
        { key: 'category', label: '카테고리' },
        { key: 'total_instances', label: '개최' },
        { key: 'total_reviews', label: '리뷰' },
    ];
    const orgCols = [
        { key: 'name', label: '주최사명' },
        { key: 'total_instances', label: '행사' },
        { key: 'total_reviews', label: '리뷰' },
        { key: 'created_at', label: '등록일', render: r => r.created_at ? new Date(r.created_at).toLocaleDateString('ko-KR') : '-' },
    ];
    const recCols = [
        { key: 'title', label: '제목' },
        { key: 'event', label: '행사', render: r => r.event_instance?.base_event?.name || '-' },
        { key: 'fee', label: '참가비', render: r => r.fee == null ? '-' : r.fee === 0 ? '무료' : `${Number(r.fee).toLocaleString()}원` },
        { key: 'status', label: '상태', render: r => r.status === 'OPEN' ? '모집중' : '마감' },
        { key: 'end_date', label: '마감일', render: r => r.end_date ? new Date(r.end_date).toLocaleDateString('ko-KR') : '-' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 40 }}>
            <TopBar title={<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Shield size={18}/> 관리자</span>} back />

            {/* 통계 */}
            <div style={{ padding: '16px 16px 0', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <StatCard label="승인 대기" count={pending.length} color={T.red} />
                <StatCard label="행사" count={events.length} color={T.blue} />
                <StatCard label="공고" count={recruitments.length} color={T.green} />
                <StatCard label="주최사" count={orgList.length} color="#B45309" />
            </div>

            {/* 탭 */}
            <div style={{ display: 'flex', padding: '12px 16px 0', gap: 6, overflowX: 'auto' }}>
                {TABS.map(t => {
                    const active = tab === t.key;
                    return (
                        <button key={t.key} onClick={() => setTab(t.key)} style={{
                            padding: '8px 14px', borderRadius: T.radiusFull, whiteSpace: 'nowrap',
                            background: active ? T.text : T.white, color: active ? '#fff' : T.text,
                            border: active ? 'none' : `1.5px solid ${T.border}`,
                            fontSize: 12, fontWeight: 700, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 5,
                        }}>
                            <t.icon size={13}/> {t.label}
                            {t.key === 'pending' && pending.length > 0 && (
                                <span style={{ background: T.red, color: '#fff', fontSize: 10, fontWeight: 800, padding: '1px 5px', borderRadius: 8 }}>{pending.length}</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* 콘텐츠 */}
            <div style={{ padding: '12px 0 0' }}>
                {loading ? (
                    <div style={{ padding: '0 16px' }}>{Array(3).fill(0).map((_, i) => <div key={i} style={{ height: 50, background: T.grayLt, borderRadius: T.radiusLg, marginBottom: 8, animation: 'pulse 1.5s infinite' }}/>)}</div>
                ) : tab === 'pending' ? (
                    <div style={{ padding: '0 16px' }}>
                        {pending.length === 0
                            ? <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>승인 대기 중인 사용자가 없어요.</div>
                            : pending.map(p => <UserCard key={p.id} profile={p} onApprove={handleApprove} onReject={handleReject} />)
                        }
                    </div>
                ) : tab === 'events' ? (
                    <div style={{ padding: '0 16px' }}><DataTable columns={evtCols} rows={events} onDelete={handleDelete('base_events')} emptyMsg="등록된 행사가 없어요." /></div>
                ) : tab === 'recruitments' ? (
                    <div style={{ padding: '0 16px' }}><DataTable columns={recCols} rows={recruitments} onDelete={handleDelete('recruitments')} emptyMsg="등록된 공고가 없어요." /></div>
                ) : tab === 'organizers' ? (
                    <div style={{ padding: '0 16px' }}><DataTable columns={orgCols} rows={orgList} onDelete={handleDelete('organizers')} emptyMsg="등록된 주최사가 없어요." /></div>
                ) : tab === 'upload' ? (
                    <ExcelUploader onComplete={fetchAll} />
                ) : null}
            </div>
        </div>
    );
}
