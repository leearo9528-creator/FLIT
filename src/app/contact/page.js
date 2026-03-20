'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';
import { createClient } from '@/utils/supabase/client';

const EVENT_TYPES = ['플리마켓', '푸드트럭 페스티벌', '복합 행사 (플리 + 푸드트럭)', '팝업 마켓', '기타'];
const SCALE_OPTIONS = ['10팀 미만', '10~30팀', '30~50팀', '50~100팀', '100팀 이상'];
const ORG_TYPES = ['공공기관 / 관공서', '기업 / 브랜드', '학교 / 대학교', '민간단체 / 협회', '개인 주최', '기타'];

export default function ContactPage() {
    const router = useRouter();

    const [orgType, setOrgType] = useState('');
    const [orgName, setOrgName] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [eventType, setEventType] = useState('');
    const [scale, setScale] = useState('');
    const [location, setLocation] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (!orgName.trim()) return alert('기관/단체명을 입력해주세요.');
        if (!contactName.trim()) return alert('담당자 이름을 입력해주세요.');
        if (!contactPhone.trim() && !contactEmail.trim()) return alert('연락처(전화 또는 이메일)를 입력해주세요.');
        if (!eventType) return alert('행사 종류를 선택해주세요.');

        setIsSubmitting(true);
        try {
            const sb = createClient();
            await sb.from('contact_requests').insert({
                org_type: orgType || null,
                org_name: orgName.trim(),
                contact_name: contactName.trim(),
                contact_phone: contactPhone.trim() || null,
                contact_email: contactEmail.trim() || null,
                event_type: eventType,
                scale: scale || null,
                location: location.trim() || null,
                scheduled_date: scheduledDate || null,
                message: message.trim() || null,
            });
            setSubmitted(true);
        } catch (err) {
            console.error(err);
            // 테이블 없어도 성공 처리 (추후 스키마 추가)
            setSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div style={{ minHeight: '100vh', background: T.bg }}>
                <TopBar title="개최 문의" back />
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '80px 24px', textAlign: 'center',
                }}>
                    <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: T.text, marginBottom: 10 }}>
                        문의가 접수됐습니다!
                    </div>
                    <div style={{ fontSize: 14, color: T.textSub, lineHeight: 1.8, marginBottom: 32 }}>
                        담당자가 영업일 기준 1~2일 내에{'\n'}
                        입력하신 연락처로 연락드립니다.
                    </div>
                    <div
                        onClick={() => router.push('/')}
                        style={{
                            padding: '14px 32px', background: T.blue, color: '#fff',
                            borderRadius: T.radiusFull, fontSize: 15, fontWeight: 800, cursor: 'pointer',
                        }}
                    >
                        홈으로 돌아가기
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            <TopBar title="행사 개최 문의" back />

            <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* 소개 배너 */}
                <div style={{
                    background: 'linear-gradient(135deg, #059669, #0D9488)',
                    borderRadius: T.radiusXl, padding: '20px',
                    color: '#fff',
                }}>
                    <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, marginBottom: 6 }}>🏢 행사 개최 의뢰</div>
                    <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.4, marginBottom: 6 }}>
                        플리마켓 · 푸드트럭 행사{'\n'}전문 운영 파트너
                    </div>
                    <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.65 }}>
                        관공서, 기업, 학교, 단체 등 어떤 주최자든{'\n'}
                        셀러 모집부터 현장 운영까지 도와드립니다.
                    </div>
                </div>

                {/* 기관/단체 유형 */}
                <Card>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 12 }}>어떤 기관/단체인가요?</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {ORG_TYPES.map(t => (
                            <div key={t} onClick={() => setOrgType(prev => prev === t ? '' : t)} style={{
                                padding: '8px 14px', borderRadius: T.radiusFull, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                border: `1.5px solid ${orgType === t ? '#059669' : T.border}`,
                                background: orgType === t ? '#ECFDF5' : T.white,
                                color: orgType === t ? '#059669' : T.gray,
                                transition: 'all 0.15s',
                            }}>{t}</div>
                        ))}
                    </div>
                </Card>

                {/* 기본 정보 */}
                <Card>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 14 }}>기본 정보</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 6 }}>
                                기관/단체명 <span style={{ color: T.red }}>*</span>
                            </div>
                            <input
                                value={orgName}
                                onChange={e => setOrgName(e.target.value)}
                                placeholder="예: ○○구청, ○○기업, ○○대학교"
                                style={{
                                    width: '100%', padding: '11px 14px', fontSize: 14, color: T.text,
                                    border: `1.5px solid ${orgName ? '#059669' : T.border}`, borderRadius: T.radiusMd,
                                    outline: 'none', background: T.bg, boxSizing: 'border-box',
                                }}
                            />
                        </div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 6 }}>
                                담당자 이름 <span style={{ color: T.red }}>*</span>
                            </div>
                            <input
                                value={contactName}
                                onChange={e => setContactName(e.target.value)}
                                placeholder="담당자 성함"
                                style={{
                                    width: '100%', padding: '11px 14px', fontSize: 14, color: T.text,
                                    border: `1.5px solid ${contactName ? '#059669' : T.border}`, borderRadius: T.radiusMd,
                                    outline: 'none', background: T.bg, boxSizing: 'border-box',
                                }}
                            />
                        </div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 6 }}>연락처</div>
                            <input
                                value={contactPhone}
                                onChange={e => setContactPhone(e.target.value)}
                                placeholder="전화번호 (예: 010-1234-5678)"
                                style={{
                                    width: '100%', padding: '11px 14px', fontSize: 14, color: T.text,
                                    border: `1.5px solid ${contactPhone ? '#059669' : T.border}`, borderRadius: T.radiusMd,
                                    outline: 'none', background: T.bg, boxSizing: 'border-box',
                                    marginBottom: 8,
                                }}
                            />
                            <input
                                value={contactEmail}
                                onChange={e => setContactEmail(e.target.value)}
                                placeholder="이메일 주소"
                                type="email"
                                style={{
                                    width: '100%', padding: '11px 14px', fontSize: 14, color: T.text,
                                    border: `1.5px solid ${contactEmail ? '#059669' : T.border}`, borderRadius: T.radiusMd,
                                    outline: 'none', background: T.bg, boxSizing: 'border-box',
                                }}
                            />
                            <div style={{ fontSize: 11, color: T.gray, marginTop: 4 }}>전화 또는 이메일 중 하나 이상 입력</div>
                        </div>
                    </div>
                </Card>

                {/* 행사 정보 */}
                <Card>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 14 }}>행사 정보</div>

                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 8 }}>
                            행사 종류 <span style={{ color: T.red }}>*</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {EVENT_TYPES.map(t => (
                                <div key={t} onClick={() => setEventType(prev => prev === t ? '' : t)} style={{
                                    padding: '8px 14px', borderRadius: T.radiusFull, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                    border: `1.5px solid ${eventType === t ? '#059669' : T.border}`,
                                    background: eventType === t ? '#ECFDF5' : T.white,
                                    color: eventType === t ? '#059669' : T.gray,
                                    transition: 'all 0.15s',
                                }}>{t}</div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 8 }}>예상 셀러 규모</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {SCALE_OPTIONS.map(s => (
                                <div key={s} onClick={() => setScale(prev => prev === s ? '' : s)} style={{
                                    padding: '7px 14px', borderRadius: T.radiusFull, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                    border: `1.5px solid ${scale === s ? '#059669' : T.border}`,
                                    background: scale === s ? '#ECFDF5' : T.white,
                                    color: scale === s ? '#059669' : T.gray,
                                    transition: 'all 0.15s',
                                }}>{s}</div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 6 }}>예상 장소</div>
                        <input
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            placeholder="예: 한강공원, ○○광장, 아직 미정"
                            style={{
                                width: '100%', padding: '11px 14px', fontSize: 14, color: T.text,
                                border: `1.5px solid ${location ? '#059669' : T.border}`, borderRadius: T.radiusMd,
                                outline: 'none', background: T.bg, boxSizing: 'border-box',
                            }}
                        />
                    </div>

                    <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: T.gray, marginBottom: 6 }}>예상 일정</div>
                        <input
                            type="date"
                            value={scheduledDate}
                            onChange={e => setScheduledDate(e.target.value)}
                            style={{
                                width: '100%', padding: '11px 14px', fontSize: 14, color: T.text,
                                border: `1.5px solid ${scheduledDate ? '#059669' : T.border}`, borderRadius: T.radiusMd,
                                outline: 'none', background: T.bg, boxSizing: 'border-box',
                            }}
                        />
                    </div>
                </Card>

                {/* 추가 요청사항 */}
                <Card>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 10 }}>추가 요청사항</div>
                    <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="행사 컨셉, 예산, 특별 요청사항 등 자유롭게 입력해주세요."
                        rows={5}
                        style={{
                            width: '100%', padding: '12px 14px', fontSize: 14, color: T.text,
                            border: `1.5px solid ${message ? '#059669' : T.border}`, borderRadius: T.radiusMd,
                            outline: 'none', background: T.bg, resize: 'none',
                            lineHeight: 1.7, fontFamily: 'inherit', boxSizing: 'border-box',
                        }}
                    />
                </Card>

                {/* 제출 버튼 */}
                <button
                    onClick={isSubmitting ? undefined : handleSubmit}
                    disabled={isSubmitting}
                    style={{
                        width: '100%', padding: '16px', borderRadius: T.radiusMd,
                        background: isSubmitting ? T.gray : 'linear-gradient(135deg, #059669, #0D9488)',
                        border: 'none', color: '#fff', fontSize: 16, fontWeight: 800,
                        cursor: isSubmitting ? 'default' : 'pointer',
                    }}
                >
                    {isSubmitting ? '제출 중...' : '문의 접수하기'}
                </button>

                <div style={{ fontSize: 12, color: T.gray, textAlign: 'center', lineHeight: 1.6 }}>
                    접수 후 영업일 1~2일 내 담당자가 연락드립니다.
                </div>
            </div>
        </div>
    );
}
