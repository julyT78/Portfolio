## 1. Restructuration du layout hero

- [x] 1.1 Supprimer le bloc "carousel stack" (cartes empilées) et le SVG portrait fantôme du JSX
- [x] 1.2 Transformer la `<section>` en conteneur `relative overflow-hidden` avec hauteur fixe (ex. `min-h-[600px] md:min-h-[700px]`)
- [x] 1.3 Ajouter un bloc `absolute inset-0` pour la zone background image (z-index 0)

## 2. Image plein fond avec transition

- [x] 2.1 Rendre les 4 images en position `absolute inset-0` avec `<Image fill className="object-cover">`
- [x] 2.2 Gérer l'opacité de chaque image selon l'état `current` : `opacity: i === current ? 1 : 0`
- [x] 2.3 Appliquer la transition CSS `opacity 0.8s ease` via `style` ou `className`

## 3. Overlay dégradé blanc

- [x] 3.1 Ajouter une `<div>` overlay `absolute inset-0 z-[1]` avec `background: linear-gradient(to right, oklch(97% 0.003 90 / 1) 35%, oklch(97% 0.003 90 / 0) 75%)`
- [x] 3.2 Vérifier sur desktop que le texte reste lisible et que l'image est visible sur le tiers droit

## 4. Légende de la slide active

- [x] 4.1 Ajouter un bloc `absolute bottom-6 right-16 z-[3]` (ou bas de l'image) avec le label et le context de la slide active
- [x] 4.2 Appliquer un micro-fond sombre (dégradé ou `bg-black/30 rounded-md px-3 py-2`) pour lisibilité
- [x] 4.3 Animer l'apparition du texte avec `opacity: i === current ? 1 : 0` + transition

## 5. Navigation dots verticale

- [x] 5.1 Déplacer les dots hors du bloc carousel, les placer dans un `div absolute right-6 top-1/2 -translate-y-1/2 z-[4] flex flex-col gap-2`
- [x] 5.2 Styliser chaque dot : `w-[6px] h-[6px] rounded-full`, dot actif `w-[8px] h-[8px]` plus foncé
- [x] 5.3 Masquer les dots sur mobile (`hidden md:flex`)

## 6. Comportement mobile

- [x] 6.1 Sur mobile (< md), réduire l'opacité de l'image background à 0.12 ou masquer complètement (`hidden md:block` sur le bloc background)
- [x] 6.2 Vérifier que le texte hero reste lisible sur mobile sans dépendre de l'image

## 7. Validation visuelle

- [x] 7.1 Lancer le serveur de dev et vérifier le rendu desktop (1280px+)
- [x] 7.2 Vérifier la transition entre les slides (autoplay 4.2s et click)
- [x] 7.3 Vérifier le rendu mobile (375px)
- [x] 7.4 Capture screenshot avec Playwright pour validation finale
