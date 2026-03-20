export const PLANS = [
    {
        key: 'free',
        label: '일반회원',
        badge: '무료',
        price: 0,
        priceLabel: '무료',
        color: '#6B7280',
        bgColor: '#F3F4F6',
        emoji: '👤',
        features: [
            '커뮤니티 글 열람',
            '모집공고 열람',
            '실시간 리뷰 열람',
            '리뷰 작성 무제한',
        ],
        locked: [
            '모집공고 지원',
            '셀러 전용 정보 열람',
            '우선 공고 알림',
        ],
    },
    {
        key: 'flea_market',
        label: '플리마켓',
        badge: '구독',
        price: 9900,
        priceLabel: '월 9,900원',
        color: '#3B82F6',
        bgColor: '#EFF6FF',
        emoji: '🛍️',
        features: [
            '일반회원 모든 혜택',
            '모집공고 무제한 지원',
            '리뷰 작성 무제한',
            '플리마켓 셀러 전용 정보',
            '신규 공고 우선 알림',
        ],
        locked: [
            '푸드트럭 전용 공고',
            '주최사 전용 대시보드',
        ],
    },
    {
        key: 'foodtruck',
        label: '푸드트럭',
        badge: '구독',
        price: 19900,
        priceLabel: '월 19,900원',
        color: '#10B981',
        bgColor: '#ECFDF5',
        emoji: '🚚',
        popular: true,
        features: [
            '플리마켓 모든 혜택',
            '푸드트럭 전용 공고',
            '매출·집객 분석 데이터',
            '주최사 평판 상세 열람',
            '전용 채널 우선 지원',
        ],
        locked: [
            '주최사 전용 대시보드',
        ],
    },
    {
        key: 'organizer',
        label: '주최사',
        badge: '별도문의',
        price: 99000,
        priceLabel: '월 99,000원',
        color: '#F59E0B',
        bgColor: '#FFFBEB',
        emoji: '🏢',
        contact: true,
        features: [
            '셀러 모집공고 등록',
            '지원자 관리 대시보드',
            '행사 홍보 페이지',
            '셀러 리뷰 분석 리포트',
            '전담 매니저 배정',
            '우선 노출 (행사찾기 상단)',
        ],
        locked: [],
    },
];

export const PLAN_MAP = Object.fromEntries(PLANS.map(p => [p.key, p]));

export function getPlan(key) {
    return PLAN_MAP[key] ?? PLAN_MAP['free'];
}

/**
 * 리뷰 상세 내용 열람 가능 여부
 * - free: 불가
 * - flea_market: 일반셀러(seller) 리뷰만 가능
 * - foodtruck: 모든 리뷰 가능
 * - organizer: 모든 리뷰 가능
 */
export function canViewReviewDetail(plan, sellerType) {
    if (plan === 'foodtruck' || plan === 'organizer') return true;
    if (plan === 'flea_market') return sellerType !== 'foodtruck';
    return false; // free
}
