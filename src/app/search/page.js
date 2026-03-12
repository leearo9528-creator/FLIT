'use client';

import { useState } from 'react';
import { T } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';

export default function SearchPage() {
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
            {/* 상단 헤더 영역 */}
            <div style={{
                padding: '24px 20px', background: T.white,
                borderBottom: `1px solid ${T.border}`,
                position: 'sticky', top: 0, zIndex: 10
            }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: T.text, letterSpacing: -0.5, marginBottom: 12 }}>
                    마켓 찾기
                </div>
                
                {/* 검색 바 */}
                <div style={{
                    display: 'flex', alignItems: 'center', background: T.border,
                    borderRadius: 8, padding: '12px 16px'
                }}>
                    <span style={{ fontSize: 16, marginRight: 8 }}>🔍</span>
                    <input 
                        type="text" 
                        placeholder="지역이나 행사명을 검색해보세요"
                        style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: 15 }}
                    />
                </div>
            </div>

            {/* 뷰 전환 탭 (리스트 / 지도) */}
            <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}`, background: T.white }}>
                <div 
                    onClick={() => setViewMode('list')}
                    style={{ 
                        flex: 1, textAlign: 'center', padding: '14px 0', fontSize: 15, fontWeight: viewMode === 'list' ? 700 : 500,
                        color: viewMode === 'list' ? T.text : T.gray, cursor: 'pointer',
                        borderBottom: viewMode === 'list' ? `2px solid ${T.text}` : '2px solid transparent'
                    }}
                >
                    📝 리스트 뷰
                </div>
                <div 
                    onClick={() => setViewMode('map')}
                    style={{ 
                        flex: 1, textAlign: 'center', padding: '14px 0', fontSize: 15, fontWeight: viewMode === 'map' ? 700 : 500,
                        color: viewMode === 'map' ? T.text : T.gray, cursor: 'pointer',
                        borderBottom: viewMode === 'map' ? `2px solid ${T.text}` : '2px solid transparent'
                    }}
                >
                    🗺️ 지도 뷰
                </div>
            </div>

            {/* 컨텐츠 영역 스켈레톤 UI */}
            <div className="page-padding" style={{ paddingTop: 20 }}>
                {viewMode === 'list' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} style={{ height: 120, background: '#f0f0f0', borderRadius: 16, animation: 'pulse 1.5s infinite' }} />
                        ))}
                    </div>
                ) : (
                    <div style={{ 
                        width: '100%', height: 'calc(100vh - 260px)', 
                        background: '#e0e0e0', borderRadius: 16, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: T.gray, fontSize: 15, fontWeight: 600
                    }}>
                        지도 API 연동 대기중... 🗺️
                    </div>
                )}
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
