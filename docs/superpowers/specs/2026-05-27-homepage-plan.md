# Plan d'implémentation — Homepage

**Spec source :** `docs/superpowers/specs/2026-05-27-homepage-design.md`
**Date :** 27 mai 2026

---

## Ordre d'exécution

Les tâches sont ordonnées du plus fondamental au plus superficiel. Chaque tâche est indépendante et testable séparément.

---

## Tâche 1 — Nav : logo SVG + sticky

**Fichier :** `src/components/layout/Nav.tsx`

- [ ] Remplacer le texte "Julie Tyrode" par `logoJT.svg` inliné (28×36px, viewBox 0 0 73 93)
- [ ] Ajouter le comportement sticky : `position: sticky; top: 0; z-index: 50`
- [ ] Ajouter `border-bottom: 1px solid hairline` qui apparaît au scroll (via `useScrollTrigger` ou classe conditionnelle)
- [ ] Vérifier le collapse hamburger mobile (< 960px) — déjà implémenté ou à créer

---

## Tâche 2 — Restructurer `page.tsx`

**Fichier :** `src/app/[locale]/page.tsx`

- [ ] Remplacer `<Hero />` par `<PresentationHero />` (nouveau composant)
- [ ] Ajouter `<PitchPlayground />` (nouveau composant 50/50) juste après
- [ ] Conserver l'ordre : `PresentationHero` → `PitchPlayground` → `MarqueeStrip` → `Projects` → `AboutTeaser` → `ContactCTA`
- [ ] Supprimer l'import de l'ancien `<Hero />`

---

## Tâche 3 — `PresentationHero` : section aérée

**Fichier :** `src/components/sections/PresentationHero.tsx` *(renommer Hero.tsx)*

- [ ] Structure `position: relative`, `overflow: hidden`, padding vertical `section` (96px)
- [ ] **Portrait SVG fantôme** : SVG géométrique abstrait (cercle + rectangle → silhouette), positionné à droite en `position: absolute`, `opacity: 0.07`, `pointer-events: none`, pleine hauteur
- [ ] **Cards flottantes** : conteneur `position: absolute` droit (52% de largeur), 4 cards en `position: absolute` avec les coordonnées, opacités et rotations de la spec (section 4.3)
  - Card 1 : `top: 60px`, `right: 140px`, `opacity: 1`, `rotate: 0`
  - Card 2 : `top: 40px`, `right: -10px`, `opacity: 0.55`, `rotate: 2.5deg`
  - Card 3 : `bottom: 70px`, `right: 60px`, `opacity: 0.35`, `rotate: -1.5deg`
  - Card 4 : `bottom: 50px`, `right: 270px`, `opacity: 0.7`, `rotate: 0`
- [ ] **Contenu texte** (z-index 2, max-width 520px) :
  - Eyebrow mono : `AI Orchestrator & UX Designer — Paris`
  - Headline `display-xl` : `Je conçois des interfaces pour l'IA.`
  - Tagline 15px/330 : *"L'orchestrateur, c'est le nouveau designer…"* (chaîne i18n)
  - Pills CTA : "Voir mes projets" → `#projets` · "Essayer le Playground →" → `#playground`
- [ ] **Mobile (< 768px)** : masquer cards flottantes et portrait, contenu texte pleine largeur

---

## Tâche 4 — `PitchPlayground` : section 50/50

**Fichier :** `src/components/sections/PitchPlayground.tsx` *(nouveau)*

- [ ] Grid `1fr 1fr`, `border-top: 1px solid hairline`
- [ ] **Colonne gauche** (fond `canvas`) :
  - Eyebrow mono : `19 ans · Design System · IA Design depuis 2024`
  - Titre `display-lg` : `Concevoir pour l'IA, c'est un autre métier.`
  - Corps 15px/330 (max 38ch) : 2–3 phrases sur interfaces probabilistes (chaîne i18n)
  - Métriques sous `border-top hairline` : `19` ans · `8+` grands comptes · `IA` depuis 2024
- [ ] **Colonne droite** : intégrer `<Playground />` refactorisé (tâche 5)
- [ ] **Mobile** : empiler les colonnes (colonne gauche au-dessus, Playground en dessous)

---

## Tâche 5 — `Playground` : température + états + CTA

**Fichier :** `src/components/sections/Playground.tsx`

- [ ] **Supprimer** le wrapper `<section>` et les classes de section — le composant devient autonome, sans padding externe (le padding vient de `PitchPlayground`)
- [ ] **Ajouter le curseur Température** :
  - `<input type="range" min="0" max="1" step="0.1">` avec état `temperature`
  - Labels Précis / Créatif aux extrémités
  - Valeur affichée en `font-mono` à droite du label
  - Passer `temperature` dans le body du fetch `/api/playground`
- [ ] **Améliorer les états visuels** :
  - `idle` : zone réponse invisible
  - `streaming` : dot animé `animate-pulse`, curseur blink, désactiver chips
  - `done` : dot statique, bouton reset visible
  - `error` : message non bloquant rouge/orange, bouton retry
- [ ] **CTA post-interaction** : après le premier `done`, afficher sous la réponse : *"Vous souhaitez concevoir une UI d'agent similaire ? Discutons-en →"* (lien `#contact`), état local `hasInteracted`
- [ ] **Mettre à jour `/api/playground/route.ts`** : récupérer et utiliser le paramètre `temperature` dans `streamText`

---

## Tâche 6 — `Projects` : KPI badges + accordéon

**Fichier :** `src/components/sections/Projects.tsx`

- [ ] Ajouter un champ `kpi: { value: string; label: string }` dans le type `PROJECTS`
- [ ] Renseigner les KPIs pour les 4 projets (valeurs provisoires marquées `TODO` pour Chantier IA et Power BI)
- [ ] **KPI badge** dans chaque card : pill `bg-ink/10`, valeur en `font-mono font-bold`, label en `text-sm`
- [ ] **Accordéon deep-dive** en bas de chaque card :
  - Trigger : `Analyse technique complète ↓` (texte + chevron)
  - Contenu déplié : placeholder texte `[À compléter — flux d'agents, gestion confiance, arbres de décision]`
  - État local `expanded` par card (pas de state global)
  - Animation d'ouverture : `max-height` CSS ou `<motion.div>` avec `AnimatePresence`

---

## Tâche 7 — `AboutTeaser` : bio mise à jour

**Fichier :** `src/components/sections/AboutTeaser.tsx`

- [ ] Mettre à jour la clé i18n `about.bio` : bio de 3–4 phrases sur le parcours du Product Design classique vers l'IA Design (max 48ch par ligne)
- [ ] Vérifier que le CTA pointe vers `/about` (page dédiée) et non `#contact`

---

## Tâche 8 — Chaînes i18n

**Fichiers :** `messages/fr.json` · `messages/en.json`

- [ ] Auditer les clés existantes et identifier les manquantes
- [ ] Ajouter les nouvelles clés pour `PresentationHero` (eyebrow, headline, tagline, ctaPrimary, ctaSecondary)
- [ ] Ajouter les nouvelles clés pour `PitchPlayground` (eyebrow, title, body, metrics)
- [ ] Mettre à jour `about.bio` et `about.cta`
- [ ] Traduire toutes les nouvelles clés en anglais dans `en.json`

---

## Tâche 9 — Tests Playwright

**Fichier :** `e2e/homepage.spec.ts` *(à créer)*

- [ ] Le Playground répond : sélectionner un chip → vérifier que la zone réponse apparaît
- [ ] Le curseur Température est interactif
- [ ] Les accordéons de projets s'ouvrent et se ferment
- [ ] La page est responsive : vérifier viewports 375px, 768px, 1280px
- [ ] La nav est sticky au scroll
- [ ] Le CTA post-interaction apparaît après une interaction Playground

---

## Notes

- Travailler les tâches dans l'ordre numérique — chaque tâche débloque la suivante
- Les tâches 3, 4, 5 peuvent être faites en parallèle si besoin
- Les KPIs Chantier IA et Power BI sont à confirmer avec Julie avant la tâche 6
- Le portrait SVG fantôme peut évoluer vers une vraie photo post-MVP sans changer la structure (remplacer `<svg>` par `<Image>`)
