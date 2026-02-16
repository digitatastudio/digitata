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
        { ok: false, error: "Chybí SMTP env proměnné na serveru (Vercel)." },
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
  } catch (e: any) {
    console.error("Mentoring API chyba:", e);
    return NextResponse.json(
      { ok: false, error: e?.message || "Neznámá chyba." },
      { status: 500 }
    );
  }
}
