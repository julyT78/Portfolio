# Product Requirement Document (PRD)
## Projet : Smart Portfolio d'un Orchestrateur d'IA / Product Designer

---

## 1. Vision & Objectifs Stratégiques

### 1.1. Contexte & Positionnement
Le web vit une transition majeure. Les interfaces statiques et déterministes font place à des interfaces probabilistes et génératives pilotées par des modèles d'IA. Ce portfolio doit incarner cette évolution. L'auteur n'est plus seulement un dessinateur d'écrans pixel-perfect (Product Designer classique), mais un **Orchestrateur de flux d'IA et de Design Systems d'agents**.

### 1.2. Proposition de Valeur Unique (UVP)
> "*Démontrer par l'action que concevoir pour l'IA requiert un design system rigoureux capable d'absorber la friction, le temps de latence et les hallucinations des modèles algorithmiques.*"

### 1.3. Objectifs Business (KPI)
*   **Objectif principal :** Obtenir des contacts qualifiés pour des opportunités professionnelles (Freelance, CDI, Conseil) orientées IA Design.
*   **KPIs clés :**
    *   **Taux d'engagement du Playground :** > 50 % des visiteurs interagissent avec la démo interactive.
    *   **Taux de complétion du formulaire de contact :** > 5 % des visiteurs uniques.
    *   **Durée moyenne de session :** > 2m30s pour les profils qualifiés (Head of Design/Product).

---

## 2. Personas (Cibles Utilisateurs)

### Persona A : Sarah — Tech Recruiter (profil RH)
*   **Frustration :** Reçoit 50 portfolios par jour, manque de temps de lecture (30 secondes par site maximum), peu de qualifications techniques approfondies concernant le design d'IA.
*   **Objectif :** Valider instantanément si le candidat possède une posture "IA", s'il est mémorable et si les indicateurs de succès (KPIs) de ses projets sont visibles et clairs.
*   **Besoin UX dédié :** **Parcours Voie A (Scan Rapide).** Une navigation visuelle ultra-fluide, des fiches de synthèse mémorables et le Playground IA d'emblée interactif et ludique.

### Persona B : Thomas — Head of Design / VP Product
*   **Frustration :** Les designers se prétendent "spécialistes IA" simplement parce qu'ils utilisent Midjourney ou Figma AI. Cherche une vraie rigueur méthodologique en interaction Homme-Machine (IHM).
*   **Objectif :** Évaluer comment le candidat gère les frictions critiques inhérentes à l'IA : explicabilité algorithmique, gestion de la latence de génération des LLM, feedback implicite et éthique des données.
*   **Besoin UX dédié :** **Parcours Voie B (Deep Dive).** Des analyses techniques complètes, des schémas de parcours utilisateur probabilistes et des détails sur la rigueur du design système.

---

## 3. Spécifications Fonctionnelles détaillées (Le Quoi)

### 3.1. Page d'Accueil — Hub Central

La homepage est le point d'entrée unique. Elle doit qualifier le visiteur et l'orienter en moins de 10 secondes.

#### 3.1.1. Hero Section
*   **Titre de posture :** Une accroche courte positionnant explicitement le rôle d'Orchestrateur de flux d'IA et de Design Systems d'agents (pas "Product Designer").
*   **Sous-titre manifesto :** Une phrase d'UVP citant la gestion de latence, friction et hallucinations comme contraintes de design — pas comme bugs à corriger.
*   **Accès immédiat au Playground :** Le composant interactif est visible above the fold, sans scroll. Il constitue la "preuve par l'usage" dès l'arrivée.

#### 3.1.2. Zone d'Aiguillage
Point de bifurcation explicite entre les deux parcours :
*   **Voie A — Scan Rapide (Sarah) :** Accès direct à une grille de fiches projets avec KPIs visibles, titre et miniature — lecture en 30 secondes.
*   **Voie B — Deep Dive (Thomas) :** Accès aux case studies complets avec schémas de flux, analyses techniques et blocs accordéons détaillés.

---

### 3.2. Playground IA — Démo Interactive Principale

Le Playground est le différenciateur central du portfolio. Il démontre la maîtrise des interfaces génératives en temps réel.

#### 3.2.1. Fonctionnement
*   Interface de type console permettant d'envoyer un prompt à Claude Sonnet 4.6 via `/api/playground`.
*   **Paramètre Température** exposé dans l'UI sous forme de curseur (0.0 → 1.0) — illustre visuellement comment la créativité du modèle influence la sortie.
*   **Streaming en temps réel** : les tokens s'affichent au fur et à mesure de la génération, avec états visuels distincts :
    *   `idle` — état par défaut, invitation à interagir
    *   `loading` — squelette d'interface progressif (skeleton)
    *   `streaming` — tokens apparaissant avec animation
    *   `error` — message d'erreur actionnable, non bloquant

#### 3.2.2. Contraintes Techniques & Sécurité
*   Appels Claude **exclusivement côté serveur** via Edge Runtime — clé API jamais exposée au client.
*   **Rate limiting :** 5 requêtes maximum par visiteur par heure, géré via Upstash Redis. Identifiant : IP anonymisée (hash SHA-256, sans stockage PII).
*   Réponse limitée à 800 tokens pour maîtriser les coûts et la lisibilité.

#### 3.2.3. CTA Contextuel Post-Interaction
*   À la suite de la première interaction réussie, afficher un CTA contextuel : *"Vous souhaitez concevoir une UI d'agent similaire ? Discutons-en."*
*   Ce CTA mène directement au formulaire de contact pré-rempli avec le contexte du Playground.

---

### 3.3. Case Studies — Gabarit Double Vitesse

Chaque case study est conçu pour deux profils de lecture simultanément.

#### 3.3.1. Niveau 1 — Lecture Rapide (Voie A)
*   Visuel d'impact fort (cover image)
*   Titre du projet + angle "Orchestration IA"
*   **Bloc KPIs** : 2 à 3 métriques d'impact avec valeurs chiffrées (ex : -40% temps de prompt, -62% abandons pendant chargement)
*   Schéma de flux d'agent simplifié (diagramme visuel, pas de code)

#### 3.3.2. Niveau 2 — Deep Dive (Voie B)
*   Blocs accordéons dépliables contenant :
    *   Analyse des données d'entraînement utilisées
    *   Gestion de la confiance utilisateur (explicabilité algorithmique)
    *   Arbres de décision de secours (fallback UX en cas d'erreur modèle)
    *   Parcours utilisateur probabilistes (pas déterministes)

#### 3.3.3. Module "Challenge IA vs Solution UX"
Standard visuel répété dans chaque case study :
*   **Colonne gauche :** La faille IA identifiée (ex : modèle lent, réponse incohérente, hallucination)
*   **Colonne droite :** L'écran conçu pour absorber cette faille (ex : skeleton progressif intelligent, message d'incertitude explicite)

#### 3.3.4. Filtres Dynamiques
Système de filtres pour affiner la navigation dans les projets :
*   `UX/UI Classique`
*   `Prompt UX`
*   `AI Agent Systems`
*   `Interaction Latency Design`

#### 3.3.5. Contenu (3 projets cibles)
| Slug | Sujet | KPI phare |
|---|---|---|
| `agent-latency-design` | Design de la latence LLM | -62% abandons pendant chargement |
| `llm-onboarding-ux` | Onboarding UX pour LLM | À définir |
| `prompt-ui-system` | Design system de prompts | À définir |

---

### 3.4. Agent Conversationnel — Chatbot RAG

Un assistant conversationnel embarqué qui agit comme co-pilote d'exploration du CV.

#### 3.4.1. Comportement
*   Répond à des questions libres sur les projets, compétences et philosophie de design.
*   Exemples de requêtes supportées : *"Donne-moi un projet où Julie a géré des problèmes de latence"* ou *"Quelle est son approche de l'éthique des données ?"*
*   Ton : direct, précis, première personne (parle au nom du portfolio).

#### 3.4.2. Base de Connaissances
*   Alimenté par `content/cv-knowledge-base.json` — fichier structuré couvrant expériences, projets, compétences, philosophie.
*   Pas de base vectorielle externe au lancement (coût et complexité maîtrisés).
*   Le fichier JSON est injecté dans le system prompt de Claude Sonnet 4.6 via `/api/chat`.

#### 3.4.3. Interface
*   Accessible via un bouton flottant ou une section dédiée sur la homepage.
*   États visuels identiques au Playground (idle / loading / streaming / error).

---

### 3.5. Interface Adaptative (Dynamic UI)

Le site lui-même démontre l'expertise en IA Design en s'adaptant comportementalement au visiteur — sans login, sans cookie, sans consentement explicite requis.

#### 3.5.1. Profils Détectés
| Profil | Déclencheur principal | Effet UI |
|---|---|---|
| `engineer` | Hover ≥ 3× sur blocs de code, ou scroll accordéon > 70% | Densité information accrue, sections techniques mis en avant |
| `recruiter` | Lecture bio complète avant toute action | Navigation simplifiée, KPIs en évidence |
| `creative` | Clic Playground avant lecture bio | Ton plus ludique, animations accentuées |
| `unknown` | État par défaut | Layout standard |

#### 3.5.2. Signaux Comportementaux Captés
*   `code-hover` : nombre de survols de blocs de code
*   `technical-dwell` : temps passé (secondes) sur sections techniques
*   `accordion-depth` : pourcentage de déploiement des accordéons deep-dive
*   `playground-first-click` : interaction Playground avant toute autre action

#### 3.5.3. Contraintes
*   Transitions visuelles fluides (Motion v12, durée 0.6s) — pas de saut brutal.
*   L'adaptation est progressive, jamais intrusive. Le visiteur ne doit pas percevoir un changement dérangeant.
*   Aucune donnée personnelle stockée — état géré exclusivement en mémoire via Zustand v5.

---

### 3.6. Pages Secondaires

#### 3.6.1. Page About
*   Manifesto court (5 à 8 lignes) sur le positionnement Orchestrateur.
*   Timeline de compétences évolutive (du Product Design classique vers l'IA Design).
*   Photo ou illustration de marque personnelle.

#### 3.6.2. Page Contact
*   Formulaire simple : Nom, Email, Message, Contexte de la prise de contact (Freelance / CDI / Conseil / Autre).
*   Envoi via **Resend** (3 000 emails/mois gratuits).
*   Message de confirmation immédiat côté UI (pas de rechargement).
*   CTA secondaire : liens vers LinkedIn et GitHub.

---

### 3.7. Internationalisation — Bilingue FR / EN

*   Routing natif `[locale]` via `next-intl` : `/fr/` et `/en/`.
*   Locale par défaut : **français**.
*   Détection automatique basée sur la langue du navigateur, avec switch manuel accessible dans la navigation.
*   Toutes les chaînes UI externalisées dans `messages/fr.json` et `messages/en.json`.
*   Les MDX des case studies existent en deux versions : `fr.mdx` et `en.mdx` par projet.

---

### 3.8. Analytics & Tracking des KPIs

| Métrique | Outil | Cible |
|---|---|---|
| Taux d'engagement Playground | Vercel Analytics (événement custom) | > 50% des visiteurs |
| Durée moyenne de session | Vercel Analytics | > 2m30s (profils qualifiés) |
| Taux de complétion formulaire de contact | Vercel Analytics (événement custom) | > 5% des visiteurs uniques |
| Score Lighthouse (performance) | Vercel Speed Insights | > 95 |
| Profil visiteur détecté | Zustand (mémoire locale uniquement) | — |

Aucune donnée personnelle n'est envoyée à un tiers. Vercel Analytics est cookieless et conforme RGPD.