import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  const authSession = cookies().get('auth_session');
  
  if (!authSession) {
    return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
  }

  try {
    const session = JSON.parse(authSession.value);
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: 'Session không hợp lệ' }, { status: 401 });
  }
}
