'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import dynamic from 'next/dynamic';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import HeroBanner from '@/components/home/HeroBanner';
import HotRecruitmentSection from '@/components/home/HotRecruitmentSection';
import HomeCalendarSection from '@/components/home/HomeCalendarSection';

const NotificationDrawer = dynamic(() => import('@/components/ui/NotificationDrawer'), { ssr: false });

export default function HomeClient({ initialRecruitments }) {
    const { user, loading } = useAuth();
    const [notifOpen, setNotifOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!user) { setUnreadCount(0); return; }
        (async () => {
            const sb = createClient();
            const { count } = await sb.from('notifications')
                .select('id', { count: 'exact', head: true })
                .eq('user_id', user.id)
                .eq('is_read', false);
            setUnreadCount(count || 0);
        })();
    }, [user]);

    return (
        <div style={{ minHeight: '100vh', paddingBottom: 100, background: T.bg }}>
            <NotificationDrawer
                open={notifOpen}
                onClose={() => { setNotifOpen(false); setUnreadCount(0); }}
                userId={user?.id}
            />

            {/* sticky header */}
            <div style={{
                padding: '20px 16px 16px', background: T.white,
                position: 'sticky', top: 0, zIndex: 10,
                borderBottom: `1px solid ${T.border}`,
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: T.text, letterSpacing: -0.5 }}>
                            플릿 <span style={{ color: T.blue }}>●</span>
                        </div>
                        <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>
                            셀러들이 직접 말하는 진짜 행사 정보
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {user && (
                            <div
                                onClick={() => setNotifOpen(true)}
                                style={{
                                    width: 36, height: 36, borderRadius: '50%',
                                    background: T.bg, border: `1.5px solid ${T.border}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', position: 'relative', flexShrink: 0,
                                }}
                            >
                                <Bell size={18} color={T.text} strokeWidth={2} />
                                {unreadCount > 0 && (
                                    <div style={{
                                        position: 'absolute', top: -2, right: -2,
                                        minWidth: 16, height: 16,
                                        background: '#EF4444', borderRadius: 8,
                                        border: '1.5px solid #fff',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 10, fontWeight: 800, color: '#fff',
                                        padding: '0 3px',
                                    }}>
                                        {unreadCount > 99 ? '99+' : unreadCount}
                                    </div>
                                )}
                            </div>
                        )}

                        {!loading && !user && (
                            <Link
                                href="/login"
                                style={{
                                    background: T.blue, color: '#fff',
                                    padding: '8px 14px', borderRadius: T.radiusFull,
                                    fontSize: 13, fontWeight: 700, textDecoration: 'none',
                                }}
                            >
                                로그인
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* page content */}
            <div style={{ paddingTop: 16 }}>
                <HeroBanner />
                <HomeCalendarSection />
                <HotRecruitmentSection recruitments={initialRecruitments} />
            </div>

            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.5; }
                }
                div::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
}
