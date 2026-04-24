'use client';

import { useState, useEffect } from 'react';
import { Calendar, ChevronRight, BookOpen } from 'lucide-react';

export default function NewsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Đang tải tin tức...</div>;

  return (
    <div className="animate-fade">
      <section style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '6rem 0', textAlign: 'center', borderRadius: '0 0 40px 40px' }}>
        <div className="container">
          <BookOpen size={48} style={{ marginBottom: '1.5rem', color: 'var(--secondary-color)' }} />
          <h1 style={{ color: 'white', fontSize: '3rem' }}>Bài Viết & Tin Tức</h1>
          <p style={{ opacity: 0.8, marginTop: '1rem' }}>Những câu chuyện, thông báo và lịch sử quý báu của Tộc Trần Hữu Nam Ô 1</p>
        </div>
      </section>

      <section className="container" style={{ padding: '5rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
          {posts.map(post => (
            <div key={post.id} className="glass card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '220px', backgroundColor: 'var(--accent-color)' }}>
                {post.coverImage && <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <Calendar size={16} /> {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                </div>
                <h3 style={{ marginBottom: '1rem', lineHeight: '1.4' }}>{post.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.content.substring(0, 150)}...
                </p>
                <a href={`/news/${post.id}`} className="btn btn-outline" style={{ justifyContent: 'center' }}>
                  Đọc thêm <ChevronRight size={18} />
                </a>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)' }}>
              Hiện chưa có bài viết nào được đăng tải.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
