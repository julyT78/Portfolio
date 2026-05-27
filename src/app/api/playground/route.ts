import { NextRequest, NextResponse } from "next/server";
import { anthropic, SYSTEM_PROMPT } from "@/lib/anthropic";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { challenge, temperature } = await req.json();

    if (!challenge || typeof challenge !== "string" || challenge.length > 200) {
      return NextResponse.json({ error: "Paramètre invalide" }, { status: 400 });
    }

    const temp = typeof temperature === "number" && temperature >= 0 && temperature <= 1
      ? temperature
      : 0.7;

    if (!process.env.ANTHROPIC_API_KEY) {
      // En développement sans clé : réponse simulée
      const mockResponse = `Pour "${challenge}", l'approche prioritaire est de traiter la friction comme un signal de design, pas une erreur. Concevoir des états intermédiaires explicites (skeleton loaders sémantiques, progression lisible), calibrer les attentes utilisateur dès l'onboarding, et mesurer le taux de complétion malgré la latence. L'enjeu n'est pas d'éliminer l'attente — c'est d'en faire une expérience de confiance.`;

      return new Response(mockResponse, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // Streaming via SDK Anthropic
    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      temperature: temp,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Défi de design IA : "${challenge}". Donne ton approche de design concrète.`,
        },
      ],
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[Playground API]", error);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
