## Context

Le portfolio utilise une source de données centralisée (`src/data/projects.ts`) pour alimenter à la fois les cards homepage et les pages case study. L'architecture existante (composant `Projects.tsx`, route dynamique `/[locale]/projects/[slug]`, modules `CaseStudyAgentFlow`, `CaseStudyChallengeModule`, `CaseStudyDeepDive`) est générique et déjà exploitée par le projet `pulse` : ajouter un nouveau projet, même avec les champs étendus, ne requiert aucune modification de composant.

Les assets visuels du projet sont dans `assets/Projets/Multi-agents Studio/` (hors du dossier `public/`), sous forme de 17 captures d'écran avec des noms contenant espaces et accents (ex. `Capture d'écran 2026-09-08 à 14.03.32.png`). Une sélection doit être copiée et renommée en kebab-case ASCII dans `public/images/projects/multi-agents-studio/` pour être servie par Next.js.

Le contenu source (`Refonte_Multi_Agents_Studio_presentation.pdf`) documente deux volets d'un même produit :
1. **GETUP Forward** — plateforme de formation IA à 4 pôles (Formation, Studio IA, Assets, Gouvernance)
2. **Multi-Agent Studio / Squad Enablement Kit** — framework technique générant 24 agents spécialisés (1 coordinateur, 18 workers, 5 guardians) à partir d'une configuration YAML projet ; ce framework est celui qui a orchestré la refonte CENSO/SACEM déjà présente dans le portfolio.

## Goals / Non-Goals

**Goals:**
- Ajouter l'entrée `multi-agents-studio` dans `src/data/projects.ts` avec les champs complets (card + case study + challenges + deepDiveSections + agentFlow)
- Sélectionner et copier 5 à 6 captures d'écran représentatives vers `public/images/projects/multi-agents-studio/` avec des noms de fichiers kebab-case ASCII
- La card apparaît dans la section Projets homepage
- La page `/[locale]/projects/multi-agents-studio` est générée statiquement et affiche les modules AgentFlow, ChallengeModule et DeepDive

**Non-Goals:**
- Modifier le composant `Projects.tsx`, la page case study ou les modules narratifs (déjà génériques et déjà utilisés par `pulse`)
- Créer un nouveau template de page
- Traduire le contenu en anglais dans cette itération (pattern identique aux autres projets : contenu français uniquement pour l'instant)
- Exposer des informations sensibles du PDF source (identités des testeurs, détails d'infrastructure interne Docaposte) : seul le contenu produit/UX pertinent pour un portfolio public est repris

## Decisions

**Couleur de card : `bg-mint`**
Le dashboard GETUP Forward (capture `08.19.47`) utilise une palette pastel bleu/menthe. `block-mint` est la teinte la plus proche visuellement. Cette teinte est déjà utilisée par `chantier-ia`, mais `bg-lilac` est déjà réutilisé deux fois dans le portfolio (`sacem`, `labo-ia`) sans que cela pose de problème de distinction visuelle — les cards restent différenciées par le contenu, le client et l'image.

**KPI : `{ value: "24", label: "agents IA orchestrés en 1 commande" }`**
C'est le chiffre le plus différenciant pour la posture d'Orchestrateur : il quantifie directement la capacité d'orchestration multi-agents, plus parlant qu'un score SUS pour un public recruteur généraliste. Alternative écartée : `{ value: "76,2", label: "score SUS" }` (plus pertinent pour un public UX Research mais moins immédiatement lisible).

**Images sélectionnées (6 captures sur 17 disponibles)**
- `getup-forward-dashboard.png` (ex `08.19.47`) → image de card + hero (vue d'ensemble, pôle Formation)
- `getup-forward-niveau-1.png` (ex `08.20.42`) → pôle Formation, progression par niveau
- `multi-agent-studio-hero.png` (ex `14.03.32`) → pôle Studio IA / Squad Enablement Kit
- `multi-agent-studio-catalogue-agents.png` (ex `14.04.30`) → catalogue des 24 agents (coordinator/worker/guardian)
- `multi-agent-studio-playbook-censo.png` (ex `14.05.25`) → preuve du lien direct avec le projet SACEM/CENSO du portfolio
- `multi-agent-studio-parcours-tech-lead.png` (ex `14.44.03`) → parcours d'adoption à 6 semaines
Alternative écartée : inclure les 17 captures (trop dense pour une galerie de case study, dilue le narratif).

**Challenges : 3 paires flaw/solution issues des retours de tests utilisateurs**
Les "points de friction" du PDF (contenu trop textuel, jargon technique, sections mal ciblées par profil, hébergement personnel non sécurisé) sont réécrits sous forme de couples flaw/solution pour alimenter `CaseStudyChallengeModule`, cohérent avec le pattern déjà utilisé par `pulse`.

**agentFlow : représentation du framework d'orchestration**
Le champ `agentFlow` modélise le flux réel du Squad Enablement Kit (brief YAML → orchestrateur → décision de rôle → workers spécialisés → guardians qualité/sécurité → 24 agents livrés), renforçant visuellement la posture d'Orchestrateur sur cette étude de cas en particulier.

**Aucun nouveau composant requis**
L'architecture existante gère déjà les nouveaux slugs dynamiquement via `generateStaticParams`, et les modules `CaseStudyAgentFlow` / `CaseStudyChallengeModule` / `CaseStudyDeepDive` sont déjà génériques (utilisés par `pulse`).

## Risks / Trade-offs

- **[Risque] Ordre d'affichage dans la grille homepage** → La card sera ajoutée à la fin du tableau `PROJECTS` (dernier projet après `societe-generale`). Si l'ordre visuel ne convient pas, il suffit de déplacer l'objet dans le tableau (pattern déjà utilisé pour réordonner Sacem en première position).
- **[Risque] Noms de fichiers source avec accents/espaces** → Les captures d'écran originales contiennent des caractères non URL-safe. L'implémentation doit copier (pas déplacer) et renommer en kebab-case ASCII vers `public/`.
- **[Risque] Confidentialité du contenu Docaposte** → Le PDF source mentionne des détails internes (noms d'équipe, infrastructure Vercel personnelle, backlog technique interne). Seul le contenu orienté produit/UX/résultats est repris dans `projects.ts`, à l'exclusion des détails d'infrastructure et de gouvernance interne sensibles.
- **[Risque] Contenu bilingue manquant** → Pattern identique aux autres projets existants (contenu français uniquement pour cette itération).
