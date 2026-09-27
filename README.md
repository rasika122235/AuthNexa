# React + Tailwind + Supabase Authentication

A complete beginner-friendly authentication project with:

- React JS + Vite
- Tailwind CSS
- Supabase Authentication
- Supabase PostgreSQL `profiles` table
- Registration with full name, email and password
- Login with email and password
- Protected Home page
- Greeting based on the computer's local time
  - Before 12:00 -> `Good Morning, John`
  - 12:00 or later -> `Good Evening, John`
- Logout and Supabase session cleanup
- Auth state listener so refreshes keep the login state

## 1. Create the React project

If you are using this folder directly, skip the create command.

Otherwise:

```bash
npm create vite@latest react-supabase-auth -- --template react
cd react-supabase-auth
npm install
```

Install the required packages:

```bash
npm install @supabase/supabase-js tailwindcss @tailwindcss/vite lucide-react
```

## 2. Supabase setup

1. Go to https://supabase.com/dashboard
2. Create a project.
3. Open **SQL Editor**.
4. Open `supabase/schema.sql` from this project.
5. Copy everything and run it.
6. Open **Project Settings -> API**.
7. Copy the Project URL and Publishable/Anon key.

### Email confirmation

For the simplest local demo, go to:

**Authentication -> Providers -> Email**

and disable **Confirm email**.

If email confirmation remains enabled, registration creates the account but Supabase will require the user to confirm their email before a session is created.

## 3. Environment variables

Copy `.env.example` to `.env`:

```bash
copy .env.example .env
```

Then put your values in `.env`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Do not put the Supabase service-role/secret key in a React frontend.

## 4. Install and run

```bash
npm install
npm run dev
```

Open the localhost URL shown by Vite, usually:

`http://localhost:5173`

## 5. Test

1. Click Register.
2. Enter a name, email and password.
3. Create the account.
4. You should reach Home when email confirmation is disabled.
5. The Home page loads the name from `profiles`.
6. Refresh the page to test session persistence.
7. Click Logout.
8. You should return to Login and the Supabase session is cleared.

## How the greeting works

The app uses:

```js
const hour = new Date().getHours();
const greeting = hour < 12 ? "Good Morning" : "Good Evening";
```

`new Date()` uses the computer/browser's local time, not a hard-coded India time.

## Important security note

The browser only uses the Supabase publishable/anon key. Row Level Security ensures an authenticated user can read/update only their own profile. Never expose a Supabase service-role/secret key in React code.
