# Guia: Wireframe Brief → Implementacion con Design System existente

## El Problema

Actualmente, cuando el agente recibe un brief de UI (wireframe + design tokens), hace **dos cosas a la vez**:

1. **Adapta el Design System del repo** para que coincida con los tokens del brief (colores, fonts, radii, etc.)
2. **Implementa la estructura/layout** del wireframe

Esto es util cuando quieres inyectar un DS nuevo, pero **no es lo que queremos** cuando ya tienes un DS configurado (ej. IBM Carbon) y solo quieres que el wireframe se implemente **usando** ese DS.

### Lo que paso en la implementacion actual

| Archivo | Accion del agente | Deberia haber hecho |
|---------|-------------------|---------------------|
| `data/config/colors.js` | Reemplazo IBM Blue `#0f62fe` → EAPN Blue `#57B4DD` | **No tocar** — usar `bg-primary-500` que ya resuelve a IBM Blue |
| `css/globals.css` | Cambio CSS variables (foreground, border, radius) | **No tocar** — las variables de IBM Carbon ya estaban correctas |
| `tailwind.config.js` | Cambio borderRadius de `0px` (Carbon) a `4-24px` | **No tocar** — `rounded-none` ES el look de Carbon |
| Fonts | Mantuvo IBM Plex Sans | Correcto (el brief decia Helvetica Neue pero se respeto la instruccion) |
| Layout/estructura | Implemento todas las secciones correctamente | Correcto |
| Dark mode | Implemento `dark:` variants | Correcto |
| Responsividad | Grids responsive en todos los breakpoints | Correcto |

**Resultado**: La estructura es fiel al wireframe, pero el DS fue destruido. Un boton que deberia ser `rounded-none bg-primary-500` (azul IBM, esquinas rectas) se convirtio en `rounded-full bg-black` (pill negro).

---

## La Solucion: Separar Estructura de Estilo

El agente necesita entender que un wireframe tiene dos capas:

```
┌─────────────────────────────────────────────┐
│  CAPA 1: ESTRUCTURA (del wireframe brief)   │
│  - Que secciones existen                    │
│  - Que contenido tiene cada seccion         │
│  - Como se organizan (grid, flex, stack)    │
│  - Responsive behavior por breakpoint       │
│  - Interacciones (hover, click, toggle)     │
│  - Semantica HTML (h1, h2, nav, footer)     │
│  - Contenido de ejemplo (textos, datos)     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  CAPA 2: ESTILO VISUAL (del repo DS)        │
│  - Colores → data/config/colors.js          │
│  - CSS Variables → css/globals.css          │
│  - Fonts → app/layout.tsx                   │
│  - Radii, shadows → tailwind.config.js      │
│  - Component patterns → shadcn/ui           │
└─────────────────────────────────────────────┘
```

**El agente debe tomar la Capa 1 del brief y la Capa 2 del repositorio.**

---

## Cambios Necesarios

### 1. Modificar CLAUDE.md

Agregar una seccion nueva que separe claramente los dos modos de operacion:

```markdown
## Wireframe Implementation (DS-Aware Mode)

When the user provides a UI wireframe/design brief and the repo already has a
Design System configured, the agent MUST:

### DO (take from the brief):
- Section composition and order
- Content hierarchy (headings, paragraphs, CTAs)
- Layout patterns (grid columns, flex direction, stacking)
- Responsive breakpoint behavior
- Interactive states (what happens on hover, what collapses on mobile)
- Sample content and data structure
- Semantic HTML structure

### DO NOT (preserve from the repo):
- `data/config/colors.js` — DO NOT modify
- `css/globals.css` — DO NOT modify
- `tailwind.config.js` — DO NOT modify
- `app/layout.tsx` font imports — DO NOT modify
- Design system identity (border radius, shadows, color palette, typography)

### Token Translation Rules

When the brief specifies visual tokens, translate them to the EXISTING DS:

| Brief dice | Repo DS tiene | Agente usa |
|------------|--------------|------------|
| "pill-shaped buttons (80px radius)" | `borderRadius.DEFAULT: 0px` (Carbon) | `rounded-none` (respeta Carbon) |
| "bg: #3F3F3F" | neutrals via Tailwind | `bg-neutral-700` (token mas cercano) |
| "primary action: black bg" | `primary.main: #0f62fe` | `bg-primary-500` (azul IBM) |
| "Helvetica Neue font" | IBM Plex Sans via `--font-space-default` | `font-sans` (usa la font del repo) |
| "card radius: 20px" | `borderRadius.xl: 8px` | `rounded-xl` (usa el token mas alto disponible) |
| "no shadows, flat cards" | `shadows.sm: subtle` | Respetar el brief si el DS no tiene opinion fuerte |

### How to detect which mode to use

- **DS Injection mode**: User says "inject", "migrate", "apply [Name] design system"
- **Wireframe mode (DS-Aware)**: User provides a UI brief/wireframe AND the repo already has a configured DS (check if `design-systems/*/design-system.config.json` exists or `colors.js` has non-default values)

### Trigger phrases for Wireframe mode:
- "implement this UI using the existing design system"
- "build this page respecting the current DS"
- "implement this wireframe" (when DS is already configured)
- Any UI brief that comes with a JSON design spec BUT the instruction says "use existing tokens"
```

### 2. Modificar el Prompt Template del Usuario

El prompt que el usuario envia al agente debe cambiar. Actualmente dice:

```
❌ ACTUAL (ambiguo):
"update @data/config/colors.js to match the colors in the design brief"
```

Debe decir:

```
✅ NUEVO (explicito):
"DO NOT modify design system config files (colors.js, globals.css,
tailwind.config.js, layout.tsx fonts). Use the EXISTING design tokens
to style the wireframe. Translate the brief's visual tokens to the
closest available DS tokens."
```

#### Prompt Template Completo (nuevo)

```markdown
Your task is to implement a new route on /[ROUTE], following the
wireframe brief below.

**CRITICAL: Design System Preservation**

This repo has a configured Design System. DO NOT modify these files:
- `data/config/colors.js` — use `bg-primary-*`, `bg-secondary-*` as-is
- `css/globals.css` — use `bg-background`, `text-foreground`, etc. as-is
- `tailwind.config.js` — use existing borderRadius, shadows, etc.
- `app/layout.tsx` — keep current font imports

Read the current Design System tokens from these files FIRST, then
implement the wireframe structure using ONLY those tokens.

When the brief specifies visual tokens (colors, radius, fonts),
translate them to the nearest existing DS token. Do NOT inject the
brief's tokens literally.

**Requirements**
- Responsive (full width bg with centered content on larger screens)
- Theme aware with light/dark mode (use Tailwind `dark:` classes)
- Include @ThemeSwitch.tsx in the header/menu
- No magic strings, hex values, or px values — Tailwind classes only
- Split reusable/complex parts into components
- Sample data in separate files

**Wireframe Brief**
<PASTE_WIREFRAME_JSON_HERE>
```

### 3. Crear regla de agente `.cursor/rules/wireframe-implementation.mdc`

Este es el archivo MAS IMPORTANTE. Le dice al agente exactamente como comportarse:

```markdown
---
description: When implementing a UI from a wireframe brief while preserving the existing Design System
globs:
  - "app/**/page.tsx"
  - "components/**/*.tsx"
alwaysApply: false
---

# Wireframe Implementation (DS-Aware Mode)

This rule applies when implementing UI from a wireframe/design brief
while PRESERVING the existing Design System.

## Pre-Implementation Checklist

Before writing any component code:

1. **Read the DS config**: `design-systems/[active]/design-system.config.json`
2. **Read current tokens**:
   - `data/config/colors.js` → know your primary/secondary palette
   - `css/globals.css` → know your semantic CSS variables
   - `tailwind.config.js` → know your radius, shadows, font stack
3. **Build a mental token map**: brief tokens → repo tokens

## Files you MUST NOT modify

| File | Why |
|------|-----|
| `data/config/colors.js` | The palette IS the brand identity |
| `css/globals.css` | Shadcn semantic variables are calibrated to the DS |
| `tailwind.config.js` | Radius, shadows, fonts define the DS personality |
| `app/layout.tsx` | Font imports are part of the DS |

## Token Translation Strategy

### Colors
- Brief says "black bg button" → Use `bg-primary-500` (the DS's primary action color)
- Brief says "outlined button with black border" → Use `border-primary-500` or `border-foreground`
- Brief says "surface_light: #F5F5F5" → Use `bg-muted` or `bg-neutral-100` (closest DS token)
- Brief says "surface_dark: #3F3F3F" → Use `bg-neutral-700` or `bg-card` in dark mode
- Brief says "text_secondary: gray_700" → Use `text-muted-foreground` (semantic) or `text-gray-700`

### Border Radius
- Brief says "pill: 80px" → Check DS. If DS is Carbon (0px), use `rounded-none` for buttons
- Brief says "card: 20px" → Use `rounded-xl` or whatever the DS's largest non-full radius is
- Brief says "chip: 10px" → Use `rounded-md` or `rounded-lg` per DS scale

### Typography
- Brief says "Helvetica Neue" → Use `font-sans` (resolves to DS font)
- Brief says "48px h1" → Use `text-5xl` (Tailwind token, close enough)
- Brief says "weight 400 headlines" → Use `font-normal` (override DS default if needed)
- Brief says "14px bold uppercase tracking" → Use `text-sm font-bold uppercase tracking-wider`

### Shadows
- Brief says "flat, no shadows" → If DS has subtle shadows, still use `shadow-sm` or `shadow-none`
- The DS shadow scale is authoritative

### Spacing
- Brief px values are layout INTENT, not literal requirements
- Translate to Tailwind scale: 120px → `px-8 lg:px-16`, 24px → `p-6`, etc.

## What TO extract from the wireframe

- **Section order**: Header → Hero → CTA → News → Highlights → Projects → Footer
- **Content**: Headlines, paragraphs, button labels, nav items
- **Layout grid**: "4 cards in a row at xl" → `grid-cols-1 md:grid-cols-2 xl:grid-cols-4`
- **Responsive behavior**: "stack on mobile, side-by-side on desktop"
- **Interactions**: "invert on hover", "collapse nav on mobile"
- **Semantics**: "h2 for sections, h3 for cards, time for dates"
- **Component decomposition**: Which parts are reusable

## Example: Translating a Button

Brief specifies:
```json
{
  "type": "outlined_pill",
  "border": "1px black",
  "bg": "transparent",
  "radius": 80,
  "hover": "invert to black bg + white text"
}
```

With IBM Carbon DS (radius 0px, blue primary):
```tsx
// Structure from brief: outlined button with invert hover
// Style from DS: sharp corners, primary blue color
<button className="
  border border-primary-500 bg-transparent text-primary-500
  hover:bg-primary-500 hover:text-white
  dark:border-primary-300 dark:text-primary-300
  dark:hover:bg-primary-300 dark:hover:text-gray-900
  rounded-none px-4 py-3 text-sm font-medium
  transition-colors
">
  Know more about EAPN
</button>
```

Note: rounded-full (pill) from brief → rounded-none (Carbon identity).
The INTERACTION (invert on hover) is preserved, but the VISUAL TOKENS
come from the DS.
```

### 4. Que NO cambiar en las reglas existentes

Las siguientes reglas ya estan bien y no necesitan modificacion:

- `tailwind-styling.mdc` — ya dice "use semantic color naming with numeric scale"
- `ui-components.mdc` — ya dice "use Shadcn UI components"
- `design-system-migration.mdc` — este es para el modo INYECCION, no wireframe
- `landing-components.mdc` — para paginas publicas, complementario

---

## Paso a Paso: Probarlo con IBM Carbon

### Paso 0: Restaurar el DS de IBM Carbon

Primero, hay que revertir los cambios que se hicieron a los config files:

```bash
# Desde la raiz del proyecto
git checkout main -- data/config/colors.js
git checkout main -- css/globals.css
git checkout main -- tailwind.config.js
```

Verificar que los archivos volvieron a IBM Carbon:
- `colors.js` tiene `main: '#0f62fe'` (azul IBM)
- `globals.css` tiene `--radius: 0rem`
- `tailwind.config.js` tiene `DEFAULT: '0px'` en borderRadius

### Paso 1: Crear la regla de wireframe

Crear el archivo `.cursor/rules/wireframe-implementation.mdc` con el contenido
de la Seccion 3 de este documento.

### Paso 2: Actualizar CLAUDE.md

Agregar la seccion "Wireframe Implementation (DS-Aware Mode)" de la Seccion 1
justo despues de la seccion "Design System Injection".

### Paso 3: Usar el Prompt Template Nuevo

Enviar al agente el siguiente prompt (adaptado):

```
Your task is to implement a new route on /dashboard, following the
wireframe brief below.

**CRITICAL: Design System Preservation**

This repo has IBM Carbon Design System configured. DO NOT modify:
- `data/config/colors.js`
- `css/globals.css`
- `tailwind.config.js`
- `app/layout.tsx` font imports

Read the current DS tokens from these files FIRST. Then implement the
wireframe using ONLY those existing tokens.

When the brief specifies visual tokens (colors like "#3F3F3F", radius
like "80px pill", fonts like "Helvetica Neue"), translate them to the
nearest EXISTING DS token (e.g., bg-neutral-700, rounded-none, font-sans).

**Requirements**
- Responsive with light/dark mode
- Include ThemeSwitch in header
- No hardcoded values — Tailwind classes only
- Components split logically
- Sample data in separate files

**Wireframe Brief**

<PASTE THE SAME JSON BRIEF HERE>
```

### Paso 4: Verificar el resultado

El agente deberia producir:

| Elemento | Con el brief literal (antes) | Con DS-Aware mode (esperado) |
|----------|------------------------------|------------------------------|
| Botones | `rounded-full bg-black` (pill negro) | `rounded-none bg-primary-500` (rect azul IBM) |
| Cards | `rounded-2xl` (20px corners) | `rounded-none` o `rounded-lg` (4px Carbon) |
| Color primario | `#57B4DD` (azul claro EAPN) | `#0f62fe` (azul IBM) |
| Font | Mantuvo IBM Plex (correcto) | IBM Plex Sans (sin cambios) |
| Shadows | Sin sombras (brief: flat) | `shadow-sm` sutil (Carbon) o sin sombras |
| Hero bg | `bg-neutral-700` | `bg-neutral-700` (esto no cambia, es un neutral) |
| Pill CTA | `rounded-full border-black` | `rounded-none border-primary-500` |
| Card borders | `border-gray-200` | `border` (usa CSS var de Carbon) |

### Paso 5: Checklist de Validacion

- [ ] `data/config/colors.js` — NO fue modificado (sigue con `#0f62fe`)
- [ ] `css/globals.css` — NO fue modificado (sigue con `--radius: 0rem`)
- [ ] `tailwind.config.js` — NO fue modificado (sigue con `DEFAULT: '0px'`)
- [ ] `app/layout.tsx` — NO fue modificado (sigue con `IBM_Plex_Sans`)
- [ ] Los botones usan `bg-primary-500` en vez de `bg-black`
- [ ] Los botones son `rounded-none` en vez de `rounded-full`
- [ ] Los colores de accent usan la paleta `primary-*` del repo
- [ ] La font renderizada es IBM Plex Sans
- [ ] Dark mode funciona correctamente
- [ ] La estructura (secciones, grids, contenido) es fiel al wireframe

---

## Resumen de Archivos a Crear/Modificar

| Archivo | Accion | Proposito |
|---------|--------|-----------|
| `.cursor/rules/wireframe-implementation.mdc` | **CREAR** | Regla de agente para modo wireframe |
| `CLAUDE.md` | **MODIFICAR** | Agregar seccion Wireframe Implementation |
| Prompt template (en este doc) | **DOCUMENTAR** | Nuevo template para el usuario |
| `data/config/colors.js` | **RESTAURAR** | Volver a IBM Carbon |
| `css/globals.css` | **RESTAURAR** | Volver a IBM Carbon |
| `tailwind.config.js` | **RESTAURAR** | Volver a IBM Carbon |

---

## Diagrama de Decision del Agente

```
Usuario envia brief de UI
        │
        ▼
┌─────────────────────────────┐
│ ¿El prompt dice "inject",   │
│ "migrate", o "apply DS"?    │
└─────────┬───────────────────┘
          │
    SI    │    NO
    ▼     │    ▼
┌─────────┐  ┌──────────────────────────┐
│ MODO    │  │ ¿Existe un DS configurado │
│ DS      │  │ en el repo? (colors.js    │
│ INJECT  │  │ tiene valores no-default) │
│         │  └────────┬─────────────────┘
│ Modifica│           │
│ configs │     SI    │    NO
│ + UI    │     ▼     │    ▼
└─────────┘  ┌─────────┐  ┌─────────┐
             │ MODO    │  │ MODO    │
             │ WIRE-   │  │ LIBRE   │
             │ FRAME   │  │         │
             │ DS-AWARE│  │ Puede   │
             │         │  │ usar    │
             │ NO toca │  │ tokens  │
             │ configs │  │ del     │
             │ USA     │  │ brief   │
             │ tokens  │  │ directo │
             │ del repo│  └─────────┘
             └─────────┘
```

---

## Notas Finales

### Por que el agente actual no lo hizo asi

1. **El prompt era ambiguo**: Decia "update colors.js to match the design brief" — instruccion explicita de modificar
2. **CLAUDE.md no distinguia modos**: Solo tenia "Design System Injection" como concepto
3. **No existia la regla de wireframe**: Sin `wireframe-implementation.mdc`, el agente no tenia guia para preservar tokens
4. **El brief venia con tokens detallados**: El JSON incluia paletas completas, lo que invito al agente a usarlas literalmente

### El cambio fundamental es de mentalidad

- **Antes**: El brief es la fuente de verdad para TODO (estructura + estilo)
- **Despues**: El brief es fuente de verdad para ESTRUCTURA, el repo es fuente de verdad para ESTILO
