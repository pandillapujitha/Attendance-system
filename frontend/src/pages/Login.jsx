import React, { useState } from 'react';
import { api } from '../api.js';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    try {
      const { token } = await api('/login', 'POST', { username, password });
      localStorage.setItem('token', token);
      onLogin();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="login-wrap">
      <div className="card login">
        <h1>Student Attendance Management System</h1>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} />
        {error && <p className="error">{error}</p>}
        <button className="btn" onClick={submit}>Login</button>
        <small>Default: admin / admin123</small>
      </div>
    </div>
  );
}
