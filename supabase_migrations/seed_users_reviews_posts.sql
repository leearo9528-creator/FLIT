-- ═══════════════════════════════════════════════════════════
-- FLIT 가짜 유저 + 리뷰 + 게시글 목데이터
-- ⚠️ seed_mock_data.sql 실행 후에 실행하세요!
-- ═══════════════════════════════════════════════════════════

-- 1. 가짜 유저 생성 (auth.users → profiles 트리거 자동 실행)
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token)
VALUES
('f0000001-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'seller_hana@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"하나","name":"하나"}', NOW() - interval '30 days', NOW(), '', ''),
('f0000001-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'seller_jimin@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"지민","name":"지민"}', NOW() - interval '28 days', NOW(), '', ''),
('f0000001-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'seller_suji@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"수지","name":"수지"}', NOW() - interval '25 days', NOW(), '', ''),
('f0000001-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'seller_minho@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"민호","name":"민호"}', NOW() - interval '22 days', NOW(), '', ''),
('f0000001-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'seller_yuna@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"유나","name":"유나"}', NOW() - interval '20 days', NOW(), '', ''),
('f0000001-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'truck_chef@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"정우셰프","name":"정우셰프"}', NOW() - interval '18 days', NOW(), '', ''),
('f0000001-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'seller_sooyoung@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"수영","name":"수영"}', NOW() - interval '15 days', NOW(), '', ''),
('f0000001-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'truck_bbq@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"BBQ형님","name":"BBQ형님"}', NOW() - interval '12 days', NOW(), '', ''),
('f0000001-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'seller_dahyun@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"다현","name":"다현"}', NOW() - interval '10 days', NOW(), '', ''),
('f0000001-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'seller_taehyung@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"태형","name":"태형"}', NOW() - interval '7 days', NOW(), '', '')
ON CONFLICT (id) DO NOTHING;

-- profiles 보완 (트리거가 생성했지만 seller_type, review_count 추가)
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '2 days' WHERE id = 'f0000001-0000-0000-0000-000000000001';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '3 days' WHERE id = 'f0000001-0000-0000-0000-000000000002';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '1 day' WHERE id = 'f0000001-0000-0000-0000-000000000003';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '5 days' WHERE id = 'f0000001-0000-0000-0000-000000000004';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '1 day' WHERE id = 'f0000001-0000-0000-0000-000000000005';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 2, last_review_at = NOW() - interval '2 days' WHERE id = 'f0000001-0000-0000-0000-000000000006';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '4 days' WHERE id = 'f0000001-0000-0000-0000-000000000007';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 2, last_review_at = NOW() - interval '1 day' WHERE id = 'f0000001-0000-0000-0000-000000000008';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '6 days' WHERE id = 'f0000001-0000-0000-0000-000000000009';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '2 days' WHERE id = 'f0000001-0000-0000-0000-000000000010';

-- ═══════════════════════════════════════════════════════════
-- 2. 리뷰 (reviews)
-- ═══════════════════════════════════════════════════════════
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES

-- 서울밤도깨비야시장 (c001)
('c0000001-0000-0000-0000-000000000001', 'f0000001-0000-0000-0000-000000000001', 'seller', 5, 5, 4, 5, 4, '80~100만',
 ARRAY['20대','30대'], ARRAY['커플 / 연인','친구 / 지인'],
 '높은 집객력'||E'\n'||'적극적인 SNS 홍보'||E'\n'||'좋은 접근성',
 '좁은 부스 공간'||E'\n'||'그늘 없음',
 '여의도 야시장은 진짜 사람 많아요. 토요일 저녁 6시부터 줄 서서 들어오는데, 8시쯤 피크타임에 정신없이 팔았어요. 주최측에서 인스타 홍보를 적극적으로 해줘서 신규 고객도 많았습니다.',
 NOW() - interval '5 days'),

('c0000001-0000-0000-0000-000000000001', 'f0000001-0000-0000-0000-000000000003', 'seller', 4, 5, 3, 4, 5, '60~80만',
 ARRAY['20대','30대','40대'], ARRAY['커플 / 연인','가족 단위 (아이 동반)'],
 '높은 집객력'||E'\n'||'다양한 셀러 구성',
 '비싼 부스비'||E'\n'||'주차 불편',
 '유동인구는 최고인데 부스비가 좀 비싼 편이에요. 그래도 매출로 커버되니까 괜찮아요. 다음에도 참가할 예정!',
 NOW() - interval '4 days'),

-- 홍대 프리마켓 (c003)
('c0000001-0000-0000-0000-000000000003', 'f0000001-0000-0000-0000-000000000002', 'seller', 3, 4, 4, 5, 3, '40~60만',
 ARRAY['20대'], ARRAY['친구 / 지인','나홀로 방문객 (혼쇼족)'],
 '친절한 운영진'||E'\n'||'좋은 접근성'||E'\n'||'다양한 셀러 구성',
 '그늘 없음'||E'\n'||'좁은 통로',
 '홍대 감성 좋아하는 20대가 많이 와요. 핸드메이드 악세사리 팔았는데 반응 좋았어요. 근데 여름엔 그늘이 없어서 힘들 수 있을 듯.',
 NOW() - interval '8 days'),

('c0000001-0000-0000-0000-000000000003', 'f0000001-0000-0000-0000-000000000005', 'seller', 4, 4, 5, 5, 4, '40~60만',
 ARRAY['20대','30대'], ARRAY['커플 / 연인','친구 / 지인'],
 '친절한 운영진'||E'\n'||'체계적인 행사 운영',
 '좁은 부스 공간',
 '운영진 분들이 진짜 친절하세요. 비 올 때 우산 빌려주시고 셀러 음료도 챙겨주셨어요. 자리 배정도 공정하게 해주셔서 만족!',
 NOW() - interval '3 days'),

-- 성수 플리마켓 (c006)
('c0000001-0000-0000-0000-000000000006', 'f0000001-0000-0000-0000-000000000004', 'seller', 4, 3, 4, 4, 3, '20~40만',
 ARRAY['20대','30대'], ARRAY['커플 / 연인','나홀로 방문객 (혼쇼족)'],
 '좋은 접근성'||E'\n'||'다양한 셀러 구성',
 '홍보 부족'||E'\n'||'좁은 통로',
 '성수동 분위기 좋고 감성 있는 손님이 많아요. 매출은 보통이지만 인스타 팔로워가 많이 늘었어요.',
 NOW() - interval '10 days'),

-- 래미안 아파트 (c008)
('c0000001-0000-0000-0000-000000000008', 'f0000001-0000-0000-0000-000000000007', 'seller', 3, 3, 4, 5, 2, '20~40만',
 ARRAY['30대','40대','50대 이상'], ARRAY['가족 단위 (아이 동반)'],
 '친절한 운영진'||E'\n'||'합리적인 참가비',
 '홍보 부족'||E'\n'||'주차 불편',
 '아파트 단지 플리마켓이라 동네 주민분들이 주로 오세요. 아이 동반 가족이 많아서 아동용품이나 간식류가 잘 팔려요. 홍보가 좀 더 되면 좋겠어요.',
 NOW() - interval '7 days'),

('c0000001-0000-0000-0000-000000000008', 'f0000001-0000-0000-0000-000000000009', 'seller', 4, 3, 5, 5, 3, '20~40만',
 ARRAY['30대','40대'], ARRAY['가족 단위 (아이 동반)','친구 / 지인'],
 '체계적인 행사 운영'||E'\n'||'합리적인 참가비'||E'\n'||'넓은 부스 공간',
 '홍보 부족',
 '캡틴코리아 주최 행사 2번째 참가인데, 운영이 체계적이에요. 테이블 파라솔 다 제공해주시고 정산도 깔끔.',
 NOW() - interval '6 days'),

-- 여의도 푸드트럭 (c005)
('c0000001-0000-0000-0000-000000000005', 'f0000001-0000-0000-0000-000000000006', 'foodtruck', 5, 5, 4, 4, 5, '200~300만',
 ARRAY['20대','30대','40대'], ARRAY['커플 / 연인','가족 단위 (아이 동반)','친구 / 지인'],
 '높은 집객력'||E'\n'||'적극적인 홍보'||E'\n'||'우수한 입지',
 '좁은 진입로',
 '한강 푸드트럭은 매출 보장됩니다. 주말 양일간 300만 가까이 나왔어요. 진입로가 좀 좁아서 큰 트럭은 힘들 수 있어요.',
 NOW() - interval '2 days'),

('c0000001-0000-0000-0000-000000000005', 'f0000001-0000-0000-0000-000000000008', 'foodtruck', 4, 5, 3, 4, 4, '150~200만',
 ARRAY['20대','30대'], ARRAY['커플 / 연인','친구 / 지인'],
 '높은 집객력'||E'\n'||'충분한 공간',
 '전압 불안정'||E'\n'||'폐기물 처리 불편',
 'BBQ 메뉴로 참가했는데 반응 좋았어요. 다만 전기가 가끔 불안정해서 발전기 따로 가져가는 게 좋습니다.',
 NOW() - interval '1 day'),

-- 해운대 선셋마켓 (c010)
('c0000001-0000-0000-0000-000000000010', 'f0000001-0000-0000-0000-000000000001', 'seller', 5, 4, 4, 4, 5, '100~150만',
 ARRAY['20대','30대','전 연령층'], ARRAY['커플 / 연인','관광객 / 외국인'],
 '높은 집객력'||E'\n'||'적극적인 SNS 홍보'||E'\n'||'좋은 접근성',
 '그늘 없음',
 '해운대 석양 보면서 마켓하는 경험은 여기서만 가능해요. 관광객도 많고 외국인 손님도 꽤 있어서 영어 가격표 준비하면 좋아요. 석양 시간대에 사진 찍으러 오는 분들이 많아서 감성 디피 중요!',
 NOW() - interval '3 days'),

-- 경리단길 비건마켓 (c014)
('c0000001-0000-0000-0000-000000000014', 'f0000001-0000-0000-0000-000000000005', 'seller', 3, 3, 5, 5, 4, '20~40만',
 ARRAY['20대','30대'], ARRAY['나홀로 방문객 (혼쇼족)','친구 / 지인'],
 '친절한 운영진'||E'\n'||'체계적인 행사 운영',
 '홍보 부족',
 '비건 마켓이라 타겟이 명확해서 좋아요. 오시는 분들이 관심 있는 분들이라 구매 전환율이 높아요. 다만 전체 유동인구는 적은 편.',
 NOW() - interval '2 days'),

-- 코엑스 팝업마켓 (c017)
('c0000001-0000-0000-0000-000000000017', 'f0000001-0000-0000-0000-000000000003', 'seller', 5, 5, 4, 4, 3, '150~200만',
 ARRAY['20대','30대','40대'], ARRAY['나홀로 방문객 (혼쇼족)','친구 / 지인','관광객 / 외국인'],
 '높은 집객력'||E'\n'||'높은 구매력',
 '비싼 부스비'||E'\n'||'주최사 소통 부재',
 '코엑스는 유동인구가 미쳤어요. 하루 매출 70만 넘게 나왔어요. 부스비가 비싸지만 매출로 충분히 커버됩니다. 다만 주최측 소통이 좀 느린 편.',
 NOW() - interval '1 day'),

-- 판교 런치마켓 (c013)
('c0000001-0000-0000-0000-000000000013', 'f0000001-0000-0000-0000-000000000008', 'foodtruck', 4, 5, 4, 5, 3, '100~150만',
 ARRAY['20대','30대','40대'], ARRAY['나홀로 방문객 (혼쇼족)'],
 '높은 집객력'||E'\n'||'합리적인 참가비'||E'\n'||'우수한 입지',
 '폐기물 처리 불편',
 'IT 직장인들이 점심시간에 몰려오는데 3시간 만에 매출 100만 넘깁니다. 무료 참가비라 부담 없고, 대신 메뉴 가성비가 좋아야 해요. 직장인들은 빠르게 먹고 가니까 조리 시간 짧은 메뉴 추천.',
 NOW() - interval '4 days');

-- ═══════════════════════════════════════════════════════════
-- 3. 커뮤니티 게시글 (posts)
-- ═══════════════════════════════════════════════════════════
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES

('f0000001-0000-0000-0000-000000000001', '이번 주말 여의도 야시장 참가하시는 분?',
 '이번 주말 여의도 밤도깨비야시장 참가하시는 셀러분 계신가요? 처음 참가하는데 준비물이나 팁 좀 알려주세요! 특히 전기 관련해서 궁금한 게 많아요.',
 '자유게시판', 'seller', '하나', false, 12, NOW() - interval '3 days'),

('f0000001-0000-0000-0000-000000000002', '홍대 프리마켓 후기 (핸드메이드 악세사리)',
 '지난 토요일 홍대 프리마켓 다녀왔어요.\n\n매출: 약 45만원\n판매 품목: 비즈 악세사리, 실버 반지\n\n20대 여성분들이 많이 오셔서 반지가 잘 팔렸어요. 비즈 팔찌도 커플이 같이 사가는 경우가 많았습니다.\n\n팁: 가격대를 1만원~2만원 사이로 맞추면 충동구매 유도하기 좋아요!',
 '실시간 행사 현황', 'seller', '지민', false, 24, NOW() - interval '2 days'),

('f0000001-0000-0000-0000-000000000003', '플리마켓 초보 셀러 질문이요',
 '다음 달에 처음으로 플리마켓 참가하려고 하는데요.\n\n1. 부스 디피는 어떻게 하는 게 좋을까요?\n2. 거스름돈은 얼마나 준비해야 하나요?\n3. 우천 시 대비는 어떻게 하시나요?\n\n경험 많으신 선배 셀러분들 조언 부탁드려요!',
 '자유게시판', 'seller', '수지', false, 18, NOW() - interval '5 days'),

('f0000001-0000-0000-0000-000000000004', '성수 플리마켓 디피 사진 공유합니다',
 '지난주 성수 플리마켓 디피 사진 공유해요!\n\n요즘 성수 감성에 맞게 우드톤 + 린넨 소재로 깔았더니 반응 좋았어요. 높낮이를 다르게 해서 시선을 유도하는 게 포인트입니다.\n\n사진은 추후 올릴게요!',
 '자유게시판', 'seller', '민호', false, 31, NOW() - interval '4 days'),

('f0000001-0000-0000-0000-000000000005', '푸드트럭 전기 용량 질문',
 '푸드트럭 운영하시는 분들 질문 있어요.\n\n행사장에서 220V 30A 제공한다고 하는데, 튀김기 + 그리들 + 냉장고 동시 사용 가능한가요?\n\n발전기 따로 가져가시나요?',
 '자유게시판', 'foodtruck', '유나', false, 8, NOW() - interval '6 days'),

('f0000001-0000-0000-0000-000000000006', '한강 푸드트럭 매출 인증 🔥',
 '여의도 한강 푸드트럭 페스타 2일간 매출 인증합니다.\n\n토요일: 165만원\n일요일: 142만원\n합계: 307만원\n\n타코야끼 메뉴로 참가했어요. 날씨가 좋아서 사람이 엄청 많았고, 저녁 7~9시가 피크타임이었어요.\n\n참가비 15만원이면 넘사벽 가성비!',
 '실시간 행사 현황', 'foodtruck', '정우셰프', false, 45, NOW() - interval '1 day'),

('f0000001-0000-0000-0000-000000000007', '아파트 플리마켓 참가비가 좀...',
 '요즘 아파트 플리마켓 참가비가 너무 비싸지 않나요?\n\n1000세대 이하인데 하루 8만원이면... 매출이 20~30만원 나오는 곳에서는 부담이에요.\n\n다른 분들은 어떻게 생각하세요?',
 '익명', 'seller', null, true, 15, NOW() - interval '3 days'),

('f0000001-0000-0000-0000-000000000008', '4/12~13 해운대 선셋마켓 같이 가실 분',
 '해운대 선셋마켓 셀러 모집 보고 신청했는데, 혹시 같이 가시는 분 계신가요?\n\n서울에서 부산까지 짐 운반이 고민인데, 카풀하실 분 구합니다.\n\n판매 품목: 캔들 + 디퓨저',
 '자유게시판', 'seller', 'BBQ형님', false, 7, NOW() - interval '2 days'),

('f0000001-0000-0000-0000-000000000009', '제주 핸드메이드 페어 숙소 정보',
 '4월 제주 핸드메이드 페어 참가 예정인데 숙소 추천 부탁드려요.\n\n3박 4일 예정이고 탑동 해변 근처가 좋겠어요.\n\n주최측에서 숙소 할인 연계 가능하다던데 혜택 받으신 분 계신가요?',
 '자유게시판', 'seller', '다현', false, 5, NOW() - interval '4 days'),

('f0000001-0000-0000-0000-000000000010', '비건마켓 매출 솔직 후기',
 '경리단길 비건마켓 참가 후기에요.\n\n매출: 약 25만원 (하루)\n\n솔직히 매출은 많지 않아요. 하지만 오시는 분들이 확실한 타겟층이라 단골 확보에 좋아요.\n\n비건 비누 팔았는데 재구매율이 30% 넘었어요. 인스타 팔로워도 50명 넘게 늘었고요.\n\n매출보다 브랜딩 목적으로 참가하시는 걸 추천!',
 '실시간 행사 현황', 'seller', '태형', false, 19, NOW() - interval '1 day'),

-- 양도/양수 게시글
('f0000001-0000-0000-0000-000000000001', '[양도] 4/6 성수 플리마켓 자리 양도합니다',
 '급한 일이 생겨서 4월 6일 성수 플리마켓 자리 양도합니다.\n\n참가비 4만원 그대로 양도 (수수료 없음)\n부스 위치: A-12 (입구 근처 좋은 자리)\n\n관심 있으신 분 DM 주세요!',
 '행사 양도/양수', 'seller', '하나', false, 9, NOW() - interval '1 day'),

('f0000001-0000-0000-0000-000000000004', '[양수] 4월 코엑스 팝업마켓 자리 구합니다',
 '4/10~12 코엑스 팝업마켓 자리 양수 원합니다.\n\n모집 마감되어서 못 신청했는데 혹시 양도하시는 분 계신가요?\n\n1일만이라도 괜찮습니다. 정가 + 알파 드릴게요.\n\n판매 품목: 일러스트 엽서/포스터',
 '행사 양도/양수', 'seller', '민호', false, 6, NOW() - interval '12 hours');

-- ═══════════════════════════════════════════════════════════
-- 4. 통계 업데이트
-- ═══════════════════════════════════════════════════════════

-- event_instances 리뷰 통계
UPDATE public.event_instances ei SET
    review_count = sub.cnt,
    avg_event_rating = sub.avg_rating
FROM (
    SELECT event_instance_id,
        COUNT(*) as cnt,
        AVG((COALESCE(rating_profit,0) + COALESCE(rating_traffic,0) + COALESCE(rating_support,0) + COALESCE(rating_manners,0)) / 4.0) as avg_rating
    FROM public.reviews
    GROUP BY event_instance_id
) sub
WHERE ei.id = sub.event_instance_id;

-- base_events 통계
UPDATE public.base_events be SET
    total_reviews = sub.cnt,
    avg_event_rating = sub.avg_rating
FROM (
    SELECT ei.base_event_id,
        COUNT(r.*) as cnt,
        AVG((COALESCE(r.rating_profit,0) + COALESCE(r.rating_traffic,0) + COALESCE(r.rating_support,0) + COALESCE(r.rating_manners,0)) / 4.0) as avg_rating
    FROM public.reviews r
    JOIN public.event_instances ei ON ei.id = r.event_instance_id
    GROUP BY ei.base_event_id
) sub
WHERE be.id = sub.base_event_id;

-- organizers 통계
UPDATE public.organizers o SET
    total_reviews = sub.cnt
FROM (
    SELECT ei.organizer_id,
        COUNT(r.*) as cnt
    FROM public.reviews r
    JOIN public.event_instances ei ON ei.id = r.event_instance_id
    WHERE ei.organizer_id IS NOT NULL
    GROUP BY ei.organizer_id
) sub
WHERE o.id = sub.organizer_id;
