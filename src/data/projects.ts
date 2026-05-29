export type ApproachStep = {
  step: string;
  title: string;
  body: string;
};

export type ChallengeEntry = {
  flaw: string;
  flawDetail: string;
  solution: string;
  solutionDetail: string;
  image?: string;
};

export type DeepDiveSection = {
  title: string;
  body: string;
};

export type AgentFlowNode = {
  node: string;
  label: string;
  type: "input" | "process" | "output" | "decision";
};

export type ProjectData = {
  // ── Homepage card fields ──────────────────────────────────────
  id: string;
  client: string;
  year: string;
  title: string;
  tagline: string;
  tags: string[];
  color: string;
  image: string;
  href: string;
  kpi: { value: string; label: string };
  deepDive: string;
  // ── Case study extended fields ────────────────────────────────
  context: string;
  role: string;
  duration: string;
  approach: ApproachStep[];
  results: string[];
  gallery?: string[];
  // ── Double Vitesse fields ─────────────────────────────────────
  challenges?: ChallengeEntry[];
  deepDiveSections?: DeepDiveSection[];
  agentFlow?: AgentFlowNode[];
};

export const PROJECTS: ProjectData[] = [
  {
    id: "pulse",
    client: "Softeam",
    year: "2026",
    title: "Dashboard PULSE",
    tagline: "Piloter l'IA pour fusionner design et code en temps réel",
    tags: ["IA Design", "Vibe Coding", "POC"],
    color: "bg-coral",
    image: "/images/projects/softeam/Pulse-dashboard.svg",
    href: "/projects/pulse",
    kpi: { value: "-60%", label: "cycle design→code" },
    deepDive:
      "Conception d'un pipeline IA-first : prompt engineering, génération de composants via Claude, validation design en temps réel. Enjeux : cohérence du design system face à la variabilité des outputs LLM, gestion des hallucinations visuelles, boucle feedback humain-machine.",
    context:
      "Le marché évolue vers des profils de designers augmentés, capables de faire le lien entre design et code. Dans le cadre d'un POC IA orienté productivité interne, j'ai conçu et développé un dashboard de task tracking en vibe coding, en structurant une méthodologie complète allant de la découverte à la livraison. Face à une demande clients croissante pour des expertises hybrides, l'outil POC Pulse devient un terrain d'expérimentation concret, aligné avec les attentes actuelles du marché.",
    role: "Product Designer & Builder — IA Design, Vibe Coding, Prompt Engineering",
    duration: "Avril 2026 — en cours",
    approach: [
      {
        step: "1",
        title: "Découverte & cadrage",
        body: "Définition du besoin, entretiens utilisateurs internes, identification des cas d'usage prioritaires. Structuration du brief IA.",
      },
      {
        step: "2",
        title: "Planification & architecture",
        body: "Arborescence fonctionnelle, choix des outils (Claude API, hooks), définition du design system à générer.",
      },
      {
        step: "3",
        title: "Setup & pipeline",
        body: "Configuration de l'environnement vibe coding, mise en place du pipeline IA (prompt → composant → validation).",
      },
      {
        step: "4",
        title: "Construction itérative",
        body: "Génération de composants via Claude Code, validation design à chaque cycle. Build feature par feature avec boucle feedback humain-machine.",
      },
    ],
    results: [
      "MVP fonctionnel en 2 jours au lieu de 2 semaines",
      "Réduction drastique du temps entre l'idée et le test utilisateur",
      "Autonomie technique retrouvée sans dépendre d'une équipe dev",
      "Méthodologie reproductible documentée pour l'agence",
    ],
    gallery: [
      "/images/projects/softeam/Pulse-dashboard.svg",
      "/images/projects/softeam/Pulse2.png",
      "/images/projects/softeam/Pulse3.png",
      "/images/projects/softeam/Pulse4.png",
      "/images/projects/softeam/pulse5.png",
    ],
    challenges: [
      {
        flaw: "Variabilité des outputs LLM",
        flawDetail: "Claude génère des composants visuellement incohérents d'une itération à l'autre — même prompt, résultats différents. Le design system perd sa cohérence sans garde-fou.",
        solution: "Boucle de validation design en temps réel",
        solutionDetail: "Chaque composant généré passe par un cycle de revue immédiate : l'IA propose, le designer valide ou rejette avec un feedback court. La boucle s'auto-corrige sur 2 à 3 itérations.",
      },
      {
        flaw: "Hallucinations visuelles",
        flawDetail: "Le modèle invente des composants qui n'existent pas dans le design system, ou combine des tokens de façon sémantiquement incorrecte (couleur d'erreur sur un CTA de validation).",
        solution: "Injection du design system en system prompt",
        solutionDetail: "Les tokens de couleur, typographie et espacement sont injectés en contexte système. Claude ne peut plus inventer — il pioche uniquement dans le vocabulaire défini.",
      },
    ],
    deepDiveSections: [
      {
        title: "Gestion de la confiance dans les outputs générés",
        body: "La clé n'est pas d'empêcher les erreurs du modèle, mais de les rendre visibles et corrigeables. Chaque composant généré affiche son degré de correspondance avec le design system. En dessous d'un seuil (70%), une alerte visuelle demande une revue humaine avant intégration.",
      },
      {
        title: "Architecture du pipeline IA-first",
        body: "Le pipeline suit un schéma en trois temps : (1) le brief est structuré en contraintes formelles injectables, (2) Claude génère un composant JSX + sa justification, (3) une validation automatisée vérifie la conformité des tokens. La boucle humaine intervient uniquement à l'étape 3 pour les cas hors-seuil.",
      },
      {
        title: "Gestion de la latence de génération",
        body: "La génération d'un composant prend 3 à 8 secondes selon la complexité. L'interface affiche un skeleton progressif calqué sur la structure attendue du composant — pas un spinner générique. L'utilisateur voit la forme avant le contenu, ce qui ancre ses attentes et réduit la perception d'attente.",
      },
      {
        title: "Parcours utilisateur probabiliste",
        body: "Contrairement à un flux déterministe, le pipeline IA peut produire 3 chemins : succès direct (60%), succès après correction (35%), abandon et rebuild manuel (5%). Le design de l'interface anticipe ces trois cas avec des CTA adaptés à chaque état, sans imposer le chemin optimal.",
      },
    ],
    agentFlow: [
      { node: "ENTRÉE", label: "Brief design", type: "input" },
      { node: "PROCESS", label: "Structuration en contraintes", type: "process" },
      { node: "DÉCISION", label: "Ambiguité détectée ?", type: "decision" },
      { node: "PROCESS", label: "Génération Claude", type: "process" },
      { node: "PROCESS", label: "Validation tokens", type: "process" },
      { node: "SORTIE", label: "Composant validé", type: "output" },
    ],
  },

  {
    id: "labo-ia",
    client: "Softeam",
    year: "2025",
    title: "Laboratoire d'expertise IA Design",
    tagline: "Transformer l'IA en levier de valeur stratégique",
    tags: ["IA Design", "Coaching", "R&D"],
    color: "bg-lilac",
    image: "/images/projects/softeam/SofteamBG.jpg",
    href: "/projects/labo-ia",
    kpi: { value: "+8", label: "designers formés" },
    deepDive:
      "Programme de montée en compétences IA Design : ateliers prompt UX, cartographie des cas d'usage, définition de standards de qualité pour les outputs IA. Transfert de compétences sur les outils d'orchestration (n8n, Claude API) et les patterns d'interface agentique.",
    context:
      "Dans un contexte où les projets IA peinent encore à se concrétiser, et ce malgré une forte adoption, les organisations font face à des freins structurels : objectifs flous, manque de maturité, qualité des données insuffisante et absence d'accompagnement. En parallèle, la demande pour des profils augmentés croît, notamment côté design, avec une attente forte sur la capacité à relier technologie, usage et valeur métier. C'est dans ce cadre qu'a émergé le besoin de structurer un laboratoire d'expertise IA, capable d'apporter une réponse concrète, transverse et opérationnelle.",
    role: "Designer Engineer — UX Design, Lab, Coaching IA, R&D",
    duration: "Novembre 2025 — en cours",
    approach: [
      {
        step: "1",
        title: "Cadrer et contextualiser",
        body: "Définition des enjeux IA (usage, éthique, ROI). Positionnement du design comme levier stratégique d'adoption.",
      },
      {
        step: "2",
        title: "Structurer le système IA",
        body: "Organisation des formations par niveau (découverte, maîtrise, avancé). Création de modules documentés et reproductibles.",
      },
      {
        step: "3",
        title: "Concevoir avec les usages",
        body: "Ateliers pratiques sur des cas réels. Intégration de l'IA dans les phases de discovery, idéation et production.",
      },
      {
        step: "4",
        title: "Encadrer l'équipe",
        body: "Mentoring individuel, revues de travaux IA, mise en place d'une gouvernance design-IA partagée au sein de la BU.",
      },
    ],
    results: [
      "+8 designers formés aux pratiques IA Design",
      "Réseau de mentors et practitioners IA formé",
      "Contribution à acculturer les équipes aux enjeux IA (usage, éthique, ROI)",
      "Positionnement du design comme levier stratégique d'adoption IA",
    ],
    gallery: [
      "/images/projects/softeam/SofteamBG.jpg",
      "/images/projects/softeam/lab1.png",
      "/images/projects/softeam/lab2.png",
      "/images/projects/softeam/lab3.png",
      "/images/projects/softeam/roadmap.png",
    ],
  },

  {
    id: "chantier-ia",
    client: "Softeam",
    year: "2025–2026",
    title: "Chantier IA transverse",
    tagline: "Accélérer l'adoption de l'IA, sans perdre confiance",
    tags: ["IA Design", "Ateliers", "Design thinking"],
    color: "bg-mint",
    image: "/images/projects/softeam/dashboard-chantier-IA.png",
    href: "/projects/chantier-ia",
    kpi: { value: "+6", label: "équipes embarquées" },
    deepDive:
      "Initiative IA générative pensée pour des professions intellectuelles face à une vague d'outils difficile à lire : enthousiasme mêlé de pression et de doutes. Mission : structurer l'information et concevoir une expérience qui aide chaque consultant à décider quand, pourquoi et comment utiliser l'IA au quotidien. Empathy map adaptée par type d'expertise, ateliers pour identifier les manques (formations, méthodes, outils), puis validation d'une architecture de contenus simple et rassurante. Résultats : livrables plus clairs, homogénéité des productions, montée en compétence accélérée — sans créer de dépendance ni de perte de confiance.",
    context:
      "Softeam, filiale de Docaposte, regroupe des professions intellectuelles touchées par une vague d'outils IA difficile à lire. Le contexte : une adoption qui progresse vite, mais une compréhension inégale, avec un mélange d'enthousiasme, de pression et de doutes. Mon rôle a consisté à structurer l'information et à concevoir une expérience qui aide les utilisateurs à décider quand, pourquoi et comment utiliser l'IA dans leur quotidien.",
    role: "IA Design — Pilotage, Ateliers Design Thinking",
    duration: "Novembre 2025 — Mars 2026",
    approach: [
      {
        step: "1",
        title: "Empathy map par expertise",
        body: "Atelier pour regrouper les informations et les besoins des consultants selon chaque type d'expertise. Identification de ce qui leur manquait en matière d'IA.",
      },
      {
        step: "2",
        title: "Architecture de l'information",
        body: "Structuration des contenus IA (cas d'usage, bonnes pratiques, outils souverains) en arborescence simple et rassurante.",
      },
      {
        step: "3",
        title: "Validation et itération",
        body: "Tests de l'architecture avec des représentants de chaque type d'expertise. Simplification des parcours sur la base des retours.",
      },
    ],
    results: [
      "Accélération des projets : time-to-market réduit grâce aux consultants mieux outillés",
      "Valeur ajoutée accrue : propositions enrichies, scénarios alternatifs, recommandations plus fines",
      "Sécurité et conformité : usage maîtrisé d'IA souveraines et responsables",
      "Montée en compétence rapide et valorisation personnelle des profils",
    ],
    gallery: [
      "/images/projects/softeam/dashboard-chantier-IA.png",
      "/images/projects/softeam/visuel-chantier-IA.png",
    ],
  },

  {
    id: "power-bi",
    client: "La Poste — BSCC",
    year: "2025–2026",
    title: "Outil Power BI",
    tagline: "UI pour données complexes alignée aux Design Systems groupe",
    tags: ["UI Design", "Data viz", "Prototypes"],
    color: "bg-cream",
    image: "/images/projects/laposte/pbi-dashboard.png",
    href: "/projects/power-bi",
    kpi: { value: "-60%", label: "temps de création d'un rapport" },
    deepDive:
      "L'équipe DEXCIL publiait des dizaines de rapports logistiques chaque mois pour les 300+ PICs nationaux — manuellement, dans Excel. Conception d'un tableau de bord PowerBI centralisé, interface HIFI alignée sur les Design Systems groupe (Halo et Microsoft). Enjeux : surcharges CSS imposées par PowerBI, lisibilité des données chaudes à surveiller, création d'un parcours de reporting actionnable là où il n'existait qu'un fichier.",
    context:
      "L'équipe DEXCIL (Direction Exécutive Courrier Industrielle Logistique) publie et diffuse une dizaine de rapports plusieurs fois par mois auprès des 30+ PICs nationaux. Ces rapports aident les établissements à piloter leurs activités. La publication était réalisée manuellement par l'équipe DEXCIL dans un Excel, puis la DSI automatisait la mise à jour des données. L'objectif : réaliser un nouvel outil PowerBI qui centralise l'information.",
    role: "UI Designer — Design System, Prototypes, Coordination technique",
    duration: "Décembre 2025 — Février 2026 (2 mois)",
    approach: [
      {
        step: "1",
        title: "Ateliers UX & identification des irritants",
        body: "Animation d'ateliers UX pour identifier les besoins utilisateurs et les irritants liés au reporting existant. Remontée et priorisation des points de friction.",
      },
      {
        step: "2",
        title: "Analyse & alignement Design System",
        body: "Étude des contraintes imposées par PowerBI (CSS limité, composants figés). Alignement avec les Design Systems groupe Halo et Microsoft.",
      },
      {
        step: "3",
        title: "Prototypage HIFI",
        body: "Création de prototypes haute-fidélité complexes avec Figma. Visualisation des données chaudes, création de graphiques alignés sur les données PICs.",
      },
      {
        step: "4",
        title: "Validation & livraison",
        body: "Ajustements en adéquation avec les besoins métiers. Simplification du traitement et de l'analyse des données chaudes. Désamorçage des contraintes techniques PowerBI.",
      },
    ],
    results: [
      "-60% sur le temps nécessaire à la création d'un rapport",
      "Interface homogène et accessible pour les 300+ utilisateurs PICs",
      "Alignement Design System groupe (Halo + Microsoft) respecté",
      "Données chaudes visibles et actionnables dès l'ouverture du rapport",
    ],
    gallery: [
      "/images/projects/laposte/pbi-dashboard.png",
      "/images/projects/laposte/pbi1.png",
      "/images/projects/laposte/pbi2.png",
      "/images/projects/laposte/pbi3.png",
      "/images/projects/laposte/pbi4.png",
      "/images/projects/laposte/pbi5.png",
      "/images/projects/laposte/pbi6.png",
    ],
  },

  {
    id: "numspot",
    client: "Numspot",
    year: "2023",
    title: "Portail Cloud Souverain",
    tagline: "Concevoir chaque fonctionnalité d'un cloud européen face aux standards AWS",
    tags: ["UX Research", "Design System", "Ateliers"],
    color: "bg-lime",
    image: "/images/projects/numspot/numspotBG.svg",
    href: "/projects/numspot",
    kpi: { value: "+20", label: "fonctionnalités conçues de zéro" },
    deepDive:
      "Premier cloud souverain français, Numspot devait rivaliser avec AWS/Azure sans partir avec leur historique UX. Audit heuristique du produit existant, création de personas (Expert tech, DevOps, Architecte réseau), ateliers de vision produit cross-équipes pour aligner API et interface. Conception du design system et des wireframes de chaque feature réseau : VPC, VMs, NICs, load balancers, sous-réseaux — en suivant les API construites par les équipes dev.",
    context:
      "Numspot est le premier cloud souverain français, co-construit par Bouygues Telecom, Docaposte, Dassault Systèmes et La Poste. Face aux standards d'AWS et Azure, le challenge était de concevoir une expérience utilisateur compétitive sur un produit entièrement nouveau, sans historique UX, avec des utilisateurs experts (DevOps, architectes réseau, responsables techniques).",
    role: "UX/UI Designer — Design System, Ateliers, Wireframes, Audit heuristique",
    duration: "2023 (6 mois)",
    approach: [
      {
        step: "1",
        title: "Audit heuristique",
        body: "Évaluation du produit existant sur les 10 heuristiques de Nielsen. Identification des axes d'amélioration prioritaires : cohérence, prévention des erreurs, esthétique.",
      },
      {
        step: "2",
        title: "Personas & vision produit",
        body: "Création de personas (Expert tech, DevOps, Architecte réseau). Ateliers de vision produit cross-équipes pour aligner l'interface avec les APIs construites par le dev.",
      },
      {
        step: "3",
        title: "Design System",
        body: "Définition des règles ergonomiques (V1, V2, V3). Création des composants réutilisables alignés sur les contraintes techniques du cloud souverain.",
      },
      {
        step: "4",
        title: "Conception feature par feature",
        body: "Wireframes puis maquettes pour chaque fonctionnalité réseau : VPC, VMs, NICs, load balancers, sous-réseaux, internet gateways — en suivant les specs API des équipes dev.",
      },
    ],
    results: [
      "+20 fonctionnalités conçues de zéro",
      "Design system complet aligné sur les contraintes du cloud souverain",
      "Vision produit partagée et cohérente entre toutes les équipes",
      "Portail compétitif face aux standards AWS/Azure sur l'ergonomie",
    ],
    gallery: [
      "/images/projects/numspot/numspot16.png",
      "/images/projects/numspot/Numspot12.png",
      "/images/projects/numspot/numspotheuristique.webp",
      "/images/projects/numspot/numspot10.png",
    ],
  },

  {
    id: "societe-generale",
    client: "Société Générale",
    year: "2019–2022",
    title: "Suite Conformité Bancaire",
    tagline: "Concevoir les outils anti-fraude et compliance d'une banque mondiale",
    tags: ["Design System", "Ateliers", "Front-end"],
    color: "bg-pink",
    image: "/images/projects/societe-generale/SGBG.svg",
    href: "/projects/societe-generale",
    kpi: { value: "3 apps", label: "conformité livrées en 3 ans" },
    deepDive:
      "Le service conformité de la SG développe des outils internes pour contrôler alertes et fraudes bancaires — contexte réglementaire strict, utilisateurs experts. Trois applications conçues de A à Z : GEMS (déclaration cadeaux, repas, invitations anti-corruption pour 140k collaborateurs), MyCompass (questionnaire de risque compliance), S&E Investigation (analyse d'alertes de transactions financières suspectes). Ateliers utilisateurs, design system groupe, coordination front-end.",
    context:
      "Le service conformité de la Société Générale développe des outils numériques internes pour contrôler et améliorer le traitement des alertes et des fraudes bancaires. Contexte réglementaire strict (lutte anti-corruption, conformité bancaire internationale), utilisateurs experts en compliance. Sur +3 ans, proposition d'axes d'amélioration du parcours expert, mise en place d'ateliers et conception de plusieurs applications métier.",
    role: "Product Designer — Design System, Ateliers, Front-end, Conformité",
    duration: "2019–2022 (+3 ans)",
    approach: [
      {
        step: "1",
        title: "Ateliers utilisateurs & audit",
        body: "Entretiens avec les experts conformité, cartographie des parcours existants. Identification des irritants principaux et des axes d'amélioration prioritaires.",
      },
      {
        step: "2",
        title: "Design System groupe",
        body: "Conception et déploiement d'un design system cohérent pour les outils de conformité. Composants réutilisables, accessibles, alignés sur les guidelines SG.",
      },
      {
        step: "3",
        title: "Conception GEMS",
        body: "Application de déclaration de cadeaux, repas et invitations anti-corruption. Personas (déclarant, validateur, compliance officer), user flow simplifié pour 140k collaborateurs.",
      },
      {
        step: "4",
        title: "MyCompass & S&E Investigation",
        body: "MyCompass : questionnaire de risque compliance avec tableau de bord de synthèse. S&E Investigation : interface d'analyse d'alertes de transactions financières suspectes avec actions RFI et validation.",
      },
    ],
    results: [
      "3 applications conformité livrées de A à Z sur 3 ans",
      "Design system groupe déployé sur toutes les applications conformité",
      "140k collaborateurs couverts par GEMS anti-corruption",
      "Réduction du temps de traitement des alertes pour les experts conformité",
    ],
    gallery: [
      "/images/projects/societe-generale/MacBook Pro 16.png",
      "/images/projects/societe-generale/AccueilV4_2x.png",
      "/images/projects/societe-generale/040 Overview_2x.png",
      "/images/projects/societe-generale/S&E Investigation - Alert PAGE.png",
    ],
  },
];

/** Trouve un projet par son slug (= id) */
export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.id === slug);
}

/** Renvoie le projet précédent et suivant (circulaire) */
export function getAdjacentProjects(slug: string): {
  prev: ProjectData;
  next: ProjectData;
} {
  const idx = PROJECTS.findIndex((p) => p.id === slug);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  return { prev, next };
}
