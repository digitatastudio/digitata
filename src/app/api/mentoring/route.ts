import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, age, goal, format } = await req.json();

    if (!name || !email || !goal) {
      return NextResponse.json(
        { ok: false, error: "Chybí povinné údaje." },
        { status: 400 }
      );
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { ok: false, error: "Chyba konfigurace serveru." },
        { status: 500 }
      );
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
          <p><strong>Jméno:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Věk:</strong> ${age || "—"}</p>
          <p><strong>Formát:</strong> ${format}</p>
          <p><strong>Popis:</strong></p>
          <p style="white-space: pre-wrap;">${goal}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    // Oprava pro TypeScript: definujeme chybu bez použití 'any'
    const message = error instanceof Error ? error.message : "Neznámá chyba";
    console.error("Mentoring API Error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}