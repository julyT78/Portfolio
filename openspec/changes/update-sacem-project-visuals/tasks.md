## 1. Vérification préalable

- [x] 1.1 Confirmer la nature des noms, e-mails et numéros visibles dans `Capture d'écran 2026-09-07 123045.png` et `gestionnaire_btn_paiement.png` — **décision : flouter les zones sensibles avant publication**, les deux visuels sont conservés

## 2. Publication des assets

- [x] 2.1 Copier `assets/Projets/Sacem/BG_Censo.png` vers `public/images/projects/sacem/censo-cover.png`
- [x] 2.2 Copier `assets/Projets/Sacem/maquette_admin.png` vers `public/images/projects/sacem/censo-dashboard-admin.png`
- [x] 2.3 Publier `assets/Projets/Sacem/Capture d'écran 2026-09-07 123045.png` vers `public/images/projects/sacem/censo-declarations-panneau.png` en floutant l'e-mail, le téléphone et les noms de personnes du panneau latéral ainsi que les noms de personnes de la colonne adhérent
- [x] 2.4 Publier `assets/Projets/Sacem/gestionnaire_btn_paiement.png` vers `public/images/projects/sacem/censo-paiement-modale.png` avec le même traitement de floutage
- [x] 2.5 Copier `assets/Projets/Sacem/Capture d'écran 2026-09-07 123443.png` vers `public/images/projects/sacem/censo-contraste-rgaa.png`
- [x] 2.6 Lister `public/images/projects/sacem/` et vérifier que les 5 nouveaux fichiers sont présents, en minuscules sans accent ni espace, et que `ecran_sacem.png` est toujours là
- [x] 2.7 Contrôler visuellement les deux visuels floutés : aucune donnée personnelle lisible, le reste de l'écran intact

## 3. Mise à jour de la source de données

- [x] 3.1 Dans `src/data/projects.ts`, remplacer le champ `image` de l'entrée `id: "sacem"` par `/images/projects/sacem/censo-cover.png`
- [x] 3.2 Remplacer le champ `gallery` de l'entrée Sacem par les 5 chemins dans l'ordre : `censo-dashboard-admin.png`, `ecran_sacem.png`, `censo-declarations-panneau.png`, `censo-paiement-modale.png`, `censo-contraste-rgaa.png`
- [x] 3.3 Vérifier qu'aucune autre entrée de `PROJECTS` ni aucun autre fichier ne référence encore `ecran_sacem.png` comme couverture

## 4. Validation

- [x] 4.1 Lancer `npm run build` (ou `npx tsc --noEmit`) et confirmer l'absence d'erreur
- [x] 4.2 Démarrer le serveur de dev et vérifier au navigateur que la card SACEM de la homepage affiche la nouvelle couverture
- [x] 4.3 Ouvrir `/projects/sacem` et vérifier que la galerie affiche 5 visuels : le premier pleine largeur, les 4 suivants en grille 2x2
- [x] 4.4 Contrôler avec playwright-skill que la galerie reste lisible en mobile (colonne unique) et qu'aucun visuel n'est rogné au point de perdre son information principale
- [x] 4.5 Vérifier dans l'onglet réseau que les 5 nouveaux chemins renvoient bien un statut 200
