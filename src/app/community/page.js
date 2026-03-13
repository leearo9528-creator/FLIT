'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, PenLine } from 'lucide-react';
import { T } from '@/lib/design-tokens';

/* ─── Mock data ─────────────────────────────────────────────── */
const MOCK_POSTS = {
    '실시간 현황': [
        {
            id: 1, sellerType: 'foodtruck', location: '여의도 한강',
            title: '여의도 오늘 자리 잡았어요! 팟타이 특가 이벤트 중',
            summary: '드디어 자리 잡았습니다 🎉 오늘 팟타이 6,000원에 팔아요. 날씨 좋으니 많이 와주세요!',
            likes: 18, comments: 6, time: '5분 전',
        },
        {
            id: 2, sellerType: 'seller', location: '성수동',
            title: '성수 팝업 현황 — 오전 11시 기준 매출 중간 점검',
            summary: '오전에만 35만원 찍었어요. 예상보다 잘 팔리는 아이템은 키링이랑 파우치입니다.',
            likes: 32, comments: 11, time: '23분 전',
        },
        {
            id: 3, sellerType: 'foodtruck', location: '홍대 걷고싶은거리',
            title: '홍대 오후 3시 현재 웨이팅 없음! 붕어빵 가판대',
            summary: '점심 피크 지나고 한산해졌어요. 오후에 오시면 바로 받아가실 수 있어요 😊',
            likes: 9, comments: 3, time: '1시간 전',
        },
        {
            id: 4, sellerType: 'seller', location: '잠실 석촌호수',
            title: '석촌호수 벚꽃 시즌 대박났다 진짜로',
            summary: '어제 역대 최고 매출 갱신했어요. 핸드메이드 엽서가 특히 잘 나갔고, 사람이 너무 많아서 체력이 바닥났습니다 ㅋㅋ',
            likes: 55, comments: 22, time: '2시간 전',
        },
    ],
    '자유게시판': [
        {
            id: 5, sellerType: 'seller',
            title: '처음 플리마켓 나가는데 필수 준비물 알려주세요',
            summary: '다음 달에 첫 출전이에요. 선배 셀러분들 필수 준비물이나 팁 좀 알려주시면 너무 감사할 것 같아요 🙏',
            likes: 14, comments: 28, time: '30분 전',
        },
        {
            id: 6, sellerType: 'foodtruck',
            title: '푸드트럭 허가증 갱신 절차 바뀐 거 아세요?',
            summary: '작년이랑 서류가 달라진 것 같던데, 혹시 최근에 갱신하신 분 계신가요? 구청마다 다르다는 얘기도 있어서...',
            likes: 7, comments: 15, time: '1시간 전',
        },
        {
            id: 7, sellerType: 'seller',
            title: '카드 단말기 추천 — 수수료 낮은 곳 비교해봤어요',
            summary: '토스, 카카오페이, 나이스페이 수수료 직접 비교해봤습니다. 결론은 연 매출 기준으로 갈리더라고요.',
            likes: 41, comments: 19, time: '3시간 전',
        },
        {
            id: 8, sellerType: 'foodtruck',
            title: '비 오는 날 매출 어떻게들 관리하세요?',
            summary: '오늘 같은 날 그냥 쉬어야 하나 vs 그래도 나가야 하나 고민중이에요. 비 맞으면서 나가봐야 본전도 못 뽑을 것 같고.',
            likes: 22, comments: 34, time: '5시간 전',
        },
    ],
    '질문/답변': [
        {
            id: 9, sellerType: 'seller',
            title: '재고 관리 앱 추천 받습니다',
            summary: '엑셀로 하다가 한계가 왔어요 ㅠ 소규모 핸드메이드 셀러에게 맞는 재고 관리 앱 있으면 알려주세요.',
            likes: 5, comments: 8, time: '2시간 전',
        },
        {
            id: 10, sellerType: 'foodtruck',
            title: '영업신고증 없으면 플리마켓 못 나가나요?',
            summary: '주최 측에서 서류 요청하는 경우가 있다고 들었는데, 없으면 무조건 탈락인가요?',
            likes: 3, comments: 12, time: '4시간 전',
        },
    ],
};

/* ─── Sub-components ────────────────────────────────────────── */
function SellerBadge({ type }) {
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

function LocationTag({ location }) {
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

/* ─── Page ───────────────────────────────────────────────────── */
export default function CommunityPage() {
    const router = useRouter();
    const [tab, setTab] = useState('실시간 현황');
    const [scrolled, setScrolled] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

    const tabs = ['실시간 현황', '자유게시판', '질문/답변'];
    const isLive = tab === '실시간 현황';
    const posts = MOCK_POSTS[tab] || [];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
            if (window.scrollY > 60) setShowTooltip(false);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 110 }}>

            {/* ── Sticky Header ── */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(16px)',
                borderBottom: `1px solid ${T.border}`,
                transition: 'padding 0.25s ease',
                padding: scrolled ? '10px 20px 0' : '18px 20px 0',
            }}>
                {/* Title area — collapses on scroll */}
                <div style={{
                    overflow: 'hidden',
                    transition: 'max-height 0.25s ease, opacity 0.2s ease',
                    maxHeight: scrolled ? 0 : 64,
                    opacity: scrolled ? 0 : 1,
                }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: T.text, letterSpacing: -0.5 }}>
                        커뮤니티 💬
                    </div>
                    <div style={{ fontSize: 13, color: T.gray, marginTop: 3, paddingBottom: 12 }}>
                        셀러들과 소통하고 정보를 나누세요
                    </div>
                </div>

                {/* Tab bar */}
                <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {tabs.map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{
                            padding: '12px 16px',
                            fontSize: 14, fontWeight: tab === t ? 800 : 500,
                            color: tab === t ? T.blue : T.gray,
                            background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                            borderBottom: tab === t ? `2.5px solid ${T.blue}` : '2.5px solid transparent',
                            transition: 'all 0.15s',
                        }}>
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Post list ── */}
            <div style={{ padding: '16px 16px 0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {posts.map(post => (
                        <div key={post.id} onClick={() => router.push(`/community/${post.id}`)} style={{
                            background: T.white, borderRadius: T.radiusLg,
                            border: `1px solid ${T.border}`,
                            padding: '14px 16px', cursor: 'pointer',
                            boxShadow: T.shadowSm,
                        }}>
                            {/* Badges */}
                            <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                                <SellerBadge type={post.sellerType} />
                                {isLive && post.location && <LocationTag location={post.location} />}
                            </div>

                            {/* Title */}
                            <div style={{
                                fontSize: 16, fontWeight: 700, color: T.text,
                                marginBottom: 5, lineHeight: 1.4,
                                display: '-webkit-box', WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical', overflow: 'hidden',
                            }}>
                                {post.title}
                            </div>

                            {/* Summary */}
                            <div style={{
                                fontSize: 14, color: T.textSub, lineHeight: 1.6,
                                display: '-webkit-box', WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                marginBottom: 12,
                            }}>
                                {post.summary}
                            </div>

                            {/* Activity indicators */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: T.gray }}>
                                    <Heart size={12} /> {post.likes}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: T.gray }}>
                                    <MessageCircle size={12} /> {post.comments}
                                </span>
                                <span style={{ marginLeft: 'auto', fontSize: 12, color: T.gray }}>
                                    {post.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── FAB + Tooltip ── */}
            <div style={{
                position: 'fixed', bottom: 90, right: 20, zIndex: 200,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10,
            }}>
                {/* Tooltip */}
                <div style={{
                    background: T.text, color: '#fff',
                    fontSize: 13, fontWeight: 600,
                    padding: '9px 14px', borderRadius: T.radiusMd,
                    boxShadow: T.shadowMd, whiteSpace: 'nowrap',
                    opacity: showTooltip ? 1 : 0,
                    transform: showTooltip ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    pointerEvents: 'none',
                    position: 'relative',
                }}>
                    리뷰 3개 쓰면 첫 달 0원! ✨
                    <div style={{
                        position: 'absolute', bottom: -6, right: 22,
                        width: 12, height: 6,
                        clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                        background: T.text,
                    }} />
                </div>

                {/* FAB */}
                <button
                    onClick={() => router.push('/community/write')}
                    style={{
                        width: 56, height: 56, borderRadius: '50%',
                        background: T.blue, border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: T.shadowLg,
                        transition: 'transform 0.15s',
                    }}
                >
                    <PenLine size={22} color="#fff" />
                </button>
            </div>

            <style jsx global>{`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
