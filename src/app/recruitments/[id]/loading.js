import { SkeletonBox, SkeletonList, ReviewCardSkeleton } from '@/components/ui/Skeleton';
import { T } from '@/lib/design-tokens';

export default function Loading() {
    return (
        <div style={{ maxWidth: 480, margin: '0 auto', background: T.bg, minHeight: '100vh' }}>
            <div style={{
                height: 60, background: 'rgba(255,255,255,0.8)',
                borderBottom: `1px solid ${T.border}`,
            }} />
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SkeletonBox width="60%" height={22} />
                <SkeletonBox width="40%" height={16} />
                <div style={{
                    background: T.white, borderRadius: T.radiusLg,
                    padding: 16, border: `1px solid ${T.border}`,
                    display: 'flex', flexDirection: 'column', gap: 12,
                }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12 }}>
                            <SkeletonBox width={72} height={14} />
                            <SkeletonBox width="60%" height={14} />
                        </div>
                    ))}
                </div>
                <SkeletonList count={2} CardSkeleton={ReviewCardSkeleton} />
            </div>
        </div>
    );
}
