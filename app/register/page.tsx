'use client';

import { useState } from 'react';
import { UserPlus, CheckCircle, ArrowLeft, Send } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) setSubmitted(true);
    } catch (error) {
      alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container animate-fade" style={{ padding: '8rem 1rem', textAlign: 'center' }}>
        <div className="glass" style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
          <CheckCircle size={64} color="#48bb78" style={{ marginBottom: '2rem' }} />
          <h2 className="solemn-font">Gửi Yêu Cầu Thành Công</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1.5rem', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            Thông tin của bạn đã được gửi đến Ban biên soạn Tộc Trần Hữu. Chúng tôi sẽ xác minh và liên hệ lại với bạn qua email sớm nhất có thể.
          </p>
          <a href="/" className="btn btn-primary">Quay lại trang chủ</a>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade">
      <section style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '5rem 0', textAlign: 'center', borderRadius: '0 0 40px 40px' }}>
        <div className="container">
          <UserPlus size={48} style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }} />
          <h1 style={{ color: 'white' }}>Đăng Ký Thành Viên</h1>
          <p style={{ opacity: 0.8, marginTop: '1rem' }}>Cung cấp thông tin để xin cấp tài khoản hoặc cập nhật phả hệ</p>
        </div>
      </section>

      <section className="container" style={{ padding: '4rem 0' }}>
        <a href="/guide" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          <ArrowLeft size={18} /> Xem lại hướng dẫn
        </a>

        <div className="glass" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Họ và tên con cháu</label>
                <input 
                  className="glass" 
                  type="text" 
                  required 
                  placeholder="Ví dụ: Trần Hữu B"
                  value={formData.fullName} 
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
                  style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid #ddd' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Số điện thoại</label>
                <input 
                  className="glass" 
                  type="tel" 
                  placeholder="0905..."
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid #ddd' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Email nhận tài khoản</label>
              <input 
                className="glass" 
                type="email" 
                required 
                placeholder="email@example.com"
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid #ddd' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Thông tin xác minh (Tên cha mẹ, đời thứ...)</label>
              <textarea 
                className="glass" 
                rows={5} 
                required 
                placeholder="Hãy cung cấp tên cha/mẹ và ông bà của bạn để Ban biên soạn dễ dàng xác định vị trí của bạn trong gia phả."
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})} 
                style={{ width: '100%', padding: '1rem', border: '1px solid #ddd' }}
              ></textarea>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifyContent: 'center', padding: '1rem' }}>
              {loading ? 'Đang gửi...' : 'Gửi yêu cầu xác thực'} <Send size={18} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
