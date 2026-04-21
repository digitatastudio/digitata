import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ ok: false, error: "Chybí email" }, { status: 400 });
    }

    // Odeslání do Ecomailu - zkontroluj, jestli máš seznam kontaktů opravdu s ID 1
    const res = await fetch(`https://api2.ecomailapp.cz/lists/1/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "key": process.env.ECOMAIL_API_KEY as string,
      },
      body: JSON.stringify({
        subscriber_data: { // OPRAVA: Pro tento endpoint Ecomail vyžaduje 'subscriber_data'
          email: email,
          name: name || "", 
          tags: ["ebook_2026"] 
        },
        update_existing: true, 
        trigger_autoresponders: true 
      }),
    });

    if (!res.ok) {
      let errorData;
      try {
         errorData = await res.json();
      } catch (e) {
         errorData = res.statusText;
      }
      console.error("Ecomail error:", errorData);
      
      // TADY JE KOUZLO: Vypíšeme přesnou odpověď Ecomailu rovnou do toho okýnka na webu!
      return NextResponse.json({ 
        ok: false, 
        error: `Ecomail říká: ${JSON.stringify(errorData)}` 
      }, { status: 400 });
    }

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}