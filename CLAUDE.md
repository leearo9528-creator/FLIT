# FLIT — Claude Code 컨텍스트

## 프로젝트 개요

플리마켓/팝업스토어 셀러를 위한 행사 정보 플랫폼.
- 스택: Next.js 15 (App Router) + Supabase + Tailwind CSS

---

## 접근 권한 정책

| 상태 | 허용 범위 |
|---|---|
| 미로그인 | 목록 조회만 |
| 로그인 (리뷰 0개 or 만료) | 리뷰 내용 잠금 (작성 유도) |
| 로그인 (리뷰 작성 후 1주일 이내) | 전체 열람 가능 |
| organizer 플랜 | 모집공고 작성 (승인 없이 즉시 전환) |

리뷰 열람 권한: 리뷰 1개 작성 → 1주일간 전체 열람 가능. 매주 월요일 00:00 리셋. `profiles.last_review_at` 기준.
주최사 전환: 프로필 수정에서 역할 변경 → 즉시 `organizer`로 전환 (승인 불필요).

---

## 데이터 구조

```
base_events (행사 브랜드) ─→ event_instances (개최 회차) ─→ recruitments (모집공고)
                                    ↓                           ↓
                              organizers (주최사)          scraps (북마크)
                                    ↓
                              reviews (리뷰)
```

- **base_events**: 행사 브랜드 (서울밤도깨비야시장 등). category: 플리마켓/푸드트럭/플리+푸드 전체
- **event_instances**: 개최 회차 (날짜/장소/주최사). 같은 행사도 날짜별로 별도 회차
- **recruitments**: 모집공고. event_instance에 1:1 연결
- **organizers**: 주최사. profiles와 1:1 (id 동일). 프로필 저장 시 자동 동기화
- **reviews**: 셀러 리뷰. event_instance에 연결
- **profiles**: 유저 프로필. seller_type(seller/foodtruck), plan(free/organizer)

---

## 주요 기능

### 완료
- [x] 카카오/구글 소셜 로그인
- [x] 홈: 배너 캐러셀 + 공고/리뷰/커뮤니티 피드
- [x] 행사 찾기: 모집공고/리뷰/주최사 탭 + 검색/필터
- [x] 행사 상세: 리뷰/모집공고/개최이력 탭
- [x] 공고 상세: InfoSection UI 통일
- [x] 주최사 상세: 리뷰/모집공고/개최이력 탭
- [x] 공고 작성 (무료, 결제 제거)
- [x] 리뷰 작성 (별점/매출/방문객/장단점)
- [x] 리뷰 열람: 1개 작성 → 1주일 열람 (매주 월요일 리셋)
- [x] 커뮤니티: 자유/익명/실시간현황/양도양수 카테고리
- [x] 마이페이지: 프로필 수정 (셀러/주최사 정보), 내 활동, 스크랩
- [x] 스크랩: 공고 + 행사 북마크 (마이페이지 통합 관리)
- [x] 알림: 댓글 트리거 → Realtime 구독
- [x] 관리자: 비밀번호 보안 + 공지/행사/공고/주최사/회원/엑셀업로드/텍스트파서
- [x] 공지사항: DB 기반 + 이용 가이드 상세 페이지
- [x] 이용약관 + 개인정보처리방침 (탭 통합)
- [x] 회원 탈퇴
- [x] profiles ↔ organizers 동기화
- [x] SEO: layout/페이지별 metadata + 동적 라우트 openGraph/twitter
- [x] robots.js + sitemap.js (Supabase 동적 수집)
- [x] 에러 UI: error.js + global-error.js + not-found.js
- [x] 로딩 스켈레톤 shimmer 애니메이션 (`.skeleton` 클래스)

### 완료 (추가)
- [x] RLS 정책 전면 검토 및 보완 (profiles_insert 보안 수정, event_instances/recruitments 누락 정책 추가)
- [x] 프로필 아바타 이미지 업로드 (Supabase Storage avatars 폴더)
- [x] Supabase Storage 이미지 업로드 설정 (images 버킷 + RLS)
- [x] 온보딩 단계 제거 — 로그인 후 바로 홈으로 이동
- [x] 새 Supabase 프로젝트 이전 (서울 리전)

### 미완료
- [ ] 도메인 연결 (Vercel 설정)

---

## 삭제된 기능 / Dead Code

- ~~구독 결제 (Stripe/토스)~~ → 제거됨
- ~~organizer_pending 승인 대기~~ → 즉시 전환으로 변경
- ~~끌올 기능 (결제)~~ → 제거됨
- 삭제된 파일: subscribe/, SubscriptionLock.js, SubscriptionModal.js, plans.js, mypage/role/, payments/confirm/, recruitments/write/success/

---

## 기술 참고

- Supabase 클라이언트: 싱글톤 패턴 적용 (`client.js`)
- 네이버 지도 API: NaverMap.js 컴포넌트 (Dynamic Map + Geocoding)
- 공통 컴포넌트: ReviewCard, ImageUploader, NaverMap, TopBar, Card, BottomTab
- 행사 개최 문의: https://flitunion.vercel.app/ (외부 링크)
- 관리자 비밀번호: `flit2026!` (코드 내 하드코딩)

---

## 협업 규칙

- 모든 응답 **한국어**
- 커밋 후 즉시 `git push origin main`
- 기능 변경 시 이 파일(CLAUDE.md) 태스크 항목도 함께 업데이트
