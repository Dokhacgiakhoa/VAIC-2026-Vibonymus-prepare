import React from 'react';
import { Award, Flame } from 'lucide-react';
import { mainPrizes, sponsorPrizes, teamGoalNote } from '../data/awards-data';

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
              {mainPrizes.map((p, i) => (
                <li key={i}><b>{p.title}:</b> {p.detail}</li>
              ))}
            </ul>
          </div>
          <div style={{ padding: '1.1765rem', background: 'var(--surface-page)', borderRadius: '0.9412rem', border: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.98rem', fontWeight: 700, margin: '0 0 0.7059rem 0', color: 'var(--s1)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Giải từ Nhà tài trợ (Tech &amp; Cloud)
            </h3>
            <ul className="checklist" style={{ paddingLeft: '0.8824rem' }}>
              {sponsorPrizes.map((p, i) => (
                <li key={i}><b>{p.title}:</b> {p.detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Target Note */}
      <div className="card" style={{ display: 'flex', gap: '0.9412rem', alignItems: 'flex-start', background: 'rgba(32, 201, 151, 0.06)', borderColor: 'rgba(32, 201, 151, 0.2)' }}>
        <Flame style={{ color: 'var(--good)', flexShrink: 0, marginTop: '0.1176rem' }} size={24} />
        <div>
          <h3 style={{ margin: '0 0 0.3529rem 0', fontSize: '0.98rem', fontWeight: 700, color: 'var(--good)' }}>Mục tiêu của team Vibonymus</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            {teamGoalNote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Awards;
