import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

async function isAdmin() {
  const session = cookies().get('auth_session');
  if (!session) return false;
  const user = JSON.parse(session.value);
  return user.role === 'ADMIN' || user.role === 'EDITOR';
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const where = category ? { category } : {};
    const media = await prisma.media.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy dữ liệu thư viện' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Không có quyền' }, { status: 403 });
  
  try {
    const data = await request.json();
    const media = await prisma.media.create({ data });
    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi thêm vào thư viện' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Không có quyền' }, { status: 403 });
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 });

    await prisma.media.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi xóa' }, { status: 500 });
  }
}
