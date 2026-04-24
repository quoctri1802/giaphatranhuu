'use client';

import { useState, useEffect } from 'react';
import { ScrollText, MapPin, Anchor, Landmark } from 'lucide-react';

export default function HistoryPage() {
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    fetch('/api/content?page=history')
      .then(res => res.json())
      .then(data => setContent(data.data || {}));
  }, []);

  return (
    <div className="animate-fade">
      {/* Header History */}
      <section style={{ 
        padding: '6rem 0', 
        textAlign: 'center', 
        backgroundColor: 'var(--primary-color)', 
        color: 'white',
        borderRadius: '0 0 40px 40px'
      }}>
        <div className="container">
          <ScrollText size={48} style={{ marginBottom: '1.5rem', color: 'var(--secondary-color)' }} />
          <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem' }}>Lịch Sử Dòng Tộc</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto' }}>
            {content.intro || 'Hành trình từ thuở khai cơ đến sự hưng thịnh của Tộc Trần Hữu trên mảnh đất Nam Ô địa linh nhân kiệt.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container" style={{ padding: '5rem 0', maxWidth: '900px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          <div style={{ borderLeft: '4px solid var(--secondary-color)', paddingLeft: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Landmark color="var(--secondary-color)" /> {content.founderTitle || 'Nguồn Gốc & Khai Cơ'}
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              {content.founderContent || 'Theo các tài liệu và lời kể của các bậc cao niên, Tộc Trần Hữu tại Nam Ô 1 bắt đầu định cư từ những năm cuối thế kỷ 18. Cụ Tổ Trần Văn Khai là người đầu tiên đặt chân đến vùng đất cửa biển này.'}
            </p>
          </div>

          <div style={{ borderLeft: '4px solid var(--secondary-color)', paddingLeft: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Anchor color="var(--secondary-color)" /> {content.seaTitle || 'Gắn Liền Với Biển Cả'}
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              {content.seaContent || 'Trải qua nhiều thế hệ, con cháu Tộc Trần Hữu không chỉ nổi tiếng với nghề đi biển mà còn là những nghệ nhân làm nước mắm Nam Ô trứ danh.'}
            </p>
          </div>

          <div style={{ borderLeft: '4px solid var(--secondary-color)', paddingLeft: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <MapPin color="var(--secondary-color)" /> Nam Ô - Mảnh Đất Di Sản
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2rem' }}>
              Nam Ô 1 ngày nay không chỉ là một làng chài thanh bình mà còn là một điểm đến văn hóa với nhiều di tích quan trọng.
            </p>
            <div style={{ width: '100%', height: '400px', backgroundColor: '#e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
              <img src={content.imageUrl || "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80"} alt="Nam O" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
