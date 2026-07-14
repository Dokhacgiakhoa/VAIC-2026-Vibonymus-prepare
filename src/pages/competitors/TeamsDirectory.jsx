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
      <p className="sub" style={{ margin: '0 0 0.9412rem' }}>
        Toàn bộ đội đã cào được từ hub.aiforvietnam.org. Bấm vào một đội để xem chi tiết từng thành viên.
      </p>

      <div style={{ position: 'relative', marginBottom: '0.9412rem' }}>
        <Search size={16} style={{ position: 'absolute', left: '0.7059rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm theo tên đội, lĩnh vực, kỹ năng cần..."
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
        Hiển thị {filtered.length} / {teams.length} đội
      </div>

      <div className="flex-column custom-scrollbar" style={{ gap: '0.5882rem', maxHeight: '37.6471rem', overflowY: 'auto', paddingRight: '0.3529rem' }}>
        {filtered.map((team) => {
          const isExpanded = expandedSlug === team.slug;
          return (
            <div
              key={team.slug}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '0.7059rem',
                background: 'var(--surface-page)',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <div
                onClick={() => setExpandedSlug(isExpanded ? null : team.slug)}
                style={{
                  padding: '0.8235rem 0.9412rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  gap: '0.7059rem',
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Team {team.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2353rem' }}>
                    {team.memberCount} thành viên · {(team.interests || []).join(', ') || 'Chưa cập nhật lĩnh vực'}
                  </div>
                </div>
                {isExpanded ? <ChevronUp size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
              </div>

              {isExpanded && (
                <div style={{ padding: '0 0.9412rem 0.9412rem', borderTop: '1px solid var(--border)' }}>
                  {(team.skillsNeeded || []).length > 0 && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0.7059rem 0' }}>
                      <b>Kỹ năng cần:</b> {team.skillsNeeded.join(', ')}
                    </div>
                  )}
                  <div className="flex-column" style={{ gap: '0.5882rem' }}>
                    {team.members.map((m) => (
                      <div key={m.handle} style={{ padding: '0.5882rem 0.7059rem', borderRadius: '0.5882rem', background: 'var(--surface-1)', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5882rem' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                            {m.name}{m.isLeader ? ' (Đội trưởng)' : ''}
                          </div>
                          {(m.links?.github || m.links?.linkedin || m.links?.website) && (
                            <div style={{ display: 'flex', gap: '0.4706rem', flexShrink: 0 }}>
                              {m.links.github && <a href={m.links.github} target="_blank" rel="noreferrer" title="GitHub" style={{ color: 'var(--text-muted)' }}><Code2 size={14} /></a>}
                              {m.links.linkedin && <a href={m.links.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" style={{ color: 'var(--text-muted)' }}><Link2 size={14} /></a>}
                              {m.links.website && <a href={m.links.website} target="_blank" rel="noreferrer" title="Website" style={{ color: 'var(--text-muted)' }}><Globe size={14} /></a>}
                            </div>
                          )}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.2353rem', lineHeight: '1.5' }}>
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
          <div style={{ padding: '1.4118rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Không tìm thấy đội nào khớp.
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsDirectory;
