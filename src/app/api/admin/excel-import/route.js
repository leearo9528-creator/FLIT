import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'flit2026!';

function getAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );
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
    try {
        const formData = await request.formData();
        const password = formData.get('password');
        const isMock = formData.get('isMock') === 'true';
        const file = formData.get('file');

        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: '인증 실패' }, { status: 401 });
        }
        if (!file) {
            return NextResponse.json({ error: '파일이 없습니다' }, { status: 400 });
        }

        const XLSX = await import('xlsx');
        const buffer = Buffer.from(await file.arrayBuffer());
        const wb = XLSX.read(buffer, { cellDates: false });

        const sb = getAdminClient();
        const logs = [];
        const addLog = (msg) => logs.push(`${new Date().toLocaleTimeString()} ${msg}`);

        // 시트 이름 자동 감지 (단일 시트 우선, 없으면 첫 번째 시트)
        const sheetName = wb.SheetNames.find(n => n.includes('데이터') || n.includes('공고')) || wb.SheetNames[0];
        const sheet = wb.Sheets[sheetName];
        if (!sheet) {
            return NextResponse.json({ error: '시트를 찾을 수 없습니다' }, { status: 400 });
        }

        const rows = XLSX.utils.sheet_to_json(sheet);
        addLog(`시트 "${sheetName}" 에서 ${rows.length}행 읽음`);

        // 캐시
        const orgCache = {};
        const eventCache = {};
        const instCache = {};

        for (const r of rows) {
            const 행사명 = (r['행사명 *'] || r['행사명'] || '').trim();
            const 공고제목 = (r['공고제목 *'] || r['공고 제목 *'] || r['공고제목'] || '').trim();
            if (!행사명 || !공고제목) { addLog(`건너뜀: 행사명 또는 공고제목 없음`); continue; }

            const 주최사명 = (r['주최사명'] || '').trim();
            const 카테고리 = (r['카테고리'] || '').trim();
            const 장소 = (r['장소 *'] || r['장소'] || '').trim();
            const 시도 = (r['시/도'] || r['시도'] || '').trim();
            const 행사시작일 = toDateStr(r['행사시작일 *'] || r['행사시작일'] || r['행사 시작일']);
            const 행사종료일 = toDateStr(r['행사종료일'] || r['행사 종료일']) || 행사시작일;
            const 공고내용 = (r['공고내용'] || r['공고 내용'] || '').replace(/\\n/g, '\n');
            const 참가비 = (r['참가비'] || r['참가비(원)'] || '').toString().trim() || null;
            const 신청방법 = (r['신청방법'] || r['신청 방법'] || '').trim() || null;
            const 모집시작일 = toDateStr(r['모집시작일'] || r['모집 시작일']);
            const 모집마감일 = toDateStr(r['모집마감일 *'] || r['모집마감일'] || r['모집 마감일']);
            const 상태 = (r['상태'] || 'OPEN').trim().toUpperCase();

            // 1. 주최사
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
                            .insert({ name: 주최사명, is_mock: isMock }).select('id').single();
                        if (error) { addLog(`주최사 "${주최사명}" 생성 실패: ${error.message}`); }
                        else { orgId = inserted.id; addLog(`주최사 "${주최사명}" 생성`); }
                    }
                    if (orgId) orgCache[주최사명] = orgId;
                }
            }

            // 2. 행사
            let baseEventId = eventCache[행사명];
            if (!baseEventId) {
                const { data: existing } = await sb.from('base_events').select('id').eq('name', 행사명).maybeSingle();
                if (existing) {
                    baseEventId = existing.id;
                } else {
                    const { data: inserted, error } = await sb.from('base_events')
                        .insert({ name: 행사명, category: 카테고리 || null, is_mock: isMock }).select('id').single();
                    if (error) { addLog(`행사 "${행사명}" 생성 실패: ${error.message}`); continue; }
                    baseEventId = inserted.id;
                    addLog(`행사 "${행사명}" 생성`);
                }
                eventCache[행사명] = baseEventId;
            }

            // 3. 개최 회차
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
                    }).select('id').single();
                    if (error) { addLog(`개최 "${행사명} ${행사시작일}" 생성 실패: ${error.message}`); continue; }
                    instId = inserted.id;
                    addLog(`개최 "${행사명} ${행사시작일}" 생성`);
                }
                instCache[instKey] = instId;
            }

            // 4. 모집공고
            const { error } = await sb.from('recruitments').insert({
                event_instance_id: instId,
                title: 공고제목,
                content: 공고내용 || null,
                fee_description: 참가비,
                application_method: 신청방법,
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
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
