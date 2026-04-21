import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ ok: false, error: "Chybí email" }, { status: 400 });
    }

    // 1. Odeslání do Ecomailu - ID seznamu nastaveno na 1
    const res = await fetch(`https://api2.ecomailapp.cz/lists/1/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "key": process.env.ECOMAIL_API_KEY as string,
      },
      body: JSON.stringify({
        contact_data: { // OPRAVA: Ecomail vyžaduje název "contact_data"
          email: email,
          name: name || "", 
          tags: ["ebook_2026"] 
        },
        update_existing: true, // OPRAVA: Ecomail vyžaduje název "update_existing"
        trigger_autoresponders: true 
      }),
    });

    // 2. Kontrola, jestli Ecomail nehodil chybu
    if (!res.ok) {
      let errorData;
      try {
         // Zkusíme přečíst, co přesně se Ecomailu nelíbilo
         errorData = await res.json();
      } catch (e) {
         errorData = "Ecomail nevrátil čitelnou chybu.";
      }
      console.error("Ecomail error:", errorData);
      return NextResponse.json({ ok: false, error: "Chyba při komunikaci s Ecomailem." }, { status: 400 });
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("Kritická chyba serveru:", error);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}