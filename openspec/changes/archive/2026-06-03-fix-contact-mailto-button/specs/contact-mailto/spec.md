## ADDED Requirements

### Requirement: Contact button opens mail client
Le bouton "Envoyer un message" dans la section ContactCTA SHALL déclencher l'ouverture du client mail par défaut de l'utilisateur avec l'adresse `julie.tyrode@gmail.com` pré-remplie en tant que destinataire.

#### Scenario: Clic sur le bouton depuis un desktop
- **WHEN** l'utilisateur clique sur le bouton "Envoyer un message" depuis un navigateur desktop
- **THEN** le client mail par défaut s'ouvre avec `julie.tyrode@gmail.com` dans le champ destinataire

#### Scenario: Clic sur le bouton depuis un mobile
- **WHEN** l'utilisateur clique sur le bouton "Envoyer un message" depuis un navigateur mobile
- **THEN** le système propose d'ouvrir une application mail avec `julie.tyrode@gmail.com` dans le champ destinataire

#### Scenario: Rendu HTML du bouton
- **WHEN** la page est rendue
- **THEN** le bouton doit être une balise `<a>` native avec `href="mailto:julie.tyrode@gmail.com"`, non un composant Next.js `<Link>`
