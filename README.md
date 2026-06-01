# Hermes Auth Frontend

Next.js App Router frontend for a simple insurance application. It includes a landing page, registration page, login page, Shadcn-style UI primitives, validation, toast messages, and a central API layer for future backend integration.

## Routes

- `/` - landing page
- `/register` - account registration
- `/login` - sign in

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env` and set values as needed.

```bash
AUTH_BACKEND_URL=https://hermes-auth-backend.azurewebsites.net
NODE_ENV=production
PORT=3000
NGINX_PORT=8080
```

`AUTH_BACKEND_URL` is used by Next.js server route handlers. The browser calls `/api/auth/login` and `/api/auth/register` on this frontend, then the frontend container forwards those requests to `/api/v1/auth/login` and `/api/v1/auth/register` on the backend. This keeps private endpoint traffic server-side instead of exposing an internal backend URL to the browser.

## Container Run

This project is ready to run as a single Next.js container. Azure App Service provides the public reverse proxy for the frontend.

```bash
docker compose up --build
```

Open `http://localhost:3000`.

For Azure App Service container deployment, configure the frontend App Service to use `sowrabh0/hermes-auth-frontend:v1` and set the exposed port to `3000`.

Set `AUTH_BACKEND_URL` in the frontend App Service configuration to the backend App Service or backend Nginx DNS name. If the backend is reachable through private endpoint DNS as `hermes-auth-backend`, use the fully qualified private DNS name your VNet resolves, for example `https://hermes-auth-backend.azurewebsites.net`.
