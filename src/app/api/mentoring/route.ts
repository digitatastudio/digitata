import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type MentoringPayload = {
  name: string;
  email: string;
  goal: string;
  age?: string | number | null;
  format?: string | null;
};

function isMentoringPayload(v: unknown): v is MentoringPayload {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;

  const okName = typeof o.name === "string";
  const okEmail = typeof o.email === "string";
  const okGoal = typeof o.goal === "string";

  const okAge =
    o.age === undefined ||
    o.age === null ||
    typeof o.age === "string" ||
    typeof o.age === "number";

  const okFormat = o.format === undefined || o.format === null || typeof o.format === "string";

  return okName && okEmail && okGoal && okAge && okFormat;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const raw: unknown = await req.json();

    if (!isMentoringPayload(raw)) {
      return NextResponse.json({ ok: false, error: "Neplatná data ve formuláři." }, { status: 400 });
    }

    const name = raw.name.trim();
    const email = raw.email.trim();
    const goal = raw.goal.trim();

    const format = (raw.format ?? "domluva").toString().trim();
    const age =
      raw.age === undefined || raw.age === null || raw.age === ""
        ? ""
        : String(raw.age).trim();

    if (!name || !email || !goal) {
      return NextResponse.json({ ok: false, error: "Chybí povinné údaje." }, { status: 400 });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json({ ok: false, error: "Chyba konfigurace serveru." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"DIGITÁTA web" <${SMTP_USER}>`,
      to: TO_EMAIL || SMTP_USER,
      replyTo: email,
      subject: `Nová žádost o mentoring – ${name}`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>Nová žádost o mentoring</h2>
          <p><strong>Jméno:</strong> ${escapeHtml(name)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
          <p><strong>Věk:</strong> ${age ? escapeHtml(age) : "—"}</p>
          <p><strong>Formát:</strong> ${escapeHtml(format)}</p>
          <p><strong>Popis:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(goal)}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Neznámá chyba";
    console.error("Mentoring API Error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}