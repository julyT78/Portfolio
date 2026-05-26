# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio design project for an **AI Orchestrator & UX Designer** — someone who designs systems and interfaces for AI agents rather than static pages. The project is currently in the planning/specification phase. The main deliverable will be an interactive portfolio website showcasing AI-native UX work, including a live "Playground" component on the homepage.

The project plan lives in `plan.md` and is structured in 5 phases (Strategy → Architecture → Playground → Dogfooding → Launch).

## Installed Skills

Two skills are available via `skills-lock.json`:

### `/brainstorming`
**Always invoke before any implementation.** This skill drives a structured design-before-code workflow:
1. Explores project context and clarifying questions (one at a time)
2. Proposes 2–3 approaches with trade-offs
3. Presents design sections for approval
4. Writes spec to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`
5. Hands off to a `writing-plans` skill for implementation planning

It supports a **Visual Companion** — a browser-based mockup/diagram viewer for visual design questions. It will offer to activate it when relevant.

### `/impeccable`
Frontend design skill for building and iterating production-grade UI. Load it for any interface work. Sub-commands:

| Category | Commands |
|---|---|
| Build | `craft`, `shape`, `teach`, `document`, `extract` |
| Evaluate | `critique`, `audit` |
| Refine | `polish`, `bolder`, `quieter`, `distill`, `harden` |
| Enhance | `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive` |
| Fix | `clarify`, `adapt`, `optimize` |
| Iterate | `live` (visual in-browser iteration) |

**Setup required before any design work:** `impeccable` looks for `PRODUCT.md` (required) and `DESIGN.md` (recommended) in the project root or `.agents/context/`. If `PRODUCT.md` is missing, run `/impeccable teach` first. These files define the brand register, users, tone, colors, and typography.

**Register:** This portfolio is **brand** register (design IS the product — marketing/portfolio surface, not a product tool).

## Workflow

The intended flow for each new feature or section is:
1. `/brainstorming` → spec document
2. `writing-plans` (invoked by brainstorming) → implementation plan
3. `/impeccable craft` or `/impeccable shape` → build the UI

Do not skip to implementation before a spec exists.

## Key Design Constraints (from `impeccable`)

- Use OKLCH for all colors; never `#000`/`#fff`
- No gradient text, no side-stripe borders, no glassmorphism as default, no identical card grids
- Dark vs. light theme must be justified by a physical usage scene sentence
- Body line length capped at 65–75ch
- No em dashes in copy

## Key Files

| File | Purpose |
|---|---|
| `plan.md` | 5-phase project roadmap (French) |
| `settings.local.json` | Claude Code permissions (git, bash, web fetch) |
| `skills-lock.json` | Installed skill versions |
| `PRODUCT.md` *(to create)* | Brand context required by `impeccable` |
| `DESIGN.md` *(to create)* | Design tokens/system for `impeccable` |
| `docs/superpowers/specs/` *(to create)* | Spec documents output by `brainstorming` |
