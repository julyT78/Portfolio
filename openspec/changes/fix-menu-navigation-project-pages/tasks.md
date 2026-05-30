## 1. Modification de Nav.tsx

- [x] 1.1 Importer `usePathname` depuis `src/i18n/navigation.ts` dans `Nav.tsx`
- [x] 1.2 Ajouter `const pathname = usePathname()` et `const isHome = pathname === "/"` dans le composant
- [x] 1.3 Créer le helper local `const sectionHref = (hash: string) => isHome ? \`#\${hash}\` : \`/#\${hash}\``
- [x] 1.4 Remplacer les 3 liens desktop (`#projets`, `#about`, `#contact`) par `sectionHref("projets")` etc.
- [x] 1.5 Remplacer les 3 liens du menu mobile par les mêmes appels `sectionHref`
- [x] 1.6 Appliquer le même traitement aux liens CTA (`#playground`, `#contact` dans les deux menus)

## 2. Vérification

- [x] 2.1 Lancer le serveur de dev et naviguer vers une page projet — vérifier que les liens Projets, À propos, Contact redirigent vers la home avec scroll vers la section
- [x] 2.2 Vérifier sur la home que les liens fonctionnent toujours comme des ancres (scroll sans rechargement)
- [x] 2.3 Vérifier le comportement sur mobile (menu hamburger) depuis une page projet
- [x] 2.4 Vérifier que la locale est préservée dans l'URL après navigation (`/en/#projets` si locale EN active)
