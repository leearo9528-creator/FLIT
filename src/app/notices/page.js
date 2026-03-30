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

• 마이페이지 > 프로필 수정에서 역할을 '주최사'로 변경하면 바로 공고를 등록할 수 있습니다.
• 문의사항은 행사 개최 문의 페이지를 이용해 주세요.`,
    },
    {
        id: 4,
        date: '2026.03.31',
        title: '플릿(FLIT) 서비스 구조 안내 — 이렇게 이용하세요!',
        content: `플릿은 플리마켓·푸드트럭 셀러와 주최사를 연결하는 플랫폼이에요. 처음 오신 분들을 위해 서비스 구조를 안내드릴게요.


🎪 행사 (Event)
플릿의 가장 기본 단위예요. '서울밤도깨비야시장', '홍대 프리마켓' 같은 행사 브랜드가 등록되어 있어요.

같은 행사라도 날짜와 장소가 다르면 별도의 '개최 회차'로 관리돼요. 예를 들어 '홍대 프리마켓'이 4월 5일, 4월 12일에 열리면 각각 하나의 회차예요.


📋 모집공고 (Recruitment)
주최사가 셀러를 모집할 때 올리는 공고예요. 참가비, 부스 규격, 모집 마감일, 신청 방법 등이 포함돼요.

하나의 행사 회차에 하나의 공고가 연결돼요. 셀러 여러분은 공고를 보고 참가 여부를 결정하시면 됩니다.

마음에 드는 공고는 북마크(스크랩)해서 마이페이지에서 모아볼 수 있어요!


⭐ 리뷰 (Review)
행사에 참가한 셀러가 작성하는 후기예요. 매출, 유동인구, 운영지원, 주최사 매너 등을 평가할 수 있어요.

리뷰를 1개 작성하면 1주일간 다른 셀러들의 리뷰를 모두 열람할 수 있어요. (매주 월요일 자정 리셋)

솔직한 리뷰가 쌓일수록 다음 행사를 선택할 때 더 좋은 판단을 할 수 있어요!


🏢 주최사 (Organizer)
행사를 기획하고 셀러를 모집하는 분이에요. 주최사 페이지에서 지금까지 개최한 행사 이력, 셀러 리뷰, 연락처 등을 확인할 수 있어요.

주최사로 등록하고 싶다면? 마이페이지 > 프로필 수정에서 역할을 '주최사'로 전환하면 바로 공고를 올릴 수 있어요!


💡 이용 팁
1. 행사 찾기에서 관심 있는 공고를 북마크하세요
2. 행사 참가 후 리뷰를 작성하면 다른 리뷰를 열람할 수 있어요
3. 커뮤니티에서 다른 셀러들과 정보를 나눠보세요
4. 행사 양도/양수 게시판도 활용해보세요

플릿과 함께 더 나은 마켓 경험을 만들어가요! 🙌`,
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
