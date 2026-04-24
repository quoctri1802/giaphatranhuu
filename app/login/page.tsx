'use client';

import { useState } from 'react';
import { Shield, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = '/admin';
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="glass animate-fade" style={{ 
        width: '100%', 
        maxWidth: '450px', 
        padding: '3rem 2rem',
        boxShadow: 'var(--shadow-md)',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ 
            backgroundColor: 'var(--primary-color)', 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1.5rem',
            boxShadow: '0 4px 12px rgba(26, 54, 93, 0.2)'
          }}>
            <Shield color="white" size={32} />
          </div>
          <h2 className="solemn-font" style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Xác Thực</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Dành cho Hội đồng gia tộc & Ban biên soạn
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--accent-color)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '1rem 1rem 1rem 3rem', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0',
                  outline: 'none',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s'
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Mật khẩu</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--accent-color)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '1rem 1rem 1rem 3rem', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0',
                  outline: 'none',
                  fontSize: '1rem'
                }}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '1rem' }}>
            {loading ? 'Đang xác thực...' : 'Vào hệ thống'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Bạn chưa có tài khoản? <br />
          <a href="#" style={{ color: 'var(--secondary-color)', fontWeight: 600 }}>Liên hệ Hội đồng gia tộc</a>
        </div>
      </div>
    </div>
  );
}
