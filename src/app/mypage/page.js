'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function MyPage() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [reviewCount, setReviewCount] = useState(0);

    useEffect(() => {
        if (!loading && !user) router.replace('/login');
        if (user) {
            // 내가 쓴 리뷰 개수 가져오기 (3개 혜택 체크용)
            const fetchReviewCount = async () => {
                const { createClient } = await import('@/utils/supabase/client');
                const sb = createClient();
                const { count } = await sb.from('reviews').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
                setReviewCount(count || 0);
            };
            fetchReviewCount();
        }
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

    const isFreeMonthEligible = reviewCount >= 3;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="마이페이지" />

            <div className="page-padding">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    
                    {/* 구독 정보 박스 */}
                    <Card padding={20} style={{ background: `linear-gradient(135deg, ${T.text}, #1a1a1a)`, color: T.white }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                            <div>
                                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>내 구독 상태</div>
                                <div style={{ fontSize: 18, fontWeight: 800, color: T.white }}>
                                    셀러 멤버십 <span style={{ fontSize: 13, fontWeight: 500, color: T.blueLt, marginLeft: 4, background: 'rgba(59,130,246,0.2)', padding: '2px 8px', borderRadius: 10 }}>월 5,900원</span>
                                </div>
                            </div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', textDecoration: 'underline' }}>
                                관리
                            </div>
                        </div>

                        {/* 리뷰 카운터 UI */}
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: T.radiusMd }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: T.white, marginBottom: 2 }}>
                                        {isFreeMonthEligible ? '🎉 첫 달 무료 혜택 달성!' : '첫 달 무료 혜택까지'}
                                    </div>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
                                        {isFreeMonthEligible ? '결제 시 자동으로 0원 적용됩니다.' : '솔직한 리뷰 3개를 남겨주세요.'}
                                    </div>
                                </div>
                                <div style={{ fontSize: 18, fontWeight: 900, color: isFreeMonthEligible ? T.greenLt : T.white }}>
                                    <span style={{ fontSize: 24, letterSpacing: -1 }}>{reviewCount}</span><span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>/3</span>
                                </div>
                            </div>
                            
                            {/* Progress bar */}
                            <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{ 
                                    width: `${Math.min((reviewCount / 3) * 100, 100)}%`, height: '100%', 
                                    background: isFreeMonthEligible ? T.greenLt : T.blueLt, 
                                    transition: 'width 0.5s ease' 
                                }} />
                            </div>
                        </div>
                    </Card>

                    {/* 프로필 카드 */}
                    <Card padding={0}>
                        <div onClick={() => router.push('/mypage/profile')} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px', cursor: 'pointer' }}>
                            <div style={{
                                width: 56, height: 56, borderRadius: '50%',
                                background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 24, color: T.white, fontWeight: 700, flexShrink: 0,
                            }}>
                                {(user.email?.[0] || user.user_metadata?.name?.[0] || '?').toUpperCase()}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 17, fontWeight: 700, color: T.text, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    {user.user_metadata?.full_name || user.user_metadata?.name || '셀러'}
                                    <span style={{ fontSize: 13, color: T.gray, fontWeight: 500 }}>›</span>
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
                            { icon: '🔔', label: '알림 설정', href: '/mypage/settings' },
                        ].map((item, i, arr) => (
                            <div key={item.label} onClick={() => router.push(item.href)} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '16px 20px', cursor: 'pointer',
                                borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                                    <span style={{ fontSize: 15, fontWeight: 600, color: T.text }}>{item.label}</span>
                                </div>
                                <span style={{ fontSize: 14, color: T.gray }}>›</span>
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
