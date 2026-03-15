export function calcRating(event) {
    if (!event) return '0.0';
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
