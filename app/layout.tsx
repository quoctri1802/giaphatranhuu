import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gia phả Tộc Trần Hữu - Nam Ô 1, Đà Nẵng",
  description: "Hệ thống quản lý gia phả trực tuyến Tộc Trần Hữu, Nam Ô 1, Hòa Hiệp Nam, Liên Chiểu, Đà Nẵng. Lưu giữ và kết nối nguồn cội.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const authSession = cookieStore.get("auth_session");
  const isLoggedIn = !!authSession;

  return (
    <html lang="vi">
      <body>
        <header className="glass" style={{ position: 'fixed', top: '1rem', left: '1rem', right: '1rem', zIndex: 100, padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>
            TỘC TRẦN HỮU <span style={{ color: 'var(--secondary-color)' }}>NAM Ô 1</span>
          </div>
          <nav style={{ display: 'flex', gap: '2rem', fontWeight: 600, alignItems: 'center' }}>
            <a href="/">Trang chủ</a>
            <a href="/tree">Cây gia phả</a>
            <a href="/history">Lịch sử</a>
            {isLoggedIn ? (
              <a href="/admin" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Quản lý</a>
            ) : (
              <a href="/login" style={{ color: 'var(--secondary-color)' }}>Đăng nhập</a>
            )}
          </nav>
        </header>
        <main style={{ paddingTop: '6rem' }}>
          {children}
        </main>
        <footer style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--accent-color)' }}>
          <p>© 2026 Tộc Trần Hữu, Nam Ô 1, Đà Nẵng. All rights reserved.</p>
          <p>Website được xây dựng và phát triển bởi Viên Trần Hữu</p>
        </footer>
      </body>
    </html>
  );
}
