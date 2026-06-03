## 1. Installation et configuration

- [x] 1.1 Installer la dépendance `resend` (`npm install resend`)
- [x] 1.2 Ajouter la variable `RESEND_API_KEY` dans `.env.local` (et documenter dans `.env.example` si existant)

## 2. Route API

- [x] 2.1 Créer le fichier `src/app/api/contact/route.ts` avec la méthode POST
- [x] 2.2 Implémenter la validation des données reçues (champs requis, format email)
- [x] 2.3 Intégrer l'envoi d'email via Resend SDK vers `julie.tyrode@gmail.com`
- [x] 2.4 Retourner les réponses JSON appropriées (200 succès, 400 validation, 500 erreur Resend)

## 3. Traductions i18n

- [x] 3.1 Ajouter les clés de traduction du formulaire dans `messages/fr.json` (labels, placeholders, messages succès/erreur)
- [x] 3.2 Ajouter les clés de traduction du formulaire dans `messages/en.json`

## 4. Composant formulaire

- [x] 4.1 Remplacer le bouton mailto et le `useState` `copied` par un état `status` (`idle | loading | success | error`) dans `ContactCTA.tsx`
- [x] 4.2 Ajouter les champs nom, prénom, email, message avec leur état local
- [x] 4.3 Implémenter la validation côté client (champs vides, format email)
- [x] 4.4 Implémenter la soumission vers `/api/contact` avec gestion du state `loading`
- [x] 4.5 Afficher le message de succès après envoi réussi
- [x] 4.6 Afficher le message d'erreur en cas d'échec avec possibilité de réessayer
- [x] 4.7 Styler le formulaire pour correspondre au design de la section (`bg-navy`, typographie existante, OKLCH)

## 5. Vérification

- [ ] 5.1 Tester l'envoi du formulaire en local (vérifier réception email)
- [x] 5.2 Tester les cas d'erreur (champs vides, email invalide, erreur API)
- [x] 5.3 Vérifier le responsive (mobile et desktop) avec playwright-skill
