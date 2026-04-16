'use client';

import { useRef } from 'react';
import { T } from '@/lib/design-tokens';
import TossQR from '@/components/ui/TossQR';
import TopBar from '@/components/ui/TopBar';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.flitunion.com';

const QR_LIST = [
    { label: '셀러용', path: '/intro/seller', color: T.blue },
    { label: '주최사용', path: '/intro/vendor', color: '#059669' },
];

export default function QRDownloadPage() {
    const refs = useRef([]);

    function handleDownload(index, label) {
        const container = refs.current[index];
        if (!container) return;
        const img = container.querySelector('img');
        if (!img) return;

        const link = document.createElement('a');
        link.download = `flit-qr-${label}.png`;
        link.href = img.src;
        link.click();
    }

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="QR 코드 다운로드" back />

            <div style={{ padding: '24px 20px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: T.gray, lineHeight: 1.6 }}>
                    명함 · 포스터 인쇄용 QR 코드<br />
                    이미지를 길게 눌러 저장하거나 다운로드 버튼을 이용하세요
                </div>
            </div>

            <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                {QR_LIST.map((qr, i) => (
                    <div key={i} style={{
                        background: T.white, borderRadius: T.radiusXl,
                        border: `1px solid ${T.border}`, padding: '32px 20px',
                        textAlign: 'center', boxShadow: T.shadowSm,
                    }}>
                        <div style={{
                            display: 'inline-block', background: `${qr.color}12`,
                            color: qr.color, fontSize: 12, fontWeight: 700,
                            padding: '4px 12px', borderRadius: T.radiusFull, marginBottom: 20,
                        }}>
                            {qr.label}
                        </div>

                        <div
                            ref={el => refs.current[i] = el}
                            style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}
                        >
                            <TossQR
                                url={`${SITE_URL}${qr.path}`}
                                size={240}
                                color="#000000"
                                accentColor={T.blue}
                            />
                        </div>

                        <div style={{ fontSize: 12, color: T.gray, marginBottom: 20 }}>
                            {SITE_URL.replace('https://', '')}{qr.path}
                        </div>

                        <button
                            onClick={() => handleDownload(i, qr.label)}
                            style={{
                                padding: '12px 32px', borderRadius: T.radiusFull,
                                background: qr.color, color: '#fff',
                                fontSize: 14, fontWeight: 700,
                                border: 'none', cursor: 'pointer',
                            }}
                        >
                            PNG 다운로드
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
