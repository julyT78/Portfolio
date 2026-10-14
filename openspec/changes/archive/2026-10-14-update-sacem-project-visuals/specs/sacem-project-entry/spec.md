## MODIFIED Requirements

### Requirement: Entrée Sacem complète dans la source de données
Le tableau `PROJECTS` dans `src/data/projects.ts` SHALL contenir un objet `ProjectData` avec `id: "sacem"` incluant tous les champs requis pour la card homepage et la page case study, dont une galerie d'au moins 4 visuels.

#### Scenario: Champs homepage présents
- **WHEN** on accède à l'entrée `id: "sacem"` dans le tableau PROJECTS
- **THEN** les champs `client`, `year`, `title`, `tagline`, `tags`, `color`, `image`, `href`, `kpi` et `deepDive` sont tous définis et non vides

#### Scenario: Champs case study présents
- **WHEN** on accède à l'entrée `id: "sacem"` dans le tableau PROJECTS
- **THEN** les champs `context`, `role`, `duration`, `approach` (tableau avec au moins 3 étapes) et `results` (tableau avec au moins 3 items) sont définis

#### Scenario: Tags reflètent les compétences Sacem
- **WHEN** on inspecte le champ `tags` de l'entrée Sacem
- **THEN** les tags incluent au moins "RGAA A1", "IA agent" et "UX Research"

#### Scenario: Image disponible et servable par Next.js
- **WHEN** Next.js génère la page ou la card Sacem
- **THEN** le chemin `image` pointe vers un fichier existant dans `public/images/projects/sacem/`

#### Scenario: Galerie illustrant les parcours clés
- **WHEN** on inspecte le champ `gallery` de l'entrée Sacem
- **THEN** le tableau contient au moins 4 chemins distincts, tous situés sous `public/images/projects/sacem/`, couvrant le tableau de bord administrateur, la liste des déclarations fédération, le tunnel de paiement gestionnaire et la validation de contraste RGAA

#### Scenario: Ancien visuel retiré
- **WHEN** on inspecte le champ `gallery` de l'entrée Sacem et le dossier `public/images/projects/sacem/`
- **THEN** `ecran_sacem.png` n'est référencé nulle part et le fichier n'est plus présent dans le dossier publié

## ADDED Requirements

### Requirement: Couverture CENSO dédiée
Le champ `image` de l'entrée Sacem SHALL pointer vers l'asset de couverture `censo-cover.png`, distinct des visuels de galerie, afin que la card homepage et le hero du cas d'étude présentent une mise en situation du tableau de bord CENSO.

#### Scenario: Couverture servie sur la homepage
- **WHEN** la card SACEM est rendue dans la section Projets de la homepage
- **THEN** l'image affichée est `/images/projects/sacem/censo-cover.png` et le fichier est retourné avec statut 200

#### Scenario: Couverture distincte du premier visuel de galerie
- **WHEN** on compare `image` et `gallery[0]` de l'entrée Sacem
- **THEN** les deux chemins sont différents

---

### Requirement: Assets CENSO publiés dans public
Les visuels sélectionnés SHALL être présents dans `public/images/projects/sacem/` avec des noms en kebab-case sans accent, espace ni majuscule, conformément à la convention des autres dossiers projets.

#### Scenario: Fichiers accessibles via HTTP
- **WHEN** le navigateur demande l'un des chemins listés dans `image` ou `gallery` de l'entrée Sacem
- **THEN** le fichier est retourné avec statut 200

#### Scenario: Nommage conforme
- **WHEN** on liste les fichiers ajoutés dans `public/images/projects/sacem/`
- **THEN** chaque nom de fichier ne contient que des minuscules, chiffres, tirets et l'extension `.png`

#### Scenario: Captures non exploitables exclues
- **WHEN** on vérifie le contenu de `public/images/projects/sacem/`
- **THEN** aucune capture comportant un chrome d'outil de design ou une notification système incrustée n'est publiée

#### Scenario: Aucune donnée personnelle lisible
- **WHEN** on inspecte les visuels publiés qui montrent des fiches adhérent
- **THEN** les noms de personnes physiques, adresses e-mail et numéros de téléphone sont floutés et illisibles, tandis que les noms d'associations et les données métier restent lisibles

## REMOVED Requirements

### Requirement: Asset ecran_sacem.png copié dans public
**Reason**: Le visuel a été retiré de la galerie Sacem, sa mise en situation faisant doublon avec la nouvelle couverture `censo-cover.png`, et son écran datant d'un état antérieur du produit. Le fichier publié a été supprimé.

**Migration**: Aucune action requise côté code. La requirement « Assets CENSO publiés dans public » couvre désormais les visuels effectivement servis. La source reste archivée dans `assets/Projets/Sacem/ecran_sacem.png` si le visuel devait être réintroduit.
