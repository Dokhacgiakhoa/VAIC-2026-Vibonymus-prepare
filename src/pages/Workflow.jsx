import React, { useState } from 'react';
import { GitBranch, Cpu, Clock, ArrowRight, Users, CheckCircle2, Terminal, Layout, Layers, RotateCcw, MessageCircle, Flag, Mic } from 'lucide-react';
import { roles, syncCheckpoints, sharedChannels, timelineSteps, aiCollaborationFlow } from '../data/workflow-data';

// Layout constants for the SVG flowchart (px, in the SVG's own coordinate space)
const OUTER_MARGIN = 24;
const PHASE_RAIL_W = 76;
const PHASE_RAIL_GAP = 24;
const MARGIN_X = OUTER_MARGIN + PHASE_RAIL_W + PHASE_RAIL_GAP; // lanes start after the left phase rail
const LANE_W = 260;
const BE_FE_GAP = 150; // gap between Quân and Hiếu
const QUAN_X = MARGIN_X;
const HIEU_X = QUAN_X + LANE_W + BE_FE_GAP;
const ROW_RIGHT_EDGE = HIEU_X + LANE_W;
const SYNC_X = MARGIN_X;
const SYNC_W = ROW_RIGHT_EDGE - MARGIN_X; // 820
const SYNC_CX = SYNC_X + SYNC_W / 2; // 440
const DIAMOND_W = SYNC_W * 0.66;
const DIAMOND_LEFT_X = SYNC_CX - DIAMOND_W / 2;
const DIAMOND_RIGHT_X = SYNC_CX + DIAMOND_W / 2;
const LOOP_X = ROW_RIGHT_EDGE + 40;
const HUB_X = LOOP_X + 90;
const HUB_W = 80;
const VIEW_W = HUB_X + HUB_W + OUTER_MARGIN;

const KAI_H = 148;
const GAP_KAI_TO_ROLE = 64;
const ROLE_H = 148;
const ARROW1 = 70;
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
  const quanRole = roles.find((r) => r.key === 'quan');
  const hieuRole = roles.find((r) => r.key === 'hieu');

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
            {['s1', 's2', 's3', 's4', 'muted'].map((c) => (
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
          <text x={HUB_X + HUB_W / 2} y={(hubTop + hubBottom) / 2} fill="var(--s4)" fontSize="13.5" fontWeight="800" textAnchor="middle" transform={`rotate(-90 ${HUB_X + HUB_W / 2} ${(hubTop + hubBottom) / 2})`}>
            KÊNH PHỐI HỢP CHUNG
          </text>

          {/* Start node — circle (terminator) */}
          <circle cx={SYNC_CX} cy={startY + START_H / 2} r={START_H / 2} fill="var(--s4)" stroke="var(--s4)" strokeWidth="2" style={{ filter: 'drop-shadow(0 4px 10px rgba(74,58,167,0.25))' }} />
          <foreignObject x={SYNC_CX - START_H / 2 + 8} y={startY + 8} width={START_H - 16} height={START_H - 16}>
            <div style={{ height: '100%', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', fontWeight: 800, fontSize: '0.7rem', lineHeight: 1.25, textAlign: 'center' }}>
              <Flag size={18} />
              <span>BẮT ĐẦU</span>
              <span style={{ fontWeight: 600, fontSize: '0.62rem' }}>11:00 · 17/07</span>
            </div>
          </foreignObject>
          {/* Start -> K.AI: the PM is the single entry point who receives and analyzes the brief */}
          <path d={`M ${SYNC_CX} ${startY + START_H} L ${SYNC_CX} ${layout[0].kaiY}`} stroke="var(--s4)" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-s4)" />

          {layout.map((row, i) => {
            const midY = row.syncY + SYNC_H / 2;
            const isLast = i === layout.length - 1;

            return (
              <React.Fragment key={i}>
                {/* Left Phase Rail Section */}
                <rect x={OUTER_MARGIN} y={row.kaiY} width={PHASE_RAIL_W} height={row.syncY + SYNC_H - row.kaiY} rx="8" fill="rgba(90, 73, 204, 0.04)" stroke="var(--border)" strokeWidth="1" />
                <text x={OUTER_MARGIN + PHASE_RAIL_W / 2} y={(row.kaiY + row.syncY + SYNC_H) / 2} fill="var(--theme-color)" fontSize="14" fontWeight="800" textAnchor="middle" style={{ letterSpacing: '0.12em' }} transform={`rotate(-90 ${OUTER_MARGIN + PHASE_RAIL_W / 2} ${(row.kaiY + row.syncY + SYNC_H) / 2})`}>
                  {(row.phase.time + ' - ' + row.phase.phase).toUpperCase()}
                </text>

                {/* K.AI PM Box */}
                <g filter="url(#node-shadow)">
                  <rect x={SYNC_CX - LANE_W / 2} y={row.kaiY} width={LANE_W} height={KAI_H} rx="12" fill="var(--surface-1)" stroke="var(--s1)" strokeWidth="2.5" />
                  <rect x={SYNC_CX - LANE_W / 2} y={row.kaiY} width={LANE_W} height="38" rx="12" fill="var(--s1)" style={{ clipPath: 'inset(0px 0px 10px 0px)' }} />
                </g>
                <foreignObject x={SYNC_CX - LANE_W / 2 + 10} y={row.kaiY} width={LANE_W - 20} height={KAI_H}>
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '28px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800 }}>
                      <span>{kaiRole.name}</span>
                      <span style={{ fontSize: '0.68rem', background: 'rgba(255,255,255,0.2)', padding: '1px 6px', borderRadius: '4px' }}>CHỦ TRÌ</span>
                    </div>
                    <div style={{ flex: 1, padding: '8px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                      <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)', fontWeight: 700, lineHeight: 1.35 }}>{row.phase.kai}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--s4)', fontWeight: 700 }}>🤖 {kaiRole.aiTool}</div>
                    </div>
                  </div>
                </foreignObject>

                {/* K.AI -> Quân (Backend) direction arrow (orthogonal) */}
                <path d={`M ${SYNC_CX - LANE_W / 4} ${row.kaiY + KAI_H} L ${SYNC_CX - LANE_W / 4} ${row.kaiY + KAI_H + GAP_KAI_TO_ROLE / 2} L ${QUAN_X + LANE_W / 2} ${row.kaiY + KAI_H + GAP_KAI_TO_ROLE / 2} L ${QUAN_X + LANE_W / 2} ${row.roleY}`} stroke="var(--s1)" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-s1)" />
                {/* K.AI -> Hiếu (Frontend) direction arrow (orthogonal) */}
                <path d={`M ${SYNC_CX + LANE_W / 4} ${row.kaiY + KAI_H} L ${SYNC_CX + LANE_W / 4} ${row.kaiY + KAI_H + GAP_KAI_TO_ROLE / 2} L ${HIEU_X + LANE_W / 2} ${row.kaiY + KAI_H + GAP_KAI_TO_ROLE / 2} L ${HIEU_X + LANE_W / 2} ${row.roleY}`} stroke="var(--s1)" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-s1)" />

                {/* Quân (Backend / DB) Box */}
                <g filter="url(#node-shadow)">
                  <rect x={QUAN_X} y={row.roleY} width={LANE_W} height={ROLE_H} rx="12" fill="var(--surface-1)" stroke="var(--s2)" strokeWidth="2" />
                  <rect x={QUAN_X} y={row.roleY} width={LANE_W} height="38" rx="12" fill="var(--s2)" style={{ clipPath: 'inset(0px 0px 10px 0px)' }} />
                </g>
                <foreignObject x={QUAN_X + 10} y={row.roleY} width={LANE_W - 20} height={ROLE_H}>
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '28px', color: '#fff', display: 'flex', alignItems: 'center', fontSize: '0.8rem', fontWeight: 800 }}>{quanRole.name}</div>
                    <div style={{ flex: 1, padding: '8px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.35 }}>{row.phase.quan}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--s4)', fontWeight: 700 }}>🤖 {quanRole.aiTool}</div>
                    </div>
                  </div>
                </foreignObject>

                {/* Peer-to-peer peer link (Quân ↔ Hiếu) */}
                <path d={`M ${QUAN_X + LANE_W} ${row.roleY + ROLE_H / 2} L ${HIEU_X} ${row.roleY + ROLE_H / 2}`} stroke="var(--s4)" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                <foreignObject x={QUAN_X + LANE_W + 15} y={row.roleY + ROLE_H / 2 - 12} width={BE_FE_GAP - 30} height={24}>
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', color: 'var(--s4)', fontWeight: 800, background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: '4px' }}>
                    phối hợp trực tiếp
                  </div>
                </foreignObject>

                {/* Hiếu (Frontend / UX) Box */}
                <g filter="url(#node-shadow)">
                  <rect x={HIEU_X} y={row.roleY} width={LANE_W} height={ROLE_H} rx="12" fill="var(--surface-1)" stroke="var(--s3)" strokeWidth="2" />
                  <rect x={HIEU_X} y={row.roleY} width={LANE_W} height="38" rx="12" fill="var(--s3)" style={{ clipPath: 'inset(0px 0px 10px 0px)' }} />
                </g>
                <foreignObject x={HIEU_X + 10} y={row.roleY} width={LANE_W - 20} height={ROLE_H}>
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '28px', color: '#fff', display: 'flex', alignItems: 'center', fontSize: '0.8rem', fontWeight: 800 }}>{hieuRole.name}</div>
                    <div style={{ flex: 1, padding: '8px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.35 }}>{row.phase.hieu}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--s4)', fontWeight: 700 }}>🤖 {hieuRole.aiTool}</div>
                    </div>
                  </div>
                </foreignObject>

                {/* Trunk path Quân -> sync check */}
                <path d={`M ${QUAN_X + LANE_W / 2} ${row.roleY + ROLE_H} L ${QUAN_X + LANE_W / 2} ${row.roleY + ROLE_H + ARROW1 / 2} L ${SYNC_CX} ${row.roleY + ROLE_H + ARROW1 / 2}`} stroke="var(--s2)" strokeWidth="2" fill="none" />
                {/* Trunk path Hiếu -> sync check */}
                <path d={`M ${HIEU_X + LANE_W / 2} ${row.roleY + ROLE_H} L ${HIEU_X + LANE_W / 2} ${row.roleY + ROLE_H + ARROW1 / 2} L ${SYNC_CX} ${row.roleY + ROLE_H + ARROW1 / 2}`} stroke="var(--s3)" strokeWidth="2" fill="none" />
                {/* Combined trunk to sync check */}
                <path
                  d={`M ${SYNC_CX} ${row.roleY + ROLE_H + ARROW1 / 2} L ${SYNC_CX} ${row.syncY}`}
                  stroke="rgb(36, 135, 131)" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-mix)"
                />

                {/* Sync check diamond */}
                <polygon
                  points={`${SYNC_CX},${row.syncY} ${DIAMOND_RIGHT_X},${midY} ${SYNC_CX},${row.syncY + SYNC_H} ${DIAMOND_LEFT_X},${midY}`}
                  fill="rgba(74, 58, 167, 0.1)" stroke="var(--s4)" strokeWidth="2" filter="url(#node-shadow)"
                />
                <foreignObject x={DIAMOND_LEFT_X + 24} y={row.syncY + 24} width={DIAMOND_W - 48} height={SYNC_H - 48}>
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 800, lineHeight: 1.3 }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--s4)', textTransform: 'uppercase', marginBottom: '3px', fontWeight: 800 }}>MỐC ĐỒNG BỘ</div>
                    {row.checkpoint}
                  </div>
                </foreignObject>

                {/* Loop-back to K.AI */}
                <path d={`M ${DIAMOND_RIGHT_X} ${midY} L ${LOOP_X} ${midY} L ${LOOP_X} ${row.kaiY + KAI_H / 2} L ${SYNC_CX + LANE_W / 2} ${row.kaiY + KAI_H / 2}`} stroke="var(--s4)" strokeWidth="2" strokeDasharray="4 3" fill="none" markerEnd="url(#arrow-s4)" />
                <foreignObject x={SYNC_CX + LANE_W / 2 + 15} y={row.kaiY + KAI_H / 2 - 20} width="220" height="20">
                  <div style={{ fontSize: '0.68rem', color: 'var(--s4)', fontWeight: 800, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <RotateCcw size={10} /> phản hồi lỗi → K.AI làm lại từ đầu
                  </div>
                </foreignObject>

                {/* Hub connection */}
                <path d={`M ${LOOP_X} ${midY} L ${HUB_X} ${midY}`} stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="1 4" fill="none" />
                {(() => {
                  const Icon = HUB_ICONS[i % HUB_ICONS.length];
                  return (
                    <foreignObject x={HUB_X - HUB_W / 2 + 15} y={midY - 11} width="22" height="22">
                      <Icon size={14} style={{ color: '#fff', background: 'var(--s4)', borderRadius: '50%', padding: '3px', boxSizing: 'border-box' }} />
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
            <div style={{ height: '100%', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', fontWeight: 800, fontSize: '0.76rem', lineHeight: 1.25, textAlign: 'center' }}>
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
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', opacity: 0.05, pointerEvents: 'none' }}>
          <GitBranch size={200} />
        </div>
        <h2><GitBranch /> Luồng vận hành &amp; Phối hợp chéo của Vibonymus</h2>
        <p className="sub" style={{ margin: '0 0 16px', maxWidth: '80%' }}>
          Quy trình làm việc tối ưu hóa hiệu năng kết hợp giữa <b>Năng lực con người</b> và <b>Sức mạnh AI hỗ trợ</b> trong suốt 48 giờ thi đấu Hackathon VAIC 2026.
        </p>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('unified')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: activeTab === 'unified' ? '1px solid var(--theme-color)' : '1px solid var(--border)',
              background: activeTab === 'unified' ? 'rgba(90, 73, 204, 0.05)' : 'var(--surface-1)',
              color: activeTab === 'unified' ? 'var(--theme-color)' : 'var(--text-secondary)',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <Layers size={16} /> Flow Chart
          </button>
          <button
            onClick={() => setActiveTab('timeflow')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: activeTab === 'timeflow' ? '1px solid var(--theme-color)' : '1px solid var(--border)',
              background: activeTab === 'timeflow' ? 'rgba(90, 73, 204, 0.05)' : 'var(--surface-1)',
              color: activeTab === 'timeflow' ? 'var(--theme-color)' : 'var(--text-secondary)',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <Clock size={16} /> Luồng thời gian 48h
          </button>
          <button
            onClick={() => setActiveTab('aiflow')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: activeTab === 'aiflow' ? '1px solid var(--theme-color)' : '1px solid var(--border)',
              background: activeTab === 'aiflow' ? 'rgba(90, 73, 204, 0.05)' : 'var(--surface-1)',
              color: activeTab === 'aiflow' ? 'var(--theme-color)' : 'var(--text-secondary)',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
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
          <p className="sub" style={{ margin: '0 0 20px' }}>
            Toàn bộ luồng vận hành 48h trong <b>một sơ đồ duy nhất</b>: <b>K.AI (PM)</b> đứng trên, phân tích đề bài và định hướng core cho cả 2 nhánh thực thi bên dưới; Quân &amp; Hiếu triển khai song song và vẫn phối hợp trực tiếp với nhau, trước khi cả 3 gặp lại ở mốc đồng bộ cuối mỗi giai đoạn — cùng một tầng kênh phối hợp chung chạy xuyên suốt bên dưới.
          </p>

          <WorkflowFlowchart roles={roles} timelineSteps={timelineSteps} syncCheckpoints={syncCheckpoints} />

          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', marginTop: '4px', padding: '12px 16px', borderRadius: '10px', background: 'var(--surface-page)', border: '1px solid var(--border)', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="18" height="14"><rect x="1" y="1" width="16" height="12" rx="2" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" /></svg> Hình chữ nhật = công việc (process) của từng thành viên</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="18" height="14"><polygon points="9,1 17,7 9,13 1,7" fill="none" stroke="var(--s4)" strokeWidth="1.5" /></svg> Hình thoi = mốc đồng bộ / quyết định (đạt hay phải làm lại)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="16" height="16"><circle cx="8" cy="8" r="7" fill="none" stroke="var(--s4)" strokeWidth="1.5" /></svg> Hình tròn = điểm bắt đầu / kết thúc luồng</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="var(--s1)" strokeWidth="2.5" /></svg> K.AI (PM) định hướng/giao việc core cho Quân &amp; Hiếu</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="var(--s4)" strokeWidth="2" strokeDasharray="3 3" /></svg> Quân ↔ Hiếu phối hợp trực tiếp (ngang hàng, không qua PM)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="var(--s4)" strokeWidth="2.5" /></svg> Luồng chính (bàn giao xuôi giữa giai đoạn)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="var(--s4)" strokeWidth="2.5" strokeDasharray="4 3" /></svg> Vòng lặp phản hồi lỗi — quay lại K.AI (đầu bàn giao) để làm lại</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="var(--text-muted)" strokeWidth="2.5" strokeDasharray="1 4" /></svg> Kết nối kênh phối hợp chung</span>
          </div>

          {/* Shared coordination channels detail */}
          <div style={{ marginTop: '22px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={16} style={{ color: 'var(--s4)' }} /> Chi tiết kênh phối hợp chung — chạy xuyên suốt cả 4 giai đoạn
            </div>
            <div className="grid-3">
              {sharedChannels.map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <div key={i} className="meta-card" style={{ borderTop: '3px solid var(--s4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
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
          <p className="sub" style={{ margin: '0 0 24px' }}>Mỗi giai đoạn, <b>K.AI (PM) chủ trì</b> phân tích &amp; định hướng core, sau đó Quân và Hiếu triển khai song song — vẫn phối hợp trực tiếp với nhau — trước khi cả 3 chuyển sang giai đoạn kế tiếp:</p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {timelineSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div style={{ border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', background: 'var(--surface-1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                      background: 'var(--theme-grad)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 900, fontSize: '0.95rem', boxShadow: 'var(--shadow-sm)'
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(90, 73, 204, 0.1)', color: 'var(--theme-color)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                        {step.time}
                      </span>
                      <h3 style={{ margin: '6px 0 0 0', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {step.phase}: {step.title}
                      </h3>
                    </div>
                  </div>

                  <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {step.desc}
                  </p>

                  {/* K.AI (PM) chủ trì trên cùng, định hướng xuống Quân + Hiếu triển khai song song bên dưới */}
                  <div className="meta-card" style={{ borderTop: '4px solid var(--s1)', marginBottom: '2px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <div className="meta-label" style={{ color: 'var(--s1)' }}>PM &amp; AI: K.AI</div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fff', background: 'var(--s1)', padding: '2px 8px', borderRadius: '10px', whiteSpace: 'nowrap' }}>CHỦ TRÌ</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.4' }}>
                      {step.kai}
                      <div style={{ marginTop: '8px', fontSize: '0.8rem', borderTop: '1px solid rgba(247, 103, 7, 0.15)', paddingTop: '6px' }}>
                        <b>Task chi tiết:</b> {step.tasks[0]}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-around', color: 'var(--text-muted)' }}>
                    <ArrowRight size={16} style={{ transform: 'rotate(90deg)' }} />
                    <ArrowRight size={16} style={{ transform: 'rotate(90deg)' }} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'stretch', gap: '10px', flexWrap: 'wrap' }}>
                    <div className="meta-card" style={{ flex: '1 1 200px', borderTop: '3px solid var(--s2)' }}>
                      <div className="meta-label" style={{ color: 'var(--s2)' }}>Backend / DB: Quân</div>
                      <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.4' }}>
                        {step.quan}
                        <div style={{ marginTop: '8px', fontSize: '0.8rem', borderTop: '1px solid rgba(25, 113, 194, 0.15)', paddingTop: '6px' }}>
                          <b>Task chi tiết:</b> {step.tasks[1]}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flexShrink: 0, fontSize: '0.68rem', fontWeight: 700, textAlign: 'center', gap: '2px', minWidth: '54px' }}>
                      <span>↔</span>
                      <span>phối hợp<br />trực tiếp</span>
                    </div>
                    <div className="meta-card" style={{ flex: '1 1 200px', borderTop: '3px solid var(--s3)' }}>
                      <div className="meta-label" style={{ color: 'var(--s3)' }}>Frontend / UX: Hiếu</div>
                      <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.4' }}>
                        {step.hieu}
                        <div style={{ marginTop: '8px', fontSize: '0.8rem', borderTop: '1px solid rgba(47, 158, 68, 0.15)', paddingTop: '6px' }}>
                          <b>Task chi tiết:</b> {step.tasks[2]}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Checklist and Coordination Plan Section */}
                  <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                    <div style={{ padding: '12px 14px', background: 'var(--surface-page)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--theme-color)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={13} style={{ color: 'var(--theme-color)' }} /> Checklist Hoàn thành &amp; Bàn giao
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {step.checklist.map((item, key) => <li key={key}>{item}</li>)}
                      </ul>
                    </div>
                    <div style={{ padding: '12px 14px', background: 'var(--surface-page)', borderRadius: '10px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--theme-color)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 0' }}>
                    <div style={{ width: '2px', height: '14px', background: 'var(--theme-color)' }}></div>
                    <ArrowRight size={20} style={{ color: 'var(--theme-color)', transform: 'rotate(90deg)' }} />
                    <div style={{ width: '2px', height: '14px', background: 'var(--theme-color)' }}></div>
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
          <p className="sub" style={{ margin: '0 0 20px' }}><b>K.AI (PM) chủ trì</b> phân tích &amp; định hướng core cho cả 2 nhánh; Quân và Hiếu mỗi người chủ trì 80% công việc của mình với AI, vẫn phối hợp trực tiếp với nhau và phản hồi ngược lại K.AI:</p>

          {/* Dải sơ đồ tổng quan */}
          <div className="overview-grid">
            <div className="overview-kai" style={{
              padding: '14px', borderRadius: '12px',
              border: '1px solid var(--border)', borderTop: '4px solid var(--s1)', background: 'var(--surface-page)', textAlign: 'center'
            }}>
              <Users size={18} style={{ color: 'var(--s1)', marginBottom: '6px' }} />
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{aiCollaborationFlow[0].role}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--s4)', fontWeight: 700, marginTop: '4px' }}>🤖 {aiCollaborationFlow[0].aiTool}</div>
            </div>

            <div className="overview-arrow">
              <ArrowRight size={18} style={{ transform: 'rotate(90deg)' }} />
            </div>
            <div style={{ gridColumn: '2' }}></div>
            <div className="overview-arrow">
              <ArrowRight size={18} style={{ transform: 'rotate(90deg)' }} />
            </div>

            {aiCollaborationFlow.slice(1).map((flow, index) => (
              <React.Fragment key={flow.role}>
                <div className="overview-member" style={{
                  padding: '14px', borderRadius: '12px',
                  border: '1px solid var(--border)', borderTop: `4px solid ${index === 0 ? 'var(--s2)' : 'var(--s3)'}`, background: 'var(--surface-page)', textAlign: 'center'
                }}>
                  <Users size={18} style={{ color: index === 0 ? 'var(--s2)' : 'var(--s3)', marginBottom: '6px' }} />
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{flow.role}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--s4)', fontWeight: 700, marginTop: '4px' }}>🤖 {flow.aiTool}</div>
                </div>
                {index === 0 && (
                  <div className="overview-collab">
                    <span>↔ phối hợp</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex-column" style={{ gap: '20px' }}>
            {aiCollaborationFlow.map((flow, index) => (
              <div key={index} className="grid-split" style={{ borderBottom: index !== aiCollaborationFlow.length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: '20px' }}>
                {/* Cột trái: Vai trò và AI Tool */}
                <div className="meta-card" style={{ borderLeft: '4px solid var(--s1)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Users size={16} style={{ color: 'var(--s1)' }} />
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{flow.role}</span>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--s4)', fontWeight: 800, textTransform: 'uppercase' }}>
                    🤖 Công cụ: {flow.aiTool}
                  </div>
                </div>

                {/* Cột phải: Chi tiết cách tương tác & sản phẩm đầu ra */}
                <div className="flex-column" style={{ gap: '10px' }}>
                  <div className="ai-point-card" style={{ borderLeftColor: index === 0 ? 'var(--s1)' : index === 1 ? 'var(--s2)' : 'var(--s3)' }}>
                    <div className="ai-point-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Terminal size={14} style={{ color: index === 0 ? 'var(--s1)' : index === 1 ? 'var(--s2)' : 'var(--s3)' }} /> Cách thức AI hỗ trợ (80% khối lượng việc)
                    </div>
                    <p className="ai-point-desc">{flow.usage}</p>
                    <div style={{ marginTop: '8px', borderTop: '1px solid var(--border)', paddingTop: '6px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>🛠️ Task cụ thể cùng AI:</span>
                      <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        {flow.tasks.map((task, key) => <li key={key}>{task}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="ai-point-card" style={{ borderLeftColor: index === 0 ? 'var(--s1)' : index === 1 ? 'var(--s2)' : 'var(--s3)' }}>
                    <div className="ai-point-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Layout size={14} style={{ color: index === 0 ? 'var(--s1)' : index === 1 ? 'var(--s2)' : 'var(--s3)' }} /> Phối hợp &amp; Bàn giao chéo (10% + 10%)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--theme-color)', marginBottom: '4px' }}>
                      {[
                        'K.AI → Quân & Hiếu (định hướng core cho cả 2)',
                        'Quân ↔ Hiếu (phối hợp ngang hàng) · Quân → K.AI (báo cáo)',
                        'Hiếu ↔ Quân (phối hợp ngang hàng) · Hiếu → K.AI (báo cáo)'
                      ][index]}
                    </div>
                    <p className="ai-point-desc">{flow.collaboration}</p>
                  </div>

                  <div className="ai-point-card" style={{ borderLeftColor: 'var(--s4)' }}>
                    <div className="ai-point-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <RotateCcw size={14} style={{ color: 'var(--s4)' }} /> Vòng lặp phản hồi &amp; Sửa lỗi (Feedback Loop)
                    </div>
                    <p className="ai-point-desc"><b>Quy trình:</b> {flow.feedbackLoop}</p>
                    <div style={{ marginTop: '8px', borderTop: '1px solid var(--border)', paddingTop: '6px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>📋 Checklist phối hợp an toàn:</span>
                      <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        {flow.checklist.map((item, key) => <li key={key}>{item}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Triết lý cộng tác AI */}
          <div className="oath-box" style={{
            marginTop: '20px',
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(32, 201, 151, 0.04)',
            border: '1px solid rgba(32, 201, 151, 0.15)',
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <CheckCircle2 style={{ color: 'var(--good)', flexShrink: 0 }} size={24} />
            <div style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
              <b>💡 Nguyên tắc Phân vai chéo 80-10-10</b>: Mỗi thành viên chủ trì đảm nhận <b>80%</b> khối lượng công việc chính của mình với sự trợ giúp đắc lực của AI (ví dụ: Quân code Backend). Hai thành viên còn lại sẽ hỗ trợ chéo mỗi người <b>10%</b> (góp ý logic, test lỗi, đóng góp ý kiến tối ưu trải nghiệm) để đảm bảo tính đồng bộ và không bị nghẽn mạch (bottleneck).
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workflow;
