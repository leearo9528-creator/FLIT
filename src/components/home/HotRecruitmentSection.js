'use client';

import Link from 'next/link';
import { T } from '@/lib/design-tokens';
import { formatDate } from '@/lib/helpers';

function RecruitmentCard({ rec }) {
    const inst = rec.instance || {};
    const ev   = inst.base_event || {};
    const org  = inst.organizer || {};
    const daysLeft = rec.end_date
        ? Math.ceil((new Date(rec.end_date) - Date.now()) / 86400000)
        : null;
    const isUrgent = daysLeft !== null && daysLeft <= 3 && daysLeft >= 0;
    const feeText = rec.fee == null ? '참가비 미정' : rec.fee === 0 ? '무료' : `${Number(rec.fee).toLocaleString()}원`;

    return (
        <Link href={`/recruitments/${rec.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: '14px 16px',
                border: `1px solid ${isUrgent ? T.red + '40' : T.border}`,
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, background: T.greenLt, color: T.green, padding: '2px 7px', borderRadius: 4 }}>모집중</span>
                        {org.name && (
                            <span style={{ fontSize: 11, color: T.textSub }}>
                                <span style={{ color: T.gray }}>주최사 </span>{org.name}
                            </span>
                        )}
                    </div>
                    {daysLeft !== null && daysLeft >= 0 && (
                        <span style={{ fontSize: 11, fontWeight: 800, color: isUrgent ? T.red : T.gray }}>
                            {daysLeft === 0 ? 'D-Day' : `D-${daysLeft}`}
                        </span>
                    )}
                </div>

                <div style={{
                    fontSize: 15, fontWeight: 800, color: T.text, lineHeight: 1.4, marginBottom: 8,
                    display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                    {rec.title || ev.name || '-'}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: T.blue }}>{feeText}</span>
                    {inst.location && (
                        <span style={{ fontSize: 12, color: T.gray, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            📍 {inst.location}
                        </span>
                    )}
                    {inst.event_date && (
                        <span style={{ fontSize: 12, color: T.gray }}>
                            🗓 {formatDate(inst.event_date)}{inst.event_date_end && inst.event_date_end !== inst.event_date ? ` ~ ${formatDate(inst.event_date_end)}` : ''}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default function HotRecruitmentSection({ recruitments }) {
    return (
        <div style={{ marginBottom: 24 }}>
            <div style={{
                padding: '0 16px 10px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>🔥 모집 중인 공고</div>
                <Link href="/search" style={{ fontSize: 13, color: T.blue, fontWeight: 600, textDecoration: 'none' }}>전체보기 →</Link>
            </div>
            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {recruitments.length === 0
                    ? <div style={{ textAlign: 'center', padding: '24px 0', color: T.gray, fontSize: 14 }}>현재 모집 중인 공고가 없어요.</div>
                    : recruitments.map(r => <RecruitmentCard key={r.id} rec={r} />)
                }
            </div>
        </div>
    );
}
