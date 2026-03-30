import { EventHeaderSkeleton, SkeletonList, ReviewCardSkeleton, SkeletonBox } from '@/components/ui/Skeleton';
import { T } from '@/lib/design-tokens';

export default function Loading() {
    return (
        <div style={{ maxWidth: 480, margin: '0 auto', background: T.bg, minHeight: '100vh' }}>
            <EventHeaderSkeleton />
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SkeletonBox width={200} height={14} />
                <SkeletonList count={3} CardSkeleton={ReviewCardSkeleton} />
            </div>
        </div>
    );
}
