'use client';

import { ShieldCheck, UserPlus, Mail, Phone, Info } from 'lucide-react';

export default function GuidePage() {
  return (
    <div className="animate-fade">
      <section style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '6rem 0', textAlign: 'center', borderRadius: '0 0 40px 40px' }}>
        <div className="container">
          <ShieldCheck size={48} style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }} />
          <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem' }}>Hướng Dẫn Cấp Tài Khoản</h1>
          <p style={{ opacity: 0.8, maxWidth: '700px', margin: '0 auto' }}>Quy trình xác thực và cấp quyền truy cập hệ thống Gia phả trực tuyến Tộc Trần Hữu Nam Ô 1</p>
        </div>
      </section>

      <section className="container" style={{ padding: '5rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div className="glass" style={{ padding: '3rem' }}>
            <div style={{ color: 'var(--accent-color)', marginBottom: '1.5rem' }}><Info size={32} /></div>
            <h3 style={{ marginBottom: '1.2rem' }}>Đối tượng được cấp</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Tài khoản truy cập chỉ dành riêng cho con cháu, dâu rể trong dòng tộc Tộc Trần Hữu (Nam Ô 1). Mỗi tài khoản gắn liền với một thành viên cụ thể trong cây gia phả.
            </p>
          </div>

          <div className="glass" style={{ padding: '3rem' }}>
            <div style={{ color: 'var(--accent-color)', marginBottom: '1.5rem' }}><UserPlus size={32} /></div>
            <h3 style={{ marginBottom: '1.2rem' }}>Thông tin cần cung cấp</h3>
            <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li>Họ và tên khai sinh</li>
              <li>Tên cha/mẹ (để xác định vị trí trong phả hệ)</li>
              <li>Đời thứ mấy (nếu biết)</li>
              <li>Email cá nhân chính chủ</li>
            </ul>
          </div>
        </div>

        <div className="glass" style={{ marginTop: '4rem', padding: '4rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '2rem' }}>Quy trình thực hiện</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>1</div>
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Gửi thông tin đăng ký</h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Thành viên điền thông tin vào Form trực tuyến hoặc liên hệ trực tiếp với Ban biên soạn.</p>
                <a href="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>Đăng ký trực tuyến ngay</a>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>2</div>
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Xác minh danh tính</h4>
                <p style={{ color: 'var(--text-secondary)' }}>Ban quản trị sẽ đối soát thông tin dựa trên gia phả giấy và các tư liệu dòng tộc để xác nhận tư cách thành viên.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>3</div>
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Cấp tài khoản</h4>
                <p style={{ color: 'var(--text-secondary)' }}>Sau khi xác minh thành công, thông tin đăng nhập sẽ được gửi trực tiếp về email của thành viên.</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '2.5rem' }}>Thông tin liên hệ Ban biên soạn</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Phone color="var(--secondary-color)" />
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Hotline</div>
                <div style={{ fontWeight: 700 }}>0905.XXX.XXX (Ông Trần Hữu A)</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Mail color="var(--secondary-color)" />
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Email</div>
                <div style={{ fontWeight: 700 }}>lienhe@tranhuunamo.com</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
