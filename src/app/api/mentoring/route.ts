// src/app/api/mentoring/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, age, goal, format } = await req.json();

    if (!name || !email || !goal) {
      return NextResponse.json({ ok: false, error: "Chybí jméno, e-mail nebo popis." }, { status: 400 });
    }

  const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
    const to = process.env.TO_EMAIL || "info@digitatastudio.cz";

    await transporter.sendMail({
      from: `"DIGITÁTA web" <${process.env.SMTP_USER}>`,
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
  }  catch (e: unknown) {
  console.error("!!! Mentoring API chyba:", e);
  const message =
    e instanceof Error ? e.message : "Neznámá chyba";
  return NextResponse.json({ ok: false, error: message }, { status: 500 });
}

}
