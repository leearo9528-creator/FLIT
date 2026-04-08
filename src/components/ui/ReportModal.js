'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Flag } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { createClient } from '@/utils/supabase/client';

const REASONS = [
    '스팸/광고/홍보',
    '욕설/비방/혐오 표현',
    '음란물/선정적인 내용',
    '허위 사실/사기 의심',
    '개인정보 노출',
    '도배/반복 게시',
    '기타',
];

const TARGET_LABEL = {
    recruitment: '모집공고',
    review: '리뷰',
    post: '게시글',
    post_comment: '댓글',
};

export default function ReportModal({ open, onClose, targetType, targetId }) {
    const router = useRouter();
    const [reason, setReason] = useState('');
    const [detail, setDetail] = useState('');
    const [submitting, setSubmitting] = useState(false);

    if (!open) return null;

    const handleSubmit = async () => {
        if (!reason) {
            alert('신고 사유를 선택해주세요.');
            return;
        }
        setSubmitting(true);
        const sb = createClient();
        const { data: { user } } = await sb.auth.getUser();
        if (!user) {
            alert('로그인이 필요해요.');
            setSubmitting(false);
            router.push('/login');
            return;
        }

        const { error } = await sb.from('reports').insert({
            reporter_id: user.id,
            target_type: targetType,
            target_id: targetId,
            reason,
            detail: detail.trim() || null,
        });

        setSubmitting(false);

        if (error) {
            if (error.code === '23505') {
                alert('이미 신고한 내용이에요.');
            } else {
                console.error('신고 실패:', error);
                alert('신고 접수에 실패했어요. 잠시 후 다시 시도해주세요.');
                return;
            }
        } else {
            alert('신고가 접수됐어요. 빠르게 검토할게요.');
        }

        setReason('');
        setDetail('');
        onClose();
    };

    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
    };

    return (
        <div
            onClick={handleBackdrop}
            style={{
                position: 'fixed', inset: 0, zIndex: 500,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    width: '100%', maxWidth: 430,
                    background: T.white,
                    borderTopLeftRadius: 20, borderTopRightRadius: 20,
                    padding: '20px 20px 28px',
                    maxHeight: '90vh', overflowY: 'auto',
                }}
            >
                {/* 헤더 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Flag size={18} color={T.red} />
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>
                            {TARGET_LABEL[targetType] || '콘텐츠'} 신고
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={submitting}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                    >
                        <X size={22} color={T.gray} />
                    </button>
                </div>

                <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.6, marginBottom: 16 }}>
                    신고 내용은 관리자가 검토한 뒤 처리돼요. 허위 신고는 제재될 수 있어요.
                </div>

                {/* 사유 선택 */}
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 8 }}>신고 사유</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                    {REASONS.map(r => {
                        const active = reason === r;
                        return (
                            <button
                                key={r}
                                onClick={() => setReason(r)}
                                style={{
                                    padding: '12px 14px',
                                    borderRadius: T.radiusMd,
                                    border: `1.5px solid ${active ? T.red : T.border}`,
                                    background: active ? T.redLt : T.white,
                                    color: active ? T.red : T.text,
                                    fontSize: 14,
                                    fontWeight: active ? 700 : 500,
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                }}
                            >
                                {r}
                            </button>
                        );
                    })}
                </div>

                {/* 상세 내용 */}
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 8 }}>
                    상세 내용 <span style={{ color: T.gray, fontWeight: 500 }}>(선택)</span>
                </div>
                <textarea
                    value={detail}
                    onChange={e => setDetail(e.target.value)}
                    placeholder="구체적인 상황을 알려주시면 검토에 도움돼요."
                    maxLength={500}
                    rows={4}
                    style={{
                        width: '100%', boxSizing: 'border-box',
                        padding: '12px 14px',
                        borderRadius: T.radiusMd,
                        border: `1.5px solid ${T.border}`,
                        background: T.bg,
                        fontSize: 14, color: T.text,
                        resize: 'none', outline: 'none',
                        fontFamily: 'inherit',
                        marginBottom: 4,
                    }}
                />
                <div style={{ fontSize: 11, color: T.gray, textAlign: 'right', marginBottom: 16 }}>
                    {detail.length} / 500
                </div>

                {/* 제출 */}
                <button
                    onClick={handleSubmit}
                    disabled={!reason || submitting}
                    style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: T.radiusMd,
                        border: 'none',
                        background: (!reason || submitting) ? T.border : T.red,
                        color: '#fff',
                        fontSize: 15,
                        fontWeight: 800,
                        cursor: (!reason || submitting) ? 'default' : 'pointer',
                        transition: 'background 0.15s',
                    }}
                >
                    {submitting ? '접수 중...' : '신고 접수'}
                </button>
            </div>
        </div>
    );
}
