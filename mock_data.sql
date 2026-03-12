-- ✅ 테스트/데모용 가상 현실(Real-like) 데이터 세팅 스크립트
-- 이 코드를 Supabase SQL Editor에 붙여넣고 RUN을 누르세요!
-- 기존 데이터 충돌 방지를 위해 UUID는 자동 생성(gen_random_uuid())를 사용하고,
-- 임시 변수 모음(CTE)을 활용하여 관계(Foreign Key)를 자동으로 연결합니다.

WITH 
-- 1. [장소/행사] 데이터 생성
inserted_events AS (
  INSERT INTO public.events (name, location, category, average_profit, average_traffic, total_reviews)
  VALUES 
    ('서울 패션위크 코엑스 마켓', '서울 강남구', '플리마켓', 4.8, 4.9, 12),
    ('여의도 한강공원 달빛야시장', '서울 영등포구', '푸드트럭', 4.5, 5.0, 34),
    ('동대문 DDP 디자인 페스타', '서울 중구', '플리마켓', 4.1, 4.6, 18),
    ('현대백화점 판교점 팝업존', '경기 성남시', '팝업스토어', 4.9, 4.8, 8),
    ('성수동 연무장길 팝업스페이스', '서울 성동구', '팝업스토어', 4.4, 4.5, 23)
  RETURNING id, name
),

-- 2. [기획사/주최측] 데이터 생성
inserted_organizers AS (
  INSERT INTO public.organizers (name, description, average_support, average_manners, total_reviews)
  VALUES 
    ('(주)문화상점', '전국 최대 규모의 플리마켓/팝업스토어 기획 플랫폼', 4.7, 4.8, 55),
    ('플리페스타 기획단', '수도권 야시장 및 푸드트럭 전문 기획사', 4.2, 4.0, 31),
    ('어반마켓 협동조합', '지역 감성 마켓 전문 기획 크루', 3.8, 3.5, 14),
    ('리버마켓 추진위원회', '강변/공원 중심의 대규모 야외 행사 기획', 4.5, 4.5, 29)
  RETURNING id, name
)

-- 3. [공고] 데이터 매칭 및 생성 (문화상점 긁어온 듯한 현실적인 데이터)
INSERT INTO public.recruitments (
  event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status
)
VALUES 
(
  (SELECT id FROM inserted_events WHERE name = '동대문 DDP 디자인 페스타'),
  (SELECT id FROM inserted_organizers WHERE name = '(주)문화상점'),
  '[문화상점] 4월 DDP 스프링 디자인 마켓 셀러 대모집 (핸드메이드 우대)',
  '안녕하세요 문화상점입니다.
따뜻한 봄을 맞아 동대문 DDP 어울림광장에서 진행되는 대규모 디자인 마켓 셀러를 모집합니다.

[행사 개요]
- 행사명: DDP 스프링 디자인 마켓
- 대상: 핸드메이드 소품, 악세사리, 문구류, 아트상품 우대
- 제공사항: 1.8m 테이블 1개, 의자 2개, 파라솔, 전기 지원안됨

빠른 마감이 예상되니 많은 지원 부탁드립니다!',
  150000,
  NOW() - INTERVAL '3 days',
  NOW() + INTERVAL '5 days',
  NOW() + INTERVAL '20 days',
  'OPEN'
),
(
  (SELECT id FROM inserted_events WHERE name = '현대백화점 판교점 팝업존'),
  (SELECT id FROM inserted_organizers WHERE name = '(주)문화상점'),
  '[수수료 20%] 현대백화점 판교점 B1 프리미엄 디저트 팝업 셀러 모집',
  '현대백화점 판교점 식품관에서 1주일 간 진행되는 프리미엄 디저트 팝업입니다.

[안내사항]
- 품목: 베이커리, 구움과자, 수제청 등 (현장 조리 불가)
- 조건: 참가비 무료, 수수료 20% (백화점 수수료 포함)
- 집기: 매대 및 기본 쇼케이스 지원 (냉장/냉동고 별도 문의)

매출 보장이 확실한 메인 상권입니다. 입점 심사가 있습니다.',
  0,
  NOW() - INTERVAL '2 days',
  NOW() + INTERVAL '10 days',
  NOW() + INTERVAL '25 days',
  'OPEN'
),
(
  (SELECT id FROM inserted_events WHERE name = '여의도 한강공원 달빛야시장'),
  (SELECT id FROM inserted_organizers WHERE name = '플리페스타 기획단'),
  '[푸드트럭/일반] 한강 달빛 달달야시장 입점 셀러 모집',
  '매주 주말 진행되는 한강 야시장 셀러를 모집합니다.

* 모집 분야: 
1) 푸드트럭 (8팀) - 참가비 20만원 / 전기 지원 5KW
2) 일반 소품/의류 (20팀) - 참가비 7만원 / 1.5m 매대 개인 지참

우천 시 행사 전일 환불 규정을 반드시 확인해주세요.',
  70000,
  NOW() - INTERVAL '10 days',
  NOW() - INTERVAL '1 days',
  NOW() + INTERVAL '3 days',
  'CLOSED'  -- 마감된 공고 테스트용
),
(
  (SELECT id FROM inserted_events WHERE name = '성수동 연무장길 팝업스페이스'),
  (SELECT id FROM inserted_organizers WHERE name = '어반마켓 협동조합'),
  '🔥성수 핫플🔥 주말 팝업 스토어 쉐어하실 셀러 모십니다',
  '성수동 메인 연무장길에 위치한 1층 팝업 공간입니다.
전체 대관이 부담스러우신 셀러분들을 위해 1/N 쉐어 모집합니다.

- 모집팀: 4팀 (현재 의류 1팀 확정)
- 공간: 팀별 약 2평 내외 사용 가능
- 비용: 주말(토일) 25만원
- 특이사항: 탈의실 있음, 창고 쉐어 가능',
  250000,
  NOW(),
  NOW() + INTERVAL '7 days',
  NOW() + INTERVAL '14 days',
  'OPEN'
);
