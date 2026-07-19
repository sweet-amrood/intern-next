# Intern Next Rebuild

Next.js rebuild of [Intern Next](https://www.internee.pk/) covering the homepage, marketing nav pages, Job Portal, and Student Dashboard.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- MongoDB (Mongoose) for users + auth-related data
- Marketing content still mocked in `src/data/`

## MongoDB + Compass

1. Install and start MongoDB locally (or use Atlas).
2. Open **MongoDB Compass** and connect to:

```text
mongodb://127.0.0.1:27017
```

3. After signup, open database `internee` → collection `users`.
4. Copy `.env.example` to `.env.local` (already defaults to local Mongo):

```bash
copy .env.example .env.local
```

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Auth APIs

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/auth/signup` | Create user in MongoDB |
| POST | `/api/auth/login` | Login + httpOnly session cookie |
| POST | `/api/auth/logout` | Clear session |
| GET | `/api/auth/me` | Current user |
| PATCH | `/api/user/profile` | Update profile |
| POST | `/api/user/apply-job` | Save job application |
| PATCH | `/api/user/tasks` | Update task status |

Password is hashed with bcrypt. Session uses JWT in an httpOnly cookie.

## Documentation

Full submission-level project documentation (features, setup, usage, components, APIs, testing, maintenance) is available as a Word file:

- [`docs/Intern-Next-Documentation.docx`](docs/Intern-Next-Documentation.docx)

Regenerate it after major changes:

```bash
node scripts/generate-docs.js
```
