import React, { useState } from 'react';
import { Cpu, ShieldAlert, DollarSign, PlusCircle, CheckCircle2, FolderGit2, Compass, Sparkles, ExternalLink } from 'lucide-react';
import { trackData } from '../data/tracks-data';
import { ownedTools, freeFirstItems, openSourceKits, costTableRows, costTableTotal, trackAIDetails } from '../data/ai-resource-data';

const trackNames = Object.fromEntries(trackData.map((t) => [t.id, t.name]));

const AIResource = () => {
  const [selectedTrack, setSelectedTrack] = useState('nang-suat-sme');
  const currentAIDetails = trackAIDetails[selectedTrack];

  return (
    <div className="page-content">
      {/* Tiêu đề trang */}
      <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-2.6471rem', right: '-2.6471rem', opacity: 0.05, pointerEvents: 'none' }}>
          <Cpu size={200} />
        </div>
        <h2><Cpu /> AI Resource &amp; Stack Công Nghệ — VAIC 2026</h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem', maxWidth: '80%' }}>
          Thống kê chi tiết các mô hình AI, API tài nguyên, hạ tầng cơ sở dữ liệu, các thư viện mã nguồn mở và chi phí đầu tư bản quyền phục vụ riêng cho team Vibonymus tại cuộc thi Hackathon 48h.
        </p>
      </div>

      {/* PHẦN 1: CÁC CÔNG CỤ AI ĐANG CÓ CỦA TEAM */}
      <div className="card">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.4706rem' }}>
          <Sparkles style={{ color: 'var(--s1)' }} /> 1. Công cụ AI hiện có của Team (Current AI Assets)
        </h2>
        <p className="sub" style={{ margin: '0 0 1.1765rem' }}>
          Danh sách các tài khoản AI bản quyền đã được team đăng ký thanh toán thành công, sẵn sàng khai thác lập trình:
        </p>

        <div className="tool-grid">
          {ownedTools.map((tool, i) => (
            <div className="tool-card" key={i}>
              <div>
                <div className="tool-stage" style={{ color: `var(${tool.colorVar})` }}>{tool.stage}</div>
                <div className="tool-names">{tool.names}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: '0.5882rem' }}>
                  <ul style={{ paddingLeft: '1.0588rem', margin: 0 }}>
                    {tool.items.map((item, j) => (
                      <li key={j}><b>{item.label}</b>: {item.text}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="tool-tag" style={{ background: tool.tagBg, color: `var(${tool.colorVar})` }}>Trạng thái: Sẵn sàng</div>
            </div>
          ))}
        </div>
      </div>

      {/* CHIẾN LƯỢC TỐI ƯU HÓA: ƯU TIÊN AI MIỄN PHÍ */}
      <div className="card" style={{ background: 'rgba(32, 201, 151, 0.03)', borderColor: 'rgba(32, 201, 151, 0.2)' }}>
        <h2 style={{ color: 'var(--s2)', display: 'flex', alignItems: 'center', gap: '0.4706rem' }}>
          <CheckCircle2 style={{ color: 'var(--s2)' }} /> Chiến lược tối ưu chi phí: Ưu tiên AI Miễn Phí hàng đầu
        </h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem' }}>
          Vibonymus triệt để áp dụng triết lý <b>"Free-First"</b>, tận dụng tối đa các cổng API miễn phí và công cụ AI hỗ trợ lập trình không mất tiền trước khi quyết định chi trả cho các gói trả phí:
        </p>
        <div className="grid-3" style={{ gap: '0.8235rem' }}>
          {freeFirstItems.map((item, i) => (
            <div key={i} style={{ padding: '0.8235rem', borderRadius: '0.5882rem', background: 'var(--surface-page)', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: `var(${item.colorVar})`, marginBottom: '0.3529rem' }}>{item.title}</div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* KHO MÃ NGUỒN MỞ TỰ HOST */}
      <div className="card">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5882rem' }}>
          <FolderGit2 style={{ color: 'var(--s1)' }} /> Kho giải pháp Mã nguồn mở tự host (Zero-Cost &amp; High Defensibility)
        </h2>
        <p className="sub" style={{ margin: '0 0 1.1765rem' }}>
          Tận dụng sức mạnh của cộng đồng mã nguồn mở chạy trực tiếp cục bộ (Local) hoặc tự host. Điều này giúp nâng điểm <i>Engineering Depth</i> và <i>AI Safety</i> cực kỳ thuyết phục trước Ban giám khảo:
        </p>

        <div className="grid-2">
          {openSourceKits.map((kit, i) => (
            <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '0.7059rem', padding: '0.9412rem', background: 'var(--surface-page)' }}>
              <h3 style={{ margin: '0 0 0.4706rem', color: `var(${kit.colorVar})`, fontSize: '0.92rem', fontWeight: 800 }}>{kit.title}</h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                <b>Công cụ:</b> {kit.tool}
                <br />
                <b>Ứng dụng:</b> {kit.usage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PHẦN 2: ĐỀ XUẤT AI ĐỘNG THEO TỪNG ĐỀ TÀI */}
      <div className="card">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5882rem' }}>
          <Compass /> 2. Đề xuất Phân bổ AI theo từng Đề tài (AI Recommendations by Track)
        </h2>
        <p className="sub" style={{ margin: '0 0 1.1765rem' }}>
          Chọn một đề tài để xem các đề xuất mô hình AI, công cụ bổ sung được lọc tự động theo các nhóm tài nguyên:
        </p>

        {/* Thanh chọn Track */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4706rem',
          marginBottom: '1.4118rem',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '0.9412rem'
        }}>
          {Object.keys(trackNames).map((key) => {
            const isSelected = selectedTrack === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedTrack(key)}
                style={{
                  padding: '0.4706rem 0.8235rem',
                  borderRadius: '1.1765rem',
                  border: isSelected ? '1px solid var(--theme-color)' : '1px solid var(--border)',
                  background: isSelected ? 'rgba(90, 73, 204, 0.08)' : 'var(--surface-1)',
                  color: isSelected ? 'var(--theme-color)' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {trackNames[key]}
              </button>
            );
          })}
        </div>

        {/* Dữ liệu AI phân bổ theo các nhóm */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1765rem' }}>

          {/* Nhóm 1: AI hiện có */}
          <div style={{ padding: '1.1765rem', borderRadius: '0.7059rem', border: '1px solid var(--border)', background: 'var(--surface-page)' }}>
            <h3 style={{ margin: '0 0 0.7059rem 0', display: 'flex', alignItems: 'center', gap: '0.4706rem', fontSize: '0.95rem', fontWeight: 800, color: 'var(--s1)' }}>
              <Sparkles size={18} /> Nhóm 1: AI hiện có (Đang sở hữu sử dụng cho track này)
            </h3>
            <div className="grid-2" style={{ gap: '0.8235rem' }}>
              {currentAIDetails.owned.map((item, index) => (
                <div key={index} style={{ padding: '0.8235rem', borderRadius: '0.5882rem', border: '1px solid rgba(42, 120, 214, 0.12)', background: 'rgba(42, 120, 214, 0.02)' }}>
                  <h4 style={{ margin: '0 0 0.3529rem 0', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{item.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nhóm 2: AI Miễn phí */}
          <div style={{ padding: '1.1765rem', borderRadius: '0.7059rem', border: '1px solid var(--border)', background: 'var(--surface-page)' }}>
            <h3 style={{ margin: '0 0 0.7059rem 0', display: 'flex', alignItems: 'center', gap: '0.4706rem', fontSize: '0.95rem', fontWeight: 800, color: 'var(--s2)' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--s2)' }} /> Nhóm 2: AI miễn phí (Free Tier / Open Source / Slide / Đồ họa / Video / Voice)
            </h3>
            <div className="grid-2" style={{ gap: '0.8235rem' }}>
              {currentAIDetails.free.map((item, index) => (
                <div key={index} style={{ padding: '0.8235rem', borderRadius: '0.5882rem', border: '1px solid rgba(32, 201, 151, 0.12)', background: 'rgba(32, 201, 151, 0.02)' }}>
                  <h4 style={{ margin: '0 0 0.3529rem 0', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{item.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nhóm 3: Thư viện & Mã nguồn mở khuyên dùng (GitHub Repos) */}
          <div style={{ padding: '1.1765rem', borderRadius: '0.7059rem', border: '1px solid var(--border)', background: 'var(--surface-page)' }}>
            <h3 style={{ margin: '0 0 0.7059rem 0', display: 'flex', alignItems: 'center', gap: '0.4706rem', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              <FolderGit2 size={18} style={{ color: 'var(--s1)' }} /> Nhóm 3: Thư viện &amp; Mã nguồn mở khuyên dùng (GitHub Open-Source)
            </h3>
            <div className="grid-2" style={{ gap: '0.8235rem' }}>
              {currentAIDetails.githubRepos.map((item, index) => (
                <div key={index} style={{ padding: '0.8235rem', borderRadius: '0.5882rem', border: '1px solid rgba(90, 73, 204, 0.15)', background: 'rgba(90, 73, 204, 0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.4706rem', marginBottom: '0.4706rem' }}>
                    <h4 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800 }}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--theme-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3529rem' }}
                      >
                        {item.name} <ExternalLink size={14} />
                      </a>
                    </h4>
                    <span style={{
                      fontSize: '0.72rem',
                      padding: '0.1176rem 0.4706rem',
                      borderRadius: '0.7059rem',
                      background: 'rgba(90, 73, 204, 0.08)',
                      color: 'var(--theme-color)',
                      fontWeight: 700,
                      whiteSpace: 'nowrap'
                    }}>
                      {item.difficulty}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nhóm 4: AI Trả phí bổ sung */}
          <div style={{ padding: '1.1765rem', borderRadius: '0.7059rem', border: '1px solid var(--border)', background: 'var(--surface-page)' }}>
            <h3 style={{ margin: '0 0 0.7059rem 0', display: 'flex', alignItems: 'center', gap: '0.4706rem', fontSize: '0.95rem', fontWeight: 800, color: 'var(--s3)' }}>
              <PlusCircle size={18} style={{ color: 'var(--s3)' }} /> Nhóm 4: AI trả phí bổ sung (Paid Add-ons đề xuất thuê thêm)
            </h3>
            <div className="grid-2" style={{ gap: '0.8235rem' }}>
              {currentAIDetails.paid.map((item, index) => (
                <div key={index} style={{ padding: '0.8235rem', borderRadius: '0.5882rem', border: '1px solid rgba(237, 161, 0, 0.12)', background: 'rgba(237, 161, 0, 0.02)' }}>
                  <h4 style={{ margin: '0 0 0.3529rem 0', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{item.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bảng tổng hợp chi phí */}
      <div className="card">
        <h2><DollarSign /> Bảng tổng hợp chi phí bản quyền AI của nhóm</h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem' }}>Thống kê các khoản chi phí thực tế mà team đã chi trả để trang bị bản quyền AI hỗ trợ lập trình — mỗi thành viên có 1 tài khoản riêng, kết hợp thêm gói miễn phí khi cần.</p>
        <div className="cross-table-scroll">
          <table className="cross-table">
            <thead>
              <tr>
                <th>Công cụ AI</th>
                <th>Đơn giá / Tháng</th>
                <th>Người sử dụng chính</th>
                <th>Mục tiêu sử dụng chính</th>
                <th>Ưu thế tối ưu chi phí (Free Option)</th>
              </tr>
            </thead>
            <tbody>
              {costTableRows.map((row, i) => (
                <tr key={i}>
                  <td><b>{row.tool}</b></td>
                  <td>{row.price}</td>
                  <td>{row.user}</td>
                  <td>{row.purpose}</td>
                  <td><span style={{ color: row.freeOption.colorVar ? `var(${row.freeOption.colorVar})` : 'var(--text-muted)', fontWeight: row.freeOption.colorVar ? 700 : 400 }}>{row.freeOption.text}</span></td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(0,0,0,0.01)', fontWeight: 800 }}>
                <td>{costTableTotal.label}</td>
                <td style={{ color: 'var(--critical)' }}>{costTableTotal.amount}</td>
                <td>{costTableTotal.team}</td>
                <td>{costTableTotal.note}</td>
                <td><span style={{ color: 'var(--s1)', fontWeight: 800 }}>{costTableTotal.freeGoal}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Rulebook warning */}
      <div className="card" style={{ display: 'flex', gap: '0.9412rem', alignItems: 'flex-start', background: 'rgba(245, 159, 0, 0.06)', borderColor: 'rgba(245, 159, 0, 0.2)' }}>
        <ShieldAlert style={{ color: 'var(--warning)', flexShrink: 0, marginTop: '0.1176rem' }} size={24} />
        <div>
          <h3 style={{ margin: '0 0 0.3529rem 0', fontSize: '0.98rem', fontWeight: 700, color: 'var(--warning)' }}>Lưu ý bản quyền &amp; Quy chế thi đấu</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Mọi đoạn code được sinh bởi AI cần được khai báo minh bạch trong **AI Collaboration Log** nộp kèm dự án. Ban giám khảo có quyền loại các đội thi sao chép mã nguồn bất hợp pháp hoặc không thể giải thích cách hoạt động của giải pháp AI của mình.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIResource;
