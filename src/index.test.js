const { describe, it } = require('node:test');
const assert = require('node:assert');
const { generateGrid, generateSampleGrid, WEEKS_IN_YEAR, DAYS_IN_WEEK } = require('./engine/contribution-grid');
const { renderSvg } = require('./engine/svg-renderer');
const { getTheme } = require('../themes');
const { PlannerAgent } = require('./planner-agent');
const { BuilderAgent } = require('./builder-agent');
const { ReviewAgent } = require('./review-agent');
const { GuardianAgent } = require('./guardian-agent');
const { DeployAgent } = require('./deploy-agent');
const { run } = require('./index');

describe('contribution-grid', () => {
  it('generates a sample grid with correct dimensions', () => {
    const grid = generateSampleGrid();
    assert.strictEqual(grid.length, WEEKS_IN_YEAR);
    assert.strictEqual(grid[0].length, DAYS_IN_WEEK);
  });

  it('generates grid from input data', () => {
    const data = new Array(WEEKS_IN_YEAR * DAYS_IN_WEEK).fill(2);
    const grid = generateGrid(data);
    assert.strictEqual(grid[0][0].level, 2);
  });

  it('clamps levels between 0 and 4', () => {
    const grid = generateGrid([10, -1]);
    assert.strictEqual(grid[0][0].level, 4);
    assert.strictEqual(grid[0][1].level, 0);
  });
});

describe('themes', () => {
  it('returns github theme by default', () => {
    const theme = getTheme('unknown');
    assert.strictEqual(theme.name, 'github');
  });

  it('returns requested theme', () => {
    const theme = getTheme('github-dark');
    assert.strictEqual(theme.name, 'github-dark');
  });
});

describe('svg-renderer', () => {
  it('produces valid SVG markup', () => {
    const grid = generateSampleGrid();
    const theme = getTheme('github');
    const svg = renderSvg(grid, theme);
    assert.ok(svg.startsWith('<svg'));
    assert.ok(svg.includes('</svg>'));
    assert.ok(svg.includes('AI Factory'));
  });
});

describe('agent pipeline', () => {
  it('runs full pipeline', () => {
    const grid = generateSampleGrid();
    const plan = new PlannerAgent(grid).analyse();
    assert.ok(plan.totalHotspots > 0);

    const buildResult = new BuilderAgent(plan).build();
    assert.strictEqual(buildResult.totalBuilt, plan.totalHotspots);

    const reviewResult = new ReviewAgent(buildResult).review();
    assert.strictEqual(reviewResult.totalReviewed, buildResult.totalBuilt);

    const guardResult = new GuardianAgent(reviewResult).guard();
    assert.ok(guardResult.totalCleared <= reviewResult.totalReviewed);

    const deployResult = new DeployAgent(guardResult).deploy();
    assert.strictEqual(deployResult.status, 'success');
  });
});

describe('run', () => {
  it('generates SVG output', () => {
    const result = run(['node', 'index.js', '--theme', 'azure', '--output', '/tmp/test-output.svg']);
    assert.ok(result.svg.includes('<svg'));
    assert.strictEqual(result.deployResult.status, 'success');
  });
});
