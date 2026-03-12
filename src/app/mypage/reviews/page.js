'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function MyReviewsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [reviews, setReviews] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
            return;
        }

        if (user) {
            fetchMyReviews();
        }
    }, [user, loading, router]);

    async function fetchMyReviews() {
        const sb = createClient();
        const { data } = await sb
            .from('reviews')
            .select('*, event:events(name)')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        
        if (data) setReviews(data);
        setIsFetching(false);
    }

    const handleDelete = async (id) => {
        if (!window.confirm('정말 리뷰를 삭제하시겠습니까?')) return;
        try {
            const sb = createClient();
            const { error } = await sb.from('reviews').delete().eq('id', id);
            if (error) throw error;
            alert('삭제되었습니다.');
            fetchMyReviews();
        } catch (err) {
            console.error(err);
            alert('삭제에 실패했습니다.');
        }
    };

    if (loading || isFetching) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray, fontSize: 15 }}>로딩 중...</div>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="내가 쓴 리뷰" back />

            <div className="page-padding">
                {reviews.length === 0 ? (
                    <div style={{ textAlign: 'center', color: T.gray, marginTop: 40, fontSize: 15 }}>
                        아직 작성한 리뷰가 없습니다.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {reviews.map(review => (
                            <Card key={review.id} padding={16}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ fontSize: 13, color: T.blue, fontWeight: 700, marginBottom: 4 }}>
                                        {review.event?.name || '알 수 없는 행사'}
                                    </div>
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <span onClick={() => alert('리뷰 수정 기능은 준비중입니다.')} style={{ fontSize: 13, color: T.gray, cursor: 'pointer', fontWeight: 600 }}>수정</span>
                                        <span onClick={() => handleDelete(review.id)} style={{ fontSize: 13, color: T.red, cursor: 'pointer', fontWeight: 600 }}>삭제</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                                    <span style={{ fontSize: 13 }}>⭐</span>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{review.overall_rating || '-'}</span>
                                </div>
                                <div style={{ fontSize: 15, color: T.text, lineHeight: 1.5 }}>
                                    {review.pros || review.content || '장점 내용이 없습니다.'}
                                </div>
                                <div style={{ fontSize: 12, color: T.gray, marginTop: 12 }}>
                                    {new Date(review.created_at).toLocaleDateString()}
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
