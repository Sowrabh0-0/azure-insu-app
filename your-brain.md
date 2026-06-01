# Working Context

## Prompt Summary
- Build a production-structured auth frontend for a simple insurance application.
- Use Next.js App Router with Shadcn-style components and the default theme.
- Routes required:
  - `/` landing page
  - `/register` with name, email, password validation and error toasts
  - `/login` with email, password validation and error toasts
- Add a central `api.ts` layer for future backend wiring.

## Workspace Notes
- The workspace initially contained only `prompt.md`.
- It is not currently a git repository.
- Since no existing app structure exists, the implementation is being scaffolded from scratch.

## Decisions
- Use Next.js App Router with TypeScript.
- Implement local Shadcn-style UI primitives under `components/ui` instead of depending on a generator.
- Use `zod` schemas for reusable form validation.
- Use a simple local toast provider so forms can surface validation and future API errors cleanly.
- Keep auth submit flows frontend-only for now, routed through `lib/api.ts` stubs that can be replaced once the backend is ready.

## Current Process
- Project configuration files have been created.
- Shared Shadcn-style UI primitives have been added.
- Auth validation schemas and central API structure have been added.
- App Router pages for `/`, `/register`, and `/login` have been added.

## Implementation Notes
- Form submission currently calls `authApi`; because `NEXT_PUBLIC_API_BASE_URL` is not configured, the API layer throws a clear setup error that is shown through toast.
- This keeps frontend validation and error plumbing real while preserving the backend integration point for later.

## Verification Notes
- Initial `npm install` through PowerShell failed because script execution is disabled for `npm.ps1`.
- Retried with `npm.cmd install`; the first sandboxed run failed because packages were not cached locally.
- Retried with network approval; `node_modules` was created, but the npm session has stayed open without visible output or a generated lockfile.
- Because this is a company laptop, broad process inspection/termination is being avoided unless explicitly approved.
- A direct TypeScript check could start from `node_modules/typescript`, but verification is blocked by the incomplete install missing Next type declarations and command shims.
- `incremental` was disabled in `tsconfig.json` so no-emit checks do not try to write `tsconfig.tsbuildinfo`.
- Next/React were upgraded after npm reported a vulnerable pinned Next version.
- `npm audit --audit-level=moderate` now reports zero vulnerabilities.
- `npm.cmd run build` passed with Next.js 16.2.6 and generated static routes for `/`, `/login`, and `/register`.

## Containerization Notes
- Added `Dockerfile` using a multi-stage Next.js standalone build.
- Updated `next.config.ts` with `output: "standalone"` for smaller container runtime output.
- Added `docker-compose.yml` with two services:
  - `web`: Next.js application on port 3000.
  - `nginx`: reverse proxy entrypoint on `${NGINX_PORT:-8080}` locally.
- Added `nginx/default.conf` to proxy all requests to the Next app and cache Next static assets.
- Added `.env.example` for deployment/runtime configuration.
- Added `README.md` with local, environment, container, and Azure App Service notes.
