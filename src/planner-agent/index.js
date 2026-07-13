/**
 * Planner Agent - Analyses the contribution graph and plans work items.
 * In the visualisation this agent scans across the grid identifying
 * areas of activity and proposing tasks.
 */

class PlannerAgent {
  constructor(grid) {
    this.grid = grid;
    this.name = 'Planner';
    this.emoji = '\uD83E\uDDE0';
  }

  analyse() {
    const hotspots = [];
    for (const column of this.grid) {
      for (const cell of column) {
        if (cell.level >= 3) {
          hotspots.push({ week: cell.week, day: cell.day, level: cell.level });
        }
      }
    }
    return { agent: this.name, hotspots, totalHotspots: hotspots.length };
  }
}

module.exports = { PlannerAgent };
