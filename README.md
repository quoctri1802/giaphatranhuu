# Hệ thống Gia phả Trực tuyến - Tộc Trần Hữu (Nam Ô 1)

Hệ thống quản lý và tra cứu gia phả hiện đại dành cho Tộc Trần Hữu tại Nam Ô 1, Hòa Hiệp Nam, Liên Chiểu, Đà Nẵng.

## ✨ Tính năng chính
- **Cây gia phả tương tác**: Trực quan hóa mối quan hệ huyết thống và vợ chồng bằng React Flow.
- **Quản trị nội dung (CMS)**: Chỉnh sửa nội dung Trang chủ và Lịch sử ngay trên giao diện Admin.
- **Quản lý thành viên**: Thêm, sửa, xóa thành viên dòng tộc với đầy đủ thông tin, tiểu sử và hình ảnh.
- **Phân quyền người dùng**: Hệ thống tài khoản Admin và Editor bảo mật.
- **Tin tức dòng tộc**: Đăng tải các bài viết, thông báo và câu chuyện về nguồn cội.

## 🛠 Công nghệ sử dụng
- **Frontend**: Next.js 14 (App Router), TypeScript.
- **Database**: Neon Database (PostgreSQL Serverless).
- **ORM**: Prisma.
- **UI/UX**: Vanilla CSS (Glassmorphism), Lucide React Icons.
- **Visualization**: React Flow.

## 🚀 Hướng dẫn cài đặt

1. **Clone repository**:
   ```bash
   git clone <your-repo-url>
   cd gia-pha-online
   ```

2. **Cài đặt thư viện**:
   ```bash
   npm install
   ```

3. **Cấu hình môi trường**:
   Tạo file `.env` và thêm chuỗi kết nối Database:
   ```env
   DATABASE_URL="your-postgresql-url"
   ```

4. **Khởi tạo Database**:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

5. **Chạy ứng dụng**:
   ```bash
   npm run dev
   ```

## 📝 Tác giả
Phát triển bởi **Viên Trần Hữu**.
