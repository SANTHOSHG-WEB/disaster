This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Testing Credentials

You can use the following credentials to test the platform's features:

### 1. School Admin
Used for accessing the designated Admin Portal (`/admin/login`).
*   **Email:** `admin@dme.com`
*   **Password:** Use the password configured in your Supabase Auth dashboard.

### 2. Student Account
Used for regular student access (`/login`).
*   **Email:** `student@test.com` (or any newly registered email)
*   **Password:** Use the password configured during signup.

### Mock Mode (Simulated Auth)
If the project is running with placeholder Supabase environment variables:
*   **Admin:** Any email starting with `admin` (e.g., `admin@test.com`) + any password.
*   **Student:** Any other email + any password.
