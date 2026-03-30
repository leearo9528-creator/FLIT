'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import { createClient } from '@/utils/supabase/client';
import TopBar from '@/components/ui/TopBar';

// DB 공지 + 하드코딩 기본 공지 (DB에 없을 때 폴백)
const FALLBACK_NOTICES = [
    {
        id: 'fallback-1', date: '2026.03.30', title: '플릿(FLIT) 서비스 오픈 안내',
        content: '안녕하세요, 플릿(FLIT)입니다.\n\n플리마켓·팝업스토어 셀러를 위한 행사 정보 플랫폼 플릿이 정식 오픈했습니다.\n\n주요 기능:\n• 전국 플리마켓·팝업스토어 행사 정보 조회\n• 셀러 리뷰 작성 및 열람\n• 모집공고 확인 및 지원\n• 커뮤니티 게시판',
    },
    {
        id: 'fallback-2', date: '2026.03.30', title: '리뷰 열람 정책 안내',
        content: '리뷰를 1개 이상 작성하시면 1주일간 모든 리뷰를 열람하실 수 있습니다.\n열람 권한은 매주 월요일 자정에 초기화됩니다.',
    },
    {
        id: 'fallback-3', date: '2026.03.31', title: '주최사 등록 안내',
        content: '마이페이지 > 프로필 수정에서 역할을 "주최사"로 변경하면 바로 공고를 등록할 수 있습니다.',
    },
];

function NoticeItem({ notice }) {
    const [open, setOpen] = useState(false);
    const Icon = open ? ChevronUp : ChevronDown;
    const date = notice.date || (notice.created_at ? new Date(notice.created_at).toLocaleDateString('ko-KR') : '');

    return (
        <div style={{ background: T.white, borderBottom: `1px solid ${T.border}` }}>
            <div onClick={() => setOpen(!open)} style={{
                padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
            }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: T.gray, marginBottom: 4 }}>{date}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {notice.title}
                    </div>
                </div>
                <Icon size={18} color={T.gray} style={{ flexShrink: 0, marginLeft: 12 }} />
            </div>
            {open && (
                <div style={{ padding: '0 20px 20px', fontSize: 13, color: T.textSub || '#4E5968', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                    {notice.content}
                </div>
            )}
        </div>
    );
}

export default function NoticesPage() {
    const router = useRouter();
    const [notices, setNotices] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const sb = createClient();
            const { data } = await sb.from('notices').select('*').order('created_at', { ascending: false });
            setNotices(data?.length ? data : FALLBACK_NOTICES);
            setLoaded(true);
        })();
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title="공지사항" back />

            {/* 이용 가이드 배너 */}
            <div onClick={() => router.push('/notices/guide')} style={{
                margin: '12px 16px', padding: '14px 18px', borderRadius: T.radiusLg,
                background: 'linear-gradient(135deg, #F59E0B, #EA580C)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>📖 플릿 이용 가이드</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>서비스 구조와 이용 방법 확인하기 →</div>
                </div>
            </div>

            {/* 공지 목록 */}
            <div style={{ marginTop: 8, borderTop: `1px solid ${T.border}` }}>
                {!loaded ? (
                    Array(3).fill(0).map((_, i) => <div key={i} style={{ height: 60, background: T.grayLt, margin: '0 16px', borderRadius: T.radiusLg, marginBottom: 8, marginTop: 8, animation: 'pulse 1.5s infinite' }} />)
                ) : (
                    notices.map(n => <NoticeItem key={n.id} notice={n} />)
                )}
            </div>
        </div>
    );
}
