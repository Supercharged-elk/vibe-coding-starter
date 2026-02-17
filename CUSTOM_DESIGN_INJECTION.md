# Custom Design System Injection

> Inject any Design System into this repository so the AI agent automatically respects it in all generated interfaces.

---

## Table of Contents

1. [Philosophy: Configure Once, Generate Infinitely](#1-philosophy)
2. [The Standard DS Manifest Format](#2-standard-ds-manifest-format)
3. [Complete Workflow](#3-complete-workflow)
4. [Phase 1: Prepare Your Design System](#4-phase-1-prepare)
5. [Phase 2: Inject (Copy-Paste Prompt)](#5-phase-2-inject)
6. [Phase 3: Verification](#6-phase-3-verification)
7. [Ready-to-Test: IBM Carbon Design System](#7-ibm-carbon-test)
8. [FAQ & Troubleshooting](#8-faq)

---

## 1. Philosophy

### The Problem

Every time you ask an AI agent to "create a dashboard" or "design a form", it uses default Shadcn styling. To get your client's brand, you must specify colors, fonts, and spacing every single time.

### The Solution

**Configure the visual identity ONCE, generate interfaces INFINITELY.**

After injection, when you ask:
```
Create a login form with email, password, and social login buttons.
```

The agent automatically uses your client's colors, fonts, radius, and spacing — no extra instructions needed.

---

## 2. Standard DS Manifest Format

The key innovation is a **standardized JSON manifest** that describes any Design System in a format the agent can directly consume.

**File:** `./design-systems/[name]/design-system.config.json`

This file maps directly to the 4 config files that need updating:

| Manifest Section | Target File | What It Controls |
|-----------------|-------------|-----------------|
| `colors` | `data/config/colors.js` | `bg-primary-*`, `bg-secondary-*` classes |
| `cssVariables` | `css/globals.css` | `bg-background`, `text-foreground`, `bg-muted`, etc. |
| `typography` | `app/layout.tsx` | Font imports and CSS variables |
| `borderRadius`, `shadows`, `spacing` | `tailwind.config.js` | Theme extensions |

### Full Schema

```json
{
  "name": "Design System Name",
  "version": "1.0",
  "source": "https://github.com/org/repo",

  "colors": {
    "primary": {
      "lighter": "#hex",
      "light": "#hex",
      "main": "#hex",
      "dark": "#hex",
      "darker": "#hex"
    },
    "secondary": {
      "lighter": "#hex",
      "light": "#hex",
      "main": "#hex",
      "dark": "#hex",
      "darker": "#hex"
    }
  },

  "cssVariables": {
    "light": {
      "background": "0 0% 100%",
      "foreground": "0 0% 9%",
      "card": "0 0% 100%",
      "card-foreground": "0 0% 9%",
      "popover": "0 0% 100%",
      "popover-foreground": "0 0% 9%",
      "primary-foreground": "0 0% 100%",
      "secondary": "210 10% 96%",
      "secondary-foreground": "210 10% 10%",
      "muted": "210 10% 96%",
      "muted-foreground": "210 10% 40%",
      "accent": "210 10% 96%",
      "accent-foreground": "210 10% 10%",
      "destructive": "0 84% 60%",
      "destructive-foreground": "0 0% 98%",
      "border": "210 10% 90%",
      "input": "210 10% 90%",
      "radius": "0.5rem"
    },
    "dark": {
      "background": "0 0% 5%",
      "foreground": "0 0% 95%",
      "card": "0 0% 8%",
      "card-foreground": "0 0% 95%",
      "popover": "0 0% 8%",
      "popover-foreground": "0 0% 95%",
      "primary-foreground": "0 0% 100%",
      "secondary": "210 5% 15%",
      "secondary-foreground": "0 0% 98%",
      "muted": "0 0% 15%",
      "muted-foreground": "210 5% 65%",
      "accent": "210 5% 15%",
      "accent-foreground": "0 0% 98%",
      "destructive": "0 63% 31%",
      "destructive-foreground": "0 86% 97%",
      "border": "210 5% 15%",
      "input": "210 5% 15%"
    }
  },

  "typography": {
    "fontFamily": "IBM Plex Sans",
    "googleFontsImport": "IBM_Plex_Sans",
    "displayFont": "IBM Plex Sans",
    "monoFont": "IBM Plex Mono",
    "weights": [300, 400, 500, 600, 700]
  },

  "borderRadius": {
    "none": "0px",
    "sm": "2px",
    "DEFAULT": "4px",
    "md": "6px",
    "lg": "8px",
    "xl": "12px",
    "full": "9999px"
  },

  "shadows": {
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "DEFAULT": "0 2px 6px 0 rgba(0, 0, 0, 0.1)",
    "md": "0 4px 8px -1px rgba(0, 0, 0, 0.1)",
    "lg": "0 12px 24px 0 rgba(0, 0, 0, 0.1)",
    "xl": "0 20px 40px -2px rgba(0, 0, 0, 0.15)"
  },

  "spacing": {
    "baseUnit": "8px",
    "notes": "Uses 8px grid. Component padding: buttons 12px/16px, cards 16px/24px, inputs 12px/16px."
  }
}
```

### How to Create a Manifest for ANY Design System

1. Find the DS documentation or token files
2. Extract the primary/secondary color palette (5 shades each)
3. Convert semantic colors to HSL format (without `hsl()` wrapper)
4. Note the font family name and its Google Fonts import name
5. Document border radius, shadows, and spacing values
6. Save as `design-system.config.json`

**Tip:** You can ask the AI agent itself to help create the manifest:
```
Read the design tokens from ./design-systems/[name]/ and create a design-system.config.json following the standard schema documented in CUSTOM_DESIGN_INJECTION.md
```

---

## 3. Complete Workflow

```
Step 1: PREPARE
  Either: Create design-system.config.json manually
  Or:     Clone DS repo + let agent extract tokens
                    |
                    v
Step 2: GIT BRANCH
  git checkout -b ds/[name]-injection
                    |
                    v
Step 3: INJECT
  Copy-paste the injection prompt into your agent
                    |
                    v
Step 4: VERIFY
  npm run dev → visual check → coherence test
                    |
                    v
Step 5: MERGE
  git merge ds/[name]-injection into main
```

---

## 4. Phase 1: Prepare Your Design System

### Option A: Create a Manifest (Recommended)

Create `./design-systems/[name]/design-system.config.json` following the schema above.

This is the fastest and most reliable approach because:
- No giant repo to clone
- Agent reads one file instead of searching thousands
- Tokens are pre-extracted and mapped

### Option B: Clone DS Source (Fallback)

Only use this if you don't have a manifest and want the agent to extract tokens from source.

```bash
# Create the directory
mkdir -p ./design-systems

# Clone (pick one)
git clone --depth 1 https://github.com/carbon-design-system/carbon.git ./design-systems/ibm-carbon
git clone --depth 1 https://github.com/Shopify/polaris.git ./design-systems/polaris
git clone --depth 1 https://github.com/mui/material-ui.git ./design-systems/mui
git clone --depth 1 https://github.com/microsoft/fluentui.git ./design-systems/fluentui
```

**Note:** Use `--depth 1` to avoid downloading full git history (saves 80%+ of download size).

---

## 5. Phase 2: Inject (Copy-Paste Prompt)

### Copy and paste this prompt into your agent (Cursor, Claude Code, or any AI coding agent):

````
Act as a Design System Migration Expert.

## Context

This repository uses a DUAL color system:
1. `data/config/colors.js` → generates `bg-primary-100` to `bg-primary-900` Tailwind classes
2. `css/globals.css` → generates `bg-background`, `text-foreground`, `bg-muted`, etc. Shadcn classes

BOTH must be updated together.

## Design System Location

./design-systems/[DESIGN_SYSTEM_NAME]/

## Instructions

### Step 1: Read the DS tokens

If `design-system.config.json` exists, read it. Otherwise, explore the DS folder to find token/theme files and extract: colors, typography, spacing, border radius, shadows.

### Step 2: Create git branch

```bash
git checkout -b ds/[DESIGN_SYSTEM_NAME]-injection
```

### Step 3: Update the 4 config files

These changes automatically update ~80% of the visual appearance:

**3.1 `data/config/colors.js`** — Replace primary and secondary palettes with DS colors (5 levels each: lighter, light, main, dark, darker).

**3.2 `css/globals.css`** — Update ALL CSS variables in BOTH `:root` and `.dark` sections. Values are HSL without wrapper (e.g., `214 100% 50%` not `hsl(214, 100%, 50%)`). Variables to update: background, foreground, card, card-foreground, popover, popover-foreground, primary-foreground, secondary, secondary-foreground, muted, muted-foreground, accent, accent-foreground, destructive, destructive-foreground, border, input, radius.

**3.3 `app/layout.tsx`** — Replace font import with DS font from Google Fonts. Keep the same CSS variable names (`--font-space-display`, `--font-space-default`).

**3.4 `tailwind.config.js`** — Add to `theme.extend`: borderRadius (all DS levels), boxShadow (all DS elevation levels). Only add spacing overrides if the DS has a significantly different scale.

### Step 4: Visual audit

Run `npm run dev` and check the app. Most components should already look correct.

### Step 5: Fix mismatched components

ONLY edit components in `components/shared/ui/` where the styling doesn't match the DS after config changes. Common fixes:
- Shade numbers: `bg-primary-300` might need to be `bg-primary-500`
- Opacity: `/70` or `/90` might not match DS style
- Specific radius overrides in component classes

**RULES when editing components:**
- CHANGE: Tailwind class strings only
- PRESERVE: imports, types, props, logic, hooks, accessibility, variant names
- NEVER use hardcoded colors like `text-white` — use token classes

### Step 6: Create agent rules

Create `.cursor/rules/design-system-brand.mdc` with:
- DS name and version
- Complete color token reference
- Typography rules
- Border radius values
- Key usage rules
- Set `alwaysApply: true` so all future generation uses the DS

### Step 7: Verify

1. `npx tsc --noEmit` — zero TypeScript errors
2. `npm run dev` — visual check in both light and dark mode
3. Coherence test: ask to create a login form WITHOUT specifying any styles and verify it uses DS tokens automatically

### Step 8: Commit

```bash
git add -A && git commit -m "feat: inject [DS_NAME] Design System — complete token migration"
```
````

**Replace `[DESIGN_SYSTEM_NAME]` with your folder name** (e.g., `ibm-carbon`, `polaris`, `mui`).

---

## 6. Phase 3: Verification

### Quick Checklist

```bash
# 1. Config files updated
cat data/config/colors.js    # Should show DS colors
cat css/globals.css           # Should show DS CSS variables

# 2. TypeScript clean
npx tsc --noEmit

# 3. Agent rules created
cat .cursor/rules/design-system-brand.mdc

# 4. Dev server
npm run dev
# Open http://localhost:3000
```

### Coherence Test (Most Important)

Ask the agent to create something **without specifying any styles:**

```
Create /app/test-coherence/page.tsx with:
- A Card containing a login form
- Email input with label
- Password input with label
- A primary Button to submit
- A link for "Forgot password?"
- A Dialog that opens when clicking "Forgot password?"
```

**If injection worked:** The agent will automatically use DS colors, radius, fonts, and spacing. No yellow (the default), no Nunito Sans (the default font).

**If injection failed:** You'll see default Shadcn styling. Go back and check which config file wasn't updated.

---

## 7. Ready-to-Test: IBM Carbon Design System

IBM Carbon is the ideal test DS because the visual differences are dramatic:

| Property | Default (Shadcn) | IBM Carbon |
|----------|-----------------|------------|
| Primary | Yellow `#eab308` | Blue `#0f62fe` |
| Font | Nunito Sans | IBM Plex Sans |
| Button radius | 8px (rounded) | 0px (sharp!) |
| Feel | Warm, friendly | Professional, enterprise |

### Quick Test (3 minutes)

1. The manifest is already prepared at `./design-systems/ibm-carbon/design-system.config.json`

2. Copy-paste the injection prompt from Section 5, replacing `[DESIGN_SYSTEM_NAME]` with `ibm-carbon`

3. Verify: buttons should be blue with sharp corners, text should be IBM Plex Sans

### Expected Results After Injection

- **Buttons**: Blue (`#0f62fe`), sharp corners (0px radius), IBM Plex Sans font
- **Cards**: White background, subtle gray border, 0px radius
- **Inputs**: Gray border, 0px radius, IBM Plex Sans
- **Text**: IBM Plex Sans, proper weight hierarchy
- **Dark mode**: Dark gray backgrounds (`#262626`), light text

---

## 8. FAQ & Troubleshooting

### Q: What if I don't have a `design-system.config.json`?

The agent can extract tokens from DS source code. Clone the repo and the agent will search for token files. However, this is slower and less reliable. Creating the manifest manually is recommended.

### Q: Can I inject a DS from a Figma file?

Not directly. Export design tokens from Figma (using plugins like "Design Tokens" or "Tokens Studio"), convert to the standard JSON manifest format, then inject.

### Q: What if a DS component doesn't exist in Shadcn?

The agent will create it using Radix UI primitives with DS tokens applied. Only create components that are actually needed for your project.

### Q: Can I switch between Design Systems?

Yes. Create a branch for each DS (`ds/carbon-injection`, `ds/polaris-injection`). Switch between branches to switch DS. The main branch keeps the default.

### Q: What if the injection looks wrong?

Check this order:
1. `data/config/colors.js` — are hex values correct?
2. `css/globals.css` — are HSL values correct? (common mistake: using `hsl(H, S%, L%)` instead of just `H S% L%`)
3. `app/layout.tsx` — is the font loading? (check Network tab in browser)
4. `tailwind.config.js` — are borderRadius/boxShadow extensions present?

### Q: Does this work with Claude Code, Cursor, and other agents?

Yes. The `.cursor/rules/` files are for Cursor. `CLAUDE.md` is for Claude Code. The copy-paste prompt (Section 5) works with any agent.

---

## Appendix: Compatible Design Systems

| DS | Difficulty | Token Availability | Notes |
|----|-----------|-------------------|-------|
| IBM Carbon | Easy | Excellent (JSON tokens) | Best for testing — dramatic visual difference |
| Shopify Polaris | Easy | Excellent (JSON tokens) | Clean, accessible |
| MUI (Material) | Medium | Good (JS theme) | Large component set |
| Ant Design | Medium | Good (LESS variables) | Enterprise-focused |
| Microsoft Fluent | Hard | Scattered | Complex token structure |
| Adobe Spectrum | Hard | Good but complex | Strict accessibility |

---

_Generated for the Vibe Coding Starter repository._
