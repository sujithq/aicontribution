#!/usr/bin/env node

/**
 * AI Factory - Turn GitHub contributions into an agentic software factory.
 *
 * Usage:
 *   node src/index.js [--theme github|github-dark|azure|fabric] [--output path]
 */

const fs = require('fs');
const path = require('path');
const { generateSampleGrid } = require('./engine/contribution-grid');
const { renderSvg } = require('./engine/svg-renderer');
const { getTheme } = require('../themes');
const { PlannerAgent } = require('./planner-agent');
const { BuilderAgent } = require('./builder-agent');
const { ReviewAgent } = require('./review-agent');
const { GuardianAgent } = require('./guardian-agent');
const { DeployAgent } = require('./deploy-agent');

function parseArgs(argv) {
  const args = { theme: 'github', output: 'output/ai-factory.svg' };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--theme' && argv[i + 1]) args.theme = argv[++i];
    if (argv[i] === '--output' && argv[i + 1]) args.output = argv[++i];
  }
  return args;
}

function run(argv) {
  const args = parseArgs(argv || process.argv);
  const theme = getTheme(args.theme);

  // Generate contribution grid
  const grid = generateSampleGrid();

  // Run agentic pipeline
  const planner = new PlannerAgent(grid);
  const plan = planner.analyse();

  const builder = new BuilderAgent(plan);
  const buildResult = builder.build();

  const reviewer = new ReviewAgent(buildResult);
  const reviewResult = reviewer.review();

  const guardian = new GuardianAgent(reviewResult);
  const guardResult = guardian.guard();

  const deployer = new DeployAgent(guardResult);
  const deployResult = deployer.deploy();

  // Render SVG
  const svg = renderSvg(grid, theme);

  // Write output
  const outputPath = path.resolve(args.output);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, svg);

  console.log(`Theme: ${theme.name}`);
  console.log(`Pipeline: ${plan.totalHotspots} planned -> ${buildResult.totalBuilt} built -> ${reviewResult.totalReviewed} reviewed -> ${guardResult.totalCleared} cleared -> ${deployResult.deployed} deployed`);
  console.log(`Output: ${outputPath}`);

  return { svg, deployResult };
}

if (require.main === module) {
  run();
}

module.exports = { run };
