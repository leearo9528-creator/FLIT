'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import { timeAgo } from '@/lib/helpers';
import TopBar from '@/components/ui/TopBar';
import Link from 'next/link';
import EmptyState from '@/components/ui/EmptyState';

const TABS = [
    { key: 'reviews', label: '리뷰' },
    { key: 'posts', label: '글' },
    { key: 'comments', label: '댓글' },
];

/* ─── 리뷰 카드 ─── */
function ReviewItem({ review, onDelete, router }) {
    const inst = review.event_instance || {};
    const ev = inst.base_event || {};
    const org = inst.organizer || {};
    const scores = [review.rating_profit, review.rating_traffic, review.rating_support, review.rating_manners, review.rating_promotion].filter(v => v != null);
    const overall = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const prosChips = review.pros ? review.pros.split('\n').map(s => s.trim()).filter(Boolean) : [];
    const consChips = review.cons ? review.cons.split('\n').map(s => s.trim()).filter(Boolean) : [];

    return (
        <div style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: 16, marginBottom: 10 }}>
            {ev.id && (
                <Link href={`/events/${ev.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.blue, marginBottom: 6 }}>
                        🎪 {ev.name || '행사명 없음'}
                        {inst.event_date && <span style={{ fontWeight: 400, color: T.gray, marginLeft: 6, fontSize: 12 }}>{new Date(inst.event_date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}</span>}
                    </div>
                </Link>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: review.seller_type === 'foodtruck' ? T.greenLt : T.blueLt, color: review.seller_type === 'foodtruck' ? T.green : T.blue }}>
                    {review.seller_type === 'foodtruck' ? '🚚 푸드트럭' : '🛍️ 셀러'}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: 900, color: overall >= 4 ? T.green : overall >= 3 ? T.blue : T.gray }}>{overall.toFixed(1)}</span>
                </div>
            </div>
            {review.revenue_range && (
                <div style={{ fontSize: 12, color: T.gray, marginBottom: 4 }}>💰 {review.revenue_range}</div>
            )}
            {(prosChips.length > 0 || consChips.length > 0) && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
                    {prosChips.slice(0, 3).map(c => <span key={c} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: T.greenLt, color: T.green, fontWeight: 600 }}>👍 {c}</span>)}
                    {consChips.slice(0, 2).map(c => <span key={c} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: '#FEE2E2', color: '#EF4444', fontWeight: 600 }}>👎 {c}</span>)}
                </div>
            )}
            {review.content && (
                <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.6, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {review.content}
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: T.gray }}>{org.name ? `🏢 ${org.name} · ` : ''}{timeAgo(review.created_at)}</span>
                <div style={{ display: 'flex', gap: 12 }}>
                    <span onClick={() => router.push(`/reviews/write?edit=${review.id}&from=/mypage/activity`)} style={{ fontSize: 12, color: T.blue, cursor: 'pointer', fontWeight: 600 }}>수정</span>
                    <span onClick={() => onDelete(review.id)} style={{ fontSize: 12, color: T.gray, cursor: 'pointer' }}>삭제</span>
                </div>
            </div>
        </div>
    );
}

/* ─── 글 카드 ─── */
function PostItem({ post, onDelete, router }) {
    return (
        <div style={{ background: T.white, padding: '14px 16px', borderBottom: `1px solid ${T.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                    {post.category && <span style={{ fontSize: 11, fontWeight: 700, color: T.blue, background: T.blueLt, padding: '2px 7px', borderRadius: 4 }}>{post.category}</span>}
                    {post.is_anonymous && <span style={{ fontSize: 11, fontWeight: 700, color: T.gray, background: T.grayLt, padding: '2px 7px', borderRadius: 4 }}>익명</span>}
                </div>
                <span onClick={() => onDelete(post.id)} style={{ fontSize: 12, color: T.gray, cursor: 'pointer' }}>삭제</span>
            </div>
            <div onClick={() => router.push(`/community/${post.id}`)} style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 4, cursor: 'pointer', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {post.title}
            </div>
            {post.content && (
                <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.5, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.content}
                </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: T.gray }}><Heart size={12} /> {post.likes ?? 0}</span>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: T.gray }}>{timeAgo(post.created_at)}</span>
            </div>
        </div>
    );
}

/* ─── 댓글 카드 ─── */
function CommentItem({ comment, onDelete, router }) {
    return (
        <div style={{ background: T.white, borderRadius: T.radiusLg, border: `1px solid ${T.border}`, padding: '14px 16px', marginBottom: 10 }}>
            {comment.post?.title && (
                <div onClick={() => router.push(`/community/${comment.post.id}`)} style={{ fontSize: 12, color: T.blue, fontWeight: 600, marginBottom: 6, cursor: 'pointer' }}>
                    {comment.post.title}
                </div>
            )}
            <div style={{ fontSize: 14, color: T.text, lineHeight: 1.6, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {comment.content}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: T.gray }}>{timeAgo(comment.created_at)}</span>
                <span onClick={() => onDelete(comment.id)} style={{ fontSize: 12, color: T.red, cursor: 'pointer', fontWeight: 600 }}>삭제</span>
            </div>
        </div>
    );
}

/* ─── Page ─── */
export default function MyActivityPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [tab, setTab] = useState('reviews');
    const [reviews, setReviews] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loading && !user) { router.replace('/login'); return; }
        if (user) fetchAll();
    }, [user, loading]);

    async function fetchAll() {
        const sb = createClient();
        const [rvRes, ptRes, cmRes] = await Promise.all([
            sb.from('reviews').select(`id, seller_type, is_verified, created_at, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, pros, cons, content, event_instance:event_instances(id, event_date, base_event:base_events(id, name), organizer:organizers(name))`).eq('user_id', user.id).order('created_at', { ascending: false }),
            sb.from('posts').select('id, title, content, category, likes, created_at, is_anonymous').eq('user_id', user.id).order('created_at', { ascending: false }),
            sb.from('post_comments').select('id, content, created_at, post:posts(id, title)').eq('user_id', user.id).order('created_at', { ascending: false }),
        ]);
        setReviews(rvRes.data || []);
        setPosts(ptRes.data || []);
        setComments(cmRes.data || []);
        setFetching(false);
    }

    const deleteReview = async (id) => { if (!confirm('리뷰를 삭제할까요?')) return; const sb = createClient(); await sb.from('reviews').delete().eq('id', id); setReviews(prev => prev.filter(r => r.id !== id)); };
    const deletePost = async (id) => { if (!confirm('게시글을 삭제할까요?')) return; const sb = createClient(); await sb.from('posts').delete().eq('id', id); setPosts(prev => prev.filter(p => p.id !== id)); };
    const deleteComment = async (id) => { if (!confirm('댓글을 삭제할까요?')) return; const sb = createClient(); await sb.from('post_comments').delete().eq('id', id); setComments(prev => prev.filter(c => c.id !== id)); };

    if (loading || !user) return null;

    const counts = { reviews: reviews.length, posts: posts.length, comments: comments.length };

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="내 활동" back />

            {/* 탭 */}
            <div style={{ display: 'flex', background: T.white, borderBottom: `1px solid ${T.border}` }}>
                {TABS.map(t => {
                    const active = tab === t.key;
                    const count = counts[t.key];
                    return (
                        <div key={t.key} onClick={() => setTab(t.key)} style={{
                            flex: 1, padding: '14px 0', textAlign: 'center', cursor: 'pointer',
                            borderBottom: active ? `2.5px solid ${T.blue}` : '2.5px solid transparent',
                            transition: 'border-color 0.15s',
                        }}>
                            <span style={{ fontSize: 14, fontWeight: active ? 800 : 600, color: active ? T.blue : T.gray }}>
                                {t.label}
                            </span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: active ? T.blue : T.gray, marginLeft: 4 }}>
                                {count}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* 콘텐츠 */}
            <div style={{ padding: tab === 'posts' ? 0 : '12px 16px 0' }}>
                {fetching ? (
                    <div style={{ padding: tab === 'posts' ? '12px 16px' : 0 }}>
                        {Array(3).fill(0).map((_, i) => <div key={i} style={{ height: 70, background: T.grayLt, borderRadius: T.radiusLg, marginBottom: 10, animation: 'pulse 1.5s infinite' }} />)}
                    </div>
                ) : tab === 'reviews' ? (
                    reviews.length === 0 ? (
                        <EmptyState icon="✏️" title="작성한 리뷰가 없어요" sub="행사 참가 후 리뷰를 남겨보세요" cta="리뷰 작성하기" href="/reviews/write" router={router} />
                    ) : reviews.map(r => <ReviewItem key={r.id} review={r} onDelete={deleteReview} router={router} />)
                ) : tab === 'posts' ? (
                    posts.length === 0 ? (
                        <div style={{ padding: '0 16px' }}><EmptyState icon="💬" title="작성한 글이 없어요" sub="커뮤니티에서 첫 글을 남겨보세요" cta="글쓰기" href="/community/write" router={router} /></div>
                    ) : <div style={{ background: T.white }}>{posts.map(p => <PostItem key={p.id} post={p} onDelete={deletePost} router={router} />)}</div>
                ) : tab === 'comments' ? (
                    comments.length === 0 ? (
                        <EmptyState icon="💭" title="작성한 댓글이 없어요" sub="게시글에 댓글을 달아보세요" />
                    ) : comments.map(c => <CommentItem key={c.id} comment={c} onDelete={deleteComment} router={router} />)
                ) : null}
            </div>
        </div>
    );
}

