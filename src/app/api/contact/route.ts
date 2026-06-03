import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, prenom, email, message } = body;

    if (!nom?.trim() || !prenom?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, error: "Service d'email non configuré." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "julie.tyrode@gmail.com",
      subject: `Nouveau message de ${prenom} ${nom}`,
      text: `De : ${prenom} ${nom} <${email}>\n\n${message}`,
      html: `<p><strong>De :</strong> ${prenom} ${nom} &lt;${email}&gt;</p><p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: "Erreur lors de l'envoi." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erreur serveur." },
      { status: 500 }
    );
  }
}
