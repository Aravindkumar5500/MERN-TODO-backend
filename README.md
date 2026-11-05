# MERN Todo — Backend

Express and MongoDB backend for the companion [MERN-TODO-List](https://github.com/Aravindkumar5500/MERN-TODO-List) frontend.

## Stack

- Node.js and Express
- MongoDB with Mongoose
- JSON Web Tokens for the current demo authentication flow

## Local setup

Requires Node.js 20.6 or newer.

```bash
git clone https://github.com/Aravindkumar5500/MERN-TODO-backend.git
cd MERN-TODO-backend
npm install
cp .env.example .env
# Edit .env with your own MongoDB URI and a long, random JWT secret.
npm run dev
```

The application expects `MONGODB_URI` and `JWT_SECRET` from the local `.env` file. The `.env` file is ignored by Git.

## Important security note

This repository is an older learning project, not a production-ready authentication example. The current registration/login implementation stores and compares passwords as plain text. Do not use real accounts or real user passwords with it. Before any public deployment, replace this with password hashing (for example, bcrypt or Argon2), add request validation and authorization checks, and review the API's data-access rules.

## Related project

- [MERN Todo frontend](https://github.com/Aravindkumar5500/MERN-TODO-List)
