'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { T, FILTERS, inputStyle } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function EventRegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [recruitmentType, setRecruitmentType] = useState('플리마켓');
    const [sido, setSido] = useState('서울');
    const [isIndoor, setIsIndoor] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!name) return alert('행사명을 입력해주세요.');

        setIsSubmitting(true);
        try {
            const { getSupabase } = await import('@/lib/supabase');
            const sb = getSupabase();
            const { data: { session } } = await sb.auth.getSession();

            if (!session?.user) {
                alert('로그인이 필요합니다.');
                return;
            }

            const { error } = await sb.from('events').insert({
                name,
                recruitment_type: recruitmentType,
                location_sido: sido,
                is_indoor: isIndoor,
                is_paid: isPaid,
                submitted_by: session.user.id,
                is_approved: false, // 제보 시 기본적으로 미승인
                source: 'user',
                status: '모집중'
            });

            if (error) throw error;

            alert('행사가 제보되었습니다! 관리자 승인 후 목록에 표시됩니다.');
            router.push('/reviews/write'); // 리뷰 작성 페이지로 다시 이동
        } catch (err) {
            console.error('행사 제보 에러:', err);
            alert('저장 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div style={{ minHeight: '100vh', background: T.bg }}>
            <TopBar
                title="새로운 행사 제보"
                hasBack
                onBack={() => router.back()}
            />

            <div className="page-padding">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Card>
                        <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 14 }}>기본 정보</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label style={{ fontSize: 13, color: T.gray, marginBottom: 8, display: 'block' }}>행사명</label>
                                <input value={name} onChange={(e) => setName(e.target.value)}
                                    placeholder="공식 행사명을 입력해주세요" style={inputStyle(name)} />
                            </div>
                            <div>
                                <label style={{ fontSize: 13, color: T.gray, marginBottom: 8, display: 'block' }}>모집 유형</label>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    {['플리마켓', '푸드트럭', '둘다'].map((v) => (
                                        <div key={v} onClick={() => setRecruitmentType(v)} style={{
                                            flex: 1, padding: 12, borderRadius: T.radiusMd, cursor: 'pointer',
                                            border: `2px solid ${recruitmentType === v ? T.blue : T.border}`,
                                            background: recruitmentType === v ? T.blueLt : T.white,
                                            textAlign: 'center', fontSize: 13, fontWeight: 700,
                                            color: recruitmentType === v ? T.blue : T.gray,
                                        }}>{v}</div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: 13, color: T.gray, marginBottom: 8, display: 'block' }}>지역</label>
                                <select value={sido} onChange={(e) => setSido(e.target.value)} style={inputStyle(true)}>
                                    {FILTERS.region.map((r) => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 14 }}>추가 정보</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 14, color: T.text }}>실내 행사인가요?</span>
                                <div onClick={() => setIsIndoor(!isIndoor)} style={{
                                    width: 44, height: 24, borderRadius: 12, background: isIndoor ? T.blue : T.border,
                                    position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
                                }}>
                                    <div style={{
                                        position: 'absolute', top: 2, left: isIndoor ? 22 : 2,
                                        width: 20, height: 20, borderRadius: '50%', background: '#fff',
                                        transition: 'left 0.2s',
                                    }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 14, color: T.text }}>유료 행사인가요? (입장료)</span>
                                <div onClick={() => setIsPaid(!isPaid)} style={{
                                    width: 44, height: 24, borderRadius: 12, background: isPaid ? T.blue : T.border,
                                    position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
                                }}>
                                    <div style={{
                                        position: 'absolute', top: 2, left: isPaid ? 22 : 2,
                                        width: 20, height: 20, borderRadius: '50%', background: '#fff',
                                        transition: 'left 0.2s',
                                    }} />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div
                        onClick={isSubmitting ? null : handleSubmit}
                        style={{
                            background: isSubmitting ? T.gray : T.blue, borderRadius: T.radiusMd,
                            padding: 18, textAlign: 'center', color: '#fff', fontSize: 16,
                            fontWeight: 700, cursor: isSubmitting ? 'default' : 'pointer',
                        }}
                    >
                        {isSubmitting ? '처리 중...' : '제보 완료'}
                    </div>
                </div>
            </div>
        </div>
    );
}
