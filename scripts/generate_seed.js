/**
 * FLIT 대량 목데이터 SQL 생성 (v2 — 현재 구조 반영)
 * 실행: node scripts/generate_seed.js
 * 결과: supabase_migrations/seed_all.sql
 */
const fs = require('fs');
const path = require('path');

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function uuid(prefix, n) { return `${prefix}-0000-0000-0000-${String(n).padStart(12, '0')}`; }
function esc(s) { return s.replace(/'/g, "''"); }
function randDate(daysBack) { return `NOW() - interval '${rand(1, daysBack)} days'`; }

// ─── 한국 이름 ───
const LAST = ['김','이','박','최','정','강','조','윤','장','임','한','오','서','신','권','황','안','송','류','전'];
const FIRST = ['민준','서윤','하준','지우','도윤','서연','시우','하윤','예준','지유','주원','채원','지호','수아','현우','지윤','준서','다은','건우','수빈','유준','예은','지훈','소율','은우','소윤','서진','하은','도현','시은'];

// ─── 상수 (리뷰용) ───
const REVENUE_SELLER = ['0~20만','20~40만','40~60만','60~80만','80~100만','100~150만','150~200만','200만 이상'];
const REVENUE_TRUCK = ['0~30만','30~70만','70~100만','100~150만','150~200만','200~300만','300~400만','400~500만','500만 이상'];
const AGES = ['10대','20대','30대','40대','50대 이상','전 연령층'];
const VISITORS = ['가족 단위 (아이 동반)','커플 / 연인','친구 / 지인','나홀로 방문객 (혼쇼족)','관광객 / 외국인'];
const PROS_S = ['높은 집객력','높은 구매력','친절한 운영진','체계적인 행사 운영','넓은 부스 공간','적극적인 SNS 홍보','합리적인 참가비','좋은 접근성','다양한 셀러 구성','주차 편의'];
const CONS_S = ['비싼 부스비','홍보 부족','그늘 없음','운영 미흡','좁은 통로','주차 불편','좁은 부스 공간','주최사 소통 부재','불공정 자리 배정','불친절한 담당자'];
const PROS_T = ['높은 집객력','안정적 전력 공급','넓은 진입로','우수한 입지','충분한 공간','적극적인 홍보','합리적인 참가비','좋은 접근성','효율적 폐수처리','메뉴 보호 정책'];
const CONS_T = ['전압 불안정','좁은 진입로','폐기물 처리 불편','주최사 소통 부재','홍보 부족','비싼 참가비','그늘 없음','주차 불편','수도 미연결','불공정 자리배정'];
const REVIEW_CONTENTS = [
    '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.',
    '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!',
    '운영진이 친절하고 체계적이었어요.',
    '날씨가 좋아서 손님이 많았어요. 피크타임에 정신없이 팔았습니다.',
    '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.',
    '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요.',
    '홍보가 좀 더 됐으면 하는 아쉬움이 있어요.',
    '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.',
    '단골 손님도 생기고 인스타 팔로워도 늘었어요.',
    '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.',
    '아파트 단지라 동네 주민분들이 주로 오셔서 따뜻한 분위기였어요.',
    '해변 마켓이라 관광객이 많아서 외국인 손님도 꽤 있었어요.',
    'IT 직장인들이 점심시간에 몰려와서 3시간 만에 완판했어요.',
    '비건 마켓이라 타겟이 명확해서 구매 전환율이 높았어요.',
    '코엑스는 유동인구가 엄청나요. 부스비가 비싸지만 매출로 커버됩니다.',
];

// ─── 커뮤니티 ───
const CATEGORIES = ['자유게시판','익명','실시간 행사 현황','행사 양도/양수'];
const POST_DATA = {
    '자유게시판': [
        { t: '플리마켓 디피 꿀팁 공유해요', c: '디피할 때 높낮이 차이를 주면 시선이 잘 가요. 우드 박스로 단 만들고, 린넨 천 깔고, LED 스트링라이트 달면 분위기 확 달라져요!' },
        { t: '거스름돈 얼마나 준비하세요?', c: '다음 주 첫 플리마켓인데 거스름돈 준비가 고민이에요. 천원짜리 30장, 오천원짜리 10장이면 될까요?' },
        { t: '카드 결제 단말기 추천', c: '토스, 페이코, 키오스크 뭐가 좋을까요? 수수료도 비교해보고 싶어요.' },
        { t: '혼자 플리마켓 참가하시는 분?', c: '화장실 갈 때가 제일 곤란해요. 옆 부스 셀러분께 부탁하거나 잠깐 비우는데... 팁 있으신가요?' },
        { t: '여름 야외 마켓 생존 키트', c: '선크림, 미니 선풍기, 얼음물 텀블러, 양산, 쿨타올, 모기 퇴치 스프레이. 이것만 해도 생존 가능!' },
        { t: '포장재 어디서 구매하시나요?', c: '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천 부탁드려요.' },
        { t: '같이 참가할 파트너 구합니다', c: '서울/경기 플리마켓 같이 참가할 분! 부스비 반반, 판매도 번갈아가면서. 품목: 악세사리' },
        { t: 'SNS 마케팅 효과 있나요?', c: '인스타로 마켓 참가 소식 올리는데 실제 매출과 연결되는지 모르겠어요.' },
        { t: '셀러 명함 만드셨나요?', c: '인스타 QR코드 넣으면 좋다던데 어디서 인쇄하시나요?' },
        { t: '푸드트럭 창업 비용 현실', c: '트럭 2500만, 개조비 800만, 장비 500만. 월 순수익 150~200만 정도예요.' },
    ],
    '익명': [
        { t: '솔직히 플리마켓 수익 별로 아닌가요?', c: '3개월째인데 부스비 빼면 남는 게 별로... 다들 이 정도인가요?' },
        { t: '주최사 갑질 경험 있으신 분?', c: '당일 자리 변경하고 항의하니까 무시당했어요. 사전 공지도 없이...' },
        { t: '참가비 환불 안 해주는 주최사', c: '비가 와서 행사 취소됐는데 환불 불가라네요. 이게 맞나요?' },
        { t: '야시장에서 도난 당했어요', c: '잠깐 자리 비운 사이에 악세사리 세트가 통째로... 도난 방지 어떻게 하세요?' },
        { t: '같은 행사 셀러끼리 경쟁이 심해요', c: '비슷한 품목이 바로 옆에 배치되면 진짜 스트레스. 가격 경쟁도 하게 되고...' },
    ],
    '실시간 행사 현황': [
        { t: '[현장] 여의도 야시장 현재 상황', c: '날씨 좋아서 사람 엄청 많아요. 7시 기준 매출 이미 30만 돌파!' },
        { t: '[현장] 홍대 프리마켓 오늘 날씨 최고', c: '벚꽃 시즌이라 외국인 관광객도 많네요. 매출 기대됩니다!' },
        { t: '[현장] 성수 플리마켓 오픈 직후', c: '카페 갔다가 들르는 분들이 슬슬 오고 있어요. 신메뉴 캔들 반응 기대중!' },
        { t: '[현장] 해운대 선셋마켓 석양 미쳤다', c: '석양이 진짜 예술. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.' },
        { t: '[현장] 코엑스 팝업마켓 유동인구 미쳤음', c: '오후 2시 기준 매출 50만 넘었어요. 참가비 10만원 아깝지 않네요.' },
    ],
    '행사 양도/양수': [
        { t: '[양도] 성수 플리마켓 자리 양도합니다', c: '급한 일정으로 양도. 참가비 4만원 그대로. 좋은 위치에요.' },
        { t: '[양수] 여의도 야시장 자리 구합니다', c: '모집 마감되어서 못 들어갔어요. 양도하시는 분 연락 주세요!' },
        { t: '[양도] 홍대 프리마켓 2자리 양도', c: '2자리 함께 or 1자리만 가능. 참가비 3만원/자리.' },
        { t: '[양수] 제주 핸드메이드 페어 자리', c: '1일만이라도 괜찮아요. 도자기 판매 예정.' },
        { t: '[양도] 인천 송도 마켓 양도', c: '참가비 55,000원 그대로. 수변광장 B-7 자리.' },
    ],
};

function generateSQL() {
    let sql = `-- ═══════════════════════════════════════════════════════════
-- FLIT 전체 목데이터 (v2 — 현재 구조 반영)
-- 기존 데이터 전부 삭제 후 새로 생성
-- ═══════════════════════════════════════════════════════════

-- 1. 기존 데이터 삭제
TRUNCATE public.post_comments CASCADE;
TRUNCATE public.posts CASCADE;
TRUNCATE public.scraps CASCADE;
TRUNCATE public.reviews CASCADE;
TRUNCATE public.recruitments CASCADE;
TRUNCATE public.event_instances CASCADE;
TRUNCATE public.base_events CASCADE;
DELETE FROM public.organizers WHERE id::text LIKE 'a0%' OR id::text LIKE 'f1%';
DELETE FROM public.profiles WHERE id::text LIKE 'f0%' OR id::text LIKE 'f1%';
DELETE FROM auth.users WHERE id::text LIKE 'f0%' OR id::text LIKE 'f1%';

`;

    // ─── 주최사 10개 ───
    const orgs = [
        { id: uuid('a0000001', 1), name: '서울플리마켓협회', desc: '서울 지역 플리마켓 기획 운영 전문 단체' },
        { id: uuid('a0000001', 2), name: '캡틴코리아', desc: '전국 아파트·대학교·지역축제 플리마켓 전문. 연간 200회 이상 운영' },
        { id: uuid('a0000001', 3), name: '한강문화재단', desc: '한강공원 문화행사 전문 기획사' },
        { id: uuid('a0000001', 4), name: '맛있는축제', desc: '전국 푸드트럭 페스티벌 전문' },
        { id: uuid('a0000001', 5), name: '마켓인서울', desc: '성수·홍대·이태원 핫플레이스 팝업마켓 전문' },
        { id: uuid('a0000001', 6), name: '플리플리', desc: '경기·인천 지역 아파트 단지 플리마켓 전문' },
        { id: uuid('a0000001', 7), name: '부산마켓클럽', desc: '부산·경남 해변·공원 플리마켓 전문' },
        { id: uuid('a0000001', 8), name: '제주핸드메이드', desc: '제주 수공예·핸드메이드 전문 마켓' },
        { id: uuid('a0000001', 9), name: '대전문화마켓', desc: '대전 복합문화행사·야시장 전문' },
        { id: uuid('a0000001', 10), name: '그린마켓코리아', desc: '친환경·비건·제로웨이스트 테마 플리마켓' },
    ];
    sql += `-- 주최사\n`;
    orgs.forEach(o => { sql += `INSERT INTO public.organizers (id, name, description) VALUES ('${o.id}', '${esc(o.name)}', '${esc(o.desc)}') ON CONFLICT (id) DO NOTHING;\n`; });

    // ─── 행사 15개 ───
    const events = [
        { id: uuid('b0000001', 1), name: '서울밤도깨비야시장', cat: '플리+푸드 전체' },
        { id: uuid('b0000001', 2), name: '홍대 프리마켓', cat: '플리마켓' },
        { id: uuid('b0000001', 3), name: '여의도 한강 푸드트럭 페스타', cat: '푸드트럭' },
        { id: uuid('b0000001', 4), name: '성수 플리마켓', cat: '플리마켓' },
        { id: uuid('b0000001', 5), name: '래미안아파트 주민 플리마켓', cat: '플리마켓' },
        { id: uuid('b0000001', 6), name: '해운대 선셋마켓', cat: '플리+푸드 전체' },
        { id: uuid('b0000001', 7), name: '대전 엑스포 야시장', cat: '푸드트럭' },
        { id: uuid('b0000001', 8), name: '제주 핸드메이드 페어', cat: '플리마켓' },
        { id: uuid('b0000001', 9), name: '판교 IT밸리 런치마켓', cat: '푸드트럭' },
        { id: uuid('b0000001', 10), name: '그린 비건마켓', cat: '플리마켓' },
        { id: uuid('b0000001', 11), name: '인천 송도 글로벌마켓', cat: '플리+푸드 전체' },
        { id: uuid('b0000001', 12), name: '수원 화성 야시장', cat: '푸드트럭' },
        { id: uuid('b0000001', 13), name: '강남 코엑스 팝업마켓', cat: '플리마켓' },
        { id: uuid('b0000001', 14), name: '일산 킨텍스 플리마켓', cat: '플리+푸드 전체' },
        { id: uuid('b0000001', 15), name: '광주 충장로 야시장', cat: '푸드트럭' },
    ];
    sql += `\n-- 행사\n`;
    events.forEach(e => { sql += `INSERT INTO public.base_events (id, name, category) VALUES ('${e.id}', '${esc(e.name)}', '${e.cat}') ON CONFLICT (id) DO NOTHING;\n`; });

    // ─── 행사 개최 20건 ───
    const instances = [
        { id: uuid('c0000001', 1), evtIdx: 0, orgIdx: 2, loc: '서울 영등포구 여의도 한강공원', sido: '서울', d: '2026-04-05', de: '2026-04-06' },
        { id: uuid('c0000001', 2), evtIdx: 0, orgIdx: 2, loc: '서울 중구 을지로7가 DDP 앞 광장', sido: '서울', d: '2026-04-12', de: '2026-04-13' },
        { id: uuid('c0000001', 3), evtIdx: 1, orgIdx: 0, loc: '서울 마포구 홍대 걷고싶은거리', sido: '서울', d: '2026-04-05', de: '2026-04-05' },
        { id: uuid('c0000001', 4), evtIdx: 1, orgIdx: 0, loc: '서울 마포구 홍대 걷고싶은거리', sido: '서울', d: '2026-04-12', de: '2026-04-12' },
        { id: uuid('c0000001', 5), evtIdx: 2, orgIdx: 3, loc: '서울 영등포구 여의도 한강공원 이벤트광장', sido: '서울', d: '2026-04-19', de: '2026-04-20' },
        { id: uuid('c0000001', 6), evtIdx: 3, orgIdx: 4, loc: '서울 성동구 성수동2가 뚝섬로', sido: '서울', d: '2026-04-06', de: '2026-04-06' },
        { id: uuid('c0000001', 7), evtIdx: 3, orgIdx: 4, loc: '서울 성동구 성수동2가 뚝섬로', sido: '서울', d: '2026-04-20', de: '2026-04-20' },
        { id: uuid('c0000001', 8), evtIdx: 4, orgIdx: 1, loc: '경기 수원시 영통구 래미안 중앙광장', sido: '경기', d: '2026-04-11', de: '2026-04-11' },
        { id: uuid('c0000001', 9), evtIdx: 4, orgIdx: 5, loc: '경기 고양시 일산서구 래미안 레이크타운', sido: '경기', d: '2026-04-18', de: '2026-04-18' },
        { id: uuid('c0000001', 10), evtIdx: 5, orgIdx: 6, loc: '부산 해운대구 해운대해변로', sido: '부산', d: '2026-04-12', de: '2026-04-13' },
        { id: uuid('c0000001', 11), evtIdx: 6, orgIdx: 8, loc: '대전 유성구 엑스포과학공원', sido: '대전', d: '2026-04-19', de: '2026-04-20' },
        { id: uuid('c0000001', 12), evtIdx: 7, orgIdx: 7, loc: '제주 제주시 탑동 해변 공원', sido: '제주', d: '2026-04-25', de: '2026-04-27' },
        { id: uuid('c0000001', 13), evtIdx: 8, orgIdx: 3, loc: '경기 성남시 분당구 판교 테크노밸리', sido: '경기', d: '2026-04-07', de: '2026-04-07' },
        { id: uuid('c0000001', 14), evtIdx: 9, orgIdx: 9, loc: '서울 용산구 이태원로 경리단길', sido: '서울', d: '2026-04-13', de: '2026-04-13' },
        { id: uuid('c0000001', 15), evtIdx: 10, orgIdx: 5, loc: '인천 연수구 송도동 센트럴파크', sido: '인천', d: '2026-04-19', de: '2026-04-20' },
        { id: uuid('c0000001', 16), evtIdx: 11, orgIdx: 8, loc: '경기 수원시 팔달구 화성행궁 광장', sido: '경기', d: '2026-04-26', de: '2026-04-27' },
        { id: uuid('c0000001', 17), evtIdx: 12, orgIdx: 4, loc: '서울 강남구 코엑스 B1 밀레니엄 광장', sido: '서울', d: '2026-04-10', de: '2026-04-12' },
        { id: uuid('c0000001', 18), evtIdx: 13, orgIdx: 5, loc: '경기 고양시 일산서구 킨텍스 야외광장', sido: '경기', d: '2026-05-03', de: '2026-05-04' },
        { id: uuid('c0000001', 19), evtIdx: 14, orgIdx: 8, loc: '광주 동구 충장로', sido: '광주', d: '2026-04-26', de: '2026-04-26' },
        { id: uuid('c0000001', 20), evtIdx: 2, orgIdx: 3, loc: '서울 영등포구 여의도 한강공원', sido: '서울', d: '2026-05-10', de: '2026-05-11' },
    ];
    sql += `\n-- 행사 개최\n`;
    instances.forEach(i => {
        sql += `INSERT INTO public.event_instances (id, base_event_id, organizer_id, location, location_sido, event_date, event_date_end) VALUES ('${i.id}', '${events[i.evtIdx].id}', '${orgs[i.orgIdx].id}', '${esc(i.loc)}', '${i.sido}', '${i.d}', '${i.de}');\n`;
    });

    // ─── 모집공고 15건 ───
    const recTitles = [
        { instIdx: 0, title: '서울밤도깨비야시장 셀러 모집', fee: 50000, method: '카카오톡 채널 서울야시장 문의' },
        { instIdx: 2, title: '홍대 프리마켓 셀러 모집 (50팀)', fee: 30000, method: '인스타 DM @hongdae_freemarket' },
        { instIdx: 4, title: '여의도 한강 푸드트럭 페스타 참가팀 모집', fee: 150000, method: '이메일 apply@foodfesta.kr' },
        { instIdx: 5, title: '성수 플리마켓 셀러 모집', fee: 40000, method: '구글폼 접수' },
        { instIdx: 7, title: '수원 래미안 아파트 플리마켓 셀러 모집', fee: 80000, method: '문자 신청: 010-3723-0879' },
        { instIdx: 9, title: '해운대 선셋마켓 셀러+푸드트럭 동시 모집', fee: 60000, method: '부산마켓클럽 카카오채널' },
        { instIdx: 10, title: '대전 엑스포 야시장 푸드트럭 모집', fee: 120000, method: '이메일 daejeon@market.kr' },
        { instIdx: 11, title: '제주 핸드메이드 페어 작가 모집', fee: 45000, method: '제주핸드메이드 홈페이지 접수' },
        { instIdx: 12, title: '판교 런치마켓 푸드트럭 모집', fee: 0, method: '맛있는축제 카카오채널' },
        { instIdx: 13, title: '경리단길 그린 비건마켓 셀러 모집', fee: 35000, method: '인스타 DM @green_vegan' },
        { instIdx: 14, title: '인천 송도 글로벌마켓 셀러 모집', fee: 55000, method: '플리플리 카카오채널' },
        { instIdx: 16, title: '코엑스 팝업마켓 프리미엄 셀러 모집', fee: 100000, method: 'apply@marketinseoul.kr' },
        { instIdx: 17, title: '일산 킨텍스 플리마켓 셀러 모집', fee: 45000, method: '플리플리 카카오채널' },
        { instIdx: 19, title: '여의도 푸드트럭 5월 참가팀 모집', fee: 150000, method: '이메일 apply@foodfesta.kr' },
        { instIdx: 3, title: '홍대 프리마켓 4/12 셀러 추가 모집', fee: 30000, method: '인스타 DM @hongdae_freemarket' },
    ];
    sql += `\n-- 모집공고\n`;
    recTitles.forEach((r, i) => {
        const content = `셀러를 모집합니다.\\n\\n■ 부스 규격: 2m x 2m\\n■ 운영 시간: 10:00 ~ 20:00\\n■ 포함: 테이블, 의자 제공`;
        sql += `INSERT INTO public.recruitments (id, event_instance_id, title, content, fee, application_method, end_date, status) VALUES ('${uuid('d0000001', i+1)}', '${instances[r.instIdx].id}', '${esc(r.title)}', '${content}', ${r.fee}, '${esc(r.method)}', '2026-04-${String(rand(1, 28)).padStart(2, '0')}', 'OPEN');\n`;
    });

    // ─── 유저 100명 ───
    const users = [];
    for (let i = 1; i <= 100; i++) {
        const name = `${pick(LAST)}${pick(FIRST)}`;
        const email = `user${i}_${rand(100, 999)}@test.com`;
        const sellerType = i <= 75 ? 'seller' : 'foodtruck';
        const reviewCount = rand(0, 4);
        users.push({ id: uuid('f1000000', i), email, name, sellerType, reviewCount });
    }
    sql += `\n-- 유저 100명\n`;
    users.forEach(u => {
        sql += `INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('${u.id}', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '${u.email}', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"${esc(u.name)}","name":"${esc(u.name)}"}', ${randDate(60)}, NOW(), '', '') ON CONFLICT (id) DO NOTHING;\n`;
    });
    sql += `\n`;
    users.forEach(u => {
        const hasReview = u.reviewCount > 0;
        sql += `UPDATE public.profiles SET seller_type = '${u.sellerType}', review_count = ${u.reviewCount}${hasReview ? `, last_review_at = ${randDate(7)}` : ''} WHERE id = '${u.id}';\n`;
    });

    // ─── 리뷰 ───
    sql += `\n-- 리뷰\n`;
    let reviewCount = 0;
    users.filter(u => u.reviewCount > 0).forEach(u => {
        for (let r = 0; r < u.reviewCount; r++) {
            const inst = pick(instances);
            const isTruck = u.sellerType === 'foodtruck';
            const rev = isTruck ? pick(REVENUE_TRUCK) : pick(REVENUE_SELLER);
            const ages = [...new Set([pick(AGES), pick(AGES)])];
            const vis = [pick(VISITORS)];
            const pros = [...new Set([pick(isTruck ? PROS_T : PROS_S), pick(isTruck ? PROS_T : PROS_S)])];
            const cons = [pick(isTruck ? CONS_T : CONS_S)];
            sql += `INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('${inst.id}', '${u.id}', '${u.sellerType}', ${rand(2,5)}, ${rand(2,5)}, ${rand(2,5)}, ${rand(2,5)}, ${rand(1,5)}, '${rev}', ARRAY[${ages.map(a=>`'${a}'`).join(',')}], ARRAY[${vis.map(v=>`'${esc(v)}'`).join(',')}], '${pros.join("'||E'\\n'||'")}', '${cons.join("'||E'\\n'||'")}', '${esc(pick(REVIEW_CONTENTS))}', ${randDate(30)});\n`;
            reviewCount++;
        }
    });

    // ─── 게시글 300개 ───
    sql += `\n-- 게시글 300개\n`;
    const catWeights = { '자유게시판': 150, '익명': 60, '실시간 행사 현황': 45, '행사 양도/양수': 45 };
    let postCount = 0;
    for (const [cat, count] of Object.entries(catWeights)) {
        const templates = POST_DATA[cat];
        for (let i = 0; i < count; i++) {
            const u = pick(users);
            const tmpl = templates[i % templates.length];
            const isAnon = cat === '익명';
            const suffix = i >= templates.length ? ` (${rand(1, 99)})` : '';
            sql += `INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('${u.id}', '${esc(tmpl.t + suffix)}', '${esc(tmpl.c)}', '${cat}', '${u.sellerType}', ${isAnon ? 'null' : `'${esc(u.name)}'`}, ${isAnon}, ${rand(0, 50)}, ${randDate(30)});\n`;
            postCount++;
        }
    }

    // ─── 통계 업데이트 ───
    sql += `
-- 통계 업데이트
UPDATE public.event_instances ei SET review_count = sub.cnt, avg_event_rating = sub.avg_r
FROM (SELECT event_instance_id, COUNT(*) as cnt, AVG((COALESCE(rating_profit,0)+COALESCE(rating_traffic,0)+COALESCE(rating_support,0)+COALESCE(rating_manners,0))/4.0) as avg_r FROM public.reviews GROUP BY event_instance_id) sub
WHERE ei.id = sub.event_instance_id;

UPDATE public.base_events be SET total_instances = (SELECT COUNT(*) FROM public.event_instances WHERE base_event_id = be.id),
total_reviews = COALESCE((SELECT COUNT(r.*) FROM public.reviews r JOIN public.event_instances ei ON ei.id = r.event_instance_id WHERE ei.base_event_id = be.id), 0),
avg_event_rating = COALESCE((SELECT AVG((COALESCE(r.rating_profit,0)+COALESCE(r.rating_traffic,0)+COALESCE(r.rating_support,0)+COALESCE(r.rating_manners,0))/4.0) FROM public.reviews r JOIN public.event_instances ei ON ei.id = r.event_instance_id WHERE ei.base_event_id = be.id), 0);

UPDATE public.organizers o SET total_instances = (SELECT COUNT(*) FROM public.event_instances WHERE organizer_id = o.id),
total_reviews = COALESCE((SELECT COUNT(r.*) FROM public.reviews r JOIN public.event_instances ei ON ei.id = r.event_instance_id WHERE ei.organizer_id = o.id), 0);
`;

    const outPath = path.join(__dirname, '..', 'supabase_migrations', 'seed_all.sql');
    fs.writeFileSync(outPath, sql, 'utf-8');
    console.log(`생성 완료: ${outPath}`);
    console.log(`주최사: ${orgs.length}, 행사: ${events.length}, 개최: ${instances.length}, 공고: ${recTitles.length}`);
    console.log(`유저: ${users.length}, 리뷰: ${reviewCount}, 게시글: ${postCount}`);
}

generateSQL();
