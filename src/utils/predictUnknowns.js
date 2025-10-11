// src/utils/predictUnknowns.js
export function predictUnknowns(users) {
  // Bekende stats
  const knownStats = [
    "versus_won",
    "versus_plays",
    "versus_kills",
    "versus_killed_by_others",
    "versus_disconnected",
  ];

  const unknownStats = ["multiplayer_stats_unk13", "multiplayer_stats_unk14"];

  // --- Helper: gemiddelde ---
  // eslint-disable-next-line
  function mean(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  // --- Helper: eenvoudige multiple linear regression met normal equations ---
  function linearRegression(X, y) {
    const n = X.length;
    const m = X[0].length;

    // Voeg bias-term (1) toe
    const Xb = X.map(row => [1, ...row]);

    // Bereken X^T * X
    const XtX = Array.from({ length: m + 1 }, () =>
      Array(m + 1).fill(0)
    );
    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= m; j++) {
        for (let k = 0; k <= m; k++) {
          XtX[j][k] += Xb[i][j] * Xb[i][k];
        }
      }
    }

    // Bereken X^T * y
    const Xty = Array(m + 1).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= m; j++) {
        Xty[j] += Xb[i][j] * y[i];
      }
    }

    // Los lineair systeem op met Gauss-eliminatie (simpele methode)
    const beta = gaussianSolve(XtX, Xty);
    return beta; // [bias, coef1, coef2, ...]
  }

  function gaussianSolve(A, b) {
    const n = A.length;
    const M = A.map((row, i) => [...row, b[i]]);

    for (let i = 0; i < n; i++) {
      // Pivot
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
      }
      [M[i], M[maxRow]] = [M[maxRow], M[i]];

      // Normaliseer
      const val = M[i][i];
      for (let j = i; j <= n; j++) M[i][j] /= val;

      // Elimineer
      for (let k = 0; k < n; k++) {
        if (k === i) continue;
        const factor = M[k][i];
        for (let j = i; j <= n; j++) {
          M[k][j] -= factor * M[i][j];
        }
      }
    }

    return M.map(row => row[n]);
  }

  // --- Bereken regressie voor elk unk ---
  unknownStats.forEach((unk) => {
    const X = users.map(u => knownStats.map(k => u[k] || 0));
    const y = users.map(u => u[unk] || 0);
    const coefs = linearRegression(X, y);

    console.log(`\n=== Prediction formula for ${unk} ===`);
    console.log(`Formula: ${unk} ≈ ${coefs[0].toFixed(2)} + ${knownStats.map((k, i) => `${coefs[i + 1].toFixed(2)}*${k}`).join(' + ')}`);

    // Top 5 players volgens voorspelde waarde
    const predicted = users.map(u => {
      const val = coefs.reduce((sum, c, i) => {
        if (i === 0) return c; // bias
        return sum + c * (u[knownStats[i - 1]] || 0);
      }, 0);
      return { name: u.name, predicted: val, actual: u[unk] || 0 };
    }).sort((a, b) => b.predicted - a.predicted)
      .slice(0, 50);

    console.table(predicted);
  });
}
