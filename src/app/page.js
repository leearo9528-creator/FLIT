'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { calcRating, timeAgo, formatDate } from '@/lib/helpers';
import { createClient } from '@/utils/supabase/client';
import NotificationDrawer from '@/components/ui/NotificationDrawer';
import SubscriptionModal from '@/components/ui/SubscriptionModal';

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
                    padding: '24px 24px 20px', cursor: 'pointer',
                    position: 'relative', overflow: 'hidden',
                    userSelect: 'none',
                }}
            >
                {/* decorative circles */}
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
                    padding: '4px 10px', borderRadius: T.radiusFull,
                    fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 10,
                }}>
                    {b.tag}
                </div>

                <div style={{
                    fontSize: 22, fontWeight: 900, color: '#fff',
                    lineHeight: 1.35, whiteSpace: 'pre-line', marginBottom: 8,
                }}>
                    {b.title}
                </div>

                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>
                    {b.sub}
                </div>

                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'rgba(255,255,255,0.20)', borderRadius: T.radiusFull,
                    padding: '8px 16px', fontSize: 13, fontWeight: 700, color: '#fff',
                }}>
                    {b.cta} →
                </div>

                {/* dot indicators */}
                <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
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

/* ─── Search Bar ─────────────────────────────────────────────── */
function SearchBar() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = e => {
        e.preventDefault();
        if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    return (
        <div style={{ padding: '0 16px 24px' }}>
            <form onSubmit={handleSubmit}>
                <div style={{
                    display: 'flex', alignItems: 'center', background: T.white,
                    borderRadius: T.radiusLg, padding: '12px 16px',
                    boxShadow: T.shadowMd, gap: 10,
                    border: `1.5px solid ${T.border}`,
                }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>🔍</span>
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="행사명, 지역, 카테고리로 검색"
                        style={{
                            flex: 1, border: 'none', outline: 'none',
                            fontSize: 14, color: T.text, background: 'transparent',
                        }}
                    />
                    {query && (
                        <button
                            type="submit"
                            style={{
                                background: T.blue, color: '#fff', border: 'none',
                                padding: '6px 12px', borderRadius: T.radiusMd,
                                fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0,
                            }}
                        >
                            검색
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

/* ─── Hot Recruitment ────────────────────────────────────────── */
function RecruitmentCard({ rec }) {
    const ev = rec.events || {};
    const rating = calcRating(ev);
    const reviewCount = ev.total_reviews ?? ev.review_count ?? 0;

    return (
        <Link href={`/recruitments/${rec.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                background: T.white, borderRadius: T.radiusXl, padding: 16,
                boxShadow: T.shadowMd, border: `1px solid ${T.border}`,
                display: 'flex', flexDirection: 'column', gap: 6,
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{
                        display: 'inline-block', padding: '3px 8px', borderRadius: 4,
                        background: rec.status === 'OPEN' ? T.greenLt : T.grayLt,
                        color: rec.status === 'OPEN' ? T.green : T.gray,
                        fontSize: 11, fontWeight: 700,
                    }}>
                        {rec.status === 'OPEN' ? '모집중' : '마감'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span style={{ fontSize: 13 }}>⭐</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>{rating}</span>
                        <span style={{ fontSize: 12, color: T.gray, marginLeft: 2 }}>({reviewCount})</span>
                    </div>
                </div>

                <div style={{
                    fontSize: 15, fontWeight: 700, color: T.text, lineHeight: 1.4,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                    {rec.title || ev.name || '-'}
                </div>

                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: T.gray }}>📍 {ev.location || ev.location_sido || '-'}</span>
                    <span style={{ fontSize: 12, color: T.textSub }}>🗓 {formatDate(rec.event_date || rec.start_date)}</span>
                </div>

                <div style={{ fontSize: 13, fontWeight: 700, color: T.blue }}>
                    참가비 {rec.fee ? `${Number(rec.fee).toLocaleString()}원` : '미정'}
                </div>
            </div>
        </Link>
    );
}

function HotRecruitmentSection({ recruitments, loading }) {
    return (
        <div style={{ marginBottom: 36 }}>
            <div style={{
                padding: '0 16px 14px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            }}>
                <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: T.text }}>🔥 지금 모집 중인 공고</div>
                    <div style={{ fontSize: 12, color: T.gray, marginTop: 3 }}>셀러들이 주목하는 행사</div>
                </div>
                <Link href="/search" style={{ fontSize: 13, color: T.blue, fontWeight: 600, textDecoration: 'none' }}>
                    전체보기 →
                </Link>
            </div>

            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {loading
                    ? Array(3).fill(0).map((_, i) => (
                        <div key={i} style={{
                            height: 120, background: T.grayLt,
                            borderRadius: T.radiusXl, animation: 'pulse 1.5s infinite',
                        }} />
                    ))
                    : recruitments.length === 0
                        ? (
                            <div style={{ textAlign: 'center', padding: '28px 0', color: T.gray, fontSize: 14 }}>
                                현재 모집 중인 공고가 없어요.
                            </div>
                        )
                        : recruitments.map(r => <RecruitmentCard key={r.id} rec={r} />)
                }
            </div>
        </div>
    );
}

/* ─── Recent Reviews ─────────────────────────────────────────── */
function StarRow({ value }) {
    const rounded = Math.round(value || 0);
    return (
        <div style={{ display: 'flex', gap: 2 }}>
            {[1, 2, 3, 4, 5].map(s => (
                <span key={s} style={{ fontSize: 13, color: s <= rounded ? '#FFB800' : T.border }}>★</span>
            ))}
        </div>
    );
}

function ReviewCard({ review, isSubscribed, onSubscribe }) {
    const ev = review.events || {};
    const avgRating = ((review.rating_profit || 0) + (review.rating_traffic || 0)) / 2;

    return (
        <div style={{
            background: T.white, borderRadius: T.radiusXl, padding: 16,
            boxShadow: T.shadowMd, border: `1px solid ${T.border}`,
            position: 'relative', overflow: 'hidden',
        }}>
            {/* header */}
            <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 10,
            }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.blue }}>
                    {ev.name || '행사'}
                </div>
                <StarRow value={avgRating} />
            </div>

            {/* review title */}
            {review.title && (
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 8 }}>
                    {review.title}
                </div>
            )}

            {/* pros */}
            <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.green, marginBottom: 4 }}>👍 장점</div>
                <div style={{
                    fontSize: 13, color: T.textSub, lineHeight: 1.5,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                    {review.pros || '-'}
                </div>
            </div>

            {/* cons */}
            <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.red, marginBottom: 4 }}>👎 단점</div>
                <div style={{
                    fontSize: 13, color: T.textSub, lineHeight: 1.5,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                    {review.cons || '-'}
                </div>
            </div>

            {/* blur overlay for non-subscribers */}
            {!isSubscribed && (
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, top: '45%',
                    backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)',
                    background: 'rgba(255,255,255,0.45)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    borderRadius: `0 0 ${T.radiusXl}px ${T.radiusXl}px`,
                }}>
                    <div style={{ fontSize: 22, marginBottom: 8 }}>🔒</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 12, textAlign: 'center' }}>
                        구독하고 전체 리뷰 보기
                    </div>
                    <div
                        onClick={onSubscribe}
                        style={{
                            background: T.blue, color: '#fff',
                            padding: '8px 20px', borderRadius: T.radiusFull,
                            fontSize: 13, fontWeight: 700, cursor: 'pointer',
                        }}
                    >
                        구독하기
                    </div>
                </div>
            )}
        </div>
    );
}

function RecentReviewsSection({ reviews, loading, isSubscribed, reviewCount }) {
    const [showSubModal, setShowSubModal] = useState(false);

    return (
        <div style={{ marginBottom: 36 }}>
            <div style={{
                padding: '0 16px 14px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            }}>
                <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: T.text }}>💬 실시간 리뷰</div>
                    <div style={{ fontSize: 12, color: T.gray, marginTop: 3 }}>셀러들의 생생한 후기</div>
                </div>
                <Link href="/search" style={{ fontSize: 13, color: T.blue, fontWeight: 600, textDecoration: 'none' }}>
                    전체보기 →
                </Link>
            </div>

            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {loading
                    ? Array(3).fill(0).map((_, i) => (
                        <div key={i} style={{
                            height: 160, background: T.grayLt,
                            borderRadius: T.radiusXl, animation: 'pulse 1.5s infinite',
                        }} />
                    ))
                    : reviews.length === 0
                        ? (
                            <div style={{ textAlign: 'center', padding: '32px 0', color: T.gray, fontSize: 14 }}>
                                아직 리뷰가 없어요. 첫 번째 리뷰를 작성해보세요!
                            </div>
                        )
                        : reviews.map(r => (
                            <ReviewCard
                                key={r.id}
                                review={r}
                                isSubscribed={isSubscribed}
                                onSubscribe={() => setShowSubModal(true)}
                            />
                        ))
                }
            </div>

            <SubscriptionModal
                open={showSubModal}
                onClose={() => setShowSubModal(false)}
                reviewCount={reviewCount}
            />
        </div>
    );
}

/* ─── Community Snippets ─────────────────────────────────────── */
function PostItem({ post, isLast }) {
    return (
        <Link href={`/community/${post.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 0',
                borderBottom: isLast ? 'none' : `1px solid ${T.border}`,
            }}>
                <div style={{ flex: 1, marginRight: 12 }}>
                    <div style={{
                        fontSize: 14, fontWeight: 600, color: T.text,
                        marginBottom: 5, lineHeight: 1.4,
                        display: '-webkit-box', WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                        {post.title}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {post.category && (
                            <span style={{
                                fontSize: 11, fontWeight: 600, color: T.blue,
                                background: T.blueLt, padding: '2px 7px', borderRadius: 4,
                            }}>
                                {post.category}
                            </span>
                        )}
                        <span style={{ fontSize: 12, color: T.gray }}>
                            {timeAgo(post.created_at)}
                        </span>
                    </div>
                </div>
                <span style={{ fontSize: 14, color: T.gray }}>›</span>
            </div>
        </Link>
    );
}

function CommunitySection({ posts, loading }) {
    return (
        <div style={{ marginBottom: 36 }}>
            <div style={{
                padding: '0 16px 4px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            }}>
                <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: T.text }}>📌 커뮤니티</div>
                    <div style={{ fontSize: 12, color: T.gray, marginTop: 3 }}>셀러들의 이야기</div>
                </div>
                <Link href="/community" style={{ fontSize: 13, color: T.blue, fontWeight: 600, textDecoration: 'none' }}>
                    전체보기 →
                </Link>
            </div>

            <div style={{
                margin: '0 16px', background: T.white,
                borderRadius: T.radiusXl, padding: '0 16px',
                boxShadow: T.shadowSm, border: `1px solid ${T.border}`,
            }}>
                {loading
                    ? Array(3).fill(0).map((_, i) => (
                        <div key={i} style={{
                            height: 52, background: T.grayLt,
                            borderRadius: T.radiusMd, marginBottom: 8,
                            animation: 'pulse 1.5s infinite',
                        }} />
                    ))
                    : posts.length === 0
                        ? (
                            <div style={{ textAlign: 'center', padding: '28px 0', color: T.gray, fontSize: 14 }}>
                                아직 게시글이 없어요.
                            </div>
                        )
                        : posts.map((post, i) => (
                            <PostItem key={post.id} post={post} isLast={i === posts.length - 1} />
                        ))
                }
            </div>
        </div>
    );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function HomePage() {
    const { user } = useAuth();

    const [recruitments, setRecruitments] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState(null);
    const [notifOpen, setNotifOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const [loading, setLoading] = useState({ rec: true, rev: true, post: true });

    /* fetch all data in parallel */
    useEffect(() => {
        (async () => {
            const sb = createClient();

            // 공고: 최신순 5개
            sb.from('recruitments')
                .select('*, events(name, location, location_sido, average_profit, average_traffic, total_reviews)')
                .eq('status', 'OPEN')
                .order('created_at', { ascending: false })
                .limit(5)
                .then(({ data }) => {
                    if (data) setRecruitments(data);
                    setLoading(p => ({ ...p, rec: false }));
                });

            // 리뷰: 최신순 5개
            sb.from('company_reviews')
                .select('*, events(name)')
                .order('created_at', { ascending: false })
                .limit(5)
                .then(({ data }) => {
                    if (data) setReviews(data);
                    setLoading(p => ({ ...p, rev: false }));
                });

            // 커뮤니티: 좋아요 많은 순 5개
            sb.from('posts')
                .select('id, title, category, likes, created_at')
                .order('likes', { ascending: false })
                .limit(5)
                .then(({ data }) => {
                    if (data) setPosts(data);
                    setLoading(p => ({ ...p, post: false }));
                });
        })();
    }, []);

    /* fetch user profile for subscription status */
    useEffect(() => {
        if (!user) { setProfile(null); setUnreadCount(0); return; }
        (async () => {
            const sb = createClient();
            const { data } = await sb
                .from('profiles')
                .select('is_subscribed, review_count')
                .eq('id', user.id)
                .single();
            if (data) setProfile(data);

            const { count } = await sb
                .from('notifications')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id)
                .eq('is_read', false);
            setUnreadCount(count || 0);
        })();
    }, [user]);

    const isSubscribed = profile?.is_subscribed ?? false;

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
                        {/* 알림 벨 */}
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

                        {user ? (
                            <Link href="/mypage" style={{ textDecoration: 'none' }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: '50%',
                                    background: T.blueLt,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 18,
                                }}>
                                    👤
                                </div>
                            </Link>
                        ) : (
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
                <SearchBar />
                <HotRecruitmentSection recruitments={recruitments} loading={loading.rec} />
                <RecentReviewsSection reviews={reviews} loading={loading.rev} isSubscribed={isSubscribed} reviewCount={profile?.review_count ?? 0} />
                <CommunitySection posts={posts} loading={loading.post} />
            </div>

            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.5; }
                }
                /* hide scrollbar for horizontal scroll sections */
                div::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
}
