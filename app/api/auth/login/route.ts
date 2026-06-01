import { NextResponse } from "next/server";

import { postToAuthBackend } from "@/lib/server/backend";
import { loginSchema } from "@/lib/validation/auth";

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid login request." },
      { status: 400 },
    );
  }

  return postToAuthBackend({
    body: parsed.data,
    path: "/api/auth/login",
  });
}
