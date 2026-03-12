'use client';

import { useState } from 'react';
import { T } from '@/lib/design-tokens';

export default function CommunityPage() {
    const [category, setCategory] = useState('실시간 현황');

    const categories = ['실시간 현황', '자유게시판', '질문/답변'];

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            {/* 상단 헤더 영역 */}
            <div style={{
                padding: '24px 20px', background: T.white,
                borderBottom: `1px solid ${T.border}`,
                position: 'sticky', top: 0, zIndex: 10
            }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: T.text, letterSpacing: -0.5 }}>
                    커뮤니티 💬
                </div>
                <div style={{ fontSize: 13, color: T.gray, marginTop: 4 }}>셀러들과 소통하고 정보를 나누세요</div>
            </div>

            {/* 카테고리 탭 */}
            <div style={{
                display: 'flex', gap: 8, padding: '16px 20px',
                overflowX: 'auto', background: T.white, borderBottom: `1px solid ${T.border}`
            }}>
                {categories.map(c => (
                    <div
                        key={c}
                        onClick={() => setCategory(c)}
                        style={{
                            padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600,
                            whiteSpace: 'nowrap', cursor: 'pointer',
                            background: category === c ? T.text : T.white,
                            color: category === c ? T.white : T.gray,
                            border: `1px solid ${category === c ? T.text : T.border}`,
                            transition: 'all 0.15s'
                        }}
                    >
                        {c}
                    </div>
                ))}
            </div>

            {/* 게시판 리스트 스켈레톤 */}
            <div className="page-padding">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.text }}>{category}</div>
                    <div style={{ fontSize: 13, color: T.blue, fontWeight: 600, cursor: 'pointer' }}>+ 글쓰기</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} style={{ 
                            padding: 16, background: T.white, borderRadius: 12, 
                            border: `1px solid ${T.border}` 
                        }}>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                <div style={{ width: 40, height: 16, background: '#f0f0f0', borderRadius: 4, animation: 'pulse 1.5s infinite' }} />
                                <div style={{ width: '60%', height: 16, background: '#f0f0f0', borderRadius: 4, animation: 'pulse 1.5s infinite' }} />
                            </div>
                            <div style={{ width: '100%', height: 14, background: '#f8f8f8', borderRadius: 4, animation: 'pulse 1.5s infinite', marginBottom: 16 }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ width: 60, height: 12, background: '#f0f0f0', borderRadius: 4 }} />
                                <div style={{ width: 80, height: 12, background: '#f0f0f0', borderRadius: 4 }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
