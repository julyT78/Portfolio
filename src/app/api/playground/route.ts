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
      // Sans clé API : réponse simulée adaptée à chaque challenge
      const MOCK: Record<string, string> = {
        latence: `La latence n'est pas un bug — c'est une contrainte de design à part entière. L'approche : remplacer le spinner vide par un skeleton loader sémantique qui anticipe la forme du contenu. Ajouter un message de progression ("Analyse en cours…", "Formulation de la réponse…") pour rendre le temps visible. Calibrer les attentes dès l'onboarding avec une fourchette honnête. L'enjeu n'est pas d'éliminer l'attente, c'est d'en faire une expérience de confiance.`,
        explicable: `Rendre l'IA explicable, c'est concevoir la transparence sans noyer l'utilisateur. L'approche en trois couches : d'abord la réponse brute, accessible immédiatement. Ensuite un niveau "pourquoi" optionnel (icône info, accordéon) pour ceux qui veulent comprendre. Enfin un niveau "données sources" pour les profils experts. Ne jamais forcer l'explication — la proposer. Un modèle opaque qui répond juste est plus utile qu'un modèle transparent qui ralentit.`,
        hallucination: `Les hallucinations UX naissent quand l'interface promet plus que le modèle ne peut tenir. L'approche : calibrer le registre des CTAs ("suggère" plutôt que "génère"), afficher un indicateur de confiance sur les sorties critiques, et concevoir un chemin de sortie clair quand l'IA se trompe. Le design ne peut pas corriger un mauvais modèle — mais il peut empêcher l'utilisateur de lui faire confiance à l'aveugle.`,
      };

      // Correspondance souple : on cherche un mot-clé dans le challenge
      const key = challenge.toLowerCase().includes("latence")
        ? "latence"
        : challenge.toLowerCase().includes("explic")
          ? "explicable"
          : "hallucination";

      const mockResponse = MOCK[key] ?? MOCK["latence"];

      // Simulation du streaming : on envoie mot par mot avec un léger délai
      const words = mockResponse.split(" ");
      const readableMock = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          for (const word of words) {
            controller.enqueue(encoder.encode(word + " "));
            await new Promise((r) => setTimeout(r, 18 + Math.random() * 20));
          }
          controller.close();
        },
      });

      return new Response(readableMock, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
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
