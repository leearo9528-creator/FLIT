'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, Bookmark, MapPin, Calendar, Banknote,
    Star, TrendingUp, Users, Handshake, Smile, PenLine,
    ChevronRight, Clock,
} from 'lucide-react';
import { T } from '@/lib/design-tokens';
import SubscriptionLock from '@/components/ui/SubscriptionLock';
import { useAuth } from '@/lib/auth-context';

/* ─── helpers ──────────────────────────────────────────────── */
function calcDDay(dateStr) {
    if (!dateStr) return null;
    const diff = Math.ceil((new Date(dateStr) - Date.now()) / 86400000);
    if (diff < 0) return { label: '종료', color: T.gray };
    if (diff === 0) return { label: 'D-Day', color: T.red };
    return { label: `D-${diff}`, color: diff <= 3 ? T.red : T.blue };
}

function formatDate(dateStr, opts = {}) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ko-KR', {
        year: 'numeric', month: 'long', day: 'numeric', ...opts,
    });
}

function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}분 전`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}시간 전`;
    return `${Math.floor(hours / 24)}일 전`;
}

/* ─── Rating Progress Bar ──────────────────────────────────── */
function RatingBar({ icon, label, value, color }) {
    const pct = Math.round(((value || 0) / 5) * 100);
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, width: 72, flexShrink: 0 }}>
                {icon}
                <span style={{ fontSize: 12, color: T.textSub }}>{label}</span>
            </div>
            <div style={{ flex: 1, height: 7, background: T.border, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                    width: `${pct}%`, height: '100%', background: color,
                    borderRadius: 4, transition: 'width 0.8s cubic-bezier(.4,0,.2,1)',
                }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color, width: 28, textAlign: 'right' }}>
                {(value || 0).toFixed(1)}
            </span>
        </div>
    );
}

/* ─── Review Card ──────────────────────────────────────────── */
function ReviewCard({ review, blurred }) {
    const avgRating = (
        (review.rating_profit || 0) +
        (review.rating_traffic || 0) +
        (review.rating_support || 0) +
        (review.rating_manners || 0)
    ) / 4;

    return (
        <div style={{
            background: T.white, borderRadius: T.radiusXl,
            padding: 16, border: `1px solid ${T.border}`,
            filter: blurred ? 'blur(5px)' : 'none',
            userSelect: blurred ? 'none' : 'auto',
            transition: 'filter 0.3s',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                    {[1, 2, 3, 4, 5].map(s => (
                        <Star
                            key={s} size={13}
                            fill={s <= Math.round(avgRating) ? '#FFB800' : T.border}
                            color={s <= Math.round(avgRating) ? '#FFB800' : T.border}
                        />
                    ))}
                </div>
                {review.is_verified && (
                    <span style={{
                        fontSize: 11, fontWeight: 700, color: T.green,
                        background: T.greenLt, padding: '2px 7px', borderRadius: 4,
                    }}>
                        인증됨
                    </span>
                )}
            </div>

            {review.title && (
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 8 }}>
                    {review.title}
                </div>
            )}

            <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.green, marginBottom: 4 }}>👍 장점</div>
                <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.6 }}>{review.pros || '-'}</div>
            </div>

            <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.red, marginBottom: 4 }}>👎 단점</div>
                <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.6 }}>{review.cons || '-'}</div>
            </div>

            <div style={{
                borderTop: `1px solid ${T.border}`, paddingTop: 10,
                display: 'flex', flexWrap: 'wrap', gap: 10,
            }}>
                {[
                    { label: '수익성', value: review.rating_profit, color: T.green },
                    { label: '집객력', value: review.rating_traffic, color: T.blue },
                    { label: '운영지원', value: review.rating_support, color: T.yellow },
                    { label: '매너', value: review.rating_manners, color: '#E91E63' },
                ].map(({ label, value, color }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span style={{ fontSize: 11, color: T.gray }}>{label}</span>
                        <span style={{ fontSize: 12, fontWeight: 800, color }}>{(value || 0).toFixed(1)}</span>
                    </div>
                ))}
                <span style={{ fontSize: 11, color: T.gray, marginLeft: 'auto' }}>
                    {timeAgo(review.created_at)}
                </span>
            </div>
        </div>
    );
}

const TABS = ['상세요강', '셀러 리뷰', '주최 리뷰'];

/* ─── Main Component ───────────────────────────────────────── */
export default function RecruitmentDetailClient({ recruitment }) {
    const router = useRouter();
    const { user } = useAuth();

    const [activeTab, setActiveTab] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [orgReviews, setOrgReviews] = useState([]);
    const [profile, setProfile] = useState(null);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [orgReviewsLoading, setOrgReviewsLoading] = useState(false);
    const [scrapped, setScrapped] = useState(false);

    const event = recruitment.event || {};
    const organizer = recruitment.organizer || {};

    const dDay = calcDDay(recruitment.event_date);
    const totalEventReviews = event.total_reviews ?? 0;
    const avgProfit = event.average_profit ?? 0;
    const avgTraffic = event.average_traffic ?? 0;
    const avgSupport = organizer.average_support ?? 0;
    const avgManners = organizer.average_manners ?? 0;

    /* fetch user profile */
    useEffect(() => {
        if (!user) { setProfile(null); return; }
        (async () => {
            const { createClient } = await import('@/utils/supabase/client');
            const sb = createClient();
            const { data } = await sb
                .from('profiles')
                .select('is_subscribed, review_count')
                .eq('id', user.id)
                .single();
            if (data) setProfile(data);
        })();
    }, [user]);

    /* fetch reviews when review tab first activates */
    useEffect(() => {
        if (activeTab !== 1 || !event.id || reviews.length > 0) return;
        setReviewsLoading(true);
        (async () => {
            const { createClient } = await import('@/utils/supabase/client');
            const sb = createClient();
            const { data } = await sb
                .from('company_reviews')
                .select('*')
                .eq('event_id', event.id)
                .order('created_at', { ascending: false })
                .limit(20);
            if (data) setReviews(data);
            setReviewsLoading(false);
        })();
    }, [activeTab, event.id]);

    /* fetch organizer reviews when that tab first activates */
    useEffect(() => {
        if (activeTab !== 2 || !organizer.id || orgReviews.length > 0) return;
        setOrgReviewsLoading(true);
        (async () => {
            const { createClient } = await import('@/utils/supabase/client');
            const sb = createClient();
            const { data } = await sb
                .from('company_reviews')
                .select('*')
                .eq('organizer_id', organizer.id)
                .order('created_at', { ascending: false })
                .limit(20);
            if (data) setOrgReviews(data);
            setOrgReviewsLoading(false);
        })();
    }, [activeTab, organizer.id]);

    const isSubscribed = profile?.is_subscribed ?? false;
    const reviewCount = profile?.review_count ?? 0;
    const FREE_PREVIEW = 1;

    /* ── Tab 0: 상세요강 ────────────────────────────────────── */
    const renderDetail = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* key info */}
            <div style={{
                background: T.white, borderRadius: T.radiusXl,
                padding: 20, border: `1px solid ${T.border}`,
            }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 14 }}>공고 핵심 정보</div>
                {[
                    { icon: <Calendar size={15} color={T.blue} />, label: '행사 일자', value: formatDate(recruitment.event_date) },
                    { icon: <Clock size={15} color={T.red} />, label: '모집 마감', value: `${formatDate(recruitment.end_date)} 까지`, valueColor: T.red },
                    { icon: <MapPin size={15} color={T.green} />, label: '장소', value: event.location || '미정' },
                    {
                        icon: <Banknote size={15} color={T.yellow} />, label: '참가비',
                        value: recruitment.fee === 0 || recruitment.fee === null ? '무료' : `${Number(recruitment.fee).toLocaleString()}원`,
                        valueColor: T.blue,
                    },
                ].map(row => (
                    <div key={row.label} style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', paddingBottom: 12, marginBottom: 12,
                        borderBottom: `1px solid ${T.border}`,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: T.gray, fontSize: 14 }}>
                            {row.icon}{row.label}
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: row.valueColor || T.text }}>
                            {row.value}
                        </span>
                    </div>
                ))}
                {event.id && (
                    <Link href={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            background: T.blueLt, borderRadius: T.radiusMd, padding: '12px 14px',
                        }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: T.blue }}>
                                {event.name} 행사 평가 보기
                            </div>
                            <ChevronRight size={16} color={T.blue} />
                        </div>
                    </Link>
                )}
            </div>

            {/* body */}
            <div style={{
                background: T.white, borderRadius: T.radiusXl,
                padding: 20, border: `1px solid ${T.border}`,
            }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 14 }}>상세 모집 요강</div>
                <div style={{ fontSize: 14, color: T.text, lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
                    {recruitment.content || '상세 내용이 없습니다.'}
                </div>
            </div>

            {/* organizer */}
            {organizer.id && (
                <Link href={`/organizers/${organizer.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                        background: T.white, borderRadius: T.radiusXl,
                        padding: 16, border: `1px solid ${T.border}`,
                        display: 'flex', alignItems: 'center', gap: 14,
                    }}>
                        <div style={{
                            width: 52, height: 52, borderRadius: T.radiusMd,
                            background: T.grayLt, flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, overflow: 'hidden',
                        }}>
                            {organizer.logo_url
                                ? <img src={organizer.logo_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                : '🏢'}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, color: T.gray, marginBottom: 2 }}>주최측</div>
                            <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>{organizer.name}</div>
                            <div style={{ fontSize: 12, color: T.textSub, marginTop: 4 }}>
                                운영지원 ⭐ {Number(avgSupport).toFixed(1)} · 리뷰 {organizer.total_reviews || 0}개
                            </div>
                        </div>
                        <ChevronRight size={18} color={T.gray} />
                    </div>
                </Link>
            )}
        </div>
    );

    /* ── Tab 1: 셀러 리뷰 ───────────────────────────────────── */
    const renderReviews = () => (
        <div>
            {/* rating summary card */}
            <div style={{
                background: T.white, borderRadius: T.radiusXl,
                padding: 20, border: `1px solid ${T.border}`, marginBottom: 16,
            }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    {/* big score */}
                    <div style={{ textAlign: 'center', minWidth: 72 }}>
                        <div style={{ fontSize: 44, fontWeight: 900, color: T.text, lineHeight: 1 }}>
                            {((avgProfit + avgTraffic) / 2).toFixed(1)}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 6 }}>
                            {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={13}
                                    fill={s <= Math.round((avgProfit + avgTraffic) / 2) ? '#FFB800' : T.border}
                                    color={s <= Math.round((avgProfit + avgTraffic) / 2) ? '#FFB800' : T.border} />
                            ))}
                        </div>
                        <div style={{ fontSize: 11, color: T.gray, marginTop: 5 }}>리뷰 {totalEventReviews}개</div>
                    </div>

                    {/* bars */}
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 10 }}>행사 평가</div>
                        <RatingBar icon={<TrendingUp size={13} color={T.green} />} label="수익성" value={avgProfit} color={T.green} />
                        <RatingBar icon={<Users size={13} color={T.blue} />} label="집객력" value={avgTraffic} color={T.blue} />
                        {organizer.id && (
                            <>
                                <div style={{ fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 10, marginTop: 6 }}>주최측 평가</div>
                                <RatingBar icon={<Handshake size={13} color={T.yellow} />} label="운영지원" value={avgSupport} color={T.yellow} />
                                <RatingBar icon={<Smile size={13} color="#E91E63" />} label="매너" value={avgManners} color="#E91E63" />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* reviews */}
            {reviewsLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} style={{ height: 160, background: T.grayLt, borderRadius: T.radiusXl, animation: 'pulse 1.5s infinite' }} />
                    ))}
                </div>
            ) : reviews.length === 0 ? (
                <div style={{
                    textAlign: 'center', padding: '40px 20px',
                    background: T.white, borderRadius: T.radiusXl, border: `1px solid ${T.border}`,
                }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>📝</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 6 }}>아직 리뷰가 없어요</div>
                    <div style={{ fontSize: 13, color: T.gray, marginBottom: 16 }}>첫 번째 셀러 리뷰를 작성해보세요!</div>
                    <Link href="/reviews/write" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: T.blue, color: '#fff',
                        padding: '10px 20px', borderRadius: T.radiusFull,
                        fontSize: 14, fontWeight: 700, textDecoration: 'none',
                    }}>
                        <PenLine size={14} />리뷰 작성하기
                    </Link>
                </div>
            ) : (
                <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {reviews.map((r, i) => (
                            <ReviewCard key={r.id} review={r} blurred={!isSubscribed && i >= FREE_PREVIEW} />
                        ))}
                    </div>

                    {/* paywall: gradient fade + lock card */}
                    {!isSubscribed && reviews.length > FREE_PREVIEW && (
                        <div style={{ marginTop: -200, position: 'relative', zIndex: 5 }}>
                            <div style={{
                                height: 200,
                                background: `linear-gradient(to bottom, transparent, ${T.bg} 90%)`,
                            }} />
                            <div style={{ background: T.bg, paddingBottom: 16 }}>
                                <SubscriptionLock reviewCount={reviewCount} variant="inline" />
                            </div>
                        </div>
                    )}

                    {/* paywall when only 1 review exists */}
                    {!isSubscribed && reviews.length <= FREE_PREVIEW && (
                        <div style={{ marginTop: 16 }}>
                            <SubscriptionLock reviewCount={reviewCount} variant="inline" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    /* ── Tab 2: 주최 리뷰 ───────────────────────────────────── */
    const renderOrgReviews = () => (
        <div>
            {/* organizer summary */}
            {organizer.id && (
                <div style={{
                    background: T.white, borderRadius: T.radiusXl,
                    padding: 20, border: `1px solid ${T.border}`, marginBottom: 16,
                }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                        {/* big score */}
                        <div style={{ textAlign: 'center', minWidth: 72 }}>
                            <div style={{ fontSize: 44, fontWeight: 900, color: T.text, lineHeight: 1 }}>
                                {((avgSupport + avgManners) / 2).toFixed(1)}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 6 }}>
                                {[1, 2, 3, 4, 5].map(s => (
                                    <Star key={s} size={13}
                                        fill={s <= Math.round((avgSupport + avgManners) / 2) ? '#FFB800' : T.border}
                                        color={s <= Math.round((avgSupport + avgManners) / 2) ? '#FFB800' : T.border} />
                                ))}
                            </div>
                            <div style={{ fontSize: 11, color: T.gray, marginTop: 5 }}>리뷰 {organizer.total_reviews || 0}개</div>
                        </div>

                        {/* bars */}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 10 }}>
                                {organizer.name} 평가
                            </div>
                            <RatingBar icon={<Handshake size={13} color={T.yellow} />} label="운영지원" value={avgSupport} color={T.yellow} />
                            <RatingBar icon={<Smile size={13} color="#E91E63" />} label="매너" value={avgManners} color="#E91E63" />
                        </div>
                    </div>
                </div>
            )}

            {/* review list */}
            {orgReviewsLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} style={{ height: 160, background: T.grayLt, borderRadius: T.radiusXl, animation: 'pulse 1.5s infinite' }} />
                    ))}
                </div>
            ) : orgReviews.length === 0 ? (
                <div style={{
                    textAlign: 'center', padding: '40px 20px',
                    background: T.white, borderRadius: T.radiusXl, border: `1px solid ${T.border}`,
                }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>📝</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 6 }}>아직 주최측 리뷰가 없어요</div>
                    <div style={{ fontSize: 13, color: T.gray, marginBottom: 16 }}>첫 번째 리뷰를 작성해보세요!</div>
                    <Link href="/reviews/write" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: T.blue, color: '#fff',
                        padding: '10px 20px', borderRadius: T.radiusFull,
                        fontSize: 14, fontWeight: 700, textDecoration: 'none',
                    }}>
                        <PenLine size={14} />리뷰 작성하기
                    </Link>
                </div>
            ) : (
                <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {orgReviews.map((r, i) => (
                            <ReviewCard key={r.id} review={r} blurred={!isSubscribed && i >= FREE_PREVIEW} />
                        ))}
                    </div>

                    {!isSubscribed && orgReviews.length > FREE_PREVIEW && (
                        <div style={{ marginTop: -200, position: 'relative', zIndex: 5 }}>
                            <div style={{
                                height: 200,
                                background: `linear-gradient(to bottom, transparent, ${T.bg} 90%)`,
                            }} />
                            <div style={{ background: T.bg, paddingBottom: 16 }}>
                                <SubscriptionLock reviewCount={reviewCount} variant="inline" />
                            </div>
                        </div>
                    )}

                    {!isSubscribed && orgReviews.length <= FREE_PREVIEW && (
                        <div style={{ marginTop: 16 }}>
                            <SubscriptionLock reviewCount={reviewCount} variant="inline" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    /* ─── Render ─────────────────────────────────────────────── */
    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 110 }}>

            {/* ── Hero Header ── */}
            <div style={{
                background: 'linear-gradient(160deg, #1A2A4A 0%, #1B64DA 100%)',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ position: 'absolute', bottom: -60, left: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

                <div style={{ padding: '16px 16px 0', position: 'relative', zIndex: 2 }}>
                    <button onClick={() => router.back()} style={{
                        background: 'rgba(255,255,255,0.15)', border: 'none',
                        borderRadius: T.radiusFull, width: 36, height: 36,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }}>
                        <ArrowLeft size={18} color="#fff" />
                    </button>
                </div>

                <div style={{ padding: '14px 20px 28px', position: 'relative', zIndex: 2 }}>
                    {event.name && (
                        <div style={{
                            display: 'inline-block', background: 'rgba(255,255,255,0.20)',
                            padding: '4px 10px', borderRadius: T.radiusFull,
                            fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: 10,
                        }}>
                            📍 {event.name}
                        </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <div style={{
                            padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700,
                            background: recruitment.status === 'OPEN' ? T.green : T.gray, color: '#fff',
                        }}>
                            {recruitment.status === 'OPEN' ? '모집중' : '마감됨'}
                        </div>
                        {dDay && (
                            <div style={{
                                padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 800,
                                background: 'rgba(255,255,255,0.25)', color: '#fff',
                            }}>
                                {dDay.label}
                            </div>
                        )}
                    </div>

                    <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1.35, marginBottom: 16 }}>
                        {recruitment.title}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {[
                            { icon: <MapPin size={12} />, text: event.location || '장소 미정' },
                            { icon: <Calendar size={12} />, text: formatDate(recruitment.event_date, { month: 'short', day: 'numeric' }) },
                            {
                                icon: <Banknote size={12} />,
                                text: recruitment.fee === 0 || recruitment.fee === null ? '무료' : `${Number(recruitment.fee).toLocaleString()}원`,
                            },
                        ].map((pill, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 5,
                                background: 'rgba(255,255,255,0.18)', padding: '6px 12px',
                                borderRadius: T.radiusFull, fontSize: 12, fontWeight: 600, color: '#fff',
                            }}>
                                {pill.icon}{pill.text}
                            </div>
                        ))}
                    </div>

                    {totalEventReviews > 0 && (
                        <div style={{
                            marginTop: 16, display: 'flex', alignItems: 'center', gap: 10,
                            background: 'rgba(255,255,255,0.15)', padding: '10px 14px', borderRadius: T.radiusMd,
                        }}>
                            <Star size={14} fill="#FFB800" color="#FFB800" />
                            <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>
                                {((avgProfit + avgTraffic) / 2).toFixed(1)}
                            </span>
                            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>
                                리뷰 {totalEventReviews}개
                            </span>
                            <div onClick={() => setActiveTab(1)} style={{
                                marginLeft: 'auto', fontSize: 12, fontWeight: 700,
                                color: 'rgba(255,255,255,0.9)', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: 3,
                            }}>
                                리뷰 보기 <ChevronRight size={13} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Sticky Tab Bar ── */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 15,
                background: T.white, borderBottom: `1px solid ${T.border}`,
                display: 'flex',
            }}>
                {TABS.map((label, i) => (
                    <div
                        key={i}
                        onClick={() => setActiveTab(i)}
                        style={{
                            flex: 1, textAlign: 'center', padding: '14px 0',
                            fontSize: 13, fontWeight: activeTab === i ? 800 : 500,
                            color: activeTab === i ? T.blue : T.gray,
                            cursor: 'pointer',
                            borderBottom: activeTab === i ? `2.5px solid ${T.blue}` : '2.5px solid transparent',
                            transition: 'all 0.2s',
                        }}
                    >
                        {label}
                    </div>
                ))}
            </div>

            {/* ── Tab Content ── */}
            <div style={{ padding: '20px 16px 0' }}>
                <div style={{ display: activeTab === 0 ? 'block' : 'none', animation: 'fadeSlideIn 0.25s ease-out' }}>
                    {renderDetail()}
                </div>
                <div style={{ display: activeTab === 1 ? 'block' : 'none', animation: 'fadeSlideIn 0.25s ease-out' }}>
                    {renderReviews()}
                </div>
                <div style={{ display: activeTab === 2 ? 'block' : 'none', animation: 'fadeSlideIn 0.25s ease-out' }}>
                    {renderOrgReviews()}
                </div>
            </div>

            {/* ── Bottom CTA bar ── */}
            <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, padding: '12px 16px',
                background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(10px)',
                borderTop: `1px solid ${T.border}`, display: 'flex', gap: 10, zIndex: 100,
            }}>
                <button
                    onClick={() => setScrapped(s => !s)}
                    style={{
                        width: 52, height: 52, borderRadius: T.radiusMd,
                        border: `1px solid ${scrapped ? T.blue : T.border}`,
                        background: scrapped ? T.blueLt : T.white,
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', cursor: 'pointer', gap: 2, flexShrink: 0,
                    }}
                >
                    <Bookmark size={18} fill={scrapped ? T.blue : 'none'} color={scrapped ? T.blue : T.gray} />
                    <span style={{ fontSize: 9, fontWeight: 600, color: scrapped ? T.blue : T.gray }}>스크랩</span>
                </button>

                <div style={{
                    flex: 1, height: 52, borderRadius: T.radiusMd,
                    background: recruitment.status === 'OPEN' ? T.blue : T.gray,
                    color: '#fff', fontSize: 15, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: recruitment.status === 'OPEN' ? 'pointer' : 'default',
                }}>
                    {recruitment.status === 'OPEN' ? '이 공고 지원하기' : '마감된 공고입니다'}
                </div>
            </div>

            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.5; }
                }
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
