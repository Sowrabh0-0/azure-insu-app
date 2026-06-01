import type { LoginInput, RegisterInput } from "@/lib/validation/auth";

type ApiOptions = RequestInit & {
  path: string;
};

async function request<T>({ path, headers, ...options }: ApiOptions): Promise<T> {
  const response = await fetch(path, {
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
      path: "/api/auth/register",
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async login(payload: LoginInput) {
    return request<{ accessToken: string }>({
      path: "/api/auth/login",
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
