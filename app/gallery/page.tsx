'use client';

import { useState, useEffect } from 'react';
import { Image as ImageIcon, Video, FileText, Filter, Camera } from 'lucide-react';

export default function GalleryPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        setMedia(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredMedia = filter === 'ALL' ? media : media.filter(m => m.category === filter);

  if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Đang tải thư viện...</div>;

  return (
    <div className="animate-fade">
      <section style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '6rem 0', textAlign: 'center', borderRadius: '0 0 40px 40px' }}>
        <div className="container">
          <Camera size={48} style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }} />
          <h1 style={{ color: 'white', fontSize: '3rem' }}>Thư Viện Ảnh & Tư Liệu</h1>
          <p style={{ opacity: 0.8, marginTop: '1rem' }}>Những khoảnh khắc quý giá và tư liệu lịch sử của Tộc Trần Hữu</p>
        </div>
      </section>

      <section className="container" style={{ padding: '4rem 0' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem', flexWrap: 'wrap' }}>
          <button onClick={() => setFilter('ALL')} className={`btn ${filter === 'ALL' ? 'btn-primary' : 'btn-outline'}`}>Tất cả</button>
          <button onClick={() => setFilter('GIO_TOC')} className={`btn ${filter === 'GIO_TOC' ? 'btn-primary' : 'btn-outline'}`}>Lễ Giỗ Tộc</button>
          <button onClick={() => setFilter('KHANH_THANH')} className={`btn ${filter === 'KHANH_THANH' ? 'btn-primary' : 'btn-outline'}`}>Khánh thành</button>
          <button onClick={() => setFilter('TU_LIEU_CO')} className={`btn ${filter === 'TU_LIEU_CO' ? 'btn-primary' : 'btn-outline'}`}>Tư liệu cổ</button>
        </div>

        {/* Gallery Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {filteredMedia.map((item) => (
            <div key={item.id} className="glass animate-fade" style={{ overflow: 'hidden', cursor: 'pointer', transition: 'var(--transition)' }}>
              <div style={{ position: 'relative', height: '250px', backgroundColor: '#eee' }}>
                <img 
                  src={item.url} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.4rem', borderRadius: '50%', color: 'white' }}>
                  {item.type === 'IMAGE' ? <ImageIcon size={18} /> : item.type === 'VIDEO' ? <Video size={18} /> : <FileText size={18} />}
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>{item.title}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>
          ))}
          {filteredMedia.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)' }}>
              Chưa có hình ảnh nào trong chuyên mục này.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
