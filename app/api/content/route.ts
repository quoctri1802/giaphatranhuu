import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function canEdit() {
  if (!process.env.DATABASE_URL) return false;
  const session = cookies().get('auth_session');
  if (!session) return false;
  const user = JSON.parse(session.value);
  return user.role === 'ADMIN' || user.role === 'EDITOR';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  if (!page) return NextResponse.json({ error: 'Thiếu trang' }, { status: 400 });

  try {
    const content = await prisma.content.findUnique({ where: { page } });
    return NextResponse.json(content || { data: {} });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy nội dung' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!await canEdit()) return NextResponse.json({ error: 'Không có quyền' }, { status: 403 });

  try {
    const { page, data } = await request.json();
    const content = await prisma.content.upsert({
      where: { page },
      update: { data },
      create: { page, data }
    });
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lưu nội dung' }, { status: 500 });
  }
}
