import React, { useState } from 'react';
import { GitBranch, Cpu, Clock, ArrowRight, Users, CheckCircle2, Terminal, Layers, RotateCcw, MessageCircle, Flag, Mic } from 'lucide-react';
import { roles, syncCheckpoints, sharedChannels, timelineSteps, aiCollaborationFlow } from '../data/workflow-data';

// Layout constants for the SVG flowchart (px, in the SVG's own coordinate space)
// K.AI (Tech Lead) sits on top of every phase; the other 5 members sit in a row below,
// fed by a distribution bus from K.AI and merged back into a sync-check diamond.
const OUTER_MARGIN = 24;
const PHASE_RAIL_W = 70;
const PHASE_RAIL_GAP = 20;
const MARGIN_X = OUTER_MARGIN + PHASE_RAIL_W + PHASE_RAIL_GAP;
const LANE_W = 176;
const LANE_GAP = 18;

const KAI_W = 300;
const KAI_H = 128;
const GAP_KAI_TO_ROLE = 74;
const ROLE_H = 164;
const ARROW1 = 74;
const SYNC_H = 130;
const ARROW2 = 90;
const START_H = 100;
const END_H = 100;
const TOP_PAD = 34;
const GAP_START_TO_ROLE = 64;
const GAP_SYNC_TO_END = 60;

const HUB_ICONS = [GitBranch, MessageCircle, Users];

function WorkflowFlowchart({ roles, timelineSteps, syncCheckpoints }) {
  const kaiRole = roles.find((r) => r.key === 'kai');
  const belowRoles = roles.filter((r) => r.key !== 'kai');
  const N = belowRoles.length;

  const laneX = belowRoles.map((_, i) => MARGIN_X + i * (LANE_W + LANE_GAP));
  const laneCenterX = laneX.map((x) => x + LANE_W / 2);
  const ROW_RIGHT_EDGE = laneX[N - 1] + LANE_W;
  const SYNC_X = MARGIN_X;
  const SYNC_W = ROW_RIGHT_EDGE - MARGIN_X;
  const SYNC_CX = SYNC_X + SYNC_W / 2;
  const DIAMOND_W = SYNC_W * 0.42;
  const DIAMOND_LEFT_X = SYNC_CX - DIAMOND_W / 2;
  const DIAMOND_RIGHT_X = SYNC_CX + DIAMOND_W / 2;
  const LOOP_X = ROW_RIGHT_EDGE + 40;
  const HUB_X = LOOP_X + 80;
  const HUB_W = 70;
  const VIEW_W = HUB_X + HUB_W + OUTER_MARGIN;

  const layout = [];
  let cursorY = TOP_PAD + START_H + GAP_START_TO_ROLE;
  timelineSteps.forEach((phase, i) => {
    const kaiY = cursorY;
    const roleY = kaiY + KAI_H + GAP_KAI_TO_ROLE;
    const syncY = roleY + ROLE_H + ARROW1;
    layout.push({ phase, kaiY, roleY, syncY, checkpoint: syncCheckpoints[i] });
    cursorY = syncY + SYNC_H + ARROW2;
  });
  const startY = TOP_PAD;
  const lastSyncY = layout[layout.length - 1].syncY;
  const endY = lastSyncY + SYNC_H + GAP_SYNC_TO_END;
  const viewH = endY + END_H + TOP_PAD;
  const hubTop = layout[0].kaiY;
  const hubBottom = lastSyncY + SYNC_H;

  return (
    <div className="gantt-scroll">
      <div style={{ minWidth: `${VIEW_W}px` }}>
        <svg viewBox={`0 0 ${VIEW_W} ${viewH}`} width="100%" style={{ display: 'block', overflow: 'visible', filter: 'drop-shadow(0 10px 24px rgba(26,26,25,0.16)) drop-shadow(0 2px 6px rgba(26,26,25,0.08))' }}>
          <defs>
            {['s1', 's4', 'muted'].map((c) => (
              <marker key={c} id={`arrow-${c}`} viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill={c === 'muted' ? 'var(--text-muted)' : `var(--${c})`} />
              </marker>
            ))}
            <marker id="arrow-mix" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="rgb(36, 135, 131)" />
            </marker>
            <filter id="node-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#1a1a19" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Hub rail — shared coordination channels running through all phases */}
          <rect x={HUB_X} y={hubTop} width={HUB_W} height={hubBottom - hubTop} rx="14" fill="rgba(74, 58, 167, 0.06)" stroke="var(--s4)" strokeDasharray="3 4" strokeWidth="1.5" />
          <text x={HUB_X + HUB_W / 2} y={(hubTop + hubBottom) / 2} fill="var(--s4)" fontSize="12.5" fontWeight="800" textAnchor="middle" transform={`rotate(-90 ${HUB_X + HUB_W / 2} ${(hubTop + hubBottom) / 2})`}>
            KÊNH PHỐI HỢP CHUNG
          </text>

          {/* Start node — circle (terminator) */}
          <circle cx={SYNC_CX} cy={startY + START_H / 2} r={START_H / 2} fill="var(--s4)" stroke="var(--s4)" strokeWidth="2" style={{ filter: 'drop-shadow(0 4px 10px rgba(74,58,167,0.25))' }} />
          <foreignObject x={SYNC_CX - START_H / 2 + 8} y={startY + 8} width={START_H - 16} height={START_H - 16}>
            <div style={{ height: '100%', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.1176rem', fontWeight: 800, fontSize: '0.7rem', lineHeight: 1.25, textAlign: 'center' }}>
              <Flag size={18} />
              <span>BẮT ĐẦU</span>
              <span style={{ fontWeight: 600, fontSize: '0.62rem' }}>11:00 · 17/07</span>
            </div>
          </foreignObject>
          <path d={`M ${SYNC_CX} ${startY + START_H} L ${SYNC_CX} ${layout[0].kaiY}`} stroke="var(--s4)" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-s4)" />

          {layout.map((row, i) => {
            const midY = row.syncY + SYNC_H / 2;
            const isLast = i === layout.length - 1;
            const busY = row.kaiY + KAI_H + GAP_KAI_TO_ROLE / 2;
            const mergeY = row.roleY + ROLE_H + ARROW1 / 2;

            return (
              <React.Fragment key={i}>
                {/* Left Phase Rail Section */}
                <rect x={OUTER_MARGIN} y={row.kaiY} width={PHASE_RAIL_W} height={row.syncY + SYNC_H - row.kaiY} rx="8" fill="rgba(90, 73, 204, 0.04)" stroke="var(--border)" strokeWidth="1" />
                <text x={OUTER_MARGIN + PHASE_RAIL_W / 2} y={(row.kaiY + row.syncY + SYNC_H) / 2} fill="var(--theme-color)" fontSize="13" fontWeight="800" textAnchor="middle" style={{ letterSpacing: '0.1em' }} transform={`rotate(-90 ${OUTER_MARGIN + PHASE_RAIL_W / 2} ${(row.kaiY + row.syncY + SYNC_H) / 2})`}>
                  {(row.phase.time + ' - ' + row.phase.phase).toUpperCase()}
                </text>

                {/* K.AI Tech Lead box */}
                <g filter="url(#node-shadow)">
                  <rect x={SYNC_CX - KAI_W / 2} y={row.kaiY} width={KAI_W} height={KAI_H} rx="12" fill="var(--surface-1)" stroke="var(--s1)" strokeWidth="2.5" />
                  <rect x={SYNC_CX - KAI_W / 2} y={row.kaiY} width={KAI_W} height="36" rx="12" fill="var(--s1)" style={{ clipPath: 'inset(0px 0px 10px 0px)' }} />
                </g>
                <foreignObject x={SYNC_CX - KAI_W / 2 + 10} y={row.kaiY} width={KAI_W - 20} height={KAI_H}>
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '1.5882rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800 }}>
                      <span>{kaiRole.name}</span>
                      <span style={{ fontSize: '0.66rem', background: 'rgba(255,255,255,0.2)', padding: '0.0588rem 0.3529rem', borderRadius: '0.2353rem' }}>TECH LEAD</span>
                    </div>
                    <div style={{ flex: 1, padding: '0.4118rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.2353rem' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 700, lineHeight: 1.3 }}>{row.phase.tasks.kai}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--s4)', fontWeight: 700 }}>🤖 {kaiRole.aiTool}</div>
                    </div>
                  </div>
                </foreignObject>

                {/* Distribution bus: K.AI -> each lane below */}
                <path d={`M ${SYNC_CX} ${row.kaiY + KAI_H} L ${SYNC_CX} ${busY}`} stroke="var(--s1)" strokeWidth="2.5" fill="none" />
                <path d={`M ${laneCenterX[0]} ${busY} L ${laneCenterX[N - 1]} ${busY}`} stroke="var(--s1)" strokeWidth="2" fill="none" />
                {laneCenterX.map((cx, li) => (
                  <path key={li} d={`M ${cx} ${busY} L ${cx} ${row.roleY}`} stroke="var(--s1)" strokeWidth="2" fill="none" markerEnd="url(#arrow-s1)" />
                ))}

                {/* Role lane boxes */}
                {belowRoles.map((role, li) => (
                  <React.Fragment key={role.key}>
                    <g filter="url(#node-shadow)">
                      <rect x={laneX[li]} y={row.roleY} width={LANE_W} height={ROLE_H} rx="12" fill="var(--surface-1)" stroke={role.color} strokeWidth="2" />
                      <rect x={laneX[li]} y={row.roleY} width={LANE_W} height="34" rx="12" fill={role.color} style={{ clipPath: 'inset(0px 0px 10px 0px)' }} />
                    </g>
                    <foreignObject x={laneX[li] + 8} y={row.roleY} width={LANE_W - 16} height={ROLE_H}>
                      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', fontSize: '0.7rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{role.name}</div>
                        <div style={{ flex: 1, padding: '0.3529rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.2353rem' }}>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.3 }}>{row.phase.tasks[role.key]}</div>
                          <div style={{ fontSize: '0.66rem', color: 'var(--s4)', fontWeight: 700 }}>🤖 {role.aiTool}</div>
                        </div>
                      </div>
                    </foreignObject>
                    {/* Trunk from this lane -> merge bus */}
                    <path d={`M ${laneCenterX[li]} ${row.roleY + ROLE_H} L ${laneCenterX[li]} ${mergeY}`} stroke={role.color} strokeWidth="2" fill="none" />
                  </React.Fragment>
                ))}

                {/* Merge bus -> sync diamond */}
                <path d={`M ${laneCenterX[0]} ${mergeY} L ${laneCenterX[N - 1]} ${mergeY}`} stroke="rgb(36, 135, 131)" strokeWidth="2" fill="none" />
                <path d={`M ${SYNC_CX} ${mergeY} L ${SYNC_CX} ${row.syncY}`} stroke="rgb(36, 135, 131)" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-mix)" />

                {/* Sync check diamond */}
                <polygon
                  points={`${SYNC_CX},${row.syncY} ${DIAMOND_RIGHT_X},${midY} ${SYNC_CX},${row.syncY + SYNC_H} ${DIAMOND_LEFT_X},${midY}`}
                  fill="rgba(74, 58, 167, 0.1)" stroke="var(--s4)" strokeWidth="2" filter="url(#node-shadow)"
                />
                <foreignObject x={DIAMOND_LEFT_X + 20} y={row.syncY + 22} width={DIAMOND_W - 40} height={SYNC_H - 44}>
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '0.76rem', color: 'var(--text-primary)', fontWeight: 800, lineHeight: 1.25 }}>
                    <div style={{ fontSize: '0.64rem', color: 'var(--s4)', textTransform: 'uppercase', marginBottom: '0.1765rem', fontWeight: 800 }}>MỐC ĐỒNG BỘ</div>
                    {row.checkpoint}
                  </div>
                </foreignObject>

                {/* Loop-back to K.AI */}
                <path d={`M ${DIAMOND_RIGHT_X} ${midY} L ${LOOP_X} ${midY} L ${LOOP_X} ${row.kaiY + KAI_H / 2} L ${SYNC_CX + KAI_W / 2} ${row.kaiY + KAI_H / 2}`} stroke="var(--s4)" strokeWidth="2" strokeDasharray="4 3" fill="none" markerEnd="url(#arrow-s4)" />
                <foreignObject x={SYNC_CX + KAI_W / 2 + 15} y={row.kaiY + KAI_H / 2 - 20} width="220" height="20">
                  <div style={{ fontSize: '0.66rem', color: 'var(--s4)', fontWeight: 800, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.1765rem' }}>
                    <RotateCcw size={10} /> phản hồi lỗi → K.AI làm lại từ đầu
                  </div>
                </foreignObject>

                {/* Hub connection */}
                <path d={`M ${LOOP_X} ${midY} L ${HUB_X} ${midY}`} stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="1 4" fill="none" />
                {(() => {
                  const Icon = HUB_ICONS[i % HUB_ICONS.length];
                  return (
                    <foreignObject x={HUB_X - HUB_W / 2 + 15} y={midY - 11} width="22" height="22">
                      <Icon size={14} style={{ color: '#fff', background: 'var(--s4)', borderRadius: '50%', padding: '0.1765rem', boxSizing: 'border-box' }} />
                    </foreignObject>
                  );
                })()}

                {/* Arrow to next phase */}
                {!isLast && (
                  <path d={`M ${SYNC_CX} ${row.syncY + SYNC_H} L ${SYNC_CX} ${layout[i + 1].kaiY}`} stroke="var(--s4)" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-s4)" />
                )}
                {isLast && (
                  <path d={`M ${SYNC_CX} ${row.syncY + SYNC_H} L ${SYNC_CX} ${endY}`} stroke="var(--s4)" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-s4)" />
                )}
              </React.Fragment>
            );
          })}

          {/* End node — circle (terminator) */}
          <circle cx={SYNC_CX} cy={endY + END_H / 2} r={END_H / 2} fill="var(--s4)" stroke="var(--s4)" strokeWidth="2" style={{ filter: 'drop-shadow(0 4px 10px rgba(74,58,167,0.25))' }} />
          <foreignObject x={SYNC_CX - END_H / 2 + 8} y={endY + 8} width={END_H - 16} height={END_H - 16}>
            <div style={{ height: '100%', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.1176rem', fontWeight: 800, fontSize: '0.76rem', lineHeight: 1.25, textAlign: 'center' }}>
              <Mic size={18} />
              <span>KẾT THÚC</span>
              <span style={{ fontWeight: 600, fontSize: '0.68rem' }}>Pitching Day</span>
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}

const Workflow = () => {
  const [activeTab, setActiveTab] = useState('unified');

  return (
    <div className="page-content">
      {/* Tiêu đề & Triết lý vận hành */}
      <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-2.3529rem', right: '-2.3529rem', opacity: 0.05, pointerEvents: 'none' }}>
          <GitBranch size={200} />
        </div>
        <h2><GitBranch /> Luồng vận hành &amp; Phối hợp chéo của Vibonymus</h2>
        <p className="sub" style={{ margin: '0 0 0.9412rem', maxWidth: '80%' }}>
          Quy trình làm việc tối ưu hóa hiệu năng kết hợp giữa <b>Năng lực con người</b> và <b>Sức mạnh AI hỗ trợ</b> trong suốt 48 giờ thi đấu Hackathon VAIC 2026 — 6 thành viên, mỗi người 1 tài khoản AI riêng.
        </p>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '0.5882rem', marginTop: '1.1765rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('unified')}
            style={{
              padding: '0.5882rem 1.0588rem',
              borderRadius: '0.4706rem',
              border: activeTab === 'unified' ? '1px solid var(--theme-color)' : '1px solid var(--border)',
              background: activeTab === 'unified' ? 'rgba(90, 73, 204, 0.05)' : 'var(--surface-1)',
              color: activeTab === 'unified' ? 'var(--theme-color)' : 'var(--text-secondary)',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4706rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Layers size={16} /> Flow Chart
          </button>
          <button
            onClick={() => setActiveTab('timeflow')}
            style={{
              padding: '0.5882rem 1.0588rem',
              borderRadius: '0.4706rem',
              border: activeTab === 'timeflow' ? '1px solid var(--theme-color)' : '1px solid var(--border)',
              background: activeTab === 'timeflow' ? 'rgba(90, 73, 204, 0.05)' : 'var(--surface-1)',
              color: activeTab === 'timeflow' ? 'var(--theme-color)' : 'var(--text-secondary)',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4706rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Clock size={16} /> Luồng thời gian 48h
          </button>
          <button
            onClick={() => setActiveTab('aiflow')}
            style={{
              padding: '0.5882rem 1.0588rem',
              borderRadius: '0.4706rem',
              border: activeTab === 'aiflow' ? '1px solid var(--theme-color)' : '1px solid var(--border)',
              background: activeTab === 'aiflow' ? 'rgba(90, 73, 204, 0.05)' : 'var(--surface-1)',
              color: activeTab === 'aiflow' ? 'var(--theme-color)' : 'var(--text-secondary)',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4706rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Cpu size={16} /> Quy trình tương tác Multi-AI
          </button>
        </div>
      </div>

      {/* UNIFIED DIAGRAM PANEL: members × AI × phases + feedback loops + shared hub */}
      {activeTab === 'unified' && (
        <div className="card">
          <h2><Layers /> Flow Chart: Thành viên × AI × Giai đoạn</h2>
          <p className="sub" style={{ margin: '0 0 1.1765rem' }}>
            Toàn bộ luồng vận hành 48h trong <b>một sơ đồ duy nhất</b>: <b>K.AI (Tech Lead)</b> đứng trên, giao việc xuống 5 mảng bên dưới (Quân, Mai, Quang, Lâm, Yến) triển khai song song, trước khi cả 5 gặp lại nhau ở mốc đồng bộ cuối mỗi giai đoạn — cùng một tầng kênh phối hợp chung chạy xuyên suốt bên dưới.
          </p>

          <WorkflowFlowchart roles={roles} timelineSteps={timelineSteps} syncCheckpoints={syncCheckpoints} />

          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.0588rem', marginTop: '0.2353rem', padding: '0.7059rem 0.9412rem', borderRadius: '0.5882rem', background: 'var(--surface-page)', border: '1px solid var(--border)', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem' }}><svg width="18" height="14"><rect x="1" y="1" width="16" height="12" rx="2" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" /></svg> Hình chữ nhật = công việc (process) của từng thành viên</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem' }}><svg width="18" height="14"><polygon points="9,1 17,7 9,13 1,7" fill="none" stroke="var(--s4)" strokeWidth="1.5" /></svg> Hình thoi = mốc đồng bộ / quyết định (đạt hay phải làm lại)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem' }}><svg width="16" height="16"><circle cx="8" cy="8" r="7" fill="none" stroke="var(--s4)" strokeWidth="1.5" /></svg> Hình tròn = điểm bắt đầu / kết thúc luồng</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem' }}><svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="var(--s1)" strokeWidth="2.5" /></svg> K.AI (Tech Lead) giao việc xuống cả 5 mảng bên dưới</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem' }}><svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="rgb(36, 135, 131)" strokeWidth="2.5" /></svg> Cả 5 mảng hội tụ về mốc đồng bộ cuối giai đoạn</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem' }}><svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="var(--s4)" strokeWidth="2.5" strokeDasharray="4 3" /></svg> Vòng lặp phản hồi lỗi — quay lại K.AI (đầu bàn giao) để làm lại</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem' }}><svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="var(--text-muted)" strokeWidth="2.5" strokeDasharray="1 4" /></svg> Kết nối kênh phối hợp chung</span>
          </div>

          {/* Shared coordination channels detail */}
          <div style={{ marginTop: '1.2941rem', paddingTop: '1.1765rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.7059rem', display: 'flex', alignItems: 'center', gap: '0.4706rem' }}>
              <Users size={16} style={{ color: 'var(--s4)' }} /> Chi tiết kênh phối hợp chung — chạy xuyên suốt cả 4 giai đoạn
            </div>
            <div className="grid-3">
              {sharedChannels.map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <div key={i} className="meta-card" style={{ borderTop: '3px solid var(--s4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4706rem', marginBottom: '0.3529rem' }}>
                      <Icon size={16} style={{ color: 'var(--s4)' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{ch.label}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{ch.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TIMEFLOW PANEL */}
      {activeTab === 'timeflow' && (
        <div className="card">
          <h2><Clock /> Dòng thời gian &amp; Phân công công việc 48h</h2>
          <p className="sub" style={{ margin: '0 0 1.4118rem' }}>Mỗi giai đoạn, <b>K.AI (Tech Lead) định hướng chung</b>, sau đó 5 thành viên còn lại triển khai song song mảng của mình, trước khi cả team chuyển sang giai đoạn kế tiếp:</p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {timelineSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div style={{ border: '1px solid var(--border)', borderRadius: '0.8235rem', padding: '1.1765rem', background: 'var(--surface-1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7059rem', marginBottom: '0.5882rem' }}>
                    <div style={{
                      width: '2.1176rem', height: '2.1176rem', borderRadius: '50%', flexShrink: 0,
                      background: 'var(--theme-grad)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 900, fontSize: '0.95rem', boxShadow: 'var(--shadow-sm)'
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(90, 73, 204, 0.1)', color: 'var(--theme-color)', padding: '0.1176rem 0.4706rem', borderRadius: '0.2353rem', textTransform: 'uppercase' }}>
                        {step.time}
                      </span>
                      <h3 style={{ margin: '0.3529rem 0 0 0', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {step.phase}: {step.title}
                      </h3>
                    </div>
                  </div>

                  <p style={{ margin: '0 0 0.9412rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {step.desc}
                  </p>

                  {/* K.AI (Tech Lead) trên cùng, định hướng xuống 5 mảng triển khai song song bên dưới */}
                  <div className="meta-card" style={{ borderTop: '4px solid var(--s1)', marginBottom: '0.7059rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4706rem' }}>
                      <div className="meta-label" style={{ color: 'var(--s1)' }}>Tech Lead & Backend/DB: K.AI</div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fff', background: 'var(--s1)', padding: '0.1176rem 0.4706rem', borderRadius: '0.5882rem', whiteSpace: 'nowrap' }}>ĐỊNH HƯỚNG</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.3529rem', lineHeight: '1.4' }}>
                      {step.tasks.kai}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--text-muted)', marginBottom: '0.4706rem' }}>
                    <ArrowRight size={16} style={{ transform: 'rotate(90deg)' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(11.7647rem, 1fr))', gap: '0.5882rem' }}>
                    {roles.filter((r) => r.key !== 'kai').map((role) => (
                      <div key={role.key} className="meta-card" style={{ borderTop: `3px solid ${role.color}` }}>
                        <div className="meta-label" style={{ color: role.color }}>{role.name}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3529rem', lineHeight: '1.4' }}>
                          {step.tasks[role.key]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Checklist and Coordination Plan Section */}
                  <div style={{ marginTop: '0.9412rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(16.4706rem, 1fr))', gap: '0.7059rem' }}>
                    <div style={{ padding: '0.7059rem 0.8235rem', background: 'var(--surface-page)', borderRadius: '0.5882rem', border: '1px solid var(--border)' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--theme-color)', marginBottom: '0.4706rem', display: 'flex', alignItems: 'center', gap: '0.3529rem' }}>
                        <CheckCircle2 size={13} style={{ color: 'var(--theme-color)' }} /> Checklist Hoàn thành &amp; Bàn giao
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '0.9412rem', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {step.checklist.map((item, key) => <li key={key}>{item}</li>)}
                      </ul>
                    </div>
                    <div style={{ padding: '0.7059rem 0.8235rem', background: 'var(--surface-page)', borderRadius: '0.5882rem', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--theme-color)', marginBottom: '0.3529rem', display: 'flex', alignItems: 'center', gap: '0.3529rem' }}>
                        <Clock size={13} style={{ color: 'var(--theme-color)' }} /> Kế hoạch &amp; Điểm chạm Phối hợp
                      </div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        {step.plan}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mũi tên nối sang giai đoạn kế tiếp */}
                {index !== timelineSteps.length - 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.2353rem 0' }}>
                    <div style={{ width: '0.1176rem', height: '0.8235rem', background: 'var(--theme-color)' }}></div>
                    <ArrowRight size={20} style={{ color: 'var(--theme-color)', transform: 'rotate(90deg)' }} />
                    <div style={{ width: '0.1176rem', height: '0.8235rem', background: 'var(--theme-color)' }}></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* AIFLOW PANEL */}
      {activeTab === 'aiflow' && (
        <div className="card">
          <h2><Cpu /> Sơ đồ luồng tương tác Multi-AI của Team</h2>
          <p className="sub" style={{ margin: '0 0 1.1765rem' }}><b>Mỗi người 1 tài khoản AI riêng</b>, chủ động với mảng việc của mình và luôn báo cáo/phản hồi ngược lại K.AI ở mỗi mốc đồng bộ:</p>

          {/* Dải sơ đồ tổng quan */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5882rem', marginBottom: '1.4118rem' }}>
            <div style={{
              padding: '0.8235rem 1.1765rem', borderRadius: '0.7059rem', width: '100%', maxWidth: '17.6471rem',
              border: '1px solid var(--border)', borderTop: '4px solid var(--s1)', background: 'var(--surface-page)', textAlign: 'center'
            }}>
              <Users size={18} style={{ color: 'var(--s1)', marginBottom: '0.3529rem' }} />
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{aiCollaborationFlow[0].role}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--s4)', fontWeight: 700, marginTop: '0.2353rem' }}>🤖 {aiCollaborationFlow[0].aiTool}</div>
            </div>
            <ArrowRight size={18} style={{ color: 'var(--text-muted)', transform: 'rotate(90deg)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(9.4118rem, 1fr))', gap: '0.7059rem', width: '100%' }}>
              {aiCollaborationFlow.slice(1).map((flow) => {
                const roleColor = roles.find((r) => flow.role.startsWith(r.name.split(' ')[0]))?.color || 'var(--s2)';
                return (
                  <div key={flow.role} style={{
                    padding: '0.8235rem', borderRadius: '0.7059rem',
                    border: '1px solid var(--border)', borderTop: `4px solid ${roleColor}`, background: 'var(--surface-page)', textAlign: 'center'
                  }}>
                    <Users size={18} style={{ color: roleColor, marginBottom: '0.3529rem' }} />
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{flow.role}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--s4)', fontWeight: 700, marginTop: '0.2353rem' }}>🤖 {flow.aiTool}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-column" style={{ gap: '1.1765rem' }}>
            {aiCollaborationFlow.map((flow, index) => {
              const role = roles.find((r) => flow.role.startsWith(r.name.split(' ')[0])) || roles[index] || roles[0];
              return (
                <div key={index} className="grid-split" style={{ borderBottom: index !== aiCollaborationFlow.length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: '1.1765rem' }}>
                  {/* Cột trái: Vai trò và AI Tool */}
                  <div className="meta-card" style={{ borderLeft: `4px solid ${role.color}`, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4706rem', marginBottom: '0.3529rem' }}>
                      <Users size={16} style={{ color: role.color }} />
                      <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{flow.role}</span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--s4)', fontWeight: 800, textTransform: 'uppercase' }}>
                      🤖 Công cụ: {flow.aiTool}
                    </div>
                  </div>

                  {/* Cột phải: Chi tiết cách tương tác & sản phẩm đầu ra */}
                  <div className="flex-column" style={{ gap: '0.5882rem' }}>
                    <div className="ai-point-card" style={{ borderLeftColor: role.color }}>
                      <div className="ai-point-title" style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem' }}>
                        <Terminal size={14} style={{ color: role.color }} /> Cách thức AI hỗ trợ
                      </div>
                      <p className="ai-point-desc">{flow.usage}</p>
                      <div style={{ marginTop: '0.4706rem', borderTop: '1px solid var(--border)', paddingTop: '0.3529rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>🛠️ Task cụ thể cùng AI:</span>
                        <ul style={{ margin: '0.2353rem 0 0 0', paddingLeft: '0.9412rem', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                          {flow.tasks.map((task, key) => <li key={key}>{task}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className="ai-point-card" style={{ borderLeftColor: role.color }}>
                      <div className="ai-point-title" style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem' }}>
                        <Layers size={14} style={{ color: role.color }} /> Phối hợp &amp; Bàn giao chéo
                      </div>
                      <p className="ai-point-desc">{flow.collaboration}</p>
                    </div>

                    <div className="ai-point-card" style={{ borderLeftColor: 'var(--s4)' }}>
                      <div className="ai-point-title" style={{ display: 'flex', alignItems: 'center', gap: '0.3529rem' }}>
                        <RotateCcw size={14} style={{ color: 'var(--s4)' }} /> Vòng lặp phản hồi &amp; Sửa lỗi (Feedback Loop)
                      </div>
                      <p className="ai-point-desc"><b>Quy trình:</b> {flow.feedbackLoop}</p>
                      <div style={{ marginTop: '0.4706rem', borderTop: '1px solid var(--border)', paddingTop: '0.3529rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>📋 Checklist phối hợp an toàn:</span>
                        <ul style={{ margin: '0.2353rem 0 0 0', paddingLeft: '0.9412rem', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                          {flow.checklist.map((item, key) => <li key={key}>{item}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Triết lý cộng tác AI */}
          <div className="oath-box" style={{
            marginTop: '1.1765rem',
            padding: '0.9412rem',
            borderRadius: '0.7059rem',
            background: 'rgba(32, 201, 151, 0.04)',
            border: '1px solid rgba(32, 201, 151, 0.15)',
            display: 'flex',
            gap: '0.7059rem',
            alignItems: 'center'
          }}>
            <CheckCircle2 style={{ color: 'var(--good)', flexShrink: 0 }} size={24} />
            <div style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
              <b>💡 Nguyên tắc phân vai theo năng lực thật</b>: Mỗi mảng việc có 1 (hoặc 2, với AI Core & Security) người phụ trách chính, dùng AI riêng của mình để tăng tốc (K.AI/Quang/Lâm: Claude Pro · Quân: Claude Max 5x · Mai/Yến: Gemini Pro). Tất cả báo cáo và phản hồi chéo với K.AI ở mỗi mốc đồng bộ để đảm bảo tính đồng bộ, không bị nghẽn mạch (bottleneck).
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workflow;
