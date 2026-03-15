import { T } from '@/lib/design-tokens';

export function SellerBadge({ type }) {
    const isFoodTruck = type === 'foodtruck';
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 3,
            fontSize: 11, fontWeight: 700,
            padding: '3px 8px', borderRadius: T.radiusFull,
            background: isFoodTruck ? T.yellowLt : T.blueLt,
            color: isFoodTruck ? T.yellow : T.blue,
        }}>
            {isFoodTruck ? '🚚' : '💎'} {isFoodTruck ? '푸드트럭' : '일반셀러'}
        </span>
    );
}

export function LocationTag({ location }) {
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 3,
            fontSize: 11, fontWeight: 700,
            padding: '3px 8px', borderRadius: T.radiusFull,
            background: T.greenLt, color: T.green,
        }}>
            📍 {location}
        </span>
    );
}
