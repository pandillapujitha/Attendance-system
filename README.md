Student Attendance System

A web-based application designed to simplify student record management, daily attendance tracking, and attendance report generation through a user-friendly interface.

Live Demo

Launch Student Attendance System

Project Overview

The Student Attendance System provides a centralized platform for managing student information and monitoring attendance. It allows administrators to maintain student records, record attendance, and review attendance reports efficiently.

Key Features
Student Management: Add, view, update, and manage student records.
Attendance Tracking: Record daily attendance for registered students.
Attendance Reports: View attendance summaries and individual student attendance statistics.
Admin Authentication: Secure access to application features through administrator login.
User-Friendly Interface: Navigate between the dashboard, students, attendance, and reports.
Technology Stack
Category	Technology
Frontend	React, Vite
Backend	Node.js, Express.js
Programming Language	JavaScript
Data Storage	JSON file
Deployment	Render
Version Control	Git, GitHub
Application Modules
Dashboard — View an overview of the attendance system.
Students — Manage student information, including roll number, department, and year.
Mark Attendance — Record students' daily attendance status.
Reports — Review attendance records and percentage summaries.
Authentication — Access the system through administrator login.
Installation and Setup
Prerequisites
Node.js and npm
Git
1. Clone the repository
git clone https://github.com/pandillapujitha/Attendance-system.git
cd Attendance-system

2. Install backend dependencies
cd backend
npm install

3. Configure environment variables

Create a .env file in the backend directory and configure the required application settings according to .env.example.

4. Start the backend server
npm start

5. Install and start the frontend

Open a separate terminal from the project root and run:

cd frontend
npm install
npm run dev


Open the local URL displayed in the terminal to access the application.

Project Structure
Attendance-system/
├── backend/
│   ├── server.js
│   ├── data.json
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md

Project Objectives
Reduce manual effort in maintaining student attendance records.
Simplify daily attendance recording and student management.
Provide convenient access to attendance summaries and reports.
Demonstrate full-stack web development using React and Node.js.
Future Enhancements
Database integration using MongoDB or PostgreSQL.
Role-based access for administrators, faculty, and students.
Export attendance reports to PDF or Excel.
Improved reporting and attendance analytics.
Repository

Source Code: GitHub – Student Attendance System

Author

Developed as an academic project to demonstrate full-stack web development and student attendance management.
