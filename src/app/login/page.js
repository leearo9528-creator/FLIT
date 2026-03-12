'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { T } from '@/lib/design-tokens';
import { getSupabase } from '@/lib/supabase';

export default function LoginPage() {
    const [error, setError] = useState('');

    async function handleSocialLogin(provider) {
        const sb = getSupabase();
        await sb.auth.signInWithOAuth({
            provider,
            options: { redirectTo: `${window.location.origin}/` },
        });
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', background: T.white, padding: '40px 24px',
        }}>
            <div style={{ width: '100%', maxWidth: 420 }}>
                {/* 로고 */}
                <div style={{ textAlign: 'center', marginBottom: 50 }}>
                    <div style={{ fontSize: 36, fontWeight: 900, color: T.text, letterSpacing: -1 }}>
                        플리 <span style={{ color: T.blue }}>●</span>
                    </div>
                    <div style={{ fontSize: 15, color: T.gray, marginTop: 12 }}>3초 만에 시작하는 진짜 행사 안내</div>
                </div>

                {/* 에러 */}
                {error && (
                    <div style={{
                        background: T.redLt, color: T.red, borderRadius: T.radiusMd,
                        padding: '10px 14px', fontSize: 13, fontWeight: 600, marginBottom: 16,
                    }}>⚠️ {error}</div>
                )}

                {/* 간편 로그인 헤더 */}
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.text }}>SNS 간편 로그인</div>
                    <div style={{ fontSize: 13, color: T.gray, marginTop: 6 }}>복잡한 가입 없이 바로 시작하세요</div>
                </div>

                {/* 소셜 로그인 버튼들 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div onClick={() => handleSocialLogin('kakao')} style={{
                        width: '100%', background: '#FEE500', borderRadius: T.radiusMd,
                        padding: '16px 0', textAlign: 'center', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#3C1E1E',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8
                    }}>
                        카카오로 시작
                    </div>
                    <div onClick={() => handleSocialLogin('google')} style={{
                        width: '100%', background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
                        padding: '16px 0', textAlign: 'center', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: T.text,
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l2.5-1.93.18-.91z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        구글로 시작
                    </div>
                </div>
            </div>
        </div>
    );
}
