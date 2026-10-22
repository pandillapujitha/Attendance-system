# Student Attendance Management System (Cloud Computing Project)

**Tech stack:** HTML, CSS, JavaScript, React.js (Vite), Node.js + Express, JWT auth, JSON-file storage, Docker.

## Features
- Admin/Teacher login (JWT)
- Add / edit / delete students
- Mark daily attendance (Present / Absent, bulk buttons)
- Dashboard with stats and low-attendance (<75%) list
- Attendance report with percentage + CSV export
- REST API, cloud-ready (Docker, environment variables, health check)

## Folder structure
```
attendance-system/
├── backend/            Node.js + Express REST API
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/           React.js (Vite) UI
│   ├── index.html
│   └── src/ (App.jsx, api.js, styles.css, pages/*)
├── Dockerfile          Single container for cloud deployment
└── README.md
```

## Run locally
Requires Node.js 18+.

```bash
# Terminal 1 - backend
cd backend
npm install
npm start            # http://localhost:5000

# Terminal 2 - frontend
cd frontend
npm install
npm run dev          # http://localhost:3000
```
Login: **admin / admin123** (change with ADMIN_USER / ADMIN_PASS env vars).

## API
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/login | Get JWT token |
| GET/POST | /api/students | List / add students |
| PUT/DELETE | /api/students/:id | Update / delete |
| GET | /api/attendance/:date | Attendance of a date |
| POST | /api/attendance | Save attendance `{date, records}` |
| GET | /api/report | Per-student summary |
| GET | /api/health | Health check |

## Cloud deployment
**Option 1 - Render / Railway (easiest):** push to GitHub -> New Web Service -> choose Docker -> set env vars `JWT_SECRET`, `ADMIN_USER`, `ADMIN_PASS`.

**Option 2 - AWS EC2:**
```bash
docker build -t attendance-app .
docker run -d -p 80:5000 -e JWT_SECRET=secret -e ADMIN_PASS=strongpass attendance-app
```

**Option 3 - AWS Elastic Beanstalk / Azure App Service / Google Cloud Run:** deploy the Docker image.

> Note: data is stored in `backend/data.json`. On cloud platforms with temporary disks, attach a persistent volume or replace storage with MongoDB Atlas / AWS RDS for production.

## Cloud computing concepts covered
SaaS delivery model, REST API (client-server), containerization (Docker), stateless JWT authentication, environment-based configuration, horizontal scalability, deployment on IaaS/PaaS.
