import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // 로그인 후 이동할 대상 (기본값은 홈)
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // 쿠키 세션을 성공적으로 고정시키고 next 주소로 리다이렉트 (서버 처리)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // 에러 발생 시 로그인 페이지로 복귀, 알림 전달
  return NextResponse.redirect(`${origin}/login?message=auth-failed`)
}
