import { NextResponse } from 'next/server';
import { createSessionToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, rememberMe } = body || {};

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.' },
        { status: 400 }
      );
    }

    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPwd = process.env.ADMIN_PASSWORD || 'password123';

    // Verify credentials
    if (username.trim() !== adminUser || password !== adminPwd) {
      return NextResponse.json(
        { success: false, error: 'Tên đăng nhập hoặc mật khẩu không chính xác.' },
        { status: 401 }
      );
    }

    // Create cryptographically signed session token
    const token = await createSessionToken(adminUser);
    
    // 30 days if rememberMe, otherwise 1 day
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;

    const response = NextResponse.json({
      success: true,
      message: 'Đăng nhập thành công',
      user: { username: adminUser },
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Có lỗi xảy ra trong quá trình đăng nhập.' },
      { status: 500 }
    );
  }
}
