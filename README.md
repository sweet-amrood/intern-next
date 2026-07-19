# Intern Next Rebuild

Next.js rebuild of [Intern Next](https://www.internee.pk/) covering the homepage, marketing nav pages, Job Portal, and Student Dashboard.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- MongoDB (Mongoose) for users + auth-related data
- Marketing content still mocked in `src/data/`

## MongoDB Atlas

This project uses **MongoDB Atlas** (cloud). You can still browse data with **MongoDB Compass** by pasting the same Atlas URI into Compass.

1. Create a free cluster at [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. **Database Access** → create a database user (username + password). Save the password.
3. **Network Access** → Add IP Address → allow your current IP (or `0.0.0.0/0` for local dev only).
4. **Database** → **Connect** → **Drivers** → copy the URI.
5. Replace `<password>` with your DB user password (URL-encode special characters).
6. Set the database name to `internee` (or keep `/internee` in the path):

```text
mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/internee?retryWrites=true&w=majority
```

7. Put that string in `.env.local` as `MONGODB_URI=...`
8. Restart `npm run dev`

After signup/login, open Compass with the same URI → database `internee` → collection `users`.

## MongoDB (legacy local notes)

If you previously used a local Compass connection (`mongodb://127.0.0.1:27017`), that is no longer the default. Use Atlas as above.

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
