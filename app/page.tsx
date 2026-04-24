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
      <section className="hero-section" style={{ 
        height: '85vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(rgba(26, 54, 93, 0.8), rgba(26, 54, 93, 0.8)), url("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80") center/cover',
        color: 'white',
        borderRadius: '0 0 60px 60px',
        margin: '0',
        padding: '2rem'
      }}>
        <h1 className="hero-title" style={{ color: 'white', fontSize: '4.5rem', marginBottom: '1.5rem', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
          {content.heroTitle || 'Gia Phả Tộc Trần Hữu'}
        </h1>
        <p style={{ fontSize: '1.4rem', maxWidth: '800px', marginBottom: '3rem', opacity: 0.9, lineHeight: '1.6' }}>
          {content.heroSubtitle || 'Lưu giữ truyền thống, kết nối thế hệ tại mảnh đất Nam Ô 1 - Đà Nẵng sơn thủy hữu tình.'}
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/tree" className="btn btn-primary" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--primary-color)', fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            Xem Cây Gia Phả <ArrowRight size={20} />
          </a>
          <a href="/history" className="btn btn-outline" style={{ borderColor: 'white', color: 'white', fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            Tìm hiểu Lịch sử
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="container" style={{ padding: '8rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Hệ Thống Gia Phả Hiện Đại</h2>
          <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--accent-color)', margin: '0 auto 2rem' }}></div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            {content.introContent || 'Giải pháp công nghệ nhằm bảo tồn các giá trị truyền thống dòng tộc cho muôn đời sau.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div className="glass card" style={{ padding: '4rem 2rem', textAlign: 'center', transition: 'var(--transition)' }}>
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '1px solid var(--accent-color)' }}>
              <Users color="var(--accent-color)" size={32} />
            </div>
            <h3 style={{ marginBottom: '1.2rem', fontSize: '1.8rem' }}>Kết Nối Thành Viên</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Dễ dàng tìm kiếm và tra cứu thông tin về các chi nhánh, thành viên trong dòng tộc Tộc Trần Hữu qua các thế hệ.</p>
          </div>

          <div className="glass card" style={{ padding: '4rem 2rem', textAlign: 'center', transition: 'var(--transition)' }}>
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '1px solid var(--accent-color)' }}>
              <BookOpen color="var(--accent-color)" size={32} />
            </div>
            <h3 style={{ marginBottom: '1.2rem', fontSize: '1.8rem' }}>Số Hóa Tư Liệu</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Lưu trữ tiểu sử, sự nghiệp và những đóng góp của các bậc tiền nhân một cách khoa học và bền vững.</p>
          </div>

          <div className="glass card" style={{ padding: '4rem 2rem', textAlign: 'center', transition: 'var(--transition)' }}>
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '1px solid var(--accent-color)' }}>
              <Shield color="var(--accent-color)" size={32} />
            </div>
            <h3 style={{ marginBottom: '1.2rem', fontSize: '1.8rem' }}>Bảo Mật Gia Tộc</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Hệ thống phân quyền nghiêm ngặt, đảm bảo thông tin nội bộ gia tộc chỉ dành cho những người trong dòng họ.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
