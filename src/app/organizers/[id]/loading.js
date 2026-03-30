import { SkeletonBox, SkeletonList, RecruitCardSkeleton, ReviewCardSkeleton } from '@/components/ui/Skeleton';
import { T } from '@/lib/design-tokens';

export default function Loading() {
    return (
        <div style={{ maxWidth: 480, margin: '0 auto', background: T.bg, minHeight: '100vh' }}>
            <div style={{
                height: 60, background: 'rgba(255,255,255,0.8)',
                borderBottom: `1px solid ${T.border}`,
            }} />
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{
                    background: T.white, borderRadius: T.radiusLg,
                    padding: 20, border: `1px solid ${T.border}`,
                    display: 'flex', gap: 16, alignItems: 'center',
                }}>
                    <SkeletonBox width={64} height={64} radius={T.radiusFull} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <SkeletonBox width={100} height={18} />
                        <SkeletonBox width="80%" height={13} />
                        <SkeletonBox width="60%" height={13} />
                    </div>
                </div>
                <SkeletonList count={3} CardSkeleton={RecruitCardSkeleton} />
                <SkeletonList count={2} CardSkeleton={ReviewCardSkeleton} />
            </div>
        </div>
    );
}
