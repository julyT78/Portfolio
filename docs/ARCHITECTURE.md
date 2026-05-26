# ARCHITECTURE.md
## Portfolio AI Orchestrator — Décisions Techniques Retenues

> Document de référence. Ne contient que les choix retenus.
> Comparaison des options écartées → `ARCHITECTURE_Comparaison.md`

**Dernière mise à jour :** 26 mai 2026

---

## 1. Vue d'Ensemble du Stack

```
GitHub (source of truth)
  └── push sur main
        └── Vercel (CI/CD + hosting + CDN)
              └── Next.js 15 (App Router, React 19)
                    ├── [locale] routing → next-intl (FR / EN)
                    ├── Tailwind CSS v4 (OKLCH natif)
                    ├── Motion v12 (animations)
                    ├── Zustand v5 (état adaptatif visiteur)
                    ├── MDX via next-mdx-remote (case studies)
                    └── API Routes sécurisées
                          ├── /api/playground → Anthropic SDK (streaming)
                          └── /api/chat       → Anthropic SDK (streaming)
```

---

## 2. Infrastructure & Déploiement

### Versioning — GitHub
- Repo privé GitHub, branche principale `main`
- Chaque push déclenche un déploiement automatique sur Vercel
- Pull Requests → preview deployments Vercel (URL unique par PR)

### Hosting — Vercel (plan Hobby, gratuit)
- CDN mondial, Edge Network intégré
- Edge Runtime activé sur les routes API (`export const runtime = 'edge'`) pour minimiser la latence des streams Claude
- Variables d'environnement gérées dans le dashboard Vercel (jamais dans le repo)
- Vercel Analytics + Speed Insights activés pour le suivi des KPIs

```bash
# Connexion initiale
gh repo create portfolio --private
vercel link  # connecte le repo GitHub à Vercel
```

---

## 3. Framework Frontend — Next.js 15 (App Router)

| Décision | Valeur |
|---|---|
| Framework | Next.js 15.3+ |
| Runtime React | React 19.1 |
| Mode de rendu | Hybride RSC + Client Components |
| Pages statiques | React Server Components (RSC) — zéro JS client |
| Composants interactifs | `'use client'` — hydratation à la demande |
| TypeScript | Strict, `tsconfig.json` paths configurés |

### Philosophie de rendu
- **Pages statiques** (Homepage hero, About, Case studies) → RSC → HTML servi directement, Lighthouse > 95
- **Composants interactifs** (Playground, Chatbot, UI Adaptative) → Client Components, chargés à la demande
- **API Routes** (`/api/playground`, `/api/chat`) → Edge Runtime, stream vers le client

---

## 4. Internationalisation — next-intl

Le portfolio est **bilingue FR / EN**. L'i18n est géré via `next-intl` avec le routing `[locale]` natif de l'App Router.

### Structure de routing

```
src/app/
└── [locale]/                     # 'fr' | 'en'
    ├── layout.tsx                # Layout avec provider next-intl
    ├── page.tsx                  # Homepage
    ├── projects/
    │   └── [slug]/
    │       └── page.tsx          # Case study
    ├── about/
    │   └── page.tsx
    └── contact/
        └── page.tsx
```

### Middleware de détection

```ts
// middleware.ts (racine du projet)
import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',            // FR par défaut
});
```

### Chaînes UI — fichiers de traduction

```
messages/
├── fr.json   # Toutes les chaînes UI en français
└── en.json   # Toutes les chaînes UI en anglais
```

---

## 5. Gestion du Contenu — MDX dans Git

Les case studies sont des fichiers **MDX** stockés dans le dépôt Git. Pas de CMS externe.

### Librairie : `next-mdx-remote`
- Permet de charger des fichiers MDX depuis `/content/` (hors `app/`)
- Support des composants React personnalisés dans le MDX
- Compatible avec les métadonnées frontmatter (titre, KPIs, date, tags, locale)

### Structure du contenu

```
content/
└── projects/
    ├── agent-latency-design/
    │   ├── fr.mdx                # Version française
    │   └── en.mdx                # Version anglaise
    ├── llm-onboarding-ux/
    │   ├── fr.mdx
    │   └── en.mdx
    └── prompt-ui-system/
        ├── fr.mdx
        └── en.mdx
```

### Frontmatter d'un case study

```yaml
---
title: "Design de la latence LLM"
date: "2025-11"
tags: ["Interaction Latency", "Agent UX", "Streaming UI"]
kpis:
  - label: "Réduction temps de prompt"
    value: "-40%"
  - label: "Baisse des abandons pendant chargement"
    value: "-62%"
coverImage: "/images/projects/agent-latency-design/cover.jpg"
---
```

### Chatbot RAG — données sources

Le chatbot conversationnel est alimenté par un fichier JSON structuré (pas de base vectorielle externe au lancement) :

```
content/
└── cv-knowledge-base.json    # Expériences, projets, compétences, philosophie
```

---

## 6. Design System — Tailwind CSS v4

| Décision | Valeur |
|---|---|
| Version | Tailwind CSS 4.1+ |
| Configuration | CSS-first (plus de `tailwind.config.js`) |
| Espace colorimétrique | OKLCH natif — aucun plugin requis |
| Typography | `@tailwindcss/typography` pour le rendu MDX |

### Tokens OKLCH dans `globals.css`

```css
/* src/styles/globals.css */
@import "tailwindcss";

@theme {
  /* Couleurs principales en OKLCH */
  --color-primary:    oklch(0.62 0.22 278);   /* Violet IA */
  --color-surface:    oklch(0.98 0.005 278);  /* Fond clair */
  --color-surface-dark: oklch(0.12 0.02 278); /* Fond sombre */
  --color-text:       oklch(0.18 0.01 278);
  --color-muted:      oklch(0.55 0.03 278);

  /* Typography */
  --font-sans:  var(--font-geist-sans);       /* ou Inter variable */
  --font-mono:  var(--font-geist-mono);

  /* Mesures */
  --content-width: 65ch;   /* Longueur de ligne corps de texte */
}
```

**Règles absolues (de CLAUDE.md) :**
- Jamais `#000` ou `#fff` — toujours OKLCH
- Pas de gradient text, pas de glassmorphism par défaut, pas de grilles de cards identiques
- Thème sombre justifié par une scène d'usage physique, pas par esthétique seule

---

## 7. Animations — Motion v12

| Décision | Valeur |
|---|---|
| Librairie | Motion 12.10+ (ex-Framer Motion) |
| Paradigme | Déclaratif, layout-aware |

### Usage par contexte

| Animation | API Motion | Déclencheur |
|---|---|---|
| Entrée des éléments au scroll | `<motion.div>` + `whileInView` | Intersection Observer natif |
| Transitions de page | `<AnimatePresence>` + layout | Changement de route Next.js |
| Streaming Playground (tokens) | CSS + `useMotionValue` | Status `'streaming'` du hook |
| Skeleton → contenu | `<motion.div>` + `variants` | Status `'complete'` |
| UI Adaptative (transition thème) | `animate` + `transition: { duration: 0.6 }` | Changement `visitorType` Zustand |
| Micro-interactions (hover, focus) | `whileHover`, `whileFocus` | Natif |

---

## 8. State Management — Zustand v5

Zustand gère l'état global de l'**UI Adaptative** (profil comportemental du visiteur).

### Store principal

```ts
// src/lib/adaptive-store.ts
interface AdaptiveStore {
  visitorType: 'engineer' | 'recruiter' | 'creative' | 'unknown';
  intensity: number;                // 0-100, score composite
  theme: 'light-airy' | 'dark-dense' | 'auto';

  // Actions
  recordSignal: (signal: BehaviorSignal) => void;
  computeProfile: () => void;
}

type BehaviorSignal =
  | { type: 'code-hover'; count: number }
  | { type: 'technical-dwell'; seconds: number }
  | { type: 'accordion-depth'; percent: number }
  | { type: 'playground-first-click' };
```

### Règles de déclenchement

| Signal | Seuil | Effet |
|---|---|---|
| Hover sur blocs de code | ≥ 3 fois | `visitorType → 'engineer'` |
| Temps sur sections techniques | > 30s | `intensity += 30` |
| Scroll accordéon case study | > 70% | `visitorType → 'engineer'` ou `'creative'` |
| Clic Playground avant bio | immédiat | `visitorType → 'creative'` |
| Lecture bio complète d'abord | — | `visitorType → 'recruiter'` |

---

## 9. IA & API

### Playground & Chatbot — Vercel AI SDK v4 + Anthropic SDK

Les appels Claude sont **exclusivement côté serveur** via des API Routes Next.js. La clé API n'est jamais exposée au client.

```ts
// src/app/api/playground/route.ts
import { streamText } from 'ai';
import Anthropic from '@anthropic-ai/sdk';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, temperature } = await req.json();
  const result = await streamText({
    model: anthropic('claude-sonnet-4-6'),
    messages,
    temperature,           // Paramètre exposé dans l'UI Playground
    maxTokens: 800,
  });
  return result.toDataStreamResponse();
}
```

```tsx
// src/components/playground/PlaygroundUI.tsx
'use client';
import { useChat } from 'ai/react';

export function PlaygroundUI() {
  const { messages, input, handleSubmit, status } = useChat({
    api: '/api/playground',
  });
  // status: 'idle' | 'loading' | 'streaming' | 'error'
  // → piloter les états visuels (skeleton, tokens live, completion)
}
```

### Modèle Claude utilisé
- **Playground** : `claude-sonnet-4-6` (équilibre qualité/vitesse/coût)
- **Chatbot RAG** : `claude-sonnet-4-6` (avec system prompt contenant le CV JSON)

### Rate limiting du Playground
- Limiter à **5 requêtes / visiteur / heure** via **Upstash Redis** (plan gratuit, Edge-compatible)
- Identifiant : IP anonymisée (hash SHA-256, pas de stockage PII)

---

## 10. Services Externes

| Service | Usage | Coût |
|---|---|---|
| **GitHub** | Source of truth + CI/CD trigger | Gratuit |
| **Vercel** | Hosting, CDN, Edge Functions, preview URLs | Gratuit (Hobby) |
| **Anthropic API** | Claude Sonnet 4.6 (Playground + Chatbot) | ~5-20 €/mois (usage réel) |
| **Upstash Redis** | Rate limiting du Playground | Gratuit (10k req/jour) |
| **Resend** | Envoi d'emails depuis le formulaire de contact | Gratuit (3k emails/mois) |
| **Vercel Analytics** | KPIs : engagement Playground, durée session | Gratuit |
| **Vercel Speed Insights** | Monitoring Lighthouse continu | Gratuit |

**Coût mensuel estimé : 5-20 €** (uniquement l'API Anthropic)

---

## 11. Structure Complète du Projet

```
portfolio/
├── content/
│   ├── projects/
│   │   └── [slug]/
│   │       ├── fr.mdx
│   │       └── en.mdx
│   └── cv-knowledge-base.json      # Base RAG du chatbot
│
├── messages/
│   ├── fr.json                     # Chaînes UI françaises
│   └── en.json                     # Chaînes UI anglaises
│
├── public/
│   └── images/
│       └── projects/[slug]/        # Assets visuels des case studies
│
├── src/
│   ├── app/
│   │   ├── [locale]/               # next-intl routing
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx            # Homepage : Hero + Playground + Aiguillage
│   │   │   ├── projects/[slug]/
│   │   │   │   └── page.tsx        # Case study double-vitesse
│   │   │   ├── about/page.tsx
│   │   │   └── contact/page.tsx
│   │   └── api/
│   │       ├── playground/route.ts # Stream Claude — Playground
│   │       └── chat/route.ts       # Stream Claude — Chatbot
│   │
│   ├── components/
│   │   ├── playground/             # Composants du Playground IA
│   │   ├── chat/                   # Interface chatbot conversationnel
│   │   ├── adaptive/               # Composants réactifs au profil Zustand
│   │   ├── mdx/                    # Composants custom injectés dans MDX
│   │   └── ui/                     # Design system (Button, Card, Badge…)
│   │
│   ├── lib/
│   │   ├── claude.ts               # Instance Anthropic SDK
│   │   ├── adaptive-store.ts       # Store Zustand profil visiteur
│   │   ├── mdx.ts                  # Helpers next-mdx-remote
│   │   ├── rate-limit.ts           # Upstash Redis rate limiter
│   │   └── analytics.ts            # Helpers Vercel Analytics
│   │
│   ├── styles/
│   │   └── globals.css             # Tokens OKLCH, @theme Tailwind v4
│   │
│   └── middleware.ts               # next-intl locale detection
│
├── .env.local                      # Variables locales (jamais commitées)
├── .env.example                    # Template public des variables requises
├── middleware.ts                   # (lien symbolique ou re-export)
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 12. Dépendances (package.json)

### Production

```json
{
  "next": "^15.3",
  "react": "^19.1",
  "react-dom": "^19.1",
  "ai": "^4.3",
  "@anthropic-ai/sdk": "^0.40",
  "motion": "^12.10",
  "zustand": "^5.0",
  "next-intl": "^3.26",
  "next-mdx-remote": "^5.0",
  "tailwindcss": "^4.1",
  "@tailwindcss/typography": "^0.5",
  "@upstash/redis": "^1.34",
  "@upstash/ratelimit": "^2.0",
  "resend": "^4.0"
}
```

### Développement

```json
{
  "typescript": "^5.7",
  "@types/react": "^19",
  "@types/node": "^22",
  "eslint": "^9",
  "eslint-config-next": "^15.3",
  "prettier": "^3.4",
  "prettier-plugin-tailwindcss": "^0.6"
}
```

---

## 13. Variables d'Environnement

```bash
# .env.example — commiter ce fichier dans Git
# .env.local  — NE JAMAIS commiter, contient les vraies valeurs

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Upstash Redis (rate limiting Playground)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Resend (formulaire de contact)
RESEND_API_KEY=re_...

# Site
NEXT_PUBLIC_SITE_URL=https://ton-domaine.com
NEXT_PUBLIC_DEFAULT_LOCALE=fr
```

---

## 14. Initialisation du Projet

```bash
# 1. Repo GitHub
gh repo create portfolio --private --clone && cd portfolio

# 2. Next.js
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# 3. Dépendances
npm install ai @anthropic-ai/sdk next-intl next-mdx-remote motion zustand \
            @upstash/redis @upstash/ratelimit resend

# 4. Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss

# 5. Variables d'environnement
cp .env.example .env.local
# → remplir ANTHROPIC_API_KEY et les autres clés

# 6. Connecter Vercel
vercel link
# → vercel.com : Import Git Repo → sélectionner "portfolio"
# → Ajouter les variables d'env dans le dashboard Vercel
```

---

*Ce document est la source de vérité technique du projet. Toute évolution du stack doit être reflétée ici.*
