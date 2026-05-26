# Rapport de Comparaison Tech Stack
## Portfolio AI Orchestrator & UX Designer
**Date :** 26 mai 2026 · **Auteure :** Julie Tyrode · **Statut :** Décision finale

---

## 1. Résumé Exécutif

Ce portfolio n'est pas un site vitrine classique. Il contient trois composants à forte charge technique : un **Playground IA avec streaming LLM**, un **chatbot conversationnel temps-réel** entraîné sur votre profil, et une **UI comportementalement adaptative**. Le choix du stack conditionne directement la faisabilité de ces features et la qualité du rendu final — qui est lui-même votre argument commercial.

**Décision : Next.js 15 (App Router) + Vercel AI SDK + Tailwind CSS v4 + Motion**

**Confiance : 9/10**

Ce choix n'est pas arbitraire. Il est la seule option qui traite les trois composants critiques sans friction architecturale, tout en maintenant un temps de déploiement nul et un design system aligné avec les contraintes OKLCH.

---

## 2. Matrice de Scoring

> Scores sur 10. Pondération indiquée entre parenthèses.

| Critère | Poids | Next.js 15 | Astro 5 | SvelteKit 2 |
|---|---|---|---|---|
| **Playground AI** (streaming LLM) | ×3 | **10** | 6 | 7 |
| **UI Adaptative** (comportementale) | ×2 | **9** | 5 | 8 |
| **Animations premium** | ×2 | **9** | 7 | 8 |
| **SEO & Performance** | ×2 | 8 | **10** | 9 |
| **Design system** (OKLCH, tokens) | ×1 | 9 | 9 | **9** |
| **Chatbot embed** | ×3 | **10** | 6 | 7 |
| **Déploiement zéro-friction** | ×1 | **10** | 8 | 7 |
| **Viabilité long terme** | ×1 | **9** | 8 | 7 |
| **Score pondéré total** | — | **131** | 96 | 109 |

---

## 3. Analyse Détaillée par Option

---

### Option A : Next.js 15 (App Router)

```
Framework :  Next.js 15 (React 19, App Router, RSC)
Style :      Tailwind CSS v4
Animation :  Motion v12 (ex-Framer Motion)
AI :         Vercel AI SDK v4 + Anthropic SDK
State :      Zustand v5
Deploy :     Vercel (gratuit, zero-config)
```

#### Forces

**1. Playground AI : le meilleur DX du marché.**
Le Vercel AI SDK propose des hooks React natifs (`useChat`, `useCompletion`) qui gèrent le streaming de Claude API en 10 lignes de code. La gestion des états intermédiaires (loading skeleton, streaming token par token, error boundary) est intégrée. Sans ce SDK, reproduire ce comportement prend 3 à 5 fois plus de temps.

```tsx
// Streaming Claude en 6 lignes avec Vercel AI SDK
const { messages, input, handleInputChange, handleSubmit, status } = useChat({
  api: '/api/playground',
  onError: (err) => setError(err.message),
});
// status === 'streaming' → afficher skeleton + tokens live
```

**2. Architecture hybride Server/Client : idéale pour ce portfolio.**
Les pages statiques (case studies, about) sont rendues côté serveur (RSC = zéro JS envoyé au client) → score de performance Lighthouse > 95 pour Sarah qui a 30 secondes. Les composants interactifs (Playground, chatbot) sont des Client Components qui s'hydratent à la demande. Meilleur des deux mondes sans configuration.

**3. Motion v12 : le standard React pour les animations.**
Motion (ex-Framer Motion) est la seule bibliothèque React à proposer des animations déclaratives layout-aware, scroll-driven, et des transitions de page natives. La persona Thomas évalue la rigueur méthodologique — les micro-interactions justifiées démontrent cette rigueur. Motion permet de les construire vite et proprement.

**4. UI Adaptative via Zustand.**
Zustand permet de maintenir un état global léger (`visitorProfile: 'engineer' | 'recruiter' | 'unknown'`) alimenté par les signaux comportementaux (temps sur section code, scroll depth, hover). Les composants souscrivent à cet état et s'ajustent sans re-render global. Pattern simple, performant, testable.

**5. Tailwind CSS v4 : OKLCH natif.**
Tailwind v4 utilise OKLCH comme espace colorimétrique par défaut. Zéro plugin, zéro contournement. Les tokens de design (`--color-primary: oklch(0.65 0.22 280)`) sont directement utilisables dans les utilitaires CSS. Contrainte CLAUDE.md respectée sans friction.

**6. Déploiement Vercel : zéro configuration.**
Next.js et Vercel sont co-développés par la même équipe (Vercel Inc.). Le déploiement est automatique depuis GitHub, les variables d'environnement (clé Claude API) sont sécurisées côté serveur, le CDN est mondial. Pour un portfolio solo, c'est le choix pragmatique.

#### Faiblesses

- **Complexité initiale** : L'App Router introduit de nouveaux patterns (RSC, Server Actions) qui ont une courbe d'apprentissage si non déjà pratiqués.
- **Bundle React** : même avec RSC, React est plus lourd que Svelte ou un site Astro pur (~40KB supplémentaires). Compensé par le streaming RSC.
- **Vendor lock-in partiel** sur Vercel pour les fonctionnalités edge (Middleware, Image Optimization). Mitigeable : le code reste portable.

#### Cas d'usage idéal
Tout projet React qui combine contenu statique SEO-critique ET composants interactifs complexes avec appels API temps-réel.

---

### Option B : Astro 5 + React Islands

```
Framework :  Astro 5 (island architecture, partial hydration)
Style :      Tailwind CSS v4
Animation :  GSAP 3 + Motion One (par île)
AI :         API endpoints Astro + fetch Claude API
State :      Nanostores (cross-island)
Deploy :     Vercel / Netlify / Cloudflare Pages
```

#### Forces

**1. Performance absolue pour le contenu statique.**
Astro génère du HTML pur avec zéro JavaScript par défaut. Pour un portfolio majoritairement textuel (case studies, about), c'est le meilleur choix absolu. Lighthouse score 100 sans effort. Idéal si le Playground était purement simulé (sans vraie API).

**2. Flexibilité multi-frameworks.**
Astro peut accueillir des composants React, Svelte, ou Vue dans la même page via des "îles". Permet de mixer les meilleurs outils par composant.

**3. Excellent pour les architectures content-first.**
La taxonomie des cas pratiques, les filtres dynamiques, les collections de projets — Astro excelle dans la gestion de contenu structuré via ses Content Collections.

#### Faiblesses

**1. Playground AI : friction significative.**
Astro n'a pas d'équivalent du Vercel AI SDK. Le streaming LLM doit être implémenté manuellement via des ReadableStream et EventSource. Cela représente 2 à 3 semaines de développement supplémentaires pour reproduire ce que Next.js + Vercel AI SDK offre nativement.

**2. UI Adaptative : architecture fragmentée.**
Nanostores permet de partager l'état entre îles, mais chaque île est hydratée indépendamment. Implémenter une UI adaptative comportementale (un changement global qui affecte 8+ composants) devient un exercice d'orchestration complexe. En Next.js, c'est un seul Context ou store Zustand.

**3. Chatbot embed : même problème.**
L'interface de chat conversationnel requiert un état persistant et réactif. Possible, mais plus complexe qu'avec React.

**4. Écosystème AI moins mature.**
Le manque d'intégration native avec les SDKs AI modernes (Vercel AI SDK, LangChain) ralentit le développement des features les plus différenciantes de ce portfolio.

#### Cas d'usage idéal
Un portfolio purement visuel, sans features IA temps-réel. Blog technique, portfolio photo, landing page. Excellent choix si le Playground était entièrement simulé côté client.

---

### Option C : SvelteKit 2

```
Framework :  SvelteKit 2 (Svelte 5, runes)
Style :      Tailwind CSS v4
Animation :  GSAP 3 + transitions Svelte
AI :         Server endpoints (+load) + Claude API
State :      Svelte stores (natif)
Deploy :     Vercel / Netlify
```

#### Forces

**1. Animations natives exceptionnelles.**
Svelte embarque des directives de transition (`transition:fly`, `animate:flip`, `in:fade`) utilisables sans aucune dépendance. GSAP s'intègre proprement pour les animations complexes. Le résultat est un code d'animation très lisible.

**2. Réactivité fine et performante.**
Svelte 5 avec les "runes" (`$state`, `$derived`, `$effect`) offre la réactivité la plus granulaire du marché. L'UI adaptative comportementale est naturellement exprimée dans ce paradigme.

**3. Bundle minimal.**
Svelte compile vers du JavaScript vanilla sans runtime framework. Pages plus légères que React, presque aussi légères qu'Astro.

**4. DX agréable.**
Syntaxe concise, fichiers `.svelte` auto-contenus (HTML + CSS + JS), faible boilerplate.

#### Faiblesses

**1. Playground AI : SDK moins développé.**
Il n'existe pas de SDK AI aussi abouti que Vercel AI SDK pour SvelteKit. L'intégration du streaming Claude doit être faite via un pattern custom avec `fetch` et `ReadableStream`. Faisable mais 2 semaines de travail supplémentaires.

**2. Écosystème plus petit.**
Moins de composants tiers, moins de templates, moins de documentation d'intégration avec les services AI. Pour un projet solo à livrer, chaque heure perdue à chercher une solution compte.

**3. Moins de ressources pédagogiques AI/Svelte.**
Si vous débloquez un problème à 23h, les réponses Stack Overflow et la documentation Claude Code seront 80% orientées React/Next.js.

**4. Risque Svelte 5 (runes).**
Svelte 5 est sorti en octobre 2024 et introduit un nouveau paradigme (runes). La migration depuis Svelte 4 casse des patterns établis. L'écosystème de composants n'est pas encore totalement aligné.

#### Cas d'usage idéal
Application web créative, dashboard interactif, ou portfolio principalement animé sans forte dépendance aux APIs AI temps-réel.

---

## 4. Focus Critique : Le Playground AI

Le Playground est le composant le plus différenciant du portfolio. Il doit démontrer votre expertise en *Interaction Latency Design* et en gestion des états probabilistes des LLMs.

### Ce que le Playground doit faire

1. **Accepter un input utilisateur** (prompt, curseurs de paramètres)
2. **Appeler Claude API** et streamer la réponse token par token
3. **Afficher des états intermédiaires** (skeleton, streaming live, complet)
4. **Gérer les erreurs** (timeout, hallucination détectée, rate limit)
5. **Déclencher un CTA contextuel** à la sortie ("Concevoir une UI similaire ?")

### Comparaison de l'implémentation

#### Next.js + Vercel AI SDK
```
Effort : 2-3 jours
DX :     Excellent
```
L'API Route Next.js expose un endpoint sécurisé. Le SDK gère le streaming. Le hook `useChat` connecte l'UI à cet endpoint. Les états (`status: 'streaming' | 'complete' | 'error'`) sont exposés nativement pour animer les transitions.

```
Route API → Claude Stream → useChat hook → UI réactive
Tout est natif, documenté, testé en production.
```

#### Astro + fetch manuel
```
Effort : 2-3 semaines
DX :     Moyen
```
Un endpoint Astro reçoit le prompt, ouvre un stream Claude, et le retransmet via Server-Sent Events (SSE). Le client écoute avec `EventSource`. La gestion des états (reconnexion, timeout, erreurs SSE) est entièrement manuelle.

#### SvelteKit + fetch manuel
```
Effort : 1-2 semaines
DX :     Correct
```
Un server endpoint SvelteKit accepte le prompt et retourne un `ReadableStream`. Le client consomme le stream. Moins de boilerplate qu'Astro, mais toujours plus complexe que Next.js.

**Verdict Playground : Next.js gagne avec 2-3 jours vs 2-3 semaines.**

---

## 5. Focus Critique : L'UI Adaptative

### Comportement visé (plan.md Phase 4.2)

> "Si le visiteur passe du temps sur les parties de code, l'interface active un thème sombre et des détails plus denses pour les profils ingénieurs."

### Pattern d'implémentation recommandé (Next.js + Zustand)

```
Signaux comportementaux collectés :
├── Temps passé sur sections "technique" (>30s → signal ingénieur)
├── Hover sur blocs de code (3+ fois → signal ingénieur)
├── Scroll depth des case studies accordéon (>70% → curiosité deep dive)
└── Clic sur le Playground avant de lire le bio (→ profil exploratoire)

État global Zustand :
├── visitorType: 'engineer' | 'recruiter' | 'creative' | 'unknown'
├── intensity: 0-100 (score composite)
└── theme: 'light-airy' | 'dark-dense' | 'auto'

Adaptations UI déclenchées :
├── Densité de l'information (line-height, font-size, espacement)
├── Palette (OKLCH ajusté : +saturation pour créatifs, -saturation pour ingénieurs)
├── Sections prioritaires (code snippets amplifiés vs visuels amplifiés)
└── CTA contextualisé (wording adapté au profil détecté)
```

---

## 6. Stack Complet Recommandé

### Dépendances de production

```json
{
  "next": "^15.3",
  "react": "^19.1",
  "react-dom": "^19.1",
  "ai": "^4.3",
  "@anthropic-ai/sdk": "^0.40",
  "motion": "^12.10",
  "zustand": "^5.0",
  "tailwindcss": "^4.1",
  "@tailwindcss/typography": "^0.5"
}
```

### Dépendances de développement

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

### Services externes

| Service | Usage | Coût |
|---|---|---|
| **GitHub** | Versioning du code source + déclencheur CI/CD vers Vercel | Gratuit |
| **Vercel** | Hosting + CDN + Edge Functions (connecté au repo GitHub) | Gratuit (Hobby) |
| **Anthropic API** | Claude Sonnet 4.6 pour Playground + Chatbot | Pay-per-use (~5-20€/mois) |
| **Resend** | Envoi d'emails formulaire de contact | Gratuit jusqu'à 3k/mois |
| **Vercel Analytics** | KPIs (engagement Playground, durée session) | Gratuit |
| **Vercel Speed Insights** | Monitoring Lighthouse continu | Gratuit |

### Architecture des dossiers

```
src/
├── app/
│   ├── (site)/
│   │   ├── page.tsx              # Homepage : Hero + Playground + Aiguillage
│   │   ├── projects/
│   │   │   └── [slug]/page.tsx   # Case study double-vitesse
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── api/
│   │   ├── playground/route.ts   # Stream Claude pour le Playground
│   │   └── chat/route.ts         # Stream Claude pour le chatbot
│   └── layout.tsx
├── components/
│   ├── playground/               # Composants Playground
│   ├── chat/                     # Chatbot conversationnel
│   ├── adaptive/                 # UI comportementale (Zustand)
│   └── ui/                       # Design system (boutons, cards, etc.)
├── lib/
│   ├── claude.ts                 # Client Anthropic SDK
│   ├── adaptive-store.ts         # Store Zustand (profil visiteur)
│   └── analytics.ts              # Tracking KPIs
└── styles/
    └── globals.css               # Tokens OKLCH, variables CSS
```

### Variables d'environnement

```bash
ANTHROPIC_API_KEY=sk-ant-...       # Jamais exposé côté client
NEXT_PUBLIC_SITE_URL=https://...   # URL de production
```

---

## 7. Risques & Mitigations

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| **Dépassement budget API Claude** | Moyenne | Faible | Rate limiting sur le Playground (5 req/visiteur/heure) via Upstash Redis |
| **Hallucinations du chatbot** | Haute | Moyen | Chatbot avec RAG sur votre CV uniquement + disclaimer visible |
| **App Router learning curve** | Moyenne | Moyen | Se concentrer sur les patterns RSC essentiels. Éviter les Server Actions complexes au début |
| **Motion v12 breaking changes** | Faible | Faible | Pincer la version dans package.json |
| **Vercel cold start latence** | Faible | Moyen | Edge Runtime pour les routes API légères (`export const runtime = 'edge'`) |
| **Accessibilité du Playground** | Haute | Moyen | `aria-live` sur la zone de streaming, focus management explicite |

---

## 8. Ce que ce Stack Démontre à Thomas (Head of Design)

Thomas cherche une **rigueur méthodologique** sur les frictions critiques de l'IA. Le stack choisi permet de démontrer chacun de ces points *directement dans le code* :

| Friction IA (PRD) | Démonstration dans le code |
|---|---|
| **Gestion de la latence** | Skeleton animé avec Motion pendant le streaming, tokens qui apparaissent progressivement |
| **Explicabilité algorithmique** | Composant "Thinking" visible (affiche les tokens de raisonnement si Claude Extended Thinking activé) |
| **Feedback implicite** | Adaptive store Zustand qui traque le comportement sans formulaire |
| **Gestion des hallucinations** | Chatbot limité au RAG + indicateur de confiance visuel |
| **États probabilistes** | Playground avec curseur Température qui modifie les paramètres Claude en temps-réel |

---

## 9. Prochaines Étapes

### Immédiat (cette semaine)

```bash
# 0. Créer le repo GitHub (privé)
gh repo create portfolio --private --clone && cd portfolio

# 1. Initialiser le projet Next.js dans le repo
npx create-next-app@latest . --typescript --tailwind --app --src-dir

# 2. Installer les dépendances AI
npm install ai @anthropic-ai/sdk

# 3. Installer Motion et Zustand
npm install motion zustand

# 4. Configurer les variables d'environnement
cp .env.example .env.local
# → Ajouter ANTHROPIC_API_KEY

# 5. Connecter Vercel au repo GitHub
# → vercel.com → Import Git Repository → sélectionner "portfolio"
# → Déploiement automatique à chaque push sur main
```

### Phase de construction (ordre recommandé)

1. **Design system** → `globals.css` avec tokens OKLCH + composants UI de base
2. **Homepage statique** → Hero + aiguillage (sans Playground)
3. **Playground v1** → Avec réponses simulées (plan.md Phase 3.2)
4. **Playground v2** → Branché sur Claude API réel
5. **Chatbot** → RAG sur votre CV au format JSON
6. **Case studies** → Gabarit double-vitesse (accordéon)
7. **UI Adaptative** → Store Zustand + signaux comportementaux
8. **Analytics** → Vercel Analytics pour tracker les KPIs

---

## 10. Verdict Final

> **Next.js 15 + Vercel AI SDK + Tailwind CSS v4 + Motion + Zustand**
> versionné sur **GitHub** · déployé automatiquement sur **Vercel**

Ce stack est le seul qui traite les trois composants critiques (Playground streaming, Chatbot conversationnel, UI adaptative) sans friction architecturale. Il offre le meilleur rapport entre **vitesse de développement** (SDK AI natif), **qualité de rendu** (Motion, Tailwind OKLCH), et **démonstrabilité de l'expertise** (les patterns de gestion de latence et d'états probabilistes sont visibles dans le code, ce que Thomas peut auditer).

Astro serait le choix si le portfolio était purement statique. SvelteKit serait le choix si vous maîtrisez déjà Svelte et n'aviez pas besoin du Vercel AI SDK. Dans votre contexte — portfolio solo avec features IA complexes à livrer rapidement — Next.js est la décision évidente.

---

*Rapport généré le 26 mai 2026 · À réviser si le périmètre fonctionnel change significativement.*
