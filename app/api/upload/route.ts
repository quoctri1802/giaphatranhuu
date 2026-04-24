import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy tệp tin' }, { status: 400 });
    }

    // KIỂM TRA NẾU ĐANG CHẠY TRÊN VERCEL (Có token Blob)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(file.name, file, {
        access: 'public',
      });
      return NextResponse.json({ url: blob.url });
    } 
    
    // NẾU CHẠY LOCAL (Máy cá nhân)
    else {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {}
      
      // Sử dụng randomUUID() có sẵn trong Node.js crypto
      const uniqueName = `${randomUUID()}-${file.name}`;
      const path = join(uploadDir, uniqueName);
      await writeFile(path, buffer);
      return NextResponse.json({ url: `/uploads/${uniqueName}` });
    }
  } catch (error) {
    console.error('Lỗi upload:', error);
    return NextResponse.json({ error: 'Lỗi khi tải ảnh lên' }, { status: 500 });
  }
}
