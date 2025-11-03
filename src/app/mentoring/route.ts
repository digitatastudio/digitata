import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  // TODO: validace + odeslání (email/webhook/db)
  console.log("MENTORING_REQUEST:", body);
  return NextResponse.json({ ok: true });
}