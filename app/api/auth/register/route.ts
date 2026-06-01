import { NextResponse } from "next/server";

import { postToAuthBackend } from "@/lib/server/backend";
import { registerSchema } from "@/lib/validation/auth";

export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid registration request." },
      { status: 400 },
    );
  }

  return postToAuthBackend({
    body: parsed.data,
    path: "/api/v1/auth/register",
  });
}
