import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

async function isAdmin() {
  const session = cookies().get('auth_session');
  if (!session) return false;
  try {
    const user = JSON.parse(session.value);
    return user.role === 'ADMIN' || user.role === 'EDITOR';
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const data = await prisma.anniversary.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy lịch giỗ' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Không có quyền' }, { status: 403 });
  
  try {
    const { title, dateLunar, note } = await request.json();
    const data = await prisma.anniversary.create({
      data: { title, dateLunar, note }
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi thêm ngày giỗ' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Không có quyền' }, { status: 403 });
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 });

    await prisma.anniversary.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi xóa' }, { status: 500 });
  }
}
