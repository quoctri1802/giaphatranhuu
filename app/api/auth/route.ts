import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Trong thực tế sẽ dùng bcrypt để kiểm tra mật khẩu
    // Ở đây tôi làm demo với một User admin cố định hoặc tìm trong DB
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && user.password === password) {
      cookies().set('auth_session', JSON.stringify({ id: user.id, role: user.role }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 ngày
        path: '/',
      });
      return NextResponse.json({ success: true, role: user.role });
    }

    return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}

export async function DELETE() {
  cookies().delete('auth_session');
  return NextResponse.json({ success: true });
}
