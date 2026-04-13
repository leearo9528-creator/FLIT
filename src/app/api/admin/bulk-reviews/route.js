import { createClient } from '@supabase/supabase-js';
import { createClient as createServerAuthClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

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

// mock 유저 ID 풀 (e1000000-...-001 ~ 200)
function getMockUserIds(count) {
    const ids = [];
    const pool = Array.from({ length: 200 }, (_, i) => {
        const n = String(i + 1).padStart(3, '0');
        return `e1000000-0000-0000-0000-000000000${n}`;
    });
    // 셔플 후 앞에서 count개 선택
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
}

export async function POST(request) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) return NextResponse.json({ error: '관리자 권한 필요' }, { status: 403 });

        const body = await request.json();
        const { event_instance_id, reviews } = body;

        if (!event_instance_id) {
            return NextResponse.json({ error: 'event_instance_id가 필요합니다.' }, { status: 400 });
        }
        if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
            return NextResponse.json({ error: '리뷰 데이터가 필요합니다.' }, { status: 400 });
        }

        const admin = getAdminClient();

        // event_instance 존재 확인
        const { data: instance } = await admin
            .from('event_instances')
            .select('id')
            .eq('id', event_instance_id)
            .maybeSingle();
        if (!instance) {
            return NextResponse.json({ error: '해당 행사 회차를 찾을 수 없습니다.' }, { status: 404 });
        }

        // mock 유저 배정
        const mockUserIds = getMockUserIds(reviews.length);

        // 이미 해당 instance에 리뷰를 쓴 mock 유저 제외
        const { data: existingReviews } = await admin
            .from('reviews')
            .select('user_id')
            .eq('event_instance_id', event_instance_id)
            .in('user_id', mockUserIds);
        const usedIds = new Set((existingReviews || []).map(r => r.user_id));

        const availableIds = mockUserIds.filter(id => !usedIds.has(id));
        if (availableIds.length < reviews.length) {
            return NextResponse.json({
                error: `사용 가능한 mock 유저가 부족합니다. (필요: ${reviews.length}, 가능: ${availableIds.length})`,
            }, { status: 400 });
        }

        const rows = reviews.map((r, i) => ({
            event_instance_id,
            user_id: availableIds[i],
            seller_type: r.seller_type || 'seller',
            rating_profit: r.rating_profit ?? 4,
            rating_traffic: r.rating_traffic ?? 4,
            rating_promotion: r.rating_promotion ?? 4,
            rating_support: r.rating_support ?? 4,
            rating_manners: r.rating_manners ?? 4,
            revenue_range: r.revenue_range || null,
            pros: r.pros || '',
            cons: r.cons || '',
            content: r.content || null,
            is_mock: true,
            is_verified: false,
        }));

        const { data: inserted, error } = await admin
            .from('reviews')
            .insert(rows)
            .select('id');

        if (error) {
            return NextResponse.json({ error: `리뷰 등록 실패: ${error.message}` }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            count: inserted.length,
            message: `${inserted.length}개 리뷰가 등록되었습니다.`,
        });
    } catch (err) {
        return NextResponse.json({ error: `서버 오류: ${err.message}` }, { status: 500 });
    }
}
