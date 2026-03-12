'use client';

import { T } from '@/lib/design-tokens';

export default function TopBar({ title, subtitle, hasBack, onBack, action }) {
    return (
        <div style={{
            position: 'sticky', top: 0, zIndex: 100,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${T.border}`,
            height: 60, display: 'flex', alignItems: 'center', padding: '0 20px',
            justifyContent: 'space-between'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {hasBack && (
                    <div onClick={onBack} style={{ cursor: 'pointer', fontSize: 20 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </div>
                )}
                <div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: T.text, letterSpacing: -0.5 }}>{title}</div>
                    {subtitle && <div style={{ fontSize: 12, color: T.gray, fontWeight: 500, marginTop: 1 }}>{subtitle}</div>}
                </div>
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
