'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { T, inputStyle } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.replace('/login');
        if (user) {
            setName(user.user_metadata?.full_name || user.user_metadata?.name || '');
        }
    }, [user, loading, router]);

    const handleUpdate = async () => {
        if (!name.trim()) return alert('이름(닉네임)을 입력해주세요.');
        
        setIsSubmitting(true);
        try {
            const sb = createClient();
            const { error } = await sb.auth.updateUser({
                data: { full_name: name, name: name }
            });

            if (error) throw error;
            alert('프로필이 성공적으로 수정되었습니다.');
            router.push('/mypage');
        } catch (err) {
            alert('프로필 수정 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || !user) return null;

    return (
        <div style={{ minHeight: '100vh', background: T.bg }}>
            <TopBar title="프로필 수정" back />

            <div className="page-padding">
                <Card>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '16px 0' }}>
                        <div style={{
                            width: 80, height: 80, borderRadius: '50%',
                            background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 32, color: T.white, fontWeight: 700,
                        }}>
                            {(name?.[0] || user.email?.[0] || '?').toUpperCase()}
                        </div>
                        <div style={{ width: '100%' }}>
                            <label style={{ fontSize: 13, color: T.gray, marginBottom: 8, display: 'block' }}>계정 (변경 불가)</label>
                            <input value={user.email} disabled style={{ ...inputStyle(true), background: T.border, color: T.gray }} />
                        </div>
                        <div style={{ width: '100%', marginTop: 8 }}>
                            <label style={{ fontSize: 13, color: T.gray, marginBottom: 8, display: 'block' }}>이름 / 닉네임</label>
                            <input 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                placeholder="사용하실 닉네임을 입력하세요"
                                style={inputStyle(name)} 
                            />
                        </div>

                        <div
                            onClick={isSubmitting ? null : handleUpdate}
                            style={{
                                width: '100%', marginTop: 24, background: isSubmitting ? T.gray : T.blue, borderRadius: T.radiusMd,
                                padding: 16, textAlign: 'center', color: '#fff', fontSize: 15,
                                fontWeight: 700, cursor: isSubmitting ? 'default' : 'pointer', transition: 'all 0.15s'
                            }}
                        >
                            {isSubmitting ? '저장 중...' : '저장하기'}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
