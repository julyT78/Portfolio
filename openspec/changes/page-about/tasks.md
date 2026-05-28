## 1. Route et structure de fichiers

- [x] 1.1 Créer le dossier `src/app/[locale]/about/` et le fichier `page.tsx` avec les métadonnées Next.js (title, description)
- [x] 1.2 Créer le dossier `src/components/sections/about/` pour les composants de la page
- [x] 1.3 Vérifier que la route `/fr/about` retourne 200 (serveur de dev)

## 2. Chaînes i18n

- [x] 2.1 Ajouter le namespace `aboutPage` dans `messages/fr.json` avec toutes les clés (hero, pivot, timeline, skills, certifications)
- [x] 2.2 Ajouter le namespace `aboutPage` dans `messages/en.json` avec les traductions anglaises de toutes les clés

## 3. Composant `AboutPageHero`

**Fichier :** `src/components/sections/about/AboutPageHero.tsx`

- [x] 3.1 Eyebrow mono : `AI ORCHESTRATOR & UX DESIGNER — PARIS`
- [x] 3.2 Heading `h1` `display-xl` : titre de posture
- [x] 3.3 Sous-titre 18px/330 (max 52ch) : positionnement IA en 2 phrases
- [x] 3.4 Pills CTA : "Me contacter" → `#contact` · "Voir mes projets" → `/`
- [x] 3.5 Mise en page : `bg-canvas`, padding vertical `section` (96px), max-width 1280px

## 4. Composant `AboutPivot`

**Fichier :** `src/components/sections/about/AboutPivot.tsx`

- [x] 4.1 Grid `1fr 1fr` sur desktop, empilé sur mobile
- [x] 4.2 Colonne gauche : eyebrow + titre "Le pivot" + bloc narratif 4–5 phrases (clés i18n)
- [x] 4.3 Colonne droite : bloc coloré (`bg-lime` ou `bg-lilac`) avec une citation-clé en `display-lg` + date "2024"
- [x] 4.4 `border-top: 1px solid hairline` en haut de section

## 5. Composant `AboutTimeline`

**Fichier :** `src/components/sections/about/AboutTimeline.tsx`

- [x] 5.1 Eyebrow + titre de section
- [x] 5.2 Timeline en liste verticale : chaque item a `année`, `poste`, `entreprise`, `description courte` (max 72ch)
- [x] 5.3 Minimum 4 entrées en ordre chronologique inverse (2026 → 2019)
- [x] 5.4 Séparateur hairline entre les items
- [x] 5.5 Toutes les données via clés i18n `aboutPage.timeline.*`

## 6. Composant `AboutSkills`

**Fichier :** `src/components/sections/about/AboutSkills.tsx`

- [x] 6.1 Reprendre la structure de `AboutTeaser` (pills compétences + liste certifications avec années)
- [x] 6.2 Enrichir avec des catégories : "Design", "IA & Orchestration", "Méthodes"
- [x] 6.3 Certifications enrichies (4 entrées minimum avec année + organisme)
- [x] 6.4 Labels de catégorie via clés i18n `aboutPage.skills.*`

## 7. Assemblage `page.tsx`

**Fichier :** `src/app/[locale]/about/page.tsx`

- [x] 7.1 Importer et composer dans l'ordre : `AboutPageHero` → `AboutPivot` → `AboutTimeline` → `AboutSkills` → `ContactCTA`
- [x] 7.2 Ajouter les métadonnées `generateMetadata` avec title + description i18n
- [x] 7.3 Vérifier l'affichage desktop (1280px) dans le navigateur

## 8. Tests Playwright

**Fichier :** `e2e/about.spec.ts`

- [x] 8.1 La page `/fr/about` retourne 200 et affiche un `h1`
- [x] 8.2 La page `/en/about` retourne 200 et affiche un `h1` en anglais
- [x] 8.3 La timeline affiche au moins 3 entrées
- [x] 8.4 Le CTA contact est visible
- [x] 8.5 Responsive : viewports 375px, 768px, 1280px sans overflow horizontal
