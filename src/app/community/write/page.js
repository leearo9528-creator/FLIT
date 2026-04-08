'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserCheck, UserX } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';
import ImageUploader from '@/components/ui/ImageUploader';

/* ─── Page ───────────────────────────────────────────────────── */
export default function CommunityWritePage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [isAnon, setIsAnon] = useState(true);
    const [category, setCategory] = useState('자유게시판');

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const WRITE_CATEGORIES = ['자유게시판', '행사 양도/양수'];

    useEffect(() => {
        if (!authLoading && !user) router.replace('/login');
    }, [user, authLoading, router]);

    const userNickname = user?.user_metadata?.full_name || user?.user_metadata?.name || '셀러';

    const handleSubmit = async () => {
        if (!title.trim()) return alert('제목을 입력해주세요.');
        if (!content.trim()) return alert('내용을 입력해주세요.');
        if (!user) { alert('로그인이 필요합니다.'); router.push('/login'); return; }

        setIsSubmitting(true);
        try {
            const sb = createClient();

            const payload = {
                user_id: user.id,
                author: isAnon ? null : (user.user_metadata?.full_name || user.user_metadata?.name || '셀러'),
                title: title.trim(),
                content: content.trim(),
                category: isAnon ? '익명' : category,
                is_anonymous: isAnon,
                anonymous_name: null,
            };
            if (images.length > 0) payload.images = images;
            const { error } = await sb.from('posts').insert(payload);
            if (error) throw error;
            router.push('/community');
        } catch (err) {
            console.error('글쓰기 에러:', err);
            alert('저장 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title="글쓰기" back />

            <div className="page-padding">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* ── 작성자 표시 ── */}
                    <Card>
                        <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 12 }}>작성자 표시</div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <div
                                onClick={() => setIsAnon(false)}
                                style={{
                                    flex: 1, padding: '12px 14px', borderRadius: T.radiusLg, cursor: 'pointer',
                                    border: `2px solid ${!isAnon ? T.blue : T.border}`,
                                    background: !isAnon ? T.blueLt : T.white,
                                    display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.15s',
                                }}
                            >
                                <UserCheck size={20} color={!isAnon ? T.blue : T.gray} />
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: !isAnon ? T.blue : T.text }}>실명</div>
                                    <div style={{ fontSize: 11, color: T.gray, marginTop: 1 }}>{userNickname || '내 닉네임'}</div>
                                </div>
                            </div>
                            <div
                                onClick={() => setIsAnon(true)}
                                style={{
                                    flex: 1, padding: '12px 14px', borderRadius: T.radiusLg, cursor: 'pointer',
                                    border: `2px solid ${isAnon ? T.blue : T.border}`,
                                    background: isAnon ? T.blueLt : T.white,
                                    display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.15s',
                                }}
                            >
                                <UserX size={20} color={isAnon ? T.blue : T.gray} />
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: isAnon ? T.blue : T.text }}>익명</div>
                                    <div style={{ fontSize: 11, color: T.gray, marginTop: 1 }}>익명으로 표시됩니다</div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* ── 카테고리 (실명 글일 때) ── */}
                    {!isAnon && (
                        <Card>
                            <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 12 }}>카테고리</div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {WRITE_CATEGORIES.map(c => (
                                    <div key={c} onClick={() => setCategory(c)} style={{
                                        padding: '8px 16px', borderRadius: T.radiusFull, cursor: 'pointer',
                                        fontSize: 13, fontWeight: 600,
                                        background: category === c ? T.text : T.white,
                                        color: category === c ? '#fff' : T.gray,
                                        border: `1.5px solid ${category === c ? T.text : T.border}`,
                                        transition: 'all 0.15s',
                                    }}>{c}</div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* ── 사진 ── */}
                    <Card>
                        <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 12 }}>사진 첨부</div>
                        <ImageUploader images={images} onChange={setImages} folder="posts" max={5} />
                        <div style={{ fontSize: 11, color: T.gray, marginTop: 8 }}>최대 5장, 장당 5MB 이하</div>
                    </Card>

                    {/* ── 제목 + 내용 ── */}
                    <Card>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                            style={{
                                width: '100%', border: 'none', borderBottom: `1px solid ${T.border}`,
                                padding: '0 0 14px', fontSize: 17, fontWeight: 700,
                                color: T.text, outline: 'none', background: 'transparent',
                                marginBottom: 14, boxSizing: 'border-box',
                            }}
                        />
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="내용을 자유롭게 입력해주세요."
                            rows={8}
                            style={{
                                width: '100%', border: 'none', fontSize: 15, color: T.text,
                                outline: 'none', background: 'transparent', resize: 'none',
                                lineHeight: 1.7, fontFamily: 'inherit', boxSizing: 'border-box',
                            }}
                        />
                    </Card>

                    {/* ── 게시 버튼 ── */}
                    <button
                        onClick={isSubmitting ? null : handleSubmit}
                        disabled={isSubmitting}
                        style={{
                            width: '100%', padding: 16, borderRadius: T.radiusMd,
                            background: isSubmitting ? T.gray : T.blue,
                            border: 'none', color: '#fff', fontSize: 16, fontWeight: 800,
                            cursor: isSubmitting ? 'default' : 'pointer', transition: 'background 0.15s',
                            marginTop: 8,
                        }}
                    >
                        {isSubmitting ? '게시 중...' : '게시하기'}
                    </button>

                </div>
            </div>
        </div>
    );
}
