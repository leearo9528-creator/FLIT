-- ────────────────────────────────────────────────────────────────
-- 커뮤니티 댓글 시드 데이터
-- ※ community_seed.sql 실행 후 실행해야 합니다
-- 실행 위치: Supabase Dashboard > SQL Editor
-- ────────────────────────────────────────────────────────────────

-- ── '오늘 홍대 플리마켓 현장 상황' ─────────────────────────────
INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '홍대단골', '저도 오늘 갔어요! 액세서리 존 정말 대기줄 길더라고요 ㅎㅎ 잘 팔리셨길 바라요~', false, 5, NOW() - INTERVAL '1 hour 30 min'
FROM public.posts WHERE title = '오늘 홍대 플리마켓 현장 상황' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '준비중셀러', '혹시 주최사 연락처나 다음 행사 일정도 공유해주실 수 있나요?', false, 2, NOW() - INTERVAL '1 hour'
FROM public.posts WHERE title = '오늘 홍대 플리마켓 현장 상황' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '홍대단골', '공식 인스타 @hongdae_flea 에서 확인하시면 돼요!', false, 3, NOW() - INTERVAL '45 min'
FROM public.posts WHERE title = '오늘 홍대 플리마켓 현장 상황' LIMIT 1;

-- ── '뚝섬 한강공원 푸드트럭 오늘 대박' ───────────────────────
INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '한강단골', '저도 뚝섬 갔다가 줄 보고 그냥 왔어요 ㅋㅋ 그 정도로 대박이었군요!', false, 8, NOW() - INTERVAL '4 hours'
FROM public.posts WHERE title = '뚝섬 한강공원 푸드트럭 오늘 대박' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '트럭준비중', '혹시 어떤 메뉴가 제일 잘 나갔나요? 저도 한강 입점 준비 중이라서요!', false, 4, NOW() - INTERVAL '3 hours 30 min'
FROM public.posts WHERE title = '뚝섬 한강공원 푸드트럭 오늘 대박' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '뚝섬트럭', '떡볶이가 압도적이었어요! 날이 선선해지면 분식류가 진짜 잘 나가더라고요. 화이팅입니다!', false, 11, NOW() - INTERVAL '3 hours'
FROM public.posts WHERE title = '뚝섬 한강공원 푸드트럭 오늘 대박' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '익명', '저도 근처에서 트럭 하는데 이 게시글 보고 뚝섬으로 옮기고 싶어졌어요 ㅠ', true, 6, NOW() - INTERVAL '2 hours'
FROM public.posts WHERE title = '뚝섬 한강공원 푸드트럭 오늘 대박' LIMIT 1;

-- ── '대구 동성로 플리마켓 오늘 취소됨' ───────────────────────
INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '대구셀러2', '저도 헛걸음했어요... 정말 너무하네요. 미리 공지 좀 해주면 안 되나ㅠ', false, 14, NOW() - INTERVAL '3 days 20 hours'
FROM public.posts WHERE title = '대구 동성로 플리마켓 오늘 취소됨' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '익명', '이 주최사 전에도 당일 취소한 적 있어요. 개인적으로 참가 비추천합니다', true, 22, NOW() - INTERVAL '3 days 18 hours'
FROM public.posts WHERE title = '대구 동성로 플리마켓 오늘 취소됨' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '정보공유러', '다음주 대체 일정도 날씨 확인하고 참가 여부 결정하는 게 좋을 것 같아요. 요즘 예보가 워낙 변덕이라서요.', false, 9, NOW() - INTERVAL '3 days 15 hours'
FROM public.posts WHERE title = '대구 동성로 플리마켓 오늘 취소됨' LIMIT 1;

-- ── '처음 셀러 시작하려는데 뭐부터 해야 할까요?' ──────────────
INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '3년차셀러', '소규모 행사부터 시작하는 게 맞아요! 큰 행사는 경쟁도 세고 자리도 비싸거든요. 처음엔 동네 소규모 마켓에서 손님 반응 보면서 감 잡는 게 제일 좋아요.', false, 18, NOW() - INTERVAL '2 hours 30 min'
FROM public.posts WHERE title = '처음 셀러 시작하려는데 뭐부터 해야 할까요?' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '1년차셀러', '저도 처음엔 막막했는데 이 앱으로 공고 찾아서 지원했어요. 첫 행사가 제일 기억에 남아요 ㅎㅎ 파이팅!', false, 12, NOW() - INTERVAL '2 hours'
FROM public.posts WHERE title = '처음 셀러 시작하려는데 뭐부터 해야 할까요?' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '핸드메이드고수', '악세서리는 야외보다 실내 행사가 훨씬 유리해요. 날씨 영향 없고 고객층도 더 집중돼서요. 처음엔 실내 소규모 팝업 추천드려요!', false, 15, NOW() - INTERVAL '1 hour 30 min'
FROM public.posts WHERE title = '처음 셀러 시작하려는데 뭐부터 해야 할까요?' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '입문셀러', '정말 감사해요! 실내 소규모부터 도전해볼게요 😊', false, 4, NOW() - INTERVAL '1 hour'
FROM public.posts WHERE title = '처음 셀러 시작하려는데 뭐부터 해야 할까요?' LIMIT 1;

-- ── '주최사 갑질 경험담' ──────────────────────────────────────
INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '익명', '저도 비슷한 경험 있어요. 계약서에 명시된 자리랑 완전히 다른 구석 자리 배정받고 항의했더니 오히려 저한테 화내더라고요. 진짜 ㅠ', true, 31, NOW() - INTERVAL '7 hours'
FROM public.posts WHERE title = '주최사 갑질 경험담 (사실 그대로)' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '법알못', '이런 경우 소비자원에 신고 가능한가요? 아니면 그냥 참아야 하는 건지...', false, 8, NOW() - INTERVAL '6 hours 30 min'
FROM public.posts WHERE title = '주최사 갑질 경험담 (사실 그대로)' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '계약전문가', '계약서에 명시된 내용 위반이면 민사 청구 가능해요. 다만 금액이 작으면 현실적으로 어렵고... 그래서 사전에 주최사 후기 꼭 보는 게 중요해요. 이 플랫폼 후기 기능이 그래서 존재하는 거예요.', false, 27, NOW() - INTERVAL '5 hours'
FROM public.posts WHERE title = '주최사 갑질 경험담 (사실 그대로)' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '익명', '솔직하게 후기 써주셔서 감사해요. 덕분에 그 행사 지원 안 하기로 했어요.', true, 19, NOW() - INTERVAL '4 hours'
FROM public.posts WHERE title = '주최사 갑질 경험담 (사실 그대로)' LIMIT 1;

-- ── '푸드트럭 처음 시작한 지 6개월 된 솔직한 후기' ───────────
INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '창업꿈나무', '현실적인 이야기 감사해요. 저도 푸드트럭 준비 중인데 많이 참고가 됐어요. 혹시 첫 달에 실질 순이익이 어느 정도였나요?', false, 16, NOW() - INTERVAL '23 hours'
FROM public.posts WHERE title = '푸드트럭 처음 시작한 지 6개월 된 솔직한 후기' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '6개월트럭', '첫 달은 솔직히 마이너스였어요 ㅠ 초기 세팅 비용이 있어서요. 3개월 지나면서 조금씩 안정됐고 지금은 월 150~200 정도 남기는 것 같아요. 메뉴랑 위치가 진짜 중요해요!', false, 34, NOW() - INTERVAL '22 hours'
FROM public.posts WHERE title = '푸드트럭 처음 시작한 지 6개월 된 솔직한 후기' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '5년차트럭', '6개월 만에 이 정도면 잘하고 계신 거예요! 저도 처음엔 힘들었는데 지금은 행사 고르는 눈이 생겨서 훨씬 안정됐어요. 화이팅!', false, 21, NOW() - INTERVAL '20 hours'
FROM public.posts WHERE title = '푸드트럭 처음 시작한 지 6개월 된 솔직한 후기' LIMIT 1;

-- ── '카드 결제 단말기 어떤 거 쓰세요?' ───────────────────────
INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '단말기고수', '저는 아임포트 + 나이스페이 조합 쓰는데 수수료 1.5%에 다음날 정산이에요. 아이폰 호환도 잘 되고요. 추천합니다!', false, 20, NOW() - INTERVAL '23 hours'
FROM public.posts WHERE title = '카드 결제 단말기 어떤 거 쓰세요?' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '스마트셀러', '저는 스퀘어 쓰는데 아이폰 연동 진짜 편해요. 수수료 1.9%지만 정산이 빠르고 앱 UI가 깔끔해서 만족해요.', false, 14, NOW() - INTERVAL '22 hours'
FROM public.posts WHERE title = '카드 결제 단말기 어떤 거 쓰세요?' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '결제고민', '두 분 다 감사해요! 스퀘어 한번 써봐야겠어요 👍', false, 3, NOW() - INTERVAL '21 hours'
FROM public.posts WHERE title = '카드 결제 단말기 어떤 거 쓰세요?' LIMIT 1;

-- ── '매출 2배 만든 가격 전략 공유' ───────────────────────────
INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '가격고민중', '미끼 상품 아이디어 완전 좋네요! 저는 항상 최저가 만들면 마진이 안 나와서 고민이었는데, 1000원짜리 별도로 두는 방법은 생각 못 했어요.', false, 24, NOW() - INTERVAL '5 hours'
FROM public.posts WHERE title = '매출 2배 만든 가격 전략 공유' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '수학잘하는셀러', '3개 세트 묶음 전략은 저도 써봤는데 진짜 효과 있어요. 개당 가격보다 살짝 싸게 설정하면 손님들이 자연스럽게 더 담아가요.', false, 17, NOW() - INTERVAL '4 hours'
FROM public.posts WHERE title = '매출 2배 만든 가격 전략 공유' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '매출왕셀러', '맞아요! 세트 구성은 재고 정리에도 도움이 되더라고요. 인기 상품 + 덜 나가는 상품 조합하면 전체 회전율이 올라가요.', false, 32, NOW() - INTERVAL '3 hours'
FROM public.posts WHERE title = '매출 2배 만든 가격 전략 공유' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '초보셀러99', '이 글 저장해뒀어요. 다음 행사에 꼭 적용해볼게요!', false, 7, NOW() - INTERVAL '2 hours'
FROM public.posts WHERE title = '매출 2배 만든 가격 전략 공유' LIMIT 1;

-- ── '좋은 주최사 고르는 나만의 기준' ─────────────────────────
INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '동감100', '정산 기준이 진짜 중요하죠. 저는 정산 지연된 주최사 때문에 한 달 버텨야 했던 적 있어요. 꼭 확인하고 참가해야 해요.', false, 29, NOW() - INTERVAL '3 days 20 hours'
FROM public.posts WHERE title = '좋은 주최사 고르는 나만의 기준' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '마케팅중요', '저는 SNS 마케팅 열심히 하는 주최사가 제일 중요하더라고요. 행사 홍보를 주최사가 열심히 해줄수록 방문객이 달라요.', false, 22, NOW() - INTERVAL '3 days 18 hours'
FROM public.posts WHERE title = '좋은 주최사 고르는 나만의 기준' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '익명', '피드백 반영이 가장 어려운 것 같아요. 이 플랫폼 리뷰 기능이 주최사들한테도 자극이 됐으면 좋겠어요.', true, 18, NOW() - INTERVAL '3 days 12 hours'
FROM public.posts WHERE title = '좋은 주최사 고르는 나만의 기준' LIMIT 1;

-- ── '행사 취소되면 참가비 환불 받을 수 있나요?' ───────────────
INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '계약전문가', '계약서에 환불 조항이 없어도 주최사 귀책사유로 취소된 경우엔 민법상 원칙적으로 환불 청구 가능해요. 일단 내용증명 보내고 안 되면 소비자원 신고하세요.', false, 35, NOW() - INTERVAL '2 days 22 hours'
FROM public.posts WHERE title = '행사 취소되면 참가비 환불 받을 수 있나요?' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '경험자', '저는 비슷한 상황에서 소비자원에 신고해서 전액 환불 받았어요. 시간이 좀 걸리긴 했지만 포기하지 마세요!', false, 28, NOW() - INTERVAL '2 days 20 hours'
FROM public.posts WHERE title = '행사 취소되면 참가비 환불 받을 수 있나요?' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '익명', '환불 못 받은 경우가 더 많은 것 같아서... 처음부터 계약서에 명시하는 게 최선인 것 같아요', true, 15, NOW() - INTERVAL '2 days 18 hours'
FROM public.posts WHERE title = '행사 취소되면 참가비 환불 받을 수 있나요?' LIMIT 1;

-- ── '처음 가는 행사 체크리스트 있을까요?' ─────────────────────
INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '베테랑셀러', '체크리스트 드릴게요! ✅ 가격표 ✅ 영수증 또는 카드 단말기 ✅ 거스름돈 (현금 여유분) ✅ 개인 음식/물 ✅ 보조배터리 ✅ 테이프, 가위 ✅ 여분 쇼핑백. 이거 기본이에요!', false, 47, NOW() - INTERVAL '4 days 20 hours'
FROM public.posts WHERE title = '처음 가는 행사 체크리스트 있을까요?' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '야외전문', '야외면 선크림이랑 모자도 꼭 챙기세요. 하루 종일 서있으면 진짜 탑니다 ㅠ 그리고 편한 신발 필수!', false, 31, NOW() - INTERVAL '4 days 18 hours'
FROM public.posts WHERE title = '처음 가는 행사 체크리스트 있을까요?' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '첫행사준비', '와 이런 댓글들이 달릴 줄 몰랐어요ㅠㅠ 정말 감사합니다! 잘 다녀오겠습니다!', false, 9, NOW() - INTERVAL '4 days 16 hours'
FROM public.posts WHERE title = '처음 가는 행사 체크리스트 있을까요?' LIMIT 1;

-- ── '[판매] 2x2m 캐노피 텐트 팔아요' ──────────────────────────
INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '텐트필요', '아직 판매 가능한가요? 직거래 홍대 가능하면 구매하고 싶어요!', false, 1, NOW() - INTERVAL '23 hours'
FROM public.posts WHERE title = '[판매] 2x2m 캐노피 텐트 팔아요 (거의 새것)' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '셀러마켓1', '네 아직 있어요! DM 주세요~', false, 0, NOW() - INTERVAL '22 hours'
FROM public.posts WHERE title = '[판매] 2x2m 캐노피 텐트 팔아요 (거의 새것)' LIMIT 1;

-- ── '[구매] 접이식 테이블 2개 구합니다' ──────────────────────
INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '테이블있어요', '1.5m 접이식 2개 있어요. 경기 성남 직거래 가능한데 괜찮으세요?', false, 2, NOW() - INTERVAL '1 day 22 hours'
FROM public.posts WHERE title = '[구매] 접이식 테이블 2개 구합니다' LIMIT 1;

INSERT INTO public.post_comments (post_id, author, content, is_anonymous, likes, created_at)
SELECT id, '테이블급구', '성남도 괜찮아요! DM 드릴게요 감사합니다!!', false, 0, NOW() - INTERVAL '1 day 21 hours'
FROM public.posts WHERE title = '[구매] 접이식 테이블 2개 구합니다' LIMIT 1;
