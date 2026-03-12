import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request) {
  // 쿠키 기반 서버 인증 세션을 새로고침 & 유지
  return await updateSession(request)
}

// 서버 미들웨어가 적용될 라우터 규칙
export const config = {
  matcher: [
    /*
     * 다음 경로들을 제외한 모든 경로에서 미들웨어 실행:
     * - _next/static (빌드 정적 파일)
     * - _next/image (이미지 최적화 처리)
     * - favicon.ico, .svg, .png 등 각종 파일들
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
