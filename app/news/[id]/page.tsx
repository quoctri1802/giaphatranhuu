'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, User, ArrowLeft } from 'lucide-react';

export default function NewsDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vì /api/posts trả về mảng, ta sẽ tìm trong mảng đó
    fetch('/api/posts')
      .then(res => res.json())
      .then(posts => {
        const found = posts.find((p: any) => p.id === params.id);
        setPost(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Đang tải bài viết...</div>;
  if (!post) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Không tìm thấy bài viết.</div>;

  return (
    <div className="animate-fade container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <a href="/news" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '3rem', textDecoration: 'none' }}>
        <ArrowLeft size={20} /> Quay lại danh sách
      </a>

      {post.coverImage && (
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', marginBottom: '3rem' }}>
          <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>{post.title}</h1>
      
      <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--accent-color)', paddingBottom: '1.5rem', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={18} /> {new Date(post.createdAt).toLocaleDateString('vi-VN')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={18} /> Ban biên soạn Tộc Trần
        </div>
      </div>

      <div style={{ fontSize: '1.2rem', lineHeight: '1.8', whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>
        {post.content}
      </div>
    </div>
  );
}
