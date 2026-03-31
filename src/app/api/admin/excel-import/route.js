import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'flit2026!';

function getAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );
}

export async function POST(request) {
    const { password, data, isMock = false } = await request.json();

    if (password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: '인증 실패' }, { status: 401 });
    }

    const sb = getAdminClient();
    const logs = [];
    const addLog = (msg) => logs.push(`${new Date().toLocaleTimeString()} ${msg}`);

    // 1. 주최사
    if (data.organizers?.length) {
        for (const r of data.organizers) {
            const { data: existing } = await sb.from('organizers').select('id').eq('name', r.name).maybeSingle();
            if (existing) {
                const { error } = await sb.from('organizers')
                    .update({ description: r.description, logo_url: r.logoUrl })
                    .eq('id', existing.id);
                if (error) addLog(`주최사 "${r.name}" 실패: ${error.message}`);
                else addLog(`주최사 "${r.name}" OK (업데이트)`);
            } else {
                const { error } = await sb.from('organizers')
                    .insert({ name: r.name, description: r.description, logo_url: r.logoUrl, is_mock: isMock });
                if (error) addLog(`주최사 "${r.name}" 실패: ${error.message}`);
                else addLog(`주최사 "${r.name}" OK`);
            }
        }
    }

    // 2. 행사
    if (data.baseEvents?.length) {
        for (const r of data.baseEvents) {
            const { data: existing } = await sb.from('base_events').select('id').eq('name', r.name).maybeSingle();
            if (existing) {
                const { error } = await sb.from('base_events')
                    .update({ category: r.category, description: r.description, image_url: r.imageUrl })
                    .eq('id', existing.id);
                if (error) addLog(`행사 "${r.name}" 실패: ${error.message}`);
                else addLog(`행사 "${r.name}" OK (업데이트)`);
            } else {
                const { error } = await sb.from('base_events')
                    .insert({ name: r.name, category: r.category, description: r.description, image_url: r.imageUrl, is_mock: isMock });
                if (error) addLog(`행사 "${r.name}" 실패: ${error.message}`);
                else addLog(`행사 "${r.name}" OK`);
            }
        }
    }

    // 3. 행사 개최
    if (data.instances?.length) {
        const { data: allEvents } = await sb.from('base_events').select('id, name');
        const { data: allOrgs } = await sb.from('organizers').select('id, name');
        const evtMap = Object.fromEntries((allEvents || []).map(e => [e.name, e.id]));
        const orgMap = Object.fromEntries((allOrgs || []).map(o => [o.name, o.id]));

        for (const r of data.instances) {
            const baseId = evtMap[r.eventName];
            if (!baseId) { addLog(`개최 "${r.eventName}" 실패: 행사를 찾을 수 없음`); continue; }
            const orgId = orgMap[r.organizerName] || null;

            // 중복 체크 (같은 행사 + 시작일 + 장소)
            const { data: dup } = await sb.from('event_instances')
                .select('id')
                .eq('base_event_id', baseId)
                .eq('event_date', r.startDate)
                .eq('location', r.location)
                .maybeSingle();
            if (dup) { addLog(`개최 "${r.eventName} ${r.startDate}" 건너뜀 (중복)`); continue; }

            const { error } = await sb.from('event_instances').insert({
                base_event_id: baseId,
                organizer_id: orgId,
                location: r.location,
                location_sido: r.locationSido || null,
                event_date: r.startDate,
                event_date_end: r.endDate || r.startDate,
                is_mock: isMock,
            });
            if (error) addLog(`개최 "${r.eventName} ${r.startDate}" 실패: ${error.message}`);
            else addLog(`개최 "${r.eventName} ${r.startDate}" OK`);
        }
    }

    // 4. 모집공고
    if (data.recruitments?.length) {
        const { data: allInst } = await sb.from('event_instances')
            .select('id, event_date, base_event:base_events(name)')
            .order('event_date', { ascending: false });
        // 이름만으로 찾는 기본 맵 (첫 번째)
        const instMap = {};
        // 이름+날짜로 찾는 맵
        const instMapByDate = {};
        (allInst || []).forEach(i => {
            const name = i.base_event?.name;
            if (!name) return;
            if (!instMap[name]) instMap[name] = i.id;
            if (i.event_date) {
                const dateKey = `${name}__${i.event_date.slice(0, 10)}`;
                if (!instMapByDate[dateKey]) instMapByDate[dateKey] = i.id;
            }
        });

        for (const r of data.recruitments) {
            // 행사 날짜가 있으면 정확하게 매칭, 없으면 이름만으로 매칭
            const instId = r.eventDate
                ? (instMapByDate[`${r.eventName}__${r.eventDate}`] || instMap[r.eventName])
                : instMap[r.eventName];
            if (!instId) { addLog(`공고 "${r.title}" 실패: 행사 개최를 찾을 수 없음`); continue; }
            const fee = r.fee != null ? Number(r.fee) : null;
            const { error } = await sb.from('recruitments').insert({
                event_instance_id: instId,
                title: r.title,
                content: (r.content || '').replace(/\\n/g, '\n'),
                fee: isNaN(fee) ? null : fee,
                application_method: r.applicationMethod || null,
                start_date: r.startDate || null,
                end_date: r.endDate || null,
                status: r.status || 'OPEN',
                is_mock: isMock,
            });
            if (error) addLog(`공고 "${r.title}" 실패: ${error.message}`);
            else addLog(`공고 "${r.title}" OK`);
        }
    }

    addLog('--- 업로드 완료 ---');
    return NextResponse.json({ logs });
}
