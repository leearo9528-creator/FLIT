'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, Bookmark, MapPin, Calendar, Banknote,
    Star, TrendingUp, Users, PenLine,
    Clock, ExternalLink,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { canViewReviewDetail } from '@/lib/plans';
import { timeAgo } from '@/lib/helpers';

/* ─── helpers ──────────────────────────────────────────────── */
function calcDDay(dateStr) {
    if (!dateStr) return null;
    const diff = Math.ceil((new Date(dateStr) - Date.now()) / 86400000);
    if (diff < 0) return { label: '종료', color: T.gray };
    if (diff === 0) return { label: 'D-Day', color: T.red };
    return { label: `D-${diff}`, color: diff <= 3 ? T.red : T.blue };
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ko-KR', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
}

/* ─── Rating Progress Bar ──────────────────────────────────── */
function RatingBar({ icon, label, value, color }) {
    const pct = Math.round(((value || 0) / 5) * 100);
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, height: 24 }}>
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

/* ─── Review Lock ───────────────────────────────────────────── */
function ReviewLock({ sellerType }) {
    const label = sellerType === 'foodtruck' ? '푸드트럭' : '일반셀러';
    const requiredPlan = sellerType === 'foodtruck' ? 'foodtruck / organizer' : 'flea_market 이상';
    return (
        <div style={{
            background: T.white, borderRadius: T.radiusXl,
            padding: 20, border: `1px solid ${T.border}`, textAlign: 'center',
        }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🔒</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 4 }}>{label} 리뷰 잠김</div>
            <div style={{ fontSize: 12, color: T.gray, marginBottom: 14 }}>{requiredPlan} 플랜에서 열람 가능합니다</div>
            <Link href="/subscribe" style={{
                display: 'inline-block', padding: '9px 20px',
                background: T.blue, color: '#fff',
                borderRadius: T.radiusFull, fontSize: 13, fontWeight: 700, textDecoration: 'none',
            }}>
                플랜 업그레이드
            </Link>
        </div>
    );
}

/* ─── Review Card ──────────────────────────────────────────── */
function ReviewCard({ review, userPlan }) {
    const canView = canViewReviewDetail(userPlan, review.seller_type);
    const avgRating = (
        (review.rating_profit || 0) + (review.rating_traffic || 0) +
        (review.rating_support || 0) + (review.rating_manners || 0)
    ) / 4;

    if (!canView) return <ReviewLock sellerType={review.seller_type} />;

    return (
        <div style={{ background: T.white, borderRadius: T.radiusXl, padding: 16, border: `1px solid ${T.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                    {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={13}
                            fill={s <= Math.round(avgRating) ? '#FFB800' : T.border}
                            color={s <= Math.round(avgRating) ? '#FFB800' : T.border} />
                    ))}
                </div>
                {review.is_verified && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.green, background: T.greenLt, padding: '2px 7px', borderRadius: 4 }}>
                        인증됨
                    </span>
                )}
            </div>
            {review.title && (
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 8 }}>{review.title}</div>
            )}
            <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.green, marginBottom: 4 }}>👍 장점</div>
                <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.6 }}>{review.pros || '-'}</div>
            </div>
            <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.red, marginBottom: 4 }}>👎 단점</div>
                <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.6 }}>{review.cons || '-'}</div>
            </div>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 10, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
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
                <span style={{ fontSize: 11, color: T.gray, marginLeft: 'auto' }}>{timeAgo(review.created_at)}</span>
            </div>
        </div>
    );
}

const TABS = ['상세요강', '주최사 리뷰'];

/* ─── Main Component ───────────────────────────────────────── */
export default function RecruitmentDetailClient({ recruitment }) {
    const router = useRouter();
    const { plan, user } = useAuth();

    const [activeTab, setActiveTab] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [scrapped, setScrapped] = useState(false);
    const [scrapLoading, setScrapLoading] = useState(false);

    const instance = recruitment.instance || {};
    const baseEvent = instance.base_event || {};
    const organizer = instance.organizer || {};

    const dDay = calcDDay(recruitment.end_date);
    const totalEventReviews = baseEvent.total_reviews ?? 0;

    const avgSupport = reviews.length > 0
        ? reviews.reduce((s, r) => s + (r.rating_support || 0), 0) / reviews.length : 0;
    const avgManners = reviews.length > 0
        ? reviews.reduce((s, r) => s + (r.rating_manners || 0), 0) / reviews.length : 0;
    const avgProfit = reviews.length > 0
        ? reviews.reduce((s, r) => s + (r.rating_profit || 0), 0) / reviews.length : 0;
    const avgTraffic = reviews.length > 0
        ? reviews.reduce((s, r) => s + (r.rating_traffic || 0), 0) / reviews.length : 0;
    const overallAvg = reviews.length > 0
        ? reviews.reduce((s, r) => {
            const scores = [r.rating_profit, r.rating_traffic, r.rating_support, r.rating_manners, r.rating_promotion].filter(v => v != null);
            return s + (scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0);
        }, 0) / reviews.length : 0;

    // 스크랩 상태 초기 로드
    useEffect(() => {
        if (!user) return;
        (async () => {
            const sb = createClient();
            const { data } = await sb.from('scraps')
                .select('id').eq('user_id', user.id).eq('recruitment_id', recruitment.id).maybeSingle();
            setScrapped(!!data);
        })();
    }, [user, recruitment.id]);

    const handleScrap = async () => {
        if (!user) { router.push('/login'); return; }
        if (scrapLoading) return;
        setScrapLoading(true);
        const sb = createClient();
        if (scrapped) {
            await sb.from('scraps').delete().eq('user_id', user.id).eq('recruitment_id', recruitment.id);
            setScrapped(false);
        } else {
            await sb.from('scraps').insert({ user_id: user.id, recruitment_id: recruitment.id });
            setScrapped(true);
        }
        setScrapLoading(false);
    };

    useEffect(() => {
        if (activeTab !== 1 || !organizer.id || reviews.length > 0) return;
        setReviewsLoading(true);
        (async () => {
            const sb = createClient();
            // 해당 주최사의 모든 인스턴스 조회
            const { data: instances } = await sb
                .from('event_instances').select('id').eq('organizer_id', organizer.id);
            const instanceIds = (instances || []).map(i => i.id);
            if (instanceIds.length === 0) { setReviewsLoading(false); return; }
            const { data } = await sb
                .from('reviews').select('*, event_instance:event_instances(id, base_event:base_events(id, name))')
                .in('event_instance_id', instanceIds)
                .order('created_at', { ascending: false }).limit(30);
            if (data) setReviews(data);
            setReviewsLoading(false);
        })();
    }, [activeTab, organizer.id]);

    /* ── Tab 0: 상세요강 ────────────────────────────────────── */
    const renderDetail = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* 행사 정보 확인하기 */}
            {baseEvent.id && (
                <Link href={`/events/${baseEvent.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: T.blueLt, borderRadius: T.radiusXl,
                        padding: '14px 18px', border: `1px solid ${T.blue}20`,
                    }}>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: T.blue, marginBottom: 3 }}>행사 정보 확인하기</div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: T.text }}>{baseEvent.name}</div>
                            {baseEvent.total_reviews > 0 && (
                                <div style={{ fontSize: 12, color: T.gray, marginTop: 3 }}>리뷰 {baseEvent.total_reviews}개 보기</div>
                            )}
                        </div>
                        <ExternalLink size={18} color={T.blue} />
                    </div>
                </Link>
            )}

            {/* 공고 핵심 정보 */}
            <div style={{ background: T.white, borderRadius: T.radiusXl, padding: 20, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 14 }}>공고 핵심 정보</div>
                {[
                    { icon: <Calendar size={15} color={T.blue} />, label: '행사 일자', value: formatDate(instance.event_date) },
                    { icon: <Clock size={15} color={T.red} />, label: '모집 마감', value: formatDate(recruitment.end_date), valueColor: T.red },
                    { icon: <MapPin size={15} color={T.green} />, label: '장소', value: instance.location || '미정' },
                    {
                        icon: <Banknote size={15} color={T.yellow} />, label: '참가비',
                        value: !recruitment.fee ? '무료' : `${Number(recruitment.fee).toLocaleString()}원`,
                        valueColor: T.blue,
                    },
                ].map((row, i, arr) => (
                    <div key={row.label} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        paddingBottom: i < arr.length - 1 ? 12 : 0,
                        marginBottom: i < arr.length - 1 ? 12 : 0,
                        borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: T.gray, fontSize: 14 }}>
                            {row.icon}{row.label}
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: row.valueColor || T.text }}>{row.value}</span>
                    </div>
                ))}
            </div>

            {/* 상세 모집 요강 */}
            <div style={{ background: T.white, borderRadius: T.radiusXl, padding: 20, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 14 }}>상세 모집 요강</div>
                <div style={{ fontSize: 14, color: T.text, lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
                    {recruitment.content || '상세 내용이 없습니다.'}
                </div>
            </div>

            {/* 신청 방법 */}
            <div style={{
                background: T.white, borderRadius: T.radiusXl,
                border: `1.5px solid ${T.blue}40`, overflow: 'hidden',
            }}>
                <div style={{
                    background: `linear-gradient(135deg, ${T.blue}15, ${T.blue}08)`,
                    padding: '14px 20px', borderBottom: `1px solid ${T.blue}20`,
                    display: 'flex', alignItems: 'center', gap: 8,
                }}>
                    <span style={{ fontSize: 18 }}>📋</span>
                    <span style={{ fontSize: 15, fontWeight: 800, color: T.blue }}>신청 방법</span>
                </div>
                <div style={{ padding: '16px 20px' }}>
                    {recruitment.application_method ? (
                        <div style={{ fontSize: 14, color: T.text, lineHeight: 2, whiteSpace: 'pre-wrap' }}>
                            {recruitment.application_method}
                        </div>
                    ) : (
                        <div style={{ fontSize: 14, color: T.gray, lineHeight: 1.7 }}>
                            신청 방법이 아직 등록되지 않았습니다.{'\n'}주최사에게 직접 문의해주세요.
                        </div>
                    )}
                </div>
            </div>

            {/* 주최사 정보 */}
            {organizer.id && (
                <Link href={`/organizers/${organizer.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                        background: T.white, borderRadius: T.radiusXl,
                        padding: '14px 18px', border: `1px solid ${T.border}`,
                        display: 'flex', alignItems: 'center', gap: 12,
                    }}>
                        <div style={{
                            width: 44, height: 44, borderRadius: T.radiusMd,
                            background: T.grayLt, flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                        }}>
                            {organizer.logo_url
                                ? <img src={organizer.logo_url} alt="" style={{ width: '100%', height: '100%', borderRadius: T.radiusMd, objectFit: 'cover' }} />
                                : '🏢'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 11, color: T.gray, marginBottom: 2 }}>주최사</div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{organizer.name}</div>
                        </div>
                        <ExternalLink size={16} color={T.gray} />
                    </div>
                </Link>
            )}
        </div>
    );

    /* ── Tab 1: 주최사 리뷰 ──────────────────────────────────── */
    const renderReviews = () => (
        <div>
            {/* 주최사 평가 요약 */}
            <div style={{
                background: T.white, borderRadius: T.radiusXl,
                padding: 20, border: `1px solid ${T.border}`, marginBottom: 16,
            }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: T.text, marginBottom: 12 }}>
                    {organizer.name || '주최사'} 평가 요약
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ textAlign: 'center', minWidth: 72 }}>
                        <div style={{ fontSize: 44, fontWeight: 900, color: T.text, lineHeight: 1 }}>
                            {overallAvg.toFixed(1)}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 6 }}>
                            {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={13}
                                    fill={s <= Math.round(overallAvg) ? '#FFB800' : T.border}
                                    color={s <= Math.round(overallAvg) ? '#FFB800' : T.border} />
                            ))}
                        </div>
                        <div style={{ fontSize: 11, color: T.gray, marginTop: 5 }}>리뷰 {reviews.length}개</div>
                    </div>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <RatingBar icon={<TrendingUp size={13} color={T.green} />} label="수익성" value={avgProfit} color={T.green} />
                        <RatingBar icon={<Users size={13} color={T.blue} />} label="집객력" value={avgTraffic} color={T.blue} />
                        <RatingBar icon={<Star size={13} color="#F59E0B" />} label="운영지원" value={avgSupport} color="#F59E0B" />
                        <RatingBar icon={<Star size={13} color="#E91E63" />} label="매너" value={avgManners} color="#E91E63" />
                        {plan === 'free' && (
                            <div style={{
                                position: 'absolute', top: 0, right: 0,
                                width: 'calc(100% - 82px)', height: '100%',
                                background: T.grayLt,
                                borderRadius: 10, border: `1px solid ${T.border}`,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center', gap: 6,
                            }}>
                                <span style={{ fontSize: 20 }}>🔒</span>
                                <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>구독 플랜 전용</span>
                                <a href="/subscribe" style={{
                                    fontSize: 12, fontWeight: 700, color: '#fff',
                                    background: T.blue, padding: '6px 16px',
                                    borderRadius: 999, textDecoration: 'none',
                                }}>업그레이드</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

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
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {reviews.map(r => (
                        <ReviewCard key={r.id} review={r} userPlan={plan} />
                    ))}
                </div>
            )}
        </div>
    );

    /* ─── Render ─────────────────────────────────────────────── */
    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>

            {/* ── Hero Header ── */}
            <div style={{
                background: 'linear-gradient(160deg, #1A2A4A 0%, #1B64DA 100%)',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ position: 'absolute', bottom: -60, left: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

                {/* 상단 바: 뒤로가기 + 스크랩 */}
                <div style={{
                    padding: '16px 16px 0', position: 'relative', zIndex: 2,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <button onClick={() => router.back()} style={{
                        background: 'rgba(255,255,255,0.15)', border: 'none',
                        borderRadius: T.radiusFull, width: 36, height: 36,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }}>
                        <ArrowLeft size={18} color="#fff" />
                    </button>

                    <button
                        onClick={handleScrap}
                        style={{
                            background: scrapped ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.15)',
                            border: 'none', borderRadius: T.radiusFull,
                            width: 36, height: 36,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <Bookmark
                            size={18}
                            fill={scrapped ? T.blue : 'none'}
                            color={scrapped ? T.blue : '#fff'}
                        />
                    </button>
                </div>

                <div style={{ padding: '14px 20px 28px', position: 'relative', zIndex: 2 }}>
                    {/* 상태 + D-Day */}
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

                    {baseEvent.name && (
                        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>
                            {baseEvent.name}
                        </div>
                    )}

                    <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1.35, marginBottom: 6 }}>
                        {recruitment.title}
                    </div>

                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Calendar size={13} />
                        {formatDate(instance.event_date)}
                        {instance.event_date_end && instance.event_date_end !== instance.event_date && (
                            <> ~ {formatDate(instance.event_date_end)}</>
                        )}
                    </div>
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
                <div style={{ display: activeTab === 0 ? 'block' : 'none' }}>
                    {renderDetail()}
                </div>
                <div style={{ display: activeTab === 1 ? 'block' : 'none' }}>
                    {renderReviews()}
                </div>
            </div>

        </div>
    );
}
