# Prompts Reference

All prompts ready to copy and paste. Replace `[PLACEHOLDERS]` with your values.

Each workflow has **2 steps**: Step 1 generates the brief (run in any LLM), Step 2 implements it (run in the coding agent with the repo open).

---

## Path 1: Screenshot of Real Website → Faithful Clone

### Step 1 — Analyze the screenshot (run in any LLM, attach the image)

```
This is a dashboard of [DESCRIBE WHAT THE WEBSITE/APP IS — e.g. "a fintech app called Mevolut for personal banking"].

Thoroughly analyze the UI in this screenshot and describe it in as much detail as you can to hand over from a UI designer to a developer. The brief should cover both light and dark mode and contain responsive breakpoints matching Tailwind CSS defaults.
Output characteristics as structured JSONC.

For colors, extract a rough palette and only detail accents and complex media. The goal is to use only 2 palettes: primary and secondary similar to Tailwind colors. Alongside these 2, you can define any number of grays and accent colors for more complex UI (gradients, shadows, SVGs, etc.).

End with a prompt explaining how to implement the UI for a developer, but don't mention any tech specs; only a brief of the UI to be implemented and the token rules + usage. Output the prompt as a Markdown code block.
```

**Output**: You get two things — a JSONC design specification and a markdown implementation prompt. Save both.

### Step 2 — Implement in the repo (run in the coding agent)

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

<Paste the markdown implementation prompt from Step 1>

**Design specification**

<Paste the JSONC design specification from Step 1>
```

---

## Path 2: Exported Figma Code → Faithful Clone

### Step 1 — Analyze the Figma export (run in any LLM, paste the code)

```
This is the exported code from a Figma design for [DESCRIBE WHAT IT IS — e.g. "an editorial news website for a European NGO"].

Thoroughly analyze this exported Figma code and describe the UI in as much detail as you can to hand over from a UI designer to a developer. The brief should cover both light and dark mode and contain responsive breakpoints matching Tailwind CSS defaults.
Output characteristics as structured JSONC.

For colors, extract a rough palette and only detail accents and complex media. The goal is to use only 2 palettes: primary and secondary similar to Tailwind colors. Alongside these 2, you can define any number of grays and accent colors for more complex UI (gradients, shadows, SVGs, etc.).

End with a prompt explaining how to implement the UI for a developer, but don't mention any tech specs; only a brief of the UI to be implemented and the token rules + usage. Output the prompt as a Markdown code block.

**Exported Figma code**

<Paste the exported React/Tailwind/HTML code from your Figma plugin>
```

**Output**: Same as Path 1 — a JSONC design specification and a markdown implementation prompt.

### Step 2 — Implement in the repo (run in the coding agent)

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

<Paste the markdown implementation prompt from Step 1>

**Design specification**

<Paste the JSONC design specification from Step 1>

**Exported Figma code (reference)**

<Paste the original exported Figma code — the agent uses it as structural reference alongside the brief>
```

---

## Path 3: Low-Fi Wireframe + Design System → High Fidelity

This path requires a **Design System injected in the repo first**. See [DS Injection](#ds-injection) below.

### Step 1 — Analyze the wireframe (run in any LLM, attach the wireframe image)

```
This is a low-fidelity wireframe for [DESCRIBE WHAT IT IS — e.g. "an editorial news website for the European Anti-Poverty Network"].

Thoroughly analyze this wireframe and describe it in as much detail as you can to hand over from a UI designer to a developer. The brief should cover both light and dark mode and contain responsive breakpoints matching Tailwind CSS defaults.
Output characteristics as structured JSONC.

For colors, extract a rough palette and only detail accents and complex media. The goal is to use only 2 palettes: primary and secondary similar to Tailwind colors. Alongside these 2, you can define any number of grays and accent colors for more complex UI (gradients, shadows, SVGs, etc.).

Important: this wireframe is low-fidelity. The final implementation will use a different Design System, so treat all visual tokens (colors, fonts, border radius, shadows) as *design intent* rather than final values. Focus on describing the **structure, layout, content hierarchy, interactions, and responsive behavior** in detail.

End with a prompt explaining how to implement the UI for a developer, but don't mention any tech specs; only a brief of the UI to be implemented and the token rules + usage. Output the prompt as a Markdown code block.
```

### Step 2 — Implement with DS preservation (run in the coding agent)

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

<Paste the markdown implementation prompt from Step 1>

**Design specification**

<Paste the JSONC design specification from Step 1>
```

---

## DS Injection

Run this in the coding agent before using Path 3.

```
Inject the [DS NAME] Design System into this repository.
Follow @.cursor/rules/design-system-migration.mdc
Use the config at ./design-systems/[ds-name]/design-system.config.json
```

**Available DS configs:**
- IBM Carbon: `./design-systems/ibm-carbon/design-system.config.json`

---

## Creating a Design System Config

If you have a brand with an existing design system (in Figma, a style guide PDF, a website, etc.) and want to use it with Path 3, you need to convert it to the repo's JSON format.

### Option A: Use an LLM to extract tokens from your brand guide

Attach your brand's style guide (PDF, image, or URL) and use this prompt:

```
Analyze this design system / brand guide and extract all design tokens into the JSON format below. Fill in every section as completely as possible based on what you can find. For anything not explicitly defined, make reasonable choices that are consistent with the brand's visual language.

Output a complete JSON file following this exact schema:

{
  "name": "[Brand Name] Design System",
  "version": "1.0",
  "source": "[URL or reference to the original DS]",
  "description": "[One-line description]",

  "colors": {
    "primary": {
      "lighter": "#___",  "light": "#___",  "main": "#___",  "dark": "#___",  "darker": "#___"
    },
    "secondary": {
      "lighter": "#___",  "light": "#___",  "main": "#___",  "dark": "#___",  "darker": "#___"
    }
  },

  "neutrals": {
    "50": "#___",  "100": "#___",  "200": "#___",  "300": "#___",  "400": "#___",
    "500": "#___",  "600": "#___",  "700": "#___",  "800": "#___",  "900": "#___"
  },

  "cssVariables": {
    "light": {
      "background": "H S% L%",
      "foreground": "H S% L%",
      "card": "H S% L%",
      "card-foreground": "H S% L%",
      "popover": "H S% L%",
      "popover-foreground": "H S% L%",
      "primary-foreground": "H S% L%",
      "secondary": "H S% L%",
      "secondary-foreground": "H S% L%",
      "muted": "H S% L%",
      "muted-foreground": "H S% L%",
      "accent": "H S% L%",
      "accent-foreground": "H S% L%",
      "destructive": "H S% L%",
      "destructive-foreground": "H S% L%",
      "border": "H S% L%",
      "input": "H S% L%",
      "ring": "H S% L%"
    },
    "dark": {
      "(same keys as light with dark mode values)"
    }
  },

  "semanticColors": {
    "interactive": "#___",
    "interactiveHover": "#___",
    "interactiveActive": "#___",
    "danger": "#___",
    "dangerHover": "#___",
    "warning": "#___",
    "warningText": "#___",
    "success": "#___",
    "info": "#___",
    "disabled": "#___",
    "disabledText": "#___",
    "focus": "#___",
    "focusInset": "#___",
    "borderSubtle": "#___",
    "borderStrong": "#___",
    "textPrimary": "#___",
    "textSecondary": "#___",
    "textPlaceholder": "#___",
    "textOnColor": "#___",
    "linkPrimary": "#___",
    "linkHover": "#___",
    "backgroundHover": "rgba(___)",
    "backgroundActive": "rgba(___)",
    "layer01": "#___",
    "layer02": "#___",
    "layer03": "#___"
  },

  "semanticColorsDark": {
    "(same keys as semanticColors with dark mode values)"
  },

  "typography": {
    "fontFamily": "[Primary font name]",
    "displayFont": "[Display font name or same as primary]",
    "monoFont": "[Mono font name or null]",
    "weights": { "light": 300, "regular": 400, "medium": 500, "semibold": 600, "bold": 700 },
    "scale": {
      "caption":     { "size": "0.75rem",  "lineHeight": "1rem",    "weight": 400 },
      "label":       { "size": "0.75rem",  "lineHeight": "1rem",    "weight": 600 },
      "bodyCompact": { "size": "0.875rem", "lineHeight": "1.125rem","weight": 400 },
      "body":        { "size": "0.875rem", "lineHeight": "1.25rem", "weight": 400 },
      "bodyLarge":   { "size": "1rem",     "lineHeight": "1.5rem",  "weight": 400 },
      "heading01":   { "size": "0.875rem", "lineHeight": "1.25rem", "weight": 600 },
      "heading02":   { "size": "1rem",     "lineHeight": "1.5rem",  "weight": 600 },
      "heading03":   { "size": "1.25rem",  "lineHeight": "1.75rem", "weight": 400 },
      "heading04":   { "size": "1.75rem",  "lineHeight": "2.25rem", "weight": 400 },
      "heading05":   { "size": "2rem",     "lineHeight": "2.5rem",  "weight": 400 },
      "heading06":   { "size": "2.625rem", "lineHeight": "3.125rem","weight": 300 },
      "heading07":   { "size": "3.375rem", "lineHeight": "4rem",    "weight": 300 }
    }
  },

  "borderRadius": {
    "none": "0px", "sm": "___", "DEFAULT": "___", "md": "___",
    "lg": "___", "xl": "___", "full": "9999px"
  },

  "shadows": {
    "sm": "___", "DEFAULT": "___", "md": "___", "lg": "___", "xl": "___"
  },

  "spacing": {
    "baseUnit": 8,
    "scale": [4, 8, 12, 16, 24, 32, 48, 64, 96, 160],
    "componentSpacing": {
      "buttonPaddingX": "___", "buttonPaddingY": "___",
      "inputHeight": "___", "cardPadding": "___"
    }
  },

  "focus": {
    "width": "___",
    "color": "#___",
    "insetColor": "#___",
    "offset": "___",
    "tailwindPattern": "outline-2 outline-[FOCUS_COLOR] outline-offset-[-1px]"
  },

  "transitions": {
    "duration": { "fast": "___ms", "moderate": "___ms", "slow": "___ms" },
    "easing": {
      "standard": "cubic-bezier(___)",
      "entrance": "cubic-bezier(___)",
      "exit": "cubic-bezier(___)"
    }
  },

  "componentOverrides": {},

  "notes": {
    "philosophy": "[Describe the DS personality: sharp/rounded, colorful/muted, dense/airy, etc.]"
  }
}

Notes:
- CSS variable values for Shadcn must be in "H S% L%" format (HSL without the hsl() wrapper), e.g. "221 90% 53%" for a blue.
- For semanticColors, use hex values directly.
- For borderRadius, consider the brand: is it sharp (0px), slightly rounded (4px), or very rounded (12px+)?
- For componentOverrides, leave empty — these can be added later if specific components need custom treatment.
- See ./design-systems/ibm-carbon/design-system.config.json as a complete example.
```

### Option B: Fill the template manually

1. Copy the template:
   ```bash
   cp design-systems/TEMPLATE.config.json design-systems/my-brand/design-system.config.json
   ```

2. Open the template and fill each section using your brand's tokens. Minimum required:
   - `name`, `colors` (primary + secondary, 5 shades each)
   - `cssVariables` (light + dark — these are Shadcn variables in HSL)
   - `typography` (fontFamily at minimum)
   - `borderRadius`, `shadows`

3. Recommended for high fidelity:
   - `neutrals` (gray scale 50-900)
   - `semanticColors` + `semanticColorsDark` (interactive, danger, warning, success, focus, etc.)
   - `focus` (focus ring pattern)
   - `transitions` (motion durations and easing)
   - `componentOverrides` (per-component class overrides — see IBM Carbon config for examples)

4. Use `design-systems/ibm-carbon/design-system.config.json` as reference for a complete implementation.

### Option C: Extract from a live website

If the DS is already implemented on a website, you can screenshot it and use this prompt:

```
This website uses [BRAND NAME] Design System. Analyze these screenshots and extract all design tokens into the JSON format I'll provide.

Look at:
- The primary and secondary brand colors (buttons, links, accents)
- The neutral/gray scale (backgrounds, borders, text colors)
- Typography (font family, sizes, weights used for headings, body, labels)
- Border radius (are elements sharp, slightly rounded, or very rounded?)
- Shadows (flat, subtle, or prominent?)
- Focus states (what happens when you tab through elements?)
- Component patterns (how do buttons, inputs, cards, tabs look?)

<Paste the JSON schema from Option A>
```

---

## Quick Reference

| I have... | I want... | Steps |
|-----------|-----------|-------|
| Screenshot of a real website | A clone of it | Path 1: Step 1 + Step 2 |
| Exported Figma code | A clone of it | Path 2: Step 1 + Step 2 |
| A wireframe + a brand DS | A polished UI with the brand | DS Injection → Path 3: Step 1 + Step 2 |
| A brand guide but no DS config | A DS config JSON | "Creating a DS Config" (Option A, B, or C) → then DS Injection |
| Nothing yet | To try the system | Use IBM Carbon: DS Injection → draw a wireframe → Path 3 |

---

## Tips

- **Step 1 quality matters**: The more detailed the JSONC brief, the better the result. Include responsive rules, dark mode, and interaction states.
- **Path 1/2 are identical in Step 2**: The only difference is the input to Step 1 (image vs code). The implementation prompt is the same.
- **Path 3 preserves the DS**: After implementation, verify with `git diff data/config/colors.js css/globals.css tailwind.config.js app/layout.tsx` — these should show no changes.
- **Token translation in Path 3**: The agent automatically translates wireframe tokens to DS equivalents (pill → rounded-none, black → bg-primary-500, Helvetica → font-sans). You don't need to do this manually.
- **DS creation**: Option A (LLM extraction) works surprisingly well. Give it your brand guide PDF or Figma screenshots and it will extract a usable config in one shot. Review and adjust as needed.
- **componentOverrides**: These are optional but add the final ~20% of DS fidelity. See the IBM Carbon config for examples of how to override Button, Tabs, Switch, etc.
