-- ============================================================
--  플릿(FLIT) 시드 데이터 — 100명 유저 규모
--  Supabase SQL Editor (service_role) 에서 실행하세요.
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 0. 기존 데이터 초기화 (순서 주의)
-- ────────────────────────────────────────────────────────────
DELETE FROM public.posts;
DELETE FROM public.company_reviews;
DELETE FROM public.scraps;
DELETE FROM public.recruitments;
DELETE FROM public.organizers;
DELETE FROM public.events;
-- profiles/auth.users 는 별도 관리 (필요 시 아래 주석 해제)
-- DELETE FROM public.profiles WHERE email LIKE '%@flit-test.dev';
-- DELETE FROM auth.users WHERE email LIKE '%@flit-test.dev';


-- ────────────────────────────────────────────────────────────
-- 1. 테스트 유저 100명 생성
--    auth.users 에 직접 INSERT → trigger 가 profiles 생성
-- ────────────────────────────────────────────────────────────
DO $$
DECLARE
  names TEXT[] := ARRAY[
    '김민준','이서윤','박지호','최수아','정우진','강예린','조현우','윤지아','임도현','한소희',
    '오준혁','서은지','노태양','백유나','류성민','문채원','신동현','권나연','허준영','전지민',
    '남건우','장하은','홍성현','안소연','고재원','변지수','배민혁','황아름','송태현','원지연',
    '구성호','양미래','천세준','방은솔','마준서','나혜원','염기찬','음서은','예상원','소지우',
    '태민혁','방탄이','진세원','뷔성준','슈가은','제이홉','정국혜','RM나현','지민호','진주원',
    '김하늘','이바다','박구름','최별빛','정달빛','강햇살','조노을','윤새벽','임여름','한겨울',
    '오봄날','서가을','노산들','백들녘','류강변','문호수','신냇물','권샘물','허파도','전섬나',
    '남능선','장고개','홍마루','안골목','고뜰','변마당','배뜨락','황숲길','송오솔','원오름',
    '구갯벌','양모래','천돌담','방기와','마처마','나처마','염굴뚝','음연기','예안개','소물결',
    '태파도','방노을','진무지개','뷔별빛','슈노을','제하늘','정달빛','RM새벽','지달님','진해님'
  ];
  seller_types TEXT[] := ARRAY['seller','seller','seller','foodtruck','seller','seller','foodtruck','seller'];
  uid UUID;
  uname TEXT;
  i INT;
BEGIN
  FOR i IN 1..100 LOOP
    uid := gen_random_uuid();
    uname := names[i];

    INSERT INTO auth.users (
      id, instance_id, aud, role, email,
      encrypted_password, email_confirmed_at,
      raw_user_meta_data, created_at, updated_at,
      confirmation_token, recovery_token,
      email_change_token_new, email_change
    ) VALUES (
      uid,
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated',
      uname || '@flit-test.dev',
      crypt('test1234!', gen_salt('bf')),
      NOW(),
      jsonb_build_object('full_name', uname),
      NOW(), NOW(),
      '', '', '', ''
    ) ON CONFLICT DO NOTHING;

    -- 트리거로 생성된 profile에 seller_type 추가 업데이트
    UPDATE public.profiles
    SET seller_type = seller_types[((i-1) % array_length(seller_types,1)) + 1]
    WHERE id = uid;

  END LOOP;
END $$;


-- ────────────────────────────────────────────────────────────
-- 2. 주최사(organizers) — 실제 한국 마켓 기획사 기반
-- ────────────────────────────────────────────────────────────
INSERT INTO public.organizers (name, description, average_support, average_manners, total_reviews) VALUES
('(주)문화상점',        '전국 최대 규모 플리마켓·팝업 기획 플랫폼. DDP, 코엑스, 석촌호수 등 메인 상권 행사 운영',      4.7, 4.8, 62),
('플리페스타 기획단',   '수도권 야시장·한강 푸드트럭 전문 기획사. 매주 고정 시즌 행사 운영',                           4.2, 4.1, 38),
('어반마켓 협동조합',   '성수·연남·마포 등 감성 상권 팝업 전문. 소규모 쉐어부스 제도 운영',                            3.8, 3.6, 19),
('리버마켓 추진위원회', '한강변·호수공원 중심 대규모 야외 마켓 기획. 연간 50만 명 집객 달성',                          4.5, 4.6, 41),
('팝업컴퍼니',          '현대·롯데·신세계 등 대형 유통사 팝업 입점 전문 대행사',                                       4.6, 4.7, 47),
('핸즈마켓',            '전국 핸드메이드·공예 작가 전문 마켓 큐레이션. 작가 1,200명 DB 보유',                           4.3, 4.5, 28),
('스트릿컬처랩',        '홍대·신촌 거리문화 기반 마켓·퍼포먼스 복합 기획',                                              3.9, 4.0, 22),
('마켓인부산',          '부산·경남 지역 특화 마켓 기획사. 해운대·광안리 시즌 행사 전담',                                4.1, 4.3, 16),
('서울숲마켓위원회',    '서울숲·뚝섬 일원 정기 마켓 운영. 자전거 친화·친환경 콘셉트',                                   4.0, 4.2, 24),
('로컬마켓프로젝트',    '지방도시 원도심 활성화 마켓 기획. 강릉·전주·제주·군산 운영 이력',                               3.7, 3.9, 11)
ON CONFLICT (name) DO NOTHING;


-- ────────────────────────────────────────────────────────────
-- 3. 행사/장소(events) — 실제 한국 주요 마켓 장소 기반
-- ────────────────────────────────────────────────────────────
INSERT INTO public.events (name, location, location_sido, category, average_profit, average_traffic, total_reviews) VALUES
('여의도 한강공원 달빛야시장',    '서울 영등포구 여의도동 한강시민공원',       '서울', '야시장',      4.5, 5.0, 38),
('서울 DDP 디자인마켓',           '서울 중구 을지로7가 동대문디자인플라자',    '서울', '플리마켓',    4.3, 4.6, 29),
('잠실 석촌호수 벚꽃마켓',        '서울 송파구 잠실동 석촌호수',              '서울', '플리마켓',    4.6, 4.8, 46),
('성수동 연무장길 팝업스페이스',  '서울 성동구 성수동2가 연무장길',           '서울', '팝업스토어',  4.4, 4.5, 31),
('뚝섬 한강공원 위클리마켓',      '서울 광진구 자양동 뚝섬한강시민공원',      '서울', '플리마켓',    4.2, 4.4, 27),
('홍대 걷고싶은거리 위클리마켓',  '서울 마포구 서교동 홍익로',               '서울', '플리마켓',    4.0, 4.3, 33),
('서울숲 플리마켓',               '서울 성동구 성수동1가 서울숲공원',         '서울', '플리마켓',    4.1, 4.3, 24),
('반포 한강공원 서머마켓',         '서울 서초구 반포동 반포한강시민공원',      '서울', '야시장',      4.3, 4.5, 22),
('광화문광장 핸드메이드마켓',      '서울 종로구 세종로 광화문광장',           '서울', '핸드메이드',  3.9, 4.2, 18),
('이태원 경리단길 빈티지마켓',    '서울 용산구 이태원동 경리단길',            '서울', '빈티지',      4.0, 4.1, 21),
('현대백화점 판교점 팝업존',      '경기 성남시 분당구 판교동 현대백화점',     '경기', '팝업스토어',  4.9, 4.8, 13),
('수원 행리단길 핸드메이드마켓',  '경기 수원시 팔달구 행궁동 행리단길',      '경기', '핸드메이드',  3.8, 4.0, 14),
('일산 호수공원 가을마켓',        '경기 고양시 일산동구 장항동 일산호수공원', '경기', '플리마켓',    4.0, 4.3, 17),
('인천 송도 센트럴파크 마켓',     '인천 연수구 송도동 센트럴파크',           '인천', '플리마켓',    3.7, 4.0, 19),
('부산 해운대 서머마켓',          '부산 해운대구 우동 해운대해수욕장',        '부산', '야시장',      4.3, 4.6, 23),
('부산 광안리 야시장',            '부산 수영구 광안동 광안리해수욕장',        '부산', '야시장',      4.2, 4.5, 18),
('대구 동성로 스트릿마켓',        '대구 중구 동성로',                        '대구', '플리마켓',    3.6, 3.9, 12),
('광주 1913 송정역시장 야장',     '광주 광산구 송정동 1913송정역시장',       '광주', '야시장',      4.0, 4.2, 15),
('전주 한옥마을 공예마켓',        '전북 전주시 완산구 교동 전주한옥마을',    '전북', '핸드메이드',  4.1, 4.0, 11),
('제주 동문시장 야시장',          '제주 제주시 이도1동 동문재래시장',        '제주', '야시장',      4.4, 4.3, 16),
('강릉 중앙시장 로컬마켓',        '강원 강릉시 성남동 강릉중앙시장',         '강원', '로컬마켓',    3.5, 3.7,  9),
('코엑스 스타필드 팝업스트리트',  '서울 강남구 삼성동 코엑스',              '서울', '팝업스토어',  4.7, 4.9, 21),
('서울 북촌 핸드메이드마켓',      '서울 종로구 가회동 북촌한옥마을',        '서울', '핸드메이드',  3.8, 3.9, 13),
('경리단길 앤틱&빈티지 마켓',     '서울 용산구 이태원동 경리단길 일대',      '서울', '빈티지',      3.9, 4.0, 10),
('망원 한강공원 봄마켓',          '서울 마포구 망원동 망원한강시민공원',     '서울', '플리마켓',    4.1, 4.4, 19)
ON CONFLICT (name) DO NOTHING;


-- ────────────────────────────────────────────────────────────
-- 4. 모집 공고(recruitments) — 다양한 상태 포함
-- ────────────────────────────────────────────────────────────
INSERT INTO public.recruitments (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
SELECT
  e.id, o.id,
  '[문화상점] 4월 DDP 스프링 디자인마켓 셀러 모집 (핸드메이드 우대)',
  '안녕하세요, (주)문화상점입니다.

봄맞이 DDP 어울림광장 디자인마켓에서 함께하실 셀러분을 모집합니다.

[행사 개요]
• 일시: 4월 19일(토) ~ 20일(일) 10:00 ~ 18:00
• 장소: DDP 어울림광장 (동대문역사문화공원역 1번 출구)
• 참가비: 150,000원 (2일 기준)

[모집 분야]
- 핸드메이드 소품·액세서리 (우대)
- 아트프린트·엽서·포스터
- 친환경·업사이클 제품
- 식물·가드닝 소품

[제공사항]
테이블 1개(1.8m) + 의자 2개 + 파라솔
전기 지원 없음 / 개인 배너 반입 가능

빠른 마감 예상! 많은 지원 부탁드립니다.',
  150000,
  NOW() - INTERVAL '3 days', NOW() + INTERVAL '7 days', NOW() + INTERVAL '20 days', 'OPEN'
FROM public.events e, public.organizers o
WHERE e.name = '서울 DDP 디자인마켓' AND o.name = '(주)문화상점';

INSERT INTO public.recruitments (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
SELECT e.id, o.id,
  '[리버마켓] 2025 석촌호수 벚꽃마켓 셀러 90팀 대모집',
  '매년 4만 명 이상이 찾는 석촌호수 벚꽃마켓입니다!

[모집 분야 및 규모]
• 핸드메이드 공예 30팀
• 의류·악세서리 25팀
• 푸드·음료 20팀
• 아트·일러스트 10팀
• 기타 소품 5팀

[제공사항]
2×2m 부스 공간 / 테이블 1개 / 의자 2개 / 공동창고

[유의사항]
- 참가비 120,000원 (환불 불가)
- 우천 시 행사 강행 (텐트 개인 지참 권장)
- 주류 판매 금지
- 음식류는 위생증 지참 필수

작년 평균 일매출 85만 원을 기록한 검증된 마켓입니다 🌸',
  120000,
  NOW() - INTERVAL '5 days', NOW() + INTERVAL '9 days', NOW() + INTERVAL '25 days', 'OPEN'
FROM public.events e, public.organizers o
WHERE e.name = '잠실 석촌호수 벚꽃마켓' AND o.name = '리버마켓 추진위원회';

INSERT INTO public.recruitments (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
SELECT e.id, o.id,
  '[팝업컴퍼니] 현대백화점 판교 B1 프리미엄 디저트 팝업 셀러 모집',
  '현대백화점 판교점 식품관 프리미엄 디저트 팝업입니다.

[안내사항]
• 기간: 5월 1일(목) ~ 7일(수) 10:30 ~ 20:00
• 품목: 베이커리, 구움과자, 수제청, 전통과자 (현장 조리 불가)
• 참가비: 무료 (수수료 20%, 백화점 수수료 포함)
• 집기: 매대 및 기본 쇼케이스 지원

[지원 자격]
- 사업자 등록증 보유 필수
- 식품위생 관련 인허가 구비
- 입점 심사 통과 (샘플 제출)

매출 보장이 확실한 메인 상권! 문의 환영합니다.',
  0,
  NOW() - INTERVAL '2 days', NOW() + INTERVAL '10 days', NOW() + INTERVAL '30 days', 'OPEN'
FROM public.events e, public.organizers o
WHERE e.name = '현대백화점 판교점 팝업존' AND o.name = '팝업컴퍼니';

INSERT INTO public.recruitments (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
SELECT e.id, o.id,
  '[플리페스타] 여의도 한강 달빛야시장 — 푸드트럭 8팀 · 일반셀러 20팀 모집',
  '매주 금·토·일 진행되는 한강 달빛야시장 셀러를 모집합니다.

[모집 구분]
① 푸드트럭 (8팀)
  - 참가비 200,000원
  - 전기 5KW 제공, 급수·배수 개인 처리
  - 최대 2.5m 트럭 진입 가능

② 일반셀러 (20팀)
  - 참가비 70,000원
  - 1.5m × 1.5m 매대 공간 (테이블 개인 지참)
  - 의류·소품·핸드메이드 모두 가능

[공통]
- 우천 전일 100% 환불
- 입금 확인 후 자리 배정 (선착순)
- 현장 주차 불가 (대중교통 이용 필수)',
  70000,
  NOW() - INTERVAL '1 day', NOW() + INTERVAL '6 days', NOW() + INTERVAL '12 days', 'OPEN'
FROM public.events e, public.organizers o
WHERE e.name = '여의도 한강공원 달빛야시장' AND o.name = '플리페스타 기획단';

INSERT INTO public.recruitments (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
SELECT e.id, o.id,
  '[어반마켓] 🔥성수동 연무장길 주말 팝업 쉐어부스 4팀 모집',
  '성수동 메인 연무장길 1층 팝업 공간입니다.
전체 대관이 부담스러우신 분들을 위한 쉐어부스 모집!

[공간 정보]
- 팀별 약 2평 내외
- 전면 통유리 쇼윈도우 노출
- 탈의실 1개 공유 / 소형 창고 쉐어 가능
- CCTV 설치 완료

[비용]
- 주말(토~일) 2일: 250,000원
- 평일(월~금) 5일: 350,000원

현재 의류 1팀 확정, 나머지 3팀 모집 중
이질감 없는 아이템끼리 배치 예정입니다.',
  250000,
  NOW(), NOW() + INTERVAL '5 days', NOW() + INTERVAL '14 days', 'OPEN'
FROM public.events e, public.organizers o
WHERE e.name = '성수동 연무장길 팝업스페이스' AND o.name = '어반마켓 협동조합';

INSERT INTO public.recruitments (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
SELECT e.id, o.id,
  '[스트릿컬처랩] 홍대 위클리마켓 정기 셀러 상시 모집 (매주 토요일)',
  '홍대 걷고싶은거리 매주 토요일 정기 마켓입니다.

- 시간: 매주 토 12:00 ~ 19:00
- 참가비: 1회 50,000원 / 3회 묶음 120,000원
- 공간: 1m × 1m (개인 테이블 지참 필수)
- 우천 취소 없음 (일부 텐트 설치 가능 구역 제공)

[가능 품목]
의류, 소품, 핸드메이드, 빈티지, 먹거리 모두 가능
단, 냄새나 소음이 심한 아이템 제한

처음 마켓 도전하는 셀러분들 환영합니다!
사진 포트폴리오 DM 주시면 검토 후 회신 드립니다.',
  50000,
  NOW() - INTERVAL '20 days', NOW() + INTERVAL '60 days', NOW() + INTERVAL '7 days', 'OPEN'
FROM public.events e, public.organizers o
WHERE e.name = '홍대 걷고싶은거리 위클리마켓' AND o.name = '스트릿컬처랩';

INSERT INTO public.recruitments (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
SELECT e.id, o.id,
  '[핸즈마켓] 뚝섬 봄 핸드메이드 마켓 작가 50팀 모집',
  '서울숲 인근 뚝섬 한강공원에서 봄 핸드메이드 마켓을 개최합니다.

[모집 분야]
도자기, 가죽공예, 섬유공예, 목공예, 비즈·주얼리, 수채화·일러스트,
캔들·디퓨저, 자연향 제품, 뜨개·자수 등 직접 제작 작품 한정

[지원 방법]
작품 사진 3장 이상 + 인스타그램 주소
이메일로 신청 → 심사 후 개별 통보 (미당선 시 별도 공지 없음)

[참가 조건]
- 본인이 직접 제작한 작품만 판매 가능
- 위탁·도매·해외 소싱 제품 판매 금지
- 단체 / 법인 지원 불가 (개인 작가만)',
  90000,
  NOW() - INTERVAL '7 days', NOW() + INTERVAL '3 days', NOW() + INTERVAL '21 days', 'OPEN'
FROM public.events e, public.organizers o
WHERE e.name = '뚝섬 한강공원 위클리마켓' AND o.name = '핸즈마켓';

INSERT INTO public.recruitments (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
SELECT e.id, o.id,
  '[마켓인부산] 2025 해운대 서머마켓 셀러 모집 (푸드트럭 우대)',
  '해운대해수욕장 개장 시즌 맞이 서머마켓입니다!

[모집 분야]
• 푸드트럭 12팀 (참가비 250,000원)
• 음료·디저트 10팀 (참가비 150,000원)
• 서핑·레저 소품 8팀 (참가비 120,000원)
• 패션·액세서리 10팀 (참가비 100,000원)

[특이사항]
- 야외 행사 / 강한 햇빛 대비 필수
- 물기 많은 제품 판매자 방수 매트 지참
- 주차: 해운대구 공영주차장 이용 (주차비 별도)
- 부산 외 지역 셀러 적극 환영!',
  150000,
  NOW() - INTERVAL '15 days', NOW() - INTERVAL '2 days', NOW() + INTERVAL '5 days', 'CLOSED'
FROM public.events e, public.organizers o
WHERE e.name = '부산 해운대 서머마켓' AND o.name = '마켓인부산';

INSERT INTO public.recruitments (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
SELECT e.id, o.id,
  '[로컬마켓] 제주 동문시장 야시장 셀러 모집 (5월~10월 시즌)',
  '관광객 하루 2만 명이 찾는 제주 동문야시장 입점 셀러 모집!

[모집 내용]
- 기간: 2025년 5월 ~ 10월 (주 3회, 목·금·토)
- 참가비: 월 정기 등록 180,000원 (1회당 환산 약 15,000원)
- 자리: 고정석 / 변동석 선택 가능

[추천 품목]
- 제주 로컬 식재료 활용 스낵 및 음료
- 수공예 기념품, 제주 감성 소품
- 여행자 취향 패션·잡화

제주 관광 시즌 최대 수익 마켓!
서울·수도권 셀러 출장 입점도 가능합니다.',
  180000,
  NOW() - INTERVAL '30 days', NOW() + INTERVAL '30 days', NOW() + INTERVAL '45 days', 'OPEN'
FROM public.events e, public.organizers o
WHERE e.name = '제주 동문시장 야시장' AND o.name = '로컬마켓프로젝트';

INSERT INTO public.recruitments (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
SELECT e.id, o.id,
  '[서울숲마켓] 서울숲 주말 플리마켓 상시 셀러 모집',
  '서울숲 공원 내 피크닉 광장에서 매주 주말 진행되는 정기 플리마켓입니다.

[기본 정보]
- 시간: 매주 토·일 11:00 ~ 17:00
- 자리: 2m × 2m (테이블 없음, 피크닉 매트 개인 지참 가능)
- 참가비: 60,000원/회

[특징]
자연 속 힐링 마켓 콘셉트
에코백·비건 제품·자연 소재 상품 우대
반려동물 동반 입장 가능

매달 마지막 주말 = 특별테마마켓 운영 (별도 공지)',
  60000,
  NOW() - INTERVAL '10 days', NOW() + INTERVAL '50 days', NOW() + INTERVAL '14 days', 'OPEN'
FROM public.events e, public.organizers o
WHERE e.name = '서울숲 플리마켓' AND o.name = '서울숲마켓위원회';

INSERT INTO public.recruitments (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
SELECT e.id, o.id,
  '[문화상점] 코엑스 스타필드 봄 팝업스트리트 입점 브랜드 모집',
  '국내 최대 유동인구 상권, 코엑스 지하 팝업스트리트입니다.

[모집 규모]
부스 12개 (각 약 4평)

[입점 조건]
- 브랜드 아이덴티티가 명확한 팀
- SNS 팔로워 3,000명 이상 (또는 브랜드 스토리 충분 시 가능)
- 사업자 등록증 필수

[제공사항]
기본 인테리어 골조 / 전기 1KW / 조명
마케팅 지원 (코엑스 공식 SNS 노출)

참가비 350,000원 (5일 기준)',
  350000,
  NOW() - INTERVAL '4 days', NOW() + INTERVAL '8 days', NOW() + INTERVAL '22 days', 'OPEN'
FROM public.events e, public.organizers o
WHERE e.name = '코엑스 스타필드 팝업스트리트' AND o.name = '(주)문화상점';

-- 마감된 공고 추가
INSERT INTO public.recruitments (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
SELECT e.id, o.id,
  '[마감완료] 2025 전주 한옥마을 봄 공예마켓 작가 모집',
  '전주 한옥마을 경기전 앞 공예마켓 작가를 모집합니다.

4월 5일~6일 양일간, 총 40팀 모집
이미 마감되었습니다. 다음 시즌을 기대해주세요.',
  80000,
  NOW() - INTERVAL '30 days', NOW() - INTERVAL '15 days', NOW() - INTERVAL '5 days', 'CLOSED'
FROM public.events e, public.organizers o
WHERE e.name = '전주 한옥마을 공예마켓' AND o.name = '로컬마켓프로젝트';

INSERT INTO public.recruitments (event_id, organizer_id, title, content, fee, start_date, end_date, event_date, status)
SELECT e.id, o.id,
  '[핸즈마켓] 북촌 핸드메이드마켓 겨울 시즌 마감',
  '지난 시즌 북촌 핸드메이드마켓은 성황리에 마감되었습니다.
봄 시즌 모집은 3월 초 공지 예정입니다.',
  70000,
  NOW() - INTERVAL '60 days', NOW() - INTERVAL '40 days', NOW() - INTERVAL '30 days', 'CLOSED'
FROM public.events e, public.organizers o
WHERE e.name = '서울 북촌 핸드메이드마켓' AND o.name = '핸즈마켓';


-- ────────────────────────────────────────────────────────────
-- 5. 리뷰(company_reviews) — 유저 1~80명, 다양한 행사·주최사
-- ────────────────────────────────────────────────────────────
DO $$
DECLARE
  user_ids UUID[];
  event_ids UUID[];
  org_ids UUID[];
  uid UUID;
  eid UUID;
  oid UUID;
  stypes TEXT[] := ARRAY['seller','seller','foodtruck','seller'];
  pros_list TEXT[] := ARRAY[
    '주말 유동인구가 엄청났어요. 오후 2시부터 저녁까지 쭉 사람이 끊이질 않았습니다.',
    '주최사 담당자가 친절하고 세심하게 대응해줘서 좋았어요.',
    '행사 홍보가 잘 돼있어서 예상보다 훨씬 많은 고객이 왔어요.',
    '자리 배치가 잘 되어있고 주차 공간도 넉넉했어요.',
    '처음 참가하는데 주최측에서 많이 도와줬어요. 다음에 또 참가하고 싶네요.',
    '매출이 기대 이상으로 나왔어요! 비슷한 감성의 셀러들이 모여서 시너지가 좋았어요.',
    '인스타 홍보 덕분에 내 부스를 찾아오는 단골 느낌의 손님도 있었어요.',
    '행사 당일 운영진들이 적극적으로 도움을 주셔서 불편함이 없었어요.',
    '넓은 공간과 좋은 동선 덕분에 쇼핑 분위기가 만들어졌어요.',
    '연령대가 다양해서 다양한 상품군이 다 잘 팔렸어요.'
  ];
  cons_list TEXT[] := ARRAY[
    '주차 공간이 부족해서 짐 내리기가 너무 힘들었어요.',
    '행사 당일 바람이 강해서 디스플레이가 몇 번 무너졌어요.',
    '자리 간격이 너무 좁아서 옆 셀러와 겹쳐 보이는 느낌이 들었어요.',
    '주최사 연락이 느렸어요. 공지가 늦게 와서 준비하기 힘들었어요.',
    '포장·비닐봉지 관련 규정이 애매해서 현장에서 혼선이 있었어요.',
    '음식 셀러가 너무 많아서 일반 소품 셀러 입장에서 아쉬웠어요.',
    '홍보에 비해 실제 집객이 좀 덜했어요. 기대보다는 아쉬운 매출.',
    '전기 제공이 없어서 여름엔 힘들었어요.',
    '행사 종료 후 정산이 너무 늦었어요.',
    '옆 셀러와 겹치는 품목이 많아서 가격 경쟁이 심했어요.'
  ];
  i INT;
BEGIN
  SELECT ARRAY(SELECT id FROM public.profiles WHERE email LIKE '%@flit-test.dev' ORDER BY created_at LIMIT 80) INTO user_ids;
  SELECT ARRAY(SELECT id FROM public.events ORDER BY RANDOM() LIMIT 20) INTO event_ids;
  SELECT ARRAY(SELECT id FROM public.organizers ORDER BY RANDOM()) INTO org_ids;

  FOR i IN 1..200 LOOP
    uid := user_ids[((i-1) % array_length(user_ids,1)) + 1];
    eid := event_ids[((i*3-1) % array_length(event_ids,1)) + 1];
    oid := org_ids[((i*2) % array_length(org_ids,1)) + 1];

    INSERT INTO public.company_reviews (
      user_id, event_id, organizer_id, seller_type,
      rating_profit, rating_traffic, rating_support, rating_manners,
      title, pros, cons, is_verified, created_at
    ) VALUES (
      uid, eid, oid,
      stypes[((i-1) % 4) + 1],
      (floor(random()*2)+3)::INT,
      (floor(random()*2)+3)::INT,
      (floor(random()*2)+3)::INT,
      (floor(random()*2)+3)::INT,
      CASE (i % 5)
        WHEN 0 THEN '첫 참가 후기'
        WHEN 1 THEN '기대 이상이었어요'
        WHEN 2 THEN '아쉬운 점도 있지만 전반적으로 좋았어요'
        WHEN 3 THEN '재참가 결정!'
        ELSE '솔직한 후기'
      END,
      pros_list[((i-1) % array_length(pros_list,1)) + 1],
      cons_list[((i-1) % array_length(cons_list,1)) + 1],
      (i % 3 = 0),
      NOW() - (random() * INTERVAL '90 days')
    );
  END LOOP;
END $$;


-- ────────────────────────────────────────────────────────────
-- 6. 커뮤니티 게시글(posts) — 다양한 카테고리
-- ────────────────────────────────────────────────────────────
DO $$
DECLARE
  user_ids UUID[];
  event_ids UUID[];
  uid UUID;
  eid UUID;
  categories TEXT[] := ARRAY['실시간 행사 현황','자유게시판','질문/답변','팁/정보','사고팔고'];
  seller_types TEXT[] := ARRAY['seller','foodtruck','seller',NULL,'seller'];
  titles TEXT[] := ARRAY[
    '지금 뚝섬 마켓 현장 — 사람 엄청 많아요!',
    '석촌호수 벚꽃마켓 입장 대기 30분 넘습니다',
    '오늘 홍대 위클리마켓 날씨 괜찮나요?',
    '첫 마켓 도전 후기 — 예상 매출의 2배!',
    '디스플레이 꿀팁 공유합니다 (액세서리 셀러)',
    '여의도 야시장 푸드트럭 진입로 좁으니 주의하세요',
    '마켓 참가비 환불 받은 후기 (우천 취소)',
    '캔버스 백 남은 거 판매합니다 (미개봉 20개)',
    '주최사한테 입금했는데 연락이 안 돼요... 어떻게 하죠?',
    '처음 플리마켓 도전하는데 테이블은 몇 개 가져가면 될까요?',
    '성수 팝업 오늘 오후 자리 있어요! 쉐어 하실 분?',
    '마켓 매출 정산 엑셀 서식 공유드립니다',
    '고객 응대 힘드셨던 경험 있으신가요?',
    '스탠딩 배너 사이즈 추천해주세요',
    '빈티지 의류 셀러인데 타겟 연령대 어떻게 잡으세요?',
    '제주 동문야시장 후기 — 관광객 반응 폭발적!',
    '핸드메이드 가격 책정 어떻게 하세요?',
    '푸드트럭 LPG 가스 검사 기준 아시는 분?',
    '마켓 셀러 카드단말기 추천 (수수료 낮은 것)',
    '비 오는 날 마켓 매출 어떤가요? 경험 공유해주세요',
    '인스타 팔로워 늘리는 법 마켓 셀러 버전',
    '오늘 DDP 마켓 오후 2시 기준 현황 공유',
    '부산 해운대 마켓 처음 참가하는데 팁 알려주세요!',
    '악세서리 셀러 진열대 중고로 삽니다',
    '마켓 참가비 세금계산서 발행 가능한 주최사 있나요?'
  ];
  contents TEXT[] := ARRAY[
    '오후 1시 반인데 지금 뚝섬 정말 미쳤어요. 대기 줄이 엄청납니다. 날씨가 너무 좋아서인지 가족 단위 손님이 많아요. 오시는 분들 대중교통 이용하세요!',
    '지금 석촌호수 서호 쪽 마켓 입구에 대기가 30분 이상입니다. 벚꽃이 만개해서 포토 스팟마다 줄이 엄청 길어요. 음료 준비해오세요 ☀️',
    '오늘 홍대 마켓 날씨 어떤가요? 어제 비 예보가 있었는데 취소 공지 없이 진행되는 건가요? 주최측 연락이 안 되네요.',
    '드디어 첫 마켓 후기 올려요! 예상 매출을 2배 넘겼어요. 비결은 SNS 사전 홍보와 샘플 증정 이벤트였던 것 같아요. 궁금하신 분들 댓글로 물어보세요!',
    '액세서리 셀러 7년차입니다. 디스플레이 팁 공유합니다.\n1. 높이차를 이용한 단 구성\n2. 색상별 그룹핑\n3. 가격대 낮은 것 앞에, 높은 것 뒤에\n4. 고객 눈높이(120cm)에 메인 상품 배치',
    '어제 여의도 야시장 설치하러 갔다가 진입로에서 30분 막혔어요. 6m 이상 트럭은 진입 불가라고 하더라고요. 미리 담당자한테 확인하세요!',
    '지난 주 우천으로 취소된 마켓 참가비 환불받은 후기요. 신청 후 1주일 걸렸고 수수료 없이 전액 환불 받았어요. 우천 취소 조항 꼭 확인하세요!',
    '캔버스 에코백 미개봉 20개 팝니다. 원가 이하 처분. 사이즈 38×42cm, 내추럴 컬러. 관심 있으신 분 DM 주세요.',
    '주최사에 참가비 입금한 지 열흘이 됐는데 연락이 안 돼요. 혹시 같은 경험 있으신 분 계세요? 어떻게 대응하셨나요?',
    '이번 주 처음 플리마켓 참가하는데 테이블은 몇 개 가져가면 될까요? 자리가 2×2m라고 하는데 소품류 판매예정입니다.',
    '오늘 성수 팝업 갑자기 한 팀 빠져서 오후부터 공간 생겼어요! 저랑 쉐어하실 분 급구합니다. 비용은 N빵, 감성 잡화나 의류 환영해요.',
    '마켓 매출 정산용 엑셀 파일 공유드립니다. 시간대별 매출 / 상품별 판매수량 / 카드/현금 구분 자동 계산됩니다.',
    '오늘 손님이 "이거 왜 이렇게 비싸요" 하면서 10분 넘게 따지고 가셨어요... 수제품 가격 책정에 대한 설명을 어떻게 하세요?',
    '실내 마켓에서 스탠딩 배너 사용하려는데 어떤 사이즈가 제일 실용적인가요? 60cm × 160cm vs 80cm × 200cm 중 고민 중입니다.',
    '빈티지 의류 셀러인데 타겟 연령대 잡기가 애매해요. 2030 감성인데 막상 마켓 오시는 분들 연령대가 다양하더라고요.',
    '지난 주 제주 동문야시장 참가했어요. 관광객 비율이 90% 이상이라 반응이 진짜 달랐어요. 기념품 콘셉트 상품이 불티나게 팔렸습니다!',
    '핸드메이드 제품 가격 어떻게 책정하세요? 원재료비 × 3 공식 써보니 너무 비싸보이고... 다들 어떻게 하시나요?',
    '푸드트럭 운영 2년차인데 LPG 가스 용기 검사 기준 헷갈려요. 연 1회 정기검사인가요, 2년에 1번인가요?',
    '지금까지 네이버 페이 단말기 썼는데 수수료가 생각보다 많이 나와요. 요즘 셀러들 사이에서 많이 쓰는 카드 단말기 추천해주세요.',
    '비 오는 날 마켓 매출 어떤가요? 저는 보통 맑은 날 대비 30~40% 나오는 것 같던데 다들 어떠세요?',
    '인스타 팔로워 늘리는 팁 공유해요.\n1. 해시태그 15개 이상 (마켓명 해시태그 꼭 포함)\n2. 릴스 주 2회 이상\n3. 스토리에 마켓 준비 과정 올리기\n4. 참가하는 마켓 공식 계정 태그',
    '오늘 DDP 마켓 오후 2시 현재 상황입니다. 3번 게이트 앞이 제일 붐비고 안쪽 A열은 한산합니다. 먹거리 쪽이 인기 많아요.',
    '이번에 처음 부산 해운대 마켓 나가는데요. 수도권 셀러인데 무엇을 준비해야 할지 모르겠어요. 현지 분위기나 팁 알려주세요!',
    '접이식 진열대 중고로 구합니다. 높이 조절 가능한 와이어 선반이나 목재 진열대 모두 괜찮아요. 서울 직거래 가능하신 분 연락주세요.',
    '마켓 참가비 세금계산서 발행해주는 주최사가 있나요? 사업자로 처리하려는데 대부분 현금 입금만 받더라고요.'
  ];
  i INT;
  cat TEXT;
  stype TEXT;
BEGIN
  SELECT ARRAY(SELECT id FROM public.profiles WHERE email LIKE '%@flit-test.dev' ORDER BY created_at LIMIT 100) INTO user_ids;
  SELECT ARRAY(SELECT id FROM public.events ORDER BY RANDOM() LIMIT 10) INTO event_ids;

  FOR i IN 1..25 LOOP
    uid := user_ids[((i-1) % array_length(user_ids,1)) + 1];
    eid := CASE WHEN (i % 3 = 0) THEN event_ids[((i-1) % array_length(event_ids,1)) + 1] ELSE NULL END;
    cat := categories[((i-1) % 5) + 1];
    stype := seller_types[((i-1) % 5) + 1];

    INSERT INTO public.posts (
      user_id, event_id, title, content, category,
      seller_type, is_anonymous, anonymous_name, likes, created_at
    ) VALUES (
      uid, eid,
      titles[i],
      contents[i],
      cat,
      stype,
      (i % 4 = 0),
      CASE WHEN (i % 4 = 0) THEN '익명의 셀러' ELSE NULL END,
      (random() * 30)::INT,
      NOW() - (random() * INTERVAL '60 days')
    );
  END LOOP;
END $$;


-- ────────────────────────────────────────────────────────────
-- 7. 통계 재계산 (트리거가 자동 처리하지만 혹시 누락분 보완)
-- ────────────────────────────────────────────────────────────
UPDATE public.events e
SET
  total_reviews   = (SELECT COUNT(*) FROM public.company_reviews r WHERE r.event_id = e.id),
  average_profit  = (SELECT COALESCE(AVG(r.rating_profit), e.average_profit)  FROM public.company_reviews r WHERE r.event_id = e.id),
  average_traffic = (SELECT COALESCE(AVG(r.rating_traffic), e.average_traffic) FROM public.company_reviews r WHERE r.event_id = e.id);

UPDATE public.organizers o
SET
  total_reviews    = (SELECT COUNT(*) FROM public.company_reviews r WHERE r.organizer_id = o.id),
  average_support  = (SELECT COALESCE(AVG(r.rating_support), o.average_support) FROM public.company_reviews r WHERE r.organizer_id = o.id),
  average_manners  = (SELECT COALESCE(AVG(r.rating_manners), o.average_manners) FROM public.company_reviews r WHERE r.organizer_id = o.id);

UPDATE public.profiles p
SET review_count = (SELECT COUNT(*) FROM public.company_reviews r WHERE r.user_id = p.id);


-- ────────────────────────────────────────────────────────────
-- 확인 쿼리
-- ────────────────────────────────────────────────────────────
SELECT 'profiles'       AS tbl, COUNT(*) FROM public.profiles       WHERE email LIKE '%@flit-test.dev'
UNION ALL
SELECT 'events'         AS tbl, COUNT(*) FROM public.events
UNION ALL
SELECT 'organizers'     AS tbl, COUNT(*) FROM public.organizers
UNION ALL
SELECT 'recruitments'   AS tbl, COUNT(*) FROM public.recruitments
UNION ALL
SELECT 'company_reviews'AS tbl, COUNT(*) FROM public.company_reviews
UNION ALL
SELECT 'posts'          AS tbl, COUNT(*) FROM public.posts;
