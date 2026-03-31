'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { T, inputStyle } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';

const TYPES = [
    {
        key: 'seller',
        emoji: '🛍️',
        label: '행사 참여하러 왔어요',
        desc: '플리마켓·팝업마켓에 셀러로\n참가하고 싶어요',
        color: T.blue,
        bg: T.blueLt,
    },
    {
        key: 'organizer',
        emoji: '🏢',
        label: '행사 의뢰하러 왔어요',
        desc: '플리마켓·팝업마켓을 기획하고\n셀러를 모집하고 싶어요',
        color: '#B45309',
        bg: '#FFFBEB',
    },
];

const FIELD_STYLE = (filled) => ({
    ...inputStyle(filled),
    width: '100%',
    boxSizing: 'border-box',
});

export default function OnboardingPage() {
    const router = useRouter();
    const { user, refreshPlan } = useAuth();

    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    // 프로필 폼
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [instagram, setInstagram] = useState('');
    const [bizNumber, setBizNumber] = useState('');

    const selectedType = TYPES.find(t => t.key === selected);

    /* ── Step 1 → 2 ── */
    const handleNextStep = () => {
        if (!selected) return;
        setStep(2);
    };

    /* ── Step 2 → 저장 ── */
    const handleConfirm = async () => {
        if (!name.trim()) return alert('이름(상호명)을 입력해주세요.');
        if (!user) return;
        setLoading(true);
        try {
            const sb = createClient();
            const isOrganizer = selected === 'organizer';

            // profiles 업데이트
            const profileUpdate = {
                name: name.trim(),
                phone: phone.trim() || null,
                instagram_handle: instagram.replace('@', '').trim() || null,
                business_number: bizNumber.trim() || null,
                ...(isOrganizer
                    ? { plan: 'organizer', organizer_name: name.trim() }
                    : { seller_type: selected, plan: 'free' }),
            };
            const { error: profileErr } = await sb
                .from('profiles')
                .update(profileUpdate)
                .eq('id', user.id);
            if (profileErr) throw profileErr;

            // 주최사인 경우 organizers 테이블에도 upsert
            if (isOrganizer) {
                const { error: orgErr } = await sb
                    .from('organizers')
                    .upsert({
                        id: user.id,
                        name: name.trim(),
                        phone: phone.trim() || null,
                        instagram_handle: instagram.replace('@', '').trim() || null,
                        business_number: bizNumber.trim() || null,
                    }, { onConflict: 'id' });
                if (orgErr) throw orgErr;
            }

            await refreshPlan();
            router.replace('/');
        } catch (err) {
            console.error('온보딩 저장 실패:', err);
            alert('저장 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };

    /* ── 전화번호 포맷 ── */
    const handlePhoneChange = (e) => {
        const digits = e.target.value.replace(/\D/g, '');
        let formatted = digits;
        if (digits.length >= 8) {
            formatted = digits.length === 11
                ? `${digits.slice(0,3)}-${digits.slice(3,7)}-${digits.slice(7)}`
                : `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
        }
        setPhone(formatted);
    };

    /* ── 사업자번호 포맷 ── */
    const handleBizNumberChange = (e) => {
        const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
        let formatted = digits;
        if (digits.length > 5) formatted = `${digits.slice(0,3)}-${digits.slice(3,5)}-${digits.slice(5)}`;
        else if (digits.length > 3) formatted = `${digits.slice(0,3)}-${digits.slice(3)}`;
        setBizNumber(formatted);
    };

    return (
        <div style={{
            minHeight: '100vh', background: T.white,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '40px 24px',
        }}>
            <div style={{ width: '100%', maxWidth: 420 }}>

                {/* 헤더 */}
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                    <div style={{ fontSize: 36, fontWeight: 900, color: T.text, letterSpacing: -1, marginBottom: 12 }}>
                        플릿 <span style={{ color: T.blue }}>●</span>
                    </div>

                    {/* 스텝 인디케이터 */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
                        {[1, 2].map(s => (
                            <div key={s} style={{
                                width: s === step ? 24 : 8, height: 8, borderRadius: 4,
                                background: s === step ? T.blue : T.border,
                                transition: 'all 0.2s',
                            }} />
                        ))}
                    </div>

                    {step === 1 ? (
                        <>
                            <div style={{ fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 8 }}>
                                어떤 역할로 활동하시나요?
                            </div>
                            <div style={{ fontSize: 14, color: T.gray, lineHeight: 1.6 }}>
                                선택한 유형에 맞는 기능을<br />제공해 드릴게요
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 8 }}>
                                프로필을 입력해주세요
                            </div>
                            <div style={{ fontSize: 14, color: T.gray, lineHeight: 1.6 }}>
                                {selectedType?.emoji} {selectedType?.label}로 활동하실 정보예요
                            </div>
                        </>
                    )}
                </div>

                {/* ── Step 1: 역할 선택 ── */}
                {step === 1 && (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                            {TYPES.map(t => (
                                <div
                                    key={t.key}
                                    onClick={() => setSelected(t.key)}
                                    style={{
                                        padding: '22px 20px', borderRadius: 16, cursor: 'pointer',
                                        border: selected === t.key ? `2.5px solid ${t.color}` : `1.5px solid ${T.border}`,
                                        background: selected === t.key ? t.bg : T.white,
                                        display: 'flex', alignItems: 'center', gap: 16,
                                        boxShadow: selected === t.key ? `0 0 0 3px ${t.color}18` : T.shadowSm,
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    <div style={{
                                        width: 56, height: 56, borderRadius: 14,
                                        background: t.bg, flexShrink: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 28,
                                    }}>
                                        {t.emoji}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 4 }}>
                                            {t.label}
                                        </div>
                                        <div style={{ fontSize: 13, color: T.gray, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                                            {t.desc}
                                        </div>
                                    </div>
                                    <div style={{
                                        marginLeft: 'auto', flexShrink: 0,
                                        width: 22, height: 22, borderRadius: '50%',
                                        border: `2px solid ${selected === t.key ? t.color : T.border}`,
                                        background: selected === t.key ? t.color : T.white,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {selected === t.key && (
                                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            onClick={handleNextStep}
                            style={{
                                width: '100%', padding: '16px 0', borderRadius: T.radiusFull,
                                background: selected ? T.blue : T.border,
                                color: '#fff', textAlign: 'center',
                                fontSize: 16, fontWeight: 800, cursor: selected ? 'pointer' : 'default',
                                transition: 'background 0.15s', boxSizing: 'border-box',
                            }}
                        >
                            다음
                        </div>

                        <div
                            onClick={() => router.replace('/')}
                            style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: T.gray, cursor: 'pointer' }}
                        >
                            나중에 설정하기
                        </div>
                    </>
                )}

                {/* ── Step 2: 프로필 입력 ── */}
                {step === 2 && (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>

                            <div>
                                <label style={{ fontSize: 13, fontWeight: 700, color: T.text, display: 'block', marginBottom: 7 }}>
                                    이름 / 상호명 <span style={{ color: T.red }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="예: 홍길동 / 플릿마켓"
                                    style={FIELD_STYLE(!!name)}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: 13, fontWeight: 700, color: T.text, display: 'block', marginBottom: 7 }}>
                                    연락처
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder="010-0000-0000"
                                    style={FIELD_STYLE(!!phone)}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: 13, fontWeight: 700, color: T.text, display: 'block', marginBottom: 7 }}>
                                    인스타그램 계정
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{
                                        position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                                        fontSize: 14, color: T.gray, pointerEvents: 'none',
                                    }}>@</span>
                                    <input
                                        type="text"
                                        value={instagram}
                                        onChange={e => setInstagram(e.target.value.replace('@', ''))}
                                        placeholder="account_id"
                                        style={{ ...FIELD_STYLE(!!instagram), paddingLeft: 30 }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: 13, fontWeight: 700, color: T.text, display: 'block', marginBottom: 7 }}>
                                    사업자등록번호
                                </label>
                                <input
                                    type="text"
                                    value={bizNumber}
                                    onChange={handleBizNumberChange}
                                    placeholder="000-00-00000"
                                    inputMode="numeric"
                                    style={FIELD_STYLE(!!bizNumber)}
                                />
                            </div>
                        </div>

                        <div
                            onClick={loading ? undefined : handleConfirm}
                            style={{
                                width: '100%', padding: '16px 0', borderRadius: T.radiusFull,
                                background: name.trim() ? T.blue : T.border,
                                color: '#fff', textAlign: 'center',
                                fontSize: 16, fontWeight: 800,
                                cursor: name.trim() && !loading ? 'pointer' : 'default',
                                transition: 'background 0.15s', boxSizing: 'border-box',
                                opacity: loading ? 0.7 : 1,
                            }}
                        >
                            {loading ? '저장 중...' : '시작하기'}
                        </div>

                        <div
                            onClick={() => setStep(1)}
                            style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: T.gray, cursor: 'pointer' }}
                        >
                            이전으로
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
