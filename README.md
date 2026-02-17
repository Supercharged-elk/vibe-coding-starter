# Vibe Coding Starter

A Next.js starter kit with **3 AI-powered workflows** for generating production-ready UI from different inputs: screenshots, Figma exports, or wireframes. Each workflow uses a different agent strategy to produce high-fidelity, themed, responsive interfaces.

## Table of Contents

- [Quick Start](#quick-start)
- [The 3 Workflows](#the-3-workflows)
- [Project Structure](#project-structure)
- [Design System Injection](#design-system-injection)
- [Available Prompts](#available-prompts)
- [Detailed Documentation](#detailed-documentation)

---

## Quick Start

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
# App runs at http://localhost:6006
```

---

## The 3 Workflows

This repo supports 3 distinct paths for generating UI. Each has its own agent rules, prompts, and behavior regarding the Design System config files.

```
INPUT                          WORKFLOW                        OUTPUT
-----------                    --------                        ------
Screenshot of real website --> Path 1: Clone Mode           --> Faithful visual clone
Exported Figma code        --> Path 2: Clone Mode           --> Faithful visual clone
Low-fi wireframe           --> Path 3: Wireframe + DS       --> High-fidelity with DS styling
```

### Path 1 & 2 — Clone Mode (Image or Figma Code)

**Goal**: Replicate a real website or Figma design as faithfully as possible.

**How it works**: The agent reads the design brief and **overwrites** the repo's color palette, CSS variables, fonts, and component styles to match the source design. The input defines both structure AND style.

**Config files modified**: `colors.js`, `globals.css`, `tailwind.config.js`, `layout.tsx`

**When to use**: You have a screenshot of a real website or exported Figma code and want to clone its look exactly.

### Path 3 — Wireframe to High Fidelity

**Goal**: Convert a low-fidelity wireframe into a polished UI using a pre-injected Design System.

**How it works**: The agent takes the wireframe's **structure** (sections, grids, content) and applies the repo's existing DS **style** (colors, fonts, radius, shadows). Wireframe tokens like "black button" or "pill shape" get translated to DS equivalents (e.g., `bg-primary-500`, `rounded-none`).

**Config files modified**: NONE. The DS must be injected beforehand.

**When to use**: You have a wireframe sketch and want it styled with a specific brand (IBM Carbon, Material, your own DS).

### Comparison

| | Path 1 (Image Clone) | Path 2 (Figma Clone) | Path 3 (Wireframe + DS) |
|---|:---:|:---:|:---:|
| **Input** | Screenshot | Figma code | Low-fi wireframe |
| **Style source** | The input | The input | The injected DS |
| **Modifies config files** | Yes | Yes | No |
| **Requires DS injection** | No | No | Yes |
| **Agent rule** | `clone-implementation.mdc` | `clone-implementation.mdc` | `wireframe-implementation.mdc` |

---

## Project Structure

```
vibe-coding-starter/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, theme, colors)
│   ├── page.tsx                  # Landing page
│   └── dashboard/page.tsx        # Example dashboard page
├── components/
│   ├── shared/ui/                # Shadcn UI components (50+)
│   ├── shared/                   # Header, Footer, ThemeSwitch
│   └── landing/                  # Landing page components (100+)
├── css/globals.css               # CSS variables (Shadcn + DS semantic tokens)
├── data/
│   └── config/
│       ├── colors.js             # Primary/secondary color palette
│       ├── site.settings.js      # Site metadata
│       └── headerNavLinks.ts     # Navigation links
├── design-systems/
│   ├── TEMPLATE.config.json      # Generic template for any DS
│   └── ibm-carbon/
│       └── design-system.config.json  # IBM Carbon example (complete)
├── tailwind.config.js            # Tailwind config (radius, shadows, fonts)
├── PROMPTS.md                    # Copy-paste prompts for all 3 workflows
├── WORKFLOWS_GUIDE.md            # Deep technical guide
└── .cursor/rules/                # Agent rules
    ├── clone-implementation.mdc
    ├── wireframe-implementation.mdc
    ├── design-system-migration.mdc
    └── design-system-brand.mdc
```

### Key Config Files (the "DS layer")

These 4 files control ~80% of the visual identity. Paths 1 & 2 overwrite them. Path 3 preserves them.

| File | Controls |
|------|----------|
| `data/config/colors.js` | Primary/secondary palette (`bg-primary-500`, etc.) |
| `css/globals.css` | Shadcn semantic vars + DS tokens (`--ds-interactive`, `--ds-focus`, etc.) |
| `tailwind.config.js` | Border radius, shadows, font families, typography scale |
| `app/layout.tsx` | Font imports (Google Fonts) |

---

## Design System Injection

Path 3 requires a Design System to be injected first. The injection process applies a complete DS config (colors, typography, semantic tokens, component overrides) across the entire repo.

### Available Design Systems

| Name | Config Path | Description |
|------|------------|-------------|
| IBM Carbon | `design-systems/ibm-carbon/design-system.config.json` | Complete example with 25+ semantic tokens, 15 component overrides |
| Template | `design-systems/TEMPLATE.config.json` | Empty template to create your own DS |

### How to Inject a DS

Give the agent this prompt (see [PROMPTS.md](PROMPTS.md) for the full version):

```
Inject the IBM Carbon Design System into this repository.
Use ./design-systems/ibm-carbon/design-system.config.json
Follow @.cursor/rules/design-system-migration.mdc
```

### How to Create a New DS

You have 3 options (see [PROMPTS.md](PROMPTS.md) for full details):

| Option | Best for |
|--------|----------|
| **A: LLM extraction** | You have a brand guide (PDF, Figma, or URL) — paste it into an LLM with the extraction prompt |
| **B: Manual template** | You know your tokens and want to fill them in directly |
| **C: Live website** | The DS is already implemented on a website — screenshot it and extract tokens |

Quick start with Option B:
```bash
mkdir -p design-systems/my-brand
cp design-systems/TEMPLATE.config.json design-systems/my-brand/design-system.config.json
# Edit the file, then inject it
```

---

## Available Prompts

All prompts are in **[PROMPTS.md](PROMPTS.md)** — ready to copy and paste.

Every workflow follows a **2-step flow**:
1. **Step 1** (any LLM): Analyze the input → generates a JSONC brief + implementation prompt
2. **Step 2** (coding agent): Implement the brief in the repo

| Workflow | Step 1 input | Step 2 behavior |
|----------|-------------|-----------------|
| **Path 1: Image Clone** | Screenshot of real website | Overwrites DS config to match the design |
| **Path 2: Figma Clone** | Exported Figma code | Overwrites DS config to match the design |
| **Path 3: Wireframe + DS** | Low-fi wireframe image | Preserves injected DS, translates wireframe tokens |
| **DS Injection** | _(no Step 1)_ | Applies DS config JSON to the repo |
| **DS Creation** | Brand guide / website | Generates the DS config JSON |

---

## Detailed Documentation

| Document | Content |
|----------|---------|
| [PROMPTS.md](PROMPTS.md) | All copy-paste prompts for the 3 workflows |
| [WORKFLOWS_GUIDE.md](WORKFLOWS_GUIDE.md) | Deep technical guide: step-by-step for each path, architecture, DS schema, examples |
| [CLAUDE.md](CLAUDE.md) | Agent instructions (read by AI tools automatically) |

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **Components**: 50+ Shadcn UI + 100+ Landing components
- **Icons**: Lucide React
- **Theme**: Light/dark mode with `next-themes`
- **Fonts**: Configurable via `app/layout.tsx` (default: Nunito Sans)
