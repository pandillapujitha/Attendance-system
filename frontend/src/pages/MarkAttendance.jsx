import React, { useEffect, useState } from 'react';
import { api } from '../api.js';

const today = () => new Date().toISOString().slice(0, 10);

export default function MarkAttendance() {
  const [date, setDate] = useState(today());
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => {
    Promise.all([api('/students'), api(`/attendance/${date}`)]).then(([s, saved]) => {
      setStudents(s);
      const init = {};
      s.forEach(st => (init[st.id] = saved[st.id] || 'Present'));
      setRecords(init);
    });
  }, [date]);

  const toggle = (id, status) => setRecords({ ...records, [id]: status });
  const markAll = status => {
    const r = {};
    students.forEach(s => (r[s.id] = status));
    setRecords(r);
  };
  const save = async () => {
    await api('/attendance', 'POST', { date, records });
    setMsg('Attendance saved ✔');
    setTimeout(() => setMsg(''), 2500);
  };

  return (
    <div>
      <h1>Mark Attendance</h1>
      <div className="card form-row">
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button className="btn secondary" onClick={() => markAll('Present')}>All Present</button>
        <button className="btn secondary" onClick={() => markAll('Absent')}>All Absent</button>
        <button className="btn" onClick={save}>Save</button>
        {msg && <span className="success">{msg}</span>}
      </div>
      <div className="card">
        <table>
          <thead><tr><th>Roll No</th><th>Name</th><th>Status</th></tr></thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.rollNo}</td><td>{s.name}</td>
                <td>
                  <button className={records[s.id] === 'Present' ? 'pill present' : 'pill'} onClick={() => toggle(s.id, 'Present')}>Present</button>
                  <button className={records[s.id] === 'Absent' ? 'pill absent' : 'pill'} onClick={() => toggle(s.id, 'Absent')}>Absent</button>
                </td>
              </tr>
            ))}
            {students.length === 0 && <tr><td colSpan="3">Add students first.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
