// Updated middleware.ts - More lenient approach
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  try {
    // Try to get session, but don't fail if it's not immediately available
    const { data: { session } } = await supabase.auth.getSession()

    const isLoginPage = request.nextUrl.pathname === '/login'
    const isDashboardPage = request.nextUrl.pathname.startsWith('/(dashboard)')

    // Only redirect FROM login TO (dashboard) if we're sure there's a session
    if (session && isLoginPage) {
      console.log('🛡️ Middleware: Redirecting authenticated user to (dashboard)')
      return NextResponse.redirect(new URL('/(dashboard)', request.url))
    }

    // For (dashboard) pages, let them through and let client-side handle protection
    // This prevents the middleware from incorrectly blocking authenticated users
    if (isDashboardPage) {
      console.log('🛡️ Middleware: Allowing (dashboard) access, client-side will handle auth check')
      return res
    }

    return res

  } catch (error) {
    console.error('🛡️ Middleware: Error occurred, allowing request:', error)
    return res
  }
}

export const config = {
  matcher: [
    '/login',
    // Note: Only protecting login page in middleware, (dashboard) protection is client-side
  ],
}