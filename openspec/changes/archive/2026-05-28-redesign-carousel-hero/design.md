## Context

Le composant `PresentationHero.tsx` implémente actuellement un carousel sous forme de cartes empilées (deck) avec navigation dots horizontale. La référence de design (juliencoudert.com) utilise un paradigme différent : l'image remplit tout le fond de la section, un dégradé blanc part de la gauche pour préserver la lisibilité du texte, et les dots de navigation sont positionnés verticalement sur le bord droit. Ce pattern est plus immersif et met mieux en valeur les visuels de projets.

## Goals / Non-Goals

**Goals:**
- Remplacer les cartes empilées par une image full-width en position background
- Ajouter un dégradé blanc → transparent de gauche à droite sur l'image
- Repositionner les dots de navigation en colonne verticale sur le bord droit
- Conserver la transition fluide entre les slides (fade cross-dissolve)
- Conserver la légende (label + context) de la slide active
- Maintenir l'autoplay et le reset du timer au click

**Non-Goals:**
- Refonte du contenu textuel (eyebrow, h1, tagline, CTAs) — inchangé
- Changement des images sources
- Ajout d'un mode sombre
- Support swipe touch (hors scope MVP)

## Decisions

### Décision 1 : Background via `<Image fill>` Next.js
Utiliser `<Image fill objectFit="cover">` dans un conteneur `absolute inset-0` plutôt qu'un `background-image` CSS.

**Pourquoi** : Next.js optimise automatiquement le format et le lazy-loading. L'API `fill` couvre exactement le conteneur parent.

**Alternative écartée** : `background-image` CSS inline — pas d'optimisation Next.js, format non contrôlé.

### Décision 2 : Dégradé via pseudo-élément ou div overlay
Utiliser une `<div>` absolue avec `background: linear-gradient(to right, white 35%, transparent 75%)` par-dessus l'image.

**Pourquoi** : Plus maintenable qu'un pseudo-élément CSS, compatible avec les contraintes OKLCH du projet (`oklch(97% 0.003 90 / 1)` → `oklch(97% 0.003 90 / 0)`).

**Intensité du dégradé** : Le blanc couvre ~35-40% de la largeur avec une transition douce vers transparent à ~75%, laissant le tiers droit de l'image pleinement visible.

### Décision 3 : Dots verticaux positionnés fixed-right dans la section
Les dots sont dans un `div` avec `position: absolute; right: 24px; top: 50%; transform: translateY(-50%)` et `flex-direction: column`.

**Pourquoi** : Correspond exactement au pattern de la référence. Le `top: 50%` les centre verticalement par rapport à la section hero.

**Style des dots** : Points circulaires, le dot actif légèrement plus grand (8px vs 6px) et plus foncé, style épuré sans expanded width.

### Décision 4 : Transition entre slides
Chaque image est rendue en position `absolute inset-0`, avec `opacity: 0/1` géré par l'état `current`. Transition CSS `opacity 0.8s ease`.

**Pourquoi** : Cross-dissolve propre sans recalcul de layout. Toutes les images sont montées en DOM (4 images légères), pas de flash au changement.

## Risks / Trade-offs

- [GIF animé sharecare] Le GIF s'anime en boucle quand il est en fond → Mitigation : acceptable visuellement, le dégradé blanc atténue l'effet
- [Performance] 4 images en DOM simultanément → Mitigation : `priority={i === 0}`, les autres lazy-loaded ; tailles relativement petites
- [Mobile] Le texte peut devenir illisible si l'image est trop présente → Mitigation : sur mobile (`< md`), renforcer le dégradé ou masquer l'image background (opacité réduite à 0.15)
