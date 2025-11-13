import { NextResponse } from "next/server";
// import nodemailer from "nodemailer"; // povol, až budeš posílat e-maily

export async function POST(req: Request) {
  try {
    const { name, email, age, goal, format } = await req.json();

    // TODO: validace (server-side) – ať ti nikdo neposílá prázdný bordel
    if (!name || !email || !goal) {
      return NextResponse.json({ ok: false, error: "Chybí povinná pole." }, { status: 400 });
    }

    // // E-mail odeslání – odkomentuj a nastav .env, až budeš chtít posílat
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT || 587),
    //   secure: Number(process.env.SMTP_PORT) === 465,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });

    // const to = process.env.TO_EMAIL || "info@digitatastudio.cz";

    // await transporter.sendMail({
    //   from: `"DIGITÁTA web" <${process.env.SMTP_USER}>`,
    //   to,
    //   replyTo: email,
    //   subject: `Nová žádost o mentoring – ${name}`,
    //   html: `
    //     <h2>Nová žádost o mentoring</h2>
    //     <p><strong>Jméno:</strong> ${name}</p>
    //     <p><strong>E-mail:</strong> ${email}</p>
    //     <p><strong>Věk:</strong> ${age || "—"}</p>
    //     <p><strong>Formát:</strong> ${format}</p>
    //     <p><strong>Popis:</strong></p>
    //     <p>${goal}</p>
    //   `,
    // });

    // Pro test: aspoň log
    console.log("MENTORING_REQUEST", { name, email, age, goal, format });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Mentoring form error:", err);
    return new NextResponse(err?.message || "Chyba při odesílání", { status: 500 });
  }
}
