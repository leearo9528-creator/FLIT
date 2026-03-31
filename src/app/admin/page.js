'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    Shield, CheckCircle, XCircle, Users, Clock, ChevronDown, ChevronUp,
    Calendar, Megaphone, Upload, Trash2, Edit3, Plus, Building2, FileText, Bell,
} from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
// XLSX는 사용 시점에 dynamic import

/* ─── 공통 스타일 ─── */
const btnPrimary = { padding: '8px 16px', borderRadius: T.radiusMd, background: T.blue, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer' };
const btnDanger = { ...btnPrimary, background: T.white, color: T.red, border: `1.5px solid ${T.red}` };
const btnOutline = { ...btnPrimary, background: T.white, color: T.text, border: `1.5px solid ${T.border}` };
const cellStyle = { fontSize: 13, color: T.text, padding: '10px 8px', borderBottom: `1px solid ${T.border}`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 };
const thStyle = { ...cellStyle, fontWeight: 700, fontSize: 11, color: T.gray, background: T.bg, position: 'sticky', top: 0 };

/* ─── 관리자 비밀번호 ─── */
const ADMIN_PASSWORD = 'flit2026!';

/* ─── 탭 설정 ─── */
const TABS = [
    { key: 'notices', label: '공지', icon: Bell },
    { key: 'events', label: '행사', icon: Calendar },
    { key: 'recruitments', label: '공고', icon: Megaphone },
    { key: 'organizers', label: '주최사', icon: Building2 },
    { key: 'users', label: '회원', icon: Users },
    { key: 'upload', label: '업로드', icon: Upload },
    { key: 'paste', label: '텍스트', icon: FileText },
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
            const XLSX = await import('xlsx');
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
                <div style={{ fontSize: 12, color: T.gray, marginBottom: 12, lineHeight: 1.6 }}>
                    FLIT_데이터입력양식_v2.xlsx 파일을 선택하세요.<br/>
                    시트 순서: 1_주최사 → 2_행사 → 3_행사개최 → 4_모집공고
                </div>
                <a href="/data_template.xlsx" download="FLIT_데이터입력양식.xlsx"
                    style={{ display: 'inline-block', padding: '8px 16px', borderRadius: T.radiusMd, background: T.blueLt, color: T.blue, fontSize: 12, fontWeight: 700, textDecoration: 'none', marginBottom: 14 }}>
                    📥 입력 양식 다운로드
                </a>
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

/* ─── 텍스트 파서 ─── */
const PARSE_KEYS = [
    { pattern: /\[마켓[·・]행사[·・]샵인샵\]\s*명칭|마켓명|행사명/i, key: 'eventName', label: '행사명' },
    { pattern: /주제|카테고리/i, key: 'category', label: '카테고리' },
    { pattern: /주최[·・]주관|주최사/i, key: 'organizer', label: '주최사' },
    { pattern: /개최.*장소|입점.*장소|장소/i, key: 'location', label: '장소' },
    { pattern: /개최.*일정|입점.*일정|일정/i, key: 'schedule', label: '일정' },
    { pattern: /모집기간/i, key: 'recruitPeriod', label: '모집기간' },
    { pattern: /모집규모/i, key: 'scale', label: '모집규모' },
    { pattern: /모집조건/i, key: 'conditions', label: '모집조건' },
    { pattern: /참가.*비용|입점.*비용|참가비/i, key: 'fee', label: '참가비' },
    { pattern: /환불규정|환불/i, key: 'refund', label: '환불규정' },
    { pattern: /유동인구/i, key: 'traffic', label: '유동인구' },
    { pattern: /주차지원|주차/i, key: 'parking', label: '주차지원' },
    { pattern: /현장지원/i, key: 'support', label: '현장지원' },
    { pattern: /신청방법|접수/i, key: 'applyMethod', label: '신청방법' },
    { pattern: /담당자.*연락처|연락처/i, key: 'contact', label: '담당자 연락처' },
    { pattern: /현장소개|현장.*사진/i, key: 'description', label: '현장소개' },
];

function parsePostText(raw) {
    if (!raw) return {};
    const lines = raw.split('\n');
    const result = {};
    let currentKey = null;
    let buffer = [];

    const flush = () => {
        if (currentKey && buffer.length > 0) {
            result[currentKey] = buffer.join('\n').replace(/^👉\s*/gm, '').trim();
        }
        buffer = [];
    };

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // ✅ 로 시작하는 라벨 감지
        if (trimmed.startsWith('✅')) {
            flush();
            const matched = PARSE_KEYS.find(k => k.pattern.test(trimmed));
            currentKey = matched ? matched.key : null;
            // 같은 줄에 👉 값이 있으면 바로 처리
            const arrow = trimmed.indexOf('👉');
            if (arrow !== -1) {
                buffer.push(trimmed.slice(arrow + 1).trim());
            }
        } else if (trimmed.startsWith('👉')) {
            buffer.push(trimmed.replace(/^👉\s*/, ''));
        } else if (currentKey) {
            buffer.push(trimmed);
        }
    }
    flush();
    return result;
}

/* ─── 공지사항 관리 ─── */
function NoticeManager() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null); // null | 'new' | notice object
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [saving, setSaving] = useState(false);

    const fetchNotices = async () => {
        const sb = createClient();
        const { data } = await sb.from('notices').select('*').order('created_at', { ascending: false });
        setNotices(data || []);
        setLoading(false);
    };

    useEffect(() => { fetchNotices(); }, []);

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) return alert('제목과 내용을 입력하세요.');
        setSaving(true);
        const sb = createClient();
        if (editing === 'new') {
            await sb.from('notices').insert({ title: title.trim(), content: content.trim() });
        } else {
            await sb.from('notices').update({ title: title.trim(), content: content.trim() }).eq('id', editing.id);
        }
        setEditing(null); setTitle(''); setContent('');
        setSaving(false); fetchNotices();
    };

    const handleDelete = async (id) => {
        if (!confirm('이 공지를 삭제하시겠습니까?')) return;
        const sb = createClient();
        await sb.from('notices').delete().eq('id', id);
        fetchNotices();
    };

    const startEdit = (notice) => {
        setEditing(notice);
        setTitle(notice.title);
        setContent(notice.content);
    };

    return (
        <div style={{ padding: '0 16px' }}>
            {/* 작성/수정 폼 */}
            {editing ? (
                <div style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: 20, marginBottom: 16 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 12 }}>
                        {editing === 'new' ? '새 공지 작성' : '공지 수정'}
                    </div>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목"
                        style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, outline: 'none', marginBottom: 10, boxSizing: 'border-box' }} />
                    <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="내용" rows={8}
                        style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, outline: 'none', resize: 'vertical', lineHeight: 1.7, fontFamily: 'inherit', boxSizing: 'border-box' }} />
                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                        <button onClick={() => { setEditing(null); setTitle(''); setContent(''); }} style={btnOutline}>취소</button>
                        <button onClick={handleSave} disabled={saving} style={{ ...btnPrimary, flex: 1 }}>{saving ? '저장 중...' : '저장'}</button>
                    </div>
                </div>
            ) : (
                <button onClick={() => { setEditing('new'); setTitle(''); setContent(''); }}
                    style={{ ...btnPrimary, width: '100%', marginBottom: 16, padding: '12px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <Plus size={14} /> 새 공지 작성
                </button>
            )}

            {/* 목록 */}
            {loading ? (
                Array(3).fill(0).map((_, i) => <div key={i} style={{ height: 60, background: T.grayLt, borderRadius: T.radiusLg, marginBottom: 8, animation: 'pulse 1.5s infinite' }} />)
            ) : notices.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>등록된 공지가 없어요.</div>
            ) : (
                notices.map(n => (
                    <div key={n.id} style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: '14px 16px', marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{n.title}</div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <Edit3 size={14} color={T.blue} style={{ cursor: 'pointer' }} onClick={() => startEdit(n)} />
                                <Trash2 size={14} color={T.red} style={{ cursor: 'pointer' }} onClick={() => handleDelete(n.id)} />
                            </div>
                        </div>
                        <div style={{ fontSize: 12, color: T.gray }}>{new Date(n.created_at).toLocaleDateString('ko-KR')} · {n.content.slice(0, 50)}...</div>
                    </div>
                ))
            )}
        </div>
    );
}

function TextPasteParser({ onComplete }) {
    const [raw, setRaw] = useState('');
    const [parsed, setParsed] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleParse = () => {
        if (!raw.trim()) return;
        setParsed(parsePostText(raw));
        setSaved(false);
    };

    const handleSave = async () => {
        if (!parsed?.eventName) return alert('행사명을 파싱할 수 없습니다. 텍스트를 확인해주세요.');
        setSaving(true);
        try {
            const sb = createClient();

            // 1. 주최사
            let organizerId = null;
            if (parsed.organizer) {
                // 괄호 안 사업자번호 제거, 이름만 추출
                const orgName = parsed.organizer.replace(/\s*\(.*\)\s*/, '').trim();
                const { data: existing } = await sb.from('organizers').select('id').eq('name', orgName).maybeSingle();
                if (existing) {
                    organizerId = existing.id;
                } else {
                    const { data: newOrg, error } = await sb.from('organizers').insert({ name: orgName }).select('id').single();
                    if (error) throw new Error(`주최사 생성 실패: ${error.message}`);
                    organizerId = newOrg.id;
                }
            }

            // 2. 행사 (base_event)
            const { data: existingEvt } = await sb.from('base_events').select('id').eq('name', parsed.eventName).maybeSingle();
            let baseEventId;
            if (existingEvt) {
                baseEventId = existingEvt.id;
            } else {
                const cat = parsed.category || null;
                const { data: newEvt, error } = await sb.from('base_events').insert({
                    name: parsed.eventName,
                    category: cat,
                    description: parsed.description || null,
                }).select('id').single();
                if (error) throw new Error(`행사 생성 실패: ${error.message}`);
                baseEventId = newEvt.id;
            }

            // 3. 행사 개최 (event_instance)
            const locationSido = parsed.location ? parsed.location.split(/\s+/)[0] : null;
            const { data: inst, error: instErr } = await sb.from('event_instances').insert({
                base_event_id: baseEventId,
                organizer_id: organizerId,
                location: parsed.location || '장소 미정',
                location_sido: locationSido,
            }).select('id').single();
            if (instErr) throw new Error(`행사 개최 생성 실패: ${instErr.message}`);

            // 4. 모집공고
            // 참가비 파싱: 숫자 추출 시도
            let fee = null;
            if (parsed.fee) {
                const nums = parsed.fee.match(/(\d[\d,]*)\s*원/);
                if (nums) fee = parseInt(nums[1].replace(/,/g, ''));
            }

            // 공고 내용 조합
            const contentParts = [];
            if (parsed.conditions) contentParts.push(`■ 모집조건\n${parsed.conditions}`);
            if (parsed.scale) contentParts.push(`■ 모집규모\n${parsed.scale}`);
            if (parsed.fee) contentParts.push(`■ 참가비\n${parsed.fee}`);
            if (parsed.refund) contentParts.push(`■ 환불규정\n${parsed.refund}`);
            if (parsed.support) contentParts.push(`■ 현장지원\n${parsed.support}`);
            if (parsed.parking) contentParts.push(`■ 주차\n${parsed.parking}`);
            if (parsed.traffic) contentParts.push(`■ 유동인구\n${parsed.traffic}`);
            if (parsed.contact) contentParts.push(`■ 담당자 연락처\n${parsed.contact}`);
            if (parsed.description) contentParts.push(`■ 현장소개\n${parsed.description}`);

            const title = `${parsed.eventName} 셀러 모집`;
            const content = contentParts.join('\n\n') || parsed.eventName;
            const appMethod = parsed.applyMethod || parsed.contact || null;

            const { error: recErr } = await sb.from('recruitments').insert({
                event_instance_id: inst.id,
                title,
                content,
                fee,
                application_method: appMethod,
                status: 'OPEN',
            });
            if (recErr) throw new Error(`공고 생성 실패: ${recErr.message}`);

            setSaved(true);
            onComplete?.();
        } catch (err) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => { setRaw(''); setParsed(null); setSaved(false); };

    return (
        <div style={{ padding: '0 16px' }}>
            {/* 입력 */}
            <div style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 4 }}>모집글 텍스트 붙여넣기</div>
                <div style={{ fontSize: 12, color: T.gray, marginBottom: 16, lineHeight: 1.6 }}>
                    문화상점, 셀러카페 등의 모집글을 그대로 복사해서 붙여넣으세요.<br/>
                    ✅ 키워드를 자동으로 인식해서 데이터를 추출합니다.
                </div>
                <textarea
                    value={raw}
                    onChange={e => { setRaw(e.target.value); setParsed(null); setSaved(false); }}
                    placeholder={"✅[마켓·행사·샵인샵] 명칭\n👉 서울밤도깨비야시장\n\n✅주최·주관\n👉 서울플리마켓협회\n\n... 전체 텍스트를 붙여넣으세요"}
                    rows={10}
                    style={{
                        width: '100%', padding: 14, fontSize: 13, color: T.text,
                        border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd,
                        outline: 'none', background: T.bg, resize: 'vertical',
                        lineHeight: 1.7, fontFamily: 'inherit', boxSizing: 'border-box',
                    }}
                />
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button onClick={handleParse} disabled={!raw.trim()} style={{ ...btnPrimary, opacity: raw.trim() ? 1 : 0.5 }}>파싱하기</button>
                    <button onClick={handleReset} style={btnOutline}>초기화</button>
                </div>
            </div>

            {/* 미리보기 */}
            {parsed && (
                <div style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: 20, marginBottom: 16 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 6 }}>파싱 결과 수정</div>
                    <div style={{ fontSize: 12, color: T.gray, marginBottom: 14 }}>자동 파싱된 값을 확인하고 필요시 직접 수정하세요.</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {PARSE_KEYS.map(k => (
                            <div key={k.key} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: T.blue, width: 90, flexShrink: 0, paddingTop: 8 }}>{k.label}</span>
                                {(parsed[k.key] || '').includes('\n') || (parsed[k.key] || '').length > 60 ? (
                                    <textarea
                                        value={parsed[k.key] || ''}
                                        onChange={e => setParsed({ ...parsed, [k.key]: e.target.value })}
                                        rows={3}
                                        style={{ flex: 1, padding: '8px 10px', fontSize: 13, color: T.text, border: `1px solid ${T.border}`, borderRadius: T.radiusMd, outline: 'none', background: T.bg, resize: 'vertical', lineHeight: 1.6, fontFamily: 'inherit', boxSizing: 'border-box' }}
                                    />
                                ) : (
                                    <input
                                        value={parsed[k.key] || ''}
                                        onChange={e => setParsed({ ...parsed, [k.key]: e.target.value })}
                                        style={{ flex: 1, padding: '8px 10px', fontSize: 13, color: T.text, border: `1px solid ${T.border}`, borderRadius: T.radiusMd, outline: 'none', background: T.bg, boxSizing: 'border-box' }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {parsed.eventName && (
                        <div style={{ marginTop: 16, padding: 14, background: T.blueLt, borderRadius: T.radiusMd }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: T.blue, marginBottom: 8 }}>저장될 데이터</div>
                            <div style={{ fontSize: 12, color: T.text, lineHeight: 1.8 }}>
                                <b>주최사:</b> {parsed.organizer?.replace(/\s*\(.*\)\s*/, '').trim() || '(없음)'}<br/>
                                <b>행사:</b> {parsed.eventName}<br/>
                                <b>장소:</b> {parsed.location || '미정'}<br/>
                                <b>모집공고:</b> {parsed.eventName} 셀러 모집
                            </div>
                        </div>
                    )}

                    {!saved ? (
                        <button onClick={handleSave} disabled={saving || !parsed.eventName}
                            style={{ ...btnPrimary, marginTop: 14, width: '100%', padding: '14px 0', fontSize: 15, opacity: parsed.eventName ? 1 : 0.5 }}>
                            {saving ? '저장 중...' : 'DB에 저장하기'}
                        </button>
                    ) : (
                        <div style={{ marginTop: 14, textAlign: 'center', padding: 14, background: T.greenLt, borderRadius: T.radiusMd, fontSize: 14, fontWeight: 700, color: T.green }}>
                            ✅ 저장 완료! (주최사 + 행사 + 개최 + 공고)
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ─── 비밀번호 게이트 ─── */
function PasswordGate({ onPass }) {
    const [pw, setPw] = useState('');
    const [error, setError] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (pw === ADMIN_PASSWORD) { onPass(); }
        else { setError(true); setPw(''); }
    };
    return (
        <div style={{ minHeight: '100vh', background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit} style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: 32, width: 320, textAlign: 'center' }}>
                <Shield size={32} color={T.blue} style={{ marginBottom: 12 }} />
                <div style={{ fontSize: 18, fontWeight: 800, color: T.text, marginBottom: 4 }}>관리자 인증</div>
                <div style={{ fontSize: 13, color: T.gray, marginBottom: 20 }}>비밀번호를 입력하세요</div>
                <input type="password" value={pw} onChange={e => { setPw(e.target.value); setError(false); }}
                    placeholder="비밀번호" autoFocus
                    style={{ width: '100%', padding: '12px 14px', fontSize: 14, border: `1.5px solid ${error ? T.red : T.border}`, borderRadius: T.radiusMd, outline: 'none', boxSizing: 'border-box', marginBottom: 8 }} />
                {error && <div style={{ fontSize: 12, color: T.red, marginBottom: 8 }}>비밀번호가 틀렸습니다.</div>}
                <button type="submit" style={{ width: '100%', padding: '12px 0', borderRadius: T.radiusMd, background: T.blue, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>확인</button>
            </form>
        </div>
    );
}

/* ─── Admin Page ─── */
export default function AdminPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkingAdmin, setCheckingAdmin] = useState(true);
    const [pwPassed, setPwPassed] = useState(false);
    const [tab, setTab] = useState('notices');
    const [events, setEvents] = useState([]);
    const [recruitments, setRecruitments] = useState([]);
    const [orgList, setOrgList] = useState([]);
    const [userList, setUserList] = useState([]);
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
            const [eRes, rRes, oRes, uRes] = await Promise.all([
                sb.from('base_events').select('id, name, category, total_reviews, total_instances, created_at').order('created_at', { ascending: false }),
                sb.from('recruitments').select('id, title, status, fee, end_date, event_instance:event_instances(base_event:base_events(name))').order('created_at', { ascending: false }).limit(100),
                sb.from('organizers').select('id, name, total_reviews, total_instances, created_at').order('created_at', { ascending: false }),
                sb.from('profiles').select('id, name, email, plan, seller_type, review_count, created_at').order('created_at', { ascending: false }).limit(100),
            ]);
            setEvents(eRes.data || []);
            setRecruitments(rRes.data || []);
            setOrgList(oRes.data || []);
            setUserList(uRes.data || []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }, [isAdmin]);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    const handleDelete = (table) => async (id) => {
        if (!confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;
        try {
            const sb = createClient();
            const { error, count } = await sb.from(table).delete().eq('id', id);
            if (error) throw error;
            alert('삭제 완료');
            fetchAll();
        } catch (err) {
            alert(`삭제 실패: ${err.message}\n\nRLS 정책이 적용되지 않았을 수 있습니다.\nSupabase SQL 에디터에서 add_admin_delete_policies.sql을 실행해주세요.`);
            console.error('삭제 에러:', err);
        }
    };

    if (authLoading || checkingAdmin) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray, fontSize: 15 }}>로딩 중...</div>
        </div>
    );
    if (!isAdmin) return null;
    if (!pwPassed) return <PasswordGate onPass={() => setPwPassed(true)} />;

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
    const userCols = [
        { key: 'name', label: '이름' },
        { key: 'email', label: '이메일' },
        { key: 'plan', label: '역할', render: r => r.plan === 'organizer' ? '주최사' : '셀러' },
        { key: 'review_count', label: '리뷰' },
        { key: 'created_at', label: '가입일', render: r => r.created_at ? new Date(r.created_at).toLocaleDateString('ko-KR') : '-' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 40 }}>
            <TopBar title={<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Shield size={18}/> 관리자</span>} back />

            {/* 통계 */}
            <div style={{ padding: '16px 16px 0', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <StatCard label="행사" count={events.length} color={T.blue} />
                <StatCard label="공고" count={recruitments.length} color={T.green} />
                <StatCard label="주최사" count={orgList.length} color="#B45309" />
                <StatCard label="회원" count={userList.length} color={T.text} />
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
                        </button>
                    );
                })}
            </div>

            {/* 콘텐츠 */}
            <div style={{ padding: '12px 0 0' }}>
                {loading ? (
                    <div style={{ padding: '0 16px' }}>{Array(3).fill(0).map((_, i) => <div key={i} style={{ height: 50, background: T.grayLt, borderRadius: T.radiusLg, marginBottom: 8, animation: 'pulse 1.5s infinite' }}/>)}</div>
                ) : tab === 'notices' ? (
                    <NoticeManager />
                ) : tab === 'events' ? (
                    <div style={{ padding: '0 16px' }}><DataTable columns={evtCols} rows={events} onDelete={handleDelete('base_events')} emptyMsg="등록된 행사가 없어요." /></div>
                ) : tab === 'recruitments' ? (
                    <div style={{ padding: '0 16px' }}><DataTable columns={recCols} rows={recruitments} onDelete={handleDelete('recruitments')} emptyMsg="등록된 공고가 없어요." /></div>
                ) : tab === 'organizers' ? (
                    <div style={{ padding: '0 16px' }}><DataTable columns={orgCols} rows={orgList} onDelete={handleDelete('organizers')} emptyMsg="등록된 주최사가 없어요." /></div>
                ) : tab === 'users' ? (
                    <div style={{ padding: '0 16px' }}><DataTable columns={userCols} rows={userList} onDelete={handleDelete('profiles')} emptyMsg="가입된 회원이 없어요." /></div>
                ) : tab === 'upload' ? (
                    <ExcelUploader onComplete={fetchAll} />
                ) : tab === 'paste' ? (
                    <TextPasteParser onComplete={fetchAll} />
                ) : null}
            </div>
        </div>
    );
}
