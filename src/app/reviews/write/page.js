'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { T, inputStyle } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function ReviewWritePage() {
    const router = useRouter();
    const [brands, setBrands] = useState([]);
    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // 평가 핢목
    const [rProfit, setRProfit] = useState(0);    // 수익성
    const [rTraffic, setRTraffic] = useState(0);  // 집객력
    const [rSupport, setRSupport] = useState(0);  // 운영지원
    const [rManners, setRManners] = useState(0);  // 주최측 매너

    const [title, setTitle] = useState('');       // 한줄평
    const [content, setContent] = useState('');   // 종합 리뷰
    const [pros, setPros] = useState('');         // 장점
    const [cons, setCons] = useState('');         // 단점
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchBrands = async () => {
             const { createClient } = await import('@/utils/supabase/client');
             const sb = createClient();
             const { data } = await sb.from('brands')
                 .select('id, name, category')
                 .order('name', { ascending: true });
             if (data) setBrands(data);
        };
        fetchBrands();
    }, []);

    const handleSubmit = async () => {
        if (!selectedBrandId) return alert('브랜드(주최측)를 선택해주세요.');
        if (!rProfit || !rTraffic || !rSupport || !rManners) return alert('모든 항목의 별점을 입력해주세요.');
        if (!title.trim()) return alert('한줄평(제목)을 입력해주세요.');

        setIsSubmitting(true);
        try {
            const { createClient } = await import('@/utils/supabase/client');
            const sb = createClient();
            const { data: { session } } = await sb.auth.getSession();

            if (!session?.user) {
                alert('로그인이 필요합니다.');
                router.push('/login');
                return;
            }

            const { error } = await sb.from('company_reviews').insert({
                brand_id: selectedBrandId,
                user_id: session.user.id,
                rating_profit: rProfit,
                rating_traffic: rTraffic,
                rating_support: rSupport,
                rating_manners: rManners,
                title: title,
                content: content,
                pros: pros,
                cons: cons,
                is_verified: false
            });

            if (error) throw error;

            alert('소중한 리뷰가 등록되었습니다! 혜택 카운트가 1 증가합니다.');
            router.push('/mypage');
        } catch (err) {
            console.error('리뷰 등록 에러:', err);
            alert('저장 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredBrands = brands.filter(b => b.name.includes(searchKeyword));
    const overall = rProfit && rTraffic && rSupport && rManners ? ((rProfit + rTraffic + rSupport + rManners) / 4).toFixed(1) : null;

    return (
        <div style={{ minHeight: '100vh', background: T.bg }}>
            <TopBar title="브랜드 리뷰 작성" hasBack onBack={() => router.back()} />

            <div className="page-padding">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {/* 주최측 선택 */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 14 }}>어떤 주최측의 리뷰인가요?</div>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', background: T.bg, borderRadius: T.radiusMd,
                                border: `1.5px solid ${selectedBrandId ? T.blue : T.border}`, padding: '0 16px',
                            }}>
                                <span style={{ fontSize: 16 }}>🔍</span>
                                <input
                                    type="text"
                                    placeholder="주최측 브랜드명을 검색해주세요"
                                    value={searchKeyword}
                                    onChange={(e) => {
                                        setSearchKeyword(e.target.value);
                                        setIsDropdownOpen(true);
                                        if (selectedBrandId) setSelectedBrandId('');
                                    }}
                                    onFocus={() => setIsDropdownOpen(true)}
                                    style={{
                                        flex: 1, padding: '13px 8px', border: 'none', background: 'transparent',
                                        fontSize: 14, color: T.text, outline: 'none'
                                    }}
                                />
                                {isDropdownOpen && (
                                    <div
                                        onClick={() => {
                                            setSearchKeyword(''); setSelectedBrandId(''); setIsDropdownOpen(false);
                                        }}
                                        style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.gray, fontSize: 18 }}
                                    >×</div>
                                )}
                            </div>
                            
                            {isDropdownOpen && (
                                <div style={{
                                    position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
                                    background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxHeight: 240, overflowY: 'auto', zIndex: 10
                                }}>
                                    {filteredBrands.length > 0 ? (
                                        filteredBrands.map(b => (
                                            <div
                                                key={b.id}
                                                onClick={() => {
                                                    setSelectedBrandId(b.id);
                                                    setSearchKeyword(b.name);
                                                    setIsDropdownOpen(false);
                                                }}
                                                style={{ padding: '12px 16px', borderBottom: `1px solid ${T.border}`, cursor: 'pointer' }}
                                            >
                                                <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{b.name}</div>
                                                <div style={{ fontSize: 12, color: T.gray }}>{b.category || '기획사'}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ padding: '24px 16px', textAlign: 'center', color: T.gray, fontSize: 13 }}>
                                            검색 결과가 없습니다 😢
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* 항목별 별점 */}
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                            <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>항목별 별점</div>
                            {overall && (
                                <div style={{ background: T.blueLt, borderRadius: 10, padding: '6px 14px', fontSize: 13, fontWeight: 700, color: T.blue }}>
                                    종합 ★ {overall}
                                </div>
                            )}
                        </div>
                        {[['💰 수익성', rProfit, setRProfit], ['👥 집객력', rTraffic, setRTraffic], ['🤝 운영지원', rSupport, setRSupport], ['😊 주최측 매너', rManners, setRManners]].map(([l, v, sv]) => (
                            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                <span style={{ fontSize: 14, fontWeight: 600, color: T.text, width: 140, flexShrink: 0 }}>{l}</span>
                                <div style={{ display: 'flex', gap: 4 }}>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <span key={s} onClick={() => sv(s)} style={{
                                            fontSize: 28, cursor: 'pointer',
                                            filter: s <= v ? 'none' : 'grayscale(1) opacity(0.3)',
                                            transition: 'filter 0.1s',
                                        }}>⭐</span>
                                    ))}
                                </div>
                                {v > 0 && <span style={{ fontSize: 15, fontWeight: 800, color: T.text }}>{v}.0</span>}
                            </div>
                        ))}
                    </Card>

                    {/* 한줄평 & 상세리뷰 */}
                    <Card>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 14 }}>리뷰 내용 작성</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 8, display: 'block' }}>한줄평 (제목)</label>
                                <input value={title} onChange={(e) => setTitle(e.target.value)}
                                    placeholder="어떤 점이 가장 기억에 남나요?" style={inputStyle(title)} />
                            </div>
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 8, display: 'block' }}>장점 <span style={{ color: T.blue, fontWeight: 400 }}>(선택)</span></label>
                                <textarea value={pros} onChange={(e) => setPros(e.target.value)}
                                    placeholder="주최측의 좋았던 점을 적어주세요." rows={2}
                                    style={{ ...inputStyle(pros), resize: 'none' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 8, display: 'block' }}>단점 <span style={{ color: T.blue, fontWeight: 400 }}>(선택)</span></label>
                                <textarea value={cons} onChange={(e) => setCons(e.target.value)}
                                    placeholder="주최측의 아쉬웠던 점을 적어주세요." rows={2}
                                    style={{ ...inputStyle(cons), resize: 'none' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 8, display: 'block' }}>종합 평가 <span style={{ color: T.blue, fontWeight: 400 }}>(선택)</span></label>
                                <textarea value={content} onChange={(e) => setContent(e.target.value)}
                                    placeholder="자세한 경험을 공유해주세요." rows={4}
                                    style={{ ...inputStyle(content), resize: 'none' }} />
                            </div>
                        </div>
                    </Card>

                    {/* 등록 버튼 */}
                    <div
                        onClick={isSubmitting ? null : handleSubmit}
                        style={{
                            background: isSubmitting ? T.gray : T.blue, borderRadius: T.radiusMd,
                            padding: 16, textAlign: 'center', color: '#fff', fontSize: 16,
                            fontWeight: 800, cursor: isSubmitting ? 'default' : 'pointer',
                        }}
                    >
                        {isSubmitting ? '처리 중...' : '리뷰 등록하고 무료 혜택 받기'}
                    </div>
                </div>
            </div>
        </div>
    );
}
