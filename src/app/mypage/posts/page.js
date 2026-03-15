'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MessageSquare } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import { timeAgo } from '@/lib/helpers';
import TopBar from '@/components/ui/TopBar';

export default function MyPostsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loading && !user) { router.replace('/login'); return; }
        if (user) fetchPosts();
    }, [user, loading]);

    async function fetchPosts() {
        const sb = createClient();
        const { data } = await sb
            .from('posts')
            .select('id, title, content, category, likes, created_at, is_anonymous')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        if (data) setPosts(data);
        setFetching(false);
    }

    const handleDelete = async (id) => {
        if (!window.confirm('게시글을 삭제할까요?')) return;
        const sb = createClient();
        const { error } = await sb.from('posts').delete().eq('id', id);
        if (!error) setPosts(prev => prev.filter(p => p.id !== id));
    };

    if (loading || fetching) return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: T.gray }}>로딩 중...</div>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="내가 쓴 글" back />

            {posts.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 20px', color: T.gray }}>
                    <div style={{ fontSize: 44, marginBottom: 12, opacity: 0.4 }}>💬</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 6 }}>아직 작성한 글이 없어요</div>
                    <div style={{ fontSize: 13, color: T.gray }}>커뮤니티에서 첫 글을 남겨보세요</div>
                </div>
            ) : (
                <div style={{ background: T.white }}>
                    {posts.map((post, i) => (
                        <div
                            key={post.id}
                            style={{
                                padding: '16px 20px',
                                borderBottom: i < posts.length - 1 ? `1px solid ${T.border}` : 'none',
                            }}
                        >
                            {/* 카테고리 + 메뉴 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    {post.category && (
                                        <span style={{
                                            fontSize: 11, fontWeight: 700, color: T.blue,
                                            background: T.blueLt, padding: '2px 7px', borderRadius: 4,
                                        }}>
                                            {post.category}
                                        </span>
                                    )}
                                    {post.is_anonymous && (
                                        <span style={{
                                            fontSize: 11, fontWeight: 700, color: T.gray,
                                            background: T.grayLt, padding: '2px 7px', borderRadius: 4,
                                        }}>
                                            익명
                                        </span>
                                    )}
                                </div>
                                <span
                                    onClick={() => handleDelete(post.id)}
                                    style={{ fontSize: 12, color: T.gray, cursor: 'pointer' }}
                                >
                                    삭제
                                </span>
                            </div>

                            {/* 제목 */}
                            <div
                                onClick={() => router.push(`/community/${post.id}`)}
                                style={{
                                    fontSize: 15, fontWeight: 700, color: T.text,
                                    marginBottom: 5, lineHeight: 1.4, cursor: 'pointer',
                                    display: '-webkit-box', WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                }}
                            >
                                {post.title}
                            </div>

                            {/* 내용 미리보기 */}
                            {post.content && (
                                <div style={{
                                    fontSize: 13, color: T.textSub, lineHeight: 1.5,
                                    marginBottom: 10,
                                    display: '-webkit-box', WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                }}>
                                    {post.content}
                                </div>
                            )}

                            {/* 하단 메타 */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: T.gray }}>
                                    <Heart size={12} /> {post.likes ?? 0}
                                </span>
                                <span style={{ marginLeft: 'auto', fontSize: 12, color: T.gray }}>
                                    {timeAgo(post.created_at)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
