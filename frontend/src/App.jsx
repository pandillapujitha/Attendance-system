import React, { useState } from 'react';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Students from './pages/Students.jsx';
import MarkAttendance from './pages/MarkAttendance.jsx';
import Reports from './pages/Reports.jsx';

const TABS = [
  ['dashboard', 'Dashboard'],
  ['students', 'Students'],
  ['attendance', 'Mark Attendance'],
  ['reports', 'Reports']
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [tab, setTab] = useState('dashboard');

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>🎓 Attendance</h2>
        {TABS.map(([key, label]) => (
          <button key={key} className={tab === key ? 'nav active' : 'nav'} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
        <button className="nav logout" onClick={logout}>Logout</button>
      </aside>
      <main className="content">
        {tab === 'dashboard' && <Dashboard />}
        {tab === 'students' && <Students />}
        {tab === 'attendance' && <MarkAttendance />}
        {tab === 'reports' && <Reports />}
      </main>
    </div>
  );
}
