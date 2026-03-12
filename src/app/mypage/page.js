'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function MyPage() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.replace('/login');
    }, [user, loading, router]);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray, fontSize: 15 }}>로딩 중...</div>
        </div>
    );

    if (!user) return null;

    const handleLogout = async () => {
        await signOut();
        router.replace('/login');
    };

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="마이페이지" />

            <div className="page-padding">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* 프로필 카드 */}
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{
                                width: 56, height: 56, borderRadius: '50%',
                                background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 24, color: T.white, fontWeight: 700, flexShrink: 0,
                            }}>
                                {(user.email?.[0] || user.user_metadata?.name?.[0] || '?').toUpperCase()}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 17, fontWeight: 700, color: T.text, marginBottom: 4 }}>
                                    {user.user_metadata?.full_name || user.user_metadata?.name || '셀러'}
                                </div>
                                <div style={{
                                    fontSize: 13, color: T.gray,
                                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                                }}>
                                    {user.email || '이메일 없음'}
                                </div>
                                <div style={{
                                    marginTop: 6, display: 'inline-block',
                                    padding: '3px 8px', borderRadius: 6,
                                    background: T.blueLt, color: T.blue,
                                    fontSize: 11, fontWeight: 700,
                                }}>
                                    {user.app_metadata?.provider === 'kakao' ? '카카오' :
                                     user.app_metadata?.provider === 'google' ? '구글' : 'SNS'} 로그인
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* 메뉴 */}
                    <Card padding={0}>
                        {[
                            { icon: '✏️', label: '내가 쓴 리뷰', href: '/mypage/reviews' },
                            { icon: '📢', label: '내가 제보한 행사', href: '/mypage/events' },
                            { icon: '🔔', label: '알림 설정', href: '#' },
                        ].map((item, i, arr) => (
                            <div key={item.label} onClick={() => item.href !== '#' && router.push(item.href)} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '16px 20px', cursor: item.href !== '#' ? 'pointer' : 'default',
                                borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                                    <span style={{ fontSize: 15, fontWeight: 600, color: T.text }}>{item.label}</span>
                                </div>
                                <span style={{ fontSize: 14, color: T.gray }}>
                                    {item.href === '#' ? '준비중' : '›'}
                                </span>
                            </div>
                        ))}
                    </Card>

                    {/* 로그아웃 */}
                    <div onClick={handleLogout} style={{
                        padding: 16, borderRadius: T.radiusMd, textAlign: 'center',
                        fontSize: 15, fontWeight: 600, color: T.red,
                        background: T.white, border: `1px solid ${T.border}`,
                        cursor: 'pointer', transition: 'all 0.15s',
                    }}>
                        로그아웃
                    </div>
                </div>
            </div>
        </div>
    );
}
