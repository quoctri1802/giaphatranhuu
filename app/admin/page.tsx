'use client';

import { useState, useEffect, useCallback } from 'react';
import { Users, UserPlus, FileEdit, Settings, Search, X, ShieldCheck, LogOut, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, members, posts, users
  const [showForm, setShowForm] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ totalMembers: 0, totalGenerations: 0, recentUpdates: [] });
  const [pageContent, setPageContent] = useState<any>({ home: {}, history: {} });
  const [loading, setLoading] = useState(true);

  // Form states
  const [memberForm, setMemberForm] = useState({ fullName: '', otherName: '', gender: 'NAM', generation: '', branch: '', bio: '', parentId: '', spouseId: '', avatarUrl: '' });
  const [postForm, setPostForm] = useState({ title: '', content: '', coverImage: '' });
  const [userForm, setUserForm] = useState({ email: '', password: '', name: '', role: 'EDITOR' });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const authRes = await fetch('/api/auth/me');
      if (!authRes.ok) { window.location.href = '/login'; return; }
      const userData = await authRes.json();
      setUser(userData);

      const resRaw = await fetch('/api/members/list');
      setMembers(await resRaw.json());

      const statsRes = await fetch('/api/admin/stats');
      setStats(await statsRes.json());

      const postsRes = await fetch('/api/posts');
      setPosts(await postsRes.json());

      const homeRes = await fetch('/api/content?page=home');
      const homeData = await homeRes.json();
      const histRes = await fetch('/api/content?page=history');
      const histData = await histRes.json();
      setPageContent({ home: homeData.data, history: histData.data });

      if (userData.role === 'ADMIN') {
        const usersRes = await fetch('/api/users');
        setUsers(await usersRes.json());
      }

      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const res = await fetch('/api/members', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEditing ? { ...memberForm, id: editingId } : memberForm),
    });
    if (res.ok) { alert('Thành công!'); setShowForm(false); setIsEditing(false); fetchData(); }
  };

  const handleDeleteMember = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa thành viên này?')) {
      const res = await fetch(`/api/members?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postForm),
    });
    if (res.ok) { alert('Đã đăng bài!'); setShowForm(false); fetchData(); }
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const res = await fetch('/api/users', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEditing ? { ...userForm, id: editingId } : userForm),
    });
    if (res.ok) { alert('Thành công!'); setShowForm(false); setIsEditing(false); fetchData(); }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa tài khoản này?')) {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    window.location.href = '/';
  };

  const handleSaveContent = async (page: string) => {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, data: pageContent[page] }),
    });
    if (res.ok) alert('Đã lưu nội dung trang ' + (page === 'home' ? 'Trang chủ' : 'Lịch sử'));
  };

  if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Đang tải hệ thống quản trị...</div>;

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      {/* Header & Role Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '2rem', margin: 0 }}>Quản trị Gia phả</h1>
            <span style={{ backgroundColor: user?.role === 'ADMIN' ? '#dcfce7' : '#fef9c3', color: user?.role === 'ADMIN' ? '#166534' : '#854d0e', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              {user?.role === 'ADMIN' ? 'QUẢN TRỊ VIÊN' : 'BIÊN TẬP VIÊN'}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>Chào mừng bạn, {user?.name}.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={() => { setShowForm(true); }}>
            <UserPlus size={20} /> Thao tác nhanh
          </button>
          <button className="btn btn-outline" onClick={handleLogout} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--accent-color)', paddingBottom: '1rem' }}>
        <button onClick={() => setActiveTab('overview')} style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, color: activeTab === 'overview' ? 'var(--primary-color)' : 'var(--text-secondary)', borderBottom: activeTab === 'overview' ? '2px solid var(--primary-color)' : 'none' }}>Tổng quan</button>
        <button onClick={() => setActiveTab('members')} style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, color: activeTab === 'members' ? 'var(--primary-color)' : 'var(--text-secondary)', borderBottom: activeTab === 'members' ? '2px solid var(--primary-color)' : 'none' }}>Thành viên</button>
        <button onClick={() => setActiveTab('posts')} style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, color: activeTab === 'posts' ? 'var(--primary-color)' : 'var(--text-secondary)', borderBottom: activeTab === 'posts' ? '2px solid var(--primary-color)' : 'none' }}>Bài viết & Tin tức</button>
        <button onClick={() => setActiveTab('content')} style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, color: activeTab === 'content' ? 'var(--primary-color)' : 'var(--text-secondary)', borderBottom: activeTab === 'content' ? '2px solid var(--primary-color)' : 'none' }}>Nội dung trang</button>
        {user?.role === 'ADMIN' && (
          <button onClick={() => setActiveTab('users')} style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, color: activeTab === 'users' ? 'var(--primary-color)' : 'var(--text-secondary)', borderBottom: activeTab === 'users' ? '2px solid var(--primary-color)' : 'none' }}>Tài khoản</button>
        )}
      </div>

      {/* Tab Content: Overview */}
      {activeTab === 'overview' && (
        <div className="animate-fade">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="glass" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#3b82f615', color: '#3b82f6', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={24} /></div>
              <div><div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Thành viên</div><div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.totalMembers}</div></div>
            </div>
            <div className="glass" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#10b98115', color: '#10b981', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Search size={24} /></div>
              <div><div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Thế hệ</div><div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.totalGenerations}</div></div>
            </div>
            <div className="glass" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#f59e0b15', color: '#f59e0b', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={24} /></div>
              <div><div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Bài viết</div><div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{posts.length}</div></div>
            </div>
          </div>
          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '2rem' }}><Clock size={20} /> Cập nhật mới nhất</h3>
            {stats.recentUpdates.map((m: any) => (
              <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--accent-color)' }}>
                <span>{m.fullName}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{new Date(m.updatedAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Members */}
      {activeTab === 'members' && (
        <div className="glass animate-fade" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3>Danh sách thành viên</h3>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input placeholder="Tìm thành viên..." style={{ padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '20px', border: '1px solid var(--accent-color)' }} />
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--accent-color)' }}>
                <th style={{ padding: '1rem' }}>Họ tên</th>
                <th style={{ padding: '1rem' }}>Đời</th>
                <th style={{ padding: '1rem' }}>Giới tính</th>
                <th style={{ padding: '1rem' }}>Chi nhánh</th>
                <th style={{ padding: '1rem' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--accent-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{m.fullName}</td>
                  <td style={{ padding: '1rem' }}>{m.generation}</td>
                  <td style={{ padding: '1rem' }}>{m.gender}</td>
                  <td style={{ padding: '1rem' }}>{m.branch || 'Nhánh chính'}</td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
                    <button onClick={() => { setIsEditing(true); setEditingId(m.id); setMemberForm({...m, parentId: m.parentId || '', spouseId: m.spouseId || ''}); setShowForm(true); }} style={{ color: 'var(--primary-color)', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }}>Sửa</button>
                    <button onClick={() => handleDeleteMember(m.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content: Posts */}
      {activeTab === 'posts' && (
        <div className="animate-fade">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass" onClick={() => { setIsEditing(false); setShowForm(true); }} style={{ border: '2px dashed var(--accent-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', cursor: 'pointer' }}>
              <UserPlus size={32} color="var(--text-secondary)" />
              <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Viết bài mới</p>
            </div>
            {posts.map(post => (
              <div key={post.id} className="glass" style={{ overflow: 'hidden' }}>
                <div style={{ height: '150px', backgroundColor: 'var(--accent-color)' }}>
                  {post.coverImage && <img src={post.coverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>{post.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{new Date(post.createdAt).toLocaleDateString()}</p>
                  <button className="btn btn-outline" style={{ width: '100%', padding: '0.5rem' }}>Chỉnh sửa</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Page Content */}
      {activeTab === 'content' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Chỉnh sửa Trang chủ</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input placeholder="Tiêu đề chính" value={pageContent.home?.heroTitle || ''} onChange={e => setPageContent({...pageContent, home: {...pageContent.home, heroTitle: e.target.value}})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
              <input placeholder="Tiêu đề phụ" value={pageContent.home?.heroSubtitle || ''} onChange={e => setPageContent({...pageContent, home: {...pageContent.home, heroSubtitle: e.target.value}})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
              <textarea placeholder="Nội dung giới thiệu" rows={4} value={pageContent.home?.introContent || ''} onChange={e => setPageContent({...pageContent, home: {...pageContent.home, introContent: e.target.value}})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
              <button className="btn btn-primary" onClick={() => handleSaveContent('home')}>Lưu Trang chủ</button>
            </div>
          </div>

          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Chỉnh sửa Trang Lịch sử</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <textarea placeholder="Mở đầu" rows={4} value={pageContent.history?.intro || ''} onChange={e => setPageContent({...pageContent, history: {...pageContent.history, intro: e.target.value}})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
              <input placeholder="Tiêu đề Cụ Tổ" value={pageContent.history?.founderTitle || ''} onChange={e => setPageContent({...pageContent, history: {...pageContent.history, founderTitle: e.target.value}})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
              <textarea placeholder="Nội dung Cụ Tổ" rows={4} value={pageContent.history?.founderContent || ''} onChange={e => setPageContent({...pageContent, history: {...pageContent.history, founderContent: e.target.value}})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
              <input placeholder="Tiêu đề Biển Cả" value={pageContent.history?.seaTitle || ''} onChange={e => setPageContent({...pageContent, history: {...pageContent.history, seaTitle: e.target.value}})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
              <textarea placeholder="Nội dung Biển Cả" rows={4} value={pageContent.history?.seaContent || ''} onChange={e => setPageContent({...pageContent, history: {...pageContent.history, seaContent: e.target.value}})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
              <input placeholder="URL hình ảnh Lịch sử" value={pageContent.history?.imageUrl || ''} onChange={e => setPageContent({...pageContent, history: {...pageContent.history, imageUrl: e.target.value}})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
              <button className="btn btn-primary" onClick={() => handleSaveContent('history')}>Lưu Trang Lịch sử</button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Users */}
      {activeTab === 'users' && user?.role === 'ADMIN' && (
        <div className="glass animate-fade" style={{ padding: '2rem' }}>
          <h3>Quản lý tài khoản truy cập</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--accent-color)' }}>
                <th style={{ padding: '1rem' }}>Tên</th>
                <th style={{ padding: '1rem' }}>Email</th>
                <th style={{ padding: '1rem' }}>Vai trò</th>
                <th style={{ padding: '1rem' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--accent-color)' }}>
                  <td style={{ padding: '1rem' }}>{u.name}</td>
                  <td style={{ padding: '1rem' }}>{u.email}</td>
                  <td style={{ padding: '1rem' }}><span style={{ backgroundColor: u.role === 'ADMIN' ? '#dcfce7' : '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>{u.role}</span></td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
                    <button onClick={() => { setIsEditing(true); setEditingId(u.id); setUserForm({...u, password: ''}); setShowForm(true); }} style={{ color: 'var(--primary-color)', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }}>Sửa</button>
                    <button onClick={() => handleDeleteUser(u.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Unified Form Modal */}
      {showForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="glass" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3>{activeTab === 'posts' ? 'Tạo bài viết mới' : activeTab === 'users' ? 'Tạo tài khoản mới' : 'Thêm thành viên gia phả'}</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
            </div>

            {activeTab === 'posts' ? (
              <form onSubmit={handlePostSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <input placeholder="Tiêu đề bài viết" required value={postForm.title} onChange={e => setPostForm({...postForm, title: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                <input placeholder="URL ảnh bìa (Tùy chọn)" value={postForm.coverImage} onChange={e => setPostForm({...postForm, coverImage: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                <textarea placeholder="Nội dung bài viết..." rows={10} required value={postForm.content} onChange={e => setPostForm({...postForm, content: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                <button type="submit" className="btn btn-primary">Đăng bài</button>
              </form>
            ) : activeTab === 'users' ? (
              <form onSubmit={handleUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <input placeholder="Họ tên" required value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                <input placeholder="Email" type="email" required value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                <input placeholder="Mật khẩu" type="password" required value={userForm.password} onChange={e => setUserForm({...userForm, password: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                <select value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                  <option value="ADMIN">Quản trị viên (Toàn quyền)</option>
                  <option value="EDITOR">Biên tập viên (Chỉ sửa gia phả/bài viết)</option>
                </select>
                <button type="submit" className="btn btn-primary">Tạo tài khoản</button>
              </form>
            ) : (
              <form onSubmit={handleMemberSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {/* Member Form Fields similar to previous implementation */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input placeholder="Họ và tên" required value={memberForm.fullName} onChange={e => setMemberForm({...memberForm, fullName: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                  <input placeholder="Tên gọi khác" value={memberForm.otherName} onChange={e => setMemberForm({...memberForm, otherName: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <select value={memberForm.gender} onChange={e => setMemberForm({...memberForm, gender: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <option value="NAM">Nam</option>
                    <option value="NỮ">Nữ</option>
                  </select>
                  <input placeholder="Đời thứ" type="number" required value={memberForm.generation} onChange={e => setMemberForm({...memberForm, generation: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>
                <input placeholder="URL Ảnh chân dung (Tùy chọn)" value={memberForm.avatarUrl} onChange={e => setMemberForm({...memberForm, avatarUrl: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <select value={memberForm.parentId} onChange={e => setMemberForm({...memberForm, parentId: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <option value="">-- Chọn Cha/Mẹ --</option>
                    {members.map(m => <option key={m.id} value={m.id}>{m.fullName} (Đời {m.generation})</option>)}
                  </select>
                  <select value={memberForm.spouseId} onChange={e => setMemberForm({...memberForm, spouseId: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <option value="">-- Chọn Vợ/Chồng --</option>
                    {members.map(m => <option key={m.id} value={m.id}>{m.fullName} (Đời {m.generation})</option>)}
                  </select>
                </div>
                <textarea placeholder="Tiểu sử..." rows={4} value={memberForm.bio} onChange={e => setMemberForm({...memberForm, bio: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                <button type="submit" className="btn btn-primary">Lưu thành viên</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
