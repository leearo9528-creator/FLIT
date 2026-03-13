'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, MapPin, Trash2, Flag } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';

/* ─── Mock fallback data ─────────────────────────────────────── */
const ALL_MOCK = {
    1: {
        id: 1, sellerType: 'foodtruck', category: '실시간 현황',
        location: '여의도 한강',
        title: '여의도 오늘 자리 잡았어요! 팟타이 특가 이벤트 중',
        content: `드디어 자리 잡았습니다 🎉

오늘 팟타이 6,000원에 팔아요. 날씨 좋으니 많이 와주세요!

현재 웨이팅 없고 자리도 여유롭습니다. 오후 9시까지 운영 예정이에요.
음료도 같이 팔고 있으니 세트로 드시면 더 맛있어요 😊

⚡ 전력 공급 안정적이에요
🚰 수도 연결 정상이에요`,
        author: '바쁜 타코야키 셀러',
        isAnon: true,
        likes: 18, comments: 6, time: '5분 전',
        images: [],
    },
    2: {
        id: 2, sellerType: 'seller', category: '실시간 현황',
        location: '성수동',
        title: '성수 팝업 현황 — 오전 11시 기준 매출 중간 점검',
        content: `오전에만 35만원 찍었어요 🎉

예상보다 잘 팔리는 아이템은 키링이랑 파우치입니다. 특히 곰돌이 키링이 진짜 나가고 있어요.

12시쯤 되니까 사람 엄청 몰리기 시작했어요. 오늘 성수 팝업 날이라서 유동인구 엄청납니다.

👥 사람 엄청 많아요!
🅿️ 주차 자리 없어요`,
        author: '열정적인 액세서리 장인',
        isAnon: true,
        likes: 32, comments: 11, time: '23분 전',
        images: [],
    },
    5: {
        id: 5, sellerType: 'seller', category: '자유게시판',
        location: null,
        title: '처음 플리마켓 나가는데 필수 준비물 알려주세요',
        content: `안녕하세요! 다음 달에 첫 플리마켓 출전을 앞두고 있는 초보 셀러입니다 🙋

핸드메이드 파우치랑 키링 위주로 팔 예정인데요, 선배 셀러분들 필수 준비물이나 꿀팁이 있으시면 알려주시면 감사할 것 같아요!

제가 지금까지 준비한 것들:
- 접이식 테이블 (60×120cm)
- 테이블보
- 상품 전시대

혹시 제가 빠뜨린 게 있을까요? 특히 결제 관련이나 현장에서 꼭 필요한 소품 위주로 알려주시면 너무 감사할 것 같아요 🙏`,
        author: '수줍은 핸드메이드 작가',
        isAnon: true,
        likes: 14, comments: 28, time: '30분 전',
        images: [],
    },
};

const MOCK_COMMENTS = [
    {
        id: 1, author: '능숙한 빈티지 큐레이터', isAnon: true, sellerType: 'seller',
        content: '카드 단말기 필수예요! 저는 토스 쓰는데 수수료도 낮고 정산도 빨라서 만족합니다 👍',
        likes: 8, time: '20분 전', isLiked: false,
    },
    {
        id: 2, author: '박지민', isAnon: false, sellerType: 'foodtruck',
        content: '돗자리랑 집게도 챙기세요. 테이블보 바람에 날아가면 진짜 당황스럽거든요 ㅋㅋ 그리고 잔돈 넉넉하게 준비하는 거 잊지 마시고요!',
        likes: 12, time: '18분 전', isLiked: false,
    },
    {
        id: 3, author: '활발한 향수 제조자', isAnon: true, sellerType: 'seller',
        content: '보조 배터리 꼭 챙기세요. 핸드폰 충전하려고 자리 비우면 물건 관리가 안 돼요. 그리고 가격표도 미리 다 붙여오시면 현장에서 한결 편해요.',
        likes: 6, time: '15분 전', isLiked: true,
    },
    {
        id: 4, author: '씩씩한 푸드트럭 요리사', isAnon: true, sellerType: 'foodtruck',
        content: '포장 봉투 종류별로 다양하게 준비하시면 좋아요. 작은 아이템은 작은 봉투, 큰 아이템은 쇼핑백. 손님들이 들고 다니기 편하면 자연스럽게 홍보가 되더라고요!',
        likes: 4, time: '10분 전', isLiked: false,
    },
];

/* ─── Helpers ────────────────────────────────────────────────── */
function SellerBadge({ type }) {
    const isFT = type === 'foodtruck';
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 3,
            fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: T.radiusFull,
            background: isFT ? T.yellowLt : T.blueLt,
            color: isFT ? T.yellow : T.blue,
        }}>
            {isFT ? '🚚' : '💎'} {isFT ? '푸드트럭' : '일반셀러'}
        </span>
    );
}

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

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const [comments, setComments] = useState(MOCK_COMMENTS);
    const [commentText, setCommentText] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);
    const [commentLikes, setCommentLikes] = useState(
        () => Object.fromEntries(MOCK_COMMENTS.map(c => [c.id, { liked: c.isLiked, count: c.likes }]))
    );

    const menuRef = useRef(null);
    const inputRef = useRef(null);

    /* fetch post */
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { createClient } = await import('@/utils/supabase/client');
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
                    throw new Error('not found');
                }
            } catch {
                /* fallback to mock */
                const mock = ALL_MOCK[Number(id)] || ALL_MOCK[1];
                setPost(mock);
                setLikeCount(mock.likes);
            }
            setLoading(false);
        })();
    }, [id]);

    /* close menu on outside click */
    useEffect(() => {
        const handler = e => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLike = () => {
        setIsLiked(v => !v);
        setLikeCount(v => v + (isLiked ? -1 : 1));
    };

    const handleCommentLike = id => {
        setCommentLikes(prev => ({
            ...prev,
            [id]: { liked: !prev[id].liked, count: prev[id].count + (prev[id].liked ? -1 : 1) },
        }));
    };

    const handleCommentSubmit = async () => {
        if (!commentText.trim()) return;
        setIsSubmittingComment(true);
        await new Promise(r => setTimeout(r, 300));
        const newComment = {
            id: Date.now(),
            author: '나',
            isAnon: false,
            sellerType: 'seller',
            content: commentText.trim(),
            likes: 0,
            time: '방금 전',
            isLiked: false,
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
            alert('링크가 복사되었습니다!');
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: T.bg }}>
                <TopBar title="" back />
                <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[200, 160, 120, 80].map((w, i) => (
                        <div key={i} style={{ height: 18, width: w, background: T.grayLt, borderRadius: 6, animation: 'pulse 1.5s infinite' }} />
                    ))}
                </div>
            </div>
        );
    }

    if (!post) return null;

    const isLivePost = post.category === '실시간 현황';

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
                                {[
                                    { icon: <Flag size={14} />, label: '신고하기', color: T.red },
                                    { icon: <Trash2 size={14} />, label: '삭제하기', color: T.red },
                                ].map(item => (
                                    <div key={item.label} onClick={() => { alert(`${item.label} 기능은 준비중입니다.`); setMenuOpen(false); }} style={{
                                        padding: '12px 16px', cursor: 'pointer', fontSize: 14,
                                        fontWeight: 600, color: item.color,
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        borderBottom: `1px solid ${T.border}`,
                                    }}>
                                        {item.icon}{item.label}
                                    </div>
                                ))}
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
                            <SellerBadge type={post.sellerType || post.seller_type} />
                            {isLivePost && (post.location) && (
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
                            <Avatar name={post.author || post.anonymous_name || '익명'} size={38} />
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>
                                    {post.isAnon || post.is_anonymous
                                        ? (post.anonymous_name || post.author || '익명 셀러')
                                        : (post.author || '셀러')}
                                </div>
                                <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>
                                    {post.time || post.created_at
                                        ? (post.time || new Date(post.created_at).toLocaleDateString('ko-KR'))
                                        : '방금 전'}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ fontSize: 15, color: T.text, lineHeight: 1.85, whiteSpace: 'pre-wrap', marginBottom: 20 }}>
                            {post.content}
                        </div>

                        {/* Images */}
                        {post.images?.length > 0 && (
                            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 20, paddingBottom: 4 }}>
                                {post.images.map((src, i) => (
                                    <img key={i} src={src} alt="" style={{ width: 200, height: 160, borderRadius: T.radiusMd, objectFit: 'cover', flexShrink: 0 }} />
                                ))}
                            </div>
                        )}

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
                <div style={{ background: T.white, marginTop: 8, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>

                    {/* Comment count header */}
                    <div style={{ padding: '16px 18px 0', fontSize: 15, fontWeight: 800, color: T.text }}>
                        댓글 {comments.length}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {comments.map((comment, i) => (
                            <div key={comment.id} style={{
                                padding: '16px 18px',
                                borderBottom: i < comments.length - 1 ? `1px solid ${T.border}` : 'none',
                            }}>
                                {/* Comment author */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                    <Avatar name={comment.author} size={32} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>
                                                {comment.author}
                                            </span>
                                            <SellerBadge type={comment.sellerType} />
                                            <span style={{ fontSize: 11, color: T.gray, marginLeft: 'auto' }}>
                                                {comment.time}
                                            </span>
                                        </div>

                                        {/* Comment text */}
                                        <div style={{ fontSize: 14, color: T.text, lineHeight: 1.65 }}>
                                            {comment.content}
                                        </div>

                                        {/* Comment like */}
                                        <div style={{ marginTop: 8 }}>
                                            <button
                                                onClick={() => handleCommentLike(comment.id)}
                                                style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: 4,
                                                    padding: '4px 10px', borderRadius: T.radiusFull,
                                                    border: `1px solid ${commentLikes[comment.id]?.liked ? T.red : T.border}`,
                                                    background: commentLikes[comment.id]?.liked ? T.redLt : T.white,
                                                    cursor: 'pointer', fontSize: 12, fontWeight: 600,
                                                    color: commentLikes[comment.id]?.liked ? T.red : T.gray,
                                                    transition: 'all 0.15s',
                                                }}
                                            >
                                                <Heart
                                                    size={11}
                                                    fill={commentLikes[comment.id]?.liked ? T.red : 'none'}
                                                    color={commentLikes[comment.id]?.liked ? T.red : T.gray}
                                                />
                                                {commentLikes[comment.id]?.count ?? 0}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {comments.length === 0 && (
                        <div style={{ padding: '40px 18px', textAlign: 'center', color: T.gray, fontSize: 14 }}>
                            첫 번째 댓글을 남겨보세요!
                        </div>
                    )}
                </div>
            </div>

            {/* ── Sticky comment input ── */}
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
                        placeholder="댓글을 입력하세요..."
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
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
