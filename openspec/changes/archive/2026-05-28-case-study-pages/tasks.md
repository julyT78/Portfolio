## 1. Source de données centralisée

- [x] 1.1 Créer `src/data/projects.ts` avec le type `ProjectData` (champs homepage + champs case study : context, approach, gallery)
- [x] 1.2 Migrer les 6 projets de `Projects.tsx` dans `src/data/projects.ts` avec tous leurs champs existants
- [x] 1.3 Enrichir chaque projet avec les champs case study : `context` (texte long), `approach` (étapes démarche), `gallery` (liste de chemins images depuis `public/images/book/`)
- [x] 1.4 Mettre à jour `Projects.tsx` pour importer depuis `src/data/projects.ts` au lieu des données hardcodées

## 2. Route dynamique case study

- [x] 2.1 Créer `src/app/[locale]/projects/[slug]/page.tsx` avec `generateStaticParams` (tous les slugs × toutes les locales) et `notFound()` si slug inconnu
- [x] 2.2 Créer le composant `CaseStudyHero` — fond coloré du projet, client, année, titre h1, tagline, KPI badge, tags
- [x] 2.3 Créer le composant `CaseStudyContext` — section texte contexte + durée + rôle
- [x] 2.4 Créer le composant `CaseStudyApproach` — sections narrative avec texte de démarche
- [x] 2.5 Créer le composant `CaseStudyGallery` — grille d'images avec `next/image`, tolère galerie vide
- [x] 2.6 Créer le composant `CaseStudyResults` — deepDive complet + résultats clés
- [x] 2.7 Créer le composant `CaseStudyNav` — liens projet précédent / suivant (ordre circulaire) + lien retour `/{locale}#projets`
- [x] 2.8 Assembler la page dans `page.tsx` en composant les 6 blocs dans l'ordre

## 3. Mise à jour homepage cards

- [x] 3.1 Mettre à jour le champ `href` de chaque projet dans `src/data/projects.ts` : remplacer `"#projets"` par `"/projects/[slug]"` (sans locale — `<Link>` next-intl l'ajoute automatiquement)
- [x] 3.2 Vérifier que le lien "Voir le cas →" dans `ProjectCard` utilise bien `<Link href={project.href}>` (compatible next-intl)

## 4. i18n et métadonnées

- [x] 4.1 Ajouter les clés de traduction case study dans `messages/fr.json` et `messages/en.json` (labels : "Contexte", "Démarche", "Résultats", "Galerie", "Projet suivant", "Projet précédent", "Retour aux projets")
- [x] 4.2 Ajouter `generateMetadata` dans `page.tsx` : title = `"{titre projet} — Julie Tyrode"`, description = tagline

## 5. Vérification

- [x] 5.1 `tsc --noEmit` sans erreur
- [x] 5.2 Vérifier manuellement les 6 routes case study en dev (`/fr/projects/[slug]`) : chargement OK, images affichées, navigation inter-projets fonctionnelle
- [x] 5.3 Vérifier que les liens "Voir le cas →" sur la homepage redirigent bien vers les pages case study
