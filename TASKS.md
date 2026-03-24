# FLIT 태스크 목록

> 상태: `[ ]` 미완료 / `[~]` 진행중 / `[x]` 완료 / `[-]` 보류(나중에 재활성화)

---

## 🔴 버그 / 긴급

- [x] 커뮤니티 글 상세 "게시글을 찾을 수 없어요" 오류 (posts 테이블 컬럼 누락 → migration 적용)
- [x] 커뮤니티 목록 `fetchPosts` useCallback 의존성 배열에 `category` 누락 → 필터 미반영 버그
- [ ] 평점 계산 왜곡: null 값을 0으로 처리해 평균 낮게 표시됨 (RecruitmentDetail, mypage/reviews)
- [ ] 주최사 리뷰 `visitor_types` 필드 Supabase 배열/string 혼용 가능성

---

## 🟡 기능 개발

### 인증 & 사용자
- [x] 소셜 로그인 (카카오 / 구글) OAuth 연동
- [x] 회원가입 시 seller_type 선택 온보딩 플로우
- [x] 전역 auth-context (user / plan / reviewCount / refreshPlan)
- [-] 구독 결제 연동 — 보류 (나중에 재활성화)

### 홈
- [x] 히어로 배너 캐러셀 (터치 스와이프 + 자동 슬라이드)
- [x] 핫한 모집공고 섹션
- [x] 최근 리뷰 피드 섹션
- [x] 커뮤니티 인기글 섹션
- [x] 홈 데이터 SSR(Server Component) 최적화 (`Promise.all` 병렬 fetch)
- [x] NotificationDrawer 동적 임포트 (`ssr: false`)
- [ ] 알림 실제 데이터 연동 (NotificationDrawer)

### 검색
- [x] 모집공고 / 리뷰 / 주최사 탭 검색
- [x] 필터 (지역, 셀러 유형, 참가비, 정렬)
- [x] 무한 스크롤 (IntersectionObserver)
- [x] 검색 워터폴 쿼리 → 단일 JOIN 쿼리로 최적화
- [x] next/image 최적화 (organizer 로고)
- [ ] 검색어 자동완성 / 최근 검색어

### 행사
- [x] 행사 상세 페이지 (탭: 리뷰 / 모집공고 / 행사정보)
- [x] 셀러 평가 요약 — 리뷰 1개 작성 시에만 공개 (잠금 UI)
- [x] 스크랩(북마크) DB 연동
- [x] next/image 최적화
- [ ] 행사 이미지 업로드 (주최사용)

### 주최사
- [x] 주최사 상세 페이지 (탭: 모집공고 / 행사 이력 / 셀러 리뷰)
- [x] 주최사 평가 요약 — 리뷰 1개 작성 시에만 공개 (잠금 UI)
- [x] next/image 최적화 (로고)
- [ ] 주최사 대시보드 (organizer 플랜 전용)
- [ ] 주최사 등록 / 편집 기능

### 모집공고
- [x] 모집공고 상세 페이지 (스크랩, 주최사 리뷰 포함)
- [x] 주최사 평가 요약 — 리뷰 1개 작성 시에만 공개 (잠금 UI)
- [x] 모집공고 작성 (`/recruitments/write`, organizer 전용)
- [ ] 지원하기 기능 (지원자 목록 관리)
- [ ] 지원 현황 알림

### 리뷰
- [x] 리뷰 작성 페이지 (행사/셀러 유형/별점/매출/방문객 데이터)
- [x] 리뷰 열람 권한: **reviewCount >= 1** 기반 (plan 기반에서 전환)
- [x] 리뷰 잠금 UI (미로그인 → 로그인 유도, 로그인 → 리뷰 작성 유도)
- [ ] 리뷰 수정 / 삭제
- [ ] 리뷰 신고 기능

### 커뮤니티
- [x] 게시글 목록 (탭: 전체/익명, 필터: 카테고리/셀러유형/정렬, 무한스크롤)
- [x] 게시글 상세 (본문 + 작성자 + 좋아요 + 공유 + 메뉴)
- [x] 게시글 수정 / 삭제 (작성자 본인)
- [x] 댓글 작성 / 수정 / 삭제
- [x] 좋아요 기능
- [x] 게시글 작성 (실명/익명 선택 + 제목 + 내용)

### 마이페이지
- [x] 프로필 카드 (이름/이메일/소셜 연동 배지)
- [x] 활동 통계 (리뷰 수 / 관심 행사 수 / 게시글 수)
- [x] 내가 쓴 리뷰 목록
- [x] 관심 행사(스크랩) 목록
- [x] 내가 쓴 게시글 목록
- [x] 프로필 닉네임 수정
- [x] 알림 설정 (토글 UI)
- [-] 멤버십 관리 메뉴 — 보류 (나중에 재활성화)
- [ ] 프로필 아바타 이미지 업로드

### 문의
- [x] 행사 개최 문의 페이지 (`/contact`)
- [ ] 문의 폼 이메일 발송 또는 DB 저장

---

## 🟢 인프라 / DB

- [x] V2 스키마 (base_events + event_instances 분리)
- [x] 커뮤니티 테이블 생성 마이그레이션 (posts, post_comments, contact_requests)
- [x] 리뷰 누락 컬럼 수정 마이그레이션
- [x] posts/post_comments 누락 컬럼 보완 마이그레이션 (`fix_posts_community_columns.sql`)
- [x] Supabase next/image 도메인 허용 (`next.config.mjs`)
- [x] 엑셀 데이터 입력 양식 (`FLIT_데이터입력양식.xlsx`)
- [ ] RLS(Row Level Security) 정책 전면 검토
- [ ] Supabase Storage 이미지 업로드 설정
- [ ] 프로덕션 환경 변수 설정
- [ ] profiles 테이블 review_count 자동 갱신 트리거 (현재 수동)

---

## 🔵 UX / 디자인

- [ ] 로딩 스켈레톤 UI 통일
- [ ] 에러 상태 UI (404, 500)
- [ ] 빈 상태 UI 일관화 (데이터 없을 때)
- [ ] 토스트 알림 컴포넌트
- [ ] 이미지 fallback 처리

---

## 📋 배포

- [ ] Vercel 배포 설정
- [ ] Supabase 프로덕션 프로젝트 분리
- [ ] 도메인 연결
- [ ] SEO 메타태그 설정

---

## 🗂️ Dead Code / 정리 예정

- `src/components/ui/SubscriptionLock.js` — 현재 미사용 (멤버십 숨김 중)
- `src/components/ui/SubscriptionModal.js` — 현재 미사용 (멤버십 숨김 중)
- `src/app/subscribe/page.js` — 진입점 없음, 나중에 재활성화 예정
- `src/lib/plans.js` → `canViewReviewDetail()` 함수 사용처 없음 (reviewCount 방식으로 전환됨)
