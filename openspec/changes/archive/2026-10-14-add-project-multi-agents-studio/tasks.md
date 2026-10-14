## 1. Préparation des assets

- [x] 1.1 Créer le dossier `public/images/projects/multi-agents-studio/`
- [x] 1.2 Copier et renommer en kebab-case ASCII les 6 captures sélectionnées depuis `assets/Projets/Multi-agents Studio/` :
  - `Capture d'écran 2026-09-08 à 14.03.32.png` → `multi-agent-studio-hero.png`
  - `Capture d'écran 2026-09-08 à 14.04.30.png` → `multi-agent-studio-catalogue-agents.png`
  - `Capture d'écran 2026-09-08 à 14.05.25.png` → `multi-agent-studio-playbook-censo.png`
  - `Capture d'écran 2026-09-08 à 14.44.03.png` → `multi-agent-studio-parcours-tech-lead.png`
  - `Capture d'écran 2026-10-14 à 08.19.47.png` → `getup-forward-dashboard.png`
  - `Capture d'écran 2026-10-14 à 08.20.42.png` → `getup-forward-niveau-1.png`
- [x] 1.3 Vérifier que chaque fichier est accessible via son URL `/images/projects/multi-agents-studio/<nom>.png` (lancer le dev server si besoin)

## 2. Données projet dans projects.ts

- [x] 2.1 Ajouter l'objet `ProjectData` pour `id: "multi-agents-studio"` dans le tableau `PROJECTS` avec les champs homepage : `client: "Docaposte (La Poste)"`, `year: "2026"`, `title`, `tagline`, `tags`, `color: "bg-mint"`, `image: "/images/projects/multi-agents-studio/getup-forward-dashboard.png"`, `href: "/projects/multi-agents-studio"`, `kpi: { value: "24", label: "agents IA orchestrés en 1 commande" }`, `deepDive`
- [x] 2.2 Ajouter les champs case study : `context` (plateforme GETUP Forward, 4 pôles, framework multi-agents), `role`, `duration`, `approach` (4 étapes : cadrage des pôles, parcours utilisateur, framework d'orchestration, tests utilisateurs), `results` (4 items quantifiés : score SUS 76,2, facilité de prise en main, 24 agents, plan de passage à l'échelle), `gallery` (les 6 images copiées)
- [x] 2.3 Ajouter les champs étendus : `challenges` (3 paires flaw/solution issues des points de friction des tests), `deepDiveSections` (4 sections : architecture 4 pôles, framework d'orchestration, validation SUS, séparation Product Design / Tech), `agentFlow` (brief YAML → orchestrateur → décision de rôle → workers → guardians → 24 agents livrés)
- [x] 2.4 Vérifier que TypeScript compile sans erreur (`npx tsc --noEmit`)

## 3. Vérification homepage

- [x] 3.1 Démarrer le dev server et confirmer que la card Multi-Agents Studio apparaît dans la section Projets de la homepage avec la couleur mint
- [x] 3.2 Confirmer que le lien "Voir le cas" pointe vers `/fr/projects/multi-agents-studio` (ou `/en/projects/multi-agents-studio`)

## 4. Vérification page case study

- [x] 4.1 Accéder à `/fr/projects/multi-agents-studio` et confirmer que la page s'affiche sans erreur 404
- [x] 4.2 Vérifier que le hero affiche : client Docaposte, titre, tagline, KPI badge et tags
- [x] 4.3 Vérifier que les 6 images de la galerie s'affichent sans erreur
- [x] 4.4 Vérifier que les sections contexte, démarche et résultats sont cohérentes avec le contenu source
- [x] 4.5 Vérifier que `CaseStudyAgentFlow`, `CaseStudyChallengeModule` et `CaseStudyDeepDive` s'affichent avec les données du projet

## 5. Test UI (playwright-skill)

- [x] 5.1 Tester le responsive de la nouvelle card homepage et de la page case study (mobile, tablette, desktop)
- [x] 5.2 Vérifier l'absence de régression sur les autres cards/projets de la grille
