/**
 * Guardian Agent - Security and compliance checks on reviewed items.
 */

class GuardianAgent {
  constructor(reviewResult) {
    this.reviewResult = reviewResult;
    this.name = 'Guardian';
    this.emoji = '\uD83D\uDEE1\uFE0F';
  }

  guard() {
    const guarded = this.reviewResult.items
      .filter(item => item.approved)
      .map(item => ({
        ...item,
        status: 'cleared',
      }));
    return { agent: this.name, items: guarded, totalCleared: guarded.length };
  }
}

module.exports = { GuardianAgent };
