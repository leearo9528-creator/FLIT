import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // 신규 유저 여부 확인 (seller_type 미설정)
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('seller_type')
          .eq('id', user.id)
          .single()

        if (!profile?.seller_type) {
          return NextResponse.redirect(new URL('/onboarding', request.url))
        }
      }

      return NextResponse.redirect(new URL(next, request.url))
    } else {
      return NextResponse.redirect(`${origin}/login?message=${encodeURIComponent(error.message)}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?message=no-code-found`)
}
