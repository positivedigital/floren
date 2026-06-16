# Deployment

This repository is a standard **Next.js 14 (App Router)** app and is ready to deploy on Vercel.
Verified: `npm install && npm run build` compiles cleanly and prerenders all 63 routes,
including the home route `/`. There are no case-sensitivity issues for Linux builders.

## Why `floren-mauve.vercel.app` currently returns `404: NOT_FOUND`

That URL is **not being built from this GitHub repo.** Until recently this repo contained only
a single file (`floren-prototype (3).zip`), so there was never a Next.js app for Vercel to build.
The live site was deployed independently (Abacus.AI export), so pushes to this repo do **not**
update `floren-mauve.vercel.app`. The 404 is Vercel's platform-level "no production deployment"
error, not an app error.

To fix it, the Vercel project must be connected to this repo (or a new project imported from it).

## Deploy via the Vercel dashboard (recommended)

1. **Vercel → Add New → Project → Import Git Repository** → `positivedigital/floren`.
   (Or, to keep the existing `floren-mauve` project: open it → **Settings → Git** → connect this repo.)
2. Configure **Project Settings**:
   | Setting | Value |
   |---|---|
   | Framework Preset | **Next.js** (auto-detected) |
   | Root Directory | **`./`** (repo root — must NOT be a subfolder) |
   | Build Command | `next build` (default) |
   | Install Command | `npm install` (default; a `package-lock.json` is committed) |
   | Output Directory | (leave default) |
   | Node.js Version | **20.x or newer** |
   | Production Branch | **`main`** |
3. Add **Environment Variables** (Production + Preview) — see below.
4. **Deploy.**

## Deploy via the Vercel CLI (alternative)

```bash
npm i -g vercel
vercel login
vercel link            # link to the existing project, or create a new one
vercel --prod          # builds and deploys to production
```

## Required environment variables

Only the order form (`POST /api/bestelling`) uses these. The site renders without them;
without them only the order-confirmation email fails. They are **not** required to fix the 404.

| Variable | Where to get the value |
|---|---|
| `ABACUSAI_API_KEY` | from the local `.env` / Abacus.AI deployment token |
| `WEB_APP_ID` | from the local `.env` |
| `NOTIF_ID_BESTELLING_GEPLAATST` | from the local `.env` |

> The real values live in the local `.env` (kept out of git via `.gitignore`) — do **not**
> commit them to this public repo. `.env.example` lists the key names. Set them directly in
> the Vercel dashboard (Settings → Environment Variables) or via `vercel env add`.

## Notes

- **Prisma is included as a dependency but unused at runtime** — no page imports `lib/db.ts`;
  all content comes from `lib/data.ts` (static). `DATABASE_URL` is therefore not needed to run
  the site. The Prisma schema was fixed to remove an Abacus-only hardcoded output path so
  Vercel's automatic `prisma generate` step does not fail.
- Images use `images: { unoptimized: true }`, so no Vercel Image Optimization config is needed.
