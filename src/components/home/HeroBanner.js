'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';

const BANNERS = [
    {
        id: 1,
        gradient: `linear-gradient(135deg, ${T.blue} 0%, ${T.blueDark} 100%)`,
        tag: '🎁 첫 달 혜택',
        title: '리뷰 3개 쓰고\n첫 달 구독료 0원',
        sub: '지금 바로 리뷰를 작성하고 무료 혜택을 받아보세요',
        cta: '리뷰 작성하러 가기',
        href: '/reviews/write',
    },
    {
        id: 2,
        gradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
        tag: '📊 수익 데이터',
        title: '수익성 높은 행사\n한눈에 비교하기',
        sub: '셀러들의 실제 수익 데이터를 확인하세요',
        cta: '행사 찾아보기',
        href: '/search',
    },
    {
        id: 3,
        gradient: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
        tag: '🏢 행사 개최 문의',
        title: '행사 개최\n전문가에게 맡기세요',
        sub: '관공서 · 기업 · 단체 등 모든 행사 개최 의뢰를 받습니다',
        cta: '개최 문의하기',
        href: '/contact',
    },
];

export default function HeroBanner() {
    const router = useRouter();
    const [idx, setIdx] = useState(0);
    const timerRef = useRef(null);
    const touchStartX = useRef(null);

    const resetTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => setIdx(i => (i + 1) % BANNERS.length), 4000);
    };

    useEffect(() => {
        timerRef.current = setInterval(() => setIdx(i => (i + 1) % BANNERS.length), 4000);
        return () => clearInterval(timerRef.current);
    }, []);

    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            setIdx(i => (i + (diff > 0 ? 1 : -1) + BANNERS.length) % BANNERS.length);
            resetTimer();
        }
        touchStartX.current = null;
    };

    const b = BANNERS[idx];

    return (
        <div style={{ padding: '0 16px 16px' }}>
            <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={() => router.push(b.href)}
                style={{
                    background: b.gradient, borderRadius: T.radiusXl,
                    padding: '20px 20px 16px', cursor: 'pointer',
                    position: 'relative', overflow: 'hidden',
                    userSelect: 'none', minHeight: 168,
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}
            >
                <div style={{
                    position: 'absolute', top: -30, right: -30,
                    width: 120, height: 120, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.10)',
                }} />
                <div style={{
                    position: 'absolute', bottom: -20, right: 20,
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.07)',
                }} />

                <div style={{
                    display: 'inline-block', background: 'rgba(255,255,255,0.25)',
                    padding: '3px 9px', borderRadius: T.radiusFull,
                    fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 8,
                }}>
                    {b.tag}
                </div>

                <div style={{
                    fontSize: 20, fontWeight: 900, color: '#fff',
                    lineHeight: 1.35, whiteSpace: 'pre-line', marginBottom: 6,
                }}>
                    {b.title}
                </div>

                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginBottom: 12, lineHeight: 1.55 }}>
                    {b.sub}
                </div>

                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'rgba(255,255,255,0.20)', borderRadius: T.radiusFull,
                    padding: '7px 14px', fontSize: 12, fontWeight: 700, color: '#fff',
                }}>
                    {b.cta} →
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                    {BANNERS.map((_, i) => (
                        <div
                            key={i}
                            onClick={e => { e.stopPropagation(); setIdx(i); resetTimer(); }}
                            style={{
                                width: i === idx ? 20 : 6, height: 6, borderRadius: 3,
                                background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)',
                                transition: 'width 0.3s ease, background 0.3s ease',
                                cursor: 'pointer',
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
