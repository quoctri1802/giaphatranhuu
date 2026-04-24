'use client';

import React, { useEffect, useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { X, Calendar, User, Book } from 'lucide-react';

export default function TreePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const fetchData = useCallback(async () => {
    try {
      const authRes = await fetch('/api/auth/me');
      if (authRes.ok) setUser(await authRes.json());

      const res = await fetch('/api/members');
      const data = await res.json();
      if (data.nodes) {
        setNodes(data.nodes);
        setEdges(data.edges);
      }
    } catch (error) {
      console.error('Lỗi khi tải cây gia phả:', error);
    } finally {
      setLoading(false);
    }
  }, [setNodes, setEdges]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onNodeDragStop = async (_: any, node: Node) => {
    if (!user || (user.role !== 'ADMIN' && user.role !== 'EDITOR')) return;
    
    await fetch('/api/members/position', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: node.id,
        posX: node.position.x,
        posY: node.position.y
      })
    });
  };

  const onNodeClick = async (_: React.MouseEvent, node: Node) => {
    try {
      const res = await fetch(`/api/members/list`);
      const allMembers = await res.json();
      const member = allMembers.find((m: any) => m.id === node.id);
      setSelectedMember(member);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết thành viên');
    }
  };

  if (loading) {
    return (
      <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="animate-pulse" style={{ fontSize: '1.5rem', color: 'var(--primary-color)', fontWeight: 600 }}>
            Đang kết nối dữ liệu gia tộc...
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container" style={{ padding: '8rem 1rem', textAlign: 'center' }}>
        <div className="glass animate-fade" style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🔒</div>
          <h2 style={{ marginBottom: '1.5rem' }}>Quyền Truy Cập Bị Hạn Chế</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            Vì lý do bảo mật và tôn trọng quyền riêng tư của dòng họ, chỉ những thành viên đã được cấp tài khoản mới có thể xem chi tiết Cây Gia Phả.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <a href="/login" className="btn btn-primary">Đăng nhập ngay</a>
            <a href="/guide" className="btn btn-outline">Cách xin cấp tài khoản</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: 'calc(100vh - 6rem)', width: '100%', position: 'relative' }}>
      <div style={{ 
        position: 'absolute', 
        top: '1rem', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 10,
        textAlign: 'center',
        padding: '0.8rem 2.5rem',
        borderRadius: '30px',
        backgroundColor: 'var(--white)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--accent-color)'
      }}>
        <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary-color)' }}>
          Cây Gia Phả Họ Trần - Nam Ô 1
        </h2>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onNodeDragStop={onNodeDragStop}
        nodesDraggable={!!user}
        fitView
      >
        <Background color="#f1f5f9" gap={20} />
        <Controls />
        <MiniMap 
          nodeStrokeWidth={3} 
          zoomable 
          pannable 
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background as string;
            return '#fff';
          }}
        />
      </ReactFlow>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end'
        }}>
          <div className="animate-fade" style={{ 
            width: '100%', maxWidth: '400px', height: '100%', 
            backgroundColor: 'white', padding: '3rem 2rem',
            boxShadow: '-5px 0 25px rgba(0,0,0,0.1)',
            overflowY: 'auto'
          }}>
            <button onClick={() => setSelectedMember(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={28} color="var(--text-secondary)" />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'var(--accent-color)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: 'var(--primary-color)', fontWeight: 800 }}>
                {selectedMember.fullName.charAt(0)}
              </div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{selectedMember.fullName}</h2>
              <div style={{ color: 'var(--secondary-color)', fontWeight: 600 }}>Đời thứ {selectedMember.generation}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <User size={20} color="var(--primary-color)" />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Tên gọi khác</div>
                  <div>{selectedMember.otherName || 'Không có'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Calendar size={20} color="var(--primary-color)" />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Giới tính</div>
                  <div>{selectedMember.gender === 'NAM' ? 'Nam' : 'Nữ'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Book size={20} color="var(--primary-color)" />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Tiểu sử</div>
                  <div style={{ lineHeight: '1.6' }}>{selectedMember.bio || 'Chưa có thông tin tiểu sử.'}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '4rem' }}>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSelectedMember(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      <div className="glass" style={{ 
        position: 'absolute', 
        bottom: '2rem', 
        right: '2rem', 
        width: '240px', 
        padding: '1.2rem',
        zIndex: 10,
        fontSize: '0.85rem'
      }}>
        <h4 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Chú thích đời tộc</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {[
            { label: 'Đời 1 (Thủy Tổ)', color: '#c5a059' },
            { label: 'Đời 2', color: '#9c4221' },
            { label: 'Đời 3', color: '#1a365d' },
            { label: 'Đời 4', color: '#2f855a' },
            { label: 'Đời 5', color: '#6b46c1' },
            { label: 'Nàng dâu / Con gái', color: '#fb7185', isBorder: true },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ 
                width: '18px', 
                height: '18px', 
                backgroundColor: item.isBorder ? '#fff1f2' : item.color, 
                border: `2px solid ${item.color}`,
                borderRadius: '4px' 
              }}></div>
              <span style={{ fontWeight: 600 }}>{item.label}</span>
            </div>
          ))}
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            * Click để xem tiểu sử.
          </div>
        </div>
      </div>
    </div>
  );
}
