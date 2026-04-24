import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const totalMembers = await prisma.person.count();
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
    return NextResponse.json({
      totalMembers: 0,
      totalGenerations: 0,
      recentUpdates: [],
      anniversaries: []
    });
  }
}
