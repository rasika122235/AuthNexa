# AuthNexa

## Secure Authentication & User Management Platform

AuthNexa is a secure and responsive authentication platform built using React, Tailwind CSS, and Supabase.

It provides user registration, login, session management, profile management, password management, and a professional dashboard.

## Features

- User Registration
- User Login
- Supabase Authentication
- Protected Dashboard
- Session Management
- Logout
- Edit Profile
- Forgot Password
- Change Password
- Local-Time Greeting
- Dark & Light Mode
- Responsive User Interface

## Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development and build tool |
| Tailwind CSS | UI styling |
| Supabase | Authentication and database |
| JavaScript | Application logic |
| Lucide React | Icons |

## Project Structure

```text
AuthNexa/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```
##Application Flow
```text
Register
   ↓
Supabase Authentication
   ↓
Login
   ↓
Protected Dashboard
   ↓
Profile Management
   ↓
Logout
```
##Installation

Clone the repository and install the dependencies:

```bash
npm install
```
Run the development server:
```bash
npm run dev
```

The application will run on the local Vite development server.

## Environment Variables

Create a `.env` file in the project root and add your Supabase project credentials.

**Do not upload the `.env` file to GitHub.**

## Security

AuthNexa uses Supabase Authentication for secure user authentication and session management.

Sensitive environment variables are excluded from the repository using `.gitignore`.

## Project Objectives

- Build a modern authentication system
- Learn React application development
- Implement Supabase authentication
- Create responsive user interfaces
- Practice session and profile management
- Build a professional portfolio project

## Future Enhancements

- Email verification
- Social login
- Two-factor authentication
- Admin dashboard
- User activity tracking
- Enhanced profile management

## Author

**Rasika S**

Computer Science / IT Student  
Tamil Nadu, India

## License

This project is created for educational and portfolio purposes.
