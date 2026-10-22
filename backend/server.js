const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET = process.env.JWT_SECRET || 'change-this-secret';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// ---------- simple JSON storage ----------
function load() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ students: [], attendance: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function save(db) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// ---------- auth ----------
function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '8h' });
    return res.json({ token, username });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

// ---------- students ----------
app.get('/api/students', auth, (req, res) => res.json(load().students));

app.post('/api/students', auth, (req, res) => {
  const { rollNo, name, department, year } = req.body;
  if (!rollNo || !name) return res.status(400).json({ message: 'Roll No and Name are required' });
  const db = load();
  if (db.students.some(s => s.rollNo === rollNo))
    return res.status(409).json({ message: 'Roll No already exists' });
  const student = { id: newId(), rollNo, name, department: department || '', year: year || '' };
  db.students.push(student);
  save(db);
  res.status(201).json(student);
});

app.put('/api/students/:id', auth, (req, res) => {
  const db = load();
  const s = db.students.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ message: 'Not found' });
  Object.assign(s, req.body, { id: s.id });
  save(db);
  res.json(s);
});

app.delete('/api/students/:id', auth, (req, res) => {
  const db = load();
  db.students = db.students.filter(s => s.id !== req.params.id);
  db.attendance = db.attendance.filter(a => a.studentId !== req.params.id);
  save(db);
  res.json({ message: 'Deleted' });
});

// ---------- attendance ----------
app.get('/api/attendance/:date', auth, (req, res) => {
  const map = {};
  load().attendance.filter(a => a.date === req.params.date).forEach(a => (map[a.studentId] = a.status));
  res.json(map);
});

app.post('/api/attendance', auth, (req, res) => {
  const { date, records } = req.body;
  if (!date || !records) return res.status(400).json({ message: 'date and records required' });
  const db = load();
  db.attendance = db.attendance.filter(a => a.date !== date);
  Object.entries(records).forEach(([studentId, status]) => db.attendance.push({ studentId, date, status }));
  save(db);
  res.json({ message: 'Attendance saved' });
});

// ---------- reports ----------
app.get('/api/report', auth, (req, res) => {
  const db = load();
  const days = [...new Set(db.attendance.map(a => a.date))].length;
  const rows = db.students.map(s => {
    const mine = db.attendance.filter(a => a.studentId === s.id);
    const present = mine.filter(a => a.status === 'Present').length;
    const total = mine.length;
    return { ...s, present, absent: total - present, total, percentage: total ? +((present / total) * 100).toFixed(1) : 0 };
  });
  res.json({ totalStudents: db.students.length, totalDays: days, rows });
});

// ---------- serve React build in production (cloud deployment) ----------
const build = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(build)) {
  app.use(express.static(build));
  app.get('*', (req, res) => res.sendFile(path.join(build, 'index.html')));
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
