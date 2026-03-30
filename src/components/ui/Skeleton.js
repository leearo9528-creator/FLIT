'use client';

import { T } from '@/lib/design-tokens';

/* ─── 기본 Skeleton 블록 ─────────────────────────────────────── */
export function SkeletonBox({ width = '100%', height = 16, radius = 8, style = {} }) {
    return (
        <div style={{
            width, height,
            borderRadius: radius,
            background: `linear-gradient(90deg, ${T.grayLt} 25%, #e8eaed 50%, ${T.grayLt} 75%)`,
            backgroundSize: '200% 100%',
            animation: 'skeleton-shimmer 1.4s infinite',
            flexShrink: 0,
            ...style,
        }} />
    );
}

/* ─── 카드 공통 래퍼 ─────────────────────────────────────────── */
function SkeletonCard({ children, style = {} }) {
    return (
        <div style={{
            background: T.white,
            borderRadius: T.radiusLg,
            padding: '16px',
            border: `1px solid ${T.border}`,
            ...style,
        }}>
            {children}
        </div>
    );
}

/* ─── 모집공고 카드 스켈레톤 ─────────────────────────────────── */
export function RecruitCardSkeleton() {
    return (
        <SkeletonCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <SkeletonBox width={120} height={18} />
                <SkeletonBox width={52} height={20} radius={T.radiusFull} />
            </div>
            <SkeletonBox width="80%" height={14} style={{ marginBottom: 8 }} />
            <SkeletonBox width="55%" height={12} />
        </SkeletonCard>
    );
}

/* ─── 리뷰 카드 스켈레톤 ─────────────────────────────────────── */
export function ReviewCardSkeleton() {
    return (
        <SkeletonCard>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <SkeletonBox width={36} height={36} radius={T.radiusFull} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <SkeletonBox width={80} height={14} />
                    <SkeletonBox width={120} height={12} />
                </div>
                <SkeletonBox width={40} height={16} radius={T.radiusFull} />
            </div>
            <SkeletonBox height={12} style={{ marginBottom: 6 }} />
            <SkeletonBox width="75%" height={12} />
        </SkeletonCard>
    );
}

/* ─── 커뮤니티 포스트 스켈레톤 ──────────────────────────────── */
export function PostCardSkeleton() {
    return (
        <SkeletonCard style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <SkeletonBox width={36} height={16} radius={T.radiusFull} />
                <SkeletonBox width={60} height={16} />
            </div>
            <SkeletonBox width="90%" height={15} style={{ marginBottom: 6 }} />
            <SkeletonBox width="60%" height={13} />
        </SkeletonCard>
    );
}

/* ─── 행사 상세 헤더 스켈레톤 ───────────────────────────────── */
export function EventHeaderSkeleton() {
    return (
        <div>
            <SkeletonBox width="100%" height={200} radius={0} style={{ marginBottom: 16 }} />
            <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <SkeletonBox width={80} height={20} radius={T.radiusFull} />
                <SkeletonBox width="70%" height={24} />
                <SkeletonBox width={140} height={14} />
            </div>
        </div>
    );
}

/* ─── 리스트 스켈레톤 (n개 반복) ─────────────────────────────── */
export function SkeletonList({ count = 4, CardSkeleton = RecruitCardSkeleton, gap = 10 }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap }}>
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );
}

/* ─── 전체 페이지 로딩 ──────────────────────────────────────── */
export function PageLoadingSkeleton() {
    return (
        <div style={{
            minHeight: '100vh', background: T.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <div style={{
                width: 40, height: 40, borderRadius: '50%',
                border: `3px solid ${T.border}`,
                borderTopColor: T.blue,
                animation: 'spin 0.8s linear infinite',
            }} />
        </div>
    );
}
