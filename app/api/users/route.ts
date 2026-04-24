import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

async function isAdmin() {
  const session = cookies().get('auth_session');
  if (!session) return false;
  const user = JSON.parse(session.value);
  return user.role === 'ADMIN';
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Không có quyền' }, { status: 403 });
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy danh sách user' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Không có quyền' }, { status: 403 });
  try {
    const { email, password, name, role } = await request.json();
    const user = await prisma.user.create({ data: { email, password, name, role } });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi tạo user' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Không có quyền' }, { status: 403 });
  try {
    const { id, email, name, role, password } = await request.json();
    const data: any = { email, name, role };
    if (password) data.password = password;
    
    const user = await prisma.user.update({
      where: { id },
      data
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi cập nhật user' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Không có quyền' }, { status: 403 });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 });

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi xóa user' }, { status: 500 });
  }
}
