## Why

Le bouton "envoyer un message" (mailto) dans la section ContactCTA ne permet pas à l'utilisateur d'envoyer un message directement depuis le site — il ouvre un client mail externe, ce qui crée une rupture d'expérience. Remplacer ce bouton par un formulaire de contact intégré fluidifie le parcours et augmente les chances de prise de contact.

## What Changes

- Suppression du bouton mailto et du gestionnaire `handleCopy` dans `ContactCTA`
- Ajout d'un formulaire de contact avec les champs : nom, prénom, email, message
- Ajout d'un bouton "Envoyer" avec gestion de l'état d'envoi (loading, succès, erreur)
- Mise en place d'une route API Next.js `/api/contact` pour traiter l'envoi (via Nodemailer ou Resend)
- Conservation du lien LinkedIn et de l'email discret en bas de section

## Capabilities

### New Capabilities
- `contact-form`: Formulaire de contact intégré dans la section ContactCTA avec validation côté client, soumission via API route, et feedback utilisateur (succès/erreur)

### Modified Capabilities
- `contact-mailto`: Le comportement mailto est remplacé par le formulaire intégré — la section contact change de paradigme d'interaction

## Impact

- `src/components/sections/ContactCTA.tsx` — refonte du composant
- `src/app/api/contact/route.ts` — nouvelle route API à créer
- Traductions i18n (`messages/fr.json`, `messages/en.json`) — ajout des clés pour les labels et messages du formulaire
- Dépendance d'envoi d'email : vérifier si Nodemailer ou Resend est déjà installé, sinon utiliser `fetch` vers un service tiers ou Resend (léger, sans config SMTP)
