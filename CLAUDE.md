Follow these instructions carefully and do not deviate from them.

## Project Overview & Structure

Comprehensive guide to the folder structure and organization of the project, including all main directories, key files, and their purposes.

@.cursor/rules/project-structure.mdc

## Tech Stack & Dependencies

Complete listing of the tech stack, frameworks, libraries, and dependencies used throughout the project, with version information and usage patterns.

@.cursor/rules/tech-stack-dependencies.mdc

## TypeScript Code Style Guide

TypeScript conventions including parameter passing patterns, type safety rules, import organization, functional programming practices, and documentation standards.

@.cursor/rules/typescript-style.mdc

## Next.js

Expert guidance on React, Next.js App Router, and related technologies including code structure, naming conventions, React best practices, UI styling, forms, metadata, error handling, accessibility, and security.

@.cursor/rules/nextjs.mdc

## UI Components from Shadcn UI

Guidelines for using Shadcn UI components from the shared UI library, including usage, import conventions, and best practices for composing user interfaces.

@.cursor/rules/ui-components.mdc

## Tailwind CSS Styling Practices

Tailwind CSS conventions covering class organization, responsive design, color system usage, layout patterns, design system integration, and styling best practices.

@.cursor/rules/tailwind-styling.mdc

## Landing Page Components Rule

Instructions for building public-facing pages using landing page components, including component sources, documentation references, structure examples, and implementation best practices.

@.cursor/rules/landing-components.mdc

## Self-Improvement

Guidelines for continuously improving rules based on emerging code patterns, including analysis processes, rule updates, quality checks, and documentation maintenance.

@.cursor/rules/self-improve.mdc

## 3 UI Generation Workflows

This repo supports 3 distinct workflows for generating UI. The agent MUST identify which path applies before starting.

### Decision Diagram

```
User provides UI input
        |
        v
+----------------------------------+
| Is the input a WIREFRAME         |
| (low-fidelity, no real styling)  |
| AND is there a DS injected?      |
+--------+------------------------+
         |
   YES   |    NO
   v     |    v
PATH 3   | +-----------------------------+
         | | Does the prompt say "update |
         | | colors.js to match brief"?  |
         | +--------+-------------------+
         |          |
         |    YES   |    NO (inject/migrate)
         |    v     |    v
         | PATH 1/2 | DS INJECTION
         |          | (prerequisite for Path 3)
```

### Path 1: Image → Clone (faithful replication)

**Input**: Screenshot of a real website + JSON design brief
**Goal**: Faithfully replicate the source design
**Config files**: MODIFY to match the brief's tokens
**Rule**: `@.cursor/rules/clone-implementation.mdc`

The brief is the source of truth for BOTH structure AND style. Update `colors.js`, `globals.css`, `tailwind.config.js`, and `layout.tsx` to match the brief's design tokens.

**Trigger**: User provides a website screenshot/image + JSON brief + prompt says "update colors.js to match the design brief"

### Path 2: Figma Code → Clone (faithful replication)

**Input**: Exported Figma code (via Figma-to-Tailwind/React plugin) + JSON design brief
**Goal**: Same as Path 1, but input is code instead of image
**Config files**: MODIFY to match the brief's tokens
**Rule**: `@.cursor/rules/clone-implementation.mdc`

Same workflow as Path 1. The exported code provides additional structural detail beyond what an image can convey.

**Trigger**: User provides Figma exported code + JSON brief + prompt says "update colors.js to match the design brief"

### Path 3: Wireframe → High Fidelity (DS-aware)

**Input**: Wireframe (low-fidelity mockup) as image or code
**Goal**: Apply the repo's injected DS to create high-fidelity UI
**Config files**: DO NOT MODIFY
**Rule**: `@.cursor/rules/wireframe-implementation.mdc`
**Prerequisite**: A Design System MUST be injected first (see DS Injection below)

The wireframe provides structure only. All visual tokens (colors, fonts, radius, shadows) come from the repo's existing DS.

**Trigger**: User provides a wireframe + prompt says "DO NOT modify design system config files" + repo has an injected DS

### Token Translation (Path 3 only)

When the wireframe specifies visual tokens, translate them to the EXISTING DS:

| Wireframe says | Agent uses |
|----------------|-----------|
| "pill-shaped buttons (80px radius)" | DS border-radius (e.g., `rounded-none` for Carbon) |
| "primary action: black bg" | `bg-primary-500` (repo primary color) |
| "Helvetica Neue font" | `font-sans` (repo font via CSS variable) |
| "card radius: 20px" | DS largest radius token (e.g., `rounded-lg`) |

## Design System Injection (prerequisite for Path 3)

When the user asks to inject, migrate, or set up a Design System, follow the COMPLETE guide in `@.cursor/rules/design-system-migration.mdc`.

### DS Config Schema

DS configs live at `./design-systems/[name]/design-system.config.json`. Use `./design-systems/TEMPLATE.config.json` as the base for creating new DS configs.

The schema supports: `colors`, `neutrals`, `cssVariables`, `semanticColors`, `semanticColorsDark`, `typography` (with scale), `borderRadius`, `shadows`, `spacing`, `focus`, `transitions`, `componentOverrides`, `notes`.

### Key Architecture: Dual Color System + DS Semantic Tokens

This repo has THREE layers of color tokens:
1. **Numeric palette** (`data/config/colors.js`) — drives `bg-primary-100` to `bg-primary-900`
2. **Shadcn semantic vars** (`css/globals.css`) — drives `bg-background`, `text-foreground`, `bg-muted`, etc.
3. **DS semantic tokens** (`css/globals.css` `--ds-*` vars) — drives `bg-[--ds-interactive]`, `text-[--ds-danger]`, `outline-[--ds-focus]`, etc.

### Strategy: Config-First + Component Overrides

1. **Git branch**: `git checkout -b ds/[name]-injection`
2. **Read DS manifest**: Check for `./design-systems/[name]/design-system.config.json`
3. **Update 4 config files** (~80% of visuals):
   - `data/config/colors.js` — primary/secondary palette
   - `css/globals.css` — Shadcn CSS variables + `--ds-*` semantic tokens + `--ds-neutral-*` neutrals + focus ring
   - `app/layout.tsx` — font import (+ mono font if defined)
   - `tailwind.config.js` — radius, shadows, fontSize scale, transitions
4. **Apply componentOverrides** (~20% remaining):
   - CVA components: replace base/variants/sizes class strings
   - Non-CVA components: apply classReplacements (find/replace)
   - Structural overrides (e.g., tabs pill → underline)
5. **Landing components sweep** — best-effort replacement of hardcoded colors
6. **Visual audit** — run `npm run dev`, check both modes
7. **Create agent rules** — `.cursor/rules/design-system-brand.mdc`
8. **Verify** — `npx tsc --noEmit`, visual check, coherence test

### Trigger Keywords

- "inject design system" / "migrate design system"
- "apply [Name] Design System" / "transform to [Name]"
- Working with `./design-systems/` folder

## Git & Version Control

- Add and commit automatically whenever an entire task is finished
- Use descriptive commit messages that capture the full scope of changes

## Retrieving library documentation by using Context 7

When the user requests code examples, setup or configuration steps, or library/API documentation, use the context7 mcp server to get the information.

## Verifying features in the browser

Use the Playwright MCP server to verify features in the browser.
Check for console errors and ensure the implemented functionality is working as expected.

## **EXTREMELY IMPORTANT:** Code Quality Checks

**ALWAYS follow these instructions before completing a task.**

Automatically use the IDE's built-in diagnostics tool to check for linting and type errors:

- Run `mcp__ide__getDiagnostics` to check all files for diagnostics
- Fix any linting or type errors before considering the task complete
- Do this for _each_ file you create or edit

This is a CRITICAL step that must NEVER be skipped when working on any code-related task.
