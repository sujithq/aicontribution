/**
 * Generates a contribution grid data structure from GitHub contribution data.
 * Each cell represents a day with a contribution level (0-4).
 */

const DAYS_IN_WEEK = 7;
const WEEKS_IN_YEAR = 53;

function generateGrid(contributions) {
  const grid = [];
  for (let week = 0; week < WEEKS_IN_YEAR; week++) {
    const column = [];
    for (let day = 0; day < DAYS_IN_WEEK; day++) {
      const index = week * DAYS_IN_WEEK + day;
      const level = contributions && contributions[index] != null
        ? contributions[index]
        : 0;
      column.push({ week, day, level: Math.min(4, Math.max(0, level)) });
    }
    grid.push(column);
  }
  return grid;
}

function generateSampleGrid() {
  const grid = [];
  for (let week = 0; week < WEEKS_IN_YEAR; week++) {
    const column = [];
    for (let day = 0; day < DAYS_IN_WEEK; day++) {
      const seed = Math.sin(week * 7 + day * 13) * 10000;
      const level = Math.floor(Math.abs(seed) % 5);
      column.push({ week, day, level });
    }
    grid.push(column);
  }
  return grid;
}

module.exports = { generateGrid, generateSampleGrid, DAYS_IN_WEEK, WEEKS_IN_YEAR };
