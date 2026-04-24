import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

async function getUserId() {
  const session = cookies().get('auth_session');
  if (!session) return null;
  try {
    return JSON.parse(session.value).id;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy bài viết' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });

  try {
    const body = await request.json();
    const { title, content, excerpt, coverImage } = body;
    const post = await prisma.post.create({
      data: { title, content, excerpt, coverImage, authorId: userId }
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi tạo' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, title, content, excerpt, coverImage } = body;
    const post = await prisma.post.update({
      where: { id },
      data: { title, content, excerpt, coverImage }
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi cập nhật' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 });

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi xóa' }, { status: 500 });
  }
}
