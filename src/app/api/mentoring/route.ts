import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Definice struktury dat pro lepší přehlednost
interface MentoringData {
  name: string;
  email: string;
  age?: string;
  goal: string;
  format: string;
}

// Pomocná funkce pro bezpečné vložení textu do HTML (prevence XSS)
function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body: MentoringData = await req.json();
    const { name, email, age, goal, format } = body;

    // 1. Validace povinných polí
    if (!name || !email || !goal) {
      return NextResponse.json(
        { ok: false, error: "Chybí povinné údaje: jméno, e-mail nebo popis." },
        { status: 400 }
      );
    }

    // 2. Kontrola ENV proměnných
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.error("Chyba konfigurace: Chybí SMTP parametry v .env");
      return NextResponse.json(
        { ok: false, error: "Server není správně nakonfigurován pro odesílání e-mailů." },
        { status: 500 }
      );
    }

    // 3. Nastavení Nodemaileru
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      // Port 465 vyžaduje SSL (true), port 587 obvykle STARTTLS (false)
      secure: Number(SMTP_PORT) === 465, 
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      // Zvýšíme stabilitu při pomalejším připojení
      connectionTimeout: 10000, 
    });

    const targetEmail = TO_EMAIL || SMTP_USER;

    // 4. Odeslání e-mailu
    await transporter.sendMail({
      from: `"DIGITÁTA Web" <${SMTP_USER}>`,
      to: targetEmail,
      replyTo: email,
      subject: `Nová žádost o mentoring – ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #002D62;">Nová žádost o mentoring</h2>
          <hr />
          <p><strong>Jméno:</strong> ${escapeHtml(name)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
          <p><strong>Věk:</strong> ${age ? escapeHtml(age) : "—"}</p>
          <p><strong>Formát:</strong> ${escapeHtml(format)}</p>
          <p><strong>Co řeší:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${escapeHtml(goal).replace(/\n/g, "<br/>")}
          </div>
          <hr />
          <p style="font-size: 0.8em; color: #777;">Odesláno z kontaktního formuláře digitatastudio.cz</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error("Mentoring API Error:", error);
    
    // Vrátíme srozumitelnou chybu, pokud ji známe
    const message = error?.code === 'EAUTH' 
      ? "Chyba přihlášení k e-mailovému serveru (špatné heslo)." 
      : "Nepodařilo se odeslat e-mail. Zkuste to prosím později.";

    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
