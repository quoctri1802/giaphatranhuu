import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

async function canEdit() {
  const session = cookies().get('auth_session');
  if (!session) return false;
  const user = JSON.parse(session.value);
  return user.role === 'ADMIN' || user.role === 'EDITOR';
}

export async function PUT(request: Request) {
  if (!await canEdit()) return NextResponse.json({ error: 'Không có quyền' }, { status: 403 });

  try {
    const { id, posX, posY } = await request.json();
    await prisma.person.update({
      where: { id },
      data: { posX, posY }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lưu vị trí' }, { status: 500 });
  }
}
