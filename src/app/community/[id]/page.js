'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, MapPin, Trash2, Flag } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { timeAgo } from '@/lib/helpers';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/lib/auth-context';
import TopBar from '@/components/ui/TopBar';
import { SellerBadge } from '@/components/ui/SellerBadge';

/* ─── Avatar ────────────────────────────────────────────────── */
function Avatar({ name, size = 36 }) {
    const initial = (name || '?')[0].toUpperCase();
    const hue = name ? (name.charCodeAt(0) * 37) % 360 : 200;
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%', flexShrink: 0,
            background: `hsl(${hue},55%,60%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: size * 0.38, fontWeight: 700, color: '#fff',
        }}>
            {initial}
        </div>
    );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function PostDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [commentLikes, setCommentLikes] = useState({});

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const inputRef = useRef(null);

    /* fetch post */
    useEffect(() => {
        (async () => {
            setLoading(true);
            const sb = createClient();
            const { data } = await sb
                .from('posts')
                .select('*, event:events(name)')
                .eq('id', id)
                .single();
            if (data) {
                setPost(data);
                setLikeCount(data.likes ?? 0);
            } else {
                setNotFound(true);
            }
            setLoading(false);
        })();
    }, [id]);

    /* close menu on outside click */
    useEffect(() => {
        const handler = e => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLike = useCallback(async () => {
        const next = !isLiked;
        setIsLiked(next);
        setLikeCount(v => v + (next ? 1 : -1));
        if (post?.id) {
            const sb = createClient();
            await sb.from('posts').update({ likes: likeCount + (next ? 1 : -1) }).eq('id', post.id);
        }
    }, [isLiked, likeCount, post?.id]);

    const handleCommentLike = useCallback(id => {
        setCommentLikes(prev => ({
            ...prev,
            [id]: {
                liked: !prev[id]?.liked,
                count: (prev[id]?.count ?? 0) + (prev[id]?.liked ? -1 : 1),
            },
        }));
    }, []);

    const handleCommentSubmit = async () => {
        if (!commentText.trim()) return;
        setIsSubmittingComment(true);
        const newComment = {
            id: Date.now(),
            author: user?.user_metadata?.full_name || user?.user_metadata?.name || '셀러',
            isAnon: false,
            content: commentText.trim(),
            created_at: new Date().toISOString(),
        };
        setComments(prev => [...prev, newComment]);
        setCommentLikes(prev => ({ ...prev, [newComment.id]: { liked: false, count: 0 } }));
        setCommentText('');
        setIsSubmittingComment(false);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({ title: post?.title, url: window.location.href });
        } else {
            navigator.clipboard?.writeText(window.location.href);
            alert('링크가 복사됐어요!');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('게시글을 삭제할까요?')) return;
        const sb = createClient();
        await sb.from('posts').delete().eq('id', post.id);
        router.replace('/community');
    };

    if (loading) return (
        <div style={{ minHeight: '100vh', background: T.bg }}>
            <TopBar title="" back />
            <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[200, 160, 120, 80].map((w, i) => (
                    <div key={i} style={{ height: 18, width: w, background: T.grayLt, borderRadius: 6, animation: 'pulse 1.5s infinite' }} />
                ))}
            </div>
        </div>
    );

    if (notFound || !post) return (
        <div style={{ minHeight: '100vh', background: T.bg }}>
            <TopBar title="커뮤니티" back />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 20px', color: T.gray }}>
                <div style={{ fontSize: 44, marginBottom: 12, opacity: 0.4 }}>💬</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 6 }}>게시글을 찾을 수 없어요</div>
                <div style={{ fontSize: 13, color: T.gray }}>삭제됐거나 잘못된 주소예요</div>
            </div>
        </div>
    );

    const isOwner = user?.id === post.user_id;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>

            {/* ── TopBar ── */}
            <TopBar
                title={post.category || '커뮤니티'}
                back
                action={
                    <div ref={menuRef} style={{ position: 'relative' }}>
                        <button
                            onClick={() => setMenuOpen(v => !v)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
                        >
                            <MoreHorizontal size={22} color={T.gray} />
                        </button>
                        {menuOpen && (
                            <div style={{
                                position: 'absolute', top: '100%', right: 0, marginTop: 6,
                                background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
                                boxShadow: T.shadowMd, minWidth: 140, zIndex: 300, overflow: 'hidden',
                            }}>
                                {isOwner ? (
                                    <div
                                        onClick={() => { handleDelete(); setMenuOpen(false); }}
                                        style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: T.red, display: 'flex', alignItems: 'center', gap: 8 }}
                                    >
                                        <Trash2 size={14} /> 삭제하기
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => { alert('신고가 접수됐어요.'); setMenuOpen(false); }}
                                        style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: T.red, display: 'flex', alignItems: 'center', gap: 8 }}
                                    >
                                        <Flag size={14} /> 신고하기
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                }
            />

            <div style={{ maxWidth: 640, margin: '0 auto' }}>

                {/* ── Post Body ── */}
                <div style={{ background: T.white, borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ padding: '20px 18px 0' }}>

                        {/* Badges */}
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                            {post.category && (
                                <span style={{
                                    fontSize: 11, fontWeight: 700, color: T.blue,
                                    background: T.blueLt, padding: '2px 8px', borderRadius: 4,
                                }}>
                                    {post.category}
                                </span>
                            )}
                            {post.seller_type && <SellerBadge type={post.seller_type} />}
                            {post.is_anonymous && (
                                <span style={{ fontSize: 11, fontWeight: 700, color: T.gray, background: T.grayLt, padding: '2px 8px', borderRadius: 4 }}>
                                    익명
                                </span>
                            )}
                            {post.location && (
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 3,
                                    fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: T.radiusFull,
                                    background: T.greenLt, color: T.green,
                                }}>
                                    <MapPin size={10} /> {post.location}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 style={{ fontSize: 20, fontWeight: 900, color: T.text, lineHeight: 1.4, margin: '0 0 16px' }}>
                            {post.title}
                        </h1>

                        {/* Author row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${T.border}` }}>
                            <Avatar name={post.is_anonymous ? (post.anonymous_name || '익명') : (post.author || '셀러')} size={38} />
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>
                                    {post.is_anonymous ? (post.anonymous_name || '익명 셀러') : (post.author || '셀러')}
                                </div>
                                <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>
                                    {timeAgo(post.created_at)}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ fontSize: 15, color: T.text, lineHeight: 1.85, whiteSpace: 'pre-wrap', marginBottom: 20 }}>
                            {post.content}
                        </div>

                        {/* Event link */}
                        {post.event?.name && (
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                background: T.blueLt, borderRadius: T.radiusMd, padding: '10px 14px', marginBottom: 20,
                            }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: T.blue }}>📅 {post.event.name}</span>
                            </div>
                        )}
                    </div>

                    {/* ── Action bar ── */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        padding: '12px 12px 14px',
                        borderTop: `1px solid ${T.border}`,
                    }}>
                        <button
                            onClick={handleLike}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                padding: '8px 14px', borderRadius: T.radiusFull,
                                border: `1.5px solid ${isLiked ? T.red : T.border}`,
                                background: isLiked ? T.redLt : T.white,
                                cursor: 'pointer', fontSize: 13, fontWeight: 700,
                                color: isLiked ? T.red : T.gray,
                                transition: 'all 0.15s',
                            }}
                        >
                            <Heart size={15} fill={isLiked ? T.red : 'none'} color={isLiked ? T.red : T.gray} />
                            {likeCount}
                        </button>

                        <button
                            onClick={() => inputRef.current?.focus()}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                padding: '8px 14px', borderRadius: T.radiusFull,
                                border: `1.5px solid ${T.border}`, background: T.white,
                                cursor: 'pointer', fontSize: 13, fontWeight: 700, color: T.gray,
                            }}
                        >
                            <MessageCircle size={15} />
                            {comments.length}
                        </button>

                        <button
                            onClick={handleShare}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                padding: '8px 14px', borderRadius: T.radiusFull,
                                border: `1.5px solid ${T.border}`, background: T.white,
                                cursor: 'pointer', fontSize: 13, fontWeight: 700, color: T.gray,
                            }}
                        >
                            <Share2 size={15} />
                            공유
                        </button>
                    </div>
                </div>

                {/* ── Comments ── */}
                <div style={{ background: T.white, marginTop: 8, borderTop: `1px solid ${T.border}` }}>
                    <div style={{ padding: '16px 18px 0', fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 4 }}>
                        댓글 {comments.length}
                    </div>

                    {comments.length === 0 ? (
                        <div style={{ padding: '32px 18px', textAlign: 'center', color: T.gray, fontSize: 14 }}>
                            첫 번째 댓글을 남겨보세요!
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {comments.map((comment, i) => (
                                <div key={comment.id} style={{
                                    padding: '16px 18px',
                                    borderTop: i > 0 ? `1px solid ${T.border}` : 'none',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                        <Avatar name={comment.author} size={32} />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{comment.author}</span>
                                                <span style={{ fontSize: 11, color: T.gray, marginLeft: 'auto' }}>
                                                    {timeAgo(comment.created_at)}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: 14, color: T.text, lineHeight: 1.65 }}>
                                                {comment.content}
                                            </div>
                                            <button
                                                onClick={() => handleCommentLike(comment.id)}
                                                style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: 4,
                                                    marginTop: 8, padding: '4px 10px', borderRadius: T.radiusFull,
                                                    border: `1px solid ${commentLikes[comment.id]?.liked ? T.red : T.border}`,
                                                    background: commentLikes[comment.id]?.liked ? T.redLt : T.white,
                                                    cursor: 'pointer', fontSize: 12, fontWeight: 600,
                                                    color: commentLikes[comment.id]?.liked ? T.red : T.gray,
                                                    transition: 'all 0.15s',
                                                }}
                                            >
                                                <Heart size={11} fill={commentLikes[comment.id]?.liked ? T.red : 'none'} color={commentLikes[comment.id]?.liked ? T.red : T.gray} />
                                                {commentLikes[comment.id]?.count ?? 0}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── 댓글 입력 ── */}
            <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
                background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
                borderTop: `1px solid ${T.border}`,
                padding: '10px 16px 24px',
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: T.bg, borderRadius: T.radiusFull, padding: '8px 8px 8px 16px',
                    border: `1.5px solid ${commentText ? T.blue : T.border}`,
                    transition: 'border-color 0.15s',
                }}>
                    <input
                        ref={inputRef}
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleCommentSubmit(); } }}
                        placeholder={user ? '댓글을 입력하세요...' : '로그인 후 댓글을 달 수 있어요'}
                        readOnly={!user}
                        onClick={() => { if (!user) router.push('/login'); }}
                        style={{
                            flex: 1, border: 'none', background: 'transparent',
                            fontSize: 14, color: T.text, outline: 'none',
                        }}
                    />
                    <button
                        onClick={handleCommentSubmit}
                        disabled={!commentText.trim() || isSubmittingComment}
                        style={{
                            width: 36, height: 36, borderRadius: '50%', border: 'none',
                            background: commentText.trim() ? T.blue : T.border,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: commentText.trim() ? 'pointer' : 'default',
                            transition: 'background 0.15s', flexShrink: 0,
                        }}
                    >
                        <Send size={16} color="#fff" />
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
}
