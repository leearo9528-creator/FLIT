export function calcRating(event) {
    if (!event) return '0.0';
    if (event.avg_event_rating) return parseFloat(event.avg_event_rating).toFixed(1);
    if (event.avg_rating) return parseFloat(event.avg_rating).toFixed(1);
    if (event.average_profit && event.average_traffic)
        return ((event.average_profit + event.average_traffic) / 2).toFixed(1);
    return '0.0';
}

export function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return '방금 전';
    if (mins < 60) return `${mins}분 전`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}일 전`;
    return new Date(dateStr).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
}

export function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
}

// D-Day 계산. 반환: { label: 'D-3', urgent: true } | null (마감없음)
export function calcDDay(dateStr) {
    if (!dateStr) return null;
    const diff = Math.ceil((new Date(dateStr) - Date.now()) / 86400000);
    if (diff < 0) return { label: '마감', urgent: false };
    if (diff === 0) return { label: 'D-Day', urgent: true };
    return { label: `D-${diff}`, urgent: diff <= 3 };
}

// 리뷰 항목별 별점 배열 → 종합 평균 (0이면 0.0)
export function calcOverallRating(review) {
    const scores = [
        review.rating_profit, review.rating_traffic,
        review.rating_promotion, review.rating_support, review.rating_manners,
    ].filter(v => v != null);
    return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
}
