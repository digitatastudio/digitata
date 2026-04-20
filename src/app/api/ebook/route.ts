import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ ok: false, error: "Chybí email" }, { status: 400 });
    }

    // 1. Odeslání do Ecomailu
    const res = await fetch(`https://api2.ecomailapp.cz/lists/VASE_ID_SEZNAMU/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "key": process.env.ECOMAIL_API_KEY as string,
      },
      body: JSON.stringify({
        contact: {
          email: email,
          name: name || "", // Jméno je volitelné
          tags: ["ebook_2026"] // Tento štítek spustí automatizaci v Ecomailu
        },
        update: true, 
        trigger_autoresponders: true // TOTO JE NEJDŮLEŽITĚJŠÍ
      }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        console.error("Ecomail error:", errorData);
        return NextResponse.json({ ok: false, error: "Chyba Ecomailu" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}