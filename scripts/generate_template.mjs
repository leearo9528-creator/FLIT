import * as XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, '../public/data_template.xlsx');

const wb = XLSX.utils.book_new();

/* ── 1_주최사 ── */
const orgHeaders = ['주최사명 *', '소개 (선택)', '로고 URL (선택)'];
const orgExample = [
    ['서울플리마켓협회', '서울 주요 플리마켓을 주최하는 협회입니다.', 'https://example.com/logo.png'],
    ['한강공원관리사업소', '', ''],
];
const orgWs = XLSX.utils.aoa_to_sheet([orgHeaders, ...orgExample]);
orgWs['!cols'] = [{ wch: 20 }, { wch: 40 }, { wch: 40 }];
XLSX.utils.book_append_sheet(wb, orgWs, '1_주최사');

/* ── 2_행사 ── */
const evtHeaders = ['행사명 *', '카테고리 *', '소개 (선택)', '이미지 URL (선택)'];
const evtExample = [
    ['서울밤도깨비야시장', '플리마켓', '서울 대표 야시장 플리마켓', ''],
    ['뚝섬 플리마켓', '플리+푸드', '', ''],
    ['한강 푸드트럭축제', '푸드트럭', '', ''],
];
// 카테고리 유효값: 플리마켓, 푸드트럭, 플리+푸드
const evtNote = XLSX.utils.aoa_to_sheet([
    ['※ 카테고리 유효값: 플리마켓 / 푸드트럭 / 플리+푸드'],
]);
const evtWs = XLSX.utils.aoa_to_sheet([evtHeaders, ...evtExample]);
evtWs['!cols'] = [{ wch: 24 }, { wch: 14 }, { wch: 40 }, { wch: 40 }];
XLSX.utils.book_append_sheet(wb, evtWs, '2_행사');

/* ── 3_행사개최 ── */
const instHeaders = ['행사명 *', '장소 *', '주최사명 *', '시/도 *', '시작일 *', '종료일'];
const instExample = [
    ['서울밤도깨비야시장', '여의도한강공원', '한강공원관리사업소', '서울', '2026-04-10', '2026-04-12'],
    ['뚝섬 플리마켓', '뚝섬한강공원', '서울플리마켓협회', '서울', '2026-04-18', '2026-04-19'],
];
const instWs = XLSX.utils.aoa_to_sheet([instHeaders, ...instExample]);
instWs['!cols'] = [{ wch: 24 }, { wch: 24 }, { wch: 20 }, { wch: 10 }, { wch: 14 }, { wch: 14 }];
XLSX.utils.book_append_sheet(wb, instWs, '3_행사개최');

/* ── 4_모집공고 ── */
const recHeaders = [
    '공고 제목 *', '공고 내용 *', '행사명 *',
    '참가비(원)', '신청 방법', '모집 시작일', '모집 마감일 *', '상태',
];
const recExample = [
    [
        '서울밤도깨비야시장 셀러 모집',
        '■ 모집조건\n핸드메이드 및 리빙 셀러\n\n■ 참가비\n부스당 50,000원',
        '서울밤도깨비야시장',
        50000,
        '구글폼 https://forms.google.com/xxx',
        '2026-03-25',
        '2026-04-05',
        'OPEN',
    ],
    [
        '뚝섬 플리마켓 셀러 모집',
        '■ 모집조건\n플리마켓 판매 가능한 모든 품목\n\n■ 참가비\n무료',
        '뚝섬 플리마켓',
        0,
        '네이버폼 링크',
        '2026-04-01',
        '2026-04-10',
        'OPEN',
    ],
];
// 상태 유효값: OPEN / CLOSED
const recWs = XLSX.utils.aoa_to_sheet([recHeaders, ...recExample]);
recWs['!cols'] = [
    { wch: 28 }, { wch: 50 }, { wch: 24 },
    { wch: 12 }, { wch: 30 }, { wch: 14 }, { wch: 14 }, { wch: 10 },
];
XLSX.utils.book_append_sheet(wb, recWs, '4_모집공고');

/* ── 안내 시트 ── */
const guideWs = XLSX.utils.aoa_to_sheet([
    ['FLIT 데이터 입력 양식 사용 안내'],
    [],
    ['📌 작성 순서'],
    ['1', '1_주최사 시트 → 주최사 정보 입력 (* 필수)'],
    ['2', '2_행사 시트 → 행사 브랜드 정보 입력'],
    ['3', '3_행사개최 시트 → 행사 개최 회차별 정보 입력'],
    ['4', '4_모집공고 시트 → 모집공고 정보 입력'],
    [],
    ['📌 주의사항'],
    ['·', '* 표시된 컬럼은 필수 입력값입니다.'],
    ['·', '3_행사개최의 행사명은 2_행사에 등록된 행사명과 동일해야 합니다.'],
    ['·', '3_행사개최의 주최사명은 1_주최사에 등록된 주최사명과 동일해야 합니다.'],
    ['·', '4_모집공고의 행사명은 3_행사개최에 등록된 행사명과 동일해야 합니다.'],
    ['·', '날짜는 YYYY-MM-DD 형식으로 입력하세요. 예) 2026-04-10'],
    ['·', '참가비는 숫자만 입력하세요 (원 단위). 무료인 경우 0 입력.'],
    ['·', '카테고리 유효값: 플리마켓 / 푸드트럭 / 플리+푸드'],
    ['·', '상태 유효값: OPEN (모집중) / CLOSED (마감)'],
    [],
    ['📌 버전'],
    ['v3', '2026-03-31 — 현재 DB 스키마 기준'],
]);
guideWs['!cols'] = [{ wch: 4 }, { wch: 70 }];
XLSX.utils.book_append_sheet(wb, guideWs, '0_안내');

// 안내 시트를 맨 앞으로
wb.SheetNames = ['0_안내', '1_주최사', '2_행사', '3_행사개최', '4_모집공고'];

XLSX.writeFile(wb, outputPath);
console.log('✅ data_template.xlsx 생성 완료:', outputPath);
