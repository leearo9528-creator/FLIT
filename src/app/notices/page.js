'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { T } from '@/lib/design-tokens';
import TopBar from '@/components/ui/TopBar';

const NOTICES = [
    {
        id: 1,
        date: '2026.03.30',
        title: '플릿(FLIT) 서비스 오픈 안내',
        content: `안녕하세요, 플릿(FLIT)입니다.

플리마켓·팝업스토어 셀러를 위한 행사 정보 플랫폼 플릿이 정식 오픈했습니다.

주요 기능:
• 전국 플리마켓·팝업스토어 행사 정보 조회
• 셀러 리뷰 작성 및 열람
• 모집공고 확인 및 지원
• 커뮤니티 게시판

앞으로 더 나은 서비스로 찾아뵙겠습니다. 감사합니다.`,
    },
    {
        id: 2,
        date: '2026.03.30',
        title: '리뷰 열람 정책 안내',
        content: `플릿의 리뷰 열람 정책을 안내드립니다.

• 리뷰를 1개 이상 작성하시면 1주일간 모든 리뷰를 열람하실 수 있습니다.
• 열람 권한은 매주 월요일 자정에 초기화됩니다.
• 계속 리뷰를 열람하시려면 매주 리뷰를 작성해 주세요.

양질의 리뷰 생태계를 만들기 위한 정책이니 많은 참여 부탁드립니다.`,
    },
    {
        id: 3,
        date: '2026.03.30',
        title: '주최사 등록 안내',
        content: `행사를 기획하고 셀러를 모집하고 싶으신가요?

마이페이지 > 역할 변경에서 "행사 의뢰하러 왔어요"를 선택하시면 주최사 전환을 신청할 수 있습니다.

• 관리자 승인 후 모집공고를 등록하실 수 있습니다.
• 승인까지 영업일 기준 1~2일이 소요될 수 있습니다.
• 문의사항은 행사 개최 문의 페이지를 이용해 주세요.`,
    },
];

function NoticeItem({ notice }) {
    const [open, setOpen] = useState(false);
    const Icon = open ? ChevronUp : ChevronDown;

    return (
        <div style={{
            background: T.white,
            borderBottom: `1px solid ${T.border}`,
        }}>
            <div
                onClick={() => setOpen(!open)}
                style={{
                    padding: '16px 20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    cursor: 'pointer',
                }}
            >
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: T.gray, marginBottom: 4 }}>{notice.date}</div>
                    <div style={{
                        fontSize: 14, fontWeight: 700, color: T.text,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                        {notice.title}
                    </div>
                </div>
                <Icon size={18} color={T.gray} style={{ flexShrink: 0, marginLeft: 12 }} />
            </div>

            {open && (
                <div style={{
                    padding: '0 20px 20px',
                    fontSize: 13, color: T.textSub || '#4E5968',
                    lineHeight: 1.8, whiteSpace: 'pre-line',
                }}>
                    {notice.content}
                </div>
            )}
        </div>
    );
}

export default function NoticesPage() {
    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
            <TopBar title="공지사항" back />

            <div style={{ marginTop: 8, borderTop: `1px solid ${T.border}` }}>
                {NOTICES.map(n => (
                    <NoticeItem key={n.id} notice={n} />
                ))}
            </div>
        </div>
    );
}
