# Spec — Homepage Portfolio AI Orchestrator

**Date :** 27 mai 2026
**Statut :** Validé — prêt pour implémentation
**Auteur :** Brainstorming session Julie Tyrode × Claude

---

## 1. Objectif

Concevoir la homepage du portfolio comme une démonstration vivante du positionnement AI Orchestrator & UX Designer. La page doit qualifier deux profils de visiteurs simultanément — Sarah (recruiter, 30s de scan) et Thomas (Head of Design, deep dive méthodologique) — sans leur demander de se classer explicitement.

**Tagline retenue (depuis `layout.tsx`) :**
> « L'orchestrateur, c'est le nouveau designer. Je conçois les workflows qui font raisonner les systèmes IA — de la cartographie des chaînes d'agents à l'interface qui les pilote. »

---

## 2. Structure de la page

```
Nav
└── Section 1 — Présentation aérée (above fold)
└── Section 2 — 50/50 : Pitch + Playground
└── Marquee clients (noir, pleine largeur)
└── Section 3 — Projets (grille 2×2)
└── Section 4 — About teaser
└── Section 5 — Contact CTA
└── Footer
```

---

## 3. Navigation

- **Logo :** `logoJT.svg` (public/logoJT.svg) — 28×36px, haut gauche
- **Liens :** Projets · À propos · FR / EN (switch i18n)
- **CTA droit :** pill noir "Me contacter" → ancre `#contact`
- **Comportement :** sticky, fond blanc, `border-bottom: 1px solid hairline` apparaît au scroll
- **Mobile :** collapse hamburger sous 960px, pills CTAs visibles sur la barre

---

## 4. Section 1 — Présentation aérée

Inspirée du portfolio juliencoudert.com. Fond blanc, très généreux padding vertical (≥ 96px haut/bas).

### 4.1 Contenu textuel (gauche, z-index 2)

| Élément | Valeur | Style |
|---|---|---|
| Eyebrow | `AI Orchestrator & UX Designer — Paris` | `font-mono`, 10px, uppercase, `ink/40` |
| Headline | `Je conçois des interfaces pour l'IA.` | `display-xl` (clamp 48–86px), weight 340, 3 lignes |
| Tagline | *"L'orchestrateur, c'est le nouveau designer. Je conçois les workflows qui font raisonner les systèmes IA — de la cartographie des chaînes d'agents à l'interface qui les pilote."* | 15px, weight 330, `ink/60`, line-height 1.55 |
| CTA primaire | "Voir mes projets" → `#projets` | pill noir |
| CTA secondaire | "Essayer le Playground →" → `#playground` | pill bordure |

### 4.2 Portrait fantôme (fond, z-index 1)

- **MVP : SVG géométrique abstrait** — formes simples rappelant une silhouette (cercle + rectangles), couleur `ink` à 100%, rendu à 7% d'opacité via le wrapper. Pas de photo pour le moment. La photo de profil pourra remplacer le SVG post-MVP sans changer la structure.
- **Opacité : 7%** — effet atmosphérique, non intrusif
- Pleine hauteur de la section, non cliquable (`pointer-events: none`)

### 4.3 Cards projets flottantes (z-index 2, droite)

4 cards de projets positionnées en `position: absolute` sur la moitié droite, décalées asymétriquement :

| Card | Position | Opacité | Rotation |
|---|---|---|---|
| Card 1 (Dashboard PULSE / coral) | Avant-plan, centré-droite | 1.0 | 0° |
| Card 2 (Labo IA / lilac) | Arrière-plan, bord droit | 0.55 | +2.5° |
| Card 3 (Chantier IA / mint) | Bas, légèrement à gauche | 0.35 | -1.5° |
| Card 4 (Power BI / cream) | Bas-gauche des cards | 0.70 | 0° |

> **Note :** les KPIs des cards Chantier IA et Power BI sont à confirmer. Valeurs provisoires utilisées dans la maquette : `+6 équipes embarquées` et `1 DS unifié groupe`. À mettre à jour dans `Projects.tsx` avant livraison.

Chaque card : fond coloré (bloc pastel), titre, client, image aperçu. `border-radius: 12px`, `box-shadow: 0 8px 32px rgba(0,0,0,.12)`.

**Mobile :** cards flottantes masquées sous 768px. Section devient titre + tagline + CTAs full-width.

---

## 5. Section 2 — 50/50 Pitch + Playground

Split `grid-template-columns: 1fr 1fr`, séparé de la Section 1 par une ligne `border-top: 1px solid hairline`.

### 5.1 Gauche — Pitch technique (fond blanc)

| Élément | Contenu |
|---|---|
| Eyebrow | `19 ans · Design System · IA Design depuis 2024` |
| Titre | `Concevoir pour l'IA, c'est un autre métier.` (display-lg, max 20ch) |
| Corps | 2–3 phrases sur la spécificité des interfaces probabilistes (max 38ch) |
| Métriques | `19` ans d'exp. · `8+` grands comptes · `IA` depuis 2024 — sous ligne de séparation |

### 5.2 Droite — Playground IA (fond `lime`, `#dceeb1`)

**Composant :** `<Playground />` refactorisé.

| Élément | Détail |
|---|---|
| Eyebrow | `Playground IA — Essayez maintenant` |
| Titre | `Quel défi UX voulez-vous explorer ?` |
| Sous-titre | `Choisissez un challenge, ajustez la créativité.` |
| Chips de défis | 3 boutons pills verticaux : "Gérer la latence LLM" · "Expliquer une décision IA" · "Absorber une hallucination" |
| Curseur Température | Slider 0.0 → 1.0, valeur affichée en monospace, labels Précis/Créatif |
| Zone de réponse | Panneau `rgba(255,255,255,.65)` + `backdrop-blur`, dot animé, texte streamé, bouton reset |

**États du Playground :**
- `idle` — chips actifs, pas de zone réponse
- `streaming` — chip sélectionné en noir, zone réponse visible, curseur blink animé
- `done` — texte complet, bouton "← Essayer un autre défi"
- `error` — message non bloquant, bouton retry

**Sécurité :** appels Claude via `/api/playground` (Edge Runtime), clé jamais exposée côté client. Rate limiting 5 req/visiteur/heure via Upstash Redis (IP hashée SHA-256).

**CTA post-interaction :** après le premier `done`, afficher sous le panneau réponse : *"Vous souhaitez concevoir une UI d'agent similaire ? Discutons-en →"* (lien vers `#contact`).

**Mobile :** les deux colonnes s'empilent. Playground passe en pleine largeur sous le pitch.

---

## 6. Marquee clients

Bandeau noir pleine largeur, 36px de hauteur.

- Texte : `Softeam · La Poste · Société Générale · Canal+ · Docaposte · Numspot · Bazarchic · TSI · OPEN`
- Animation CSS `marquee` (déjà définie dans `globals.css`)
- Texte `#fff` à 40% d'opacité, `font-mono`, 9px, uppercase

---

## 7. Section Projets

### 7.1 Header

- Eyebrow : `Projets sélectionnés`
- Titre : `Ce que je conçois.` (display-lg)
- Pas de section d'aiguillage dédiée — l'aiguillage est implicite (cf. 7.2)

### 7.2 Grille 2×2 — Aiguillage implicite

Chaque card expose en surface les éléments de lecture rapide (Sarah), et cache les détails techniques dans un accordéon (Thomas).

**Structure d'une card :**

```
[fond pastel]
  meta : client · année
  image : aperçu projet (16:9, border-radius 8px)
  titre : 22px, weight 540
  tagline : 15px, weight 330, ink/70
  KPI badge : pill `rgba(0,0,0,.1)` — valeur en monospace + label (ex: "-40% temps de prompt")
  tags : pills `rgba(0,0,0,.08)`
  ──────────────────────────
  accordéon [Analyse technique complète ↓]
    → flux d'agents, gestion de la confiance, arbres de décision
```

**Couleurs des 4 cards :** coral · lilac · mint · cream (tokens existants dans `globals.css`).

**Mobile :** 1 colonne.

---

## 8. Section About teaser

Fond blanc, `border-top: 1px solid hairline`. Grille 2 colonnes.

**Colonne gauche :**
- Eyebrow : `À propos`
- Titre : `19 ans de design, au service de l'IA.` (26px, weight 340)
- Bio : 3–4 phrases (max 48ch), weight 320, `ink/65`
- CTA : `En savoir plus →` (lien vers `/about`)

**Colonne droite :**
- Skills pills (border `hairline`) : Figma · N8N · Claude Code · Design System · Ateliers UX · Vibe Coding · Prompt Engineering · Green IT · Accessibilité
- Certifications (liste avec année en monospace) : 4 entrées 2025–2026

---

## 9. Section Contact CTA

Bloc arrondi `border-radius: 24px`, fond `navy` (`oklch(18% 0.07 285)`), sur fond blanc avec padding latéral.

| Élément | Contenu |
|---|---|
| Eyebrow | `Travaillons ensemble` — `canvas/35` |
| Titre | `Vous avez un projet IA à concevoir ?` (display-lg, `canvas`) |
| Sous-titre | Freelance · CDI · Conseil — 2 lignes max, `canvas/50` |
| CTA primaire | pill blanc "Envoyer un message" → `/contact` |
| CTA secondaire | pill bordure `canvas/25` "LinkedIn ↗" |
| Email discret | `julie.tyrode@gmail.com` — monospace 10px, `canvas/18` |

---

## 10. Contraintes transversales

- **Thème :** clair uniquement, pas de dark mode pour le MVP
- **Couleurs :** OKLCH exclusivement, jamais `#000`/`#fff` hardcodés — utiliser les tokens `ink` / `canvas`
- **Longueur de ligne :** corps de texte plafonné à 65–75ch
- **Typographie :** Inter variable (`--font-sans`), JetBrains Mono (`--font-mono`) — classes helpers existantes dans `globals.css`
- **Animations :** Motion v12 — `whileInView` pour entrées au scroll, `AnimatePresence` pour états Playground
- **i18n :** toutes les chaînes UI dans `messages/fr.json` et `messages/en.json`, aucun texte hardcodé dans les composants
- **Clés API :** exclusivement dans les variables d'environnement serveur, jamais dans le bundle client
- **Testing :** validation playwright-skill obligatoire après implémentation — responsive, fonctionnel, conforme spec

---

## 11. Fichiers concernés

| Fichier | Action |
|---|---|
| `src/app/[locale]/page.tsx` | Restructurer l'ordre des sections, ajouter `<PresentationHero />` |
| `src/components/sections/Hero.tsx` | Renommer en `PresentationHero.tsx`, intégrer portrait fantôme + cards flottantes |
| `src/components/sections/Playground.tsx` | Refactoriser : ajouter curseur Température, CTA post-interaction, améliorer états |
| `src/components/sections/Projects.tsx` | Ajouter KPI badge sur chaque card, ajouter accordéon deep-dive |
| `src/components/sections/AboutTeaser.tsx` | Ajuster bio (tagline depuis layout) |
| `src/components/layout/Nav.tsx` | Remplacer texte par `logoJT.svg` inline, ajouter sticky behavior |
| `messages/fr.json` | Compléter toutes les chaînes manquantes |
| `messages/en.json` | Compléter toutes les chaînes manquantes |

---

## 12. Hors périmètre (MVP)

- Pages case study détaillées (slug `[slug]`)
- Chatbot RAG
- Interface adaptative (Zustand profil visiteur)
- Animations d'entrée au scroll (Motion) — ajoutées en phase polish
- Footer complet

---

*Spec validée le 27 mai 2026 — prête pour plan d'implémentation.*
