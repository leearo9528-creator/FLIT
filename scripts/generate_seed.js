/**
 * 대량 목데이터 SQL 생성 스크립트
 * 실행: node scripts/generate_seed.js
 * 결과: supabase_migrations/seed_bulk.sql
 */
const fs = require('fs');
const path = require('path');

// ─── 한국 이름 풀 ───
const LAST = ['김','이','박','최','정','강','조','윤','장','임','한','오','서','신','권','황','안','송','류','전','홍','고','문','양','손','배','백','허','남','심','노','하','곽','성','차','주','우','민','유','나'];
const FIRST = ['민준','서윤','하준','지우','도윤','서연','시우','하윤','예준','지유','주원','채원','지호','수아','현우','지윤','준서','다은','건우','수빈','유준','예은','지훈','소율','은우','소윤','서진','하은','도현','시은','우진','지안','승현','예린','승우','하린','현서','서현','지원','아린','재윤','수현','태윤','유진','정우','민서','시윤','윤서','은서','연우'];
const NICKNAMES = ['마켓러버','셀러일상','핸드메이드공방','빈티지수집가','소품마니아','디퓨저공방','캔들메이커','가죽공예','도자기작가','일러스트작가','뜨개질러','프리마켓조아','타코트럭','버거킹트럭','크레페트럭','와플장인','떡볶이천국','치킨트럭','커피트럭','스무디트럭','빵차','파스타트럭','주먹밥트럭','꼬치구이','어묵바','플리초보','마켓고수','주말셀러','일상공유','취미생활','부업러','투잡러','프리랜서','디자이너','작가생활','감성셀러','힐링공방','제주살이','서울라이프','인천마켓','부산셀러','대구마켓','광주플리','수원마켓','성수감성','홍대라이프','이태원감성','한남동','경리단길','망원동살이'];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function uuid(prefix, n) { return `${prefix}-0000-0000-0000-${String(n).padStart(12, '0')}`; }
function esc(s) { return s.replace(/'/g, "''"); }
function randomDate(daysBack) { return `NOW() - interval '${rand(1, daysBack)} days'`; }

// ─── 유저 100명 ───
const users = [];
const usedEmails = new Set();
for (let i = 1; i <= 100; i++) {
    const last = pick(LAST);
    const first = pick(FIRST);
    const name = i <= 70 ? `${last}${first}` : pick(NICKNAMES);
    let email;
    do { email = `user${i}_${rand(100,999)}@test.com`; } while (usedEmails.has(email));
    usedEmails.add(email);
    const sellerType = i <= 75 ? 'seller' : 'foodtruck';
    const reviewCount = rand(0, 5);
    users.push({ id: uuid('f1000000', i), email, name, sellerType, reviewCount });
}

// ─── 게시글 카테고리별 템플릿 ───
const POST_TEMPLATES = {
    '자유게시판': [
        { t: '플리마켓 디피 꿀팁 공유해요', c: '디피할 때 높낮이 차이를 주면 시선이 잘 가요.\n\n1. 우드 박스로 단 만들기\n2. 린넨 천 깔기\n3. 조명은 LED 스트링라이트\n4. 가격표는 크래프트지에 손글씨\n\n이것만 해도 분위기 확 달라져요!' },
        { t: '거스름돈 얼마나 준비하세요?', c: '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.\n\n천원짜리 30장, 오천원짜리 10장 정도면 될까요?\n\n선배 셀러분들은 보통 얼마나 준비하시나요?' },
        { t: '우천 시 대비 어떻게 하시나요?', c: '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?\n\n방수 커버? 캐노피? 아니면 그냥 안 가시나요?\n\n지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ' },
        { t: '카드 결제 단말기 추천해주세요', c: '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.\n\n토스, 페이코, 키오스크 뭐가 좋을까요?\n수수료도 비교해보고 싶어요.' },
        { t: '플리마켓에서 가장 잘 팔리는 품목은?', c: '여러 행사 참가해본 결과 정리해봤어요.\n\n1위: 악세사리 (반지, 팔찌)\n2위: 캔들/디퓨저\n3위: 일러스트 엽서/스티커\n4위: 빈티지 의류\n5위: 수제 간식\n\n다들 비슷한가요?' },
        { t: '혼자 플리마켓 참가하시는 분?', c: '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.\n\n옆 부스 셀러분께 부탁하거나 잠깐 비우는데...\n\n혼자 하시는 분들 어떻게 하세요?' },
        { t: '여름 야외 마켓 생존 키트', c: '여름 야외 마켓 필수템 정리!\n\n- 선크림 (수시로 덧바르기)\n- 미니 선풍기 (클립형 추천)\n- 얼음물 텀블러\n- 양산 or 파라솔\n- 쿨타올\n- 모기 퇴치 스프레이\n\n추가할 거 있으면 댓글!' },
        { t: '셀러 보험 가입하신 분 계세요?', c: '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?\n\n셀러 보험 같은 거 가입하신 분 있나요?\n\n비용이랑 보장 범위가 궁금합니다.' },
        { t: '포장재 어디서 구매하시나요?', c: '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.\n\n쿠팡? 알리? 아이디어스?\n\n가성비 좋은 곳 알려주시면 감사!' },
        { t: '마켓 끝나고 정산 어떻게 하세요?', c: '하루 매출 정리를 어떻게 하시나요?\n\n엑셀? 가계부 앱? 노트?\n\n세금 신고도 해야 하는지 궁금해요.' },
    ],
    '익명': [
        { t: '솔직히 플리마켓 수익 별로 아닌가요?', c: '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.\n\n교통비, 식비, 재료비 다 빼면...\n\n다들 이 정도인가요 아니면 제가 못하는 건가요?' },
        { t: '주최사 갑질 경험 있으신 분?', c: '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.\n\n사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?' },
        { t: '같은 행사 셀러끼리 경쟁이 심해요', c: '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.\n\n가격 경쟁도 하게 되고...\n\n주최사가 품목 분산 배치 좀 해줬으면.' },
        { t: '참가비 환불 안 해주는 주최사', c: '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.\n\n약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?\n\n소비자원 신고해야 하나...' },
        { t: '야시장에서 도난 당했어요', c: '어제 야시장에서 상품 도난 당했어요.\n\n잠깐 자리 비운 사이에 악세사리 세트가 통째로...\n\nCCTV 확인 요청했는데 주최사가 비협조적이에요.\n\n다들 도난 방지 어떻게 하세요?' },
    ],
    '실시간 행사 현황': [
        { t: '[현장] 여의도 야시장 현재 상황', c: '지금 여의도 야시장 현장이에요!\n\n날씨 좋아서 사람 엄청 많아요.\n7시 기준 매출 이미 30만 돌파.\n\n오늘 컨디션 좋습니다 💪' },
        { t: '[현장] 홍대 프리마켓 오늘 날씨 최고', c: '홍대 프리마켓 현장입니다.\n\n오늘 날씨가 너무 좋아서 손님이 많아요.\n벚꽃 시즌이라 외국인 관광객도 많네요.\n\n매출 기대됩니다!' },
        { t: '[현장] 성수 플리마켓 오픈 직후', c: '성수 플리마켓 방금 오픈했어요.\n\n아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.\n\n오늘 신메뉴 캔들 반응 기대중!' },
        { t: '[현장] 해운대 선셋마켓 석양 미쳤다', c: '해운대 선셋마켓 현장이에요.\n\n석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.\n\n관광객 비율이 50% 넘는 듯.' },
        { t: '[현장] 코엑스 팝업마켓 유동인구 미쳤음', c: '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.\n\n오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.\n\n이 정도면 참가비 10만원 아깝지 않네요.' },
    ],
    '행사 양도/양수': [
        { t: '[양도] 4/12 홍대 프리마켓 자리', c: '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.\n\n참가비 3만원 그대로.\n좋은 위치에요.\n\n관심 있으신 분 댓글 주세요.' },
        { t: '[양수] 여의도 야시장 자리 구합니다', c: '4월 여의도 밤도깨비야시장 자리 양수 원합니다.\n\n모집 마감되어서 못 들어갔어요 ㅠㅠ\n\n양도하시는 분 연락 주세요!' },
        { t: '[양도] 4/19 성수 플리마켓 2자리 양도', c: '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.\n\n2자리 함께 or 1자리만 가능.\n참가비: 4만원/자리\n\nDM 주세요.' },
        { t: '[양수] 제주 핸드메이드 페어 자리', c: '4/25~27 제주 핸드메이드 페어 자리 구합니다.\n\n1일만이라도 괜찮아요.\n판매 품목: 도자기 (깨지지 않게 잘 포장합니다)\n\n연락처 댓글로 남겨주세요.' },
        { t: '[양도] 4/19 인천 송도 마켓 양도', c: '인천 송도 글로벌마켓 자리 양도합니다.\n\n참가비 55,000원 그대로.\n자리 위치: 수변광장 B-7\n\n빠른 연락 부탁드려요!' },
    ],
};

// ─── 추가 자유게시판 제목/내용 ───
const EXTRA_FREE = [
    { t: '첫 매출 100만원 달성 후기', c: '드디어 월 매출 100만원을 달성했어요!\n\n3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.\n\n아직 본업 수준은 아니지만 뿌듯합니다.' },
    { t: '마켓 참가 시 필요한 허가증이 있나요?', c: '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?\n\n비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?\n\n사업자등록증은 필수인가요?' },
    { t: 'SNS 마케팅 효과 있나요?', c: '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.\n\n팔로워는 느는데 실제 매출과 연결되는지...\n\n효과적인 홍보 방법 공유해주세요!' },
    { t: '겨울 마켓 참가 고민', c: '겨울에도 야외 마켓 참가하시나요?\n\n손님도 적고 추운데...\n\n실내 마켓은 부스비가 비싸서 고민이에요.' },
    { t: '같이 참가할 파트너 구합니다', c: '혼자 마켓 참가하기 힘드신 분!\n\n서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.\n\n부스비 반반, 판매도 번갈아가면서.\n\n품목: 악세사리 (겹치지 않으면 좋겠어요)' },
    { t: '푸드트럭 창업 비용 현실', c: '푸드트럭 창업 3개월 차인데 현실을 공유해요.\n\n트럭 구매: 2500만원\n개조비: 800만원\n장비: 500만원\n\n월 고정비: 약 150만원 (보험, 주차, 재료비)\n\n월 평균 매출: 400~500만원\n순수익: 150~200만원 정도예요.' },
    { t: '마켓에서 만난 인연', c: '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데\n\n지금은 같이 브랜드 운영하고 있어요 ㅎㅎ\n\n마켓의 좋은 점 중 하나가 이런 네트워킹이죠!' },
    { t: '해외 플리마켓 경험 공유', c: '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.\n\n한국과 다른 점:\n- 빈티지/중고 비율이 90%\n- 가격이 매우 저렴 (100엔~)\n- 음식 판매 거의 없음\n\n한국 마켓이 더 다양하고 감성적인 것 같아요.' },
    { t: '셀러 명함 만드셨나요?', c: '명함이나 쇼핑카드 만드신 분 계세요?\n\n인스타 QR코드 넣으면 좋다던데\n\n어디서 인쇄하시나요? 비스타프린트? 미리캔버스?' },
    { t: '마켓 후 근육통 극복법', c: '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...\n\n깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데\n\n다른 좋은 방법 있나요?' },
];

function generateSQL() {
    let sql = `-- ═══════════════════════════════════════════════════════════
-- FLIT 대량 목데이터 (유저 100명 + 게시글 300개)
-- seed_mock_data.sql, seed_users_reviews_posts.sql 실행 후 실행
-- ═══════════════════════════════════════════════════════════

-- 기존 대량 시드 유저 삭제 (f1 prefix)
DELETE FROM public.post_comments WHERE user_id IN (SELECT id FROM public.profiles WHERE id::text LIKE 'f1000000%');
DELETE FROM public.posts WHERE user_id IN (SELECT id FROM public.profiles WHERE id::text LIKE 'f1000000%');
DELETE FROM public.reviews WHERE user_id IN (SELECT id FROM public.profiles WHERE id::text LIKE 'f1000000%');
DELETE FROM public.profiles WHERE id::text LIKE 'f1000000%';
DELETE FROM auth.users WHERE id::text LIKE 'f1000000%';

`;

    // 유저 INSERT
    sql += `-- ═══ 유저 100명 ═══\n`;
    for (const u of users) {
        sql += `INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('${u.id}', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '${u.email}', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"${esc(u.name)}","name":"${esc(u.name)}"}', ${randomDate(60)}, NOW(), '', '') ON CONFLICT (id) DO NOTHING;\n`;
    }

    sql += `\n-- profiles 업데이트\n`;
    for (const u of users) {
        const hasReview = u.reviewCount > 0;
        sql += `UPDATE public.profiles SET seller_type = '${u.sellerType}', review_count = ${u.reviewCount}${hasReview ? `, last_review_at = ${randomDate(7)}` : ''} WHERE id = '${u.id}';\n`;
    }

    // 리뷰 추가 (리뷰카운트 > 0인 유저들)
    const eventInstances = [
        'c0000001-0000-0000-0000-000000000001','c0000001-0000-0000-0000-000000000002','c0000001-0000-0000-0000-000000000003',
        'c0000001-0000-0000-0000-000000000004','c0000001-0000-0000-0000-000000000005','c0000001-0000-0000-0000-000000000006',
        'c0000001-0000-0000-0000-000000000007','c0000001-0000-0000-0000-000000000008','c0000001-0000-0000-0000-000000000009',
        'c0000001-0000-0000-0000-000000000010','c0000001-0000-0000-0000-000000000011','c0000001-0000-0000-0000-000000000012',
        'c0000001-0000-0000-0000-000000000013','c0000001-0000-0000-0000-000000000014','c0000001-0000-0000-0000-000000000015',
        'c0000001-0000-0000-0000-000000000016','c0000001-0000-0000-0000-000000000017','c0000001-0000-0000-0000-000000000018',
        'c0000001-0000-0000-0000-000000000019',
    ];
    const REVENUE_SELLER = ['0~20만','20~40만','40~60만','60~80만','80~100만','100~150만'];
    const REVENUE_TRUCK = ['0~30만','30~70만','70~100만','100~150만','150~200만','200~300만'];
    const AGES = ['10대','20대','30대','40대','50대 이상','전 연령층'];
    const VISITORS = ['가족 단위 (아이 동반)','커플 / 연인','친구 / 지인','나홀로 방문객 (혼쇼족)','관광객 / 외국인'];
    const PROS_S = ['높은 집객력','높은 구매력','친절한 운영진','체계적인 행사 운영','넓은 부스 공간','적극적인 SNS 홍보','합리적인 참가비','좋은 접근성'];
    const CONS_S = ['비싼 부스비','홍보 부족','그늘 없음','운영 미흡','좁은 통로','주차 불편','좁은 부스 공간','주최사 소통 부재'];
    const PROS_T = ['높은 집객력','안정적 전력 공급','넓은 진입로','우수한 입지','충분한 공간','적극적인 홍보','합리적인 참가비'];
    const CONS_T = ['전압 불안정','좁은 진입로','폐기물 처리 불편','주최사 소통 부재','홍보 부족','비싼 참가비'];
    const CONTENTS = [
        '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.',
        '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!',
        '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.',
        '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.',
        '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.',
        '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!',
        '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.',
        '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.',
        '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!',
        '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.',
    ];

    sql += `\n-- ═══ 추가 리뷰 ═══\n`;
    const reviewUsers = users.filter(u => u.reviewCount > 0);
    for (const u of reviewUsers) {
        for (let r = 0; r < u.reviewCount; r++) {
            const inst = pick(eventInstances);
            const isTruck = u.sellerType === 'foodtruck';
            const rev = isTruck ? pick(REVENUE_TRUCK) : pick(REVENUE_SELLER);
            const ages = [pick(AGES), pick(AGES)].filter((v,i,a) => a.indexOf(v)===i);
            const vis = [pick(VISITORS)];
            const pros = [pick(isTruck ? PROS_T : PROS_S), pick(isTruck ? PROS_T : PROS_S)].filter((v,i,a) => a.indexOf(v)===i);
            const cons = [pick(isTruck ? CONS_T : CONS_S)];
            sql += `INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('${inst}', '${u.id}', '${u.sellerType}', ${rand(2,5)}, ${rand(2,5)}, ${rand(2,5)}, ${rand(2,5)}, ${rand(1,5)}, '${rev}', ARRAY[${ages.map(a=>`'${a}'`).join(',')}], ARRAY[${vis.map(v=>`'${esc(v)}'`).join(',')}], '${pros.join("'||E'\\n'||'")}', '${cons.join("'||E'\\n'||'")}', '${esc(pick(CONTENTS))}', ${randomDate(30)});\n`;
        }
    }

    // 게시글 300개
    sql += `\n-- ═══ 게시글 300개 ═══\n`;
    const categories = Object.keys(POST_TEMPLATES);
    // 비율: 자유 50%, 익명 20%, 실시간 15%, 양도 15%
    const catWeights = { '자유게시판': 150, '익명': 60, '실시간 행사 현황': 45, '행사 양도/양수': 45 };

    let postIdx = 0;
    for (const [cat, count] of Object.entries(catWeights)) {
        const templates = [...POST_TEMPLATES[cat], ...(cat === '자유게시판' ? EXTRA_FREE : [])];
        for (let i = 0; i < count; i++) {
            const u = pick(users);
            const tmpl = templates[i % templates.length];
            const isAnon = cat === '익명';
            const suffix = count > templates.length ? ` (${rand(1,99)})` : '';
            const title = esc(tmpl.t + suffix);
            const content = esc(tmpl.c);
            const author = isAnon ? 'null' : `'${esc(u.name)}'`;
            const likes = rand(0, 50);
            sql += `INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('${u.id}', '${title}', '${content}', '${cat}', '${u.sellerType}', ${author}, ${isAnon}, ${likes}, ${randomDate(30)});\n`;
            postIdx++;
        }
    }

    // 통계 업데이트
    sql += `
-- ═══ 통계 업데이트 ═══
UPDATE public.event_instances ei SET
    review_count = sub.cnt,
    avg_event_rating = sub.avg_rating
FROM (
    SELECT event_instance_id,
        COUNT(*) as cnt,
        AVG((COALESCE(rating_profit,0) + COALESCE(rating_traffic,0) + COALESCE(rating_support,0) + COALESCE(rating_manners,0)) / 4.0) as avg_rating
    FROM public.reviews GROUP BY event_instance_id
) sub WHERE ei.id = sub.event_instance_id;

UPDATE public.base_events be SET
    total_reviews = sub.cnt,
    avg_event_rating = sub.avg_rating
FROM (
    SELECT ei.base_event_id, COUNT(r.*) as cnt,
        AVG((COALESCE(r.rating_profit,0) + COALESCE(r.rating_traffic,0) + COALESCE(r.rating_support,0) + COALESCE(r.rating_manners,0)) / 4.0) as avg_rating
    FROM public.reviews r JOIN public.event_instances ei ON ei.id = r.event_instance_id
    GROUP BY ei.base_event_id
) sub WHERE be.id = sub.base_event_id;

UPDATE public.organizers o SET
    total_reviews = sub.cnt
FROM (
    SELECT ei.organizer_id, COUNT(r.*) as cnt
    FROM public.reviews r JOIN public.event_instances ei ON ei.id = r.event_instance_id
    WHERE ei.organizer_id IS NOT NULL GROUP BY ei.organizer_id
) sub WHERE o.id = sub.organizer_id;
`;

    const outPath = path.join(__dirname, '..', 'supabase_migrations', 'seed_bulk.sql');
    fs.writeFileSync(outPath, sql, 'utf-8');
    console.log(`생성 완료: ${outPath}`);
    console.log(`유저: ${users.length}명, 리뷰: ${reviewUsers.reduce((a,u) => a+u.reviewCount, 0)}건, 게시글: ${postIdx}건`);
}

generateSQL();
