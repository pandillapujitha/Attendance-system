import React, { useEffect, useState } from 'react';
import { api } from '../api.js';

const empty = { rollNo: '', name: '', department: '', year: '' };

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const load = () => api('/students').then(setStudents);
  useEffect(() => { load(); }, []);

  const submit = async () => {
    setError('');
    try {
      if (editId) await api(`/students/${editId}`, 'PUT', form);
      else await api('/students', 'POST', form);
      setForm(empty); setEditId(null); load();
    } catch (e) { setError(e.message); }
  };

  const edit = s => { setEditId(s.id); setForm({ rollNo: s.rollNo, name: s.name, department: s.department, year: s.year }); };
  const remove = async id => { if (confirm('Delete this student?')) { await api(`/students/${id}`, 'DELETE'); load(); } };

  return (
    <div>
      <h1>Students</h1>
      <div className="card form-row">
        <input placeholder="Roll No" value={form.rollNo} onChange={e => setForm({ ...form, rollNo: e.target.value })} />
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
        <input placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
        <button className="btn" onClick={submit}>{editId ? 'Update' : 'Add Student'}</button>
        {editId && <button className="btn secondary" onClick={() => { setEditId(null); setForm(empty); }}>Cancel</button>}
      </div>
      {error && <p className="error">{error}</p>}
      <div className="card">
        <table>
          <thead><tr><th>Roll No</th><th>Name</th><th>Department</th><th>Year</th><th>Actions</th></tr></thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.rollNo}</td><td>{s.name}</td><td>{s.department}</td><td>{s.year}</td>
                <td>
                  <button className="btn small" onClick={() => edit(s)}>Edit</button>{' '}
                  <button className="btn small danger" onClick={() => remove(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {students.length === 0 && <tr><td colSpan="5">No students yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
