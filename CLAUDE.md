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

## Design System Injection

When the user asks to inject, migrate, or set up a Design System, follow the COMPLETE guide in `@.cursor/rules/design-system-migration.mdc`.

### Key Architecture: Dual Color System

This repo has TWO color systems that BOTH must be updated:
1. **Numeric palette** (`data/config/colors.js`) — drives `bg-primary-100` to `bg-primary-900`
2. **Shadcn semantic vars** (`css/globals.css`) — drives `bg-background`, `text-foreground`, `bg-muted`, etc.

### Strategy: Config-First

1. **Git branch**: `git checkout -b ds/[name]-injection`
2. **Read DS manifest**: Check for `./design-systems/[name]/design-system.config.json`
3. **Update 4 config files** (this changes ~80% of visuals automatically):
   - `data/config/colors.js` — primary/secondary palette
   - `css/globals.css` — ALL Shadcn CSS variables (light + dark)
   - `app/layout.tsx` — font import
   - `tailwind.config.js` — radius, shadows, spacing extensions
4. **Visual audit** — run `npm run dev`, identify components that still look wrong
5. **Fix only mismatched components** — adjust Tailwind classes, preserve structure/API
6. **Create agent rules** — `.cursor/rules/design-system-brand.mdc`
7. **Verify** — `npx tsc --noEmit`, visual check, coherence test

### Trigger Keywords

- "inject design system" / "migrate design system"
- "apply [Name] Design System" / "transform to [Name]"
- Working with `./design-systems/` folder

## Wireframe Implementation (DS-Aware Mode)

When the user provides a UI wireframe/design brief and the repo already has a Design System configured, follow `@.cursor/rules/wireframe-implementation.mdc`.

**This is a DIFFERENT mode from Design System Injection.** The agent must NOT modify DS config files.

### How to detect which mode to use

- **DS Injection mode**: User says "inject", "migrate", "apply [Name] design system"
- **Wireframe mode (DS-Aware)**: User provides a UI brief/wireframe AND the repo already has a configured DS (check if `data/config/colors.js` has non-default values)

### Core Rule: Separate Structure from Style

- **Structure** (from the wireframe brief): sections, layout grids, content hierarchy, responsive behavior, interactions, semantic HTML, sample data
- **Style** (from the repo DS): colors, fonts, border-radius, shadows, spacing scale, CSS variables

### DO NOT modify these files in Wireframe mode:
- `data/config/colors.js`
- `css/globals.css`
- `tailwind.config.js`
- `app/layout.tsx` font imports

### Token Translation

When the brief specifies visual tokens, translate them to the EXISTING DS:

| Brief says | Agent uses |
|------------|-----------|
| "pill-shaped buttons (80px radius)" | DS border-radius (e.g., `rounded-none` for Carbon) |
| "bg: #3F3F3F" | `bg-neutral-700` (closest Tailwind token) |
| "primary action: black bg" | `bg-primary-500` (repo primary color) |
| "Helvetica Neue font" | `font-sans` (repo font via CSS variable) |
| "card radius: 20px" | DS largest radius token (e.g., `rounded-lg` for Carbon) |

### Trigger Phrases

- "implement this wireframe" / "build this page"
- Any UI brief with a JSON design spec when DS is already configured
- "implement this UI using the existing design system"

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
