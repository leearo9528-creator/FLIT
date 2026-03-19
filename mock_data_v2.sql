-- ================================================================
-- FLIT 목데이터 v2
-- 실행 순서: organizers → events → recruitments → company_reviews
-- ================================================================

-- ── 1. 주최사 ────────────────────────────────────────────────────
INSERT INTO public.organizers (name, description) VALUES
  ('마켓플러스',    '10년 경력의 플리마켓 전문 기획사. 서울 전역 50회 이상 운영'),
  ('한강이벤트',    '한강공원 특화 행사 기획사. 연 20회 이상 마켓 진행'),
  ('팝업하우스',    '팝업스토어·푸드트럭 행사 전문. 감각적인 공간 연출'),
  ('마켓온',        '전국 플리마켓 네트워크 운영. 셀러 중심 행사 기획'),
  ('제주마켓컴퍼니','제주 특화 로컬 마켓 기획사. 관광객·현지인 모두 공략');


-- ── 2. 행사 ─────────────────────────────────────────────────────
INSERT INTO public.events (name, location, location_sido, category) VALUES
  ('서울숲 봄 플리마켓',        '서울 성동구 서울숲공원',            '서울', '플리마켓'),
  ('여의도 한강 마켓',           '서울 영등포구 여의도한강공원',       '서울', '플리마켓'),
  ('성수동 팝업 마켓',           '서울 성동구 성수이로',               '서울', '팝업'),
  ('홍대 프리마켓',              '서울 마포구 홍대 걷고싶은거리',      '서울', '플리마켓'),
  ('뚝섬 푸드트럭 축제',         '서울 광진구 뚝섬한강공원',           '서울', '푸드트럭'),
  ('잠실 석촌호수 봄마켓',       '서울 송파구 석촌호수 서호',          '서울', '플리마켓'),
  ('수원 화성 주말마켓',         '경기 수원시 화성행궁광장',           '경기', '플리마켓'),
  ('일산 호수공원 마켓',         '경기 고양시 일산호수공원',           '경기', '플리마켓'),
  ('부산 해운대 비치마켓',       '부산 해운대구 해운대해수욕장',       '부산', '플리마켓'),
  ('제주 동문 로컬마켓',         '제주 제주시 동문재래시장 인근',      '제주', '플리마켓');


-- ── 3. 모집 공고 ─────────────────────────────────────────────────
INSERT INTO public.recruitments
  (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
VALUES
  -- 서울숲 봄 플리마켓 (마켓플러스) — OPEN
  (
    (SELECT id FROM public.events WHERE name = '서울숲 봄 플리마켓'),
    (SELECT id FROM public.organizers WHERE name = '마켓플러스'),
    '[서울숲] 봄 플리마켓 셀러 모집 — 일반셀러·핸드메이드',
    '봄을 맞아 서울숲에서 플리마켓을 개최합니다. 핸드메이드, 빈티지, 소품 셀러 모집합니다. 부스 크기 2×2m, 개인 테이블 지참 필수.',
    30000,
    NOW() - INTERVAL '5 days',
    NOW() + INTERVAL '10 days',
    NOW() + INTERVAL '14 days',
    'OPEN'
  ),
  -- 여의도 한강 마켓 (한강이벤트) — OPEN
  (
    (SELECT id FROM public.events WHERE name = '여의도 한강 마켓'),
    (SELECT id FROM public.organizers WHERE name = '한강이벤트'),
    '[여의도 한강] 봄 시즌 셀러·푸드트럭 모집',
    '여의도 한강공원에서 봄 시즌 마켓을 진행합니다. 일반셀러 및 푸드트럭 함께 모집합니다. 전력 공급 가능 (푸드트럭 우선).',
    50000,
    NOW() - INTERVAL '3 days',
    NOW() + INTERVAL '15 days',
    NOW() + INTERVAL '20 days',
    'OPEN'
  ),
  -- 뚝섬 푸드트럭 축제 (한강이벤트) — OPEN
  (
    (SELECT id FROM public.events WHERE name = '뚝섬 푸드트럭 축제'),
    (SELECT id FROM public.organizers WHERE name = '한강이벤트'),
    '[뚝섬] 푸드트럭 단독 모집 — 전력·수도 완비',
    '뚝섬한강공원 전력·수도 완비 구역에서 푸드트럭 행사를 진행합니다. 음식·음료·디저트 업종 우선 선발.',
    80000,
    NOW() - INTERVAL '2 days',
    NOW() + INTERVAL '8 days',
    NOW() + INTERVAL '12 days',
    'OPEN'
  ),
  -- 성수동 팝업 마켓 (팝업하우스) — OPEN
  (
    (SELECT id FROM public.events WHERE name = '성수동 팝업 마켓'),
    (SELECT id FROM public.organizers WHERE name = '팝업하우스'),
    '[성수동] 팝업마켓 감성 셀러 모집 — 브랜딩 셀러 환영',
    '성수동 특유의 감성을 살린 팝업마켓입니다. 자체 브랜드 셀러, 아티스트, 핸드메이드 작가를 우선 모집합니다.',
    40000,
    NOW() - INTERVAL '1 days',
    NOW() + INTERVAL '12 days',
    NOW() + INTERVAL '18 days',
    'OPEN'
  ),
  -- 잠실 석촌호수 봄마켓 (마켓플러스) — OPEN
  (
    (SELECT id FROM public.events WHERE name = '잠실 석촌호수 봄마켓'),
    (SELECT id FROM public.organizers WHERE name = '마켓플러스'),
    '[석촌호수] 봄꽃 시즌 마켓 — 셀러 30팀 모집',
    '벚꽃 시즌에 석촌호수 서호에서 진행하는 봄마켓입니다. 유동인구 최고 수준. 음식, 소품, 의류 등 업종 제한 없음.',
    35000,
    NOW() - INTERVAL '4 days',
    NOW() + INTERVAL '6 days',
    NOW() + INTERVAL '10 days',
    'OPEN'
  ),
  -- 수원 화성 주말마켓 (마켓온) — OPEN
  (
    (SELECT id FROM public.events WHERE name = '수원 화성 주말마켓'),
    (SELECT id FROM public.organizers WHERE name = '마켓온'),
    '[수원 화성] 주말 상설마켓 셀러 모집',
    '수원 화성행궁 앞 광장에서 매주 주말 상설 마켓을 운영합니다. 관광객 유입 많음. 공예, 먹거리, 체험 부스 환영.',
    25000,
    NOW() - INTERVAL '7 days',
    NOW() + INTERVAL '20 days',
    NOW() + INTERVAL '25 days',
    'OPEN'
  ),
  -- 부산 해운대 비치마켓 (마켓온) — OPEN
  (
    (SELECT id FROM public.events WHERE name = '부산 해운대 비치마켓'),
    (SELECT id FROM public.organizers WHERE name = '마켓온'),
    '[해운대] 비치마켓 셀러 모집 — 여름 시즌 준비',
    '해운대 해수욕장 인근에서 진행하는 비치마켓입니다. 여름 용품, 먹거리, 수공예품 셀러 환영. 외국인 관광객 많음.',
    45000,
    NOW() - INTERVAL '2 days',
    NOW() + INTERVAL '18 days',
    NOW() + INTERVAL '22 days',
    'OPEN'
  ),
  -- 제주 동문 로컬마켓 (제주마켓컴퍼니) — OPEN
  (
    (SELECT id FROM public.events WHERE name = '제주 동문 로컬마켓'),
    (SELECT id FROM public.organizers WHERE name = '제주마켓컴퍼니'),
    '[제주] 동문 로컬마켓 — 제주 로컬 셀러 우선 모집',
    '제주 동문시장 인근 광장에서 매월 2회 진행하는 로컬마켓입니다. 제주 거주 셀러 우선, 타지역 셀러도 신청 가능.',
    20000,
    NOW() - INTERVAL '6 days',
    NOW() + INTERVAL '9 days',
    NOW() + INTERVAL '14 days',
    'OPEN'
  ),
  -- 홍대 프리마켓 (팝업하우스) — CLOSED
  (
    (SELECT id FROM public.events WHERE name = '홍대 프리마켓'),
    (SELECT id FROM public.organizers WHERE name = '팝업하우스'),
    '[홍대] 3월 프리마켓 셀러 모집 (마감)',
    '홍대 걷고싶은거리에서 진행된 3월 프리마켓입니다. 다음 회차는 4월 중 공지 예정.',
    30000,
    NOW() - INTERVAL '25 days',
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '2 days',
    'CLOSED'
  ),
  -- 일산 호수공원 마켓 (마켓온) — CLOSED
  (
    (SELECT id FROM public.events WHERE name = '일산 호수공원 마켓'),
    (SELECT id FROM public.organizers WHERE name = '마켓온'),
    '[일산] 호수공원 겨울마켓 마감',
    '일산 호수공원에서 진행된 겨울 마켓입니다. 성황리에 종료되었습니다. 봄 시즌 재개 예정.',
    20000,
    NOW() - INTERVAL '40 days',
    NOW() - INTERVAL '15 days',
    NOW() - INTERVAL '10 days',
    'CLOSED'
  );


-- ── 4. 리뷰 (user_id NULL — 목데이터) ──────────────────────────
INSERT INTO public.company_reviews
  (user_id, event_id, organizer_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, title, pros, cons, is_verified)
VALUES
  -- 서울숲 / 마켓플러스 / 일반셀러
  (NULL,
   (SELECT id FROM public.events WHERE name = '서울숲 봄 플리마켓'),
   (SELECT id FROM public.organizers WHERE name = '마켓플러스'),
   'seller', 4, 5, 4, 4,
   '유동인구 최고, 운영도 깔끔해요',
   '집객력이 정말 좋았어요. 오픈 시간부터 사람이 몰렸고 오후까지 꾸준했어요.',
   '부스 간격이 좀 좁아서 이동이 불편했어요. 그늘도 부족했고요.',
   true),

  -- 여의도 한강 / 한강이벤트 / 일반셀러
  (NULL,
   (SELECT id FROM public.events WHERE name = '여의도 한강 마켓'),
   (SELECT id FROM public.organizers WHERE name = '한강이벤트'),
   'seller', 3, 4, 3, 3,
   '한강뷰 좋지만 바람이 문제',
   '뷰가 좋아서 SNS 노출이 잘 됐어요. 주말 집객은 확실히 좋았습니다.',
   '바람이 너무 강해서 물건 날릴 뻔 했어요. 고정 장치 필수입니다.',
   true),

  -- 뚝섬 푸드트럭 / 한강이벤트 / 푸드트럭
  (NULL,
   (SELECT id FROM public.events WHERE name = '뚝섬 푸드트럭 축제'),
   (SELECT id FROM public.organizers WHERE name = '한강이벤트'),
   'foodtruck', 5, 5, 4, 5,
   '푸드트럭하기 정말 좋은 행사!',
   '전력이 안정적이고 진입로도 넓어서 차 빼는 것도 편했어요. 매출도 역대급.',
   '폐수 처리 장소가 조금 멀었어요. 다음엔 개선됐으면 합니다.',
   true),

  -- 성수동 팝업 / 팝업하우스 / 일반셀러
  (NULL,
   (SELECT id FROM public.events WHERE name = '성수동 팝업 마켓'),
   (SELECT id FROM public.organizers WHERE name = '팝업하우스'),
   'seller', 4, 4, 5, 5,
   '운영진 최고, 성수 감성 물씬',
   '운영진이 셀러 케어를 잘 해줘요. 설치부터 철수까지 도움 요청하면 바로 와줬어요.',
   '주차가 정말 힘들어요. 대중교통 이용 필수입니다.',
   true),

  -- 홍대 프리마켓 / 팝업하우스 / 일반셀러
  (NULL,
   (SELECT id FROM public.events WHERE name = '홍대 프리마켓'),
   (SELECT id FROM public.organizers WHERE name = '팝업하우스'),
   'seller', 3, 5, 3, 3,
   '유동인구는 최고, 구매력은 글쎄',
   '사람은 정말 많아요. 구경하는 사람은 넘쳐나고 홍보 효과는 확실합니다.',
   '구매 전환율이 낮은 편이에요. 저렴한 상품 위주가 더 잘 팔리더라고요.',
   true),

  -- 수원 화성 / 마켓온 / 일반셀러
  (NULL,
   (SELECT id FROM public.events WHERE name = '수원 화성 주말마켓'),
   (SELECT id FROM public.organizers WHERE name = '마켓온'),
   'seller', 3, 3, 4, 4,
   '관광지 마켓, 안정적인 운영',
   '관광객이 많아서 외국인 손님도 꽤 있었어요. 운영 안내가 잘 돼 있어요.',
   '상주 셀러 위주라 신규 셀러는 좋은 자리 받기 어려워요.',
   false),

  -- 부산 해운대 / 마켓온 / 일반셀러
  (NULL,
   (SELECT id FROM public.events WHERE name = '부산 해운대 비치마켓'),
   (SELECT id FROM public.organizers WHERE name = '마켓온'),
   'seller', 4, 4, 3, 4,
   '해운대 특수, 관광객 구매력 좋아요',
   '외국인 관광객이 많아서 영어로 설명할 일이 많았는데 매출은 좋았어요.',
   '날씨 변수가 커요. 흐린 날은 손님이 확 줄어요.',
   false),

  -- 제주 동문 / 제주마켓컴퍼니 / 일반셀러
  (NULL,
   (SELECT id FROM public.events WHERE name = '제주 동문 로컬마켓'),
   (SELECT id FROM public.organizers WHERE name = '제주마켓컴퍼니'),
   'seller', 4, 3, 5, 5,
   '소규모지만 따뜻한 분위기',
   '기획사 담당자분이 정말 친절해요. 셀러들끼리 커뮤니티도 잘 돼 있어요.',
   '유동인구가 다른 마켓 대비 적어요. 단골 손님 위주로 돌아가는 느낌.',
   false),

  -- 잠실 석촌호수 / 마켓플러스 / 푸드트럭
  (NULL,
   (SELECT id FROM public.events WHERE name = '잠실 석촌호수 봄마켓'),
   (SELECT id FROM public.organizers WHERE name = '마켓플러스'),
   'foodtruck', 4, 5, 4, 4,
   '벚꽃 시즌 매출 대박!',
   '벚꽃 시즌이라 인파가 어마어마했어요. 음료 판매가 특히 잘 됐습니다.',
   '진입로가 좁아서 트럭 배치에 시간이 걸렸어요. 미리 확인 필수.',
   true),

  -- 일산 호수공원 / 마켓온 / 일반셀러
  (NULL,
   (SELECT id FROM public.events WHERE name = '일산 호수공원 마켓'),
   (SELECT id FROM public.organizers WHERE name = '마켓온'),
   'seller', 2, 3, 3, 3,
   '겨울 시즌은 좀 힘들었어요',
   '공원 자체 환경이 좋고 주차가 편해요. 가족 단위 방문객이 많은 편.',
   '겨울이라 손님이 너무 없었어요. 시즌 선택을 잘 해야 할 것 같아요.',
   false);
