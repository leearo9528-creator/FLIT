'use client';

import Link from 'next/link';
import { T } from '@/lib/design-tokens';
import { formatDate, formatFee } from '@/lib/helpers';

function RecruitmentCard({ rec }) {
    const inst = rec.instance || {};
    const org  = inst.organizer || {};
    const daysLeft = rec.end_date ? Math.ceil((new Date(rec.end_date) - Date.now()) / 86400000) : null;
    const isUrgent = daysLeft !== null && daysLeft <= 3 && daysLeft >= 0;
    const feeText = formatFee(rec);
    const dateText = inst.event_date
        ? formatDate(inst.event_date) + (inst.event_date_end && inst.event_date_end !== inst.event_date ? ` ~ ${formatDate(inst.event_date_end)}` : '')
        : '미정';

    const ROW = { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 };
    const LABEL = { fontSize: 12, fontWeight: 700, color: T.gray, width: 48, flexShrink: 0 };
    const VALUE = { fontSize: 13, fontWeight: 600, color: T.text, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

    return (
        <Link href={`/recruitments/${rec.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                background: T.white, borderRadius: T.radiusLg, padding: '14px 16px',
                border: `1px solid ${isUrgent ? T.red + '40' : T.border}`,
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, background: T.greenLt, color: T.green, padding: '2px 7px', borderRadius: 4 }}>모집중</span>
                        {daysLeft !== null && daysLeft >= 0 && (
                            <span style={{ fontSize: 11, fontWeight: 800, color: isUrgent ? T.red : T.gray }}>
                                {daysLeft === 0 ? 'D-Day' : `D-${daysLeft}`}
                            </span>
                        )}
                    </div>
                </div>

                <div style={{ fontSize: 15, fontWeight: 800, color: T.text, lineHeight: 1.4, marginBottom: 10 }}>
                    {(rec.title || '-').replace(/^\[.*?\]\s*/, '')}
                </div>

                {org.name && <div style={ROW}><span style={LABEL}>주최사</span><span style={VALUE}>{org.name}</span></div>}
                <div style={ROW}><span style={LABEL}>참가비</span><span style={{ ...VALUE, color: T.blue, fontWeight: 800 }}>{feeText}</span></div>
                <div style={ROW}><span style={LABEL}>일시</span><span style={VALUE}>{dateText}</span></div>
                <div style={{ ...ROW, marginBottom: 0 }}><span style={LABEL}>장소</span><span style={VALUE}>{inst.location || '미정'}</span></div>
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
