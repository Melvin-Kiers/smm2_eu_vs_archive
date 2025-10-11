// src/pages/DebugUnknowns.jsx
import React, { useEffect, useState } from "react";
import pids from "../components/pids";

const DebugUnknowns = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = `https://tgrcode.com/mm2/user_info_multiple/${pids.join(",")}`;
        const res = await fetch(url);
        const text = await res.text();
        const data = JSON.parse(text, (key, value) => (key === "pid" ? String(value) : value));
        setUsers(data.users);

        const knownStats = [
          "versus_won",
          "versus_plays",
          "versus_kills",
          "versus_killed_by_others",
          "versus_disconnected",
        ];

        const unknownStats = [
          "multiplayer_stats_unk13",
          "multiplayer_stats_unk14",
        ];

        function pearsonCorrelation(x, y) {
          const n = x.length;
          const sumX = x.reduce((a, b) => a + b, 0);
          const sumY = y.reduce((a, b) => a + b, 0);
          const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
          const sumX2 = x.reduce((a, b) => a + b * b, 0);
          const sumY2 = y.reduce((a, b, i) => a + y[i] * y[i], 0);
          return (n * sumXY - sumX * sumY) / Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
        }

        // Bereken correlaties
        const output = unknownStats.map((unk) => {
          const correlations = knownStats.map((stat) => {
            const x = data.users.map(p => p[unk] || 0);
            const y = data.users.map(p => p[stat] || 0);
            return { stat, corr: pearsonCorrelation(x, y) };
          });

          const topPlayers = [...data.users]
            .sort((a, b) => (b[unk] || 0) - (a[unk] || 0))
            .slice(0, 15)
            .map(p => ({ name: p.name, value: p[unk] || 0 }));

          return { unk, correlations, topPlayers };
        });

        // Direct vergelijking van unk13 vs unk14
        const unk13Values = data.users.map(p => p.multiplayer_stats_unk13 || 0);
        const unk14Values = data.users.map(p => p.multiplayer_stats_unk14 || 0);
        const correlation13vs14 = pearsonCorrelation(unk13Values, unk14Values);

        setResults({ output, correlation13vs14 });

      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (!users.length) return <p>No players found.</p>;

  const correlationColor = (corr) => {
    const value = Math.min(Math.max(corr, -1), 1);
    const red = value < 0 ? 255 : Math.round(255 * (1 - value));
    const green = value > 0 ? 255 : Math.round(255 * (1 + value));
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div className="container py-4">
      <h1>Unknown Stats Analysis</h1>

      <h3>Direct Comparison of unk13 vs unk14</h3>
      <p>
        Pearson correlation between unk13 and unk14:{" "}
        <span style={{ color: correlationColor(results.correlation13vs14) }}>
          {results.correlation13vs14.toFixed(3)}
        </span>
      </p>

      {results.output.map(({ unk, correlations, topPlayers }) => (
        <div key={unk} style={{ marginBottom: "3rem" }}>
          <h2>{unk}</h2>
          <p>
            Correlations of <strong>{unk}</strong> with known stats
          </p>

          <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Known Stat</th>
                <th>Pearson Correlation</th>
              </tr>
            </thead>
            <tbody>
              {correlations.map(c => (
                <tr key={c.stat}>
                  <td>{c.stat}</td>
                  <td style={{ backgroundColor: correlationColor(c.corr), textAlign: "center" }}>
                    {c.corr.toFixed(3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 style={{ marginTop: "1rem" }}>Top 15 Players by {unk}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginTop: "0.5rem" }}>
            {topPlayers.map((p, index) => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: "2rem" }}>{index + 1}.</span>
                <span style={{ flex: 1 }}>{p.name}</span>
                <div style={{
                  height: "1rem",
                  width: `${p.value * 5}px`,
                  backgroundColor: "#6f42c1",
                  borderRadius: "3px"
                }} />
                <span style={{ marginLeft: "0.5rem" }}>{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DebugUnknowns;
