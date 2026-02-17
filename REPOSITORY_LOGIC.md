# Repository Logic: Vibe Coding Starter

> Comprehensive reverse-engineering of how this repository enables AI-driven code generation from natural language prompts. This document maps every architectural decision, data flow, and abstraction layer so that any AI agent — or human — can understand the full mechanics at play.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Tech Stack & Runtime](#2-tech-stack--runtime)
3. [Project Structure](#3-project-structure)
4. [AI Instruction Architecture](#4-ai-instruction-architecture)
5. [Design System: The Color Pipeline](#5-design-system-the-color-pipeline)
6. [CSS Architecture](#6-css-architecture)
7. [Component Tier System](#7-component-tier-system)
8. [Application Routes & Pages](#8-application-routes--pages)
9. [Data & Configuration Layer](#9-data--configuration-layer)
10. [Build & Tooling Pipeline](#10-build--tooling-pipeline)
11. [Anatomy of a Generation](#11-anatomy-of-a-generation)
12. [Extension Points](#12-extension-points)

---

## 1. Executive Summary

This repository is a **vibe coding starter kit** — a Next.js application pre-configured so that AI coding assistants (Cursor, Claude Code) can generate production-quality features from natural language prompts. The project ships as "Mevolut", a fintech dashboard demo, but the real product is the **scaffolding itself**: the rule files, component library, design system, and hook infrastructure that constrain and guide AI output.

The architecture follows a three-layer model:

```
┌─────────────────────────────────────┐
│  AI Instruction Layer               │  .cursor/rules/*.mdc
│  (.cursor/rules, .claude/*, CLAUDE.md) │  .claude/commands, hooks, settings
├─────────────────────────────────────┤
│  Design System Layer                │  colors.js → layout.tsx → CSS vars
│  (colors, tokens, Tailwind config)  │  colors.js → tailwind.config.js → classes
├─────────────────────────────────────┤
│  Component Library Layer            │  Tier 1: Shadcn/UI primitives
│  (landing, shared, ui, feature)     │  Tier 2: Landing components (89+ exports)
│                                     │  Tier 3: Feature components (per-route)
└─────────────────────────────────────┘
```

---

## 2. Tech Stack & Runtime

### Core Framework

| Dependency | Version | Purpose |
|---|---|---|
| Next.js | 15.5.9 | App Router, RSC, SSR/SSG |
| React | 19.2.1 | UI runtime |
| TypeScript | (via Next.js) | Type safety, `strict: false`, `strictNullChecks: true` |
| Node.js | >= 22.0.0 | Runtime requirement |

### Styling

| Dependency | Version | Purpose |
|---|---|---|
| Tailwind CSS | 3.4.16 | Utility-first CSS |
| tailwindcss-animate | * | Animation utilities |
| @tailwindcss/forms | * | Form element reset |
| @tailwindcss/typography | * | Prose styling for MDX |
| class-variance-authority (CVA) | * | Component variant definitions |
| clsx + tailwind-merge | * | Conditional class merging via `cn()` |

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
│   └── rules/                    # 10 AI instruction files (.mdc format)
│       ├── project-structure.mdc
│       ├── tech-stack-dependencies.mdc
│       ├── typescript-style.mdc
│       ├── nextjs.mdc
│       ├── ui-components.mdc
│       ├── tailwind-styling.mdc
│       ├── landing-components.mdc
│       ├── self-improve.mdc
│       ├── tools.mdc
│       └── cursor-rules.mdc
│
├── .claude/
│   ├── setting.json              # Permissions, hooks, MCP servers
│   ├── settings.local.json       # Local permission overrides
│   ├── hooks/
│   │   ├── pre-tool-use.js       # Loads aw.md before tool execution
│   │   └── play-sound.js         # Cross-platform sound notifications
│   └── commands/                 # 33 slash command definitions
│       ├── aw.md                 # "Always Works" philosophy
│       ├── git-commit.md
│       ├── validate/validate.md
│       ├── debug/debug.md
│       ├── refactor/*.md
│       ├── analyze/*.md
│       ├── docs/*.md
│       └── ... (30+ more)
│
├── CLAUDE.md                     # Top-level AI instructions entry point
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, colors, providers)
│   ├── page.tsx                  # Landing page
│   ├── theme-providers.tsx       # next-themes wrapper
│   ├── dashboard/page.tsx        # Mevolut finance dashboard
│   ├── pricing/page.tsx          # Pricing page
│   ├── features/page.tsx
│   ├── careers/page.tsx
│   ├── faq/page.tsx
│   ├── help/page.tsx
│   ├── press/page.tsx
│   ├── security/page.tsx
│   ├── status/page.tsx
│   ├── cookies/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── not-found.tsx
│   ├── seo.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── api/                      # API routes
│
├── components/
│   ├── landing/                  # 89+ landing page components
│   │   ├── LandingHeader.tsx
│   │   ├── LandingPrimaryImageCtaSection.tsx
│   │   ├── LandingTestimonialGrid.tsx
│   │   └── ... (cta, features, pricing, testimonials, etc.)
│   │
│   ├── shared/                   # Shared utilities & wrappers
│   │   ├── ThemeSwitch.tsx       # Dark mode toggle
│   │   ├── SearchProvider.tsx    # Search context
│   │   ├── Analytics.tsx         # Analytics wrapper
│   │   ├── Image.tsx             # Next Image wrapper
│   │   ├── Link.tsx              # Next Link wrapper
│   │   └── ui/                   # Shadcn UI primitives
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── accordion.tsx
│   │       └── ... (20+ components)
│   │
│   └── MDXComponents.tsx         # MDX component mapping
│
├── data/
│   ├── config/
│   │   ├── colors.js             # Source of truth for color tokens
│   │   ├── site.settings.ts      # Site metadata
│   │   ├── searchLinks.ts        # Search index links
│   │   ├── headerNavLinks.ts     # Header navigation
│   │   ├── footerLinks.ts        # Footer navigation
│   │   └── pricingDataInterface.ts
│   ├── app-info.ts               # Auto-generated from package.json
│   └── authors/                  # MDX author profiles
│
├── css/
│   └── globals.css               # Global styles, CSS vars, utilities
│
├── layouts/                      # MDX blog layouts
│
├── lib/
│   └── utils.ts                  # cn() and convertToRgba() utilities
│
├── tailwind.config.js            # Tailwind configuration
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

---

## 4. AI Instruction Architecture

The repository uses a **dual-agent instruction system** targeting both Cursor and Claude Code. Instructions are layered with increasing specificity.

### 4.1 Entry Point: CLAUDE.md

`CLAUDE.md` serves as the top-level router for AI instructions. It does not contain rules directly — instead, it references the `.cursor/rules/*.mdc` files using `@` cross-references and provides Claude Code-specific directives:

```markdown
## Project Overview & Structure
@.cursor/rules/project-structure.mdc

## Tech Stack & Dependencies
@.cursor/rules/tech-stack-dependencies.mdc
...
```

**Claude Code-specific directives in CLAUDE.md:**
- Auto-commit after task completion with descriptive messages
- Use Context7 MCP server for library documentation
- Use Playwright MCP server for browser verification
- Run diagnostics on every file created or edited

### 4.2 Cursor Rules (.cursor/rules/*.mdc)

Each `.mdc` file uses a frontmatter format with three metadata fields:

```yaml
---
description: Short description of the rule's purpose
globs: optional/path/pattern/**/*    # File patterns that trigger this rule
alwaysApply: false                    # Whether the rule is always active
---
```

**The 10 rule files and their activation strategy:**

| File | alwaysApply | Trigger |
|---|---|---|
| `project-structure.mdc` | true | Always loaded |
| `tech-stack-dependencies.mdc` | true | Always loaded |
| `typescript-style.mdc` | true | Always loaded |
| `nextjs.mdc` | true | Always loaded |
| `tailwind-styling.mdc` | true | Always loaded |
| `self-improve.mdc` | true | Always loaded |
| `tools.mdc` | true | Always loaded |
| `ui-components.mdc` | false | Triggered for UI/dashboard work |
| `landing-components.mdc` | false | Triggered for public pages under `/app` |
| `cursor-rules.mdc` | false | Triggered when editing rules themselves |

**Key rules that shape AI output:**

- **typescript-style.mdc**: Enforces single object parameter pattern `({ id, name }: { id: string; name: string })` instead of positional parameters
- **tailwind-styling.mdc**: Mandates class ordering (layout → sizing → spacing → visual → typography → interactive → responsive) and mobile-first approach
- **ui-components.mdc**: Forces use of `@/components/shared/ui` Shadcn imports over custom or third-party UI
- **landing-components.mdc**: Points to the `@landing` module and Shipixen documentation for public pages
- **self-improve.mdc**: Instructs AI to recognize patterns and propose new rules after seeing the same pattern 3+ times

### 4.3 Claude Code Configuration (.claude/)

#### setting.json

Defines three layers of configuration:

**1. Permission Whitelist:**
```
Bash: mkdir, uv, find, mv, grep, npm, ls, cp, chmod, touch, git, pwd,
      which, echo, cat, prettier, eslint, tsc, vitest, sed, awk
MCP:  context7 (resolve-library-id, query-docs)
      playwright (all browser operations)
```

**2. Hook System:**

| Event | Hook | Purpose |
|---|---|---|
| `UserPromptSubmit` | (no hook) | — |
| `PreToolUse` | `pre-tool-use.js` | Loads "Always Works" philosophy before every tool call |
| `PostToolUse:Write` | `prettier` | Auto-formats written files |
| `PostToolUse:Edit` | `prettier` | Auto-formats edited files |
| `Notification` | `play-sound.js` | Plays notification sound |
| `Stop` | `play-sound.js done` | Plays completion sound |

**3. The "Always Works" Philosophy (aw.md):**

The `pre-tool-use.js` hook loads `.claude/commands/aw.md` before every tool execution. This file enforces a 30-second reality check:

> *"Before calling a task done: Would you be embarrassed if this fails in front of the user? If yes, test it. Actually run it. Actually verify it."*

Core tenets:
- Don't assume code works — run it
- Don't assume tests pass — execute them
- Show visible proof of execution
- Prioritize user trust above all

#### commands/ (33 Slash Commands)

Organized by function:

| Category | Commands |
|---|---|
| **Git & Version Control** | `git-commit`, `git-create-pr`, `git-status`, `git-update-branch-name`, `gh-pull-request`, `gh-pr-review`, `gh-fix-issue`, `create-worktrees` |
| **Analysis** | `explore-directory`, `explore-architecture`, `explain`, `generate-code-variations` |
| **Code Quality** | `validate`, `debug`, `aw`, `refactor-code`, `modernize-deps`, `migration-guide` |
| **Documentation** | `document-api`, `document-architecture`, `update-docs`, `add-to-changelog` |
| **Workflow** | `todo`, `learn`, `clean-memory`, `context-prime`, `initref`, `release` |
| **Advanced** | `ultrathink` (multi-perspective deep analysis), `load-llms-txt`, `troubleshoot` |

---

## 5. Design System: The Color Pipeline

The color system follows a **dual-path architecture** from a single source of truth.

### 5.1 Source of Truth: `data/config/colors.js`

```javascript
const colors = {
  primary: {
    lighter: '#fde047',   // Yellow-200
    light:   '#facc15',   // Yellow-400
    main:    '#eab308',   // Yellow-500
    dark:    '#ca8a04',   // Yellow-600
    darker:  '#a16207',   // Yellow-700
  },
  secondary: {
    lighter: '#6ee7b7',   // Emerald-300
    light:   '#34d399',   // Emerald-400
    main:    '#10b981',   // Emerald-500
    dark:    '#059669',   // Emerald-600
    darker:  '#047857',   // Emerald-700
  },
};
```

Each color family has 5 semantic levels: `lighter`, `light`, `main`, `dark`, `darker`.

### 5.2 Path A: CSS Custom Properties (Runtime)

**File:** `app/layout.tsx` (lines 24-31)

```typescript
const globalColors = colors;
const style: string[] = [];
Object.keys(globalColors).map((variant) => {
  return Object.keys(globalColors[variant]).map((color) => {
    const value = globalColors[variant][color];
    style.push(`--${variant}-${color}: ${value}`);
  });
});
```

This generates inline CSS variables injected into `<head><style>`:

```css
:root, :before, :after {
  --primary-lighter: #fde047;
  --primary-light: #facc15;
  --primary-main: #eab308;
  --primary-dark: #ca8a04;
  --primary-darker: #a16207;
  --secondary-lighter: #6ee7b7;
  --secondary-light: #34d399;
  --secondary-main: #10b981;
  --secondary-dark: #059669;
  --secondary-darker: #047857;
}
```

**Consumed by:** `css/globals.css` utility classes:
- `.fancy-overlay::after` uses `var(--primary-light)`, `var(--secondary-light)`
- `.fancy-link` uses `var(--primary-light)`, `var(--primary-darker)`
- `.fancy-glass-contrast:after` uses `var(--primary-darker)`
- `::selection` uses `var(--primary-lighter)`, `var(--primary-darker)`

### 5.3 Path B: Tailwind Utility Classes (Build-time)

**File:** `tailwind.config.js` (lines 30-52)

```javascript
colors: {
  primary: {
    100: customColors.primary.lighter,
    200: customColors.primary.lighter,
    300: customColors.primary.light,
    400: customColors.primary.light,
    500: customColors.primary.main,
    600: customColors.primary.main,
    700: customColors.primary.dark,
    800: customColors.primary.dark,
    900: customColors.primary.darker,
  },
  secondary: { /* same pattern */ },
}
```

**Mapping:** The 5 semantic levels are fanned out to the standard Tailwind 100-900 scale:

| Tailwind Scale | Semantic Level | Hex Value |
|---|---|---|
| `primary-100`, `primary-200` | lighter | `#fde047` |
| `primary-300`, `primary-400` | light | `#facc15` |
| `primary-500`, `primary-600` | main | `#eab308` |
| `primary-700`, `primary-800` | dark | `#ca8a04` |
| `primary-900` | darker | `#a16207` |

**Generates classes like:** `bg-primary-500`, `text-secondary-100`, `border-primary-700/20`

### 5.4 Path C: Shadcn Semantic Tokens

`css/globals.css` defines a separate HSL-based variable layer for Shadcn UI components:

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
  /* ... dark overrides for all semantic tokens */
}
```

**Consumed by:** Tailwind config maps these to `hsl(var(--background))`, `hsl(var(--foreground))`, etc. — used by Shadcn UI components.

### 5.5 How to Change the Color Theme

1. Edit `data/config/colors.js` with new hex values
2. Both pipelines update automatically:
   - CSS variables regenerate on next page load
   - Tailwind classes regenerate on next build
3. Shadcn semantic tokens in `globals.css` may need manual adjustment for dark mode

---

## 6. CSS Architecture

### 6.1 Layer Structure

```css
@tailwind base;       /* Reset + CSS vars */
@tailwind components; /* Component classes */
@tailwind utilities;  /* Utility classes */
```

### 6.2 Custom Properties (globals.css)

**Layer: `@layer base`**

| Category | Properties |
|---|---|
| Shadows | `--hard-shadow`, `--hard-shadow-left` |
| Shadcn semantics | `--background`, `--foreground`, `--card`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--radius` |
| Animation | `--fancy-x`, `--fancy-y` (CSS Houdini @property registered) |

**Layer: `@layer utilities`**

| Utility Class | Effect |
|---|---|
| `.perspective-left` | 3D card tilt left with shadow |
| `.perspective-right` | 3D card tilt right |
| `.perspective-bottom` | 3D card tilt from bottom |
| `.perspective-bottom-lg` | Steeper bottom tilt |
| `.perspective-paper` | Paper fold effect (right) |
| `.perspective-paper-left` | Paper fold effect (left) |
| `.fancy-heading` | Gradient text (light/dark aware) |
| `.fancy-link` | Gradient underline with hover fill |
| `.fancy-text-*` | Color gradient text (black, blue, pink, white, purple) |
| `.fancy-overlay` | Full-page animated gradient overlay |
| `.fancy-overlay--muted` | Subtle version (5% opacity) |
| `.fancy-glass` | Glassmorphism with blur |
| `.fancy-glass-contrast` | Glass with colored backdrop |
| `.nav-link` / `.nav-link-active` | Navigation link states |
| `.container-narrow` | `max-w-4xl` |
| `.container-wide` | `xl:max-w-6xl` |
| `.container-ultrawide` | `xl:max-w-7xl` |
| `.container-gigawide` | `xl:max-w-[1400px]` |

### 6.3 Dark Mode Strategy

Dark mode uses `next-themes` with `attribute="class"` strategy:

```typescript
// app/theme-providers.tsx
<ThemeProvider attribute="class" defaultTheme={siteConfig.theme} enableSystem>
```

This adds/removes the `dark` class on `<html>`. Tailwind's `darkMode: ['class']` configuration enables `dark:` variants. CSS utility classes in `globals.css` also use `.dark` prefix selectors.

### 6.4 Typography

**Fonts configured in `app/layout.tsx`:**

```typescript
const displayFont = Nunito_Sans({ variable: '--font-space-display' });
const baseFont = Nunito_Sans({ variable: '--font-space-default' });
```

**Tailwind mapping (`tailwind.config.js`):**

```javascript
fontFamily: {
  sans: ['var(--font-space-default)', ...fontFamily.sans],
  display: ['var(--font-space-display)', ...fontFamily.sans],
  cursive: ['cursive'],
}
```

Headings use `font-display` (via `@apply font-semibold font-display` in globals.css).

---

## 7. Component Tier System

### Tier 1: Shadcn UI Primitives (`components/shared/ui/`)

Radix UI headless components styled with Tailwind + CVA. Pattern:

```typescript
// components/shared/ui/button.tsx
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

**Available primitives (~20+):** Button, Input, Dialog, Accordion, Select, Checkbox, Badge, Separator, Slider, Textarea, Tooltip, and more.

**Import pattern:** `import { Button } from '@/components/shared/ui/button';`

### Tier 2: Landing Components (`components/landing/`)

89+ pre-built, composable landing page sections. These are the **primary building blocks** for public-facing pages.

**Key component families:**

| Family | Components |
|---|---|
| **Header/Footer** | `LandingHeader`, `LandingHeaderMenuItem`, `LandingFooter`, `LandingFooterColumn`, `LandingFooterLink` |
| **CTA Sections** | `LandingPrimaryImageCtaSection`, `LandingPrimaryTextCtaSection`, `LandingSaleCtaSection` |
| **Features** | `LandingProductFeaturesGrid`, `LandingProductFeature`, `LandingFeatureList`, `LandingFeatureKeyPoints` |
| **Product Tour** | `LandingProductTourSection`, `LandingProductTourList`, `LandingProductTourTrigger`, `LandingProductTourContent` |
| **Social Proof** | `LandingTestimonialGrid`, `LandingTestimonialListSection`, `LandingSocialProof`, `LandingRating` |
| **Pricing** | `LandingPricingSection`, `LandingPricingPlan` |
| **FAQ** | `LandingFaqCollapsibleSection`, `LandingFaqSection` |
| **Band** | `LandingBandSection`, `LandingMarquee` |
| **Visual** | `LandingProductVideoFeature`, `LandingProductHuntAward`, `LandingDiscount` |

### Tier 3: Feature Components (per-route)

Route-specific components built by composing Tier 1 and Tier 2. Example: `app/dashboard/page.tsx` is a self-contained 720-line component that builds a full fintech dashboard using only Tier 1 primitives (Button, icons) and Tailwind classes.

### Shared Utilities (`components/shared/`)

| Component | Purpose |
|---|---|
| `ThemeSwitch.tsx` | Dark mode toggle button |
| `SearchProvider.tsx` | Search context provider |
| `Analytics.tsx` | Analytics wrapper (Vercel) |
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

## 8. Application Routes & Pages

### Route Map

| Route | Type | Description |
|---|---|---|
| `/` | Landing | Full marketing page with hero, features, testimonials, pricing CTA, FAQ |
| `/dashboard` | Feature | Mevolut fintech dashboard (sidebar, cards, charts, transactions) |
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
| `/api/*` | API | Backend endpoints |

### Root Layout (`app/layout.tsx`)

Responsibilities:
1. Loads Nunito Sans font (display + base variants)
2. Generates CSS variables from `colors.js`
3. Sets `<html>` attributes (`lang`, font CSS variables, `scroll-smooth`)
4. Injects color CSS variables via inline `<style>`
5. Sets up favicon and meta tags
6. Wraps app in: `ThemeProviders` → `AnalyticsWrapper` → `SearchProvider`
7. Applies base body styles: `bg-white dark:bg-gray-950 text-black dark:text-white`

### Dashboard Page (`app/dashboard/page.tsx`)

A complete fintech dashboard as a single `'use client'` component (720 lines). Features:

- **Sidebar navigation** with two sections (Main: Dashboard, Cards, Transfers; Management: Settings, Help, Users)
- **Mobile-responsive sidebar** with hamburger toggle
- **Three summary cards**: Total Balance ($24,563.80), Monthly Spending ($3,241.50), Pending Transfers ($1,350.00)
- **AI Spending Limits**: Progress bar with category breakdown (Food & Dining, Transport, Entertainment, Shopping)
- **Virtual card display**: VISA card with holder name, number, expiry
- **Balance chart**: Weekly/monthly toggle with bar chart
- **Transaction table**: 8 mock transactions with search, filters, pagination
- **Full dark mode support** using Tailwind `dark:` variants throughout
- **ThemeSwitch** integration in the top bar

---

## 9. Data & Configuration Layer

### Site Configuration

| File | Purpose |
|---|---|
| `data/config/site.settings.ts` | Site title, description, URL, social banner, theme preference, language |
| `data/config/colors.js` | Color token source of truth |
| `data/config/headerNavLinks.ts` | Header navigation items (currently empty `[]`) |
| `data/config/footerLinks.ts` | Footer link columns (currently empty `[]`) |
| `data/config/searchLinks.ts` | Search index pages |
| `data/config/pricingDataInterface.ts` | TypeScript interfaces for pricing tiers |
| `data/app-info.ts` | Auto-generated name and version from `package.json` |

### TypeScript Path Aliases (`tsconfig.json`)

```json
{
  "@/components/*": ["components/*"],
  "@/data/*":       ["data/*"],
  "@/layouts/*":    ["layouts/*"],
  "@/css/*":        ["css/*"],
  "@/lib/*":        ["lib/*"],
  "@/theme/*":      ["theme/*"],
  "@/app/*":        ["app/*"]
}
```

---

## 10. Build & Tooling Pipeline

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

All routes receive:
- Content-Security-Policy (self + Vercel analytics + Cloudflare)
- Referrer-Policy: `strict-origin-when-cross-origin`
- X-Frame-Options: `DENY`
- X-Content-Type-Options: `nosniff`
- HSTS: 1 year with subdomains
- Permissions-Policy: camera/microphone/geolocation disabled

### Tailwind Configuration (`tailwind.config.js`)

Beyond colors and fonts (covered above):

**Custom animations:**

| Animation | Description |
|---|---|
| `tilt` | Subtle rocking (10s infinite) |
| `accordion-down/up` | Radix accordion transitions |
| `wiggle` | Rotation wiggle (1s infinite) |
| `fade-in-down-*` | Staggered fade-in variants (0.4s to 5s) |
| `rotate-left-to-right` | Pendulum rotation (3s infinite) |
| `marquee` | Horizontal scroll (30s infinite) |

**Custom screens:**

| Name | Breakpoint |
|---|---|
| `2xl` | `1400px` width |
| `tall-sm` through `tall-2xl` | Height-based breakpoints (640px - 1536px) |

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
  "appinfo": "node scripts/update-app-info.js"
}
```

---

## 11. Anatomy of a Generation

When a user prompts an AI agent to generate a feature (e.g., *"Add a subscription management page"*), the following pipeline executes:

### Step 1: Context Loading

```
CLAUDE.md (entry point)
  ├── @.cursor/rules/project-structure.mdc     → File organization constraints
  ├── @.cursor/rules/tech-stack-dependencies.mdc → Available libraries
  ├── @.cursor/rules/typescript-style.mdc      → Code style rules
  ├── @.cursor/rules/nextjs.mdc               → Framework patterns
  ├── @.cursor/rules/tailwind-styling.mdc      → Styling conventions
  ├── @.cursor/rules/ui-components.mdc         → Component import rules
  └── @.cursor/rules/landing-components.mdc    → Landing page patterns
```

Additionally, `pre-tool-use.js` injects the "Always Works" philosophy before each tool execution.

### Step 2: Design Token Resolution

The AI reads `data/config/colors.js` and understands:
- Primary palette = Yellow family
- Secondary palette = Emerald family
- Use `bg-primary-500`, `text-secondary-100`, etc.
- For dark mode: pair each class with `dark:` variant

### Step 3: Component Selection

Based on the request type:

| Request Type | Component Source |
|---|---|
| Public marketing page | Tier 2: `components/landing/*` |
| Dashboard/app feature | Tier 1: `components/shared/ui/*` + custom |
| Dialog/form/menu | Tier 1: Shadcn primitives |
| Icons | `lucide-react` |

### Step 4: File Creation

The AI creates files following the established patterns:
- New route → `app/{route}/page.tsx`
- New layout → `app/{route}/layout.tsx`
- New components → `components/{feature}/*.tsx`
- New data → `data/{feature}/*.ts`
- All imports use `@/` path aliases

### Step 5: Verification (CLAUDE.md mandated)

1. Run diagnostics (linting, type checking)
2. Use Playwright MCP to verify in browser
3. Check console for errors
4. Apply the "Always Works" embarrassment test

### Step 6: Auto-commit

CLAUDE.md instructs: *"Add and commit automatically whenever an entire task is finished. Use descriptive commit messages that capture the full scope of changes."*

---

## 12. Extension Points

### Adding a New Color Theme

1. Edit `data/config/colors.js` with 5 levels per color family
2. Both CSS variables and Tailwind classes update automatically
3. Review `css/globals.css` dark mode overrides if needed

### Adding a New Route

1. Create `app/{route}/page.tsx`
2. Import components from appropriate tier
3. Use `@/data/config/*` for any shared data
4. Add to `data/config/searchLinks.ts` for search indexing

### Adding a New Shadcn Component

1. Add to `components/shared/ui/{component}.tsx`
2. Follow the Radix + CVA + `cn()` pattern
3. Export from the file

### Adding a New AI Rule

1. Create `cursor/rules/{name}.mdc` with proper frontmatter
2. Follow kebab-case naming convention
3. Set `alwaysApply` based on scope
4. Cross-reference from CLAUDE.md if needed

### Adding a New Claude Command

1. Create `.claude/commands/{name}.md` (or `{category}/{name}.md`)
2. Use `$ARGUMENTS` placeholder for user input
3. Available as `/project:{name}` slash command

### Adding a New Hook

1. Create hook script in `.claude/hooks/`
2. Register in `.claude/setting.json` under the appropriate event
3. Hook receives tool context and can modify behavior

---

*Generated from repository analysis on 2026-02-17. Reflects the current state of the `main` branch.*
