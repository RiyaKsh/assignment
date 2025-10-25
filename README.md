# MERN Agent Distribution App

## Overview
This is a MERN stack application that allows an admin to manage agents and distribute contacts from CSV/Excel files equally among them. It includes admin authentication, agent management, CSV upload, and viewing distributed lists.

---

## Features
- Admin login using JWT (single admin configured via `.env`)
- Add and manage agents (Name, Email, Mobile, Password)
- Upload CSV / Excel files with contact data
- Automatically distribute contacts equally among all agents
- View distributed lists per agent
- Logout functionality

---

## Tech Stack
- **Frontend:** React.js, Axios, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **File Upload:** Multer  
- **Authentication:** JWT

---

## CSV Format
The CSV/Excel file should have the following columns:

FirstName,Phone,Notes
John,1234567890,Test note
Jane,9876543210,Follow-up required


**Supported file types:** `.csv`, `.xls`, `.xlsx`

---

## Setup Instructions

### Backend
1. Navigate to the backend folder:  
```bash
cd backend

Install dependencies:

npm install

Create a .env file:

PORT=8000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=pswd


Start the backend server:

npm run dev

Frontend
1. Navigate to the frontend folder:

cd frontend

2.Install dependencies:

npm install

3.Start the frontend server:

npm run dev

Usage

Login as admin.

Add agents with their details.

Upload CSV to distribute contacts among agents.

View distributed lists for each agent.

Logout when finished.

Notes

Ensure agents exist before uploading CSV; otherwise, distribution will fail.

Only one admin is supported (credentials in .env).