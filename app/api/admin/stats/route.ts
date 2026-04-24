import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  if (!process.env.DATABASE_URL || process.env.NODE_ENV === 'production' && !process.env.VERCEL_URL) {
    // Trả về dữ liệu mẫu nếu đang trong quá trình build mà không có DB
    return NextResponse.json({ totalMembers: 0, totalGenerations: 0, recentUpdates: [] });
  }
  
  try {
    const totalMembers = await prisma.person.count();
    
    // Đếm số đời bằng cách lấy max generation
    const maxGen = await prisma.person.aggregate({
      _max: { generation: true }
    });

    const recentUpdates = await prisma.person.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
    });

    const anniversaries = await prisma.anniversary.findMany({
      select: { id: true, title: true, dateLunar: true },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      totalMembers,
      totalGenerations: maxGen._max.generation || 0,
      recentUpdates,
      anniversaries
    });
  } catch (error) {
    console.error('Build-time DB skip or error:', error);
    return NextResponse.json({ totalMembers: 0, totalGenerations: 0, recentUpdates: [] });
  }
}
