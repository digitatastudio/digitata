import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, age, goal, format } = await req.json();

    if (!name || !email || !goal) {
      return NextResponse.json(
        { ok: false, error: "Chybí jméno, e-mail nebo popis." },
        { status: 400 }
      );
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { ok: false, error: "Chybí SMTP konfigurace na serveru." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const to = TO_EMAIL || SMTP_USER;

    await transporter.sendMail({
      from: `"DIGITÁTA web" <${SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `Nová žádost o mentoring – ${name}`,
      html: `
        <h2>Nová žádost o mentoring</h2>
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Věk:</strong> ${age || "—"}</p>
        <p><strong>Formát:</strong> ${format || "—"}</p>
        <p><strong>Popis:</strong></p>
        <p>${String(goal).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    // Oprava chyby "Unexpected any"
    const errorMessage = error instanceof Error ? error.message : "Neznámá chyba";
    console.error("Mentoring API chyba:", errorMessage);
    
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
}