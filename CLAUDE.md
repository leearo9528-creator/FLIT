# FLIT — Claude Code 컨텍스트

## 프로젝트 개요

플리마켓/팝업스토어 셀러를 위한 행사 정보 플랫폼.
- 스택: Next.js 15 (App Router) + Supabase + Tailwind CSS

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

## 태스크

> 상태: `[ ]` 미완료 / `[~]` 진행중 / `[x]` 완료 / `[-]` 보류

### 🔴 버그 / 긴급

- [x] 커뮤니티 글 상세 "게시글을 찾을 수 없어요" 오류 (posts 테이블 컬럼 누락 → migration 적용)
- [x] 커뮤니티 목록 `fetchPosts` useCallback 의존성 배열에 `category` 누락
- [x] 평점 null → 0 처리로 평균 왜곡 (`RecruitmentDetailClient` 수정 완료)
- [x] 주최사 리뷰 `visitor_types` 배열/string 혼용 → 모든 곳에서 `Array.isArray` 처리 중 (정상)
- [x] Supabase 에러 처리 누락 (6개 파일) + onboarding loading 상태 버그

### 🟡 기능 개발

#### 인증 & 사용자
- [x] 카카오 / 구글 소셜 로그인 OAuth 연동
- [x] 회원가입 시 seller_type 선택 온보딩 플로우
- [x] 전역 auth-context (user / plan / reviewCount / refreshPlan)
- [-] 구독 결제 연동

#### 홈
- [x] 히어로 배너 캐러셀 (터치 스와이프 + 자동 슬라이드)
- [x] 핫한 모집공고 / 최근 리뷰 피드 / 커뮤니티 인기글 섹션
- [x] 홈 데이터 SSR 최적화 (`Promise.all` 병렬 fetch)
- [x] NotificationDrawer 동적 임포트 (`ssr: false`)
- [ ] 알림 실제 데이터 연동

#### 검색
- [x] 모집공고 / 리뷰 / 주최사 탭 검색
- [x] 필터 (지역, 셀러 유형, 참가비, 정렬) + 무한 스크롤
- [x] 워터폴 쿼리 → 단일 JOIN 쿼리로 최적화
- [ ] 검색어 자동완성 / 최근 검색어

#### 행사
- [x] 행사 상세 페이지 (탭: 리뷰 / 모집공고 / 행사정보)
- [x] 셀러 평가 요약 — 리뷰 1개 작성 시에만 공개 (잠금 UI)
- [x] 스크랩(북마크) DB 연동
- [ ] 행사 이미지 업로드 (주최사용)

#### 주최사
- [x] 주최사 상세 페이지 (탭: 모집공고 / 행사 이력 / 셀러 리뷰)
- [x] 주최사 평가 요약 — 리뷰 1개 작성 시에만 공개 (잠금 UI)
- [ ] 주최사 대시보드 (organizer 플랜 전용)
- [ ] 주최사 등록 / 편집 기능

#### 모집공고
- [x] 모집공고 상세 페이지 + 작성 페이지 (organizer 전용)
- [x] 주최사 평가 요약 — 리뷰 1개 작성 시에만 공개 (잠금 UI)
- [ ] 지원하기 기능 (지원자 목록 관리)
- [ ] 지원 현황 알림

#### 리뷰
- [x] 리뷰 작성 페이지 (행사/셀러 유형/별점/매출/방문객 데이터)
- [x] 리뷰 열람 권한: `reviewCount >= 1` 기반
- [x] 리뷰 잠금 UI (미로그인 → 로그인 유도, 로그인 → 리뷰 작성 유도)
- [ ] 리뷰 수정 / 삭제
- [ ] 리뷰 신고 기능

#### 커뮤니티
- [x] 게시글 목록 (탭: 전체/익명, 카테고리/셀러유형/정렬 필터, 무한스크롤)
- [x] 게시글 상세 (본문 + 좋아요 + 공유 + 메뉴)
- [x] 게시글 / 댓글 작성 · 수정 · 삭제
- [x] 실명/익명 선택 글쓰기

#### 마이페이지
- [x] 프로필 카드, 활동 통계, 내 리뷰/스크랩/게시글 목록
- [x] 닉네임 수정, 알림 설정 토글
- [-] 멤버십 관리 메뉴
- [ ] 프로필 아바타 이미지 업로드

#### 문의
- [x] 행사 개최 문의 페이지 (`/contact`)
- [ ] 문의 폼 이메일 발송 또는 DB 저장

### 🟢 인프라 / DB

- [x] V2 스키마 (base_events + event_instances 분리)
- [x] 커뮤니티 테이블 마이그레이션 (posts, post_comments, contact_requests)
- [x] 누락 컬럼 보완 마이그레이션 다수
- [x] 엑셀 데이터 입력 양식 (`FLIT_데이터입력양식.xlsx`)
- [ ] RLS(Row Level Security) 정책 전면 검토
- [ ] Supabase Storage 이미지 업로드 설정
- [ ] 프로덕션 환경 변수 설정
- [ ] `profiles.review_count` 자동 갱신 트리거 (현재 수동)

### 🔵 UX / 디자인

- [ ] 로딩 스켈레톤 UI 통일
- [ ] 에러 상태 UI (404, 500)
- [ ] 빈 상태 UI 일관화
- [ ] 토스트 알림 컴포넌트
- [ ] 이미지 fallback 처리

### 📋 배포

- [ ] Vercel 배포 설정
- [ ] Supabase 프로덕션 프로젝트 분리
- [ ] 도메인 연결
- [ ] SEO 메타태그 설정

---

## 보류 중 (나중에 재활성화)

- 구독 결제 연동 (Stripe 등)
- 멤버십 관리 메뉴 (마이페이지)
- `SubscriptionLock.js`, `SubscriptionModal.js`, `/subscribe` 페이지

---

## Dead Code (정리 예정)

- `src/components/ui/SubscriptionLock.js`
- `src/components/ui/SubscriptionModal.js`
- `src/app/subscribe/page.js`
- `src/lib/plans.js` → `canViewReviewDetail()` (미사용)

---

## 협업 규칙

- 모든 응답 **한국어**
- 커밋 후 즉시 `git push origin main`
- 기능 변경 시 이 파일(CLAUDE.md) 태스크 항목도 함께 업데이트
