## Context

La section `ContactCTA` utilise le composant `<Link>` de Next.js pour le bouton principal "Envoyer un message". Ce composant est optimisé pour la navigation côté client entre les routes de l'application et intercepte les événements de clic pour les gérer via le routeur Next.js. Pour les URLs externes comme `mailto:`, ce comportement est incompatible : le protocole n'est pas transmis au navigateur, ce qui empêche l'ouverture du client mail.

## Goals / Non-Goals

**Goals:**
- Le bouton "Envoyer un message" ouvre le client mail de l'utilisateur avec `julie.tyrode@gmail.com` pré-rempli dans le champ destinataire
- Le fix est minimal et ciblé, sans refactorisation de la section

**Non-Goals:**
- Ajouter un formulaire de contact intégré
- Pré-remplir l'objet ou le corps du mail
- Modifier le design ou le style du bouton

## Decisions

**Remplacer `<Link>` par `<a>` natif pour le lien mailto:**

`<Link href="mailto:...">` de Next.js 13+ tente de gérer ce lien via son routeur interne. Bien que Next.js documente que les URLs externes doivent utiliser `<a>`, l'import de `Link` dans le composant existant a conduit à son utilisation par erreur.

La solution correcte est d'utiliser une balise `<a>` HTML native, qui délègue nativement le protocole `mailto:` au navigateur. Aucune alternative n'est envisagée car c'est la seule approche standard.

## Risks / Trade-offs

- **Aucun risque identifié** : remplacement d'un composant par son équivalent HTML natif, comportement visuel identique, styles conservés
