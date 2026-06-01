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
NEXT_PUBLIC_API_BASE_URL=
NODE_ENV=production
PORT=3000
NGINX_PORT=8080
```

`NEXT_PUBLIC_API_BASE_URL` can stay empty until the auth backend is ready. The UI will surface a toast explaining that the API is not configured.

## Container Run

This project is ready to run behind Nginx using Docker Compose.

```bash
docker compose up --build
```

Open `http://localhost:8080`.

For Azure App Service multi-container deployment, the Nginx service is the public entrypoint and proxies traffic to the Next.js `web` service on port `3000`. Configure App Service with port `80` for the Nginx container.
