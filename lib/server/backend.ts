const DEFAULT_BACKEND_URL = "https://hermes-auth-backapp.azurewebsites.net";

const AUTH_BACKEND_URL = (
  process.env.AUTH_BACKEND_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  DEFAULT_BACKEND_URL
).replace(/\/$/, "");

type BackendRequestOptions = {
  body: unknown;
  path: string;
};

export async function postToAuthBackend({ body, path }: BackendRequestOptions) {
  const response = await fetch(`${AUTH_BACKEND_URL}${path}`, {
    body: JSON.stringify(body),
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : { message: await response.text() };

  return Response.json(payload, { status: response.status });
}
