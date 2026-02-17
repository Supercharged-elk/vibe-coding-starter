# Repository Logic: Vibe Coding Starter

> Complete architecture reference for this AI-driven UI generation starter kit. Maps every architectural decision, data flow, and abstraction layer so that any AI agent — or human — can understand the full mechanics at play.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Tech Stack & Runtime](#2-tech-stack--runtime)
3. [Project Structure](#3-project-structure)
4. [The 3 UI Generation Workflows](#4-the-3-ui-generation-workflows)
5. [AI Instruction Architecture](#5-ai-instruction-architecture)
6. [Design System: The Color Pipeline](#6-design-system-the-color-pipeline)
7. [Design System Injection](#7-design-system-injection)
8. [CSS Architecture](#8-css-architecture)
9. [Component Tier System](#9-component-tier-system)
10. [Application Routes & Pages](#10-application-routes--pages)
11. [Data & Configuration Layer](#11-data--configuration-layer)
12. [Build & Tooling Pipeline](#12-build--tooling-pipeline)
13. [Anatomy of a Generation](#13-anatomy-of-a-generation)
14. [Extension Points](#14-extension-points)

---

## 1. Executive Summary

This repository is a **vibe coding starter kit** — a Next.js application pre-configured so that AI coding assistants (Cursor, Claude Code) can generate production-quality UI from natural language prompts.

The kit supports **3 distinct workflows**:

```
INPUT                              WORKFLOW                         OUTPUT
─────────────                      ────────                         ──────
Screenshot of real website    -->  Path 1: Clone Mode           --> Faithful visual clone
UI code (any source)          -->  Path 2: Clone Mode           --> Faithful visual clone
Low-fi wireframe              -->  Path 3: Wireframe + DS       --> High-fidelity with DS styling
```

The real product is the **scaffolding itself**: the rule files (14 Cursor rules), component library (150+ components), design system injection pipeline, and hook infrastructure that constrain and guide AI output.

The architecture follows a three-layer model:

```
┌─────────────────────────────────────┐
│  AI Instruction Layer               │  14 .cursor/rules/*.mdc files
│  (.cursor/rules, .claude/*, CLAUDE.md) │  33 .claude/commands, hooks, settings
├─────────────────────────────────────┤
│  Design System Layer                │  colors.js → layout.tsx → CSS vars (runtime)
│  (colors, tokens, Tailwind config)  │  colors.js → tailwind.config.js → classes (build)
│                                     │  globals.css → --ds-* semantic tokens
├─────────────────────────────────────┤
│  Component Library Layer            │  Tier 1: Shadcn/UI primitives (51 files)
│  (landing, shared, ui, feature)     │  Tier 2: Landing components (86 files)
│                                     │  Tier 3: Feature components (per-route)
└─────────────────────────────────────┘
```

---

## 2. Tech Stack & Runtime

### Core Framework

| Dependency | Version | Purpose |
|---|---|---|
| Next.js | 15+ | App Router, RSC, SSR/SSG |
| React | 19+ | UI runtime |
| TypeScript | (via Next.js) | Type safety, `strict: false`, `strictNullChecks: true` |
| Node.js | >= 22.0.0 | Runtime requirement |

### Styling

| Dependency | Purpose |
|---|---|
| Tailwind CSS 3.4 | Utility-first CSS |
| tailwindcss-animate | Animation utilities |
| @tailwindcss/forms | Form element reset |
| @tailwindcss/typography | Prose styling for MDX |
| class-variance-authority (CVA) | Component variant definitions |
| clsx + tailwind-merge | Conditional class merging via `cn()` |

### UI Components

| Dependency | Purpose |
|---|---|
| Radix UI (@radix-ui/*) | Headless, accessible primitives |
| Lucide React | Icon library |
| Framer Motion | Animation library |
| next-themes | Dark mode toggling |

### Content & MDX

| Dependency | Purpose |
|---|---|
| @shipixen/pliny | MDX processing, TOC, newsletter forms |
| contentlayer2 | MDX/content source management |
| rehype-* / remark-* | Markdown processing pipeline |

### Build Tools

| Dependency | Purpose |
|---|---|
| @next/bundle-analyzer | Bundle size analysis |
| @svgr/webpack | SVG-as-component imports |
| prettier + eslint | Code formatting and linting |

---

## 3. Project Structure

```
vibe-coding-starter/
├── .cursor/
│   └── rules/                    # 14 AI instruction files (.mdc format)
│       ├── project-structure.mdc       # Directory organization rules
│       ├── tech-stack-dependencies.mdc # Dependency management
│       ├── typescript-style.mdc        # TypeScript conventions
│       ├── nextjs.mdc                  # Next.js patterns
│       ├── ui-components.mdc           # Shadcn UI usage
│       ├── tailwind-styling.mdc        # Tailwind conventions
│       ├── landing-components.mdc      # Landing page patterns
│       ├── self-improve.mdc            # AI self-improvement rules
│       ├── tools.mdc                   # Tool usage guidelines
│       ├── cursor-rules.mdc            # Rules for editing rules
│       ├── clone-implementation.mdc    # Path 1 & 2: Clone Mode
│       ├── wireframe-implementation.mdc # Path 3: Wireframe → HiFi
│       ├── design-system-migration.mdc # DS injection process
│       └── design-system-brand.mdc     # Active DS identity (generated)
│
├── .claude/
│   ├── setting.json              # Permissions, hooks, MCP servers
│   ├── settings.local.json       # Local permission overrides
│   ├── hooks/
│   │   ├── pre-tool-use.js       # Loads "Always Works" philosophy
│   │   └── play-sound.js         # Notification sounds
│   └── commands/                 # 33 slash command definitions
│       ├── aw.md                 # "Always Works" philosophy
│       ├── git-commit/           # Git operations
│       ├── validate/             # Validation commands
│       ├── debug/                # Debug commands
│       ├── refactor/             # Refactoring commands
│       ├── analyze/              # Analysis commands
│       ├── docs/                 # Documentation commands
│       └── ... (30+ more)
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, colors, providers)
│   ├── page.tsx                  # Landing page
│   ├── theme-providers.tsx       # next-themes wrapper
│   ├── dashboard/page.tsx        # Example dashboard (Mevolut fintech demo)
│   ├── pricing/page.tsx          # Pricing page
│   ├── features/page.tsx
│   ├── faq/page.tsx
│   ├── careers/page.tsx
│   ├── help/page.tsx
│   ├── press/page.tsx
│   ├── security/page.tsx
│   ├── status/page.tsx
│   ├── cookies/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── not-found.tsx
│   ├── seo.tsx, robots.ts, sitemap.ts
│   └── api/                      # API routes (newsletter, OG image)
│
├── components/
│   ├── landing/                  # 86 landing page components
│   │   ├── LandingHeader.tsx, LandingFaq.tsx, LandingBand.tsx, ...
│   │   ├── cta/                  # CTA section components
│   │   ├── feature/              # Feature section components
│   │   ├── pricing/              # Pricing components
│   │   ├── testimonial/          # Social proof
│   │   ├── footer/               # Footer components
│   │   ├── navigation/           # Navigation components
│   │   └── ... (24 subdirectories total)
│   │
│   ├── shared/                   # 15 shared utilities
│   │   ├── ThemeSwitch.tsx       # Dark mode toggle
│   │   ├── SearchProvider.tsx    # Search context
│   │   ├── Analytics.tsx         # Analytics wrapper
│   │   ├── Image.tsx             # Next Image wrapper
│   │   ├── Link.tsx              # Next Link wrapper
│   │   └── ui/                   # 51 Shadcn UI primitives
│   │       ├── button.tsx, dialog.tsx, input.tsx, accordion.tsx
│   │       └── ... (51 component files total)
│   │
│   ├── search/                   # Search components
│   ├── icons/                    # Icon components
│   └── MDXComponents.tsx         # MDX component mapping
│
├── css/
│   └── globals.css               # Global styles, CSS vars, DS tokens, utilities
│
├── data/
│   ├── config/
│   │   ├── colors.js             # Source of truth for color tokens
│   │   ├── site.settings.js      # Site metadata
│   │   ├── metadata.js           # Site title, description, domain
│   │   ├── headerNavLinks.ts     # Header navigation
│   │   ├── footerLinks.ts        # Footer navigation
│   │   ├── searchLinks.ts        # Search index links
│   │   ├── pricingData.tsx       # Pricing tier data
│   │   └── pricingDataInterface.ts
│   ├── app-info.ts               # Auto-generated from package.json
│   └── authors/                  # MDX author profiles
│
├── design-systems/               # DS config files for Path 3
│   ├── TEMPLATE.config.json      # Generic template for any DS
│   └── ibm-carbon/
│       └── design-system.config.json  # IBM Carbon example (complete)
│
├── demo/                         # Component demos (74 files)
│   ├── basic-examples/           # 36 basic component demos
│   └── form-examples/            # 38 form component demos
│
├── lib/
│   └── utils.ts                  # cn() and convertToRgba()
│
├── public/                       # Static assets
│   └── static/                   # Favicons, images, people
│
├── scripts/
│   └── generateAppInfo.mjs       # App info generation
│
│── CLAUDE.md                     # AI instructions entry point
│── README.md                     # Project overview
│── PROMPTS.md                    # Copy-paste prompts for all 3 workflows
│── WORKFLOWS_GUIDE.md            # Deep technical guide
│── REPOSITORY_LOGIC.md           # This file — complete architecture reference
│
├── tailwind.config.js            # Tailwind configuration
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.mjs             # ESLint configuration
├── postcss.config.js             # PostCSS configuration
└── package.json                  # Dependencies and scripts
```

---

## 4. The 3 UI Generation Workflows

The core innovation of this repo. Each workflow follows a **2-step prompt flow** documented in [PROMPTS.md](PROMPTS.md).

### The 2-Step Flow

Every workflow uses the same pattern:

1. **Step 1** (run in any LLM — Claude, GPT, etc.): Analyze the input → generates a JSONC design specification + markdown implementation brief
2. **Step 2** (run in the coding agent with the repo open): Implement the brief in the repo

### Path 1: Screenshot → Clone

**Input**: Screenshot of a real website
**Goal**: Faithful visual replication
**Config files**: MODIFIED to match the design
**Rule**: `clone-implementation.mdc`

The agent reads the brief and **overwrites** `colors.js`, `globals.css`, `tailwind.config.js`, and `layout.tsx` to match the source design. The input defines both structure AND style.

### Path 2: UI Code → Clone

**Input**: Code from any source (Figma export, Mobbin, Variant UI, Dribbble, CodePen, component libraries, etc.)
**Goal**: Faithful visual replication
**Config files**: MODIFIED to match the design
**Rule**: `clone-implementation.mdc`

Same as Path 1 but with code as input. The exported code provides structural precision (components, props, layout CSS) that complements the JSON brief. Step 2 includes the original code as an additional reference.

### Path 3: Wireframe → High Fidelity

**Input**: Low-fidelity wireframe image
**Goal**: Convert to polished UI using the repo's injected Design System
**Config files**: NOT MODIFIED
**Rule**: `wireframe-implementation.mdc`
**Prerequisite**: A DS must be injected first (see [Section 7](#7-design-system-injection))

The wireframe provides **structure** only. All visual tokens (colors, fonts, radius, shadows) come from the repo's existing DS. The agent translates wireframe tokens to DS equivalents:

| Wireframe says | Agent uses |
|----------------|-----------|
| "pill-shaped buttons (80px radius)" | DS border-radius (e.g., `rounded-none` for Carbon) |
| "primary action: black bg" | `bg-primary-500` (repo primary color) |
| "Helvetica Neue font" | `font-sans` (repo font via CSS variable) |
| "card radius: 20px" | DS largest radius token (e.g., `rounded-lg`) |

### Comparison

| Aspect | Path 1 (Image Clone) | Path 2 (Code Clone) | Path 3 (Wireframe + DS) |
|--------|:---:|:---:|:---:|
| **Input** | Screenshot | UI code (any source) | Low-fi wireframe |
| **Style source** | The input | The input | The injected DS |
| **Modifies config files** | Yes | Yes | No |
| **Requires DS injection** | No | No | Yes |
| **Agent rule** | `clone-implementation.mdc` | `clone-implementation.mdc` | `wireframe-implementation.mdc` |

---

## 5. AI Instruction Architecture

The repository uses a **dual-agent instruction system** targeting both Cursor and Claude Code. Instructions are layered with increasing specificity.

### 5.1 Entry Point: CLAUDE.md

`CLAUDE.md` serves as the top-level router for AI instructions. It:
- References `.cursor/rules/*.mdc` files using `@` cross-references for base rules
- Contains the **3-workflow decision diagram** with trigger conditions
- Defines the DS injection strategy (config-first + component overrides)
- Sets Claude Code-specific directives (auto-commit, Context7, Playwright, diagnostics)

### 5.2 Cursor Rules (.cursor/rules/*.mdc)

Each `.mdc` file uses frontmatter with three metadata fields:

```yaml
---
description: Short description
globs: optional/path/pattern/**/*
alwaysApply: false
---
```

**The 14 rule files and their roles:**

| File | alwaysApply | Purpose |
|---|---|---|
| `project-structure.mdc` | true | Directory organization constraints |
| `tech-stack-dependencies.mdc` | true | Available libraries and versions |
| `typescript-style.mdc` | true | Code style (single-object params, imports) |
| `nextjs.mdc` | true | Framework patterns (App Router, RSC) |
| `tailwind-styling.mdc` | true | Styling conventions (class ordering, mobile-first) |
| `self-improve.mdc` | true | Pattern recognition and rule proposals |
| `tools.mdc` | true | Tool usage guidelines |
| `ui-components.mdc` | false | Shadcn UI import and usage rules |
| `landing-components.mdc` | false | Landing page component patterns |
| `cursor-rules.mdc` | false | Rules for editing rules themselves |
| **`clone-implementation.mdc`** | false | **Path 1 & 2: Clone Mode behavior** |
| **`wireframe-implementation.mdc`** | false | **Path 3: Wireframe → HiFi with DS preservation** |
| **`design-system-migration.mdc`** | false | **DS injection process (8 phases)** |
| **`design-system-brand.mdc`** | false | **Active DS identity (generated during injection)** |

The last 4 rules are the **workflow-specific rules** that define the 3-path system.

### 5.3 Claude Code Configuration (.claude/)

#### setting.json

Defines three layers of configuration:

**1. Permission Whitelist:**
```
Bash: mkdir, find, mv, grep, npm, ls, cp, chmod, touch, git, pwd,
      which, echo, cat, prettier, eslint, tsc, vitest, sed, awk
MCP:  context7 (resolve-library-id, query-docs)
      playwright (all browser operations)
```

**2. Hook System:**

| Event | Hook | Purpose |
|---|---|---|
| `PreToolUse` | `pre-tool-use.js` | Loads "Always Works" philosophy before every tool call |
| `PostToolUse:Write` | `prettier` | Auto-formats written files |
| `PostToolUse:Edit` | `prettier` | Auto-formats edited files |
| `Notification` | `play-sound.js` | Plays notification sound |
| `Stop` | `play-sound.js done` | Plays completion sound |

**3. The "Always Works" Philosophy (aw.md):**

Loaded before every tool execution via `pre-tool-use.js`:

> *"Before calling a task done: Would you be embarrassed if this fails in front of the user? If yes, test it. Actually run it. Actually verify it."*

#### commands/ (33 Slash Commands)

| Category | Commands |
|---|---|
| **Git & Version Control** | `git-commit`, `git-create-pr`, `git-status`, `git-update-branch-name`, `gh-pull-request`, `gh-pr-review`, `gh-fix-issue`, `create-worktrees` |
| **Analysis** | `explore-directory`, `explore-architecture`, `explain`, `generate-code-variations` |
| **Code Quality** | `validate`, `debug`, `aw`, `refactor-code`, `modernize-deps`, `migration-guide` |
| **Documentation** | `document-api`, `document-architecture`, `update-docs`, `add-to-changelog` |
| **Workflow** | `todo`, `learn`, `clean-memory`, `context-prime`, `initref`, `release` |
| **Advanced** | `ultrathink`, `load-llms-txt`, `troubleshoot`, `all-tools` |

---

## 6. Design System: The Color Pipeline

The color system follows a **triple-layer architecture** from a single source of truth.

### 6.1 Source of Truth: `data/config/colors.js`

```javascript
const colors = {
  primary: {
    lighter: '#fde047',   // Default: Yellow-200
    light:   '#facc15',   // Default: Yellow-400
    main:    '#eab308',   // Default: Yellow-500
    dark:    '#ca8a04',   // Default: Yellow-600
    darker:  '#a16207',   // Default: Yellow-700
  },
  secondary: {
    lighter: '#6ee7b7',   // Default: Emerald-300
    light:   '#34d399',   // Default: Emerald-400
    main:    '#10b981',   // Default: Emerald-500
    dark:    '#059669',   // Default: Emerald-600
    darker:  '#047857',   // Default: Emerald-700
  },
};
```

Each color family has 5 semantic levels: `lighter`, `light`, `main`, `dark`, `darker`.

### 6.2 Layer A: CSS Custom Properties (Runtime)

**File:** `app/layout.tsx`

```typescript
const globalColors = colors;
const style: string[] = [];
Object.keys(globalColors).map((variant) => {
  return Object.keys(globalColors[variant]).map((color) => {
    style.push(`--${variant}-${color}: ${globalColors[variant][color]}`);
  });
});
```

Generates inline `<style>` in `<head>`:
```css
:root, :before, :after {
  --primary-lighter: #fde047;
  --primary-main: #eab308;
  --secondary-main: #10b981;
  /* ... all 10 variables */
}
```

**Consumed by:** `css/globals.css` utility classes like `.fancy-overlay`, `.fancy-link`, `::selection`.

### 6.3 Layer B: Tailwind Utility Classes (Build-time)

**File:** `tailwind.config.js`

```javascript
colors: {
  primary: {
    100: customColors.primary.lighter,  // 100 + 200 → lighter
    200: customColors.primary.lighter,
    300: customColors.primary.light,    // 300 + 400 → light
    400: customColors.primary.light,
    500: customColors.primary.main,     // 500 + 600 → main
    600: customColors.primary.main,
    700: customColors.primary.dark,     // 700 + 800 → dark
    800: customColors.primary.dark,
    900: customColors.primary.darker,   // 900 → darker
  },
  // secondary: same pattern
}
```

The 5 semantic levels are fanned out to the Tailwind 100-900 scale. Generates classes like `bg-primary-500`, `text-secondary-100`, `border-primary-700/20`.

### 6.4 Layer C: Shadcn Semantic Tokens

**File:** `css/globals.css`

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --muted: 240 4.8% 95.9%;
  --accent: 240 4.8% 95.9%;
  --destructive: 0 84.2% 60.2%;
  --border: 240 5.9% 90%;
  --ring: /* mapped to primary.dark in tailwind.config.js */;
}

.dark {
  --background: 20 14.3% 4.1%;
  --foreground: 0 0% 95%;
  /* ... dark overrides */
}
```

Consumed by Tailwind via `hsl(var(--background))` etc. Used by all Shadcn UI components.

### 6.5 Layer D: DS Semantic Tokens (after injection)

After a DS injection (see [Section 7](#7-design-system-injection)), a fourth layer is added to `globals.css`:

```css
:root {
  /* DS semantic colors */
  --ds-interactive: #0f62fe;
  --ds-danger: #da1e28;
  --ds-focus: #0f62fe;
  --ds-border-subtle: #e0e0e0;
  /* ... 25+ semantic tokens */

  /* DS neutrals */
  --ds-neutral-50: #f2f4f8;
  --ds-neutral-900: #21272a;
  /* ... 10-step gray scale */
}
```

Used as `bg-[--ds-interactive]`, `text-[--ds-danger]`, `outline-[--ds-focus]`, `bg-neutral-700` (Tailwind extended).

### 6.6 How Paths Interact with the Color System

- **Paths 1 & 2 (Clone)**: Overwrite `colors.js` and `globals.css` to match the brief. All layers update.
- **Path 3 (Wireframe + DS)**: Read-only. All layers are preserved as-is from the DS injection.
- **DS Injection**: Rewrites all layers to match the DS config JSON.

---

## 7. Design System Injection

The DS injection pipeline transforms the entire repo's visual identity to match a Design System defined in a JSON config file. This is the **prerequisite for Path 3**.

### 7.1 Config Schema

DS configs live at `./design-systems/[name]/design-system.config.json`:

```
design-system.config.json
├── name, version, source, description
├── colors                    → Primary/secondary palette (5 shades each)
├── neutrals                  → Gray scale 50-900
├── cssVariables.light/dark   → Shadcn semantic vars (HSL format)
├── semanticColors            → 25+ functional tokens (interactive, danger, focus, etc.)
├── semanticColorsDark        → Dark mode versions of semantic colors
├── typography                → Font families, weights, 13 named sizes
├── borderRadius              → Scale none → full
├── shadows                   → Scale sm → xl
├── spacing                   → Base unit, scale, component spacing
├── focus                     → Focus ring spec + Tailwind pattern
├── transitions               → Duration fast/moderate/slow, easing curves
├── componentOverrides        → Per-component class overrides (CVA + classReplacements)
└── notes                     → DS philosophy (radius, color, typography)
```

### 7.2 Available Design Systems

| Name | Config Path | Description |
|------|------------|-------------|
| IBM Carbon | `design-systems/ibm-carbon/design-system.config.json` | Complete example with 25+ semantic tokens, 15 component overrides |
| Template | `design-systems/TEMPLATE.config.json` | Empty template to create your own DS |

### 7.3 Injection Process (8 Phases)

Defined in `design-system-migration.mdc`:

| Phase | What happens | Impact |
|-------|-------------|--------|
| 0 | Git branch `ds/[name]-injection` | Version control |
| 1 | Read config JSON | Parse all tokens |
| 2 | Update 4 config files: `colors.js`, `globals.css`, `tailwind.config.js`, `layout.tsx` | ~80% visual identity |
| 3 | Apply `componentOverrides` to Shadcn components | ~20% remaining fidelity |
| 4 | Landing components sweep (hardcoded colors → semantic tokens) | Consistent palette |
| 5 | Visual audit (`npm run dev`, both modes) | Quality check |
| 6 | Generate `.cursor/rules/design-system-brand.mdc` | Agent identity |
| 7 | Verify (`npx tsc --noEmit`, visual check) | Final validation |

### 7.4 Creating a New DS

Three options documented in [PROMPTS.md](PROMPTS.md#creating-a-design-system-config):

| Option | Method |
|--------|--------|
| **A: LLM extraction** | Paste brand guide + full JSON schema prompt → LLM generates config |
| **B: Manual template** | Copy `TEMPLATE.config.json`, fill in tokens directly |
| **C: Live website** | Screenshot existing implementation → LLM extracts tokens |

---

## 8. CSS Architecture

### 8.1 Layer Structure

```css
@tailwind base;       /* Reset + CSS vars */
@tailwind components; /* Component classes */
@tailwind utilities;  /* Utility classes */
```

### 8.2 Custom Properties (globals.css)

**Layer: `@layer base`**

| Category | Properties |
|---|---|
| Shadows | `--hard-shadow`, `--hard-shadow-left` |
| Shadcn semantics | `--background`, `--foreground`, `--card`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--radius` |
| DS tokens (after injection) | `--ds-interactive`, `--ds-danger`, `--ds-focus`, `--ds-neutral-*`, etc. |
| Animation | `--fancy-x`, `--fancy-y` (CSS Houdini @property) |

**Layer: `@layer utilities`**

| Utility Class | Effect |
|---|---|
| `.perspective-left/right/bottom` | 3D card tilt effects with shadow |
| `.perspective-paper/paper-left` | Paper fold effects |
| `.fancy-heading` | Gradient text (light/dark aware) |
| `.fancy-link` | Gradient underline with hover fill |
| `.fancy-text-*` | Color gradient text variants |
| `.fancy-overlay` / `.fancy-overlay--muted` | Animated gradient overlays |
| `.fancy-glass` / `.fancy-glass-contrast` | Glassmorphism effects |
| `.nav-link` / `.nav-link-active` | Navigation link states |
| `.container-narrow/wide/ultrawide/gigawide` | Width container variants |

### 8.3 Dark Mode Strategy

Dark mode uses `next-themes` with `attribute="class"` strategy:

```typescript
// app/theme-providers.tsx
<ThemeProvider attribute="class" defaultTheme={siteConfig.theme} enableSystem>
```

This adds/removes the `dark` class on `<html>`. Tailwind's `darkMode: ['class']` config enables `dark:` variants. All Shadcn semantic vars also have `.dark` overrides in `globals.css`.

### 8.4 Typography

**Default fonts in `app/layout.tsx`:**

```typescript
const displayFont = Nunito_Sans({ variable: '--font-space-display' });
const baseFont = Nunito_Sans({ variable: '--font-space-default' });
```

**Tailwind mapping:**

```javascript
fontFamily: {
  sans: ['var(--font-space-default)', ...fontFamily.sans],
  display: ['var(--font-space-display)', ...fontFamily.sans],
  cursive: ['cursive'],
}
```

After DS injection, fonts change to the DS's family (e.g., IBM Plex Sans for Carbon) and a `text-ds-*` typography scale is added to Tailwind.

---

## 9. Component Tier System

### Tier 1: Shadcn UI Primitives (`components/shared/ui/`)

51 Radix UI headless components styled with Tailwind + CVA. Pattern:

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('inline-flex items-center ...', {
  variants: {
    variant: { default: '...', destructive: '...', outline: '...' },
    size: { default: '...', sm: '...', lg: '...' },
  },
});

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
```

**Import pattern:** `import { Button } from '@/components/shared/ui/button';`

Key primitives: Button, Input, Dialog, Accordion, Select, Checkbox, Badge, Tabs, Separator, Slider, Textarea, Tooltip, Sheet, Drawer, AlertDialog, Toast, Progress, Switch, and more.

### Tier 2: Landing Components (`components/landing/`)

86 pre-built, composable landing page sections organized in 24 subdirectories:

| Family | Components |
|---|---|
| **Header/Footer** | `LandingHeader`, `LandingFooter`, footer columns and links |
| **CTA Sections** | `LandingPrimaryImageCtaSection`, `LandingPrimaryTextCtaSection`, `LandingSaleCtaSection` |
| **Features** | `LandingProductFeaturesGrid`, `LandingProductFeature`, `LandingFeatureKeyPoints` |
| **Product Tour** | `LandingProductTourSection`, triggers, content |
| **Social Proof** | `LandingTestimonialGrid`, `LandingSocialProof`, `LandingRating` |
| **Pricing** | `LandingPricingSection`, `LandingPricingPlan`, comparison |
| **FAQ** | `LandingFaqCollapsibleSection`, `LandingFaqSection` |
| **Visual** | `LandingBand`, `LandingMarquee`, `LandingProductVideoFeature` |
| **Stats, Team, About, Blog, Newsletter, Showcase, Discount** | Various components |

### Tier 3: Feature Components (per-route)

Route-specific components built by composing Tier 1 and Tier 2. The current demo ships with a Mevolut fintech dashboard at `/dashboard` (719 lines) as a working example.

When using Path 3, feature components go in `components/{feature}/` with data in `data/{feature}/`.

### Shared Utilities (`components/shared/`)

| Component | Purpose |
|---|---|
| `ThemeSwitch.tsx` | Dark mode toggle button (used in all workflows) |
| `SearchProvider.tsx` | Search context provider |
| `Analytics.tsx` | Analytics wrapper |
| `Image.tsx` | Next Image wrapper |
| `Link.tsx` | Next Link wrapper with external link detection |
| `MDXComponents.tsx` | MDX component mapping |

### The `cn()` Utility

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Used everywhere to merge conditional Tailwind classes with proper specificity resolution.

---

## 10. Application Routes & Pages

### Route Map

| Route | Type | Description |
|---|---|---|
| `/` | Landing | Full marketing page with hero, features, testimonials, pricing CTA, FAQ |
| `/dashboard` | Feature | Example dashboard (Mevolut fintech demo — replaced during workflows) |
| `/pricing` | Marketing | Pricing plans page |
| `/features` | Marketing | Product features |
| `/faq` | Marketing | FAQ page |
| `/careers` | Marketing | Careers page |
| `/help` | Marketing | Help center |
| `/press` | Marketing | Press page |
| `/security` | Marketing | Security information |
| `/status` | Marketing | System status |
| `/cookies` | Legal | Cookie policy |
| `/privacy` | Legal | Privacy policy |
| `/terms` | Legal | Terms of service |
| `/api/newsletter` | API | Newsletter subscription endpoint |
| `/api/og` | API | Open Graph image generation |

**Note:** The `/dashboard` route is the **primary target for workflow demos**. When testing Path 1, 2, or 3, users typically implement on `/dashboard` (or any custom route).

### Root Layout (`app/layout.tsx`)

Responsibilities:
1. Loads fonts (default: Nunito Sans for display + base)
2. Generates CSS variables from `colors.js`
3. Sets `<html>` attributes (`lang`, font CSS variables, `scroll-smooth`)
4. Injects color CSS variables via inline `<style>`
5. Sets up favicon and meta tags
6. Wraps app in: `ThemeProviders` → `AnalyticsWrapper` → `SearchProvider`
7. Applies base body styles: `bg-white dark:bg-gray-950 text-black dark:text-white`

---

## 11. Data & Configuration Layer

### Site Configuration

| File | Purpose |
|---|---|
| `data/config/metadata.js` | Site title, description, domain, social links |
| `data/config/site.settings.js` | Analytics, newsletter, search, theme preference |
| `data/config/colors.js` | Color token source of truth |
| `data/config/headerNavLinks.ts` | Header navigation items |
| `data/config/footerLinks.ts` | Footer link columns |
| `data/config/searchLinks.ts` | Search index pages |
| `data/config/pricingData.tsx` | Pricing tier definitions |
| `data/config/pricingDataInterface.ts` | TypeScript interfaces for pricing |
| `data/app-info.ts` | Auto-generated name and version from `package.json` |

### The 4 Config Files (DS Layer)

These 4 files control ~80% of the visual identity. Paths 1 & 2 overwrite them. Path 3 preserves them.

| File | Controls | Modified by |
|------|----------|-------------|
| `data/config/colors.js` | Primary/secondary palette (`bg-primary-500`, etc.) | Paths 1, 2, DS Injection |
| `css/globals.css` | Shadcn semantic vars + DS tokens | Paths 1, 2, DS Injection |
| `tailwind.config.js` | Border radius, shadows, fonts, typography scale | Paths 1, 2, DS Injection |
| `app/layout.tsx` | Font imports (Google Fonts) | Paths 1, 2, DS Injection |

### TypeScript Path Aliases (`tsconfig.json`)

```json
{
  "@/components/*": ["components/*"],
  "@/data/*":       ["data/*"],
  "@/layouts/*":    ["layouts/*"],
  "@/css/*":        ["css/*"],
  "@/lib/*":        ["lib/*"],
  "@/app/*":        ["app/*"]
}
```

---

## 12. Build & Tooling Pipeline

### Next.js Configuration (`next.config.js`)

| Feature | Configuration |
|---|---|
| **Bundle Analysis** | `@next/bundle-analyzer` enabled via `ANALYZE=true` env |
| **Page Extensions** | `ts, tsx, js, jsx, md, mdx` |
| **ESLint Dirs** | `app, components, layouts, scripts` |
| **Image Domains** | `picsum.photos`, `images.unsplash.com`, `shipixen.com` |
| **SVG Handling** | `@svgr/webpack` for component imports |
| **React Strict Mode** | Enabled |

### Security Headers

All routes receive: Content-Security-Policy, Referrer-Policy (`strict-origin-when-cross-origin`), X-Frame-Options (`DENY`), X-Content-Type-Options (`nosniff`), HSTS (1 year), Permissions-Policy (camera/mic/geo disabled).

### Tailwind Configuration (`tailwind.config.js`)

Beyond colors and fonts:

**Custom animations:** `tilt`, `accordion-down/up`, `wiggle`, `fade-in-down-*` (6 speed variants), `rotate-left-to-right`, `marquee`

**Custom screens:** `2xl` (1400px), `tall-sm` through `tall-2xl` (height-based breakpoints)

**Extended z-index scale:** 60, 70, 80, 90, 100, 110

### Package Scripts

```json
{
  "dev": "next dev -p 6006",
  "build": "next build",
  "serve": "next start",
  "analyze": "cross-env ANALYZE=true next build",
  "lint": "next lint --fix --dir pages --dir app --dir components --dir lib --dir layouts",
  "pretty": "prettier --write .",
  "appinfo": "node scripts/generateAppInfo.mjs"
}
```

---

## 13. Anatomy of a Generation

When a user follows one of the 3 workflows, this is what happens end to end.

### Step 1: Brief Generation (any LLM)

The user takes their input (screenshot, UI code, or wireframe) and sends it to an LLM with the Step 1 prompt from [PROMPTS.md](PROMPTS.md). The LLM produces:

1. A **JSONC design specification** (tokens, layout, components, responsive rules, dark mode)
2. A **markdown implementation brief** (human-readable description of what to build)

### Step 2: Implementation (coding agent)

The user pastes both outputs into the Step 2 prompt and sends it to the coding agent.

#### Context Loading

```
CLAUDE.md (entry point)
  ├── @project-structure.mdc     → File organization constraints
  ├── @tech-stack-dependencies   → Available libraries
  ├── @typescript-style.mdc      → Code style rules
  ├── @nextjs.mdc                → Framework patterns
  ├── @tailwind-styling.mdc      → Styling conventions
  ├── @ui-components.mdc         → Component import rules
  ├── @landing-components.mdc    → Landing page patterns
  └── Workflow decision diagram  → Selects Path 1, 2, or 3
```

Plus `pre-tool-use.js` injects the "Always Works" philosophy before each tool execution.

#### Path-Specific Behavior

**Paths 1 & 2 (Clone):**
1. Read the JSON brief → extract design tokens
2. **Update** `colors.js` with the brief's palette
3. **Update** `globals.css` with the brief's CSS variables
4. **Update** `tailwind.config.js` with borderRadius/shadows
5. **Update** `layout.tsx` with the brief's font
6. Implement all components and structure
7. Result: a **visual clone** of the input

**Path 3 (Wireframe + DS):**
1. Read the existing config files → learn the DS tokens
2. Read the JSON brief → understand the wireframe structure
3. **DO NOT modify** any config file
4. Translate wireframe tokens to DS equivalents
5. Implement structure from wireframe + style from DS
6. Result: a **high-fidelity** UI matching the DS

#### Component Selection

| Request Type | Component Source |
|---|---|
| Public marketing page | Tier 2: `components/landing/*` |
| Dashboard/app feature | Tier 1: `components/shared/ui/*` + custom |
| Dialog/form/menu | Tier 1: Shadcn primitives |
| Icons | `lucide-react` |

#### File Creation Pattern

- New route → `app/{route}/page.tsx`
- New components → `components/{feature}/*.tsx`
- New data → `data/{feature}/*.ts`
- All imports use `@/` path aliases

#### Verification

1. Run `npx tsc --noEmit` (type checking)
2. Use Playwright MCP to verify in browser
3. Check console for errors
4. For Path 3: verify `git diff` shows no config file changes
5. Apply the "Always Works" embarrassment test

---

## 14. Extension Points

### Adding a New Route

1. Create `app/{route}/page.tsx`
2. Import components from appropriate tier
3. Add to `data/config/searchLinks.ts` for search indexing

### Running a Workflow

1. Choose your path based on input type (see [Section 4](#4-the-3-ui-generation-workflows))
2. Copy the prompts from [PROMPTS.md](PROMPTS.md)
3. Run Step 1 → Step 2 → Verify

### Creating a New Design System

1. Follow one of the 3 options in [PROMPTS.md](PROMPTS.md#creating-a-design-system-config)
2. Save the config to `design-systems/{name}/design-system.config.json`
3. Inject it with the DS Injection prompt

### Adding a New Shadcn Component

1. Add to `components/shared/ui/{component}.tsx`
2. Follow the Radix + CVA + `cn()` pattern
3. Export from the file

### Adding a New Color Theme (without DS injection)

1. Edit `data/config/colors.js` with new hex values
2. Both CSS variables and Tailwind classes update automatically
3. Review `css/globals.css` dark mode overrides if needed

### Adding a New AI Rule

1. Create `.cursor/rules/{name}.mdc` with proper frontmatter
2. Set `alwaysApply` based on scope
3. Cross-reference from `CLAUDE.md` if needed

### Adding a New Claude Command

1. Create `.claude/commands/{name}.md` (or `{category}/{name}.md`)
2. Use `$ARGUMENTS` placeholder for user input
3. Available as `/project:{name}` slash command

---

## Documentation Map

| Document | Purpose | Audience |
|----------|---------|----------|
| [README.md](README.md) | Project overview, quick start, workflow summary | New users |
| [PROMPTS.md](PROMPTS.md) | Copy-paste prompts for all 3 workflows + DS creation | Users running workflows |
| [WORKFLOWS_GUIDE.md](WORKFLOWS_GUIDE.md) | Deep technical guide with step-by-step, architecture, examples | Users wanting to understand how it works |
| [REPOSITORY_LOGIC.md](REPOSITORY_LOGIC.md) | Complete architecture reference (this file) | Developers and AI agents |
| [CLAUDE.md](CLAUDE.md) | AI agent instructions entry point | AI agents (auto-loaded) |

---

*Generated from repository analysis on 2026-02-18. Reflects the current state of the `main` branch.*
