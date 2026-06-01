import type { LoginInput, RegisterInput } from "@/lib/validation/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

type ApiOptions = RequestInit & {
  path: string;
};

async function request<T>({ path, headers, ...options }: ApiOptions): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured yet.");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    const fallback = "Something went wrong. Please try again.";
    let message = fallback;

    try {
      const error = (await response.json()) as { message?: string };
      message = error.message ?? fallback;
    } catch {
      message = fallback;
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export const authApi = {
  async register(payload: RegisterInput) {
    return request<{ id: string; email: string }>({
      path: "/auth/register",
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async login(payload: LoginInput) {
    return request<{ accessToken: string }>({
      path: "/auth/login",
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
