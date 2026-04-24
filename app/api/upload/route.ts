import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy tệp tin' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Tạo thư mục uploads nếu chưa có
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {}

    // Tạo tên tệp duy nhất để tránh trùng lặp
    const uniqueName = `${uuidv4()}-${file.name}`;
    const path = join(uploadDir, uniqueName);

    await writeFile(path, buffer);
    console.log(`Đã lưu tệp tại: ${path}`);

    // Trả về đường dẫn công khai
    return NextResponse.json({ url: `/uploads/${uniqueName}` });
  } catch (error) {
    console.error('Lỗi upload:', error);
    return NextResponse.json({ error: 'Lỗi khi tải ảnh lên' }, { status: 500 });
  }
}
