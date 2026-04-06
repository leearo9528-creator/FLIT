'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bookmark, MapPin, Calendar, Banknote, Clock } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { calcDDay } from '@/lib/helpers';

/* ─── 섹션 UI ──────────────────────────────────────────────── */
function Section({ title, children }) {
    return (
        <div style={{ background: T.white, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: T.text }}>{title}</span>
            </div>
            <div style={{ padding: '16px 18px' }}>{children}</div>
        </div>
    );
}

/* ─── 행 UI ────────────────────────────────────────────────── */
function InfoRow({ icon, label, value, valueColor, last }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            paddingBottom: last ? 0 : 12, marginBottom: last ? 0 : 12,
            borderBottom: last ? 'none' : `1px solid ${T.border}`,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, width: 76, flexShrink: 0, color: T.gray, fontSize: 12, paddingTop: 2 }}>
                {icon}
                <span>{label}</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: valueColor || T.text, flex: 1, lineHeight: 1.55, wordBreak: 'keep-all' }}>
                {value}
            </span>
        </div>
    );
}

/* ─── helpers ──────────────────────────────────────────────── */
function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateRange(start, end) {
    if (!start) return '미정';
    const s = formatDate(start);
    if (!end || end === start) return s;
    const eDate = new Date(end).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
    return `${s} ~ ${eDate}`;
}

/* ─── Main ─────────────────────────────────────────────────── */
export default function RecruitmentDetailClient({ recruitment }) {
    const router = useRouter();
    const { user } = useAuth();
    const [scrapped, setScrapped] = useState(false);
    const [scrapLoading, setScrapLoading] = useState(false);

    const instance = recruitment.instance || {};
    const baseEvent = instance.base_event || {};
    const organizer = instance.organizer || {};
    const dDay = calcDDay(recruitment.end_date);
    const isOpen = recruitment.status === 'OPEN';

    useEffect(() => {
        if (!user) return;
        (async () => {
            const sb = createClient();
            const { data } = await sb.from('scraps')
                .select('user_id').eq('user_id', user.id).eq('recruitment_id', recruitment.id).maybeSingle();
            setScrapped(!!data);
        })();
    }, [user, recruitment.id]);

    const handleScrap = async () => {
        if (!user) { router.push('/login'); return; }
        if (scrapLoading) return;
        const prev = scrapped;
        setScrapped(!prev);
        setScrapLoading(true);
        try {
            const sb = createClient();
            if (prev) {
                await sb.from('scraps').delete().eq('user_id', user.id).eq('recruitment_id', recruitment.id);
            } else {
                await sb.from('scraps').insert({ user_id: user.id, recruitment_id: recruitment.id });
            }
        } catch {
            setScrapped(prev);
        } finally {
            setScrapLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#F3F4F6', paddingBottom: 60 }}>

            {/* ── Hero ── */}
            <div style={{
                background: isOpen
                    ? 'linear-gradient(160deg, #064E3B 0%, #059669 100%)'
                    : 'linear-gradient(160deg, #1F2937 0%, #4B5563 100%)',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ position: 'absolute', bottom: -50, left: -30, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

                {/* 상단 네비 */}
                <div style={{ padding: '52px 16px 0', position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button onClick={() => router.back()} style={{
                        background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 999,
                        width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', backdropFilter: 'blur(8px)',
                    }}>
                        <ArrowLeft size={18} color="#fff" />
                    </button>
                    <button onClick={handleScrap} style={{
                        background: scrapped ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.15)',
                        border: 'none', borderRadius: 999,
                        width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', backdropFilter: 'blur(8px)',
                    }}>
                        <Bookmark size={18} fill={scrapped ? T.green : 'none'} color={scrapped ? T.green : '#fff'} />
                    </button>
                </div>

                {/* 본문 */}
                <div style={{ padding: '14px 20px 28px', position: 'relative', zIndex: 2 }}>
                    {/* 행사 컨텍스트 칩 */}
                    {baseEvent.id && (
                        <Link href={`/events/${baseEvent.id}`} style={{ textDecoration: 'none' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 5,
                                background: 'rgba(255,255,255,0.12)', borderRadius: 999,
                                padding: '4px 12px', marginBottom: 12,
                                border: '1px solid rgba(255,255,255,0.2)',
                            }}>
                                <span style={{ fontSize: 11 }}>🎪</span>
                                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{baseEvent.name}</span>
                                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>›</span>
                                <span style={{ fontSize: 12, color: '#fff', fontWeight: 700 }}>셀러 모집</span>
                            </div>
                        </Link>
                    )}
                    {/* 상태 + D-Day */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                            background: isOpen ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.25)',
                            color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
                        }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: isOpen ? '#6EE7B7' : '#9CA3AF', display: 'inline-block' }} />
                            {isOpen ? '신청 가능' : '마감됨'}
                        </div>
                        {dDay && (
                            <div style={{
                                padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                                background: dDay.urgent ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.14)',
                                color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
                            }}>
                                {dDay.label}
                            </div>
                        )}
                    </div>
                    {/* 공고 제목 */}
                    <div style={{ fontSize: 21, fontWeight: 900, color: '#fff', lineHeight: 1.45, marginBottom: 10, letterSpacing: -0.4 }}>
                        {recruitment.title}
                    </div>
                    {/* 주최사 */}
                    {organizer.name && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                            <span>주최</span>
                            <span style={{ color: '#fff', fontWeight: 700 }}>{organizer.name}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* ── 콘텐츠 ── */}
            <div style={{ padding: '16px 14px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* 셀러 후기 요약 */}
                {baseEvent.id && (
                    <Link href={`/events/${baseEvent.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{
                            background: T.white, borderRadius: 16, overflow: 'hidden',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                            border: `1.5px solid ${T.blue}22`,
                        }}>
                            <div style={{
                                padding: '10px 18px', background: T.blueLt,
                                borderBottom: `1px solid ${T.blue}20`,
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            }}>
                                <span style={{ fontSize: 13, fontWeight: 800, color: T.blue }}>📊 이 행사 셀러 후기</span>
                                <span style={{ fontSize: 12, color: T.blue, fontWeight: 600 }}>전체 보기 →</span>
                            </div>
                            <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {baseEvent.name}
                                    </div>
                                    {baseEvent.total_reviews > 0 ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ fontSize: 22, fontWeight: 900, color: T.text }}>
                                                ⭐ {Number(baseEvent.avg_event_rating || 0).toFixed(1)}
                                            </span>
                                            <span style={{ fontSize: 13, color: T.gray }}>/ 5.0</span>
                                            <span style={{ fontSize: 12, color: T.gray }}>·</span>
                                            <span style={{ fontSize: 13, color: T.gray }}>후기 {baseEvent.total_reviews}개</span>
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: 13, color: T.gray }}>아직 작성된 후기가 없어요</div>
                                    )}
                                </div>
                                {baseEvent.total_reviews > 0 && (
                                    <div style={{
                                        flexShrink: 0, background: T.blue, borderRadius: 10,
                                        padding: '8px 14px', textAlign: 'center',
                                    }}>
                                        <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                                            {Number(baseEvent.avg_event_rating || 0).toFixed(1)}
                                        </div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>평균 평점</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                )}

                {/* 공고 핵심 정보 */}
                <Section title="📌 공고 핵심 정보">
                    {(() => {
                        const days = (() => {
                            if (!instance.event_date) return null;
                            if (!instance.event_date_end || instance.event_date_end === instance.event_date) return 1;
                            return Math.round((new Date(instance.event_date_end) - new Date(instance.event_date)) / 86400000) + 1;
                        })();
                        const feeType = recruitment.fee_type || 'fixed';
                        const feeDisplay = feeType === 'free' || !recruitment.fee
                            ? '무료'
                            : feeType === 'rate'
                            ? `${recruitment.fee}%`
                            : `${Number(recruitment.fee).toLocaleString()}원`;
                        const feeColor = feeType === 'free' || !recruitment.fee ? '#059669' : T.text;
                        const hasFoodtruckFee = recruitment.fee_foodtruck != null && recruitment.fee_foodtruck !== recruitment.fee;
                        return (
                            <>
                                <InfoRow icon={<Calendar size={13} color={T.blue} />} label="행사 기간" value={formatDateRange(instance.event_date, instance.event_date_end)} />
                                {days && <InfoRow icon={<span style={{ fontSize: 12 }}>📅</span>} label="행사일수" value={`${days}일`} />}
                                <InfoRow icon={<Clock size={13} color={T.red} />} label="모집 마감" value={recruitment.end_date ? formatDate(recruitment.end_date) : '없음'} valueColor={recruitment.end_date ? T.red : T.gray} />
                                <InfoRow icon={<MapPin size={13} color={T.green} />} label="장소" value={instance.location || '미정'} />
                                {hasFoodtruckFee ? (
                                    <>
                                        <InfoRow icon={<Banknote size={13} color="#D97706" />} label="💎 참가비" value={feeDisplay} valueColor={feeColor} />
                                        <InfoRow icon={<Banknote size={13} color="#D97706" />} label="🚚 참가비"
                                            value={feeType === 'rate' ? `${recruitment.fee_foodtruck}%` : `${Number(recruitment.fee_foodtruck).toLocaleString()}원`}
                                            valueColor={T.text}
                                            last={!days || days <= 1 || feeType !== 'fixed' || !recruitment.fee_foodtruck}
                                        />
                                        {days > 1 && feeType === 'fixed' && recruitment.fee_foodtruck > 0 && (
                                            <InfoRow
                                                icon={<span style={{ fontSize: 12 }}>💡</span>}
                                                label="🚚 일수별"
                                                value={Array.from({ length: days }, (_, i) =>
                                                    `${i + 1}일 ${((i + 1) * recruitment.fee_foodtruck).toLocaleString()}원`
                                                ).join(' / ')}
                                                last={!recruitment.extra_costs?.length}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <InfoRow icon={<Banknote size={13} color="#D97706" />} label="참가비" value={feeDisplay} valueColor={feeColor}
                                            last={!days || days <= 1 || feeType !== 'fixed' || !recruitment.fee}
                                        />
                                        {days > 1 && feeType === 'fixed' && recruitment.fee > 0 && (
                                            <InfoRow
                                                icon={<span style={{ fontSize: 12 }}>💡</span>}
                                                label="일수별"
                                                value={Array.from({ length: days }, (_, i) =>
                                                    `${i + 1}일 ${((i + 1) * recruitment.fee).toLocaleString()}원`
                                                ).join(' / ')}
                                                last={!recruitment.extra_costs?.length}
                                            />
                                        )}
                                    </>
                                )}
                                {recruitment.extra_costs?.length > 0 && (
                                    <>
                                        {recruitment.extra_costs.map((c, i) => (
                                            <InfoRow
                                                key={i}
                                                icon={<span style={{ fontSize: 12 }}>💸</span>}
                                                label={c.name}
                                                value={c.amount ? `${Number(String(c.amount).replace(/,/g, '')).toLocaleString()}원` : '별도 문의'}
                                                last={i === recruitment.extra_costs.length - 1}
                                            />
                                        ))}
                                    </>
                                )}
                            </>
                        );
                    })()}
                </Section>

                {/* 사진 */}
                <Section title="📷 사진">
                    {recruitment.images?.length > 0 ? (
                        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -2px' }}>
                            {recruitment.images.map((url, i) => (
                                <div key={i} style={{ position: 'relative', width: 160, height: 120, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                                    <Image src={url} alt={`사진 ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="160px" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{
                            height: 88, borderRadius: 10, border: `1.5px dashed ${T.border}`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
                            color: T.gray,
                        }}>
                            <span style={{ fontSize: 24 }}>📷</span>
                            <span style={{ fontSize: 12 }}>등록된 사진이 없습니다</span>
                        </div>
                    )}
                </Section>

                {/* 상세 모집 요강 */}
                <Section title="📝 상세 모집 요강">
                    <div style={{ fontSize: 14, color: T.text, lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>
                        {recruitment.content || '상세 내용이 없습니다.'}
                    </div>
                </Section>

                {/* 신청 방법 */}
                <Section title="📋 신청 방법">
                    {recruitment.application_method ? (
                        <div style={{ fontSize: 14, color: T.text, lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>
                            {recruitment.application_method}
                        </div>
                    ) : (
                        <div style={{ fontSize: 13, color: T.gray, lineHeight: 1.7 }}>
                            신청 방법이 아직 등록되지 않았습니다.{'\n'}주최사에게 직접 문의해주세요.
                        </div>
                    )}
                </Section>

                {/* 주최사 */}
                {organizer.id && (
                    <Section title="🏢 주최사">
                        <Link href={`/organizers/${organizer.id}`} style={{ textDecoration: 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 10, background: '#F3F4F6',
                                    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 20, overflow: 'hidden', position: 'relative',
                                }}>
                                    {organizer.logo_url
                                        ? <Image src={organizer.logo_url} alt="" fill style={{ objectFit: 'cover' }} sizes="48px" />
                                        : '🏢'}
                                </div>
                                <div>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{organizer.name}</div>
                                    <div style={{ fontSize: 12, color: T.blue, fontWeight: 600, marginTop: 3 }}>리뷰 보러가기 →</div>
                                </div>
                            </div>
                        </Link>
                    </Section>
                )}

            </div>


        </div>
    );
}
