'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Users, Shield, Calendar } from "lucide-react";

export default function Home() {
  const [content, setContent] = useState<any>({});
  const [anniversaries, setAnniversaries] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/content?page=home')
      .then(res => res.json())
      .then(data => setContent(data.data || {}));

    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setAnniversaries(data.anniversaries || []));
  }, []);

  return (
    <div className="animate-fade">
      {/* Hero Section - Original Design */}
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
        <h1 className="hero-title solemn-font" style={{ color: 'white', fontSize: '4.5rem', marginBottom: '1.5rem', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
          {content.heroTitle || 'Gia Phả Tộc Trần Hữu'}
        </h1>
        <p style={{ fontSize: '1.5rem', maxWidth: '800px', marginBottom: '3rem', opacity: 0.9, lineHeight: '1.6' }}>
          {content.heroSubtitle || 'Lưu giữ truyền thống, kết nối thế hệ tại mảnh đất Nam Ô 1.'}
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

      {/* Main Content Grid */}
      <section className="container" style={{ padding: '8rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
          
          {/* Left: Features */}
          <div>
            <div style={{ marginBottom: '5rem' }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Hệ Thống Gia Phả Hiện Đại</h2>
              <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--accent-color)', marginBottom: '2rem' }}></div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                {content.introContent || 'Giải pháp công nghệ nhằm bảo tồn các giá trị truyền thống dòng tộc cho muôn đời sau.'}
              </p>
            </div>

            <div style={{ display: 'grid', gap: '3rem' }}>
              <div className="glass" style={{ padding: '3rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--accent-color)' }}>
                  <Users color="var(--accent-color)" size={28} />
                </div>
                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Kết Nối Thành Viên</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Dễ dàng tìm kiếm và tra cứu thông tin về các chi nhánh, thành viên trong dòng tộc qua các thế hệ.</p>
                </div>
              </div>

              <div className="glass" style={{ padding: '3rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--accent-color)' }}>
                  <BookOpen color="var(--accent-color)" size={28} />
                </div>
                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Số Hóa Tư Liệu</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Lưu trữ tiểu sử, sự nghiệp và những đóng góp của các bậc tiền nhân một cách khoa học và bền vững.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Anniversaries Sidebar */}
          <div>
            <div className="glass" style={{ padding: '2.5rem', border: '2px solid var(--accent-color)' }}>
              <h3 className="solemn-font" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Calendar color="var(--secondary-color)" /> Ngày Giỗ Sắp Tới
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {anniversaries.length > 0 ? anniversaries.map(a => (
                  <div key={a.id} style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.3rem' }}>{a.fullName}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--secondary-color)', fontWeight: 600 }}>
                      <span>Âm lịch: {a.deathDateLunar}</span>
                    </div>
                  </div>
                )) : (
                  <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Đang cập nhật dữ liệu ngày giỗ...</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
