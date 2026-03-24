'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import dynamic from 'next/dynamic';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { timeAgo, formatDate } from '@/lib/helpers';

const NotificationDrawer = dynamic(() => import('@/components/ui/NotificationDrawer'), { ssr: false });

/* ─── Hero Banner (carousel) ────────────────────────────────── */
const BANNERS = [
    {
        id: 1,
        gradient: `linear-gradient(135deg, ${T.blue} 0%, ${T.blueDark} 100%)`,
        tag: '🎁 첫 달 혜택',
        title: '리뷰 3개 쓰고\n첫 달 구독료 0원',
        sub: '지금 바로 리뷰를 작성하고 무료 혜택을 받아보세요',
        cta: '리뷰 작성하러 가기',
        href: '/reviews/write',
    },
    {
        id: 2,
        gradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
        tag: '📊 수익 데이터',
        title: '수익성 높은 행사\n한눈에 비교하기',
        sub: '셀러들의 실제 수익 데이터를 확인하세요',
        cta: '행사 찾아보기',
        href: '/search',
    },
    {
        id: 3,
        gradient: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
        tag: '🏢 행사 개최 문의',
        title: '행사 개최\n전문가에게 맡기세요',
        sub: '관공서 · 기업 · 단체 등 모든 행사 개최 의뢰를 받습니다',
        cta: '개최 문의하기',
        href: '/contact',
    },
];

function HeroBanner() {
    const router = useRouter();
    const [idx, setIdx] = useState(0);
    const timerRef = useRef(null);
    const touchStartX = useRef(null);

    const resetTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => setIdx(i => (i + 1) % BANNERS.length), 4000);
    };

    useEffect(() => {
        timerRef.current = setInterval(() => setIdx(i => (i + 1) % BANNERS.length), 4000);
        return () => clearInterval(timerRef.current);
    }, []);

    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            setIdx(i => (i + (diff > 0 ? 1 : -1) + BANNERS.length) % BANNERS.length);
            resetTimer();
        }
        touchStartX.current = null;
    };

    const b = BANNERS[idx];

    return (
        <div style={{ padding: '0 16px 16px' }}>
            <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={() => router.push(b.href)}
                style={{
                    background: b.gradient, borderRadius: T.radiusXl,
                    padding: '20px 20px 16px', cursor: 'pointer',
                    position: 'relative', overflow: 'hidden',
                    userSelect: 'none', minHeight: 168,
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}
            >
                <div style={{
                    position: 'absolute', top: -30, right: -30,
                    width: 120, height: 120, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.10)',
                }} />
                <div style={{
                    position: 'absolute', bottom: -20, right: 20,
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.07)',
                }} />

                <div style={{
                    display: 'inline-block', background: 'rgba(255,255,255,0.25)',
                    padding: '3px 9px', borderRadius: T.radiusFull,
                    fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 8,
                }}>
                    {b.tag}
                </div>

                <div style={{
                    fontSize: 20, fontWeight: 900, color: '#fff',
                    lineHeight: 1.35, whiteSpace: 'pre-line', marginBottom: 6,
                }}>
                    {b.title}
                </div>

                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginBottom: 12, lineHeight: 1.55 }}>
                    {b.sub}
                </div>

                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'rgba(255,255,255,0.20)', borderRadius: T.radiusFull,
                    padding: '7px 14px', fontSize: 12, fontWeight: 700, color: '#fff',
                }}>
                    {b.cta} →
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                    {BANNERS.map((_, i) => (
                        <div
                            key={i}
                            onClick={e => { e.stopPropagation(); setIdx(i); resetTimer(); }}
                            style={{
                                width: i === idx ? 20 : 6, height: 6, borderRadius: 3,
                                background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)',
                                transition: 'width 0.3s ease, background 0.3s ease',
                                cursor: 'pointer',
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─── Hot Recruitment ────────────────────────────────────────── */
function RecruitmentCard({ rec }) {
    const inst = rec.instance || {};
    const ev   = inst.base_event || {};
    const org  = inst.organizer || {};
    const daysLeft = rec.end_date
        ? Math.ceil((new Date(rec.end_date) - Date.now()) / 86400000)
        : null;
    const isUrgent = daysLeft !== null && daysLeft <= 3 && daysLeft >= 0;
    const feeText = rec.fee == null ? '참가비 미정' : rec.fee === 0 ? '무료' : `${Number(rec.fee).toLocaleString()}원`;

    return (
        <Link href={`/recruitments/${rec.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: '14px 16px',
                border: `1px solid ${isUrgent ? T.red + '40' : T.border}`,
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, background: T.greenLt, color: T.green, padding: '2px 7px', borderRadius: 4 }}>모집중</span>
                        {org.name && (
                            <span style={{ fontSize: 11, color: T.textSub }}>
                                <span style={{ color: T.gray }}>주최사 </span>{org.name}
                            </span>
                        )}
                    </div>
                    {daysLeft !== null && daysLeft >= 0 && (
                        <span style={{ fontSize: 11, fontWeight: 800, color: isUrgent ? T.red : T.gray }}>
                            {daysLeft === 0 ? 'D-Day' : `D-${daysLeft}`}
                        </span>
                    )}
                </div>

                <div style={{
                    fontSize: 15, fontWeight: 800, color: T.text, lineHeight: 1.4, marginBottom: 8,
                    display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                    {rec.title || ev.name || '-'}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: T.blue }}>{feeText}</span>
                    {inst.location && (
                        <span style={{ fontSize: 12, color: T.gray, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            📍 {inst.location}
                        </span>
                    )}
                    {inst.event_date && (
                        <span style={{ fontSize: 12, color: T.gray }}>
                            🗓 {formatDate(inst.event_date)}{inst.event_date_end && inst.event_date_end !== inst.event_date ? ` ~ ${formatDate(inst.event_date_end)}` : ''}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

function HotRecruitmentSection({ recruitments }) {
    return (
        <div style={{ marginBottom: 24 }}>
            <div style={{
                padding: '0 16px 10px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>🔥 모집 중인 공고</div>
                <Link href="/search" style={{ fontSize: 13, color: T.blue, fontWeight: 600, textDecoration: 'none' }}>전체보기 →</Link>
            </div>
            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {recruitments.length === 0
                    ? <div style={{ textAlign: 'center', padding: '24px 0', color: T.gray, fontSize: 14 }}>현재 모집 중인 공고가 없어요.</div>
                    : recruitments.map(r => <RecruitmentCard key={r.id} rec={r} />)
                }
            </div>
        </div>
    );
}

/* ─── Recent Reviews ─────────────────────────────────────────── */
function ReviewCard({ review }) {
    const inst = review.event_instance || {};
    const ev   = inst.base_event || {};
    const isFoodtruck = review.seller_type === 'foodtruck';

    const allScores = [review.rating_profit, review.rating_traffic, review.rating_promotion, review.rating_support, review.rating_manners].filter(v => v != null);
    const overall   = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
    const sColor    = overall >= 4.0 ? T.green : overall >= 3.0 ? T.blue : T.gray;
    const scoreLabel = overall >= 4.0 ? '좋음' : overall >= 3.0 ? '보통' : '아쉬움';
    const isRecent  = (Date.now() - new Date(review.created_at)) < 86400000;

    return (
        <Link href={ev.id ? `/events/${ev.id}` : '#'} style={{ textDecoration: 'none' }}>
            <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: '14px 16px',
                border: `1px solid ${T.border}`,
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {isRecent && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 700, color: '#EF4444' }}>
                                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
                                실시간
                            </span>
                        )}
                        <span style={{ fontSize: 11, color: T.gray }}>{isFoodtruck ? '🚚 푸드트럭' : '🛍️ 셀러'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                        <span style={{ fontSize: 16, fontWeight: 900, color: sColor }}>{overall.toFixed(1)}</span>
                        <span style={{ fontSize: 11, color: T.gray }}>{scoreLabel}</span>
                    </div>
                </div>

                <div style={{
                    fontSize: 15, fontWeight: 800, color: T.text, lineHeight: 1.4, marginBottom: 6,
                    display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                    {ev.name || '행사명 없음'}
                </div>

                {review.content && (
                    <div style={{
                        fontSize: 12, color: T.textSub, lineHeight: 1.6,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                        "{review.content}"
                    </div>
                )}
            </div>
        </Link>
    );
}

function RecentReviewsSection({ reviews }) {
    return (
        <div style={{ marginBottom: 24 }}>
            <div style={{
                padding: '0 16px 10px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>💬 실시간 리뷰</div>
                <Link href="/search?tab=reviews" style={{ fontSize: 13, color: T.blue, fontWeight: 600, textDecoration: 'none' }}>전체보기 →</Link>
            </div>
            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {reviews.length === 0
                    ? <div style={{ textAlign: 'center', padding: '24px 0', color: T.gray, fontSize: 14 }}>아직 리뷰가 없어요.</div>
                    : reviews.map(r => <ReviewCard key={r.id} review={r} />)
                }
            </div>
        </div>
    );
}

/* ─── Community Snippets ─────────────────────────────────────── */
function PostItem({ post }) {
    return (
        <Link href={`/community/${post.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: '14px 16px',
                border: `1px solid ${T.border}`,
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        {post.category && (
                            <span style={{ fontSize: 11, fontWeight: 600, color: T.blue, background: T.blueLt, padding: '2px 7px', borderRadius: 4 }}>
                                {post.category}
                            </span>
                        )}
                    </div>
                    <span style={{ fontSize: 11, color: T.gray }}>{timeAgo(post.created_at)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <div style={{
                        fontSize: 15, fontWeight: 800, color: T.text, lineHeight: 1.4,
                        display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        flex: 1,
                    }}>
                        {post.title}
                    </div>
                    <span style={{ fontSize: 16, color: T.gray, flexShrink: 0 }}>›</span>
                </div>
            </div>
        </Link>
    );
}

function CommunitySection({ posts }) {
    return (
        <div style={{ marginBottom: 24 }}>
            <div style={{
                padding: '0 16px 10px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>📌 커뮤니티</div>
                <Link href="/community" style={{ fontSize: 13, color: T.blue, fontWeight: 600, textDecoration: 'none' }}>전체보기 →</Link>
            </div>
            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {posts.length === 0
                    ? <div style={{ textAlign: 'center', padding: '24px 0', color: T.gray, fontSize: 14 }}>아직 게시글이 없어요.</div>
                    : posts.map(post => <PostItem key={post.id} post={post} />)
                }
            </div>
        </div>
    );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function HomeClient({ initialRecruitments, initialReviews, initialPosts }) {
    const { user } = useAuth();
    const [notifOpen, setNotifOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!user) { setUnreadCount(0); return; }
        setUnreadCount(0);
    }, [user]);

    return (
        <div style={{ minHeight: '100vh', paddingBottom: 100, background: T.bg }}>
            <NotificationDrawer
                open={notifOpen}
                onClose={() => { setNotifOpen(false); setUnreadCount(0); }}
                userId={user?.id}
            />

            {/* sticky header */}
            <div style={{
                padding: '20px 16px 16px', background: T.white,
                position: 'sticky', top: 0, zIndex: 10,
                borderBottom: `1px solid ${T.border}`,
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: T.text, letterSpacing: -0.5 }}>
                            플릿 <span style={{ color: T.blue }}>●</span>
                        </div>
                        <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>
                            셀러들이 직접 말하는 진짜 행사 정보
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {user && (
                            <div
                                onClick={() => setNotifOpen(true)}
                                style={{
                                    width: 36, height: 36, borderRadius: '50%',
                                    background: T.bg, border: `1.5px solid ${T.border}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', position: 'relative', flexShrink: 0,
                                }}
                            >
                                <Bell size={18} color={T.text} strokeWidth={2} />
                                {unreadCount > 0 && (
                                    <div style={{
                                        position: 'absolute', top: -2, right: -2,
                                        minWidth: 16, height: 16,
                                        background: '#EF4444', borderRadius: 8,
                                        border: '1.5px solid #fff',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 10, fontWeight: 800, color: '#fff',
                                        padding: '0 3px',
                                    }}>
                                        {unreadCount > 99 ? '99+' : unreadCount}
                                    </div>
                                )}
                            </div>
                        )}

                        {!user && (
                            <Link
                                href="/login"
                                style={{
                                    background: T.blue, color: '#fff',
                                    padding: '8px 14px', borderRadius: T.radiusFull,
                                    fontSize: 13, fontWeight: 700, textDecoration: 'none',
                                }}
                            >
                                로그인
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* page content */}
            <div style={{ paddingTop: 16 }}>
                <HeroBanner />
                <HotRecruitmentSection recruitments={initialRecruitments} />
                <RecentReviewsSection reviews={initialReviews} />
                <CommunitySection posts={initialPosts} />
            </div>

            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.5; }
                }
                div::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
}
