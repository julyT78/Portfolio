## Context

Le portfolio affiche "19 ans" d'expérience dans plusieurs sections (hero eyebrow, pitch playground, about, aboutPage). Ces valeurs sont stockées dans les fichiers i18n (`messages/fr.json`, `messages/en.json`) et partiellement dans un composant React (`Hero.tsx`). Certaines sections FR étaient déjà corrigées lors d'un commit précédent ; les sections EN et quelques sections FR restent à corriger.

## Goals / Non-Goals

**Goals:**
- Remplacer toutes les occurrences "19 ans/années/years" par les formulations correctes
- Assurer la cohérence FR/EN sur toutes les surfaces
- Conserver le format déjà établi : "+ DE 10 ANS" (FR majuscules), "+ de 10 ans" (FR normal), "10+ YEARS" (EN majuscules), "10+ years" (EN normal)

**Non-Goals:**
- Modifier la structure des fichiers i18n
- Mettre à jour les fichiers de spec/doc historiques (non affichés en production)
- Changer la logique de rendu des composants

## Decisions

- **Format FR** : `+ DE 10 ANS` (contextes uppercase) / `+ de 10` (valeur métrique seule) — cohérent avec les sections aboutPage déjà corrigées
- **Format EN** : `10+ YEARS` (contextes uppercase) / `10+` (valeur métrique seule) / `10+ years` (texte courant)
- La valeur `metric1Value` passe de `"19"` à `"+ de 10"` (FR) et `"10+"` (EN), le label restant inchangé
- Dans `Hero.tsx`, la valeur hardcodée `"19"` est remplacée par `"+ de 10"` (composant en FR)

## Risks / Trade-offs

- Faible risque : modification purement textuelle, sans impact sur la logique applicative
- Vérifier que la valeur `"+ de 10"` s'affiche correctement dans le composant métrique (largeur fixe éventuelle)
