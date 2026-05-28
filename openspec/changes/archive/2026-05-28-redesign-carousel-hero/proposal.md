## Why

Le carousel actuel présente les images sous forme de cartes empilées (deck) avec une navigation horizontale en bas, ce qui ne correspond pas au modèle de référence (juliencoudert.com). Le nouveau design place l'image en plein fond (background), avec un dégradé blanc semi-opaque qui préserve la lisibilité du texte à gauche, et des points de navigation verticaux sur le bord droit — une composition plus immersive et professionnelle.

## What Changes

- L'image active du carousel devient un fond plein écran (`background-image` ou `<Image fill>`) au lieu d'une carte empilée
- Un dégradé blanc de gauche à droite couvre partiellement l'image pour assurer la lisibilité du texte (opacity progressive)
- Les cartes empilées (deck front/middle/back) sont supprimées
- La navigation passe de dots horizontaux en bas à dots verticaux sur le bord droit de la section
- La transition entre slides utilise une transition de fond (fade) avec l'image qui change en douceur
- Le label et le contexte de l'image active s'affichent en overlay discret (bas droit ou bas de l'image)

## Capabilities

### New Capabilities
- `hero-carousel-fullscreen`: Carousel hero avec image en background plein écran, dégradé blanc opaque vers la gauche, et navigation verticale dots sur le bord droit.

### Modified Capabilities

## Impact

- **Fichier modifié** : `src/components/sections/PresentationHero.tsx`
- **Images existantes** : réutilisées telles quelles (`/images/carousel-*.webp/jpg/gif`)
- **Aucune nouvelle dépendance** requise
- **Responsive** : sur mobile, l'image peut passer en position absolute en fond avec opacité réduite, ou être masquée selon l'espace disponible
