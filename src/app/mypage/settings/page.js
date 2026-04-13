'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function SettingsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [pushEnabled, setPushEnabled] = useState(true);
    const [emailEnabled, setEmailEnabled] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.replace('/login');
        if (user) {
            setPushEnabled(user.user_metadata?.notifications_push ?? true);
            setEmailEnabled(user.user_metadata?.notifications_email ?? false);
        }
    }, [user, loading, router]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const sb = createClient();
            const { error } = await sb.auth.updateUser({
                data: {
                    notifications_push: pushEnabled,
                    notifications_email: emailEnabled
                }
            });

            if (error) throw error;
            alert('알림 설정이 저장되었습니다.');
            router.push('/mypage');
        } catch (err) {
            alert('설정 저장 중 오류가 발생했습니다.');
            console.error('설정 저장 실패');
        } finally {
            setIsSaving(false);
        }
    };

    // Toggle ui component
    const Toggle = ({ active, onChange }) => (
        <div onClick={() => onChange(!active)} style={{
            width: 44, height: 24, borderRadius: 12, background: active ? T.blue : T.border,
            position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
        }}>
            <div style={{
                position: 'absolute', top: 2, left: active ? 22 : 2,
                width: 20, height: 20, borderRadius: '50%', background: '#fff',
                transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }} />
        </div>
    );

    if (loading || !user) return null;

    return (
        <div style={{ minHeight: '100vh', background: T.bg }}>
            <TopBar title="알림 설정" back />

            <div className="page-padding">
                <Card padding={0}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', borderBottom: `1px solid ${T.border}` }}>
                        <div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 4 }}>앱 푸시 알림</div>
                            <div style={{ fontSize: 13, color: T.gray }}>리뷰 작성 알림 및 행사 승인 결과를 알려드려요.</div>
                        </div>
                        <Toggle active={pushEnabled} onChange={setPushEnabled} />
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
                        <div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 4 }}>이메일 뉴스레터</div>
                            <div style={{ fontSize: 13, color: T.gray }}>플릿의 주요 소식과 꿀팁을 이메일로 받아보세요.</div>
                        </div>
                        <Toggle active={emailEnabled} onChange={setEmailEnabled} />
                    </div>
                </Card>

                <div
                    onClick={isSaving ? null : handleSave}
                    style={{
                        marginTop: 24, background: isSaving ? T.gray : T.blue, borderRadius: T.radiusMd,
                        padding: 16, textAlign: 'center', color: '#fff', fontSize: 15,
                        fontWeight: 700, cursor: isSaving ? 'default' : 'pointer', transition: 'all 0.15s'
                    }}
                >
                    {isSaving ? '저장 중...' : '설정 저장하기'}
                </div>
            </div>
        </div>
    );
}
