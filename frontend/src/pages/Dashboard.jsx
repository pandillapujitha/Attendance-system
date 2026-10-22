import React, { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function Dashboard() {
  const [r, setR] = useState(null);
  useEffect(() => { api('/report').then(setR).catch(() => {}); }, []);
  if (!r) return <p>Loading...</p>;

  const avg = r.rows.length ? (r.rows.reduce((a, s) => a + s.percentage, 0) / r.rows.length).toFixed(1) : 0;
  const low = r.rows.filter(s => s.total > 0 && s.percentage < 75);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="card stat"><h3>{r.totalStudents}</h3><p>Total Students</p></div>
        <div className="card stat"><h3>{r.totalDays}</h3><p>Days Recorded</p></div>
        <div className="card stat"><h3>{avg}%</h3><p>Average Attendance</p></div>
        <div className="card stat warn"><h3>{low.length}</h3><p>Below 75%</p></div>
      </div>
      <div className="card">
        <h3>Students with low attendance</h3>
        {low.length === 0 ? <p>None 🎉</p> : (
          <table>
            <thead><tr><th>Roll No</th><th>Name</th><th>%</th></tr></thead>
            <tbody>{low.map(s => <tr key={s.id}><td>{s.rollNo}</td><td>{s.name}</td><td>{s.percentage}%</td></tr>)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}
