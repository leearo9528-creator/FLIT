'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { T } from '@/lib/design-tokens';

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const sb = getSupabase();
        sb.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                router.replace('/');
            } else {
                router.replace('/login');
            }
        });
    }, [router]);

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', background: T.white
        }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: T.text, marginBottom: 16 }}>
                플리 <span style={{ color: T.blue }}>●</span>
            </div>
            <div style={{ fontSize: 15, color: T.gray }}>로그인 처리 중...</div>
        </div>
    );
}
