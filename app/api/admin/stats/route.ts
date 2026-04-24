import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const totalMembers = await prisma.person.count();
    
    const generations = await prisma.person.findMany({
      select: { generation: true },
      distinct: ['generation'],
    });

    const recentUpdates = await prisma.person.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({
      totalMembers,
      totalGenerations: generations.length,
      recentUpdates
    });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy thống kê' }, { status: 500 });
  }
}
