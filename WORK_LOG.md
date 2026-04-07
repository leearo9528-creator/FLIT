# FLIT 작업 일지

## 2026-04-08 — sweet-gould 워크트리 종합 정비

대규모 정리 + 보안 + 출시 준비 + 버그 수정 + 페르소나 시드 + 성능 최적화 세션.
모든 커밋이 `main` 브랜치에 fast-forward 푸시되었습니다.

---

### 🧹 1) 코드/스키마 정리

| 커밋 | 내용 |
|---|---|
| `63df001` | 쓰레기 파일·중복 시드 6개·레거시 organizer_pending 제거 |
| `9d97aa8` | `supabase_schema.sql` V3 통합 — 14개 마이그레이션을 단일 스키마로 |
| `768f86f` | schema.sql과 중복되는 마이그레이션 14개 삭제 |

### 🔐 2) 보안/안정성

| 커밋 | 내용 |
|---|---|
| `cf50ed4` | 관리자 비밀번호 평문 하드코딩(`flit2026!`) 제거 → `is_admin` 플래그 기반 |
| `cf50ed4` | `excel-import` API에 세션 기반 `verifyAdmin()` 추가 |
| `cf50ed4` | `.single()` → `.maybeSingle()` 5곳 (auth-context, auth/callback, admin, reviews/write) |

### 🚀 3) 출시 준비 (SEO + 에러 UI + 로딩)

| 커밋 | 내용 |
|---|---|
| `d9aed0e` | `global-error.js` (RootLayout 폴백) |
| `d9aed0e` | `robots.js` + `sitemap.js` (정적 9개 + DB 동적 수집, 1시간 revalidate) |
| `d9aed0e` | 동적 라우트 `generateMetadata` openGraph/twitter card 강화 |
| `d9aed0e` | `terms`/`contact`/`login`/`mypage`/`admin` layout metadata |
| `d9aed0e` | shimmer 스켈레톤 (`globals.css .skeleton`) |

### 🐛 4) UI 버그 수정

| 커밋 | 내용 |
|---|---|
| `b8ddf04` | 홈/검색/행사/주최사 카드 참가비 '무료' 표시 버그 — `formatFee()` 헬퍼로 통일 |
| `7c61366` | 홈에서 RecentReviewsSection / CommunitySection 제거 |
| `04a525d` | 홈 캘린더 카드에 주최사 정보 추가 |
| `6227ea3` | `/calendar` 카드 단순화: `[날짜] 행사명 / 주최사 / 장소` |
| `5d6a841` | 캘린더 도트 파란색 통일 + Image fill `position:relative` 누락 2건 |
| `b7854f8` | 공고 작성 모집 셀러 유형 DB 저장 안 되던 버그 |
| `279e9bb` | 마이페이지 '행사 개최 문의'가 자기 사이트 새 탭 여는 링크 → `/contact` |
| `6f82d0e` | 어드민 dead code 제거 + `data_template.xlsx` ↔ import API mismatch 수정 |

### 🎭 5) 페르소나 시드 데이터

| 커밋 | 내용 |
|---|---|
| `02fd2f3` | 페르소나 200명 + 게시글 296개 시드 (`generate_personas.js`) |
| `b60a883` | profiles에 `is_mock` 컬럼 없어서 UPDATE 실패 → 제거 (ID 패턴으로 식별) |
| `f7bc555` | 페르소나가 댓글 754개 달도록 추가 |

**최종 시드 결과**:
- 핸드메이드 셀러 100명 (브랜드/제품/스타일/홍보링크)
- 푸드트럭 셀러 100명 (트럭/메뉴)
- 게시글 301개 (페르소나 정보 자동 치환)
- 댓글 754개 (카테고리/타입별 풀에서 선택)

### ⚡ 6) 성능 최적화

| 커밋 | 내용 |
|---|---|
| `30c08ad` | ISR `revalidate` 추가: 홈 60s, 공고상세 60s, 행사·주최사 300s |
| `30c08ad` | `add_performance_indexes.sql` (21개 인덱스) |
| `30c08ad` | `.env.example`에 Connection Pooler 도입 안내 |
| `a41da05` | 인덱스 SQL을 `DO` 블록으로 안전화 (테이블 존재 여부 체크) |

**측정 결과** (로컬): 첫 요청 218ms → 캐시된 요청 69ms (3배)

### 🗄️ 7) 누락 테이블 추가

| 커밋 | 내용 |
|---|---|
| `1fdb125` | `add_missing_tables.sql` — `event_scraps`, `notices`, `notifications` + `notify_on_comment` 트리거 + RLS |

---

## 📋 운영 DB 적용 순서

Supabase SQL Editor에서 **위에서부터 한 번씩** 실행:

1. `add_missing_tables.sql` — 누락 테이블 + 트리거 + RLS
2. `add_recruitment_seller_type.sql` — recruitments.seller_type 컬럼
3. `add_performance_indexes.sql` — 핵심 인덱스 (DO 블록으로 안전)
4. (선택) `seed_personas.sql` — 페르소나 200 + 게시글 301 + 댓글 754

전부 `IF NOT EXISTS` / `OR REPLACE`라서 중복 실행해도 안전.

---

## 🎯 발견한 중요 이슈와 해결

1. **워크트리에 `.env.local` 없어서 모든 페이지 500** — 메인 레포에서 복사 (gitignore된 파일은 워크트리 자동 복사 안 됨)
2. **운영 DB에 V3 신규 테이블 누락** — `event_scraps`, `notices`, `notifications`
3. **`profiles` 테이블에 `is_mock` 컬럼 없음** — schema의 `add_is_mock` 마이그레이션이 7개 테이블에만 적용. 페르소나는 ID 패턴(`e1%`/`e2%`)으로 식별
4. **`data_template.xlsx`가 import API와 mismatch** — 4시트 분리 → 단일 시트(17컬럼)로 재작성
5. **`fee_description` 마이그레이션 후 4개 카드 컴포넌트가 레거시 `fee` 필드만 읽음** — 무료 표시 버그

---

## ⚠️ 남은 권장 작업 (선택)

- **Pooler URL 교체** — Vercel 환경변수 `NEXT_PUBLIC_SUPABASE_URL`을 Supabase Dashboard → Database → Connection pooling URL로 교체 → 추가 100~200ms 단축
- **Supabase Storage 'images' 버킷 생성** (Public) — 프로필/공고/커뮤니티 이미지 업로드 활성화
- **도메인 연결** — Vercel Settings → Domains
- **RLS 정책 운영 검증** — schema V3에 admin 정책 포함했지만 실제 적용 상태 확인 필요
