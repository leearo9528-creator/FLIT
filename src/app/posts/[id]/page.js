'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { T } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';
import Card from '@/components/ui/Card';

export default function PostDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const { getSupabase } = await import('@/lib/supabase');
            const sb = getSupabase();
            const { data, error } = await sb
                .from('posts')
                .select('*, event:events(*)')
                .eq('id', id)
                .single();

            if (data) setPost(data);
            setLoading(false);
        };
        fetchPost();
    }, [id]);

    if (loading) return <div style={{ padding: 20 }}>로딩 중...</div>;
    if (!post) return <div style={{ padding: 20 }}>공고를 찾을 수 없습니다.</div>;

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 40 }}>
            <TopBar
                title="공고 상세"
                hasBack
                onBack={() => router.back()}
            />

            <div className="page-padding">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* 메인 카드 */}
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{
                                padding: '4px 8px', borderRadius: 4,
                                background: post.recruitment_type === '플리마켓' ? T.blueLt : T.greenLt,
                                color: post.recruitment_type === '플리마켓' ? T.blue : T.green,
                                fontSize: 12, fontWeight: 700
                            }}>
                                {post.recruitment_type}
                            </div>
                            <div style={{ fontSize: 13, color: T.gray }}>
                                마감일: {post.deadline || '상시모집'}
                            </div>
                        </div>
                        <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, marginBottom: 16, lineHeight: 1.4 }}>
                            {post.title}
                        </h1>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: `1px solid ${T.border}`, paddingTop: 16 }}>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <span style={{ color: T.gray, width: 80 }}>📍 장소</span>
                                <span style={{ color: T.text, fontWeight: 500 }}>{post.location_sido} {post.location_sigungu}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <span style={{ color: T.gray, width: 80 }}>📅 일정</span>
                                <span style={{ color: T.text, fontWeight: 500 }}>{post.event_date_start} ~ {post.event_date_end}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <span style={{ color: T.gray, width: 80 }}>💰 참가비</span>
                                <span style={{ color: T.text, fontWeight: 500 }}>{post.fee || '무료'}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <span style={{ color: T.gray, width: 80 }}>👥 모집규모</span>
                                <span style={{ color: T.text, fontWeight: 500 }}>{post.recruit_count ? `${post.recruit_count}팀` : '미정'}</span>
                            </div>
                        </div>
                    </Card>

                    {/* 상세 내용 */}
                    <Card>
                        <h2 style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 16 }}>상세 내용</h2>
                        <div style={{
                            fontSize: 15, color: T.textSub, lineHeight: 1.8,
                            whiteSpace: 'pre-wrap', wordBreak: 'break-all'
                        }}>
                            {post.content || '등록된 상세 내용이 없습니다.'}
                        </div>
                    </Card>

                    {/* 연결된 행사 바로가기 */}
                    {post.event && (
                        <Link href={`/events/${post.event.id}`}>
                            <Card style={{ border: `1px solid ${T.blue}`, background: T.blueLt }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: 12, color: T.blue, fontWeight: 700, marginBottom: 4 }}>연결된 행사 정보</div>
                                        <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{post.event.name}</div>
                                    </div>
                                    <span style={{ fontSize: 20 }}>➔</span>
                                </div>
                            </Card>
                        </Link>
                    )}

                    {/* 신청 버튼 */}
                    <div style={{
                        background: T.text, borderRadius: T.radiusMd, padding: '18px 0',
                        textAlign: 'center', color: T.white, fontSize: 16, fontWeight: 700,
                        cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginTop: 10
                    }}>
                        공고 원문 확인 및 신청하기
                    </div>
                </div>
            </div>
        </div>
    );
}
