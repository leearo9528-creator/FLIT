'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Search, SlidersHorizontal, X } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { timeAgo } from '@/lib/helpers';
import { createClient } from '@/utils/supabase/client';
import { SellerBadge, LocationTag } from '@/components/ui/SellerBadge';

const PAGE_SIZE = 10;

const CATEGORIES = ['전체', '익명', '자유게시판', '실시간 행사 현황', '행사 양도/양수'];

const SORT_OPTIONS = [
    { key: 'latest', label: '최신순' },
    { key: 'likes', label: '좋아요순' },
];

const SELLER_TYPES = ['전체', '일반셀러', '푸드트럭'];

/* ─── Post Card ──────────────────────────────────────────────── */
function PostCard({ post, onClick }) {
    return (
        <div onClick={onClick} style={{
            background: T.white, borderRadius: T.radiusLg,
            border: `1px solid ${T.border}`,
            padding: '14px 16px', cursor: 'pointer',
            boxShadow: T.shadowSm,
        }}>
            {/* 배지 */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                {post.category && post.category !== '익명' && post.category !== '일반' && (
                    <span style={{
                        fontSize: 11, fontWeight: 700, color: T.blue,
                        background: T.blueLt, padding: '2px 8px', borderRadius: 4,
                    }}>
                        {post.category}
                    </span>
                )}
                {post.seller_type && !post.is_anonymous && <SellerBadge type={post.seller_type} />}
                {post.location && !post.is_anonymous && <LocationTag location={post.location} />}
                {post.is_anonymous && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.gray, background: T.grayLt, padding: '2px 8px', borderRadius: 4 }}>
                        익명
                    </span>
                )}
            </div>

            {/* 제목 */}
            <div style={{
                fontSize: 15, fontWeight: 700, color: T.text,
                marginBottom: 5, lineHeight: 1.4,
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
                {post.title}
            </div>

            {/* 내용 미리보기 */}
            {post.content && (
                <div style={{
                    fontSize: 13, color: T.textSub, lineHeight: 1.6,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    marginBottom: 10,
                }}>
                    {post.content}
                </div>
            )}

            {/* 하단 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: T.gray }}>
                    <Heart size={12} /> {post.likes ?? 0}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: T.gray }}>
                    {timeAgo(post.created_at)}
                </span>
            </div>
        </div>
    );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function CommunityPage() {
    const router = useRouter();

    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('전체');
    const [sellerType, setSellerType] = useState('전체');
    const [sortBy, setSortBy] = useState('latest');
    const [showFilters, setShowFilters] = useState(false);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const sentinelRef = useRef(null);
    const observerRef = useRef(null);

    /* 검색어 디바운스 (350ms) */
    useEffect(() => {
        const t = setTimeout(() => setDebouncedQuery(query), 350);
        return () => clearTimeout(t);
    }, [query]);

    /* ── 데이터 fetch ── */
    const fetchPosts = useCallback(async (pageIndex, reset = false) => {
        if (pageIndex === 0) setLoading(true);
        else setLoadingMore(true);

        const sb = createClient();
        let q = sb
            .from('posts')
            .select('id, title, content, category, location, seller_type, likes, created_at, is_anonymous');

        if (category !== '전체') q = q.eq('category', category);
        if (sellerType !== '전체') q = q.eq('seller_type', sellerType === '일반셀러' ? 'seller' : 'foodtruck');
        if (debouncedQuery.trim()) {
            q = q.or(`title.ilike.%${debouncedQuery.trim()}%,content.ilike.%${debouncedQuery.trim()}%`);
        }

        q = q.order(sortBy === 'likes' ? 'likes' : 'created_at', { ascending: false })
             .range(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE - 1);

        const { data, error } = await q;
        if (error) console.error('커뮤니티 글 로드 실패:', error);
        const fetched = data || [];

        setPosts(prev => reset ? fetched : [...prev, ...fetched]);
        setHasMore(fetched.length === PAGE_SIZE);
        setLoading(false);
        setLoadingMore(false);
    }, [category, sellerType, sortBy, debouncedQuery]);

    /* 필터/검색 변경 시 초기화 (fetchPosts 재생성 시 자동 실행) */
    useEffect(() => {
        setPage(0);
        setHasMore(true);
        fetchPosts(0, true);
    }, [fetchPosts]);

    /* 무한 스크롤 */
    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchPosts(nextPage);
            }
        }, { threshold: 0.1 });

        if (sentinelRef.current) observerRef.current.observe(sentinelRef.current);
        return () => observerRef.current?.disconnect();
    }, [hasMore, loadingMore, loading, page, fetchPosts]);

    const activeFilterCount = [sellerType !== '전체', sortBy !== 'latest'].filter(Boolean).length;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>

            {/* ── Sticky Header ── */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(16px)',
                borderBottom: `1px solid ${T.border}`,
            }}>
                <div style={{ padding: '20px 16px 12px' }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: T.text, letterSpacing: -0.5, marginBottom: 12 }}>
                        커뮤니티 💬
                    </div>

                    {/* 검색바 */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        background: T.bg, borderRadius: T.radiusMd,
                        border: `1.5px solid ${query ? T.blue : T.border}`, padding: '11px 14px',
                    }}>
                        <Search size={16} color={T.gray} strokeWidth={2} />
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="제목, 내용 검색"
                            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: T.text }}
                        />
                        {query ? (
                            <X size={15} color={T.gray} style={{ cursor: 'pointer' }} onClick={() => setQuery('')} />
                        ) : (
                            <div
                                onClick={() => setShowFilters(f => !f)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 4,
                                    padding: '5px 10px', borderRadius: T.radiusMd,
                                    background: showFilters || activeFilterCount > 0 ? T.text : T.white,
                                    color: showFilters || activeFilterCount > 0 ? T.white : T.gray,
                                    border: `1px solid ${T.border}`,
                                    fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0,
                                }}
                            >
                                <SlidersHorizontal size={13} />
                                필터{activeFilterCount > 0 ? ` ${activeFilterCount}` : ''}
                            </div>
                        )}
                    </div>
                </div>

                {/* 필터 패널 */}
                {showFilters && (
                    <div style={{ background: T.bg, borderTop: `1px solid ${T.border}`, paddingBottom: 4 }}>
                        <div style={{ padding: '10px 16px 8px' }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 8 }}>정렬</div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {SORT_OPTIONS.map(opt => (
                                    <div key={opt.key} onClick={() => setSortBy(opt.key)} style={{
                                        padding: '7px 16px', borderRadius: T.radiusFull, cursor: 'pointer',
                                        fontSize: 13, fontWeight: 600,
                                        background: sortBy === opt.key ? T.text : T.white,
                                        color: sortBy === opt.key ? T.white : T.gray,
                                        border: `1px solid ${sortBy === opt.key ? T.text : T.border}`,
                                        transition: 'all 0.15s',
                                    }}>{opt.label}</div>
                                ))}
                            </div>
                        </div>
                        <div style={{ padding: '0 16px 12px' }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 8 }}>셀러 유형</div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {SELLER_TYPES.map(type => (
                                    <div key={type} onClick={() => setSellerType(type)} style={{
                                        padding: '7px 16px', borderRadius: T.radiusFull, cursor: 'pointer',
                                        fontSize: 13, fontWeight: 600,
                                        background: sellerType === type ? T.text : T.white,
                                        color: sellerType === type ? T.white : T.gray,
                                        border: `1px solid ${sellerType === type ? T.text : T.border}`,
                                        transition: 'all 0.15s',
                                    }}>{type}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* ── 카테고리 스위치 ── */}
            <div style={{
                display: 'flex', gap: 8, padding: '12px 16px 4px',
                overflowX: 'auto', scrollbarWidth: 'none',
            }}>
                {CATEGORIES.map(cat => (
                    <div
                        key={cat}
                        onClick={() => setCategory(cat)}
                        style={{
                            flexShrink: 0,
                            padding: '7px 14px', borderRadius: T.radiusFull, cursor: 'pointer',
                            fontSize: 13, fontWeight: 600,
                            background: category === cat ? T.text : T.white,
                            color: category === cat ? T.white : T.gray,
                            border: `1.5px solid ${category === cat ? T.text : T.border}`,
                            transition: 'all 0.15s',
                        }}
                    >
                        {cat}
                    </div>
                ))}
            </div>

            {/* ── 게시글 목록 ── */}
            <div style={{ padding: '12px 16px 0' }}>
                {loading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {Array(4).fill(0).map((_, i) => (
                            <div key={i} style={{ height: 130, background: T.grayLt, borderRadius: T.radiusLg, animation: 'pulse 1.5s infinite' }} />
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: T.gray, fontSize: 14 }}>
                        {debouncedQuery ? `"${debouncedQuery}" 검색 결과가 없어요.` : '아직 게시글이 없어요.'}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {posts.map(post => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onClick={() => router.push(`/community/${post.id}`)}
                            />
                        ))}
                    </div>
                )}

                {/* 무한 스크롤 sentinel */}
                <div ref={sentinelRef} style={{ height: 1 }} />

                {/* 로딩 더보기 */}
                {loadingMore && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i} style={{ height: 120, background: T.grayLt, borderRadius: T.radiusLg, animation: 'pulse 1.5s infinite' }} />
                        ))}
                    </div>
                )}

                {/* 더 이상 없을 때 */}
                {!loading && !loadingMore && !hasMore && filtered.length > 0 && (
                    <div style={{ textAlign: 'center', padding: '24px 0', color: T.gray, fontSize: 13 }}>
                        모든 게시글을 불러왔습니다.
                    </div>
                )}
            </div>

        </div>
    );
}
