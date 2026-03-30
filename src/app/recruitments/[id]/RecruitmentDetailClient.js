'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// loadTossPayments는 사용 시점에 dynamic import
import Link from 'next/link';
import {
    ArrowLeft, Bookmark, MapPin, Calendar, Banknote,
    Clock, ExternalLink,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { timeAgo } from '@/lib/helpers';

/* ─── 통일 섹션 UI ────────────────────────────────────────── */
function InfoSection({ emoji, title, children }) {
    return (
        <div style={{ background: T.white, borderRadius: T.radiusXl, border: `1.5px solid ${T.blue}40`, overflow: 'hidden' }}>
            <div style={{
                background: `linear-gradient(135deg, ${T.blue}15, ${T.blue}08)`,
                padding: '14px 20px', borderBottom: `1px solid ${T.blue}20`,
                display: 'flex', alignItems: 'center', gap: 8,
            }}>
                <span style={{ fontSize: 18 }}>{emoji}</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: T.blue }}>{title}</span>
            </div>
            <div style={{ padding: '16px 20px' }}>{children}</div>
        </div>
    );
}

/* ─── helpers ──────────────────────────────────────────────── */
function calcDDay(dateStr) {
    if (!dateStr) return null;
    const diff = Math.ceil((new Date(dateStr) - Date.now()) / 86400000);
    if (diff < 0) return { label: '종료', color: T.gray };
    if (diff === 0) return { label: 'D-Day', color: T.red };
    return { label: `D-${diff}`, color: diff <= 3 ? T.red : T.blue };
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ko-KR', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
}

// 탭 없이 상세요강만 표시

/* ─── Main Component ───────────────────────────────────────── */
export default function RecruitmentDetailClient({ recruitment }) {
    const router = useRouter();
    const { user, plan, canViewReviews } = useAuth();

    const [scrapped, setScrapped] = useState(false);
    const [scrapLoading, setScrapLoading] = useState(false);
    const [bumpLoading, setBumpLoading] = useState(false);

    const instance = recruitment.instance || {};
    const baseEvent = instance.base_event || {};
    const organizer = instance.organizer || {};

    const isOwnOrganizer = plan === 'organizer' && organizer.id === user?.id;

    const dDay = calcDDay(recruitment.end_date);

    // 스크랩 상태 초기 로드
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
                const { error } = await sb.from('scraps').delete().eq('user_id', user.id).eq('recruitment_id', recruitment.id);
                if (error) throw error;
            } else {
                const { error } = await sb.from('scraps').insert({ user_id: user.id, recruitment_id: recruitment.id });
                if (error) throw error;
            }
        } catch (err) {
            console.error('스크랩 처리 실패:', err);
            setScrapped(prev);
        } finally {
            setScrapLoading(false);
        }
    };

    const handleBump = async () => {
        if (bumpLoading) return;
        setBumpLoading(true);
        try {
            const orderId = `BUMP_${recruitment.id}_${Date.now()}`;
            const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
            const { loadTossPayments } = await import('@tosspayments/tosspayments-sdk');
            const tossPayments = await loadTossPayments(clientKey);
            const payment = tossPayments.payment({ customerKey: user.id });
            await payment.requestPayment({
                method: 'CARD',
                amount: { currency: 'KRW', value: 10000 },
                orderId,
                orderName: '공고 끌올 1건',
                successUrl: `${window.location.origin}/recruitments/write/success`,
                failUrl: `${window.location.origin}/recruitments/${recruitment.id}`,
                customerEmail: user.email || undefined,
                customerName: user.user_metadata?.full_name || user.user_metadata?.name || '주최사',
            });
        } catch (err) {
            console.error('끌올 결제 오류:', err);
            alert('결제 중 오류가 발생했습니다.');
            setBumpLoading(false);
        }
    };

    /* ── 상세요강 ────────────────────────────────────────────── */
    const renderDetail = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* 행사 상세 리뷰 확인하기 */}
            {baseEvent.id && (
                <Link href={`/events/${baseEvent.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                        background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark || '#1B64DA'})`,
                        borderRadius: T.radiusXl, padding: '18px 20px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                        <div>
                            <div style={{ fontSize: 16, fontWeight: 900, color: '#fff', marginBottom: 4 }}>
                                {baseEvent.name}
                            </div>
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
                                행사 상세 리뷰 확인하기 {baseEvent.total_reviews > 0 ? `(${baseEvent.total_reviews}개)` : ''} →
                            </div>
                        </div>
                        <div style={{ fontSize: 32, opacity: 0.3 }}>⭐</div>
                    </div>
                </Link>
            )}

            {/* 공고 핵심 정보 */}
            <InfoSection emoji="📌" title="공고 핵심 정보">
                {[
                    { icon: <Calendar size={15} color={T.blue} />, label: '행사 일자', value: formatDate(instance.event_date) },
                    { icon: <Clock size={15} color={T.red} />, label: '모집 마감', value: formatDate(recruitment.end_date), valueColor: T.red },
                    { icon: <MapPin size={15} color={T.green} />, label: '장소', value: instance.location || '미정' },
                    { icon: <Banknote size={15} color={T.yellow} />, label: '참가비', value: !recruitment.fee ? '무료' : `${Number(recruitment.fee).toLocaleString()}원`, valueColor: T.blue },
                ].map((row, i, arr) => (
                    <div key={row.label} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 12,
                        paddingBottom: i < arr.length - 1 ? 12 : 0,
                        marginBottom: i < arr.length - 1 ? 12 : 0,
                        borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: T.gray, fontSize: 13, width: 80, flexShrink: 0, paddingTop: 1 }}>{row.icon}{row.label}</div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: row.valueColor || T.text, flex: 1, lineHeight: 1.5, wordBreak: 'keep-all' }}>{row.value}</span>
                    </div>
                ))}
            </InfoSection>

            {/* 상세 모집 요강 */}
            <InfoSection emoji="📝" title="상세 모집 요강">
                <div style={{ fontSize: 14, color: T.text, lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
                    {recruitment.content || '상세 내용이 없습니다.'}
                </div>
            </InfoSection>

            {/* 신청 방법 */}
            <InfoSection emoji="📋" title="신청 방법">
                {recruitment.application_method ? (
                    <div style={{ fontSize: 14, color: T.text, lineHeight: 2, whiteSpace: 'pre-wrap' }}>
                        {recruitment.application_method}
                    </div>
                ) : (
                    <div style={{ fontSize: 14, color: T.gray, lineHeight: 1.7 }}>
                        신청 방법이 아직 등록되지 않았습니다.{'\n'}주최사에게 직접 문의해주세요.
                    </div>
                )}
            </InfoSection>

            {/* 주최사 정보 */}
            {organizer.id && (
                <InfoSection emoji="🏢" title="주최사">
                    <Link href={`/organizers/${organizer.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: T.radiusMd,
                                background: T.grayLt, flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                            }}>
                                {organizer.logo_url
                                    ? <Image src={organizer.logo_url} alt="" fill style={{ borderRadius: T.radiusMd, objectFit: 'cover' }} sizes="48px" />
                                    : '🏢'}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{organizer.name}</div>
                                <div style={{ fontSize: 12, color: T.blue, marginTop: 3, fontWeight: 600 }}>주최사 리뷰 보러가기 →</div>
                            </div>
                        </div>
                    </Link>
                </InfoSection>
            )}
        </div>
    );

    /* ─── Render ─────────────────────────────────────────────── */
    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>

            {/* ── Hero Header ── */}
            <div style={{
                background: 'linear-gradient(160deg, #1A2A4A 0%, #1B64DA 100%)',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ position: 'absolute', bottom: -60, left: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

                {/* 상단 바: 뒤로가기 + 스크랩 */}
                <div style={{
                    padding: '16px 16px 0', position: 'relative', zIndex: 2,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <button onClick={() => router.back()} style={{
                        background: 'rgba(255,255,255,0.15)', border: 'none',
                        borderRadius: T.radiusFull, width: 36, height: 36,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }}>
                        <ArrowLeft size={18} color="#fff" />
                    </button>

                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {isOwnOrganizer && (
                            <button
                                onClick={handleBump}
                                disabled={bumpLoading}
                                style={{
                                    background: 'rgba(255,255,255,0.15)', border: 'none',
                                    borderRadius: T.radiusFull, padding: '0 14px', height: 36,
                                    display: 'flex', alignItems: 'center', gap: 5,
                                    cursor: bumpLoading ? 'default' : 'pointer',
                                    fontSize: 12, fontWeight: 700, color: '#fff',
                                }}
                            >
                                {bumpLoading ? '...' : '📢 끌올 (1만원)'}
                            </button>
                        )}
                        <button
                            onClick={handleScrap}
                            style={{
                                background: scrapped ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.15)',
                                border: 'none', borderRadius: T.radiusFull,
                                width: 36, height: 36,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <Bookmark
                                size={18}
                                fill={scrapped ? T.blue : 'none'}
                                color={scrapped ? T.blue : '#fff'}
                            />
                        </button>
                    </div>
                </div>

                <div style={{ padding: '14px 20px 28px', position: 'relative', zIndex: 2 }}>
                    {/* 상태 + D-Day */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <div style={{
                            padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700,
                            background: recruitment.status === 'OPEN' ? T.green : T.gray, color: '#fff',
                        }}>
                            {recruitment.status === 'OPEN' ? '모집중' : '마감됨'}
                        </div>
                        {dDay && (
                            <div style={{
                                padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 800,
                                background: 'rgba(255,255,255,0.25)', color: '#fff',
                            }}>
                                {dDay.label}
                            </div>
                        )}
                    </div>

                    {baseEvent.name && (
                        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>
                            {baseEvent.name}
                        </div>
                    )}

                    <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1.35, marginBottom: 6 }}>
                        {recruitment.title}
                    </div>

                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Calendar size={13} />
                        {formatDate(instance.event_date)}
                        {instance.event_date_end && instance.event_date_end !== instance.event_date && (
                            <> ~ {formatDate(instance.event_date_end)}</>
                        )}
                    </div>
                </div>
            </div>

            {/* ── 콘텐츠 ── */}
            <div style={{ padding: '20px 16px 0' }}>
                {renderDetail()}
            </div>

        </div>
    );
}
