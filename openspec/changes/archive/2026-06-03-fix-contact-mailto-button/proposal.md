## Why

Le bouton "Envoyer un message" dans la section Contact utilise le composant `<Link>` de Next.js avec un `href="mailto:..."`, ce qui empêche l'ouverture du client mail de l'utilisateur. `<Link>` est conçu pour la navigation interne et intercepte les clics sans déclencher le protocole `mailto:`.

## What Changes

- Remplacement du composant `<Link>` par une balise `<a>` native dans `ContactCTA.tsx` pour le bouton CTA principal
- Le lien `mailto:julie.tyrode@gmail.com` sera traité nativement par le navigateur, déclenchant l'ouverture du client mail

## Capabilities

### New Capabilities
- `contact-mailto`: Bouton de contact fonctionnel ouvrant le client mail de l'utilisateur via le protocole `mailto:`

### Modified Capabilities
<!-- Aucune spec existante à modifier -->

## Impact

- **Fichier modifié** : `src/components/sections/ContactCTA.tsx`
- **Aucune dépendance nouvelle** : remplacement d'un composant par une balise HTML native
- **Pas d'impact sur le routage** : le changement est purement côté rendu HTML
