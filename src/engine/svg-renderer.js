/**
 * Renders a contribution grid as an animated SVG showing agents moving
 * through an agentic SDLC pipeline across the contribution graph.
 */

const { DAYS_IN_WEEK, WEEKS_IN_YEAR } = require('./contribution-grid');

const CELL_SIZE = 12;
const CELL_GAP = 3;
const PADDING = 40;
const AGENT_SIZE = 16;

const AGENTS = [
  { id: 'planner',  emoji: '\uD83E\uDDE0', label: 'Planner' },
  { id: 'builder',  emoji: '\uD83E\uDD16', label: 'Builder' },
  { id: 'reviewer', emoji: '\uD83D\uDD0D', label: 'Reviewer' },
  { id: 'guardian', emoji: '\uD83D\uDEE1\uFE0F',  label: 'Guardian' },
  { id: 'deployer', emoji: '\uD83D\uDE80', label: 'Deploy' },
];

function renderSvg(grid, theme) {
  const totalWidth = WEEKS_IN_YEAR * (CELL_SIZE + CELL_GAP) + PADDING * 2;
  const totalHeight = DAYS_IN_WEEK * (CELL_SIZE + CELL_GAP) + PADDING * 2 + 60;

  const cells = renderCells(grid, theme);
  const agents = renderAgents(totalWidth);
  const legend = renderLegend(theme, totalWidth, totalHeight);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}">
  <style>
    .cell { rx: 2; ry: 2; }
    .agent-label { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 10px; fill: ${theme.text}; }
    .title { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; fill: ${theme.text}; }
    .legend-label { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 10px; fill: ${theme.textMuted}; }
  </style>
  <rect width="${totalWidth}" height="${totalHeight}" fill="${theme.background}" rx="6"/>
  <text x="${PADDING}" y="${PADDING - 12}" class="title">${theme.title || 'AI Factory'}</text>
${cells}
${agents}
${legend}
</svg>`;
}

function renderCells(grid, theme) {
  const lines = [];
  for (const column of grid) {
    for (const cell of column) {
      const x = PADDING + cell.week * (CELL_SIZE + CELL_GAP);
      const y = PADDING + cell.day * (CELL_SIZE + CELL_GAP);
      const fill = theme.levels[cell.level];
      lines.push(`  <rect class="cell" x="${x}" y="${y}" width="${CELL_SIZE}" height="${CELL_SIZE}" fill="${fill}"/>`);
    }
  }
  return lines.join('\n');
}

function renderAgents(totalWidth) {
  const lines = [];
  const trackY = PADDING + DAYS_IN_WEEK * (CELL_SIZE + CELL_GAP) + 10;
  const duration = 8;

  AGENTS.forEach((agent, i) => {
    const delay = i * 1.5;
    const startX = PADDING - 20;
    const endX = totalWidth - PADDING;

    lines.push(`  <g>
    <text font-size="${AGENT_SIZE}" y="${trackY + 6}">
      ${agent.emoji}
      <animateTransform attributeName="transform" type="translate"
        values="${startX},0; ${endX},0; ${startX},0"
        dur="${duration}s" begin="${delay}s" repeatCount="indefinite"/>
    </text>
    <text class="agent-label" y="${trackY + 20}" x="${startX}">
      ${agent.label}
      <animateTransform attributeName="transform" type="translate"
        values="${startX},0; ${endX},0; ${startX},0"
        dur="${duration}s" begin="${delay}s" repeatCount="indefinite"/>
    </text>
  </g>`);
  });

  return lines.join('\n');
}

function renderLegend(theme, totalWidth, totalHeight) {
  const y = totalHeight - 20;
  const startX = totalWidth - PADDING - 120;
  const items = [];
  items.push(`  <text class="legend-label" x="${startX - 25}" y="${y + 9}">Less</text>`);
  for (let i = 0; i <= 4; i++) {
    const x = startX + i * (CELL_SIZE + 3);
    items.push(`  <rect class="cell" x="${x}" y="${y}" width="${CELL_SIZE}" height="${CELL_SIZE}" fill="${theme.levels[i]}"/>`);
  }
  items.push(`  <text class="legend-label" x="${startX + 5 * (CELL_SIZE + 3)}" y="${y + 9}">More</text>`);
  return items.join('\n');
}

module.exports = { renderSvg };
