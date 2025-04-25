# 🩺 Doctor Appointment Frontend

This is the frontend application for the **Doctor Appointment System**, built with **React.js** and **Material UI (MUI)**. It allows users to search for doctors, view their details, and schedule appointments.

---

## 📦 Features

- 🔍 **Search Doctors** by name, specialization, or medical condition.
- 📄 **Doctor Detail Page** to view qualifications and specialization.
- 📆 **Book Appointments** with available doctors.
- 🔐 **Token-based Authentication** for secure access.
- 🖥️ Responsive design using **Material UI**.

---

## 🛠️ Tech Stack

- **React.js**
- **React Router DOM**
- **Material UI**
- **Ant Design Icons**
- **Fetch API** for HTTP communication

---

## 🚀 Getting Started

Follow these steps to run the frontend locally:

### ✅ Prerequisites

- Node.js >= 14.x
- npm >= 6.x
- Backend running on `http://localhost:8082` (or update API URL in `.env`)

### Project Structure
```
src/
│
├── components/          # Reusable UI components
├── layout/              # Layout wrappers (e.g., PublicLayout)
├── pages/               # Page-specific components
│   └── extra-pages/     # Extra pages like Appointment & DoctorDetail
├── routes/              # Application routes
├── App.js               # Main app entry
└── index.js             # React DOM render entry
```
---

### 📥 Installation

```bash
git clone https://github.com/Pavucsan/KU-HAMS-appointment-react.git
cd appointment-react
npm install
```
### App Start

```bash
npm start
```
