/**
 * FLIT 페르소나 목데이터 생성기
 * - 일반 핸드메이드 셀러 100명 (페르소나 부여)
 * - 푸드트럭 셀러 100명 (페르소나 부여)
 * - 페르소나별 가짜 게시글 작성
 *
 * 실행: node scripts/generate_personas.js
 * 결과: supabase_migrations/seed_personas.sql
 */
const fs = require('fs');
const path = require('path');

/* ─── helpers ─── */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const uuid = (prefix, n) => `${prefix}-0000-0000-0000-${String(n).padStart(12, '0')}`;
const esc = (s) => (s || '').replace(/'/g, "''").replace(/\n/g, '\\n');
const sqlStr = (s) => (s == null || s === '' ? 'NULL' : `E'${esc(s)}'`);
const randDate = (daysBack) => `NOW() - interval '${rand(1, daysBack)} days'`;
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

/* ─── 한국 이름 ─── */
const LAST = ['김','이','박','최','정','강','조','윤','장','임','한','오','서','신','권','황','안','송','류','전','홍','고','문','양','손','배','백','허','남','심'];
const FIRST_F = ['지윤','서연','하윤','지유','서윤','민지','수아','지우','예은','채원','수빈','다은','은채','소율','지민','윤서','예지','지은','하은','보민','연우','시은','유나','채은','지수','은서','다인','수민','서아','나은'];
const FIRST_M = ['민준','준서','도윤','시우','하준','예준','주원','지호','선우','우진','지환','연우','승현','준영','진우','태민','동현','승우','정우','강민','우빈','지훈','은우','건우','승원','시현','민재','수호','지원','정훈'];
const koreanName = () => `${pick(LAST)}${Math.random() < 0.5 ? pick(FIRST_F) : pick(FIRST_M)}`;

/* ─── 핸드메이드 페르소나 풀 ─── */
const HM_PRODUCTS = [
    '레진 악세사리', '도자기 컵·그릇', '실버 미니멀 주얼리', '캘리그라피 엽서·문구',
    '천연 비누', '아로마 캔들', '드라이플라워 부케', '가죽 키링·카드지갑',
    '비즈 팔찌·반지', '천연 향수', '마크라메 벽장식', '뜨개 모자·머플러',
    '리넨 에코백', '디퓨저', '뜨개 인형·소품', '레진 코스터·트레이',
    '한지 공예', '자수 손수건·파우치', '도자기 화병', '핸드드로잉 일러스트 굿즈',
    '우드 도마·소반', '유리 공예 컵', '천연염색 스카프', '석고 방향제',
    '왁스 타블렛', '핸드메이드 향초', '비누 꽃다발', '레진 키링',
];
const HM_STYLES = ['미니멀','빈티지','내추럴','북유럽','클래식','러블리','모던','코지'];
const HM_BRAND_WORDS = [
    '하루', '소소', '온유', '봄날', '햇살', '달빛', '꽃담', '차분', '아토', '리브',
    '메이', '루비', '엘르', '미니', '코지', '소담', '모카', '레몬', '바닐라', '루나',
    '솜', '나무', '돌담', '향기', '오월', '리리', '라일락', '스튜디오', '아뜰리에', '디자인',
];
const HM_STORIES = [
    '본업은 직장인이고 주말마다 셀러로 활동 중이에요.',
    '풀타임 작가로 전국 마켓 다니며 활동합니다.',
    '취미로 시작해서 부업이 된 케이스입니다.',
    '재료부터 끝까지 직접 고르고 손으로 만들어요.',
    '경력 5년차, 단골 손님 위주로 운영합니다.',
    '아이 키우면서 시작한 작은 브랜드예요.',
    '디자인 전공 살려서 창업했어요.',
    '인스타에서 시작해 오프라인 마켓까지 진출!',
    '일러스트 작가 겸 셀러로 활동 중입니다.',
    '핸드메이드 클래스도 같이 운영해요.',
];

/* ─── 푸드트럭 페르소나 풀 ─── */
const FT_MENUS = [
    '수제 햄버거', '타코·부리또', '닭강정', '곱창 튀김', '화덕 피자',
    '커피·디저트', '츄러스', '과일 빙수', '핫도그', '회오리 감자',
    '베트남 쌀국수', '꼬치구이', '스테이크', '크림 파스타', '딤섬·만두',
    '카레라이스', '핫바·어묵', '곱창전골', '호떡', '와플',
    '랍스터롤', '컵밥', '떡볶이', '브리또볼', '치즈볼·핫도그',
    '에이드·스무디', '아이스크림', '닭갈비', '소떡소떡', '회전 통닭',
];
const FT_TRUCK_WORDS = [
    '맛있는', '대박', '소문난', '진심', '한입', '키친', '셰프', '마망',
    '몽땅', '꿀꺽', '쩝쩝', '하루', '밥상', '한그릇', '오븐', '굽다',
    '향기', '불꽃', '오감', '오리지날', '브라더스', '키드', '브런치', '데일리',
];
const FT_STORIES = [
    '5년차 푸드트럭 운영자입니다.',
    '맛집 운영하다 트럭으로 전향했어요.',
    '주말마다 한강·공원 위주로 다닙니다.',
    '직장 그만두고 시작한 인생 2막입니다.',
    'HACCP 인증 받은 위생 깐깐한 트럭이에요.',
    '부부가 함께 운영하는 가족 트럭입니다.',
    '대학가 점심 장사 위주로 합니다.',
    '아이돌 콘서트 케이터링도 다녀요.',
    '직접 만든 소스가 시그니처입니다.',
    '전국 페스티벌만 골라 다니는 베테랑이에요.',
];

/* ─── 페르소나 생성 ─── */
function makeHandmadePersona(i) {
    const name = koreanName();
    const product = pick(HM_PRODUCTS);
    const style = pick(HM_STYLES);
    const brand = `${pick(HM_BRAND_WORDS)}${pick(HM_BRAND_WORDS)}`;
    const story = pick(HM_STORIES);
    return {
        id: uuid('e1000000', i),
        email: `seller${i}_${rand(100, 9999)}@flit-mock.test`,
        name,
        sellerType: 'seller',
        brand_name: brand,
        real_name: name,
        phone: `010-${rand(1000, 9999)}-${rand(1000, 9999)}`,
        products: product,
        promo_link: `https://instagram.com/${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}_${rand(10, 99)}`,
        organizer_name: null,
        organizer_desc: null,
        story,
        style,
    };
}

function makeFoodtruckPersona(i) {
    const name = koreanName();
    const menu = pick(FT_MENUS);
    const truck = `${pick(FT_TRUCK_WORDS)}${pick(FT_TRUCK_WORDS)}`;
    const story = pick(FT_STORIES);
    return {
        id: uuid('e2000000', i),
        email: `truck${i}_${rand(100, 9999)}@flit-mock.test`,
        name,
        sellerType: 'foodtruck',
        brand_name: truck,
        real_name: name,
        phone: `010-${rand(1000, 9999)}-${rand(1000, 9999)}`,
        products: menu,
        promo_link: `https://instagram.com/${truck.toLowerCase().replace(/[^a-z0-9]/g, '')}_truck`,
        organizer_name: null,
        organizer_desc: null,
        story,
    };
}

/* ─── 게시글 템플릿 (페르소나 정보가 자연스럽게 녹음) ─── */
const HM_POST_TEMPLATES = [
    { cat: '자유게시판', title: '{brand} 신상 컬렉션 나왔어요!', content: '{product} 작가입니다. 이번엔 {style} 스타일로 새 컬렉션 작업했어요. 인스타 들러주세요 :)' },
    { cat: '자유게시판', title: '{product} 셀러분들 디피 어떻게 하세요?', content: '{brand}이라는 작은 브랜드 운영 중이에요. {style} 분위기로 디피하려는데 팁 있으면 공유해주세요!' },
    { cat: '자유게시판', title: '플리마켓 첫 참가 후기', content: '저는 {product} 만드는 {brand}예요. {story} 첫 마켓 참가했는데 정말 떨렸어요. 그래도 단골손님 한 분 생겨서 행복합니다.' },
    { cat: '자유게시판', title: '{product} 재료 어디서 구매하시나요?', content: '온라인으로만 사다가 오프라인 도매상도 가보고 싶은데 추천 부탁드려요. 서울 기준이면 더 좋아요!' },
    { cat: '자유게시판', title: '브랜드 네이밍 고민 중이에요', content: '지금 {brand}로 활동 중인데 좀 더 컨셉이 명확한 이름으로 바꿀까 고민입니다. 다들 어떻게 정하셨나요?' },
    { cat: '자유게시판', title: '인스타 운영 팁 공유해요', content: '{product} 작가입니다. 인스타 1년 운영하면서 느낀 점 정리했어요. 1) 같은 시간 업로드 2) 해시태그 30개 풀로 3) 릴스 활용...' },
    { cat: '자유게시판', title: '카드 단말기 뭐 쓰세요?', content: '{brand}입니다. 토스, 페이코, KIS 비교 중인데 수수료랑 사용감 어떤가요?' },
    { cat: '자유게시판', title: '포장재 단가 비교해봤어요', content: '{product} 포장용 크래프트 봉투, 스티커, 끈 등 단가 비교 정리. 대량 구매하면 30% 절감 가능해요.' },
    { cat: '익명', title: '솔직히 부스비 너무 비싸요', content: '{product} 작가인데 부스비 빼면 거의 안 남아요. 다들 어떻게 버티세요?' },
    { cat: '익명', title: '비슷한 품목 옆 부스 스트레스', content: '{product} 셀러인데 늘 비슷한 카테고리 옆에 배치되네요. 가격 경쟁 너무 힘들어요.' },
    { cat: '익명', title: '주최사에 항의해도 답이 없어요', content: '자리 변경 요청드렸는데 무시당했어요. 이런 경우 어디에 문의하나요?' },
    { cat: '실시간 행사 현황', title: '[현장] {location} 마켓 분위기 좋아요', content: '{brand} 부스 운영 중! 사람 많고 분위기 최고예요. {product} 인기 폭발!' },
    { cat: '행사 양도/양수', title: '[양도] 이번 주말 자리 양도합니다', content: '{brand}({product}) 이번 주말 {location} 마켓 자리 양도해요. 부스비 그대로. DM 주세요.' },
];

const FT_POST_TEMPLATES = [
    { cat: '자유게시판', title: '{truck} 이번 주 일정 공유', content: '{menu} 트럭 {truck}입니다. 이번 주는 한강공원 → 코엑스 → 일산 호수공원 순으로 다녀요!' },
    { cat: '자유게시판', title: '푸드트럭 창업 비용 현실', content: '{truck} 운영자입니다. {story} 창업할 때 트럭 2500만, 개조 800만, 장비 500만 들었어요. 월 순수익 150~250만 정도.' },
    { cat: '자유게시판', title: '{menu} 트럭인데 위치 추천 받습니다', content: '{truck}입니다. 평일 점심 위치 추천해주세요. 직장인 많은 곳 선호!' },
    { cat: '자유게시판', title: '여름 야외 행사 생존 키트', content: '{truck} 운영자가 추천하는 여름 필수템: 미니 선풍기, 얼음 텀블러, 쿨타올, 모기 스프레이, 양산. 체력 관리가 진짜 중요해요.' },
    { cat: '자유게시판', title: '전기/수도 미연결 행사 어떻게 하세요?', content: '{menu} 트럭이라 전기 필수인데 가끔 미연결 행사 있어요. 자체 발전기 추천 부탁드려요.' },
    { cat: '자유게시판', title: 'HACCP 인증 받았어요!', content: '{truck} 6개월 준비 끝에 인증 통과! 위생 관리 빡세지만 받고 나니 신뢰도가 확실히 올라가네요.' },
    { cat: '자유게시판', title: '{menu} 시그니처 메뉴 자랑', content: '{truck} 시그니처 {menu}예요. 직접 만든 소스가 포인트입니다. 한번 드셔보세요!' },
    { cat: '자유게시판', title: '주말 행사 매출 후기', content: '{truck} 주말 매출 공유: 토요일 80만, 일요일 95만. {menu} 단가 7천원 기준이에요.' },
    { cat: '익명', title: '주최사 자리 배정 너무 불공정', content: '{menu} 트럭인데 늘 외진 자리만 받아요. 어떻게 항의해야 할지...' },
    { cat: '익명', title: '폐기물 처리 너무 힘들어요', content: '{menu} 운영하면 폐유 폐기물 많이 나오는데 행사장에 처리 시설이 없어서 매번 가져와요.' },
    { cat: '실시간 행사 현황', title: '[현장] {location} 트럭존 분위기', content: '{truck}({menu}) 부스 운영 중! 줄 길어요. 점심시간 피크 폭발!' },
    { cat: '행사 양도/양수', title: '[양도] 다음 주 트럭존 자리', content: '{truck}({menu}) 다음 주 {location} 푸드트럭존 자리 양도합니다. 일정 겹쳐서요. 참가비 그대로.' },
];

const HM_LOCATIONS = ['한강공원', '성수', '홍대', '코엑스', '판교', '잠실', '여의도', '뚝섬'];
const FT_LOCATIONS = ['한강공원', '여의도', '코엑스', '판교 테크노밸리', '대학로', '경리단길', '월드컵공원'];

/* ─── 댓글 템플릿 (카테고리/타입별) ─── */
const COMMENTS_GENERIC = [
    '저도 같은 고민이에요!', '완전 공감 100%', '정보 감사합니다 👍', '저도 알려주세요!',
    '도움 많이 됐어요', '오 좋네요', '저도 해보고 싶어요', '오 처음 알았네요',
    '저장해놓고 두고두고 봐야겠어요', '고생 많으셨어요', '이거 진짜 꿀팁이네요',
    '저는 좀 다르게 하는데 한번 시도해볼게요', '솔직한 후기 좋아요', '응원합니다 💪',
    '경험담 감사해요', '저도 작년에 비슷한 경험 했어요', '글 잘 봤습니다',
];

const COMMENTS_HANDMADE = [
    '브랜드 컨셉 너무 예쁘네요 ☺', '인스타 팔로우했어요!', '저도 같은 카테고리인데 화이팅해요',
    '디피 사진 한번 볼 수 있을까요?', '재료 어디서 사세요?', '이 가격대면 적정한가요?',
    '저는 부스비 빼면 거의 안 남더라고요...', '클래스도 한다고 하시던데 후기 어떤가요?',
    '저도 손으로 다 만들어요 응원합니다', '비슷한 작가님 만나서 반가워요',
];

const COMMENTS_FOODTRUCK = [
    '메뉴 구성 좋네요!', '단가가 어느 정도세요?', '저도 트럭 운영하는데 동지네요 😊',
    '직접 만든 소스가 시그니처라니 멋있어요', 'HACCP 부럽습니다 저도 준비 중이에요',
    '발전기 추천 부탁드려요', '폐기물 처리 어떻게 하세요?', '주말 매출 부럽네요',
    '대학가 점심 장사 얼마 정도 나오세요?', '이번 주말 같은 행사 가요!',
];

const COMMENTS_TRANSFER = [
    'DM 드릴게요!', '아직 양도 가능한가요?', '연락드렸어요 확인 부탁드려요',
    '저도 관심 있어요!', '카톡으로 연락주세요', '인스타로 연락드릴게요',
];

const COMMENTS_LIVE = [
    '저도 지금 가는 중이에요!', '날씨가 좋아서 부럽네요', '매출 대박나세요!',
    '사진 올려주세요 ㅎㅎ', '저는 다음 주에 가요', '지금 어디 부스세요?',
];

const COMMENTS_ANON = [
    '저도 솔직히 그래요...', '익명이라 말하는데 진짜 공감', '저만 그런 줄 알았어요',
    '비슷한 일 겪었어요', '용기 내서 글 써주셔서 감사해요', '주최사 어디인지 DM 가능?',
];

function pickComments(post, n) {
    const cat = post.cat;
    let pool = [...COMMENTS_GENERIC];
    if (cat === '익명') pool = [...COMMENTS_ANON, ...COMMENTS_GENERIC];
    else if (cat === '실시간 행사 현황') pool = [...COMMENTS_LIVE, ...COMMENTS_GENERIC];
    else if (cat === '행사 양도/양수') pool = [...COMMENTS_TRANSFER, ...COMMENTS_GENERIC];
    else if (post.sellerType === 'seller') pool = [...COMMENTS_HANDMADE, ...COMMENTS_GENERIC];
    else pool = [...COMMENTS_FOODTRUCK, ...COMMENTS_GENERIC];
    return shuffle(pool).slice(0, n);
}

function fillTemplate(tmpl, persona) {
    return tmpl
        .replace(/\{brand\}/g, persona.brand_name)
        .replace(/\{truck\}/g, persona.brand_name)
        .replace(/\{product\}/g, persona.products)
        .replace(/\{menu\}/g, persona.products)
        .replace(/\{style\}/g, persona.style || '')
        .replace(/\{story\}/g, persona.story || '')
        .replace(/\{location\}/g, pick(persona.sellerType === 'foodtruck' ? FT_LOCATIONS : HM_LOCATIONS));
}

/* ─── SQL 생성 ─── */
function generateSQL() {
    let sql = `-- ═══════════════════════════════════════════════════════════
-- FLIT 페르소나 목데이터 (200명 + 게시글)
-- 일반 핸드메이드 셀러 100 + 푸드트럭 셀러 100
-- 페르소나 정보가 녹은 가짜 게시글 ~250개
-- 모두 is_mock = true 로 마킹 → 어드민에서 일괄 삭제 가능
-- ═══════════════════════════════════════════════════════════

-- 기존 mock 페르소나 + 글 + 댓글 삭제 (재실행 안전)
DELETE FROM public.post_comments WHERE user_id IN (SELECT id FROM public.profiles WHERE id::text LIKE 'e1%' OR id::text LIKE 'e2%');
DELETE FROM public.posts WHERE user_id IN (SELECT id FROM public.profiles WHERE id::text LIKE 'e1%' OR id::text LIKE 'e2%');
DELETE FROM public.profiles WHERE id::text LIKE 'e1%' OR id::text LIKE 'e2%';
DELETE FROM auth.users WHERE id::text LIKE 'e1%' OR id::text LIKE 'e2%';

`;

    // 1) 페르소나 200명 생성
    const personas = [];
    for (let i = 1; i <= 100; i++) personas.push(makeHandmadePersona(i));
    for (let i = 1; i <= 100; i++) personas.push(makeFoodtruckPersona(i));

    // 2) auth.users + profiles INSERT
    sql += `-- ── auth.users (200명) ──\n`;
    personas.forEach(p => {
        sql += `INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('${p.id}', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '${p.email}', '$2a$10$mockmockmockmockmockmockmockmockmockmockmockmockmockmo', NOW(), '{"full_name":"${esc(p.name)}","name":"${esc(p.name)}"}', ${randDate(120)}, NOW(), '', '') ON CONFLICT (id) DO NOTHING;\n`;
    });

    sql += `\n-- ── profiles 페르소나 정보 채우기 (트리거가 row 생성, UPDATE로 페르소나 부여) ──\n-- 페르소나는 id 패턴 'e1%'/'e2%'로 식별 → 일괄 삭제 가능 (profiles에 is_mock 컬럼 없음)\n`;
    personas.forEach(p => {
        sql += `UPDATE public.profiles SET ` +
            `name = ${sqlStr(p.name)}, ` +
            `seller_type = '${p.sellerType}', ` +
            `brand_name = ${sqlStr(p.brand_name)}, ` +
            `real_name = ${sqlStr(p.real_name)}, ` +
            `phone = ${sqlStr(p.phone)}, ` +
            `products = ${sqlStr(p.products)}, ` +
            `promo_link = ${sqlStr(p.promo_link)} ` +
            `WHERE id = '${p.id}';\n`;
    });

    // 3) 게시글 — 페르소나마다 1~2개씩 (id 명시 → 댓글 참조 가능)
    sql += `\n-- ── 페르소나별 게시글 (~250개) ──\n`;
    const allPosts = [];
    let postCount = 0;
    personas.forEach(p => {
        const templates = p.sellerType === 'seller' ? HM_POST_TEMPLATES : FT_POST_TEMPLATES;
        const numPosts = rand(1, 2);
        const picked = shuffle(templates).slice(0, numPosts);
        picked.forEach(tmpl => {
            postCount++;
            const postId = uuid('f1000000', postCount);
            const title = fillTemplate(tmpl.title, p);
            const content = fillTemplate(tmpl.content, p);
            const isAnon = tmpl.cat === '익명';
            const author = isAnon ? 'NULL' : sqlStr(p.name);
            sql += `INSERT INTO public.posts (id, user_id, title, content, category, seller_type, author, is_anonymous, anonymous_name, likes, is_mock, created_at) VALUES ('${postId}', '${p.id}', ${sqlStr(title)}, ${sqlStr(content)}, '${tmpl.cat}', '${p.sellerType}', ${author}, ${isAnon}, ${isAnon ? sqlStr('익명' + rand(1, 999)) : 'NULL'}, ${rand(0, 80)}, true, ${randDate(60)});\n`;
            allPosts.push({ id: postId, ownerId: p.id, cat: tmpl.cat, sellerType: p.sellerType });
        });
    });

    // 4) 댓글 — 게시글마다 0~5개 (자기 글 제외, 페르소나 랜덤)
    sql += `\n-- ── 페르소나가 다는 댓글 ──\n`;
    let commentCount = 0;
    allPosts.forEach(post => {
        const numComments = rand(0, 5);
        if (numComments === 0) return;
        const commenters = shuffle(personas.filter(p => p.id !== post.ownerId)).slice(0, numComments);
        const contents = pickComments(post, numComments);
        commenters.forEach((commenter, idx) => {
            const text = contents[idx] || pick(COMMENTS_GENERIC);
            const isAnon = post.cat === '익명' || Math.random() < 0.25;
            const author = isAnon ? 'NULL' : sqlStr(commenter.name);
            const anonName = isAnon ? sqlStr('익명' + rand(1, 999)) : 'NULL';
            sql += `INSERT INTO public.post_comments (post_id, user_id, content, author, is_anonymous, anonymous_name, is_mock, created_at) VALUES ('${post.id}', '${commenter.id}', ${sqlStr(text)}, ${author}, ${isAnon}, ${anonName}, true, ${randDate(60)});\n`;
            commentCount++;
        });
    });

    sql += `\n-- 완료\n-- 페르소나: ${personas.length} (핸드메이드 100 + 푸드트럭 100)\n-- 게시글: ${postCount}\n-- 댓글: ${commentCount}\n`;

    const outDir = path.join(__dirname, '..', 'supabase_migrations');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, 'seed_personas.sql');
    fs.writeFileSync(outPath, sql, 'utf-8');
    console.log(`✅ 생성 완료: ${outPath}`);
    console.log(`   페르소나: ${personas.length} (셀러 100 + 푸드트럭 100)`);
    console.log(`   게시글: ${postCount}`);
    console.log(`   댓글: ${commentCount}`);
}

generateSQL();
