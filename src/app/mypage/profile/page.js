'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, UserX } from 'lucide-react';
import { T, inputStyle } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

const ROLES = [
    { key: 'seller', label: '🛍️ 일반 셀러', desc: '행사에 참가하는 셀러' },
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

    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatarUploading, setAvatarUploading] = useState(false);
    const avatarRef = useRef(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isWithdrawing, setIsWithdrawing] = useState(false);
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
                .select('name, plan, seller_type, brand_name, real_name, phone, products, promo_link, organizer_name, organizer_desc, avatar_url')
                .eq('id', user.id).maybeSingle();
            if (data) {
                setName(data.name || user.user_metadata?.full_name || user.user_metadata?.name || '');
                setAvatarUrl(data.avatar_url || '');
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

    const handleAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) return alert('5MB 이하 이미지만 업로드할 수 있어요.');
        if (!file.type.startsWith('image/')) return alert('이미지 파일만 업로드할 수 있어요.');

        setAvatarUploading(true);
        try {
            const sb = createClient();
            const ext = file.name.split('.').pop();
            const path = `avatars/${user.id}_${Date.now()}.${ext}`;
            const { error } = await sb.storage.from('images').upload(path, file, { upsert: true, cacheControl: '3600' });
            if (error) throw error;
            const { data: { publicUrl } } = sb.storage.from('images').getPublicUrl(path);
            setAvatarUrl(publicUrl);
        } catch (err) {
            alert('이미지 업로드 실패: ' + err.message);
        } finally {
            setAvatarUploading(false);
            if (avatarRef.current) avatarRef.current.value = '';
        }
    };

    const handleSave = async () => {
        if (!name.trim()) return alert('이름(닉네임)을 입력해주세요.');
        if (role === 'organizer' && !orgName.trim()) return alert('주최사명을 입력해주세요.');

        setIsSubmitting(true);
        try {
            const sb = createClient();
            const isOrganizer = role === 'organizer';
            const currentPlan = plan;

            // 프로필 업데이트 — 양쪽 필드 모두 저장 (역할 전환해도 데이터 유지)
            const profileUpdate = {
                name: name.trim(),
                avatar_url: avatarUrl || null,
                brand_name: brandName.trim() || null,
                real_name: realName.trim() || null,
                phone: phone.trim() || null,
                products: products.trim() || null,
                promo_link: promoLink.trim() || null,
                organizer_name: orgName.trim() || null,
                organizer_desc: orgDesc.trim() || null,
            };

            // 역할 변경 처리 (승인 없이 즉시 전환)
            if (isOrganizer && currentPlan !== 'organizer') {
                profileUpdate.plan = 'organizer';
            } else if (!isOrganizer && (currentPlan === 'organizer' || currentPlan === 'organizer_pending')) {
                profileUpdate.plan = 'free';
                profileUpdate.seller_type = 'seller';
            }

            // auth 메타데이터 업데이트
            const { error: authErr } = await sb.auth.updateUser({ data: { full_name: name, name: name } });
            if (authErr) throw authErr;

            // profiles 업데이트 (새 컬럼이 없으면 기본 필드만 저장)
            const { error: profileErr } = await sb.from('profiles').update(profileUpdate).eq('id', user.id);
            if (profileErr) {
                console.warn('전체 업데이트 실패, 기본 필드만 저장:', profileErr.message);
                const fallback = { name: name.trim(), organizer_name: orgName.trim() || null };
                if (profileUpdate.plan) fallback.plan = profileUpdate.plan;
                if (profileUpdate.seller_type !== undefined) fallback.seller_type = profileUpdate.seller_type;
                const { error: fallbackErr } = await sb.from('profiles').update(fallback).eq('id', user.id);
                if (fallbackErr) throw fallbackErr;
            }

            // 주최사 선택 시 organizers 테이블 동기화
            if (isOrganizer) {
                await sb.from('organizers').upsert({
                    id: user.id,
                    name: orgName.trim() || name.trim(),
                    description: orgDesc.trim() || null,
                    phone: phone.trim() || null,
                    promo_link: promoLink.trim() || null,
                    contact_name: realName.trim() || null,
                }, { onConflict: 'id' });
            }

            await refreshPlan();
            alert('프로필이 저장되었습니다.');
            router.push('/mypage');
        } catch (err) {
            alert('저장 중 오류가 발생했습니다: ' + (err.message || ''));
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleWithdraw = async () => {
        if (!confirm('정말 탈퇴하시겠습니까?\n\n작성한 리뷰·게시글은 삭제되지 않습니다.\n이 작업은 되돌릴 수 없습니다.')) return;
        if (!confirm('마지막 확인입니다. 정말 탈퇴하시겠습니까?')) return;
        setIsWithdrawing(true);
        try {
            const sb = createClient();
            await sb.from('profiles').delete().eq('id', user.id);
            await sb.auth.signOut();
            alert('탈퇴가 완료되었습니다.');
            router.replace('/');
        } catch (err) {
            alert('탈퇴 처리 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
            setIsWithdrawing(false);
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
                            <div
                                style={{ position: 'relative', cursor: 'pointer' }}
                                onClick={() => !avatarUploading && avatarRef.current?.click()}
                            >
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt="프로필 사진"
                                        style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${T.border}` }}
                                    />
                                ) : (
                                    <div style={{
                                        width: 72, height: 72, borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 30, color: '#fff', fontWeight: 800,
                                    }}>
                                        {(name?.[0] || '?').toUpperCase()}
                                    </div>
                                )}
                                <div style={{
                                    position: 'absolute', bottom: 0, right: 0,
                                    width: 24, height: 24, borderRadius: '50%',
                                    background: T.blue, border: `2px solid ${T.white}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Camera size={12} color="#fff" />
                                </div>
                            </div>
                            <div style={{ fontSize: 12, color: T.gray }}>
                                {avatarUploading ? '업로드 중...' : '사진 변경'}
                            </div>
                            <input
                                ref={avatarRef}
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                style={{ display: 'none' }}
                            />
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
                        {isOrganizer && plan !== 'organizer' && (
                            <div style={{
                                marginTop: 10, background: T.blueLt, border: `1px solid ${T.blue}30`,
                                borderRadius: T.radiusMd, padding: '10px 14px',
                                fontSize: 12, color: T.blue, lineHeight: 1.6,
                            }}>
                                주최사로 전환하면 모집공고를 등록할 수 있어요.
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

                    {/* ── 회원 탈퇴 ── */}
                    <div style={{
                        borderTop: `1px solid ${T.border}`, paddingTop: 20,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    }}>
                        <button
                            onClick={isWithdrawing ? undefined : handleWithdraw}
                            disabled={isWithdrawing}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: 'none', border: 'none',
                                color: T.gray, fontSize: 13, fontWeight: 600,
                                cursor: isWithdrawing ? 'default' : 'pointer', padding: '8px 0',
                            }}
                        >
                            <UserX size={14} />
                            {isWithdrawing ? '처리 중...' : '회원 탈퇴'}
                        </button>
                        <div style={{ fontSize: 11, color: T.gray, textAlign: 'center', lineHeight: 1.6 }}>
                            탈퇴 시 계정 정보가 삭제되며 복구할 수 없습니다.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
