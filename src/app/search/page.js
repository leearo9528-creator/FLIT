'use client';

import { Suspense, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, MapPin, Tag, ArrowUpDown, X, Lock, Bookmark } from 'lucide-react';
import { T, FILTERS } from '@/lib/design-tokens';
import { calcRating, timeAgo } from '@/lib/helpers';
import { createClient } from '@/utils/supabase/client';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';

const PAGE_SIZE = 10;

/* ════════════════════════════════════════════════════════════════
   공통 UI 컴포넌트
════════════════════════════════════════════════════════════════ */
function ChipRow({ label, icon, options, value, onChange }) {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px 6px', fontSize: 12, fontWeight: 700, color: T.gray }}>
                {icon}{label}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '0 16px 12px' }}>
                {options.map(opt => (
                    <div key={opt} onClick={() => onChange(opt === value ? '전체' : opt)} style={{
                        padding: '7px 14px', borderRadius: T.radiusFull, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        background: value === opt ? T.text : T.white, color: value === opt ? T.white : T.gray,
                        border: `1px solid ${value === opt ? T.text : T.border}`, transition: 'all 0.15s',
                    }}>{opt}</div>
                ))}
            </div>
        </div>
    );
}

const SORT_OPTIONS = [
    { key: 'latest', label: '최신순' },
    { key: 'fee_asc', label: '참가비 낮은순' },
    { key: 'fee_desc', label: '참가비 높은순' },
    { key: 'rating', label: '평점 높은순' },
];

const REVIEW_SORT_OPTIONS = [
    { key: 'latest', label: '최신순' },
    { key: 'rating_high', label: '평점 높은순' },
    { key: 'rating_low', label: '평점 낮은순' },
];

const ORG_SORT_OPTIONS = [
    { key: 'name', label: '이름순' },
    { key: 'rating', label: '평점 높은순' },
    { key: 'reviews', label: '리뷰 많은순' },
    { key: 'instances', label: '개최 많은순' },
];

function SortBar({ value, onChange, options = SORT_OPTIONS }) {
    return (
        <div style={{ padding: '10px 16px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 8 }}>
                <ArrowUpDown size={12} />정렬
            </div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
                {options.map(opt => (
                    <div key={opt.key} onClick={() => onChange(opt.key)} style={{
                        padding: '7px 14px', borderRadius: T.radiusFull, fontSize: 13, fontWeight: 600,
                        cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                        background: value === opt.key ? T.text : T.white, color: value === opt.key ? T.white : T.gray,
                        border: `1px solid ${value === opt.key ? T.text : T.border}`, transition: 'all 0.15s',
                    }}>{opt.label}</div>
                ))}
            </div>
        </div>
    );
}

function Skeleton({ count = 3, height = 140 }) {
    return (
        <>
            {Array(count).fill(0).map((_, i) => (
                <div key={i} style={{ height, background: T.grayLt, borderRadius: T.radiusXl, animation: 'pulse 1.5s infinite' }} />
            ))}
        </>
    );
}

/* ════════════════════════════════════════════════════════════════
   공고 탭
════════════════════════════════════════════════════════════════ */
function RecruitCard({ rec, user, scrappedSet, onToggleScrap }) {
    const inst = rec.instance || {};
    const ev = inst.base_event || {};
    const org = inst.organizer || {};
    const rating = calcRating(ev);
    const reviewCount = ev.total_reviews ?? 0;
    const daysLeft = rec.end_date
        ? Math.ceil((new Date(rec.end_date) - Date.now()) / 86400000)
        : null;
    const isScrapped = scrappedSet.has(rec.id);
    const router = useRouter();

    const handleScrap = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) { router.push('/login'); return; }
        onToggleScrap(rec.id);
    };

    const feeText = rec.fee == null ? '미정' : rec.fee === 0 ? '무료' : `${Number(rec.fee).toLocaleString()}원`;
    const dateText = inst.event_date
        ? new Date(inst.event_date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
          + (inst.event_date_end && inst.event_date_end !== inst.event_date ? ` ~ ${new Date(inst.event_date_end).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}` : '')
        : '미정';

    const ROW = { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 };
    const LABEL = { fontSize: 12, fontWeight: 700, color: T.gray, width: 48, flexShrink: 0 };
    const VALUE = { fontSize: 13, fontWeight: 600, color: T.text, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

    return (
        <Link href={`/recruitments/${rec.id}`} style={{ textDecoration: 'none' }}>
            <Card padding={16} style={{ border: `1px solid ${T.border}` }}>
                {/* 상단: 상태 + D-Day + 북마크 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ padding: '4px 9px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: rec.status === 'OPEN' ? T.greenLt : T.grayLt, color: rec.status === 'OPEN' ? T.green : T.gray }}>
                            {rec.status === 'OPEN' ? '모집중' : '마감됨'}
                        </span>
                        {daysLeft !== null && daysLeft >= 0 && (
                            <span style={{ fontSize: 12, fontWeight: 700, color: daysLeft <= 3 ? T.red : T.gray }}>
                                {daysLeft === 0 ? 'D-Day' : `D-${daysLeft}`}
                            </span>
                        )}
                    </div>
                    <div onClick={handleScrap} style={{ cursor: 'pointer', padding: 4 }}>
                        <Bookmark size={18} color={isScrapped ? T.blue : T.gray} fill={isScrapped ? T.blue : 'none'} strokeWidth={2} />
                    </div>
                </div>

                {/* 제목 */}
                <div style={{ fontSize: 16, fontWeight: 800, color: T.text, lineHeight: 1.4, marginBottom: 12 }}>
                    {(rec.title || '').replace(/^\[.*?\]\s*/, '')}
                </div>

                {/* 정보 테이블 */}
                <div style={{ marginBottom: 12 }}>
                    {org.name && <div style={ROW}><span style={LABEL}>주최사</span><span style={VALUE}>{org.name}</span></div>}
                    <div style={ROW}><span style={LABEL}>참가비</span><span style={{ ...VALUE, color: T.blue, fontWeight: 800 }}>{feeText}</span></div>
                    <div style={ROW}><span style={LABEL}>일시</span><span style={VALUE}>{dateText}</span></div>
                    <div style={{ ...ROW, marginBottom: 0 }}><span style={LABEL}>장소</span><span style={VALUE}>{inst.location || '미정'}</span></div>
                </div>

                {/* 하단: 평점 + 리뷰 */}
                <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 14 }}>⭐</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: T.text }}>{rating}</span>
                    <span style={{ color: T.border }}>|</span>
                    <span style={{ fontSize: 13, color: T.gray }}>리뷰 {reviewCount}개</span>
                    {reviewCount >= 10 && (
                        <span style={{ fontSize: 11, fontWeight: 700, color: T.blue, background: T.blueLt, padding: '2px 7px', borderRadius: 4, marginLeft: 2 }}>
                            인기
                        </span>
                    )}
                </div>
            </Card>
        </Link>
    );
}

/* ════════════════════════════════════════════════════════════════
   후기 탭 — 무한스크롤 피드
════════════════════════════════════════════════════════════════ */
function scoreColor(v) {
    return v >= 4.0 ? T.green : v >= 3.0 ? T.blue : T.gray;
}

function ReviewFeedCard({ review, router, canView, isLoggedIn }) {
    const inst = review.event_instance ?? {};
    const evt  = inst.base_event ?? {};
    const org  = inst.organizer ?? {};
    const isFoodtruck = review.seller_type === 'foodtruck';
    const isRecent    = (Date.now() - new Date(review.created_at)) < 86400000;

    const allScores = [review.rating_profit, review.rating_traffic, review.rating_promotion, review.rating_support, review.rating_manners].filter(v => v != null);
    const overall   = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
    const color     = scoreColor(overall);

    return (
        <div
            onClick={() => evt.id && router.push(`/events/${evt.id}`)}
            style={{
                background: T.white, borderRadius: 14, border: `1px solid ${T.border}`,
                padding: '16px 16px 14px', cursor: 'pointer',
            }}
        >
            {/* ── 상단: 행사명 + 점수 ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        {isRecent && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, fontWeight: 700, color: '#EF4444' }}>
                                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#EF4444', display: 'inline-block', animation: 'pulse-dot 1.5s ease-in-out infinite' }} />
                                실시간
                            </span>
                        )}
                        <span style={{ fontSize: 11, color: T.gray, fontWeight: 600 }}>
                            {isFoodtruck ? '🚚 푸드트럭' : '🛍️ 일반셀러'}
                        </span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.text, lineHeight: 1.3, marginBottom: 2 }}>
                        {evt.name ?? '행사명 없음'}
                    </div>
                    {inst.location && (
                        <div style={{ fontSize: 12, color: T.gray }}>📍 {inst.location}</div>
                    )}
                </div>
                <div style={{ flexShrink: 0, textAlign: 'center', minWidth: 44 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color, lineHeight: 1 }}>{overall.toFixed(1)}</div>
                    <div style={{ fontSize: 10, color: T.gray, marginTop: 2 }}>
                        {overall >= 4.5 ? '최고' : overall >= 3.5 ? '좋음' : overall >= 2.5 ? '보통' : '아쉬움'}
                    </div>
                </div>
            </div>

            {/* ── 구분선 ── */}
            <div style={{ height: 1, background: T.border, marginBottom: 10 }} />

            {canView ? (
                review.content ? (
                    <div style={{
                        fontSize: 13, color: T.textSub, lineHeight: 1.65,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                        &ldquo;{review.content}&rdquo;
                    </div>
                ) : (
                    <div style={{ fontSize: 13, color: T.gray }}>작성된 후기가 없어요.</div>
                )
            ) : (
                <div style={{
                    borderRadius: 8, padding: '11px 14px',
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: T.bg, border: `1px solid ${T.border}`,
                }}>
                    <Lock size={15} color={T.gray} />
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>
                            {isLoggedIn ? '리뷰 작성 후 열람 가능' : '로그인 후 열람 가능'}
                        </div>
                        <Link href={isLoggedIn ? '/reviews/write' : '/login'} style={{ fontSize: 11, color: T.blue, fontWeight: 600, textDecoration: 'none' }}>
                            {isLoggedIn ? '리뷰 작성하기 →' : '로그인하기 →'}
                        </Link>
                    </div>
                </div>
            )}

            {/* ── 주최사 + 시간 ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                {org.name ? <span style={{ fontSize: 11, color: T.gray }}>{org.name}</span> : <span />}
                <span style={{ fontSize: 11, color: T.gray }}>{timeAgo(review.created_at)}</span>
            </div>
        </div>
    );
}


function ReviewFeed({ query, sellerFilter, reviewSortBy }) {
    const router = useRouter();
    const { user, plan, canViewReviews } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const sentinelRef = useRef(null);
    const observerRef = useRef(null);

    const fetchReviews = useCallback(async (pageIndex, reset = false, sq = query, sf = sellerFilter, sort = reviewSortBy) => {
        if (pageIndex === 0) setLoading(true); else setLoadingMore(true);

        const sb = createClient();

        let instanceIdFilter = null;
        if (sq.trim()) {
            // base_events join으로 단일 쿼리 (3중 waterfall → 1회 왕복)
            const { data: instances } = await sb
                .from('event_instances')
                .select('id, base_events!inner(id)')
                .ilike('base_events.name', `%${sq.trim()}%`);
            instanceIdFilter = (instances || []).map(i => i.id);
            if (instanceIdFilter.length === 0) {
                setReviews(reset ? [] : v => v);
                setHasMore(false);
                setLoading(false); setLoadingMore(false);
                return;
            }
        }

        let q = sb
            .from('reviews')
            .select(`id, event_instance_id, seller_type,
                rating_profit, rating_traffic, rating_promotion, rating_support, rating_manners,
                revenue_range, age_groups, visitor_types,
                title, content, pros, cons, is_verified, created_at,
                event_instance:event_instances(id, location, base_event:base_events(id, name), organizer:organizers(name))`)
            .range(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE - 1);

        // 정렬
        if (sort === 'rating_high' || sort === 'rating_low') {
            q = q.order('created_at', { ascending: false }); // DB에서는 최신순, 클라이언트에서 재정렬
        } else {
            q = q.order('created_at', { ascending: false });
        }

        if (sf !== 'all') q = q.eq('seller_type', sf === 'seller' ? 'seller' : 'foodtruck');
        if (instanceIdFilter) q = q.in('event_instance_id', instanceIdFilter);

        const { data } = await q;
        let fetched = data || [];

        // 클라이언트 정렬
        if (sort === 'rating_high' || sort === 'rating_low') {
            fetched = [...fetched].sort((a, b) => {
                const scoreA = [a.rating_profit, a.rating_traffic, a.rating_promotion, a.rating_support, a.rating_manners]
                    .filter(v => v != null).reduce((s, v, _, arr) => s + v / arr.length, 0);
                const scoreB = [b.rating_profit, b.rating_traffic, b.rating_promotion, b.rating_support, b.rating_manners]
                    .filter(v => v != null).reduce((s, v, _, arr) => s + v / arr.length, 0);
                return sort === 'rating_high' ? scoreB - scoreA : scoreA - scoreB;
            });
        }

        setReviews(prev => reset ? fetched : [...prev, ...fetched]);
        setHasMore(fetched.length === PAGE_SIZE);
        setLoading(false); setLoadingMore(false);
    }, [query, sellerFilter, reviewSortBy]);

    useEffect(() => { setPage(0); setHasMore(true); fetchReviews(0, true, query, sellerFilter, reviewSortBy); }, [sellerFilter, reviewSortBy, fetchReviews]);

    useEffect(() => {
        const t = setTimeout(() => { setPage(0); setHasMore(true); fetchReviews(0, true, query, sellerFilter, reviewSortBy); }, 350);
        return () => clearTimeout(t);
    }, [query]);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
                const next = page + 1;
                setPage(next);
                fetchReviews(next, false, query, sellerFilter, reviewSortBy);
            }
        }, { threshold: 0.1 });
        if (sentinelRef.current) observerRef.current.observe(sentinelRef.current);
        return () => observerRef.current?.disconnect();
    }, [hasMore, loadingMore, loading, page, fetchReviews]);

    return (
        <div style={{ padding: '12px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {loading
                ? <Skeleton count={4} height={180} />
                : reviews.length === 0
                    ? <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>
                        {query ? `"${query}" 관련 후기가 없어요.` : '아직 등록된 후기가 없어요.'}
                    </div>
                    : reviews.map(r => <ReviewFeedCard key={r.id} review={r} router={router} canView={!!(user && canViewReviews)} isLoggedIn={!!user} />)
            }
            <div ref={sentinelRef} style={{ height: 1 }} />
            {loadingMore && <Skeleton count={2} height={160} />}
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════
   주최사 탭
════════════════════════════════════════════════════════════════ */
function OrganizerCard({ org }) {
    const avgSupport  = org.avg_support  != null ? Number(org.avg_support).toFixed(1)  : null;
    const avgManners  = org.avg_manners  != null ? Number(org.avg_manners).toFixed(1)  : null;
    const totalRev    = org.total_reviews  ?? 0;
    const totalInst   = org.total_instances ?? 0;

    return (
        <Link href={`/organizers/${org.id}`} style={{ textDecoration: 'none' }}>
        <Card padding={16} style={{ border: `1px solid ${T.border}` }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                    width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                    background: T.grayLt, overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    {org.logo_url
                        ? <Image src={org.logo_url} alt={org.name} fill style={{ objectFit: 'cover' }} sizes="52px" />
                        : <span style={{ fontSize: 22 }}>🏢</span>
                    }
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 4 }}>{org.name}</div>

                    {org.description && (
                        <div style={{
                            fontSize: 12, color: T.textSub, lineHeight: 1.5, marginBottom: 8,
                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>
                            {org.description}
                        </div>
                    )}

                    {(avgSupport || avgManners) && (
                        <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                            {avgSupport && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ fontSize: 11, color: T.gray }}>운영지원</span>
                                    <span style={{ fontSize: 13, fontWeight: 800, color: '#F59E0B' }}>★</span>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{avgSupport}</span>
                                </div>
                            )}
                            {avgManners && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ fontSize: 11, color: T.gray }}>주최매너</span>
                                    <span style={{ fontSize: 13, fontWeight: 800, color: '#F59E0B' }}>★</span>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{avgManners}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: 10 }}>
                        <span style={{ fontSize: 11, color: T.gray }}>🎪 개최 {totalInst}회</span>
                        <span style={{ fontSize: 11, color: T.gray }}>💬 리뷰 {totalRev}개</span>
                    </div>
                </div>
            </div>
        </Card>
        </Link>
    );
}

function OrganizerList({ query, orgSortBy }) {
    const [organizers, setOrganizers] = useState([]);
    const [loading, setLoading]       = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const sb = createClient();
            let q = sb.from('organizers').select('id, name, description, logo_url, total_reviews, total_instances, avg_support, avg_manners');
            if (query.trim()) q = q.ilike('name', `%${query.trim()}%`);
            if (orgSortBy === 'reviews') q = q.order('total_reviews', { ascending: false });
            else if (orgSortBy === 'instances') q = q.order('total_instances', { ascending: false });
            else q = q.order('name');
            const { data } = await q;
            let result = data || [];
            if (orgSortBy === 'rating') {
                result = [...result].sort((a, b) => {
                    const ra = ((a.avg_support || 0) + (a.avg_manners || 0)) / 2;
                    const rb = ((b.avg_support || 0) + (b.avg_manners || 0)) / 2;
                    return rb - ra;
                });
            }
            setOrganizers(result);
            setLoading(false);
        })();
    }, [query, orgSortBy]);

    return (
        <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {!loading && (
                <div style={{ fontSize: 12, color: T.gray, paddingBottom: 4 }}>
                    {organizers.length}개의 주최사
                </div>
            )}
            {loading
                ? <Skeleton count={4} height={110} />
                : organizers.length === 0
                    ? <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>
                        {query ? `"${query}" 관련 주최사가 없어요.` : '등록된 주최사가 없어요.'}
                      </div>
                    : organizers.map(o => <OrganizerCard key={o.id} org={o} />)
            }
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════
   메인 컨텐츠
════════════════════════════════════════════════════════════════ */
function SearchContent() {
    const searchParams = useSearchParams();
    const initTab = ['reviews', 'organizers'].includes(searchParams.get('tab')) ? searchParams.get('tab') : 'recruit';
    const [activeTab, setActiveTab] = useState(initTab);
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [showFilters, setShowFilters] = useState(false);

    // 모집공고 필터
    const [regionFilter, setRegionFilter] = useState('전체');
    const [categoryFilter, setCategoryFilter] = useState('전체');
    const [sortBy, setSortBy] = useState('latest');

    // 실시간 후기 필터
    const [sellerFilter, setSellerFilter] = useState('all');
    const [reviewSortBy, setReviewSortBy] = useState('latest');

    // 주최사 필터
    const [orgSortBy, setOrgSortBy] = useState('name');

    // 공고 데이터
    const [recruitments, setRecruitments] = useState([]);
    const [loadingRec, setLoadingRec] = useState(true);
    const [scrappedSet, setScrappedSet] = useState(new Set());
    const { user } = useAuth();

    useEffect(() => {
        (async () => {
            setLoadingRec(true);
            try {
                const sb = createClient();
                const [recRes, scrapRes] = await Promise.all([
                    sb.from('recruitments')
                        .select(`id, title, fee, end_date, status, created_at, instance:event_instances(
                            id, location, location_sido, event_date, event_date_end,
                            base_event:base_events(id, name, category, avg_event_rating, total_reviews),
                            organizer:organizers(name)
                        )`)
                        .order('created_at', { ascending: false }),
                    user ? sb.from('scraps').select('recruitment_id').eq('user_id', user.id) : Promise.resolve({ data: [] }),
                ]);
                if (recRes.error) throw recRes.error;
                if (recRes.data) setRecruitments(recRes.data);
                if (scrapRes.data) setScrappedSet(new Set(scrapRes.data.map(s => s.recruitment_id)));
            } catch (err) {
                console.error('모집공고 로드 실패:', err);
            } finally {
                setLoadingRec(false);
            }
        })();
    }, [user]);

    const toggleScrap = async (recId) => {
        if (!user) return;
        const sb = createClient();
        const isScrapped = scrappedSet.has(recId);
        setScrappedSet(prev => { const next = new Set(prev); isScrapped ? next.delete(recId) : next.add(recId); return next; });
        try {
            if (isScrapped) await sb.from('scraps').delete().eq('user_id', user.id).eq('recruitment_id', recId);
            else await sb.from('scraps').insert({ user_id: user.id, recruitment_id: recId });
        } catch { setScrappedSet(prev => { const next = new Set(prev); isScrapped ? next.add(recId) : next.delete(recId); return next; }); }
    };

    const filteredRecruitments = useMemo(() => {
        let list = recruitments;
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(r =>
                (r.title || '').toLowerCase().includes(q) ||
                (r.instance?.base_event?.name || '').toLowerCase().includes(q) ||
                (r.instance?.location || '').toLowerCase().includes(q) ||
                (r.instance?.organizer?.name || '').toLowerCase().includes(q)
            );
        }
        if (regionFilter !== '전체') list = list.filter(r => (r.instance?.location_sido || '').includes(regionFilter));
        if (categoryFilter !== '전체') list = list.filter(r => (r.instance?.base_event?.category || '').includes(categoryFilter));
        if (sortBy === 'fee_asc') list = [...list].sort((a, b) => (a.fee ?? 0) - (b.fee ?? 0));
        else if (sortBy === 'fee_desc') list = [...list].sort((a, b) => (b.fee ?? 0) - (a.fee ?? 0));
        else if (sortBy === 'rating') list = [...list].sort((a, b) => Number(calcRating(b.instance?.base_event)) - Number(calcRating(a.instance?.base_event)));
        return list;
    }, [recruitments, query, regionFilter, categoryFilter, sortBy]);

    // 탭별 활성 필터 카운트
    const activeFilterCount = useMemo(() => {
        if (activeTab === 'recruit') return [regionFilter !== '전체', categoryFilter !== '전체', sortBy !== 'latest'].filter(Boolean).length;
        if (activeTab === 'reviews') return [sellerFilter !== 'all', reviewSortBy !== 'latest'].filter(Boolean).length;
        if (activeTab === 'organizers') return [orgSortBy !== 'name'].filter(Boolean).length;
        return 0;
    }, [activeTab, regionFilter, categoryFilter, sortBy, sellerFilter, reviewSortBy, orgSortBy]);

    const placeholder = activeTab === 'recruit' ? '행사명, 공고명, 지역 검색' : activeTab === 'organizers' ? '주최사명 검색' : '행사명으로 검색';

    const handleTabChange = (key) => {
        setActiveTab(key);
        setShowFilters(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>

            {/* ── Sticky Header ── */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)',
                borderBottom: `1px solid ${T.border}`,
            }}>
                <div style={{ padding: '20px 16px 12px' }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: T.text, letterSpacing: -0.5, marginBottom: 12 }}>
                        행사 찾기 🔍
                    </div>

                    {/* 통합 검색바 */}
                    <div style={{
                        display: 'flex', alignItems: 'center', background: T.bg,
                        borderRadius: T.radiusMd, padding: '11px 14px',
                        border: `1.5px solid ${query ? T.blue : T.border}`, gap: 10,
                    }}>
                        <Search size={16} color={T.gray} strokeWidth={2} />
                        <input
                            type="text" value={query} onChange={e => setQuery(e.target.value)}
                            placeholder={placeholder}
                            style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, fontSize: 14, color: T.text }}
                        />
                        {query
                            ? <X size={15} color={T.gray} style={{ cursor: 'pointer' }} onClick={() => setQuery('')} />
                            : (
                                <div onClick={() => setShowFilters(f => !f)} style={{
                                    display: 'flex', alignItems: 'center', gap: 4,
                                    padding: '5px 10px', borderRadius: T.radiusMd,
                                    background: showFilters || activeFilterCount > 0 ? T.text : T.white,
                                    color: showFilters || activeFilterCount > 0 ? T.white : T.gray,
                                    border: `1px solid ${T.border}`, fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0,
                                }}>
                                    <SlidersHorizontal size={13} />
                                    필터{activeFilterCount > 0 ? ` ${activeFilterCount}` : ''}
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* 필터 패널 — 탭별로 다른 내용 */}
                {showFilters && (
                    <div style={{ borderTop: `1px solid ${T.border}`, background: T.bg, paddingBottom: 4 }}>
                        {activeTab === 'recruit' && (
                            <>
                                <SortBar value={sortBy} onChange={setSortBy} />
                                <ChipRow label="지역" icon={<MapPin size={12} />} options={['전체', ...FILTERS.region]} value={regionFilter} onChange={setRegionFilter} />
                                <ChipRow label="카테고리" icon={<Tag size={12} />} options={['전체', ...FILTERS.boothCategory]} value={categoryFilter} onChange={setCategoryFilter} />
                            </>
                        )}
                        {activeTab === 'reviews' && (
                            <>
                                <SortBar value={reviewSortBy} onChange={setReviewSortBy} options={REVIEW_SORT_OPTIONS} />
                                <ChipRow
                                    label="셀러 유형" icon={<Tag size={12} />}
                                    options={['전체', '🛍️ 플리마켓', '🚚 푸드트럭']}
                                    value={sellerFilter === 'all' ? '전체' : sellerFilter === 'seller' ? '🛍️ 플리마켓' : '🚚 푸드트럭'}
                                    onChange={v => {
                                        if (v === '전체') setSellerFilter('all');
                                        else if (v === '🛍️ 플리마켓') setSellerFilter('seller');
                                        else setSellerFilter('foodtruck');
                                    }}
                                />
                            </>
                        )}
                        {activeTab === 'organizers' && (
                            <SortBar value={orgSortBy} onChange={setOrgSortBy} options={ORG_SORT_OPTIONS} />
                        )}
                    </div>
                )}

                {/* 탭 바 */}
                <div style={{ display: 'flex', borderTop: `1px solid ${T.border}` }}>
                    {[
                        { key: 'recruit', label: '📢 모집공고' },
                        { key: 'reviews', label: '🔴 실시간 후기' },
                        { key: 'organizers', label: '🏢 주최사' },
                    ].map(tab => (
                        <div key={tab.key} onClick={() => handleTabChange(tab.key)} style={{
                            flex: 1, textAlign: 'center', padding: '13px 0',
                            fontSize: 12, fontWeight: activeTab === tab.key ? 800 : 500,
                            color: activeTab === tab.key ? T.text : T.gray,
                            cursor: 'pointer',
                            borderBottom: activeTab === tab.key ? `2.5px solid ${T.text}` : '2.5px solid transparent',
                            transition: 'all 0.2s',
                        }}>{tab.label}</div>
                    ))}
                </div>
            </div>

            {/* ── 공고 탭 ── */}
            {activeTab === 'recruit' && (
                <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {!loadingRec && (
                        <div style={{ fontSize: 12, color: T.gray, paddingBottom: 4 }}>
                            {filteredRecruitments.length}개의 공고
                        </div>
                    )}
                    {loadingRec
                        ? <Skeleton />
                        : filteredRecruitments.length === 0
                            ? <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 15 }}>
                                {query ? `"${query}" 관련 공고가 없어요.` : '진행 중인 공고가 없어요.'}
                            </div>
                            : filteredRecruitments.map(r => <RecruitCard key={r.id} rec={r} user={user} scrappedSet={scrappedSet} onToggleScrap={toggleScrap} />)
                    }
                </div>
            )}

            {/* ── 후기 탭 ── */}
            {activeTab === 'reviews' && (
                <ReviewFeed query={query} sellerFilter={sellerFilter} reviewSortBy={reviewSortBy} />
            )}

            {/* ── 주최사 탭 ── */}
            {activeTab === 'organizers' && <OrganizerList query={query} orgSortBy={orgSortBy} />}

        </div>
    );
}

/* ════════════════════════════════════════════════════════════════
   Page Export
════════════════════════════════════════════════════════════════ */
export default function SearchPage() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: T.gray, fontSize: 14 }}>불러오는 중...</div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
