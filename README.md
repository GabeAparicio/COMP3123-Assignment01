# COMP3123 - Assignment 1: RESTful API with Node.js, Express & MongoDB

## Author
**Name:** Gabriel Aparicio  
**Course:** COMP3123 – Full Stack Development  
**Assignment:** 1 (User and Employee API)  
**Date:** October 2025

---

## Description

This project implements a RESTful API using **Node.js**, **Express**, and **MongoDB** (via Mongoose).  
It provides endpoints to manage **Users** and **Employees**, including authentication, CRUD operations, and request validation.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB (Docker)
- Mongoose ODM
- Express Router
- express-validator (for request validation)
- dotenv (for environment variables)

---

## Project Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/COMP3123-Assignment01.git
cd COMP3123-Assignment01
```
### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a .env file in the root directory
```bash
PORT=3000
MONGO_URI=mongodb://admin:password@localhost:27017/comp3123_assignment1
```

### 4. Start the server
```bash
node server.js
```
Expected output:\
✅ Connected to MongoDB
🚀 Server running at http://localhost:3000


### Postman Collection
The file "Assigment01 API Collection.postmancollection.json" is included in this repository. Import it into postman to test all API endpoints.

### If using Docker for MongoDB:
```bash
docker start comp3095-mongodb
```
### Sample User for Testing Login:
```bash
Email: skittle@example.com
Password: password123 
```

### ENJOY!