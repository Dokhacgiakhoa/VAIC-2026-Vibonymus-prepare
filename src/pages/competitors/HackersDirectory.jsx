import React, { useMemo, useState } from 'react';
import { Search, Code2, Link2, Globe, UserSearch } from 'lucide-react';
import { filterMembers, filterSoloHackers } from '../../utils/directoryUtils';

const HackersDirectory = ({ members, soloHackers }) => {
  const [query, setQuery] = useState('');
  const [soloQuery, setSoloQuery] = useState('');

  const filteredMembers = useMemo(() => filterMembers(members, query), [members, query]);
  const filteredSolo = useMemo(() => filterSoloHackers(soloHackers, soloQuery), [soloHackers, soloQuery]);

  return (
    <div className="flex-column" style={{ gap: '1.4118rem' }}>
      <div className="card" style={{ margin: 0 }}>
        <h2>Tất cả hacker đã có đội ({members.length})</h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem' }}>
          Toàn bộ hồ sơ thành viên đã cào được từ hub.aiforvietnam.org (không tính Vibonymus).
        </p>

        <div style={{ position: 'relative', marginBottom: '0.9412rem' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.7059rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên, đội, nghề nghiệp, kỹ năng..."
            style={{
              width: '100%',
              padding: '0.5882rem 0.7059rem 0.5882rem 2.1176rem',
              borderRadius: '0.5882rem',
              border: '1px solid var(--border)',
              background: 'var(--surface-page)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5882rem' }}>
          Hiển thị {filteredMembers.length} / {members.length} hacker
        </div>

        <div className="flex-column custom-scrollbar" style={{ gap: '0.5882rem', maxHeight: '37.6471rem', overflowY: 'auto', paddingRight: '0.3529rem' }}>
          {filteredMembers.map(({ member, team }) => (
            <div key={`${team.slug}:${member.handle}`} style={{ padding: '0.7059rem 0.8235rem', borderRadius: '0.5882rem', background: 'var(--surface-page)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5882rem' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {member.name}{member.isLeader ? ' (Đội trưởng)' : ''}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.1176rem' }}>Team {team.name}</div>
                </div>
                {(member.links?.github || member.links?.linkedin || member.links?.website) && (
                  <div style={{ display: 'flex', gap: '0.4706rem', flexShrink: 0 }}>
                    {member.links.github && <a href={member.links.github} target="_blank" rel="noreferrer" title="GitHub" style={{ color: 'var(--text-muted)' }}><Code2 size={14} /></a>}
                    {member.links.linkedin && <a href={member.links.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" style={{ color: 'var(--text-muted)' }}><Link2 size={14} /></a>}
                    {member.links.website && <a href={member.links.website} target="_blank" rel="noreferrer" title="Website" style={{ color: 'var(--text-muted)' }}><Globe size={14} /></a>}
                  </div>
                )}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.3529rem', lineHeight: '1.5' }}>
                <div><b>Nghề nghiệp:</b> {(member.occupations || []).join(', ') || 'Chưa cập nhật'}</div>
                <div><b>Kỹ năng:</b> {(member.skills || []).join(', ') || 'Chưa cập nhật'}</div>
              </div>
            </div>
          ))}

          {filteredMembers.length === 0 && (
            <div style={{ padding: '1.4118rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Không tìm thấy hacker nào khớp.
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ margin: 0, background: 'rgba(237, 161, 0, 0.04)', borderColor: 'rgba(237, 161, 0, 0.2)' }}>
        <h2><UserSearch size={20} /> Hacker đang tìm đội ({soloHackers.length})</h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem' }}>
          Lấy từ form đăng ký (Google Sheet) — các hacker đã đăng ký nhưng chưa điền tên đội. Dữ liệu đăng ký thô,
          khác với hồ sơ chính thức trên hub. Không hiển thị email.
        </p>

        <div style={{ position: 'relative', marginBottom: '0.9412rem' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.7059rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={soloQuery}
            onChange={(e) => setSoloQuery(e.target.value)}
            placeholder="Tìm theo tên, lĩnh vực quan tâm, kỹ năng..."
            style={{
              width: '100%',
              padding: '0.5882rem 0.7059rem 0.5882rem 2.1176rem',
              borderRadius: '0.5882rem',
              border: '1px solid var(--border)',
              background: 'var(--surface-page)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5882rem' }}>
          Hiển thị {filteredSolo.length} / {soloHackers.length} hacker
        </div>

        <div className="flex-column custom-scrollbar" style={{ gap: '0.5882rem', maxHeight: '28.2353rem', overflowY: 'auto', paddingRight: '0.3529rem' }}>
          {filteredSolo.map((h, index) => (
            <div key={index} style={{ padding: '0.7059rem 0.8235rem', borderRadius: '0.5882rem', background: 'var(--surface-page)', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{h['Full Name'] || 'Chưa rõ tên'}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.3529rem', lineHeight: '1.5' }}>
                {h['Field of interest'] && <div><b>Lĩnh vực quan tâm:</b> {h['Field of interest']}</div>}
                {h['Skills/ Role/Experience'] && <div><b>Kỹ năng/Vai trò:</b> {h['Skills/ Role/Experience']}</div>}
                {h['Note (thông tin thêm của người tham dự)'] && <div><b>Ghi chú:</b> {h['Note (thông tin thêm của người tham dự)']}</div>}
                {h['Link linkedin/Sđt'] && <div><b>LinkedIn/SĐT:</b> {h['Link linkedin/Sđt']}</div>}
              </div>
            </div>
          ))}

          {filteredSolo.length === 0 && (
            <div style={{ padding: '1.4118rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Không tìm thấy hacker nào khớp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackersDirectory;
