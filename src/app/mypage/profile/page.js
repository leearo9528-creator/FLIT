'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { T, inputStyle } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

const ROLES = [
    { key: 'seller', label: '🛍️ 일반 셀러', desc: '플리마켓에 참가하는 셀러' },
    { key: 'organizer', label: '🏢 주최사', desc: '행사를 기획하고 셀러를 모집' },
];

function FieldInput({ label, value, onChange, placeholder, disabled, multiline }) {
    const style = {
        width: '100%', padding: '12px 14px', fontSize: 14, color: disabled ? T.gray : T.text,
        border: `1.5px solid ${value ? T.blue : T.border}`, borderRadius: T.radiusMd,
        outline: 'none', background: disabled ? T.grayLt : T.bg,
        boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.15s',
    };
    return (
        <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: T.gray, marginBottom: 6, display: 'block' }}>{label}</label>
            {multiline ? (
                <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
                    rows={3} style={{ ...style, resize: 'vertical', lineHeight: 1.6 }} />
            ) : (
                <input value={value} onChange={disabled ? undefined : e => onChange(e.target.value)}
                    placeholder={placeholder} disabled={disabled} style={style} />
            )}
        </div>
    );
}

export default function ProfilePage() {
    const { user, loading, plan, refreshPlan } = useAuth();
    const router = useRouter();

    const [name, setName] = useState('');
    const [role, setRole] = useState('seller');

    // 셀러 필드
    const [brandName, setBrandName] = useState('');
    const [realName, setRealName] = useState('');
    const [phone, setPhone] = useState('');
    const [products, setProducts] = useState('');
    const [promoLink, setPromoLink] = useState('');

    // 주최사 필드
    const [orgName, setOrgName] = useState('');
    const [orgDesc, setOrgDesc] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.replace('/login');
    }, [user, loading, router]);

    // 기존 프로필 데이터 로드
    useEffect(() => {
        if (!user) return;
        (async () => {
            const sb = createClient();
            const { data } = await sb.from('profiles')
                .select('name, plan, seller_type, brand_name, real_name, phone, products, promo_link, organizer_name, organizer_desc')
                .eq('id', user.id).maybeSingle();
            if (data) {
                setName(data.name || user.user_metadata?.full_name || user.user_metadata?.name || '');
                setRole(data.plan === 'organizer' || data.plan === 'organizer_pending' ? 'organizer' : 'seller');
                setBrandName(data.brand_name || '');
                setRealName(data.real_name || '');
                setPhone(data.phone || '');
                setProducts(data.products || '');
                setPromoLink(data.promo_link || '');
                setOrgName(data.organizer_name || '');
                setOrgDesc(data.organizer_desc || '');
            }
            setLoaded(true);
        })();
    }, [user]);

    const handleSave = async () => {
        if (!name.trim()) return alert('이름(닉네임)을 입력해주세요.');
        if (role === 'organizer' && !orgName.trim()) return alert('주최사명을 입력해주세요.');

        setIsSubmitting(true);
        try {
            const sb = createClient();
            const isOrganizer = role === 'organizer';
            const currentPlan = plan;

            // 프로필 업데이트
            const profileUpdate = {
                name: name.trim(),
                brand_name: isOrganizer ? null : brandName.trim() || null,
                real_name: realName.trim() || null,
                phone: phone.trim() || null,
                products: isOrganizer ? null : products.trim() || null,
                promo_link: promoLink.trim() || null,
                organizer_name: isOrganizer ? orgName.trim() : null,
                organizer_desc: isOrganizer ? orgDesc.trim() || null : null,
            };

            // 역할 변경 처리
            if (isOrganizer && currentPlan !== 'organizer' && currentPlan !== 'organizer_pending') {
                profileUpdate.plan = 'organizer_pending';
                profileUpdate.seller_type = null;
            } else if (!isOrganizer && (currentPlan === 'organizer' || currentPlan === 'organizer_pending')) {
                profileUpdate.plan = 'free';
                profileUpdate.seller_type = 'seller';
            }

            const [authRes, profileRes] = await Promise.all([
                sb.auth.updateUser({ data: { full_name: name, name: name } }),
                sb.from('profiles').update(profileUpdate).eq('id', user.id),
            ]);

            if (authRes.error) throw authRes.error;
            if (profileRes.error) throw profileRes.error;

            await refreshPlan();
            alert('프로필이 저장되었습니다.');
            router.push('/mypage');
        } catch (err) {
            alert('저장 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || !user || !loaded) return null;

    const isOrganizer = role === 'organizer';

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title="프로필 수정" back />

            <div className="page-padding">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                    {/* ── 기본 정보 ── */}
                    <Card>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, paddingBottom: 8 }}>
                            <div style={{
                                width: 72, height: 72, borderRadius: '50%',
                                background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 30, color: '#fff', fontWeight: 800,
                            }}>
                                {(name?.[0] || '?').toUpperCase()}
                            </div>
                        </div>
                        <FieldInput label="계정 (변경 불가)" value={user.email} disabled />
                        <FieldInput label="이름 / 닉네임" value={name} onChange={setName} placeholder="사용하실 닉네임" />
                    </Card>

                    {/* ── 역할 선택 ── */}
                    <Card>
                        <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 12 }}>역할 선택</div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            {ROLES.map(r => {
                                const active = role === r.key;
                                return (
                                    <div key={r.key} onClick={() => setRole(r.key)} style={{
                                        flex: 1, padding: '14px 12px', borderRadius: T.radiusLg, cursor: 'pointer',
                                        border: `2px solid ${active ? T.blue : T.border}`,
                                        background: active ? T.blueLt : T.white, transition: 'all 0.15s',
                                    }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: active ? T.blue : T.text, marginBottom: 3 }}>{r.label}</div>
                                        <div style={{ fontSize: 11, color: T.gray }}>{r.desc}</div>
                                    </div>
                                );
                            })}
                        </div>
                        {isOrganizer && plan !== 'organizer' && plan !== 'organizer_pending' && (
                            <div style={{
                                marginTop: 10, background: '#FFFBEB', border: '1px solid #FCD34D',
                                borderRadius: T.radiusMd, padding: '10px 14px',
                                fontSize: 12, color: '#92400E', lineHeight: 1.6,
                            }}>
                                주최사 전환은 관리자 승인이 필요합니다. 승인 전까지 공고 등록이 제한됩니다.
                            </div>
                        )}
                    </Card>

                    {/* ── 셀러 상세 정보 ── */}
                    {!isOrganizer && (
                        <Card>
                            <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 14 }}>셀러 정보</div>
                            <FieldInput label="브랜드명" value={brandName} onChange={setBrandName} placeholder="예: 하나공방" />
                            <FieldInput label="성함" value={realName} onChange={setRealName} placeholder="실명" />
                            <FieldInput label="연락처" value={phone} onChange={setPhone} placeholder="010-0000-0000" />
                            <FieldInput label="판매 제품" value={products} onChange={setProducts} placeholder="예: 핸드메이드 악세사리, 캔들" />
                            <FieldInput label="홍보 링크" value={promoLink} onChange={setPromoLink} placeholder="인스타, 블로그, 스마트스토어 등 URL" />
                        </Card>
                    )}

                    {/* ── 주최사 상세 정보 ── */}
                    {isOrganizer && (
                        <Card>
                            <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 14 }}>주최사 정보</div>
                            <FieldInput label="주최사명 *" value={orgName} onChange={setOrgName} placeholder="예: 서울플리마켓협회" />
                            <FieldInput label="주최사 설명" value={orgDesc} onChange={setOrgDesc} placeholder="주최사 소개를 입력하세요" multiline />
                            <FieldInput label="성함" value={realName} onChange={setRealName} placeholder="담당자 실명" />
                            <FieldInput label="연락처" value={phone} onChange={setPhone} placeholder="010-0000-0000" />
                            <FieldInput label="홍보 링크" value={promoLink} onChange={setPromoLink} placeholder="홈페이지, 인스타 등 URL" />
                        </Card>
                    )}

                    {/* ── 저장 ── */}
                    <button
                        onClick={isSubmitting ? undefined : handleSave}
                        disabled={isSubmitting}
                        style={{
                            width: '100%', padding: 16, borderRadius: T.radiusMd,
                            background: isSubmitting ? T.gray : T.blue,
                            border: 'none', color: '#fff', fontSize: 16, fontWeight: 800,
                            cursor: isSubmitting ? 'default' : 'pointer', transition: 'background 0.15s',
                        }}
                    >
                        {isSubmitting ? '저장 중...' : '저장하기'}
                    </button>
                </div>
            </div>
        </div>
    );
}
