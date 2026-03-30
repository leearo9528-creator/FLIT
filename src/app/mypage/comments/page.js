'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import { timeAgo } from '@/lib/helpers';
import TopBar from '@/components/ui/TopBar';

export default function MyCommentsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [comments, setComments] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loading && !user) { router.replace('/login'); return; }
        if (user) fetchComments();
    }, [user, loading]);

    async function fetchComments() {
        const sb = createClient();
        const { data, error } = await sb
            .from('post_comments')
            .select('id, content, created_at, post:posts(id, title)')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        if (error) console.error('내 댓글 로드 실패:', error);
        if (data) setComments(data);
        setFetching(false);
    }

    const handleDelete = async (id) => {
        if (!window.confirm('댓글을 삭제할까요?')) return;
        const sb = createClient();
        const { error } = await sb.from('post_comments').delete().eq('id', id);
        if (!error) setComments(prev => prev.filter(c => c.id !== id));
    };

    if (loading || !user) return null;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="내가 쓴 댓글" back />

            <div style={{ padding: '12px 16px 0' }}>
                {fetching ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} style={{ height: 80, background: T.grayLt, borderRadius: T.radiusLg, marginBottom: 10, animation: 'pulse 1.5s infinite' }} />
                    ))
                ) : comments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>
                        작성한 댓글이 없어요.
                    </div>
                ) : (
                    comments.map(c => (
                        <div
                            key={c.id}
                            style={{
                                background: T.white, borderRadius: T.radiusLg,
                                border: `1px solid ${T.border}`, padding: '14px 16px',
                                marginBottom: 10,
                            }}
                        >
                            {/* 원본 글 제목 */}
                            {c.post?.title && (
                                <div
                                    onClick={() => router.push(`/community/${c.post.id}`)}
                                    style={{ fontSize: 12, color: T.blue, fontWeight: 600, marginBottom: 6, cursor: 'pointer' }}
                                >
                                    {c.post.title}
                                </div>
                            )}

                            {/* 댓글 내용 */}
                            <div style={{
                                fontSize: 14, color: T.text, lineHeight: 1.6, marginBottom: 8,
                                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                            }}>
                                {c.content}
                            </div>

                            {/* 하단 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 12, color: T.gray }}>{timeAgo(c.created_at)}</span>
                                <span
                                    onClick={() => handleDelete(c.id)}
                                    style={{ fontSize: 12, color: T.red, cursor: 'pointer', fontWeight: 600 }}
                                >
                                    삭제
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
