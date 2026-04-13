import { createClient } from '@supabase/supabase-js';
import { createClient as createServerAuthClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

// Vercel 함수 타임아웃 60초 (Hobby 기본 10초)
export const maxDuration = 60;

// GET 헬스체크 — /api/admin/excel-import 접속 시 함수 작동 여부 확인
export async function GET() {
    return NextResponse.json({ ok: true, ts: Date.now(), xlsx: typeof XLSX.read });
}

function getAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );
}

async function verifyAdmin() {
    const sb = await createServerAuthClient();
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return false;
    const { data } = await sb.from('profiles').select('is_admin').eq('id', user.id).maybeSingle();
    return !!data?.is_admin;
}

function toDateStr(val) {
    if (val == null || val === '') return null;
    if (typeof val === 'number') {
        const d = new Date(Math.round((val - 25569) * 86400 * 1000));
        return d.toISOString().slice(0, 10);
    }
    if (val instanceof Date) return val.toISOString().slice(0, 10);
    return String(val).trim().replace(/\./g, '-').slice(0, 10) || null;
}

export async function POST(request) {
    const logs = [];
    const addLog = (msg) => logs.push(`${new Date().toLocaleTimeString()} ${msg}`);

    try {
        // 1. 관리자 인증
        let isAdmin = false;
        try { isAdmin = await verifyAdmin(); } catch (e) {
            console.error('verifyAdmin error:', e);
            return NextResponse.json({ error: `인증 오류: ${e.message}`, logs: [`인증 오류: ${e.message}`] }, { status: 500 });
        }
        if (!isAdmin) {
            return NextResponse.json({ error: '관리자 권한이 필요합니다', logs: ['관리자 권한 없음'] }, { status: 403 });
        }
        addLog('관리자 인증 완료');

        // 2. 파일 읽기
        const formData = await request.formData();
        const isMock = formData.get('isMock') === 'true';
        const file = formData.get('file');
        if (!file) {
            return NextResponse.json({ error: '파일이 없습니다', logs: ['파일 없음'] }, { status: 400 });
        }
        addLog(`파일: ${file.name} (${(file.size / 1024).toFixed(1)}KB)`);

        // 3. 엑셀 파싱
        const buffer = Buffer.from(await file.arrayBuffer());
        const wb = XLSX.read(buffer, { cellDates: false });

        const sheetName = wb.SheetNames.find(n => n.includes('데이터') || n.includes('공고')) || wb.SheetNames[0];
        const sheet = wb.Sheets[sheetName];
        if (!sheet) {
            return NextResponse.json({ error: '시트를 찾을 수 없습니다', logs: ['시트 없음'] }, { status: 400 });
        }

        const rows = XLSX.utils.sheet_to_json(sheet);
        addLog(`시트 "${sheetName}" 에서 ${rows.length}행 읽음`);

        if (rows.length === 0) {
            addLog('데이터가 없습니다');
            return NextResponse.json({ logs });
        }

        // 4. DB 삽입
        const sb = getAdminClient();
        const orgCache = {};
        const eventCache = {};
        const instCache = {};

        for (const r of rows) {
            const 행사명 = (r['행사명 *'] || r['행사명'] || '').trim();
            const 공고제목 = (r['공고제목 *'] || r['공고 제목 *'] || r['공고제목'] || '').trim();
            if (!행사명 || !공고제목) { addLog(`건너뜀: 행사명 또는 공고제목 없음`); continue; }

            const 주최사명 = (r['주최사명'] || '').trim();
            const 주최사연락처 = (r['주최사 연락처'] || '').trim() || null;
            const 주최사인스타 = (r['주최사 인스타그램'] || '').trim() || null;
            const 카테고리 = (r['카테고리'] || '').trim();
            const 장소 = (r['장소 *'] || r['장소'] || '').trim();
            const 시도 = (r['시/도'] || r['시도'] || '').trim();
            const 행사시작일 = toDateStr(r['행사시작일 *'] || r['행사시작일'] || r['행사 시작일']);
            const 행사종료일 = toDateStr(r['행사종료일'] || r['행사 종료일']) || 행사시작일;
            const 공고내용 = (r['공고내용'] || r['공고 내용'] || '').replace(/\\n/g, '\n');
            const 참가비 = (r['참가비'] || r['참가비(원)'] || '').toString().trim() || null;
            const 신청방법 = (r['신청방법'] || r['신청 방법'] || '').trim() || null;
            const 환불규정 = (r['환불규정'] || r['환불 규정'] || '').trim() || null;
            const 주차지원 = (r['주차지원'] || r['주차 지원'] || '').trim() || null;
            const 현장지원 = (r['현장지원'] || r['현장 지원'] || '').trim() || null;
            const 모집대상 = (r['모집대상'] || r['모집 대상'] || '').trim().toLowerCase() || null;
            const sellerType = (모집대상 === 'seller' || 모집대상 === 'foodtruck') ? 모집대상 : null;
            const 모집시작일 = toDateStr(r['모집시작일'] || r['모집 시작일']);
            const 모집마감일 = toDateStr(r['모집마감일 *'] || r['모집마감일'] || r['모집 마감일']);
            const 상태 = (r['상태'] || 'OPEN').trim().toUpperCase();

            // 주최사
            let orgId = null;
            if (주최사명) {
                if (orgCache[주최사명]) {
                    orgId = orgCache[주최사명];
                } else {
                    const { data: existing } = await sb.from('organizers').select('id').eq('name', 주최사명).maybeSingle();
                    if (existing) {
                        orgId = existing.id;
                    } else {
                        const { data: inserted, error } = await sb.from('organizers')
                            .insert({ name: 주최사명, phone: 주최사연락처, instagram_handle: 주최사인스타, is_mock: isMock }).select('id').maybeSingle();
                        if (error) { addLog(`주최사 "${주최사명}" 생성 실패: ${error.message}`); }
                        else { orgId = inserted.id; addLog(`주최사 "${주최사명}" 생성`); }
                    }
                    if (orgId) orgCache[주최사명] = orgId;
                }
            }

            // 행사
            let baseEventId = eventCache[행사명];
            if (!baseEventId) {
                const { data: existing } = await sb.from('base_events').select('id').eq('name', 행사명).maybeSingle();
                if (existing) {
                    baseEventId = existing.id;
                } else {
                    const { data: inserted, error } = await sb.from('base_events')
                        .insert({ name: 행사명, category: 카테고리 || null, is_mock: isMock }).select('id').maybeSingle();
                    if (error) { addLog(`행사 "${행사명}" 생성 실패: ${error.message}`); continue; }
                    baseEventId = inserted.id;
                    addLog(`행사 "${행사명}" 생성`);
                }
                eventCache[행사명] = baseEventId;
            }

            // 개최 회차
            const instKey = `${행사명}__${행사시작일}__${장소}`;
            let instId = instCache[instKey];
            if (!instId) {
                const query = sb.from('event_instances').select('id').eq('base_event_id', baseEventId);
                if (행사시작일) query.eq('event_date', 행사시작일);
                if (장소) query.eq('location', 장소);
                const { data: existing } = await query.maybeSingle();
                if (existing) {
                    instId = existing.id;
                } else {
                    const { data: inserted, error } = await sb.from('event_instances').insert({
                        base_event_id: baseEventId,
                        organizer_id: orgId,
                        location: 장소 || null,
                        location_sido: 시도 || null,
                        event_date: 행사시작일 || null,
                        event_date_end: 행사종료일 || null,
                        is_mock: isMock,
                    }).select('id').maybeSingle();
                    if (error) { addLog(`개최 "${행사명} ${행사시작일}" 생성 실패: ${error.message}`); continue; }
                    instId = inserted.id;
                    addLog(`개최 "${행사명} ${행사시작일}" 생성`);
                }
                instCache[instKey] = instId;
            }

            // 모집공고
            const { error } = await sb.from('recruitments').insert({
                event_instance_id: instId,
                title: 공고제목,
                content: 공고내용 || null,
                fee_description: 참가비,
                application_method: 신청방법,
                refund_policy: 환불규정,
                parking_info: 주차지원,
                onsite_support: 현장지원,
                seller_type: sellerType,
                start_date: 모집시작일 || null,
                end_date: 모집마감일 || null,
                status: 상태,
                is_mock: isMock,
            });
            if (error) addLog(`공고 "${공고제목}" 실패: ${error.message}`);
            else addLog(`공고 "${공고제목}" 생성 완료`);
        }

        addLog('--- 업로드 완료 ---');
        return NextResponse.json({ logs });

    } catch (err) {
        console.error('excel-import error:', err);
        addLog(`치명적 오류: ${err.message}`);
        return NextResponse.json({ error: err.message, logs }, { status: 500 });
    }
}
