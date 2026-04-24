'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Users, Shield } from "lucide-react";

export default function Home() {
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    fetch('/api/content?page=home')
      .then(res => res.json())
      .then(data => setContent(data.data || {}));
  }, []);

  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section style={{ 
        height: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(rgba(26, 54, 93, 0.8), rgba(26, 54, 93, 0.8)), url("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80") center/cover',
        color: 'white',
        borderRadius: '0 0 50px 50px',
        margin: '0 1rem'
      }}>
        <h1 style={{ color: 'white', fontSize: '4rem', marginBottom: '1.5rem' }}>
          {content.heroTitle || 'Gia Phả Tộc Trần Hữu'}
        </h1>
        <p style={{ fontSize: '1.5rem', maxWidth: '800px', marginBottom: '2.5rem', opacity: 0.9 }}>
          {content.heroSubtitle || 'Lưu giữ truyền thống, kết nối thế hệ tại mảnh đất Nam Ô 1 - Đà Nẵng sơn thủy hữu tình.'}
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="/tree" className="btn btn-primary" style={{ backgroundColor: 'var(--secondary-color)', fontSize: '1.1rem' }}>
            Xem Cây Gia Phả <ArrowRight size={20} />
          </a>
          <a href="/history" className="btn btn-outline" style={{ borderColor: 'white', color: 'white', fontSize: '1.1rem' }}>
            Tìm hiểu Lịch sử
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="container" style={{ padding: '8rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Hệ Thống Gia Phả Hiện Đại</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
            {content.introContent || 'Giải pháp công nghệ nhằm bảo tồn các giá trị truyền thống dòng tộc.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          <div className="glass" style={{ padding: '3rem', textAlign: 'center', transition: 'var(--transition)' }}>
            <div style={{ backgroundColor: 'var(--accent-color)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <Users color="var(--primary-color)" size={32} />
            </div>
            <h3 style={{ marginBottom: '1rem' }}>Kết Nối Thành Viên</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Dễ dàng tìm kiếm và xem thông tin về các chi nhánh, thành viên trong dòng tộc Tộc Trần Hữu.</p>
          </div>

          <div className="glass" style={{ padding: '3rem', textAlign: 'center', transition: 'var(--transition)' }}>
            <div style={{ backgroundColor: 'var(--accent-color)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <BookOpen color="var(--primary-color)" size={32} />
            </div>
            <h3 style={{ marginBottom: '1rem' }}>Số Hóa Tư Liệu</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Lưu trữ tiểu sử, sự nghiệp và những đóng góp của các bậc tiền nhân cho hậu thế.</p>
          </div>

          <div className="glass" style={{ padding: '3rem', textAlign: 'center', transition: 'var(--transition)' }}>
            <div style={{ backgroundColor: 'var(--accent-color)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <Shield color="var(--primary-color)" size={32} />
            </div>
            <h3 style={{ marginBottom: '1rem' }}>Bảo Mật & Phân Quyền</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Hệ thống phân quyền thông minh, chỉ những người có trách nhiệm mới được chỉnh sửa dữ liệu.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
