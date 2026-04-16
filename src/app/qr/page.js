'use client';

import { useRef, useCallback } from 'react';
import { T } from '@/lib/design-tokens';
import TossQR from '@/components/ui/TossQR';
import TopBar from '@/components/ui/TopBar';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.flitunion.com';

const CARD_W = 300;
const CARD_H = 540;

/* ═══════════════════════════════════════════
   앞면 — 메인카피 + QR 코드
   ═══════════════════════════════════════════ */
function CardFront({ type, cardRef }) {
    const isSeller = type === 'seller';
    const gradient = isSeller
        ? `linear-gradient(180deg, ${T.blue} 0%, ${T.blueDark} 100%)`
        : 'linear-gradient(180deg, #059669 0%, #0D9488 100%)';
    const accent = isSeller ? T.blue : '#059669';
    const headline = isSeller ? '행사 찾기,\n이제 플릿 하나로' : '셀러 모집,\n플릿에서 한번에';
    const url = `${SITE_URL}/intro/${type}`;

    return (
        <div ref={cardRef} style={{
            width: CARD_W, height: CARD_H,
            borderRadius: 16, overflow: 'hidden',
            background: gradient,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'space-between',
            padding: '36px 24px 32px',
            position: 'relative', flexShrink: 0,
        }}>
            {/* 장식 */}
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ position: 'absolute', top: '40%', right: -40, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

            {/* 상단: 로고 + 카피 */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 24 }}>
                    <span style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>플릿</span>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', display: 'inline-block' }} />
                </div>
                <div style={{
                    fontSize: 24, fontWeight: 900, color: '#fff',
                    lineHeight: 1.4, whiteSpace: 'pre-line', letterSpacing: -0.5,
                }}>
                    {headline}
                </div>
            </div>

            {/* 하단: QR */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
                <div style={{
                    background: '#fff', borderRadius: 14,
                    padding: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}>
                    <TossQR
                        url={url}
                        size={150}
                        color="#000000"
                        accentColor={accent}
                    />
                </div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.3 }}>
                    QR 스캔으로 바로 접속
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   뒷면 — 서비스 소개 + 대표 정보
   ═══════════════════════════════════════════ */
function CardBack({ type, cardRef }) {
    const isSeller = type === 'seller';
    const accent = isSeller ? T.blue : '#059669';
    const features = isSeller
        ? [
            { icon: '📋', text: '전국 모집공고 한눈에' },
            { icon: '⭐', text: '셀러 리뷰 (매출·방문객)' },
            { icon: '💬', text: '셀러 커뮤니티' },
            { icon: '🆓', text: '가입부터 열람까지 무료' },
        ]
        : [
            { icon: '📝', text: '무료 공고 등록 · 즉시 게시' },
            { icon: '🎯', text: '셀러에게 직접 도달' },
            { icon: '🏢', text: '주최사 브랜드 프로필' },
            { icon: '📊', text: '리뷰로 행사 신뢰 구축' },
        ];

    return (
        <div ref={cardRef} style={{
            width: CARD_W, height: CARD_H,
            borderRadius: 16, overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '32px 24px 28px',
            position: 'relative', flexShrink: 0,
        }}>
            {/* 상단: 로고 + 태그라인 */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: T.text, letterSpacing: -0.5 }}>플릿</span>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, display: 'inline-block' }} />
                </div>
                <div style={{ fontSize: 10, color: T.gray, marginBottom: 24 }}>
                    플리마켓 · 팝업스토어 셀러를 위한 행사 정보 플랫폼
                </div>

                {/* 구분선 */}
                <div style={{ height: 1, background: T.border, marginBottom: 20 }} />

                {/* 기능 리스트 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {features.map((f, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 18 }}>{f.icon}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{f.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 하단: URL */}
            <div>
                <div style={{ height: 1, background: T.border, marginBottom: 16 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{ fontSize: 10, color: T.gray }}>
                        <span style={{ color: T.textSub, fontWeight: 600 }}>W</span>&nbsp;&nbsp;app.flitunion.com
                    </div>
                    <div style={{ fontSize: 10, color: T.gray }}>
                        <span style={{ color: T.textSub, fontWeight: 600 }}>H</span>&nbsp;&nbsp;flitunion.com
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   페이지
   ═══════════════════════════════════════════ */
export default function QRDownloadPage() {
    const sellerFrontRef = useRef(null);
    const sellerBackRef = useRef(null);
    const vendorFrontRef = useRef(null);
    const vendorBackRef = useRef(null);

    const handleDownload = useCallback(async (ref, name) => {
        if (!ref.current) return;
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

    const cardTypes = [
        {
            type: 'seller', label: '셀러용', color: T.blue, bgLt: T.blueLt,
            frontRef: sellerFrontRef, backRef: sellerBackRef,
        },
        {
            type: 'vendor', label: '주최사용', color: '#059669', bgLt: T.greenLt,
            frontRef: vendorFrontRef, backRef: vendorBackRef,
        },
    ];

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title="명함 디자인" back />

            <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: T.gray, lineHeight: 1.6 }}>
                    세로형 명함 앞뒤 디자인 (50 x 90mm)<br />
                    다운로드 후 인쇄소에 전달하세요
                </div>
            </div>

            {cardTypes.map((ct) => (
                <div key={ct.type} style={{ padding: '28px 20px 0' }}>
                    {/* 라벨 */}
                    <div style={{
                        display: 'inline-block', background: ct.bgLt, color: ct.color,
                        fontSize: 12, fontWeight: 700, padding: '4px 12px',
                        borderRadius: T.radiusFull, marginBottom: 20,
                    }}>
                        {ct.label}
                    </div>

                    {/* 앞뒤 카드 */}
                    <div style={{
                        display: 'flex', gap: 16, justifyContent: 'center',
                        flexWrap: 'wrap', marginBottom: 8,
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 10, color: T.gray, fontWeight: 600, marginBottom: 8 }}>앞면</div>
                            <CardFront type={ct.type} cardRef={ct.frontRef} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 10, color: T.gray, fontWeight: 600, marginBottom: 8 }}>뒷면</div>
                            <CardBack type={ct.type} cardRef={ct.backRef} />
                        </div>
                    </div>

                    {/* 다운로드 버튼 */}
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
                        <button
                            onClick={() => handleDownload(ct.frontRef, `${ct.type}-front`)}
                            style={{
                                padding: '11px 24px', borderRadius: T.radiusFull,
                                background: ct.color, color: '#fff',
                                fontSize: 13, fontWeight: 700,
                                border: 'none', cursor: 'pointer',
                            }}
                        >
                            앞면 다운로드
                        </button>
                        <button
                            onClick={() => handleDownload(ct.backRef, `${ct.type}-back`)}
                            style={{
                                padding: '11px 24px', borderRadius: T.radiusFull,
                                background: T.white, color: ct.color,
                                fontSize: 13, fontWeight: 700,
                                border: `1.5px solid ${ct.color}`, cursor: 'pointer',
                            }}
                        >
                            뒷면 다운로드
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
