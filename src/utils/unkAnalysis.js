// src/utils/unkAnalysis.js
export function analyzeUnknowns(players) {
  function pearsonCorrelation(x, y) {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
    const sumX2 = x.reduce((a, b) => a + b * b, 0);
    const sumY2 = y.reduce((a, b, i) => a + y[i] * y[i], 0);
    return (n * sumXY - sumX * sumY) / Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
  }

  const knownStats = [
    "versus_won",
    "versus_plays",
    "versus_kills",
    "versus_killed_by_others",
    "versus_disconnected"
  ];

  const unknownStats = [
    "multiplayer_stats_unk13",
    "multiplayer_stats_unk14"
  ];

  unknownStats.forEach((unk) => {
    console.log(`\n=== Correlations for ${unk} ===`);
    knownStats.forEach((stat) => {
      const x = players.map(p => p[unk] || 0);
      const y = players.map(p => p[stat] || 0);
      const corr = pearsonCorrelation(x, y);
      console.log(`${stat}: ${corr.toFixed(3)}`);
    });

    const topPlayers = [...players]
      .sort((a, b) => (b[unk] || 0) - (a[unk] || 0))
      .slice(0, 5)
      .map(p => ({ name: p.name, value: p[unk] || 0 }));

    console.table(topPlayers);
  });
}
