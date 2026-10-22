import React, { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function Reports() {
  const [r, setR] = useState(null);
  useEffect(() => { api('/report').then(setR); }, []);
  if (!r) return <p>Loading...</p>;

  const exportCSV = () => {
    const lines = ['Roll No,Name,Present,Absent,Total,Percentage'];
    r.rows.forEach(s => lines.push(`${s.rollNo},${s.name},${s.present},${s.absent},${s.total},${s.percentage}`));
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'attendance-report.csv'; a.click();
  };

  return (
    <div>
      <h1>Attendance Report</h1>
      <button className="btn" onClick={exportCSV}>Export CSV</button>
      <div className="card" style={{ marginTop: 16 }}>
        <table>
          <thead><tr><th>Roll No</th><th>Name</th><th>Present</th><th>Absent</th><th>Total</th><th>%</th></tr></thead>
          <tbody>
            {r.rows.map(s => (
              <tr key={s.id}>
                <td>{s.rollNo}</td><td>{s.name}</td><td>{s.present}</td><td>{s.absent}</td><td>{s.total}</td>
                <td className={s.total && s.percentage < 75 ? 'low' : ''}>{s.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
