## Context

La section `ContactCTA` présente actuellement un bouton mailto qui redirige vers un client mail externe. Ce comportement fragmente l'expérience utilisateur et perd des contacts potentiels sur mobile. Le formulaire de contact remplacera ce bouton tout en conservant le lien LinkedIn et l'email discret.

Les dépendances actuelles ne comprennent pas de librairie d'envoi d'email (pas de Nodemailer, pas de Resend). L'envoi se fera via une route API Next.js (`/api/contact`) pour ne jamais exposer de credentials côté client.

## Goals / Non-Goals

**Goals:**
- Remplacer le bouton mailto par un formulaire avec champs : nom, prénom, email, message
- Valider les champs côté client avant soumission
- Envoyer le message via une route API Next.js sécurisée
- Afficher un feedback visuel (chargement, succès, erreur) à l'utilisateur
- Conserver le design de la section (fond `bg-navy`, typographie existante)
- Support i18n (labels, messages en fr/en)

**Non-Goals:**
- Système de tickets ou CRM
- Pièces jointes
- CAPTCHA (hors scope MVP)
- Stockage des messages en base de données

## Decisions

### Librairie d'envoi : Resend

**Choix** : Resend (`resend` npm package)

**Pourquoi Resend plutôt que Nodemailer** :
- Nodemailer requiert une config SMTP (port, host, authentification Google App Password) — plus complexe à maintenir
- Resend est une API HTTP légère, sans dépendance SMTP, avec un free tier généreux (3 000 emails/mois)
- SDK officiel TypeScript, compatible App Router Next.js
- Une seule variable d'environnement : `RESEND_API_KEY`

**Alternative considérée** : Nodemailer + Gmail SMTP — écarté pour la complexité de setup et la fragilité des App Passwords Google.

### Gestion des états du formulaire

Un état local `status: 'idle' | 'loading' | 'success' | 'error'` dans le composant `ContactCTA`. Pas de librairie de formulaire (react-hook-form) car le formulaire est simple (4 champs) — gestion native avec `useState`.

### Architecture de la route API

`/api/contact` (App Router, `src/app/api/contact/route.ts`) :
- Méthode `POST` uniquement
- Validation basique côté serveur (champs requis, format email)
- Appel Resend SDK pour envoi à `julie.tyrode@gmail.com`
- Réponse JSON `{ success: boolean, error?: string }`

## Risks / Trade-offs

- **Dépendance Resend** → Resend doit être installé (`npm install resend`) et un compte créé. Risque : downtime Resend → Mitigation : le lien LinkedIn reste visible comme canal de secours.
- **Spam** → Sans CAPTCHA, le formulaire est exposé aux bots. Mitigation : honeypot ou rate-limiting à envisager en phase post-MVP.
- **Config domaine Resend** → L'envoi depuis un domaine vérifié est recommandé ; en développement l'adresse `onboarding@resend.dev` peut être utilisée temporairement.
