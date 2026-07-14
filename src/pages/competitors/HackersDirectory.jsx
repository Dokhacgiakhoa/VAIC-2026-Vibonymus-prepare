import React, { useMemo, useState } from 'react';
import { Search, Code2, Link2, Globe, UserSearch } from 'lucide-react';
import { filterMembers, filterSoloHackers } from '../../utils/directoryUtils';

const HackersDirectory = ({ members, soloHackers }) => {
  const [query, setQuery] = useState('');
  const [soloQuery, setSoloQuery] = useState('');

  const filteredMembers = useMemo(() => filterMembers(members, query), [members, query]);
  const filteredSolo = useMemo(() => filterSoloHackers(soloHackers, soloQuery), [soloHackers, soloQuery]);

  return (
    <div className="flex-column" style={{ gap: '24px' }}>
      <div className="card" style={{ margin: 0 }}>
        <h2>Tất cả hacker đã có đội ({members.length})</h2>
        <p className="sub" style={{ margin: '0 0 16px' }}>
          Toàn bộ hồ sơ thành viên đã cào được từ hub.aiforvietnam.org (không tính Vibonymus).
        </p>

        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên, đội, nghề nghiệp, kỹ năng..."
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              background: 'var(--surface-page)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
          Hiển thị {filteredMembers.length} / {members.length} hacker
        </div>

        <div className="flex-column custom-scrollbar" style={{ gap: '10px', maxHeight: '640px', overflowY: 'auto', paddingRight: '6px' }}>
          {filteredMembers.map(({ member, team }) => (
            <div key={`${team.slug}:${member.handle}`} style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--surface-page)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {member.name}{member.isLeader ? ' (Đội trưởng)' : ''}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>Team {team.name}</div>
                </div>
                {(member.links?.github || member.links?.linkedin || member.links?.website) && (
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    {member.links.github && <a href={member.links.github} target="_blank" rel="noreferrer" title="GitHub" style={{ color: 'var(--text-muted)' }}><Code2 size={14} /></a>}
                    {member.links.linkedin && <a href={member.links.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" style={{ color: 'var(--text-muted)' }}><Link2 size={14} /></a>}
                    {member.links.website && <a href={member.links.website} target="_blank" rel="noreferrer" title="Website" style={{ color: 'var(--text-muted)' }}><Globe size={14} /></a>}
                  </div>
                )}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                <div><b>Nghề nghiệp:</b> {(member.occupations || []).join(', ') || 'Chưa cập nhật'}</div>
                <div><b>Kỹ năng:</b> {(member.skills || []).join(', ') || 'Chưa cập nhật'}</div>
              </div>
            </div>
          ))}

          {filteredMembers.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Không tìm thấy hacker nào khớp.
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ margin: 0, background: 'rgba(237, 161, 0, 0.04)', borderColor: 'rgba(237, 161, 0, 0.2)' }}>
        <h2><UserSearch size={20} /> Hacker đang tìm đội ({soloHackers.length})</h2>
        <p className="sub" style={{ margin: '0 0 16px' }}>
          Lấy từ form đăng ký (Google Sheet) — các hacker đã đăng ký nhưng chưa điền tên đội. Dữ liệu đăng ký thô,
          khác với hồ sơ chính thức trên hub. Không hiển thị email.
        </p>

        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={soloQuery}
            onChange={(e) => setSoloQuery(e.target.value)}
            placeholder="Tìm theo tên, lĩnh vực quan tâm, kỹ năng..."
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              background: 'var(--surface-page)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
          Hiển thị {filteredSolo.length} / {soloHackers.length} hacker
        </div>

        <div className="flex-column custom-scrollbar" style={{ gap: '10px', maxHeight: '480px', overflowY: 'auto', paddingRight: '6px' }}>
          {filteredSolo.map((h, index) => (
            <div key={index} style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--surface-page)', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{h['Full Name'] || 'Chưa rõ tên'}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                {h['Field of interest'] && <div><b>Lĩnh vực quan tâm:</b> {h['Field of interest']}</div>}
                {h['Skills/ Role/Experience'] && <div><b>Kỹ năng/Vai trò:</b> {h['Skills/ Role/Experience']}</div>}
                {h['Note (thông tin thêm của người tham dự)'] && <div><b>Ghi chú:</b> {h['Note (thông tin thêm của người tham dự)']}</div>}
                {h['Link linkedin/Sđt'] && <div><b>LinkedIn/SĐT:</b> {h['Link linkedin/Sđt']}</div>}
              </div>
            </div>
          ))}

          {filteredSolo.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Không tìm thấy hacker nào khớp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackersDirectory;
