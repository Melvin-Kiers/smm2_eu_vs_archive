import React, { useEffect, useState } from "react";
import pids from "../components/pids";
import { predictUnknowns } from "../utils/predictUnknowns";

const DebugPredictUnknowns = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = `https://tgrcode.com/mm2/user_info_multiple/${pids.join(",")}`;
        const res = await fetch(url);
        const data = await res.json();
        setUsers(data.users);

        // --- Voorspel unk13 & unk14 ---
        predictUnknowns(data.users);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (!users.length) return <p>No players found.</p>;

  return (
    <div className="container py-4">
      <h1>Predicting unk13 & unk14</h1>
      <p>Check the console for the predicted formulas and top 5 players.</p>
    </div>
  );
};

export default DebugPredictUnknowns;
