# Apollo Clone Assignment

This project is a clone of the Apollo 24/7 **destination page** built as an assignment. It includes a doctor listing interface with functional filters, pagination, off-page SEO support, and a backend powered by a REST API.

## Project Overview

The goal was to recreate this Apollo page:  
[https://www.apollo247.com/specialties/general-physician-internal-medicine](https://www.apollo247.com/specialties/general-physician-internal-medicine)

### Core Features

- Functional filters: specialization, gender, experience, etc.
- Paginated doctor listing
- SEO-friendly setup using Next.js
- RESTful backend with two key APIs
- Doctor data stored in a database

---

## Tech Stack

### Frontend
- Next.js (React Framework)
- CSS Modules / Custom CSS

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)

---

## Folder Structure

apollo-clone-assignment/
├── frontend/ # Next.js app
│ ├── pages/
│ ├── components/
│ ├── styles/
│ └── ...
├── backend/ # Node.js + Express API
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── server.js
│ └── .env
└── README.md



---

## Backend API Endpoints

### 1. **Add Doctor**
- `POST /add-doctor`
- Adds a new doctor to the database
- **Request Body Example**:
```json
{
  "name": "Dr. Kishori Rai",
  "specialization": "General Physician",
  "experience": 5,
  "gender": "Female",
  "location": "Delhi"
}
