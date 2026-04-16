'use client';

import { useRef, useCallback } from 'react';
import { T } from '@/lib/design-tokens';
import TossQR from '@/components/ui/TossQR';
import TopBar from '@/components/ui/TopBar';
import html2canvas from 'html2canvas';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.flitunion.com';

/* ── 명함 사이즈 (세로형 50×90mm → 3x 해상도 = 600×1080px 비율) ── */
const CARD_W = 300;
const CARD_H = 540;

function BusinessCard({ type, cardRef }) {
    const isSeller = type === 'seller';
    const gradient = isSeller
        ? `linear-gradient(180deg, ${T.blue} 0%, ${T.blueDark} 100%)`
        : 'linear-gradient(180deg, #059669 0%, #0D9488 100%)';
    const accent = isSeller ? T.blue : '#059669';
    const tagText = isSeller ? 'FOR SELLERS' : 'FOR ORGANIZERS';
    const headline = isSeller ? '행사 찾기,\n이제 플릿 하나로' : '셀러 모집,\n플릿에서 한번에';
    const sub = isSeller
        ? '공고 · 리뷰 · 커뮤니티\n한 곳에서'
        : '무료 공고 등록\n즉시 게시';
    const url = `${SITE_URL}/intro/${type}`;

    return (
        <div
            ref={cardRef}
            style={{
                width: CARD_W, height: CARD_H,
                borderRadius: 16, overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                display: 'flex', flexDirection: 'column',
                position: 'relative',
                flexShrink: 0,
            }}
        >
            {/* 상단 컬러 영역 */}
            <div style={{
                background: gradient,
                padding: '28px 24px 24px',
                position: 'relative', overflow: 'hidden',
                flex: '0 0 auto',
            }}>
                {/* 장식 */}
                <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ position: 'absolute', bottom: -12, left: -12, width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

                {/* 로고 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>플릿</span>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', display: 'inline-block' }} />
                </div>

                {/* 태그 */}
                <div style={{
                    display: 'inline-block', background: 'rgba(255,255,255,0.2)',
                    padding: '3px 10px', borderRadius: 999,
                    fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: 0.5, marginBottom: 12,
                }}>
                    {tagText}
                </div>

                {/* 헤드라인 */}
                <div style={{
                    fontSize: 20, fontWeight: 900, color: '#fff',
                    lineHeight: 1.35, whiteSpace: 'pre-line', letterSpacing: -0.5,
                }}>
                    {headline}
                </div>
            </div>

            {/* 하단 백색 영역 */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '20px 24px 24px', gap: 12,
            }}>
                {/* 서브 카피 */}
                <div style={{
                    fontSize: 12, color: T.gray, textAlign: 'center',
                    lineHeight: 1.5, whiteSpace: 'pre-line',
                }}>
                    {sub}
                </div>

                {/* QR */}
                <div style={{
                    background: '#fff', borderRadius: 12,
                    padding: 8, border: `1px solid ${T.border}`,
                }}>
                    <TossQR
                        url={url}
                        size={140}
                        color="#000000"
                        accentColor={accent}
                    />
                </div>

                {/* URL */}
                <div style={{ fontSize: 9, color: T.gray, letterSpacing: 0.3 }}>
                    {SITE_URL.replace('https://', '')}/intro/{type}
                </div>
            </div>
        </div>
    );
}

export default function QRDownloadPage() {
    const sellerRef = useRef(null);
    const vendorRef = useRef(null);

    const handleDownload = useCallback(async (ref, name) => {
        if (!ref.current) return;
        // html2canvas가 없으면 이미지 fallback
        try {
            const mod = await import('html2canvas');
            const h2c = mod.default;
            const canvas = await h2c(ref.current, {
                scale: 3,
                backgroundColor: null,
                useCORS: true,
            });
            const link = document.createElement('a');
            link.download = `flit-card-${name}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch {
            alert('이미지를 길게 눌러 저장해주세요');
        }
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title="명함 QR 다운로드" back />

            <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: T.gray, lineHeight: 1.6 }}>
                    세로형 명함 디자인 (50 x 90mm)<br />
                    다운로드 후 인쇄소에 전달하세요
                </div>
            </div>

            {/* ── 셀러용 ── */}
            <div style={{ padding: '28px 20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <div style={{
                        background: T.blueLt, color: T.blue,
                        fontSize: 12, fontWeight: 700, padding: '4px 12px',
                        borderRadius: T.radiusFull,
                    }}>셀러용</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                    <BusinessCard type="seller" cardRef={sellerRef} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={() => handleDownload(sellerRef, 'seller')}
                        style={{
                            padding: '12px 32px', borderRadius: T.radiusFull,
                            background: T.blue, color: '#fff',
                            fontSize: 14, fontWeight: 700,
                            border: 'none', cursor: 'pointer',
                        }}
                    >
                        셀러용 PNG 다운로드
                    </button>
                </div>
            </div>

            {/* ── 주최사용 ── */}
            <div style={{ padding: '36px 20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <div style={{
                        background: T.greenLt, color: T.green,
                        fontSize: 12, fontWeight: 700, padding: '4px 12px',
                        borderRadius: T.radiusFull,
                    }}>주최사용</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                    <BusinessCard type="vendor" cardRef={vendorRef} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={() => handleDownload(vendorRef, 'vendor')}
                        style={{
                            padding: '12px 32px', borderRadius: T.radiusFull,
                            background: '#059669', color: '#fff',
                            fontSize: 14, fontWeight: 700,
                            border: 'none', cursor: 'pointer',
                        }}
                    >
                        주최사용 PNG 다운로드
                    </button>
                </div>
            </div>
        </div>
    );
}
