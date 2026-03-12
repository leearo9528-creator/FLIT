'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [error, setError] = useState('');

    // 이미 로그인 상태면 홈으로
    useEffect(() => {
        if (!loading && user) router.replace('/');
    }, [user, loading, router]);

    const [loginStatus, setLoginStatus] = useState('');

    async function handleSocialLogin(provider) {
        try {
            setError('');
            setLoginStatus('구글 창으로 이동 중...');
            const sb = createClient();
            
            const { error: authError } = await sb.auth.signInWithOAuth({
                provider,
                options: { redirectTo: `${window.location.origin}/auth/callback` },
            });
            if (authError) throw authError;

            // 라우터가 페이지를 벗어나기 전까지 알림 표시
            setLoginStatus('로그인 처리 대기 중...');
        } catch (err) {
            setLoginStatus('');
            setError(err.message || '로그인 중 오류가 발생했습니다.');
        }
    }

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray, fontSize: 15 }}>로딩 중...</div>
        </div>
    );

    if (user) return null;

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
                
                {/* 로딩/진행 상태 알림 */}
                {loginStatus && (
                    <div style={{
                        background: T.blueLt, color: T.blue, borderRadius: T.radiusMd,
                        padding: '10px 14px', fontSize: 13, fontWeight: 600, marginBottom: 16,
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}>⏳ {loginStatus}</div>
                )}

                {/* 간편 로그인 헤더 */}
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.text }}>SNS 간편 로그인</div>
                    <div style={{ fontSize: 13, color: T.gray, marginTop: 6 }}>복잡한 가입 없이 바로 시작하세요</div>
                </div>

                {/* 소셜 로그인 버튼 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {/* 카카오 */}
                    <div onClick={() => handleSocialLogin('kakao')} style={{
                        width: '100%', background: '#FEE500', borderRadius: T.radiusMd,
                        padding: '16px 0', textAlign: 'center', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#3C1E1E',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
                        transition: 'transform 0.1s',
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#3C1E1E">
                            <path d="M12 3C6.48 3 2 6.36 2 10.5c0 2.67 1.77 5.02 4.44 6.36-.14.52-.9 3.34-.93 3.55 0 0-.02.16.08.22.1.06.22.01.22.01.29-.04 3.37-2.2 3.9-2.57.73.1 1.49.16 2.29.16 5.52 0 10-3.36 10-7.5S17.52 3 12 3z"/>
                        </svg>
                        카카오로 시작
                    </div>

                    {/* 구글 */}
                    <div onClick={() => handleSocialLogin('google')} style={{
                        width: '100%', background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
                        padding: '16px 0', textAlign: 'center', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: T.text,
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)', transition: 'transform 0.1s',
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l2.5-1.93.18-.91z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        구글로 시작
                    </div>
                </div>

                {/* 비회원 안내 */}
                <div style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: T.gray }}>
                    로그인 없이도 행사 목록을 볼 수 있어요
                </div>
                <div onClick={() => router.push('/')} style={{
                    textAlign: 'center', marginTop: 8, fontSize: 14, color: T.blue,
                    fontWeight: 600, cursor: 'pointer',
                }}>
                    둘러보기 →
                </div>
            </div>
        </div>
    );
}
