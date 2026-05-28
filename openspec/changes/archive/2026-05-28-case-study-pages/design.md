## Context

Le portfolio expose 6 projets en cards 2×N sur la homepage. Chaque card a un champ `href` qui pointe pour l'instant sur `"#projets"` (placeholder). Les données projet sont hardcodées dans `Projects.tsx` — pas de source centralisée. Les images existent déjà dans `public/images/book/<client>/`. Le projet utilise Next.js App Router avec `next-intl` (routes localisées `[locale]`), Tailwind CSS avec tokens OKLCH, et Framer Motion.

## Goals / Non-Goals

**Goals:**
- Créer une source de données centralisée `src/data/projects.ts` — seule source de vérité pour les projets (homepage + case study)
- Créer la route dynamique `src/app/[locale]/projects/[slug]/page.tsx`
- Chaque case study page : hero immersif, sections contexte/démarche/résultats, galerie visuels, navigation entre projets
- Les cards homepage pointent vers la bonne URL

**Non-Goals:**
- Pas de CMS ni de fetching distant — données statiques en TypeScript
- Pas d'animations complexes inter-pages (View Transitions) — hors scope MVP
- Pas de filtrage ou de recherche des projets
- Pas de page liste `/projects` séparée (accès uniquement via cards homepage)

## Decisions

### D1 — Source de données : fichier TypeScript statique

**Choix :** `src/data/projects.ts` exporte un tableau `PROJECTS` typé avec tous les champs (homepage + case study).

**Alternatives :** MDX par fichier projet (overkill pour 6 projets, complexité de build), JSON (pas de typage natif, moins pratique).

**Rationale :** Cohérence avec la stack existante, typage complet, co-location des données et du code, zero dépendance ajoutée. Facilement migrable vers MDX/CMS plus tard si le nombre de projets grandit.

### D2 — Structure de la page case study

```
CaseStudyHero        — fond coloré (bg du projet), titre, tagline, KPI badge, tags, année
CaseStudyContext     — colonne texte : client, durée, rôle, contexte
CaseStudyApproach    — sections narrative avec visuels intercalés
CaseStudyResults     — résultats/livrables clés, deepDive complet
CaseStudyNav         — liens projet précédent / suivant
```

Pas de composant générique "Section" — chaque bloc est un composant dédié dans `src/components/sections/case-study/`.

### D3 — Routing : `/[locale]/projects/[slug]`

**Choix :** Route dynamique `[slug]` sous `projects/` plutôt que `case/[slug]` ou `work/[slug]`.

**Rationale :** `/projects/numspot` est lisible et cohérent avec l'ancre `#projets` de la homepage. Slug = `id` du projet dans PROJECTS (ex. `"numspot"`, `"societe-generale"`).

**generateStaticParams** : pré-rend toutes les pages au build (`force-static`). Si le slug n'existe pas → `notFound()`.

### D4 — Images galerie

Les images de galerie sont listées par leur chemin `public/images/book/<client>/` directement dans `src/data/projects.ts`. Pas de discovery automatique — liste explicite pour chaque projet (contrôle éditorial).

### D5 — Navigation inter-projets

Ordre circulaire basé sur l'index dans PROJECTS. Composant `CaseStudyNav` avec lien précédent/suivant (titre + couleur du projet adjacent).

## Risks / Trade-offs

- **Images aux noms avec espaces/accents** (ex. `"MacBook Pro 16.png"`) → Next.js Image accepte les chemins encodés ; à tester. Mitigation : renommer les fichiers problématiques si besoin lors de l'implémentation.
- **Données en dur dans TS** → si le contenu des projets change souvent, la maintenance est manuelle. Acceptable pour MVP portfolio.
- **Pas de page `/projects`** → SEO limité (accès uniquement depuis homepage). Acceptable ; on peut ajouter une liste plus tard.

## Open Questions

*(aucune — scope suffisamment défini pour implémenter)*
