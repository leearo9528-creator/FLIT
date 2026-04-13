'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Shield, Users,
    Calendar, Megaphone, Upload, Trash2, Edit3, Plus, Building2, FileText, Bell, Flag, Star,
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
const cellStyle = { fontSize: 13, color: T.text, padding: '11px 12px', borderBottom: `1px solid ${T.border}`, verticalAlign: 'middle', wordBreak: 'break-all' };
const thStyle = { fontSize: 11, fontWeight: 700, color: T.gray, background: '#F8F9FA', padding: '10px 12px', borderBottom: `2px solid ${T.border}`, textAlign: 'left', whiteSpace: 'nowrap', position: 'sticky', top: 0 };

/* ─── 탭 설정 ─── */
const TABS = [
    { key: 'notices', label: '공지', icon: Bell },
    { key: 'events', label: '행사', icon: Calendar },
    { key: 'recruitments', label: '공고', icon: Megaphone },
    { key: 'organizers', label: '주최사', icon: Building2 },
    { key: 'users', label: '회원', icon: Users },
    { key: 'reviews', label: '리뷰', icon: Star },
    { key: 'reports', label: '신고', icon: Flag },
    { key: 'upload', label: '업로드', icon: Upload },
    { key: 'paste', label: '텍스트', icon: FileText },
];

/* ─── StatCard ─── */
function StatCard({ label, count, color }) {
    return (
        <div style={{ flex: 1, background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: '12px 14px', boxShadow: T.shadowSm }}>
            <div style={{ fontSize: 11, color: T.gray, marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color }}>{count}</div>
        </div>
    );
}

/* ─── 수정 모달 ─── */
function EditModal({ item, fields, tableName, onSave, onClose }) {
    const [form, setForm] = useState(() => {
        const init = {};
        fields.forEach(f => { init[f.key] = item[f.key] ?? ''; });
        return init;
    });
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            const sb = createClient();
            // 테이블별로 payload 그룹화 (field.table 지원 — 다른 테이블 업데이트)
            const groups = new Map(); // table -> { payload, idVal }
            for (const f of fields) {
                const t = f.table || tableName;
                const idKey = f.itemIdKey || 'id';
                const idVal = item[idKey];
                if (!groups.has(t)) groups.set(t, { payload: {}, idVal });
                const v = form[f.key];
                groups.get(t).payload[f.key] = f.type === 'number' ? (v === '' ? null : Number(v)) : (v === '' ? null : v);
            }
            for (const [t, { payload, idVal }] of groups) {
                if (!idVal) continue;
                const { error } = await sb.from(t).update(payload).eq('id', idVal);
                if (error) throw error;
            }
            onSave();
        } catch (err) {
            alert(`수정 실패: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <div style={{ background: T.white, borderRadius: T.radiusXl, padding: 20, width: '100%', maxWidth: 480, maxHeight: '85vh', overflowY: 'auto', boxShadow: T.shadowLg }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: T.text }}>✏️ 내용 수정</span>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: T.gray }}>✕</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {fields.map(f => (
                        <div key={f.key}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 4 }}>{f.label}</div>
                            {f.type === 'select' ? (
                                <select value={form[f.key] ?? ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                    style={{ width: '100%', padding: '8px 12px', borderRadius: T.radiusMd, border: `1.5px solid ${T.border}`, fontSize: 13, background: T.bg }}>
                                    {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            ) : f.type === 'textarea' ? (
                                <textarea value={form[f.key] ?? ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                    rows={4} style={{ width: '100%', padding: '8px 12px', borderRadius: T.radiusMd, border: `1.5px solid ${T.border}`, fontSize: 13, resize: 'vertical', background: T.bg, boxSizing: 'border-box' }} />
                            ) : (
                                <input type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                                    value={form[f.key] ?? ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                    style={{ width: '100%', padding: '8px 12px', borderRadius: T.radiusMd, border: `1.5px solid ${T.border}`, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                            )}
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                    <button onClick={onClose} style={{ ...btnOutline, flex: 1 }}>취소</button>
                    <button onClick={handleSave} disabled={saving} style={{ ...btnPrimary, flex: 2 }}>{saving ? '저장 중...' : '저장'}</button>
                </div>
            </div>
        </div>
    );
}

/* ─── 데이터 테이블 ─── */
function DataTable({ columns, rows, onDelete, onDeleteSelected, onEdit, emptyMsg }) {
    const [selected, setSelected] = useState(new Set());

    const allChecked = rows.length > 0 && selected.size === rows.length;
    const toggleAll = () => setSelected(allChecked ? new Set() : new Set(rows.map(r => r.id)));
    const toggleOne = (id) => {
        const next = new Set(selected);
        next.has(id) ? next.delete(id) : next.add(id);
        setSelected(next);
    };

    if (rows.length === 0) return <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>{emptyMsg}</div>;

    return (
        <div>
            {selected.size > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#FEF2F2', borderRadius: T.radiusMd, marginBottom: 8, border: `1px solid ${T.red}30` }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.red }}>{selected.size}개 선택됨</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => setSelected(new Set())} style={{ ...btnOutline, padding: '5px 12px', fontSize: 12 }}>선택 해제</button>
                        <button onClick={() => { onDeleteSelected([...selected]); setSelected(new Set()); }} style={{ ...btnDanger, padding: '5px 12px', fontSize: 12 }}>🗑 선택 삭제</button>
                    </div>
                </div>
            )}
            <div style={{ overflowX: 'auto', background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}` }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                    <colgroup>
                        <col style={{ width: 40 }} />
                        {columns.map(c => <col key={c.key} style={{ width: c.width || 'auto' }} />)}
                        <col style={{ width: 64 }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th style={{ ...thStyle, width: 40, textAlign: 'center' }}>
                                <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor: 'pointer' }} />
                            </th>
                            {columns.map(c => <th key={c.key} style={{ ...thStyle, width: c.width }}>{c.label}</th>)}
                            <th style={{ ...thStyle, width: 64 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr key={row.id} style={{
                                background: selected.has(row.id) ? '#FFF5F5' : i % 2 === 0 ? T.white : '#FAFAFA',
                                transition: 'background 0.1s',
                            }}
                                onMouseEnter={e => { if (!selected.has(row.id)) e.currentTarget.style.background = '#F0F7FF'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = selected.has(row.id) ? '#FFF5F5' : i % 2 === 0 ? T.white : '#FAFAFA'; }}
                            >
                                <td style={{ ...cellStyle, textAlign: 'center', width: 40 }}>
                                    <input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleOne(row.id)} style={{ cursor: 'pointer' }} />
                                </td>
                                {columns.map(c => (
                                    <td key={c.key} style={{
                                        ...cellStyle,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: c.wrap ? 'normal' : 'nowrap',
                                    }}>
                                        {c.render ? c.render(row) : (row[c.key] ?? '-')}
                                    </td>
                                ))}
                                <td style={{ ...cellStyle, textAlign: 'center', width: 64 }}>
                                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                                        {onEdit && <Edit3 size={14} color={T.blue} style={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => onEdit(row)} />}
                                        <Trash2 size={14} color={T.red} style={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => onDelete(row.id)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ─── 엑셀 업로드 ─── */
function ExcelUploader({ onComplete }) {
    const fileRef = useRef(null);
    const [status, setStatus] = useState('');
    const [log, setLog] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [isMock, setIsMock] = useState(false);

    const addLog = (msg) => setLog(prev => [...prev, `${new Date().toLocaleTimeString()} ${msg}`]);

    const handleUpload = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        setLog([]);
        setStatus('서버에서 처리 중...');

        const fd = new FormData();
        fd.append('file', file);
        fd.append('isMock', String(isMock));

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/admin/excel-import');
        xhr.withCredentials = true;
        xhr.onload = () => {
            try {
                const data = JSON.parse(xhr.responseText);
                if (data.logs) setLog(data.logs);
                setStatus(xhr.status === 200 ? '완료!' : '오류 발생');
                if (xhr.status === 200) onComplete?.();
            } catch {
                setLog([`응답 파싱 실패: ${xhr.responseText.slice(0, 200)}`]);
                setStatus('오류 발생');
            }
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
        };
        xhr.onerror = () => {
            setLog([`네트워크 오류 발생`]);
            setStatus('오류 발생');
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
        };
        xhr.ontimeout = () => {
            setLog([`60초 타임아웃`]);
            setStatus('오류 발생');
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
        };
        xhr.timeout = 60000;
        xhr.send(fd);
    }, [isMock, onComplete]);

    return (
        <div style={{ padding: '0 16px' }}>
            <div style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 4 }}>엑셀 파일 업로드</div>
                <div style={{ fontSize: 12, color: T.gray, marginBottom: 12, lineHeight: 1.6 }}>
                    엑셀 파일을 선택하면 자동으로 업로드됩니다.<br/>
                    <b>단일 시트</b> 형식: 한 행에 공고 하나씩 입력<br/>
                    <span style={{ color: T.blue }}>행사명* | 공고제목* | 주최사명 | 주최사 연락처 | 주최사 인스타그램 | 카테고리 | 장소* | 시/도 | 행사시작일* | 행사종료일 | 공고내용 | 참가비 | 신청방법 | 환불규정 | 주차지원 | 현장지원 | 모집대상 | 모집시작일 | 모집마감일* | 상태</span><br/>
                    <span style={{ color: T.gray }}>참가비는 자유 텍스트 (예: &quot;무료&quot;, &quot;1일 8만원&quot;, &quot;매출의 20%&quot;) · 모집대상: seller / foodtruck (비우면 전체)</span>
                </div>
                <a href="/data_template.xlsx" download="FLIT_데이터입력양식.xlsx"
                    style={{ display: 'inline-block', padding: '8px 16px', borderRadius: T.radiusMd, background: T.blueLt, color: T.blue, fontSize: 12, fontWeight: 700, textDecoration: 'none', marginBottom: 14 }}>
                    📥 입력 양식 다운로드
                </a>
                <MockToggle value={isMock} onChange={setIsMock} />
                <div style={{ marginTop: 12 }} />
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
    { pattern: /개최.*일정|입점.*일정|일정/i, key: 'schedule', label: '일정(원문)' },
    { pattern: /모집기간/i, key: 'recruitPeriod', label: '모집기간(원문)' },
    { pattern: /모집규모/i, key: 'scale', label: '모집규모' },
    { pattern: /모집조건/i, key: 'conditions', label: '모집조건' },
    { pattern: /참가.*비용|입점.*비용|참가비/i, key: 'fee', label: '참가비(원문)' },
    { pattern: /환불규정|환불/i, key: 'refund', label: '환불규정' },
    { pattern: /유동인구/i, key: 'traffic', label: '유동인구' },
    { pattern: /주차지원|주차/i, key: 'parking', label: '주차지원' },
    { pattern: /현장지원/i, key: 'support', label: '현장지원' },
    { pattern: /신청방법|접수/i, key: 'applyMethod', label: '신청방법' },
    { pattern: /담당자.*연락처|연락처/i, key: 'contact', label: '담당자 연락처' },
    { pattern: /현장소개|현장.*사진/i, key: 'description', label: '현장소개' },
];

// 파생 필드 (파싱 후 계산되는 편집 가능한 필드)
const DERIVED_KEYS = [
    { key: 'eventDate', label: '행사 시작일 (YYYY-MM-DD)' },
    { key: 'eventDateEnd', label: '행사 종료일 (YYYY-MM-DD)' },
    { key: 'endDate', label: '모집 마감일 (YYYY-MM-DD, 없으면 빈칸)' },
    { key: 'feeDescription', label: '참가비 (텍스트 그대로)' },
];

// 날짜 텍스트에서 YYYY-MM-DD 추출
function extractDate(text) {
    if (!text) return null;
    // YYYY년 MM월 DD일
    const m1 = text.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
    if (m1) return `${m1[1]}-${String(m1[2]).padStart(2,'0')}-${String(m1[3]).padStart(2,'0')}`;
    // YYYY.MM.DD or YYYY-MM-DD
    const m2 = text.match(/(\d{4})[.\-](\d{1,2})[.\-](\d{1,2})/);
    if (m2) return `${m2[1]}-${String(m2[2]).padStart(2,'0')}-${String(m2[3]).padStart(2,'0')}`;
    // MM/DD or M/D (올해 연도 가정)
    const m3 = text.match(/(\d{1,2})\/(\d{1,2})/);
    if (m3) {
        const y = new Date().getFullYear();
        return `${y}-${String(m3[1]).padStart(2,'0')}-${String(m3[2]).padStart(2,'0')}`;
    }
    return null;
}

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

    // ── 파생 필드 자동 계산 ──

    // 행사 날짜: schedule에서 시작일/종료일 추출
    // 패턴: "4/15(수)~4/17(금)", "2026년 4월 15일 ~ 2026년 4월 17일", "4/15(수), 4/22(수)" 등
    if (result.schedule) {
        const sch = result.schedule;
        // ~ 또는 - 로 날짜 범위 구분
        const rangeSep = sch.split(/[~\-](?!\d{4})/); // '-'는 YYYY-MM-DD 내부 제외
        const d1 = extractDate(rangeSep[0]);
        const d2 = rangeSep[1] ? extractDate(rangeSep[1]) : null;
        if (d1) result.eventDate = d1;
        if (d2 && d2 !== d1) result.eventDateEnd = d2;
        else if (d1) result.eventDateEnd = d1;
    }

    // 모집 마감일: recruitPeriod에서 종료일 추출
    // 패턴: "~4/10(금)", "4/1~4/10", "2026년 4월 10일까지"
    if (result.recruitPeriod) {
        const rp = result.recruitPeriod;
        // ~ 이후 부분이 마감일
        const parts = rp.split('~');
        const lastPart = parts[parts.length - 1];
        const d = extractDate(lastPart);
        if (d) result.endDate = d;
    }

    // 참가비: 원문 그대로 저장
    if (result.fee) {
        result.feeDescription = result.fee.trim();
    }

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

/* ─── 리뷰 일괄 생성 ─── */
function BulkReviewManager() {
    const [keyword, setKeyword] = useState('');
    const [instances, setInstances] = useState([]);
    const [selectedInstance, setSelectedInstance] = useState(null);
    const [searching, setSearching] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);

    const REVENUE_RANGES = ['10만 원 미만', '10~30만 원', '30~50만 원', '50~100만 원', '100만 원 이상'];

    const emptyReview = () => ({
        seller_type: 'seller',
        rating_profit: 4, rating_traffic: 4, rating_promotion: 4,
        rating_support: 4, rating_manners: 4,
        revenue_range: '',
        pros: '', cons: '', content: '',
    });
    const [reviews, setReviews] = useState(Array.from({ length: 5 }, emptyReview));

    const updateReview = (idx, field, value) => {
        setReviews(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r));
    };
    const addReview = () => setReviews(prev => [...prev, emptyReview()]);
    const removeReview = (idx) => setReviews(prev => prev.filter((_, i) => i !== idx));

    const searchInstances = async () => {
        if (!keyword.trim()) return;
        setSearching(true);
        try {
            const sb = createClient();
            const { data } = await sb
                .from('event_instances')
                .select('id, event_date, event_date_end, location, base_event:base_events!inner(name), organizer:organizers(name)')
                .ilike('base_events.name', `%${keyword.trim()}%`)
                .order('event_date', { ascending: false })
                .limit(30);
            setInstances((data || []).filter(d => d.base_event));
        } catch { setInstances([]); }
        finally { setSearching(false); }
    };

    const handleSubmit = async () => {
        if (!selectedInstance) return alert('행사 회차를 선택하세요.');
        const validReviews = reviews.filter(r => r.pros.trim() || r.cons.trim());
        if (validReviews.length === 0) return alert('장점 또는 단점을 1개 이상 입력하세요.');
        setSubmitting(true);
        setResult(null);
        try {
            const res = await fetch('/api/admin/bulk-reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event_instance_id: selectedInstance.id,
                    reviews: validReviews,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setResult({ success: true, message: data.message });
        } catch (err) {
            setResult({ success: false, message: err.message });
        } finally { setSubmitting(false); }
    };

    const ratingLabel = { 1: '매우나쁨', 2: '나쁨', 3: '보통', 4: '좋음', 5: '매우좋음' };

    return (
        <div style={{ padding: '0 16px' }}>
            {/* 행사 검색 */}
            <div style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: 16, marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 10 }}>1. 행사 회차 선택</div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                    <input
                        type="text" placeholder="행사명 검색..." value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && searchInstances()}
                        style={{ ...inputStyle, flex: 1 }}
                    />
                    <button onClick={searchInstances} disabled={searching} style={btnPrimary}>
                        {searching ? '검색중...' : '검색'}
                    </button>
                </div>
                {instances.length > 0 && (
                    <div style={{ maxHeight: 200, overflowY: 'auto', border: `1px solid ${T.border}`, borderRadius: T.radiusMd }}>
                        {instances.map(inst => {
                            const sel = selectedInstance?.id === inst.id;
                            return (
                                <div key={inst.id} onClick={() => setSelectedInstance(inst)} style={{
                                    padding: '10px 12px', cursor: 'pointer', borderBottom: `1px solid ${T.border}`,
                                    background: sel ? '#EFF6FF' : T.white,
                                    border: sel ? `2px solid ${T.blue}` : 'none',
                                }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>
                                        {inst.base_event?.name}
                                    </div>
                                    <div style={{ fontSize: 11, color: T.gray, marginTop: 2 }}>
                                        {inst.event_date}{inst.event_date_end ? ` ~ ${inst.event_date_end}` : ''}
                                        {inst.location && ` · ${inst.location}`}
                                        {inst.organizer?.name && ` · ${inst.organizer.name}`}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {selectedInstance && (
                    <div style={{ marginTop: 8, padding: '8px 12px', background: '#EFF6FF', borderRadius: T.radiusMd, fontSize: 12, color: T.blue, fontWeight: 700 }}>
                        ✅ {selectedInstance.base_event?.name} ({selectedInstance.event_date})
                    </div>
                )}
            </div>

            {/* 리뷰 입력 */}
            <div style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: 16, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: T.text }}>2. 리뷰 내용 ({reviews.length}개)</div>
                    <button onClick={addReview} style={{ ...btnOutline, fontSize: 12, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Plus size={13} /> 추가
                    </button>
                </div>

                {reviews.map((r, idx) => (
                    <div key={idx} style={{
                        border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
                        padding: 14, marginBottom: 10, background: T.bg,
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ fontSize: 13, fontWeight: 800, color: T.text }}>리뷰 #{idx + 1}</div>
                            {reviews.length > 1 && (
                                <button onClick={() => removeReview(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.red, fontSize: 12 }}>
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>

                        {/* 셀러 유형 */}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                            {['seller', 'foodtruck'].map(t => (
                                <button key={t} onClick={() => updateReview(idx, 'seller_type', t)} style={{
                                    padding: '5px 12px', fontSize: 12, fontWeight: 700, borderRadius: T.radiusFull, cursor: 'pointer',
                                    background: r.seller_type === t ? T.blue : T.white,
                                    color: r.seller_type === t ? '#fff' : T.gray,
                                    border: `1.5px solid ${r.seller_type === t ? T.blue : T.border}`,
                                }}>
                                    {t === 'seller' ? '셀러' : '푸드트럭'}
                                </button>
                            ))}
                        </div>

                        {/* 별점 */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
                            {[
                                { key: 'rating_profit', label: '수익성' },
                                { key: 'rating_traffic', label: '유동인구' },
                                { key: 'rating_promotion', label: '홍보력' },
                                { key: 'rating_support', label: '운영지원' },
                                { key: 'rating_manners', label: '소통/매너' },
                            ].map(({ key, label }) => (
                                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontSize: 11, color: T.gray, minWidth: 50 }}>{label}</span>
                                    <select value={r[key]} onChange={e => updateReview(idx, key, Number(e.target.value))} style={{ ...selectStyle, flex: 1, padding: '4px 6px', fontSize: 12 }}>
                                        {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}점 ({ratingLabel[v]})</option>)}
                                    </select>
                                </div>
                            ))}
                        </div>

                        {/* 매출 */}
                        <div style={{ marginBottom: 8 }}>
                            <span style={{ fontSize: 11, color: T.gray }}>매출 범위</span>
                            <select value={r.revenue_range} onChange={e => updateReview(idx, 'revenue_range', e.target.value)} style={{ ...selectStyle, marginTop: 4, fontSize: 12 }}>
                                <option value="">선택 안 함</option>
                                {REVENUE_RANGES.map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>

                        {/* 장단점 */}
                        <div style={{ marginBottom: 8 }}>
                            <span style={{ fontSize: 11, color: T.gray }}>장점 *</span>
                            <textarea rows={2} value={r.pros} onChange={e => updateReview(idx, 'pros', e.target.value)}
                                placeholder="이 행사의 좋았던 점..."
                                style={{ ...inputStyle, marginTop: 4, fontSize: 12, resize: 'vertical' }} />
                        </div>
                        <div style={{ marginBottom: 8 }}>
                            <span style={{ fontSize: 11, color: T.gray }}>단점</span>
                            <textarea rows={2} value={r.cons} onChange={e => updateReview(idx, 'cons', e.target.value)}
                                placeholder="아쉬웠던 점..."
                                style={{ ...inputStyle, marginTop: 4, fontSize: 12, resize: 'vertical' }} />
                        </div>
                        <div>
                            <span style={{ fontSize: 11, color: T.gray }}>추가 코멘트</span>
                            <textarea rows={2} value={r.content} onChange={e => updateReview(idx, 'content', e.target.value)}
                                placeholder="자유롭게 작성..."
                                style={{ ...inputStyle, marginTop: 4, fontSize: 12, resize: 'vertical' }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* 등록 버튼 */}
            <button onClick={handleSubmit} disabled={submitting} style={{
                ...btnPrimary, width: '100%', padding: '14px 0', fontSize: 15, fontWeight: 800,
                opacity: submitting ? 0.5 : 1, marginBottom: 12,
            }}>
                {submitting ? '등록 중...' : `리뷰 ${reviews.filter(r => r.pros.trim() || r.cons.trim()).length}개 일괄 등록`}
            </button>

            {result && (
                <div style={{
                    padding: '12px 14px', borderRadius: T.radiusMd, marginBottom: 12, fontSize: 13, fontWeight: 700,
                    background: result.success ? '#ECFDF5' : '#FEF2F2',
                    color: result.success ? '#065F46' : '#991B1B',
                    border: `1px solid ${result.success ? '#A7F3D0' : '#FECACA'}`,
                }}>
                    {result.success ? '✅' : '❌'} {result.message}
                </div>
            )}
        </div>
    );
}

/* ─── 신고 관리 ─── */
function ReportsManager() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('pending');
    const [targets, setTargets] = useState({}); // { `${type}:${id}`: targetInfo }

    const [reporters, setReporters] = useState({}); // id → profile

    const fetchReports = useCallback(async () => {
        setLoading(true);
        const sb = createClient();
        let q = sb.from('reports')
            .select('id, reporter_id, target_type, target_id, reason, detail, status, created_at')
            .order('created_at', { ascending: false });
        if (statusFilter !== 'all') q = q.eq('status', statusFilter);
        const { data, error } = await q;
        if (error) { console.error('신고 로드 실패'); setLoading(false); return; }
        setReports(data || []);

        // 신고자 정보
        const reporterIds = [...new Set((data || []).map(r => r.reporter_id).filter(Boolean))];
        const reporterMap = {};
        if (reporterIds.length) {
            const { data: profs } = await sb.from('profiles').select('id, name, email').in('id', reporterIds);
            (profs || []).forEach(p => { reporterMap[p.id] = p; });
        }
        setReporters(reporterMap);

        // 대상 정보 일괄 로딩
        const byType = { recruitment: [], review: [], post: [], post_comment: [] };
        (data || []).forEach(r => { if (byType[r.target_type]) byType[r.target_type].push(r.target_id); });
        const map = {};
        await Promise.all([
            byType.recruitment.length
                ? sb.from('recruitments').select('id, title').in('id', byType.recruitment).then(({ data }) => {
                    (data || []).forEach(x => { map[`recruitment:${x.id}`] = { label: x.title, link: `/recruitments/${x.id}` }; });
                })
                : null,
            byType.review.length
                ? sb.from('reviews').select('id, content').in('id', byType.review).then(({ data }) => {
                    (data || []).forEach(x => { map[`review:${x.id}`] = { label: (x.content || '(내용 없음)').slice(0, 60), link: null }; });
                })
                : null,
            byType.post.length
                ? sb.from('posts').select('id, title').in('id', byType.post).then(({ data }) => {
                    (data || []).forEach(x => { map[`post:${x.id}`] = { label: x.title, link: `/community/${x.id}` }; });
                })
                : null,
            byType.post_comment.length
                ? sb.from('post_comments').select('id, content, post_id').in('id', byType.post_comment).then(({ data }) => {
                    (data || []).forEach(x => { map[`post_comment:${x.id}`] = { label: (x.content || '').slice(0, 60), link: `/community/${x.post_id}` }; });
                })
                : null,
        ]);
        setTargets(map);
        setLoading(false);
    }, [statusFilter]);

    useEffect(() => { fetchReports(); }, [fetchReports]);

    const updateStatus = async (id, status) => {
        const sb = createClient();
        const { error } = await sb.from('reports').update({ status }).eq('id', id);
        if (error) { alert(`처리 실패: ${error.message}`); return; }
        fetchReports();
    };

    const handleDelete = async (id) => {
        if (!confirm('이 신고 기록을 삭제할까요?')) return;
        const sb = createClient();
        const { error } = await sb.from('reports').delete().eq('id', id);
        if (error) { alert(`삭제 실패: ${error.message}`); return; }
        fetchReports();
    };

    const TYPE_LABEL = { recruitment: '모집공고', review: '리뷰', post: '게시글', post_comment: '댓글' };
    const TYPE_COLOR = { recruitment: T.blue, review: '#F59E0B', post: T.green, post_comment: '#8B5CF6' };
    const STATUS_LABEL = { pending: '대기', resolved: '처리완료', dismissed: '반려' };
    const STATUS_COLOR = { pending: T.red, resolved: T.green, dismissed: T.gray };

    const filters = [
        { key: 'pending', label: '대기' },
        { key: 'resolved', label: '처리완료' },
        { key: 'dismissed', label: '반려' },
        { key: 'all', label: '전체' },
    ];

    return (
        <div style={{ padding: '0 16px' }}>
            {/* 필터 */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                {filters.map(f => {
                    const active = statusFilter === f.key;
                    return (
                        <button key={f.key} onClick={() => setStatusFilter(f.key)} style={{
                            padding: '6px 12px', borderRadius: T.radiusFull,
                            border: `1.5px solid ${active ? T.text : T.border}`,
                            background: active ? T.text : T.white,
                            color: active ? '#fff' : T.text,
                            fontSize: 12, fontWeight: 700, cursor: 'pointer',
                        }}>
                            {f.label}
                        </button>
                    );
                })}
            </div>

            {loading ? (
                Array(3).fill(0).map((_, i) => <div key={i} style={{ height: 100, background: T.grayLt, borderRadius: T.radiusLg, marginBottom: 8, animation: 'pulse 1.5s infinite' }} />)
            ) : reports.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>신고 내역이 없어요.</div>
            ) : (
                reports.map(r => {
                    const target = targets[`${r.target_type}:${r.target_id}`];
                    return (
                        <div key={r.id} style={{
                            background: T.white, borderRadius: T.radiusLg,
                            border: `1px solid ${T.border}`, padding: 14, marginBottom: 10,
                        }}>
                            {/* 상단: 타입 + 상태 */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                                <span style={{
                                    fontSize: 11, fontWeight: 700,
                                    padding: '3px 8px', borderRadius: 4,
                                    background: `${TYPE_COLOR[r.target_type]}18`,
                                    color: TYPE_COLOR[r.target_type],
                                }}>
                                    {TYPE_LABEL[r.target_type] || r.target_type}
                                </span>
                                <span style={{
                                    fontSize: 11, fontWeight: 700,
                                    padding: '3px 8px', borderRadius: 4,
                                    background: `${STATUS_COLOR[r.status]}18`,
                                    color: STATUS_COLOR[r.status],
                                }}>
                                    {STATUS_LABEL[r.status] || r.status}
                                </span>
                                <span style={{ fontSize: 11, color: T.gray, marginLeft: 'auto' }}>
                                    {new Date(r.created_at).toLocaleString('ko-KR')}
                                </span>
                            </div>

                            {/* 대상 */}
                            <div style={{ marginBottom: 8 }}>
                                <div style={{ fontSize: 11, color: T.gray, marginBottom: 2 }}>대상</div>
                                {target ? (
                                    target.link ? (
                                        <Link href={target.link} target="_blank" style={{
                                            fontSize: 13, fontWeight: 600, color: T.blue,
                                            textDecoration: 'none', wordBreak: 'break-all',
                                        }}>
                                            {target.label || '(제목 없음)'} ↗
                                        </Link>
                                    ) : (
                                        <div style={{ fontSize: 13, color: T.text, wordBreak: 'break-all' }}>
                                            {target.label || '(제목 없음)'}
                                        </div>
                                    )
                                ) : (
                                    <div style={{ fontSize: 12, color: T.gray }}>
                                        (삭제됨 · ID {r.target_id?.slice(0, 8)})
                                    </div>
                                )}
                            </div>

                            {/* 사유 */}
                            <div style={{ marginBottom: 8 }}>
                                <div style={{ fontSize: 11, color: T.gray, marginBottom: 2 }}>사유</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: T.red }}>{r.reason}</div>
                                {r.detail && (
                                    <div style={{ fontSize: 12, color: T.textSub, marginTop: 4, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                                        {r.detail}
                                    </div>
                                )}
                            </div>

                            {/* 신고자 */}
                            <div style={{ fontSize: 11, color: T.gray, marginBottom: 10 }}>
                                신고자: {reporters[r.reporter_id]?.name || reporters[r.reporter_id]?.email || '(알 수 없음)'}
                            </div>

                            {/* 액션 */}
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                {r.status !== 'resolved' && (
                                    <button onClick={() => updateStatus(r.id, 'resolved')} style={{
                                        padding: '6px 12px', borderRadius: T.radiusFull, border: 'none',
                                        background: T.green, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                    }}>처리완료</button>
                                )}
                                {r.status !== 'dismissed' && (
                                    <button onClick={() => updateStatus(r.id, 'dismissed')} style={{
                                        padding: '6px 12px', borderRadius: T.radiusFull,
                                        border: `1px solid ${T.border}`, background: T.white,
                                        color: T.gray, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                    }}>반려</button>
                                )}
                                {r.status !== 'pending' && (
                                    <button onClick={() => updateStatus(r.id, 'pending')} style={{
                                        padding: '6px 12px', borderRadius: T.radiusFull,
                                        border: `1px solid ${T.border}`, background: T.white,
                                        color: T.text, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                    }}>다시 대기</button>
                                )}
                                <button onClick={() => handleDelete(r.id)} style={{
                                    padding: '6px 12px', borderRadius: T.radiusFull,
                                    border: `1px solid ${T.red}`, background: T.white,
                                    color: T.red, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                    marginLeft: 'auto',
                                }}>삭제</button>
                            </div>
                        </div>
                    );
                })
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
                const orgName = parsed.organizer.replace(/\s*\(.*\)\s*/, '').trim();
                const { data: existing } = await sb.from('organizers').select('id').eq('name', orgName).maybeSingle();
                if (existing) {
                    organizerId = existing.id;
                } else {
                    const { data: newOrg, error } = await sb.from('organizers').insert({ name: orgName }).select('id').maybeSingle();
                    if (error) throw new Error(`주최사 생성 실패: ${error.message}`);
                    organizerId = newOrg?.id;
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
                }).select('id').maybeSingle();
                if (error) throw new Error(`행사 생성 실패: ${error.message}`);
                baseEventId = newEvt?.id;
            }
            if (!baseEventId) throw new Error('행사 ID를 가져오지 못했습니다.');

            // 3. 행사 개최 (event_instance)
            const locationSido = parsed.location ? parsed.location.split(/\s+/)[0] : null;
            const { data: inst, error: instErr } = await sb.from('event_instances').insert({
                base_event_id: baseEventId,
                organizer_id: organizerId,
                location: parsed.location || '장소 미정',
                location_sido: locationSido,
                event_date: parsed.eventDate || null,
                event_date_end: parsed.eventDateEnd || null,
            }).select('id').maybeSingle();
            if (instErr) throw new Error(`행사 개최 생성 실패: ${instErr.message}`);
            if (!inst?.id) throw new Error('event_instance ID를 가져오지 못했습니다.');

            // 4. 공고 내용 조합
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
                fee_description: parsed.feeDescription || null,
                end_date: parsed.endDate || null,
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
                                <span style={{ fontSize: 12, fontWeight: 700, color: T.blue, width: 120, flexShrink: 0, paddingTop: 8 }}>{k.label}</span>
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
                        <div style={{ marginTop: 6, paddingTop: 10, borderTop: `1px dashed ${T.border}` }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: T.text, marginBottom: 8 }}>저장 필드 (자동 추출 — 수정 가능)</div>
                            {DERIVED_KEYS.map(k => (
                                <div key={k.key} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: T.green, width: 220, flexShrink: 0 }}>{k.label}</span>
                                    <input
                                        value={parsed[k.key] || ''}
                                        onChange={e => setParsed({ ...parsed, [k.key]: e.target.value })}
                                        style={{ flex: 1, padding: '8px 10px', fontSize: 13, color: T.text, border: `1px solid ${T.green}`, borderRadius: T.radiusMd, outline: 'none', background: '#f0fdf4', boxSizing: 'border-box' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {parsed.eventName && (
                        <div style={{ marginTop: 16, padding: 14, background: T.blueLt, borderRadius: T.radiusMd }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: T.blue, marginBottom: 8 }}>저장될 데이터</div>
                            <div style={{ fontSize: 12, color: T.text, lineHeight: 1.8 }}>
                                <b>주최사:</b> {parsed.organizer?.replace(/\s*\(.*\)\s*/, '').trim() || '(없음)'}<br/>
                                <b>행사:</b> {parsed.eventName}<br/>
                                <b>장소:</b> {parsed.location || '미정'}<br/>
                                <b>행사일:</b> {parsed.eventDate || '미입력'}{parsed.eventDateEnd && parsed.eventDateEnd !== parsed.eventDate ? ` ~ ${parsed.eventDateEnd}` : ''}<br/>
                                <b>모집마감:</b> {parsed.endDate || '없음'}<br/>
                                <b>참가비:</b> {parsed.feeDescription || '(없음)'}<br/>
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

/* ─── 공통 인풋 스타일 ─── */
const inputStyle = { width: '100%', padding: '9px 12px', fontSize: 13, color: T.text, border: `1.5px solid ${T.border}`, borderRadius: T.radiusMd, outline: 'none', background: T.white, boxSizing: 'border-box' };
const selectStyle = { ...inputStyle, cursor: 'pointer' };
const labelStyle = { fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 4 };

const EVENT_CATEGORIES = ['플리마켓', '나이트마켓', '푸드트럭페스티벌', '문화행사', '팝업스토어', '기타'];
const SIDO_LIST = ['서울', '경기', '인천', '부산', '대구', '대전', '광주', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

/* ─── 목데이터 토글 ─── */
function MockToggle({ value, onChange }) {
    return (
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '10px 12px', background: value ? '#FEF3C7' : T.bg, borderRadius: T.radiusMd, border: `1.5px solid ${value ? '#F59E0B' : T.border}` }}>
            <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer' }} />
            <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: value ? '#B45309' : T.gray }}>목데이터로 등록</div>
                <div style={{ fontSize: 11, color: T.gray }}>나중에 한꺼번에 삭제 가능</div>
            </div>
        </label>
    );
}

/* ─── 주최사 추가 폼 ─── */
function OrganizerForm({ onComplete }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: '', description: '', logo_url: '', is_mock: false });
    const [saving, setSaving] = useState(false);
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleSave = async () => {
        if (!form.name.trim()) return alert('주최사명을 입력하세요.');
        setSaving(true);
        const sb = createClient();
        const { error } = await sb.from('organizers').insert({
            name: form.name.trim(),
            description: form.description.trim() || null,
            logo_url: form.logo_url.trim() || null,
            is_mock: form.is_mock,
        });
        setSaving(false);
        if (error) return alert(`저장 실패: ${error.message}`);
        setForm({ name: '', description: '', logo_url: '', is_mock: false });
        setOpen(false);
        onComplete?.();
    };

    return (
        <div style={{ marginBottom: 16 }}>
            <button onClick={() => setOpen(o => !o)} style={{ ...btnPrimary, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 0' }}>
                <Plus size={14}/> 주최사 추가
            </button>
            {open && (
                <div style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: 20, marginTop: 10 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 14 }}>새 주최사 등록</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div><div style={labelStyle}>주최사명 *</div><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="예) 한강마켓 조합" style={inputStyle}/></div>
                        <div><div style={labelStyle}>설명</div><input value={form.description} onChange={e => set('description', e.target.value)} placeholder="간단한 소개" style={inputStyle}/></div>
                        <div><div style={labelStyle}>로고 URL</div><input value={form.logo_url} onChange={e => set('logo_url', e.target.value)} placeholder="https://..." style={inputStyle}/></div>
                        <MockToggle value={form.is_mock} onChange={v => set('is_mock', v)} />
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                        <button onClick={() => setOpen(false)} style={btnOutline}>취소</button>
                        <button onClick={handleSave} disabled={saving} style={{ ...btnPrimary, flex: 1 }}>{saving ? '저장 중...' : '저장'}</button>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── 행사 추가 폼 ─── */
function EventForm({ orgList, onComplete }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: '', category: '', description: '', image_url: '', organizer_id: '', location: '', location_sido: '', event_date: '', event_date_end: '', is_mock: false });
    const [saving, setSaving] = useState(false);
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleSave = async () => {
        if (!form.name.trim()) return alert('행사명을 입력하세요.');
        if (!form.category) return alert('카테고리를 선택하세요.');
        if (form.location.trim() && !form.event_date) return alert('장소를 입력했다면 시작날짜도 입력하세요.');
        setSaving(true);
        const sb = createClient();
        const { data: evt, error: evtErr } = await sb.from('base_events').insert({
            name: form.name.trim(),
            category: form.category,
            description: form.description.trim() || null,
            image_url: form.image_url.trim() || null,
            is_mock: form.is_mock,
        }).select('id').maybeSingle();
        if (evtErr || !evt) { setSaving(false); return alert(`행사 저장 실패: ${evtErr?.message || '데이터 반환 실패'}`); }

        if (form.location.trim() && form.event_date) {
            const { error: instErr } = await sb.from('event_instances').insert({
                base_event_id: evt.id,
                organizer_id: form.organizer_id || null,
                location: form.location.trim(),
                location_sido: form.location_sido || null,
                event_date: form.event_date,
                event_date_end: form.event_date_end || form.event_date,
                is_mock: form.is_mock,
            });
            if (instErr) alert(`행사 개최 저장 실패: ${instErr.message}`);
        }

        setSaving(false);
        setForm({ name: '', category: '', description: '', image_url: '', organizer_id: '', location: '', location_sido: '', event_date: '', event_date_end: '', is_mock: false });
        setOpen(false);
        onComplete?.();
    };

    return (
        <div style={{ marginBottom: 16 }}>
            <button onClick={() => setOpen(o => !o)} style={{ ...btnPrimary, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 0' }}>
                <Plus size={14}/> 행사 추가
            </button>
            {open && (
                <div style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: 20, marginTop: 10 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 4 }}>새 행사 등록</div>
                    <div style={{ fontSize: 12, color: T.gray, marginBottom: 14 }}>행사 기본 정보 + 첫 개최 일정을 함께 입력할 수 있어요.</div>

                    <div style={{ fontSize: 13, fontWeight: 800, color: T.blue, marginBottom: 10 }}>행사 기본 정보</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                        <div><div style={labelStyle}>행사명 *</div><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="예) 한강 플리마켓" style={inputStyle}/></div>
                        <div>
                            <div style={labelStyle}>카테고리 *</div>
                            <select value={form.category} onChange={e => set('category', e.target.value)} style={selectStyle}>
                                <option value="">선택하세요</option>
                                {EVENT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div><div style={labelStyle}>설명</div><input value={form.description} onChange={e => set('description', e.target.value)} placeholder="행사 소개" style={inputStyle}/></div>
                        <div><div style={labelStyle}>이미지 URL</div><input value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://..." style={inputStyle}/></div>
                    </div>

                    <div style={{ fontSize: 13, fontWeight: 800, color: T.blue, marginBottom: 10 }}>개최 일정 (선택)</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div>
                            <div style={labelStyle}>주최사</div>
                            <select value={form.organizer_id} onChange={e => set('organizer_id', e.target.value)} style={selectStyle}>
                                <option value="">선택 안 함</option>
                                {orgList.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                            </select>
                        </div>
                        <div><div style={labelStyle}>장소</div><input value={form.location} onChange={e => set('location', e.target.value)} placeholder="예) 서울 한강공원" style={inputStyle}/></div>
                        <div>
                            <div style={labelStyle}>시/도</div>
                            <select value={form.location_sido} onChange={e => set('location_sido', e.target.value)} style={selectStyle}>
                                <option value="">선택 안 함</option>
                                {SIDO_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            <div><div style={labelStyle}>시작날짜</div><input type="date" value={form.event_date} onChange={e => set('event_date', e.target.value)} style={inputStyle}/></div>
                            <div><div style={labelStyle}>종료날짜</div><input type="date" value={form.event_date_end} onChange={e => set('event_date_end', e.target.value)} style={inputStyle}/></div>
                        </div>
                        <MockToggle value={form.is_mock} onChange={v => set('is_mock', v)} />
                    </div>

                    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                        <button onClick={() => setOpen(false)} style={btnOutline}>취소</button>
                        <button onClick={handleSave} disabled={saving} style={{ ...btnPrimary, flex: 1 }}>{saving ? '저장 중...' : '저장'}</button>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── 공고 추가 폼 ─── */
function RecruitmentForm({ onComplete }) {
    const [open, setOpen] = useState(false);
    const [instances, setInstances] = useState([]);
    const [form, setForm] = useState({ event_instance_id: '', title: '', content: '', fee_description: '', application_method: '', start_date: '', end_date: '', status: 'OPEN', is_mock: false });
    const [saving, setSaving] = useState(false);
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    useEffect(() => {
        if (!open || instances.length > 0) return;
        (async () => {
            const sb = createClient();
            const { data } = await sb.from('event_instances')
                .select('id, event_date, base_event:base_events(name)')
                .order('event_date', { ascending: false })
                .limit(300);
            setInstances(data || []);
        })();
    }, [open]);

    const handleSave = async () => {
        if (!form.event_instance_id) return alert('행사 개최를 선택하세요.');
        if (!form.title.trim()) return alert('공고 제목을 입력하세요.');
        if (!form.end_date) return alert('모집 마감일을 입력하세요.');
        setSaving(true);
        const sb = createClient();
        const { error } = await sb.from('recruitments').insert({
            event_instance_id: form.event_instance_id,
            title: form.title.trim(),
            content: form.content.trim() || null,
            fee_description: form.fee_description.trim() || null,
            application_method: form.application_method.trim() || null,
            start_date: form.start_date || null,
            end_date: form.end_date,
            status: form.status,
            is_mock: form.is_mock,
        });
        setSaving(false);
        if (error) return alert(`저장 실패: ${error.message}`);
        setForm({ event_instance_id: '', title: '', content: '', fee_description: '', application_method: '', start_date: '', end_date: '', status: 'OPEN', is_mock: false });
        setOpen(false);
        onComplete?.();
    };

    return (
        <div style={{ marginBottom: 16 }}>
            <button onClick={() => setOpen(o => !o)} style={{ ...btnPrimary, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 0' }}>
                <Plus size={14}/> 공고 추가
            </button>
            {open && (
                <div style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: 20, marginTop: 10 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 14 }}>새 모집공고 등록</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div>
                            <div style={labelStyle}>행사 개최 *</div>
                            <select value={form.event_instance_id} onChange={e => set('event_instance_id', e.target.value)} style={selectStyle}>
                                <option value="">행사를 선택하세요</option>
                                {instances.map(i => (
                                    <option key={i.id} value={i.id}>
                                        {i.base_event?.name || '(이름 없음)'} {i.event_date ? `— ${i.event_date.slice(0, 10)}` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div><div style={labelStyle}>공고 제목 *</div><input value={form.title} onChange={e => set('title', e.target.value)} placeholder="예) 5월 한강 플리마켓 셀러 모집" style={inputStyle}/></div>
                        <div>
                            <div style={labelStyle}>공고 내용</div>
                            <textarea value={form.content} onChange={e => set('content', e.target.value)} placeholder="모집 조건, 혜택 등 상세 내용" rows={4}
                                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7, fontFamily: 'inherit' }}/>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            <div><div style={labelStyle}>참가비</div><input value={form.fee_description} onChange={e => set('fee_description', e.target.value)} placeholder="예) 무료 / 1일 80,000원" style={inputStyle}/></div>
                            <div>
                                <div style={labelStyle}>상태</div>
                                <select value={form.status} onChange={e => set('status', e.target.value)} style={selectStyle}>
                                    <option value="OPEN">모집중</option>
                                    <option value="CLOSED">마감</option>
                                </select>
                            </div>
                        </div>
                        <div><div style={labelStyle}>신청 방법</div><input value={form.application_method} onChange={e => set('application_method', e.target.value)} placeholder="예) 카카오톡 채널 문의" style={inputStyle}/></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            <div><div style={labelStyle}>모집 시작일</div><input type="date" value={form.start_date} onChange={e => set('start_date', e.target.value)} style={inputStyle}/></div>
                            <div><div style={labelStyle}>모집 마감일 *</div><input type="date" value={form.end_date} onChange={e => set('end_date', e.target.value)} style={inputStyle}/></div>
                        </div>
                        <MockToggle value={form.is_mock} onChange={v => set('is_mock', v)} />
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                        <button onClick={() => setOpen(false)} style={btnOutline}>취소</button>
                        <button onClick={handleSave} disabled={saving} style={{ ...btnPrimary, flex: 1 }}>{saving ? '저장 중...' : '저장'}</button>
                    </div>
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
    const [tab, setTab] = useState('notices');
    const [events, setEvents] = useState([]);
    const [recruitments, setRecruitments] = useState([]);
    const [orgList, setOrgList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editItem, setEditItem] = useState(null); // { item, tableName, fields }

    useEffect(() => {
        if (authLoading) return;
        if (!user) { router.replace('/login'); return; }
        (async () => {
            try {
                const sb = createClient();
                const { data } = await sb.from('profiles').select('is_admin').eq('id', user.id).maybeSingle();
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
                sb.from('base_events').select('id, name, category, description, total_reviews, total_instances, created_at').order('created_at', { ascending: false }),
                sb.from('recruitments').select('id, title, status, fee, fee_description, end_date, start_date, content, application_method, event_instance_id, event_instance:event_instances(id, organizer_id, base_event:base_events(name), organizer:organizers(name))').order('created_at', { ascending: false }).limit(100),
                sb.from('organizers').select('id, name, description, logo_url, total_reviews, total_instances, created_at').order('created_at', { ascending: false }),
                sb.from('profiles').select('id, name, email, plan, seller_type, review_count, organizer_name, created_at').order('created_at', { ascending: false }).limit(100),
            ]);
            setEvents(eRes.data || []);
            setRecruitments(rRes.data || []);
            setOrgList(oRes.data || []);
            setUserList(uRes.data || []);
        } catch (err) { console.error('관리자 작업 실패'); }
        finally { setLoading(false); }
    }, [isAdmin]);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    const handleDelete = (table) => async (id) => {
        if (!confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;
        try {
            const sb = createClient();
            const { error } = await sb.from(table).delete().eq('id', id);
            if (error) throw error;
            fetchAll();
        } catch (err) {
            alert(`삭제 실패: ${err.message}`);
        }
    };

    const handleBulkDelete = (table) => async (ids) => {
        if (!confirm(`${ids.length}개를 삭제하시겠습니까? 되돌릴 수 없습니다.`)) return;
        try {
            const sb = createClient();
            const { error } = await sb.from(table).delete().in('id', ids);
            if (error) throw error;
            fetchAll();
        } catch (err) {
            alert(`삭제 실패: ${err.message}`);
        }
    };

    if (authLoading || checkingAdmin) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray, fontSize: 15 }}>로딩 중...</div>
        </div>
    );
    if (!isAdmin) return null;

    const evtCols = [
        { key: 'name', label: '행사명', width: 'auto' },
        { key: 'category', label: '카테고리', width: 120 },
        { key: 'total_instances', label: '개최', width: 60 },
        { key: 'total_reviews', label: '리뷰', width: 60 },
    ];
    const evtFields = [
        { key: 'name', label: '행사명', type: 'text' },
        { key: 'category', label: '카테고리', type: 'select', options: [
            { value: '', label: '선택' },
            { value: '플리마켓', label: '플리마켓' },
            { value: '푸드트럭', label: '푸드트럭' },
            { value: '플리+푸드 전체', label: '플리+푸드 전체' },
            { value: '팝업스토어', label: '팝업스토어' },
        ]},
        { key: 'description', label: '설명', type: 'textarea' },
    ];

    const orgCols = [
        { key: 'name', label: '주최사명', width: 'auto' },
        { key: 'total_instances', label: '행사', width: 60 },
        { key: 'total_reviews', label: '리뷰', width: 60 },
        { key: 'created_at', label: '등록일', width: 110, render: r => r.created_at ? new Date(r.created_at).toLocaleDateString('ko-KR') : '-' },
    ];
    const orgFields = [
        { key: 'name', label: '주최사명', type: 'text' },
        { key: 'description', label: '소개', type: 'textarea' },
        { key: 'logo_url', label: '로고 URL', type: 'text' },
    ];

    const recCols = [
        { key: 'title', label: '제목', width: 'auto' },
        { key: 'event', label: '행사', width: 160, render: r => r.event_instance?.base_event?.name || '-' },
        { key: 'organizer', label: '주최사', width: 140, render: r => r.event_instance?.organizer?.name || '-' },
        { key: 'fee_description', label: '참가비', width: 160, render: r => r.fee_description || (r.fee == null ? '-' : r.fee === 0 ? '무료' : `${Number(r.fee).toLocaleString()}원`) },
        { key: 'status', label: '상태', width: 72, render: r => r.status === 'OPEN' ? '모집중' : '마감' },
        { key: 'end_date', label: '마감일', width: 100, render: r => r.end_date ? new Date(r.end_date).toLocaleDateString('ko-KR') : '-' },
    ];
    const recFields = [
        { key: 'title', label: '공고 제목', type: 'text' },
        {
            key: 'organizer_id', label: '주최사', type: 'select',
            options: [{ value: '', label: '(없음)' }, ...orgList.map(o => ({ value: o.id, label: o.name }))],
            table: 'event_instances', itemIdKey: 'event_instance_id',
        },
        { key: 'status', label: '상태', type: 'select', options: [{ value: 'OPEN', label: '모집중' }, { value: 'CLOSED', label: '마감' }] },
        { key: 'fee_description', label: '참가비', type: 'text' },
        { key: 'end_date', label: '모집 마감일', type: 'date' },
        { key: 'start_date', label: '모집 시작일', type: 'date' },
        { key: 'application_method', label: '신청 방법', type: 'textarea' },
        { key: 'content', label: '공고 내용', type: 'textarea' },
    ];

    const userCols = [
        { key: 'name', label: '이름', width: 120 },
        { key: 'email', label: '이메일', width: 'auto' },
        { key: 'plan', label: '역할', width: 72, render: r => r.plan === 'organizer' ? '주최사' : '셀러' },
        { key: 'review_count', label: '리뷰', width: 60 },
        { key: 'created_at', label: '가입일', width: 110, render: r => r.created_at ? new Date(r.created_at).toLocaleDateString('ko-KR') : '-' },
    ];
    const userFields = [
        { key: 'name', label: '이름', type: 'text' },
        { key: 'plan', label: '역할', type: 'select', options: [{ value: 'free', label: '셀러' }, { value: 'organizer', label: '주최사' }] },
    ];

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 40 }}>
            <TopBar title={<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Shield size={18}/> 관리자</span>} back />
            {editItem && (
                <EditModal
                    item={editItem.item}
                    fields={editItem.fields}
                    tableName={editItem.tableName}
                    onSave={() => { setEditItem(null); fetchAll(); }}
                    onClose={() => setEditItem(null)}
                />
            )}

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
                    <div style={{ padding: '0 16px' }}>
                        <EventForm orgList={orgList} onComplete={fetchAll} />
                        <DataTable columns={evtCols} rows={events}
                            onDelete={handleDelete('base_events')}
                            onDeleteSelected={handleBulkDelete('base_events')}
                            onEdit={row => setEditItem({ item: row, tableName: 'base_events', fields: evtFields })}
                            emptyMsg="등록된 행사가 없어요." />
                    </div>
                ) : tab === 'recruitments' ? (
                    <div style={{ padding: '0 16px' }}>
                        <RecruitmentForm onComplete={fetchAll} />
                        <DataTable columns={recCols} rows={recruitments}
                            onDelete={handleDelete('recruitments')}
                            onDeleteSelected={handleBulkDelete('recruitments')}
                            onEdit={row => setEditItem({
                                item: { ...row, organizer_id: row.event_instance?.organizer_id ?? '' },
                                tableName: 'recruitments',
                                fields: recFields,
                            })}
                            emptyMsg="등록된 공고가 없어요." />
                    </div>
                ) : tab === 'organizers' ? (
                    <div style={{ padding: '0 16px' }}>
                        <OrganizerForm onComplete={fetchAll} />
                        <DataTable columns={orgCols} rows={orgList}
                            onDelete={handleDelete('organizers')}
                            onDeleteSelected={handleBulkDelete('organizers')}
                            onEdit={row => setEditItem({ item: row, tableName: 'organizers', fields: orgFields })}
                            emptyMsg="등록된 주최사가 없어요." />
                    </div>
                ) : tab === 'users' ? (
                    <div style={{ padding: '0 16px' }}>
                        <DataTable columns={userCols} rows={userList}
                            onDelete={handleDelete('profiles')}
                            onDeleteSelected={handleBulkDelete('profiles')}
                            onEdit={row => setEditItem({ item: row, tableName: 'profiles', fields: userFields })}
                            emptyMsg="가입된 회원이 없어요." />
                    </div>
                ) : tab === 'reviews' ? (
                    <BulkReviewManager />
                ) : tab === 'reports' ? (
                    <ReportsManager />
                ) : tab === 'upload' ? (
                    <ExcelUploader onComplete={fetchAll} />
                ) : tab === 'paste' ? (
                    <TextPasteParser onComplete={fetchAll} />
                ) : null}
            </div>
        </div>
    );
}
