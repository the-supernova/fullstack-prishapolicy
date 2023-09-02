# FullStack Web Developer Assignment- Prisha Policy
---
> Created a fullstack book reading application using Next.js, Typescript, TailwindCSS, using Postgres as database, with Prisma as ORM, and tRPC as API layer.

Live Demo: [https://fullstack-prishapolicy.vercel.app/](https://fullstack-prishapolicy.vercel.app/)

> [!NOTE]
> PDFs cannot be viewed on mobile devices, as embeds are not supported on mobile devices.

## Running the application
Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Create a `.env` file in the root of the project, and add the following environment variables:

```bash
POSTGRES_DATABASE="verceldb"
POSTGRES_HOST="ep-dry-frog-44281008-pooler.us-east-1.postgres.vercel-storage.com"
POSTGRES_PASSWORD="ju1gEtNklXH4"
POSTGRES_PRISMA_URL="postgres://default:ju1gEtNklXH4@ep-dry-frog-44281008-pooler.us-east-1.postgres.vercel-storage.com/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL="postgres://default:ju1gEtNklXH4@ep-dry-frog-44281008-pooler.us-east-1.postgres.vercel-storage.com/verceldb"
POSTGRES_URL_NON_POOLING="postgres://default:ju1gEtNklXH4@ep-dry-frog-44281008.us-east-1.postgres.vercel-storage.com/verceldb"
POSTGRES_USER="default"
VERCEL="1"
VERCEL_ENV="development"
```

Then run the following commands to create the database, and run the migrations:

```bash
npx prisma db push
npx prisma generate
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
