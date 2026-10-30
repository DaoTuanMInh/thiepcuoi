import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from '@/lib/auth';

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const token = req.cookies.get('admin_token')?.value;
  const isAuthenticated = await verifySessionToken(token);

  // If already logged in and visiting /login, redirect directly to /admin
  if (url.pathname === '/login') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    return NextResponse.next();
  }

  // Protect /admin routes
  if (url.pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', req.url);
      if (url.pathname !== '/admin') {
        loginUrl.searchParams.set('redirect', url.pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Protect /api/guests routes
  if (url.pathname.startsWith('/api/guests')) {
    if (!isAuthenticated) {
      // Optional fallback: support basic auth header for API testing
      const basicAuth = req.headers.get('authorization');
      if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        if (authValue) {
          const [user, pwd] = atob(authValue).split(':');
          const adminUser = process.env.ADMIN_USER || 'admin';
          const adminPwd = process.env.ADMIN_PASSWORD || 'password123';
          if (user === adminUser && pwd === adminPwd) {
            return NextResponse.next();
          }
        }
      }

      return NextResponse.json(
        { success: false, error: 'Unauthorized. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/guests/:path*', '/login'],
};
