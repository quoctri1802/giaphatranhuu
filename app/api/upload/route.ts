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
      return NextResponse.json({ error: 'Không tìm thấy tệp tin trong yêu cầu' }, { status: 400 });
    }

    // 1. TRƯỜNG HỢP CHẠY TRÊN VERCEL
    if (process.env.VERCEL || process.env.BLOB_READ_WRITE_TOKEN) {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json({ 
          error: 'Thiếu cấu hình Vercel Blob. Bạn cần vào Vercel Dashboard -> Storage -> Blob để Connect.' 
        }, { status: 500 });
      }

      // Thêm addRandomSuffix: true để tránh lỗi trùng tên file
      const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true, 
      });
      return NextResponse.json({ url: blob.url });
    } 
    
    // 2. TRƯỜNG HỢP CHẠY LOCAL (Máy cá nhân)
    else {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        
        await mkdir(uploadDir, { recursive: true });
        
        const uniqueName = `${randomUUID()}-${file.name}`;
        const path = join(uploadDir, uniqueName);
        await writeFile(path, buffer);
        
        return NextResponse.json({ url: `/uploads/${uniqueName}` });
      } catch (err: any) {
        return NextResponse.json({ error: 'Lỗi ghi file local: ' + err.message }, { status: 500 });
      }
    }
  } catch (error: any) {
    console.error('Lỗi upload hệ thống:', error);
    return NextResponse.json({ error: 'Lỗi hệ thống: ' + error.message }, { status: 500 });
  }
}
