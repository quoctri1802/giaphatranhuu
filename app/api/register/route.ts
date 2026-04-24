import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { fullName, email, phone, message } = await request.json();
    const registration = await prisma.registration.create({
      data: { fullName, email, phone, message }
    });
    return NextResponse.json(registration);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi gửi đăng ký' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(registrations);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy danh sách đăng ký' }, { status: 500 });
  }
}
