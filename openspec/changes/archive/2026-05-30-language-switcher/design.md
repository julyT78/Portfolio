## Context

Le projet utilise déjà `next-intl@4` avec un routage `[locale]` configuré (`i18n/routing.ts`, `i18n/request.ts`), un middleware actif, et des fichiers de messages existants (`messages/fr.json`, `messages/en.json`). La navigation est gérée par `src/components/layout/Nav.tsx`.

L'infrastructure i18n est donc **déjà en place** — la route `/[locale]/about` et le découpage par locale existent. Il manque uniquement le composant UI permettant à l'utilisateur de changer de langue.

## Goals / Non-Goals

**Goals:**
- Ajouter un composant `LanguageSwitcher` visible dans la `Nav`
- Permettre le basculement FR ↔ EN avec persistance de la locale via next-intl
- Être accessible (navigation clavier, ARIA)

**Non-Goals:**
- Traduction automatique du contenu (hors scope)
- Support de plus de 2 langues
- Détection automatique de la langue du navigateur (déjà gérée par next-intl middleware si configuré)

## Decisions

### Décision 1 : Utiliser `useRouter` + `usePathname` de next-intl (pas de rechargement complet)

next-intl expose `useRouter` et `usePathname` dans `next-intl/navigation` pour naviguer entre locales sans rechargement de page complet. C'est l'approche recommandée pour Next.js App Router.

**Alternatif écarté** : `<Link>` hardcodé vers `/fr/...` ou `/en/...` — fragile, ne gère pas automatiquement le pathname courant.

### Décision 2 : Composant client léger, rendu dans Nav

Le `LanguageSwitcher` est un `"use client"` minimal. Il lit la locale courante via `useLocale()` de next-intl et appelle `router.replace(pathname, { locale: newLocale })` au clic.

**Alternatif écarté** : Composant serveur avec formulaire POST — sur-ingénierie pour ce besoin.

### Décision 3 : Persistance via cookie next-intl (comportement par défaut)

next-intl stocke la locale dans un cookie `NEXT_LOCALE` automatiquement. Pas de code supplémentaire nécessaire.

### Décision 4 : Affichage textuel "FR | EN" avec indicateur actif

Deux boutons texte (`FR` / `EN`) séparés par un séparateur visuel. La locale active est stylée distinctement (poids de police ou couleur). Pas de dropdown ni d'icône drapeau (inaccessible, culturellement ambigu).

## Risks / Trade-offs

- **[Risque] Hydratation mismatch** : Le composant `"use client"` doit utiliser `useLocale()` côté client uniquement — ne pas lire la locale dans le rendu SSR initial du composant. → Mitigation : s'assurer que le composant est bien marqué `"use client"`.
- **[Trade-off] Traductions manquantes** : Si une clé est absente dans `en.json`, next-intl affiche la clé brute. → Mitigation : vérifier la couverture des deux fichiers avant livraison.
- **[Risque] Rechargement inattendu** : Sur certaines pages avec état local (Playground), changer de locale rechargera le composant. → Acceptable pour le MVP.

## Migration Plan

1. Créer `src/components/layout/LanguageSwitcher.tsx`
2. Intégrer dans `Nav.tsx`
3. Vérifier que `fr.json` et `en.json` couvrent toutes les clés utilisées dans `Nav`
4. Tester la navigation entre `/fr/*` et `/en/*` sur toutes les routes existantes
