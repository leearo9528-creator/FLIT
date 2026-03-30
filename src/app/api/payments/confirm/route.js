import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { paymentKey, orderId, amount } = await request.json();

        if (!paymentKey || !orderId || !amount) {
            return NextResponse.json({ error: '필수 파라미터 누락' }, { status: 400 });
        }

        const secretKey = process.env.TOSS_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json({ error: '결제 설정 오류' }, { status: 500 });
        }

        const encoded = Buffer.from(`${secretKey}:`).toString('base64');
        const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${encoded}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentKey, orderId, amount }),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('토스 결제 확인 실패:', result);
            return NextResponse.json({ error: result.message || '결제 확인 실패' }, { status: 400 });
        }

        return NextResponse.json(result);
    } catch (err) {
        console.error('결제 확인 API 오류:', err);
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
    }
}
