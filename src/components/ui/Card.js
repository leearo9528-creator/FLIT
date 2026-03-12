'use client';

import { T } from '@/lib/design-tokens';

export default function Card({ children, padding = 20, style = {} }) {
    return (
        <div style={{
            background: T.white,
            borderRadius: T.radiusLg,
            padding,
            boxShadow: T.shadowSm,
            ...style
        }}>
            {children}
        </div>
    );
}
