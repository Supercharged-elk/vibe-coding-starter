# Prompts Reference

All prompts ready to copy and paste. Replace `[PLACEHOLDERS]` with your values.

---

## Step 0: Generate a JSON Brief from Your Input

Before using any workflow, you need a structured JSON brief. Use this prompt with any LLM (Claude, GPT, etc.) alongside your screenshot or wireframe image.

### Prompt: Image/Wireframe to JSON Brief

```
Analyze this image and generate a complete UI implementation brief in JSON format.

The brief must include these sections:

1. **meta**: artifact type, scope (list of sections), layout_notes, tailwind_breakpoints
2. **design_tokens**:
   - color_palettes (primary + secondary, 5 steps each: 50, 200, 500, 700, 900)
   - neutrals (white, black, surface_light, surface_dark, grays)
   - color_semantics (light_mode + dark_mode mappings)
   - typography (families, weights, styles for h1-h3, body sizes, labels)
   - radii (pill, card, chip in px)
   - spacing_scale (base values, section padding, card padding, stack gaps)
   - borders_and_dividers
   - shadows
   - motion (transitions, hover_patterns)
3. **layout_system**: global_container (max_width, gutters), responsive_rules (xs through 2xl)
4. **components**: For each section, include:
   - purpose
   - structure (elements, sizes, content)
   - interactions (hover states, toggles)
   - light_mode / dark_mode specifics
   - responsive behavior per breakpoint
5. **interaction_states**: buttons (outlined, filled, chip, icon), links
6. **accessibility_and_content_rules**: contrast, hit targets, semantics

Be thorough. Each section should have enough detail for a developer to implement without seeing the original image.
```

---

## Path 1 & 2: Clone Mode

Use this when you have a **real website screenshot** (Path 1) or **exported Figma code** (Path 2) and want to replicate it faithfully.

### Prompt: Clone Implementation

```
Your task is to implement a new route on /[ROUTE], following the design + development brief below. Implement thoroughly, in a step-by-step manner, and use built-in, standard Tailwind CSS design tokens instead of hardcoding values.

For colors and font families, use the defined values present in @tailwind.config.js, e.g. 'bg-primary-500' etc. instead of the hardcoded primary/secondary values in the JSON brief. For one-off colors/grays etc. the JSON values are acceptable.

**Requirements**

- responsive (full width bg with centered content on larger screens)
- theme aware components with light and dark mode support (you can toggle with @ThemeSwitch.tsx; make sure to include that in the menu bar)
  - update @data/config/colors.js to match the colors in the design brief
  - *important* make sure to include light and dark mode colors by using Tailwind's dark mode classes (dark:)
  - all components must adapt to theme changes
- *do not use* magic strings, hex values, or px values. Replace all with Tailwind classes if possible.
- split reusable or complex parts of the UI into components so the code is maintainable and easy to understand.
- if any sample data is generated, place it in a separate file to keep the code clean.

**Note**

- the app is already running a dev server at port 6006

**Assignment brief**

<Paste your text description of the UI here>

**Design specification**

```json
<Paste the JSON brief generated in Step 0>
```
```

### For Path 2 only — add exported Figma code as extra context:

```
**Exported Figma code (reference)**

<Paste the exported Figma React/Tailwind code here>
```

---

## Path 3: Wireframe to High Fidelity

Use this when you have a **low-fidelity wireframe** and want to style it with the **Design System already injected** in the repo.

### Prerequisite: Inject a Design System first

```
Inject the [DS NAME] Design System into this repository.
Use ./design-systems/[ds-name]/design-system.config.json
Follow @.cursor/rules/design-system-migration.mdc
```

**Available DS configs:**
- IBM Carbon: `./design-systems/ibm-carbon/design-system.config.json`
- Create your own: copy `./design-systems/TEMPLATE.config.json`

### Prompt: Wireframe to High Fidelity

```
Your task is to implement a new route on /[ROUTE], following the wireframe brief below.

**CRITICAL: Design System Preservation**

This repo has [DS NAME] Design System configured. DO NOT modify:
- `data/config/colors.js`
- `css/globals.css`
- `tailwind.config.js`
- `app/layout.tsx` font imports

Read the current DS tokens from these files FIRST. Then implement the wireframe using ONLY those existing tokens.

When the brief specifies visual tokens (colors like "#3F3F3F", radius like "80px pill", fonts like "Helvetica Neue"), translate them to the nearest EXISTING DS token (e.g., bg-neutral-700, rounded-none, font-sans).

**Requirements**

- responsive (full width bg with centered content on larger screens)
- theme aware components with light and dark mode support (you can toggle with @ThemeSwitch.tsx; make sure to include that in the menu bar)
  - *important* make sure to include light and dark mode colors by using Tailwind's dark mode classes (dark:)
  - all components must adapt to theme changes
- *do not use* magic strings, hex values, or px values. Replace all with Tailwind classes if possible.
- split reusable or complex parts of the UI into components so the code is maintainable and easy to understand.
- if any sample data is generated, place it in a separate file to keep the code clean.

**Note**

- the app is already running a dev server at port 6006

**Assignment brief**

<Paste your text description of the wireframe here>

**Design specification**

```json
<Paste the JSON brief generated in Step 0>
```
```

---

## DS Injection Prompt

Use this to inject a Design System into the repo before using Path 3.

```
Inject the [DS NAME] Design System into this repository.
Follow @.cursor/rules/design-system-migration.mdc
Use the config at ./design-systems/[ds-name]/design-system.config.json
```

---

## Quick Reference: Which Prompt for Which Situation

| I have... | I want... | Use |
|-----------|-----------|-----|
| Screenshot of a website | A clone of that website | **Step 0** + **Path 1/2 prompt** |
| Figma exported code | A clone of that design | **Step 0** + **Path 1/2 prompt** + Figma code appendix |
| A wireframe sketch | A polished UI with a specific brand | **DS Injection** + **Step 0** + **Path 3 prompt** |
| A new Design System to add | The repo configured with my DS | Copy `TEMPLATE.config.json`, fill it, then **DS Injection prompt** |

---

## Tips

- **Step 0 quality matters**: The better the JSON brief, the better the implementation. Include responsive rules, dark mode specifics, and interaction states.
- **Path 3 token translation**: The agent will automatically translate wireframe tokens (pill shapes, black buttons, Helvetica) to DS tokens (Carbon squared corners, blue primary, IBM Plex Sans). You don't need to do this manually.
- **Verification after Path 3**: Run `git diff data/config/colors.js css/globals.css tailwind.config.js app/layout.tsx` — if any of these changed, the DS was not preserved correctly.
- **Dark mode**: All prompts require dark mode support. The agent uses Tailwind `dark:` classes. Toggle with the ThemeSwitch component in the header.
- **Sample data**: The agent places mock data in `data/[route-name]/` to keep page components clean.
