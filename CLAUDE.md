# FLIT — Claude Code 컨텍스트

## 프로젝트 개요

플리마켓/팝업스토어 셀러를 위한 행사 정보 플랫폼.
- 스택: Next.js 15 (App Router) + Supabase + Tailwind CSS
- 상세 태스크는 `TASKS.md` 참고

---

## 접근 권한 정책

| 상태 | 허용 범위 |
|---|---|
| 미로그인 | 목록 조회만 |
| 로그인 (리뷰 0개) | 리뷰 내용 잠금 (작성 유도) |
| 로그인 (리뷰 1개↑) | 전체 열람 가능 |
| organizer 플랜 | 모집공고 작성, 주최사 대시보드 (미구현) |

플랜(구독) 기반 제한은 **보류** — `reviewCount >= 1` 기반으로 대체 중.

---

## 미완료 우선순위

### 🔴 버그 (즉시 수정)
- 평점 null → 0 처리로 평균 왜곡 (`RecruitmentDetail`, `mypage/reviews`)
- 주최사 리뷰 `visitor_types` 배열/string 혼용 가능성

### 🟡 기능 (다음 스프린트)
- 알림 실제 데이터 연동
- 리뷰 수정 / 삭제
- 지원하기 기능
- 주최사 대시보드 / 등록·편집
- 프로필 아바타 업로드
- 문의 폼 실제 전송

### 🟢 인프라
- RLS 정책 전면 검토
- Supabase Storage 설정
- `profiles.review_count` 자동 갱신 트리거
- 프로덕션 환경 변수

### 📋 배포
- Vercel 배포 + Supabase 프로덕션 분리 + 도메인 + SEO

---

## 보류 중 (나중에 재활성화)

- 구독 결제 연동
- 멤버십 관리 메뉴 (마이페이지)
- `SubscriptionLock.js`, `SubscriptionModal.js`, `/subscribe` 페이지

---

## Dead Code

- `src/components/ui/SubscriptionLock.js`
- `src/components/ui/SubscriptionModal.js`
- `src/app/subscribe/page.js`
- `src/lib/plans.js` → `canViewReviewDetail()` (미사용)

---

## 협업 규칙

- 모든 응답 **한국어**
- 커밋 후 즉시 `git push origin main`
- 기능 변경 시 `TASKS.md`도 함께 업데이트
