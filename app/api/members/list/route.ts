import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const members = await prisma.person.findMany({
      orderBy: {
        generation: 'asc',
      }
    });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy danh sách' }, { status: 500 });
  }
}
