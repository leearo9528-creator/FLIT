'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, MapPin, Trash2, Flag, Pencil } from 'lucide-react';
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

    const [isEditingPost, setIsEditingPost] = useState(false);
    const [editPostTitle, setEditPostTitle] = useState('');
    const [editPostContent, setEditPostContent] = useState('');

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState('');

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const inputRef = useRef(null);

    /* fetch */
    useEffect(() => {
        (async () => {
            setLoading(true);
            const sb = createClient();
            const [{ data: postData }, { data: commentData }] = await Promise.all([
                sb.from('posts')
                    .select('id, title, content, category, location, seller_type, author, anonymous_name, likes, created_at, is_anonymous, user_id')
                    .eq('id', id)
                    .single(),
                sb.from('post_comments')
                    .select('id, post_id, user_id, content, author, anonymous_name, is_anonymous, created_at')
                    .eq('post_id', id)
                    .order('created_at', { ascending: true }),
            ]);
            if (postData) {
                setPost(postData);
                setLikeCount(postData.likes ?? 0);
            } else {
                setNotFound(true);
            }
            setComments(commentData || []);
            setLoading(false);
        })();
    }, [id]);

    /* 메뉴 외부 클릭 닫기 */
    useEffect(() => {
        const handler = e => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* 좋아요 */
    const handleLike = useCallback(async () => {
        if (!user) { router.push('/login'); return; }
        const next = !isLiked;
        setIsLiked(next);
        const nextCount = likeCount + (next ? 1 : -1);
        setLikeCount(nextCount);
        const sb = createClient();
        await sb.from('posts').update({ likes: nextCount }).eq('id', id);
    }, [isLiked, likeCount, id, user, router]);

    /* 댓글 작성 */
    const handleCommentSubmit = async () => {
        if (!commentText.trim() || !user) return;
        setIsSubmittingComment(true);
        const sb = createClient();
        const isAnon = post?.is_anonymous ?? false;
        const displayName = isAnon
            ? (post?.anonymous_name || '익명')
            : (user?.user_metadata?.full_name || user?.user_metadata?.name || '셀러');
        const { data, error } = await sb.from('post_comments').insert({
            post_id: id,
            user_id: user.id,
            author: isAnon ? null : displayName,
            anonymous_name: isAnon ? displayName : null,
            content: commentText.trim(),
            is_anonymous: isAnon,
        }).select().single();
        if (!error && data) setComments(prev => [...prev, data]);
        setCommentText('');
        setIsSubmittingComment(false);
    };

    /* 댓글 삭제 */
    const handleCommentDelete = useCallback(async (commentId) => {
        if (!window.confirm('댓글을 삭제할까요?')) return;
        const sb = createClient();
        await sb.from('post_comments').delete().eq('id', commentId);
        setComments(prev => prev.filter(c => c.id !== commentId));
    }, []);

    /* 댓글 수정 */
    const handleCommentEditSave = useCallback(async (commentId) => {
        if (!editingText.trim()) return;
        const sb = createClient();
        await sb.from('post_comments').update({ content: editingText.trim() }).eq('id', commentId);
        setComments(prev => prev.map(c => c.id === commentId ? { ...c, content: editingText.trim() } : c));
        setEditingCommentId(null);
    }, [editingText]);

    /* 글 수정 */
    const handleEditPostSave = async () => {
        if (!editPostTitle.trim()) return;
        const sb = createClient();
        await sb.from('posts').update({ title: editPostTitle.trim(), content: editPostContent.trim() }).eq('id', id);
        setPost(prev => ({ ...prev, title: editPostTitle.trim(), content: editPostContent.trim() }));
        setIsEditingPost(false);
    };

    /* 글 삭제 */
    const handleDelete = async () => {
        if (!window.confirm('게시글을 삭제할까요?')) return;
        const sb = createClient();
        await sb.from('posts').delete().eq('id', id);
        router.replace('/community');
    };

    /* 공유 */
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({ title: post?.title, url: window.location.href });
        } else {
            navigator.clipboard?.writeText(window.location.href);
            alert('링크가 복사됐어요!');
        }
    };

    /* ── 로딩 ── */
    if (loading) return (
        <div style={{ minHeight: '100vh', background: T.bg }}>
            <TopBar title="" back />
            <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[240, 180, 140, 100].map((w, i) => (
                    <div key={i} style={{ height: 16, width: w, background: T.grayLt, borderRadius: 6, animation: 'pulse 1.5s infinite' }} />
                ))}
            </div>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
        </div>
    );

    /* ── 없음 ── */
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
    const postAuthor = post.is_anonymous ? (post.anonymous_name || '익명 셀러') : (post.author || '셀러');

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 120 }}>

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
                                background: T.white, border: `1px solid ${T.border}`,
                                borderRadius: T.radiusMd, boxShadow: T.shadowMd,
                                minWidth: 140, zIndex: 300, overflow: 'hidden',
                            }}>
                                {isOwner ? (
                                    <>
                                        <div
                                            onClick={() => { setEditPostTitle(post.title); setEditPostContent(post.content); setIsEditingPost(true); setMenuOpen(false); }}
                                            style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: T.text, display: 'flex', alignItems: 'center', gap: 8 }}
                                        >
                                            <Pencil size={14} /> 수정하기
                                        </div>
                                        <div style={{ height: 1, background: T.border }} />
                                        <div
                                            onClick={() => { handleDelete(); setMenuOpen(false); }}
                                            style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: T.red, display: 'flex', alignItems: 'center', gap: 8 }}
                                        >
                                            <Trash2 size={14} /> 삭제하기
                                        </div>
                                    </>
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

                {/* ── 본문 ── */}
                <div style={{ background: T.white, borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ padding: '20px 18px 0' }}>

                        {/* 배지 */}
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                            {post.category && (
                                <span style={{ fontSize: 11, fontWeight: 700, color: T.blue, background: T.blueLt, padding: '3px 8px', borderRadius: 4 }}>
                                    {post.category}
                                </span>
                            )}
                            {post.seller_type && <SellerBadge type={post.seller_type} />}
                            {post.is_anonymous && (
                                <span style={{ fontSize: 11, fontWeight: 700, color: T.gray, background: T.grayLt, padding: '3px 8px', borderRadius: 4 }}>
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

                        {/* 제목 */}
                        {isEditingPost ? (
                            <input
                                value={editPostTitle}
                                onChange={e => setEditPostTitle(e.target.value)}
                                style={{
                                    width: '100%', fontSize: 20, fontWeight: 900, color: T.text,
                                    border: `1.5px solid ${T.blue}`, borderRadius: T.radiusMd,
                                    padding: '8px 10px', outline: 'none', background: T.bg,
                                    boxSizing: 'border-box', marginBottom: 12,
                                }}
                            />
                        ) : (
                            <h1 style={{ fontSize: 20, fontWeight: 900, color: T.text, lineHeight: 1.4, margin: '0 0 16px' }}>
                                {post.title}
                            </h1>
                        )}

                        {/* 작성자 */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${T.border}` }}>
                            <Avatar name={postAuthor} size={38} />
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{postAuthor}</div>
                                <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>{timeAgo(post.created_at)}</div>
                            </div>
                        </div>

                        {/* 내용 */}
                        {isEditingPost ? (
                            <div style={{ marginBottom: 20 }}>
                                <textarea
                                    value={editPostContent}
                                    onChange={e => setEditPostContent(e.target.value)}
                                    rows={8}
                                    style={{
                                        width: '100%', fontSize: 15, color: T.text, lineHeight: 1.85,
                                        border: `1.5px solid ${T.blue}`, borderRadius: T.radiusMd,
                                        padding: '10px 12px', outline: 'none', background: T.bg,
                                        resize: 'vertical', boxSizing: 'border-box',
                                    }}
                                />
                                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                                    <button onClick={handleEditPostSave} style={{
                                        padding: '9px 20px', borderRadius: T.radiusFull, border: 'none',
                                        background: T.blue, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                                    }}>저장</button>
                                    <button onClick={() => setIsEditingPost(false)} style={{
                                        padding: '9px 20px', borderRadius: T.radiusFull,
                                        border: `1px solid ${T.border}`, background: T.white,
                                        color: T.gray, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                                    }}>취소</button>
                                </div>
                            </div>
                        ) : (
                            <div style={{ fontSize: 15, color: T.text, lineHeight: 1.85, whiteSpace: 'pre-wrap', marginBottom: 24 }}>
                                {post.content}
                            </div>
                        )}
                    </div>

                    {/* ── 액션 바 ── */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '12px 14px 14px',
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

                {/* ── 댓글 ── */}
                <div style={{ background: T.white, marginTop: 8 }}>
                    <div style={{ padding: '16px 18px 4px', fontSize: 15, fontWeight: 800, color: T.text }}>
                        댓글 {comments.length}
                    </div>

                    {comments.length === 0 ? (
                        <div style={{ padding: '28px 18px 32px', textAlign: 'center', color: T.gray, fontSize: 14 }}>
                            첫 번째 댓글을 남겨보세요!
                        </div>
                    ) : (
                        <div>
                            {comments.map((comment, i) => {
                                const commentAuthor = comment.is_anonymous
                                    ? (comment.anonymous_name || '익명')
                                    : (comment.author || '셀러');
                                return (
                                    <div key={comment.id} style={{
                                        padding: '14px 18px',
                                        borderTop: `1px solid ${T.border}`,
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                            <Avatar name={commentAuthor} size={32} />
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                                                    <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{commentAuthor}</span>
                                                    {comment.is_anonymous && (
                                                        <span style={{ fontSize: 10, color: T.gray, background: T.grayLt, padding: '1px 5px', borderRadius: 3 }}>익명</span>
                                                    )}
                                                    <span style={{ fontSize: 11, color: T.gray, marginLeft: 'auto' }}>{timeAgo(comment.created_at)}</span>
                                                </div>

                                                {editingCommentId === comment.id ? (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                        <textarea
                                                            value={editingText}
                                                            onChange={e => setEditingText(e.target.value)}
                                                            autoFocus
                                                            rows={2}
                                                            style={{
                                                                width: '100%', fontSize: 14, color: T.text, lineHeight: 1.65,
                                                                border: `1.5px solid ${T.blue}`, borderRadius: T.radiusMd,
                                                                padding: '8px 10px', resize: 'none', outline: 'none',
                                                                background: T.bg, boxSizing: 'border-box',
                                                            }}
                                                        />
                                                        <div style={{ display: 'flex', gap: 6 }}>
                                                            <button onClick={() => handleCommentEditSave(comment.id)} style={{
                                                                padding: '5px 12px', borderRadius: T.radiusFull, border: 'none',
                                                                background: T.blue, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                                            }}>저장</button>
                                                            <button onClick={() => setEditingCommentId(null)} style={{
                                                                padding: '5px 12px', borderRadius: T.radiusFull,
                                                                border: `1px solid ${T.border}`, background: T.white,
                                                                color: T.gray, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                                                            }}>취소</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div style={{ fontSize: 14, color: T.text, lineHeight: 1.65 }}>
                                                        {comment.content}
                                                    </div>
                                                )}

                                                {user?.id === comment.user_id && editingCommentId !== comment.id && (
                                                    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                                                        <button
                                                            onClick={() => { setEditingCommentId(comment.id); setEditingText(comment.content); }}
                                                            style={{
                                                                padding: '4px 10px', borderRadius: T.radiusFull,
                                                                border: `1px solid ${T.border}`, background: T.white,
                                                                cursor: 'pointer', fontSize: 12, fontWeight: 600, color: T.gray,
                                                            }}
                                                        >수정</button>
                                                        <button
                                                            onClick={() => handleCommentDelete(comment.id)}
                                                            style={{
                                                                padding: '4px 10px', borderRadius: T.radiusFull,
                                                                border: `1px solid ${T.border}`, background: T.white,
                                                                cursor: 'pointer', fontSize: 12, fontWeight: 600, color: T.red,
                                                            }}
                                                        >삭제</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* ── 댓글 입력창 ── */}
            <div style={{
                position: 'fixed', bottom: 64, left: 0, right: 0, zIndex: 100,
                background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
                borderTop: `1px solid ${T.border}`,
                padding: '10px 16px',
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: T.bg, borderRadius: T.radiusFull,
                    padding: '8px 8px 8px 16px',
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

            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
        </div>
    );
}
