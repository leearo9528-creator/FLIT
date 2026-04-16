'use client';

import Link from 'next/link';
import { T } from '@/lib/design-tokens';

const FEATURES = [
    {
        icon: '📝',
        title: '무료 공고 등록',
        desc: '작성 즉시 게시\n승인 대기 없이 바로 셀러에게 노출.',
    },
    {
        icon: '🎯',
        title: '타겟 셀러 도달',
        desc: '플리마켓 · 푸드트럭 셀러에게\n공고가 직접 노출돼요.',
    },
    {
        icon: '🏢',
        title: '주최사 프로필',
        desc: '브랜드 페이지 자동 생성\n개최이력 · 리뷰가 쌓여요.',
    },
    {
        icon: '📊',
        title: '리뷰로 신뢰 구축',
        desc: '셀러 리뷰가 쌓일수록\n다음 모집이 쉬워져요.',
    },
];

const PAIN_POINTS = [
    { before: 'SNS 홍보만으로 셀러 모집 부족', after: '플릿에서 셀러에게 직접 도달' },
    { before: '매번 새 채널에 공고 반복 게시', after: '한 번 등록이면 지속 노출' },
    { before: '행사 이력 관리가 흩어져 있음', after: '주최사 프로필에 자동 정리' },
];

const STEPS = [
    { num: '1', text: '카카오 / 구글로 3초 가입' },
    { num: '2', text: '프로필에서 역할을 주최사로 전환' },
    { num: '3', text: '공고 작성 → 즉시 게시 완료' },
];

export default function IntroVendorPage() {
    return (
        <div style={{ minHeight: '100vh', background: T.white }}>

            {/* ── 히어로 ── */}
            <section style={{
                background: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
                padding: '52px 24px 44px',
                textAlign: 'center',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

                <div style={{
                    display: 'inline-block', background: 'rgba(255,255,255,0.2)',
                    padding: '5px 14px', borderRadius: T.radiusFull,
                    fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 16,
                }}>
                    주최사를 위한 셀러 모집 플랫폼
                </div>
                <div style={{
                    fontSize: 26, fontWeight: 900, color: '#fff',
                    lineHeight: 1.35, marginBottom: 12, letterSpacing: -0.5,
                }}>
                    셀러 모집,<br />플릿에서 한번에
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 28 }}>
                    공고 등록부터 셀러 모집까지<br />
                    무료로, 빠르게, 간편하게
                </div>
                <Link href="/login" style={{
                    display: 'inline-block', background: '#fff', color: '#059669',
                    padding: '14px 36px', borderRadius: T.radiusFull,
                    fontSize: 15, fontWeight: 800, textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}>
                    무료로 시작하기
                </Link>
            </section>

            {/* ── 핵심 기능 4가지 ── */}
            <section style={{ padding: '40px 20px 32px' }}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div style={{ fontSize: 19, fontWeight: 900, color: T.text, letterSpacing: -0.5 }}>
                        플릿이 모집을 도와드려요
                    </div>
                    <div style={{ fontSize: 13, color: T.gray, marginTop: 6 }}>주최사에게 필요한 기능만 담았어요</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {FEATURES.map((f, i) => (
                        <div key={i} style={{
                            background: T.bg, borderRadius: T.radiusLg,
                            padding: '22px 16px', textAlign: 'center',
                        }}>
                            <div style={{ fontSize: 32, marginBottom: 10 }}>{f.icon}</div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 6 }}>{f.title}</div>
                            <div style={{ fontSize: 12, color: T.gray, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{f.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Before → After ── */}
            <section style={{ padding: '32px 20px', background: T.bg }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{ fontSize: 19, fontWeight: 900, color: T.text, letterSpacing: -0.5 }}>
                        이런 고민, 있지 않나요?
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {PAIN_POINTS.map((p, i) => (
                        <div key={i} style={{
                            background: T.white, borderRadius: T.radiusLg,
                            padding: '18px 16px', border: `1px solid ${T.border}`,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                <span style={{
                                    background: T.redLt, color: T.red,
                                    fontSize: 11, fontWeight: 700, padding: '2px 8px',
                                    borderRadius: T.radiusFull,
                                }}>Before</span>
                                <span style={{ fontSize: 13, color: T.gray }}>{p.before}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{
                                    background: T.greenLt, color: T.green,
                                    fontSize: 11, fontWeight: 700, padding: '2px 8px',
                                    borderRadius: T.radiusFull,
                                }}>After</span>
                                <span style={{ fontSize: 13, color: T.text, fontWeight: 700 }}>{p.after}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 시작 3단계 ── */}
            <section style={{ padding: '40px 20px 32px' }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{ fontSize: 19, fontWeight: 900, color: T.text, letterSpacing: -0.5 }}>
                        3단계면 끝
                    </div>
                    <div style={{ fontSize: 13, color: T.gray, marginTop: 6 }}>승인 대기 없이 즉시 전환돼요</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {STEPS.map((s, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 16,
                            background: T.bg, borderRadius: T.radiusLg, padding: '18px 20px',
                        }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #059669, #0D9488)',
                                color: '#fff', fontSize: 16, fontWeight: 900,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                {s.num}
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, lineHeight: 1.5 }}>
                                {s.text}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 무료 강조 배너 ── */}
            <section style={{
                margin: '0 20px', padding: '24px 20px',
                background: T.greenLt, borderRadius: T.radiusLg,
                border: `1px solid ${T.green}25`,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 20 }}>💰</span>
                    <span style={{ fontSize: 15, fontWeight: 800, color: T.green }}>완전 무료</span>
                </div>
                <div style={{ fontSize: 13, color: T.text, lineHeight: 1.7 }}>
                    공고 등록 · 주최사 전환 · 프로필 관리 모두 <strong>무료</strong>예요.
                    <br />별도 요금이나 수수료가 없습니다.
                </div>
            </section>

            {/* ── 최종 CTA ── */}
            <section style={{ padding: '44px 20px 60px', textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: T.text, lineHeight: 1.4, marginBottom: 8, letterSpacing: -0.5 }}>
                    지금 바로 시작하세요
                </div>
                <div style={{ fontSize: 13, color: T.gray, marginBottom: 24 }}>
                    가입 후 바로 공고를 올릴 수 있어요
                </div>
                <Link href="/login" style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #059669, #0D9488)',
                    color: '#fff', padding: '16px 48px', borderRadius: T.radiusFull,
                    fontSize: 16, fontWeight: 800, textDecoration: 'none',
                    boxShadow: T.shadowMd,
                }}>
                    무료 회원가입
                </Link>
                <div style={{ marginTop: 16 }}>
                    <Link href="/" style={{ fontSize: 13, color: '#059669', fontWeight: 600, textDecoration: 'none' }}>
                        먼저 둘러볼게요 →
                    </Link>
                </div>
            </section>
        </div>
    );
}
