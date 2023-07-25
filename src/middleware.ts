import { NextRequest, NextResponse } from 'next/server'
import { APP_ROUTES } from './constants/app-routes'

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value

  const loginInUrl = new URL(APP_ROUTES.public.login, request.url)
  const dashboardInUrl = new URL(APP_ROUTES.private.dashboard, request.url)

  if (!token) {
    if (
      request.nextUrl.pathname === APP_ROUTES.public.home ||
      request.nextUrl.pathname === APP_ROUTES.public.login ||
      request.nextUrl.pathname === APP_ROUTES.public.register
    ) {
      return NextResponse.next()
    }
    return NextResponse.redirect(loginInUrl)
  }

  if (
    request.nextUrl.pathname === APP_ROUTES.public.home ||
    request.nextUrl.pathname === APP_ROUTES.public.login ||
    request.nextUrl.pathname === APP_ROUTES.public.register
  ) {
    return NextResponse.redirect(dashboardInUrl)
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/auth/:path*', '/dashboard/:path*'],
}
