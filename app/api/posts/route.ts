import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

async function getUserId() {
  const session = cookies().get('auth_session');
  if (!session) return null;
  return JSON.parse(session.value).id;
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
      data: { 
        title, 
        content, 
        excerpt, 
        coverImage, 
        authorId: userId 
      }
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Lỗi khi tạo bài viết' }, { status: 500 });
  }
}
