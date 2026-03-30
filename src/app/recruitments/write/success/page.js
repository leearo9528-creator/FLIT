'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { createClient } from '@/utils/supabase/client';

export default function PaymentSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState('processing'); // processing | done | error
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const paymentKey = searchParams.get('paymentKey');
        const orderId = searchParams.get('orderId');
        const amount = Number(searchParams.get('amount'));

        if (!paymentKey || !orderId || !amount) {
            setErrorMsg('잘못된 접근입니다.');
            setStatus('error');
            return;
        }

        (async () => {
            try {
                // 1. 토스 결제 서버 확인
                const res = await fetch('/api/payments/confirm', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentKey, orderId, amount }),
                });
                if (!res.ok) {
                    const { error } = await res.json();
                    throw new Error(error || '결제 확인 실패');
                }

                const sb = createClient();

                // 2. orderId 유형에 따라 처리
                if (orderId.startsWith('BUMP_')) {
                    // 끌올: BUMP_{recruitmentId}_{timestamp}
                    const recruitmentId = orderId.split('_')[1];
                    const { error } = await sb
                        .from('recruitments')
                        .update({ bumped_at: new Date().toISOString() })
                        .eq('id', recruitmentId);
                    if (error) throw error;
                    setStatus('done');
                    setTimeout(() => router.replace(`/recruitments/${recruitmentId}`), 1500);

                } else if (orderId.startsWith('NEW_')) {
                    // 신규 공고
                    const raw = sessionStorage.getItem(`draft_${orderId}`);
                    if (!raw) throw new Error('폼 데이터를 찾을 수 없어요. 다시 작성해주세요.');
                    const draft = JSON.parse(raw);

                    // event_instance 생성
                    const { data: instance, error: instErr } = await sb
                        .from('event_instances')
                        .insert({
                            base_event_id: draft.selectedBaseEvent.id,
                            organizer_id: draft.organizerId,
                            location: draft.location,
                            location_sido: draft.location.split(' ')[0],
                            event_date: draft.eventDate,
                            event_date_end: draft.eventDateEnd || draft.eventDate,
                        })
                        .select('id')
                        .single();
                    if (instErr) throw instErr;

                    // recruitment 생성
                    const { data: rec, error: recErr } = await sb
                        .from('recruitments')
                        .insert({
                            event_instance_id: instance.id,
                            title: draft.title,
                            content: draft.content,
                            fee: draft.fee,
                            end_date: draft.endDate,
                            status: 'OPEN',
                            application_method: draft.applicationMethod,
                        })
                        .select('id')
                        .single();
                    if (recErr) throw recErr;

                    sessionStorage.removeItem(`draft_${orderId}`);
                    setStatus('done');
                    setTimeout(() => router.replace(`/recruitments/${rec.id}`), 1500);
                } else {
                    throw new Error('알 수 없는 결제 유형');
                }
            } catch (err) {
                console.error('결제 후 처리 실패:', err);
                setErrorMsg(err.message || '처리 중 오류가 발생했습니다.');
                setStatus('error');
            }
        })();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={{
            minHeight: '100vh', background: T.bg,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '40px 24px', textAlign: 'center',
        }}>
            {status === 'processing' && (
                <>
                    <div style={{ fontSize: 44, marginBottom: 16 }}>⏳</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: T.text, marginBottom: 8 }}>결제 처리 중...</div>
                    <div style={{ fontSize: 14, color: T.gray }}>잠시만 기다려주세요.</div>
                </>
            )}
            {status === 'done' && (
                <>
                    <div style={{ fontSize: 44, marginBottom: 16 }}>🎉</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: T.text, marginBottom: 8 }}>등록 완료!</div>
                    <div style={{ fontSize: 14, color: T.gray }}>공고 페이지로 이동합니다.</div>
                </>
            )}
            {status === 'error' && (
                <>
                    <div style={{ fontSize: 44, marginBottom: 16 }}>❌</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: T.text, marginBottom: 8 }}>오류가 발생했어요</div>
                    <div style={{ fontSize: 14, color: T.gray, marginBottom: 24, lineHeight: 1.6 }}>{errorMsg}</div>
                    <button
                        onClick={() => router.replace('/recruitments/write')}
                        style={{
                            padding: '12px 28px', borderRadius: T.radiusFull,
                            background: T.blue, color: '#fff',
                            border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                        }}
                    >
                        다시 작성하기
                    </button>
                </>
            )}
        </div>
    );
}
