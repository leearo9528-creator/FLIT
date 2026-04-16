'use client';

import Link from 'next/link';
import { T } from '@/lib/design-tokens';

const FEATURES = [
    {
        icon: '📋',
        title: '모집공고 한눈에',
        desc: '전국 플리마켓 · 팝업 · 푸드트럭\n공고를 한 곳에서 확인하세요.',
    },
    {
        icon: '⭐',
        title: '셀러 리뷰',
        desc: '매출 · 방문객 · 운영지원\n참여한 셀러의 솔직한 후기.',
    },
    {
        icon: '💬',
        title: '셀러 커뮤니티',
        desc: '실시간 현황 · 양도양수 · 자유게시판\n셀러끼리 정보를 나눠요.',
    },
    {
        icon: '🆓',
        title: '전부 무료',
        desc: '가입부터 공고 열람까지\n비용이 전혀 들지 않아요.',
    },
];

const PAIN_POINTS = [
    { before: '카페 · 블로그 돌아다니며 행사 찾기', after: '플릿에서 공고 한번에 검색' },
    { before: '후기 없이 불안하게 참가 신청', after: '실제 셀러 리뷰 확인 후 결정' },
    { before: '혼자서 정보 수집', after: '커뮤니티에서 셀러끼리 공유' },
];

const STEPS = [
    { num: '1', text: '카카오 / 구글로 3초 가입' },
    { num: '2', text: '관심 공고 검색 & 스크랩' },
    { num: '3', text: '참가 후 리뷰 작성 → 전체 리뷰 열람' },
];

export default function IntroSellerPage() {
    return (
        <div style={{ minHeight: '100vh', background: T.white }}>

            {/* ── 히어로 ── */}
            <section style={{
                background: `linear-gradient(135deg, ${T.blue} 0%, ${T.blueDark} 100%)`,
                padding: '52px 24px 44px',
                textAlign: 'center',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* 장식 원 */}
                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

                <div style={{
                    display: 'inline-block', background: 'rgba(255,255,255,0.2)',
                    padding: '5px 14px', borderRadius: T.radiusFull,
                    fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 16,
                }}>
                    셀러를 위한 행사 플랫폼
                </div>
                <div style={{
                    fontSize: 26, fontWeight: 900, color: '#fff',
                    lineHeight: 1.35, marginBottom: 12, letterSpacing: -0.5,
                }}>
                    행사 찾기,<br />이제 플릿 하나로
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 28 }}>
                    플리마켓 · 팝업 · 푸드트럭<br />
                    공고 · 리뷰 · 커뮤니티를 한 곳에서
                </div>
                <Link href="/login" style={{
                    display: 'inline-block', background: '#fff', color: T.blue,
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
                        플릿이 해결해드려요
                    </div>
                    <div style={{ fontSize: 13, color: T.gray, marginTop: 6 }}>셀러에게 필요한 기능만 담았어요</div>
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

            {/* ── Before → After (전환 유도) ── */}
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
                                    background: T.blueLt, color: T.blue,
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
                    <div style={{ fontSize: 13, color: T.gray, marginTop: 6 }}>복잡한 가입 절차 없어요</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {STEPS.map((s, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 16,
                            background: T.bg, borderRadius: T.radiusLg, padding: '18px 20px',
                        }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
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

            {/* ── 리뷰 열람 안내 (차별화 포인트) ── */}
            <section style={{
                margin: '0 20px', padding: '24px 20px',
                background: T.blueLt, borderRadius: T.radiusLg,
                border: `1px solid ${T.blue}25`,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 20 }}>💡</span>
                    <span style={{ fontSize: 15, fontWeight: 800, color: T.blue }}>리뷰 열람 시스템</span>
                </div>
                <div style={{ fontSize: 13, color: T.text, lineHeight: 1.7 }}>
                    리뷰 <strong>1개만 작성</strong>하면 <strong>1주일간</strong> 다른 셀러들의
                    매출 · 방문객 · 솔직 후기를 전부 열람할 수 있어요.
                    <br /><span style={{ color: T.gray }}>매주 월요일 자정 리셋</span>
                </div>
            </section>

            {/* ── 최종 CTA ── */}
            <section style={{ padding: '44px 20px 60px', textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: T.text, lineHeight: 1.4, marginBottom: 8, letterSpacing: -0.5 }}>
                    지금 바로 시작하세요
                </div>
                <div style={{ fontSize: 13, color: T.gray, marginBottom: 24 }}>
                    가입도 열람도 전부 무료예요
                </div>
                <Link href="/login" style={{
                    display: 'inline-block',
                    background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
                    color: '#fff', padding: '16px 48px', borderRadius: T.radiusFull,
                    fontSize: 16, fontWeight: 800, textDecoration: 'none',
                    boxShadow: T.shadowMd,
                }}>
                    무료 회원가입
                </Link>
                <div style={{ marginTop: 16 }}>
                    <Link href="/" style={{ fontSize: 13, color: T.blue, fontWeight: 600, textDecoration: 'none' }}>
                        먼저 둘러볼게요 →
                    </Link>
                </div>
            </section>
        </div>
    );
}
