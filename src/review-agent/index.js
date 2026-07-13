/**
 * Review Agent - Reviews built items for quality.
 */

class ReviewAgent {
  constructor(buildResult) {
    this.buildResult = buildResult;
    this.name = 'Reviewer';
    this.emoji = '\uD83D\uDD0D';
  }

  review() {
    const reviewed = this.buildResult.items.map(item => ({
      ...item,
      status: 'reviewed',
      approved: item.level >= 3,
    }));
    return { agent: this.name, items: reviewed, totalReviewed: reviewed.length };
  }
}

module.exports = { ReviewAgent };
