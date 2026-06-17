## 1. Correction du composant ContactCTA

- [x] 1.1 Dans `src/components/sections/ContactCTA.tsx`, remplacer le composant `<Link>` par une balise `<a>` native pour le bouton CTA principal avec `href="mailto:julie.tyrode@gmail.com"`
- [x] 1.2 Supprimer l'import de `Link` depuis `next/link` si plus utilisé dans le fichier

## 2. Vérification

- [x] 2.1 Vérifier que le rendu HTML contient bien `<a href="mailto:julie.tyrode@gmail.com">` et non un composant Next.js
- [x] 2.2 Tester en local que le clic sur le bouton ouvre le client mail
