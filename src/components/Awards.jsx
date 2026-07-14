import React from 'react';
import { Award, Target, Flame } from 'lucide-react';

const Awards = () => {
  return (
    <div className="page-content">
      {/* Giải thưởng */}
      <div className="card">
        <h2><Award /> Cơ cấu giải thưởng (VAIC 2026)</h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem' }}>Các mốc giải thưởng hiện kim và cơ hội công nghệ cực kỳ hấp dẫn mà cả team đang nhắm tới.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(16.4706rem, 1fr))', gap: '1.1765rem' }}>
          <div style={{ padding: '1.1765rem', background: 'var(--surface-page)', borderRadius: '0.9412rem', border: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.98rem', fontWeight: 700, margin: '0 0 0.7059rem 0', color: 'var(--s3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Giải thưởng chính (Hiện kim)
            </h3>
            <ul className="checklist" style={{ paddingLeft: '0.8824rem' }}>
              <li><b>Giải Nhất (Quán quân):</b> 1,000 USD tiền mặt &amp; Cúp vô địch</li>
              <li><b>Giải Nhì (Á quân):</b> 800 USD tiền mặt</li>
              <li><b>Giải Ba (Quý quân):</b> 500 USD tiền mặt</li>
            </ul>
          </div>
          <div style={{ padding: '1.1765rem', background: 'var(--surface-page)', borderRadius: '0.9412rem', border: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.98rem', fontWeight: 700, margin: '0 0 0.7059rem 0', color: 'var(--s1)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Giải từ Nhà tài trợ (Tech &amp; Cloud)
            </h3>
            <ul className="checklist" style={{ paddingLeft: '0.8824rem' }}>
              <li><b>Best PyTorch Award (Meta):</b> 5,000 USD tiền mặt cho đội có thành tích xuất sắc nhất sử dụng PyTorch.</li>
              <li><b>FPT Award (Top 5):</b> Tài trợ 2,000 USD dưới dạng Cloud Credits từ FPT AI Factory để vận hành sản phẩm thực tế.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Đối thủ cạnh tranh */}
      <div className="card">
        <h2><Target /> Phân tích đối thủ cạnh tranh (Top 5)</h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem' }}>Dữ liệu điểm số và năng lực của các đội thi dẫn đầu được trích xuất trực tiếp từ bảng điểm Excel.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7059rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8235rem', alignItems: 'center', padding: '0.9412rem 1.1765rem', background: 'var(--surface-page)', borderRadius: '0.8235rem', border: '1px solid var(--border)' }}>
            <div style={{ width: '2.3529rem', height: '2.3529rem', borderRadius: '50%', background: 'linear-gradient(135deg, #ffd700, #ffa500)', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' }}>1</div>
            <div style={{ flex: 1, minWidth: '10.5882rem' }}>
              <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700 }}>Aulacys</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>Mối quan tâm: AI/ML, Python, APIs Integration</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: 'var(--s1)', fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>90.0 điểm</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hạng lâm thời</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8235rem', alignItems: 'center', padding: '0.9412rem 1.1765rem', background: 'var(--surface-page)', borderRadius: '0.8235rem', border: '1px solid var(--border)' }}>
            <div style={{ width: '2.3529rem', height: '2.3529rem', borderRadius: '50%', background: 'linear-gradient(135deg, #c0c0c0, #939393)', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' }}>2</div>
            <div style={{ flex: 1, minWidth: '10.5882rem' }}>
              <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700 }}>XVibe</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>Mối quan tâm: No-code/Low-code, Mobile, Frontend, Javascript</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: 'var(--s1)', fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>89.2 điểm</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hạng lâm thời</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8235rem', alignItems: 'center', padding: '0.9412rem 1.1765rem', background: 'var(--surface-page)', borderRadius: '0.8235rem', border: '1px solid var(--border)' }}>
            <div style={{ width: '2.3529rem', height: '2.3529rem', borderRadius: '50%', background: 'linear-gradient(135deg, #cd7f32, #8c4b18)', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' }}>3</div>
            <div style={{ flex: 1, minWidth: '10.5882rem' }}>
              <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700 }}>AlphaEdu</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>Mối quan tâm: EdTech, AI/ML, Product Development</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: 'var(--s1)', fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>88.3 điểm</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hạng lâm thời</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8235rem', alignItems: 'center', padding: '0.9412rem 1.1765rem', background: 'var(--surface-page)', borderRadius: '0.8235rem', border: '1px solid var(--border)' }}>
            <div style={{ width: '2.3529rem', height: '2.3529rem', borderRadius: '50%', background: 'var(--grid)', color: 'var(--text-secondary)', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' }}>4</div>
            <div style={{ flex: 1, minWidth: '10.5882rem' }}>
              <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700 }}>HSV_HUST</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>Mối quan tâm: Kỹ thuật sâu, AI Research Lab HUST</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: 'var(--s1)', fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>86.7 điểm</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hạng lâm thời</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8235rem', alignItems: 'center', padding: '0.9412rem 1.1765rem', background: 'var(--surface-page)', borderRadius: '0.8235rem', border: '1px solid var(--border)' }}>
            <div style={{ width: '2.3529rem', height: '2.3529rem', borderRadius: '50%', background: 'var(--grid)', color: 'var(--text-secondary)', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' }}>5</div>
            <div style={{ flex: 1, minWidth: '10.5882rem' }}>
              <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700 }}>ABG</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>Mối quan tâm: Business Viability, UX, Pitching Deck</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 800, color: 'var(--s1)', fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>85.8 điểm</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hạng lâm thời</div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Note */}
      <div className="card" style={{ display: 'flex', gap: '0.9412rem', alignItems: 'flex-start', background: 'rgba(32, 201, 151, 0.06)', borderColor: 'rgba(32, 201, 151, 0.2)' }}>
        <Flame style={{ color: 'var(--good)', flexShrink: 0, marginTop: '0.1176rem' }} size={24} />
        <div>
          <h3 style={{ margin: '0 0 0.3529rem 0', fontSize: '0.98rem', fontWeight: 700, color: 'var(--good)' }}>Mục tiêu của team Vibonymus</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Để cạnh tranh sòng phẳng với các đội thi top đầu, chúng ta bắt buộc phải tối ưu hóa cả hai yếu tố: **Kỹ thuật chiều sâu (AI Engineering)** và **Trải nghiệm AI-Native UX** đều do K.AI phụ trách. Quân sẽ liên kết hai mảnh ghép này để tạo ra một sản phẩm khả thi vượt trội có ý nghĩa kinh tế cao.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Awards;
