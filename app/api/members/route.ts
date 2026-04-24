import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Database URL not configured' }, { status: 500 });
  }
  try {
    const members = await prisma.person.findMany({
      include: {
        children: true,
        parents: true,
        spouses: true,
      }
    });

    const nodes: any[] = [];
    const edges: any[] = [];
    const processedSpouses = new Set();

    members.forEach((member) => {
      // Xác định vị trí X: Nếu là vợ/chồng thì đẩy sang phải một chút
      const isSpouse = members.some(m => m.spouses.some(s => s.id === member.id) && m.generation === member.generation && m.id < member.id);
      const xOffset = isSpouse ? 200 : 0;
      
      const position = { 
        x: member.posX !== null ? member.posX : (Math.random() * 100) + xOffset, 
        y: member.posY !== null ? member.posY : (member.generation - 1) * 180 
      };

      nodes.push({
        id: member.id,
        data: { label: `${member.fullName} (Đời ${member.generation})` },
        position,
        style: { 
          background: member.gender === 'NỮ' ? '#fff1f2' : (member.generation === 1 ? 'var(--primary-color)' : 'white'), 
          color: (member.generation === 1 && member.gender !== 'NỮ') ? 'white' : 'var(--text-primary)',
          border: `2px solid ${member.gender === 'NỮ' ? '#fb7185' : (member.generation === 1 ? 'var(--secondary-color)' : 'var(--accent-color)')}`,
          borderRadius: '12px',
          padding: '10px',
          width: 180,
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        },
      });

      // Kết nối Cha Mẹ -> Con
      member.children.forEach((child) => {
        edges.push({
          id: `e${member.id}-${child.id}`,
          source: member.id,
          target: child.id,
          animated: true,
          style: { stroke: 'var(--secondary-color)', strokeWidth: 2 },
        });
      });

      // Kết nối Vợ -> Chồng
      member.spouses.forEach((spouse) => {
        const edgeId = [member.id, spouse.id].sort().join('-');
        if (!processedSpouses.has(edgeId)) {
          edges.push({
            id: `s-${edgeId}`,
            source: member.id,
            target: spouse.id,
            animated: false,
            style: { stroke: '#fb7185', strokeWidth: 3, strokeDasharray: '5 5' },
            label: 'Vợ Chồng',
            labelStyle: { fill: '#fb7185', fontWeight: 700, fontSize: 10 }
          });
          processedSpouses.add(edgeId);
        }
      });
    });

    return NextResponse.json({ nodes, edges });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Lỗi khi tải dữ liệu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, otherName, gender, generation, branch, bio, parentId, spouseId } = body;

    const newMember = await prisma.person.create({
      data: {
        fullName,
        otherName,
        gender,
        generation: parseInt(generation),
        branch,
        bio,
        parents: parentId ? { connect: { id: parentId } } : undefined,
        spouses: spouseId ? { connect: { id: spouseId } } : undefined,
      }
    });

    return NextResponse.json(newMember);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Lỗi khi thêm thành viên' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, fullName, otherName, gender, generation, branch, bio, parentId, spouseId, avatarUrl } = body;

    const updatedMember = await prisma.person.update({
      where: { id },
      data: {
        fullName,
        otherName,
        gender,
        generation: parseInt(generation),
        branch,
        bio,
        avatarUrl,
        parents: parentId ? { set: [{ id: parentId }] } : { set: [] },
        spouses: spouseId ? { set: [{ id: spouseId }] } : { set: [] },
      }
    });

    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Lỗi khi cập nhật thành viên' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 });

    await prisma.person.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Lỗi khi xóa thành viên' }, { status: 500 });
  }
}
