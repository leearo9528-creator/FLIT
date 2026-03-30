'use client';

import { T } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';

const SECTIONS = [
    {
        emoji: '🎪',
        title: '행사 (Event)',
        content: `플릿의 가장 기본 단위예요. '서울밤도깨비야시장', '홍대 프리마켓' 같은 행사 브랜드가 등록되어 있어요.

같은 행사라도 날짜와 장소가 다르면 별도의 '개최 회차'로 관리돼요. 예를 들어 '홍대 프리마켓'이 4월 5일, 4월 12일에 열리면 각각 하나의 회차예요.

행사 상세 페이지에서 리뷰, 모집공고, 개최이력을 한눈에 확인할 수 있어요.`,
    },
    {
        emoji: '📋',
        title: '모집공고 (Recruitment)',
        content: `주최사가 셀러를 모집할 때 올리는 공고예요. 참가비, 부스 규격, 모집 마감일, 신청 방법 등이 포함돼요.

하나의 행사 회차에 하나의 공고가 연결돼요. 셀러 여러분은 공고를 보고 참가 여부를 결정하시면 됩니다.

마음에 드는 공고는 북마크(스크랩)해서 마이페이지에서 모아볼 수 있어요!`,
    },
    {
        emoji: '⭐',
        title: '리뷰 (Review)',
        content: `행사에 참가한 셀러가 작성하는 후기예요. 매출, 유동인구, 운영지원, 주최사 매너 등을 평가할 수 있어요.

리뷰를 1개 작성하면 1주일간 다른 셀러들의 리뷰를 모두 열람할 수 있어요. (매주 월요일 자정 리셋)

솔직한 리뷰가 쌓일수록 다음 행사를 선택할 때 더 좋은 판단을 할 수 있어요!`,
    },
    {
        emoji: '🏢',
        title: '주최사 (Organizer)',
        content: `행사를 기획하고 셀러를 모집하는 분이에요. 주최사 페이지에서 지금까지 개최한 행사 이력, 셀러 리뷰, 연락처 등을 확인할 수 있어요.

주최사로 등록하고 싶다면? 마이페이지 > 프로필 수정에서 역할을 '주최사'로 전환하면 바로 공고를 올릴 수 있어요!`,
    },
];

const TIPS = [
    '행사 찾기에서 관심 있는 공고를 북마크하세요',
    '행사 참가 후 리뷰를 작성하면 다른 리뷰를 열람할 수 있어요',
    '커뮤니티에서 다른 셀러들과 정보를 나눠보세요',
    '행사 양도/양수 게시판도 활용해보세요',
    '주최사라면 프로필에서 역할 전환 후 바로 공고를 올려보세요',
];

export default function GuidePage() {
    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title="플릿 이용 가이드" back />

            {/* 히어로 */}
            <div style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)',
                padding: '28px 20px', textAlign: 'center',
            }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📖</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 6 }}>
                    플릿은 이렇게 이용해요
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                    플리마켓·푸드트럭 셀러와 주최사를 연결하는 플랫폼
                </div>
            </div>

            {/* 구조 설명 */}
            <div style={{ padding: '20px 16px 0' }}>
                {SECTIONS.map((s, i) => (
                    <div key={i} style={{
                        background: T.white, borderRadius: T.radiusLg,
                        border: `1px solid ${T.border}`, padding: 20,
                        marginBottom: 12,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            <span style={{ fontSize: 28 }}>{s.emoji}</span>
                            <span style={{ fontSize: 17, fontWeight: 800, color: T.text }}>{s.title}</span>
                        </div>
                        <div style={{ fontSize: 14, color: T.textSub || '#4E5968', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                            {s.content}
                        </div>
                    </div>
                ))}

                {/* 흐름도 */}
                <div style={{
                    background: T.white, borderRadius: T.radiusLg,
                    border: `1px solid ${T.border}`, padding: 20, marginBottom: 12,
                    textAlign: 'center',
                }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 16 }}>서비스 흐름</div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        {[
                            { emoji: '🏢', label: '주최사가 행사를 기획' },
                            { emoji: '📋', label: '모집공고를 올려 셀러 모집' },
                            { emoji: '🛍️', label: '셀러가 공고를 보고 참가 신청' },
                            { emoji: '🎪', label: '행사 진행' },
                            { emoji: '⭐', label: '셀러가 리뷰 작성' },
                            { emoji: '📊', label: '리뷰로 다음 행사 판단' },
                        ].map((step, i, arr) => (
                            <div key={i}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    background: T.bg, borderRadius: 10, padding: '10px 16px',
                                    fontSize: 14, fontWeight: 600, color: T.text,
                                }}>
                                    <span style={{ fontSize: 20 }}>{step.emoji}</span>
                                    {step.label}
                                </div>
                                {i < arr.length - 1 && (
                                    <div style={{ fontSize: 18, color: T.gray, margin: '4px 0' }}>↓</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 이용 팁 */}
                <div style={{
                    background: T.blueLt, borderRadius: T.radiusLg,
                    border: `1px solid ${T.blue}30`, padding: 20, marginBottom: 20,
                }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.blue, marginBottom: 12 }}>💡 이용 팁</div>
                    {TIPS.map((tip, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: T.text, lineHeight: 1.6 }}>
                            <span style={{ color: T.blue, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                            {tip}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
