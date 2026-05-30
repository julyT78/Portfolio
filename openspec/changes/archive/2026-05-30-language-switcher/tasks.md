## 1. Composant LanguageSwitcher

- [x] 1.1 Créer `src/components/layout/LanguageSwitcher.tsx` avec `"use client"`, `useLocale()`, `useRouter()` et `usePathname()` de next-intl
- [x] 1.2 Implémenter le basculement FR ↔ EN via `router.replace(pathname, { locale: newLocale })`
- [x] 1.3 Styliser les deux boutons avec indicateur de locale active (poids de police ou couleur OKLCH distincte)
- [x] 1.4 Ajouter les attributs ARIA (`aria-label`, `aria-current`) pour l'accessibilité
- [x] 1.5 Vérifier la navigation clavier (Tab + Entrée/Espace)

## 2. Intégration dans Nav

- [x] 2.1 Importer et ajouter `<LanguageSwitcher />` dans `src/components/layout/Nav.tsx`
- [x] 2.2 Vérifier le positionnement visuel du switcher dans la nav (desktop et mobile)

## 3. Couverture i18n — About page

- [x] 3.1 Auditer `AboutPageHero`, `AboutPivot`, `AboutTimeline`, `AboutSkills` pour détecter les chaînes hardcodées
- [x] 3.2 Externaliser les chaînes manquantes dans `messages/fr.json` et `messages/en.json` sous le namespace `aboutPage`
- [x] 3.3 Vérifier qu'aucune clé brute `aboutPage.*` n'est visible en basculant sur `/en/about`

## 4. Tests et validation

- [x] 4.1 Tester le basculement FR → EN et EN → FR sur toutes les routes (`/`, `/about`, `/projects`)
- [x] 4.2 Vérifier la persistance de la locale après rechargement de page
- [x] 4.3 Valider avec Playwright : présence du switcher, aria-current, navigation clavier
- [x] 4.4 Vérifier l'absence d'overflow horizontal sur mobile (375px) avec le switcher dans la nav
