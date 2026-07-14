import React, { useMemo, useState } from 'react';
import { Search, ChevronDown, ChevronUp, Code2, Link2, Globe } from 'lucide-react';
import { filterTeams } from '../../utils/directoryUtils';

const TeamsDirectory = ({ teams }) => {
  const [query, setQuery] = useState('');
  const [expandedSlug, setExpandedSlug] = useState(null);

  const filtered = useMemo(() => filterTeams(teams, query), [teams, query]);

  return (
    <div className="card" style={{ margin: 0 }}>
      <h2>Tất cả đội thi ({teams.length})</h2>
      <p className="sub" style={{ margin: '0 0 16px' }}>
        Toàn bộ đội đã cào được từ hub.aiforvietnam.org. Bấm vào một đội để xem chi tiết từng thành viên.
      </p>

      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm theo tên đội, lĩnh vực, kỹ năng cần..."
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
        Hiển thị {filtered.length} / {teams.length} đội
      </div>

      <div className="flex-column custom-scrollbar" style={{ gap: '10px', maxHeight: '640px', overflowY: 'auto', paddingRight: '6px' }}>
        {filtered.map((team) => {
          const isExpanded = expandedSlug === team.slug;
          return (
            <div
              key={team.slug}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '12px',
                background: 'var(--surface-page)',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <div
                onClick={() => setExpandedSlug(isExpanded ? null : team.slug)}
                style={{
                  padding: '14px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Team {team.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {team.memberCount} thành viên · {(team.interests || []).join(', ') || 'Chưa cập nhật lĩnh vực'}
                  </div>
                </div>
                {isExpanded ? <ChevronUp size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
              </div>

              {isExpanded && (
                <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--border)' }}>
                  {(team.skillsNeeded || []).length > 0 && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '12px 0' }}>
                      <b>Kỹ năng cần:</b> {team.skillsNeeded.join(', ')}
                    </div>
                  )}
                  <div className="flex-column" style={{ gap: '10px' }}>
                    {team.members.map((m) => (
                      <div key={m.handle} style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                            {m.name}{m.isLeader ? ' (Đội trưởng)' : ''}
                          </div>
                          {(m.links?.github || m.links?.linkedin || m.links?.website) && (
                            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                              {m.links.github && <a href={m.links.github} target="_blank" rel="noreferrer" title="GitHub" style={{ color: 'var(--text-muted)' }}><Code2 size={14} /></a>}
                              {m.links.linkedin && <a href={m.links.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" style={{ color: 'var(--text-muted)' }}><Link2 size={14} /></a>}
                              {m.links.website && <a href={m.links.website} target="_blank" rel="noreferrer" title="Website" style={{ color: 'var(--text-muted)' }}><Globe size={14} /></a>}
                            </div>
                          )}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>
                          <div><b>Nghề nghiệp:</b> {(m.occupations || []).join(', ') || 'Chưa cập nhật'}</div>
                          <div><b>Ngành:</b> {(m.industries || []).join(', ') || 'Chưa cập nhật'}</div>
                          <div><b>Kỹ năng:</b> {(m.skills || []).join(', ') || 'Chưa cập nhật'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Không tìm thấy đội nào khớp.
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsDirectory;
