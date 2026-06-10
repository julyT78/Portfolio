## Why

Les intitulés "19 ans" ou "19 années" (et leurs équivalents anglais "19 years") sont inexacts et doivent être remplacés par "+ de 10 ans" / "+ de 10 années" (FR) et "10+ years" (EN) sur l'ensemble du portfolio. Cette correction assure la cohérence du message de positionnement à travers toutes les surfaces du site.

## What Changes

- Remplacement de toutes les occurrences "19 ANS / 19 ans" dans `messages/fr.json` par "+ DE 10 ANS" / "+ de 10"
- Remplacement de toutes les occurrences "19 YEARS / 19 years" dans `messages/en.json` par "10+ YEARS" / "10+ years"
- Correction de la valeur numérique `metric1Value` dans les deux fichiers i18n (fr + en)
- Correction dans `src/components/sections/Hero.tsx` (valeur de métrique hardcodée)
- Mise à jour du commentaire dans `e2e/about.spec.ts`

## Capabilities

### New Capabilities
- Aucune nouvelle capability introduite.

### Modified Capabilities
- Aucun changement de requirement au niveau spec.

## Impact

- `messages/fr.json` : 3 lignes (10, 24, 27)
- `messages/en.json` : 9 lignes (10, 24, 27, 59, 60, 93, 97, 105, 114)
- `src/components/sections/Hero.tsx` : 1 ligne (47)
- `e2e/about.spec.ts` : 1 commentaire (29)
