## ADDED Requirements

### Requirement: Contact form fields
La section ContactCTA SHALL présenter un formulaire avec quatre champs obligatoires : nom, prénom, email et message.

#### Scenario: Affichage du formulaire
- **WHEN** l'utilisateur arrive sur la section contact
- **THEN** le formulaire affiche les champs nom, prénom, email et message avec leurs labels respectifs

#### Scenario: Validation côté client — champs vides
- **WHEN** l'utilisateur soumet le formulaire sans remplir tous les champs obligatoires
- **THEN** les champs manquants sont mis en évidence et l'envoi est bloqué

#### Scenario: Validation côté client — email invalide
- **WHEN** l'utilisateur saisit une adresse email au format incorrect et soumet le formulaire
- **THEN** le champ email affiche un message d'erreur et l'envoi est bloqué

### Requirement: Contact form submission
Le formulaire SHALL envoyer les données via une requête POST à `/api/contact` et afficher un feedback à l'utilisateur selon le résultat.

#### Scenario: Envoi en cours
- **WHEN** l'utilisateur clique sur le bouton "Envoyer" avec un formulaire valide
- **THEN** le bouton passe en état désactivé avec un indicateur de chargement

#### Scenario: Envoi réussi
- **WHEN** la route API `/api/contact` retourne `{ success: true }`
- **THEN** le formulaire est remplacé par un message de confirmation de succès

#### Scenario: Erreur d'envoi
- **WHEN** la route API `/api/contact` retourne une erreur ou est inaccessible
- **THEN** un message d'erreur s'affiche et le formulaire reste accessible pour réessayer

### Requirement: Contact API route
La route `POST /api/contact` SHALL valider les données reçues, puis envoyer un email à `julie.tyrode@gmail.com` via le service Resend.

#### Scenario: Données valides reçues
- **WHEN** la route reçoit un body JSON avec nom, prénom, email et message non vides et un email valide
- **THEN** la route envoie l'email via Resend et retourne `{ success: true }` avec statut HTTP 200

#### Scenario: Données invalides reçues
- **WHEN** la route reçoit un body JSON avec un champ manquant ou un email malformé
- **THEN** la route retourne `{ success: false, error: "..." }` avec statut HTTP 400

#### Scenario: Erreur Resend
- **WHEN** l'appel à l'API Resend échoue
- **THEN** la route retourne `{ success: false, error: "..." }` avec statut HTTP 500

### Requirement: Contact form i18n
Tous les labels, placeholders et messages du formulaire de contact SHALL être internationalisés via `next-intl` avec support fr/en.

#### Scenario: Affichage en français
- **WHEN** la locale active est `fr`
- **THEN** les labels du formulaire s'affichent en français (Nom, Prénom, Email, Message, Envoyer)

#### Scenario: Affichage en anglais
- **WHEN** la locale active est `en`
- **THEN** les labels du formulaire s'affichent en anglais (Last name, First name, Email, Message, Send)
