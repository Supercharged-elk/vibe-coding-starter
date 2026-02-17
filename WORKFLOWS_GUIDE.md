# Guia de Workflows: 3 Vias para Generar UI

Este repositorio soporta 3 caminos distintos para generar interfaces de usuario a partir de diferentes inputs. Cada uno tiene su propio prompt, reglas de agente, y comportamiento respecto a los archivos de configuracion del Design System.

---

## Resumen Visual

```
                    +------------------+
                    |  INPUT DEL       |
                    |  USUARIO         |
                    +--------+---------+
                             |
              +--------------+--------------+
              |              |              |
              v              v              v
     +--------+----+  +-----+------+  +----+--------+
     | IMAGEN de   |  | CODIGO     |  | WIREFRAME   |
     | web real    |  | exportado  |  | de Figma    |
     | (screenshot)|  | de Figma   |  | (low-fi)    |
     +--------+----+  +-----+------+  +----+--------+
              |              |              |
              v              v              |
     +--------+--------------+----+         |
     |                            |         |
     |  PATH 1 & 2: CLONE MODE   |         |
     |                            |         |
     |  Objetivo: Replicar el     |         |
     |  diseno fielmente          |         |
     |                            |         |
     |  Modifica config files:    |         |
     |  colors.js, globals.css,   |         |
     |  tailwind.config.js,       |         v
     |  layout.tsx                |  +------+--------+
     |                            |  |               |
     |  El brief define TODO:     |  | Prerequisito: |
     |  estructura + estilo       |  | Inyectar DS   |
     +----------------------------+  |               |
                                     +------+--------+
                                            |
                                            v
                                     +------+--------+
                                     |               |
                                     | PATH 3:       |
                                     | WIREFRAME ->  |
                                     | HIGH FIDELITY |
                                     |               |
                                     | NO modifica   |
                                     | config files  |
                                     |               |
                                     | El wireframe  |
                                     | da estructura,|
                                     | el DS da      |
                                     | estilo        |
                                     +---------------+
```

---

## Path 1: Imagen → Clone (Replicacion Fiel)

### Cuando usarlo

Tienes una **captura de pantalla de una web real** (o un diseno high-fidelity en Figma) y quieres replicarla fielmente en el repositorio.

### Prerequisitos

- Ninguno. El repo puede estar en estado por defecto.

### Paso a Paso

#### Paso 1: Generar el JSON Brief

Toma la imagen/screenshot y pasala a un LLM (Claude, GPT, etc.) con un prompt como:

```
Analiza esta imagen de una pagina web y genera un JSON brief detallado
con las siguientes secciones:
- meta (scope, layout notes)
- design_tokens (color palettes, typography, radii, spacing, shadows)
- layout_system (container, responsive rules)
- components (cada seccion con structure, interactions, light/dark mode, responsive)
- interaction_states
- accessibility_and_content_rules
```

#### Paso 2: Enviar al agente con el prompt de Clone Mode

```
Your task is to implement a new route on /[RUTA], following the
design + development brief below. Implement thoroughly, in a
step-by-step manner, and use built-in, standard Tailwind CSS design
tokens instead of hardcoding values.

For colors and font families, use the defined values present in
@tailwind.config.js, e.g. 'bg-primary-500' etc. instead of the
hardcoded primary/secondary values in the JSON brief. For one-off
colors/grays etc. the JSON values are acceptable.

**Requirements**

- responsive (full width bg with centered content on larger screens)
- theme aware components with light and dark mode support (you can
  toggle with @ThemeSwitch.tsx; make sure to include that in the
  menu bar)
  - update @data/config/colors.js to match the colors in the
    design brief
  - *important* make sure to include light and dark mode colors by
    using Tailwind's dark mode classes (dark:)
  - all components must adapt to theme changes
- *do not use* magic strings, hex values, or px values. Replace all
  with Tailwind classes if possible.
- split reusable or complex parts of the UI into components so the
  code is maintainable and easy to understand.
- if any sample data is generated, place it in a separate file to
  keep the code clean.

**Note**

- the app is already running a dev server at port 6006

**Assignment brief**

<PEGAR JSON BRIEF AQUI>

**Design specification**

<PEGAR JSONC DESIGN SPECIFICATION AQUI>
```

#### Paso 3: Verificar

- Abrir `http://localhost:6006/[RUTA]`
- Comparar con la imagen original
- Verificar dark mode
- Verificar responsividad

### Que hace el agente

1. Lee el JSON brief para extraer tokens de diseno
2. **Actualiza** `data/config/colors.js` con la paleta del brief
3. **Actualiza** `css/globals.css` con las CSS variables del brief
4. **Actualiza** `tailwind.config.js` con borderRadius/shadows del brief
5. **Actualiza** `app/layout.tsx` con la fuente del brief
6. Implementa toda la estructura y componentes
7. El resultado es un **clon visual** del input

### Regla de agente activa

`@.cursor/rules/clone-implementation.mdc`

---

## Path 2: Codigo Figma → Clone (Replicacion Fiel)

### Cuando usarlo

Tienes **codigo exportado de Figma** (via un plugin como Figma-to-Tailwind o Figma-to-React) y quieres replicarlo fielmente.

### Prerequisitos

- Plugin de Figma instalado (Figma to Code, Anima, Locofy, etc.)
- Ninguno en el repo.

### Paso a Paso

#### Paso 1: Exportar desde Figma

Usa el plugin de Figma para exportar el diseno como codigo React/Tailwind.

#### Paso 2: Generar el JSON Brief

Pasa el codigo exportado a un LLM para generar el JSON brief:

```
Analiza este codigo exportado de Figma y genera un JSON brief detallado
con design_tokens, layout_system, components, etc.

<PEGAR CODIGO EXPORTADO>
```

#### Paso 3: Enviar al agente

Usa exactamente el **mismo prompt que Path 1**, pero incluye el codigo exportado como contexto adicional:

```
Your task is to implement a new route on /[RUTA], following the
design + development brief below.

[... mismo prompt que Path 1 ...]

**Assignment brief**

<PEGAR JSON BRIEF>

**Design specification**

<PEGAR JSONC DESIGN SPECIFICATION>

**Exported Figma code (reference)**

<PEGAR CODIGO EXPORTADO DE FIGMA>
```

#### Paso 4: Verificar

Mismo proceso que Path 1.

### Diferencia con Path 1

La unica diferencia es que el **input** es codigo en lugar de imagen. El codigo exportado da al agente informacion estructural mas precisa (componentes, props, layout CSS) que complementa el JSON brief.

### Regla de agente activa

`@.cursor/rules/clone-implementation.mdc`

---

## Path 3: Wireframe → High Fidelity (con Design System)

### Cuando usarlo

Tienes un **wireframe** (boceto, baja fidelidad) y quieres convertirlo en una UI de alta fidelidad usando un Design System especifico que ya esta inyectado en el repo.

### Prerequisitos

**CRITICO: Debes inyectar un DS antes de usar este path.**

1. Tener un DS en `./design-systems/[nombre]/design-system.config.json`
2. Inyectarlo al repo con el prompt:
   ```
   Inject the [nombre] Design System into this repository.
   Follow @.cursor/rules/design-system-migration.mdc
   ```
3. Verificar que los 4 config files fueron actualizados:
   - `data/config/colors.js` — tiene la paleta del DS
   - `css/globals.css` — tiene las CSS variables del DS
   - `tailwind.config.js` — tiene borderRadius/shadows del DS
   - `app/layout.tsx` — tiene la fuente del DS

### Paso a Paso

#### Paso 1: Crear el wireframe en Figma

Crea un wireframe low-fidelity en Figma (cajas grises, texto placeholder, estructura basica).

#### Paso 2: Exportar como imagen o codigo

- **Opcion A**: Captura de pantalla del wireframe (PNG)
- **Opcion B**: Exportar codigo via plugin de Figma

#### Paso 3: Generar el JSON Brief

Pasa la imagen/codigo a un LLM para generar el JSON brief. El brief tendra tokens genericos (negros, grises, tipografia basica) porque es un wireframe.

#### Paso 4: Enviar al agente con el prompt de Wireframe Mode

```
Your task is to implement a new route on /[RUTA], following the
wireframe brief below.

**CRITICAL: Design System Preservation**

This repo has [NOMBRE DS] Design System configured. DO NOT modify:
- `data/config/colors.js`
- `css/globals.css`
- `tailwind.config.js`
- `app/layout.tsx` font imports

Read the current DS tokens from these files FIRST. Then implement the
wireframe using ONLY those existing tokens.

When the brief specifies visual tokens (colors like "#3F3F3F", radius
like "80px pill", fonts like "Helvetica Neue"), translate them to the
nearest EXISTING DS token (e.g., bg-neutral-700, rounded-none,
font-sans).

**Requirements**
- Responsive with light/dark mode (Tailwind `dark:` classes)
- Include ThemeSwitch in header
- No hardcoded hex values, px values, or magic strings
- Components split logically into separate files
- Sample data in separate files under `data/`

**Wireframe Brief**

<PEGAR JSON BRIEF DEL WIREFRAME>
```

#### Paso 5: Verificar

- Abrir `http://localhost:6006/[RUTA]`
- Verificar que la **estructura** es fiel al wireframe
- Verificar que el **estilo** es del DS (colores, fuentes, radii, shadows)
- Verificar que los config files NO fueron modificados:
  ```bash
  git diff data/config/colors.js css/globals.css tailwind.config.js app/layout.tsx
  ```

### Que hace el agente

1. Lee los config files para conocer los tokens del DS
2. Lee el JSON brief para entender la estructura del wireframe
3. **NO toca** ningun config file
4. Traduce los tokens del wireframe a tokens del DS:
   - `pill buttons` → `rounded-none` (si el DS es Carbon)
   - `black bg` → `bg-primary-500` (color primario del DS)
   - `Helvetica Neue` → `font-sans` (fuente del DS)
5. Implementa la estructura del wireframe con estilo del DS

### Regla de agente activa

`@.cursor/rules/wireframe-implementation.mdc`

---

## Comparacion de los 3 Paths

| Aspecto | Path 1 (Imagen Clone) | Path 2 (Codigo Clone) | Path 3 (Wireframe HiFi) |
|---------|:---------------------:|:---------------------:|:------------------------:|
| **Input** | Screenshot web real | Codigo Figma export | Wireframe low-fi |
| **Output** | Clon visual del input | Clon visual del input | HiFi con estilo del DS |
| **Modifica colors.js** | SI | SI | NO |
| **Modifica globals.css** | SI | SI | NO |
| **Modifica tailwind.config** | SI | SI | NO |
| **Modifica layout.tsx** | SI | SI | NO |
| **Prerequisito DS** | No | No | SI (debe inyectarse antes) |
| **Fuente de estilo** | El brief (input) | El brief (input) | El DS del repo |
| **Fuente de estructura** | El brief (input) | El brief (input) | El wireframe (input) |
| **Cursor rule** | clone-implementation | clone-implementation | wireframe-implementation |

---

## Inyeccion de Design System (prerequisito para Path 3)

### Que es una inyeccion de DS

La inyeccion toma un Design System completo definido en un JSON config y lo aplica a todo el repositorio: config files, CSS variables, semantic tokens, tipografia, y overrides a nivel de componente. El resultado es un repo que genera UI fiel al DS sin necesidad de especificar estilos manualmente.

### Que cubre la inyeccion (High-Fidelity)

| Nivel | Que cambia | Impacto |
|-------|-----------|---------|
| **Config files** | colors.js, globals.css, tailwind.config.js, layout.tsx | ~80% de fidelidad visual |
| **Semantic colors** | Variables CSS `--ds-*` (interactive, danger, warning, success, focus, etc.) | Estados y feedback |
| **Neutrals** | Variables CSS `--ds-neutral-*` | Escala de grises del DS |
| **Typography scale** | Clases `text-ds-*` en Tailwind | Tipografia named sizes |
| **Focus ring** | Patron de focus outline en todos los componentes | Accesibilidad |
| **Component overrides** | Clases Tailwind en Button, Badge, Switch, Checkbox, Tabs, Toast, etc. | ~20% restante de fidelidad |
| **Transitions** | Duraciones y easing del DS | Motion/animation |

### Design Systems disponibles

Los DS se almacenan en `./design-systems/[nombre]/design-system.config.json`.

Actualmente disponible:
- `ibm-carbon` — IBM Carbon Design System v11

### Como inyectar un DS

```
Inject the [NOMBRE] Design System into this repository.
Follow @.cursor/rules/design-system-migration.mdc
Use the config at ./design-systems/[nombre]/design-system.config.json
```

### Como crear un nuevo DS

1. Copiar el template: `cp design-systems/TEMPLATE.config.json design-systems/[nombre]/design-system.config.json`
2. Rellenar TODAS las secciones del JSON:
   - **Obligatorias**: `name`, `colors`, `cssVariables` (light + dark), `typography`, `borderRadius`, `shadows`
   - **Recomendadas**: `neutrals`, `semanticColors`, `semanticColorsDark`, `spacing`, `focus`, `transitions`, `componentOverrides`
3. Para `componentOverrides`, hay dos formatos:
   - **CVA components** (Button, Badge): definir `base`, `variants`, `sizes` con strings de clases Tailwind completos
   - **Non-CVA components** (Switch, Checkbox, Toast): definir `classReplacements` con pares find/replace de fragmentos de clases
4. Ver `design-systems/ibm-carbon/design-system.config.json` como ejemplo completo

### Schema del Config JSON

```
design-system.config.json
├── name, version, source, description
├── colors                    → Paleta primary/secondary (5 shades cada una)
├── neutrals                  → Escala de grises 50-900
├── cssVariables.light/dark   → Variables Shadcn (HSL format)
├── semanticColors            → 25+ tokens funcionales (interactive, danger, focus, link, etc.)
├── semanticColorsDark        → Versiones dark mode de semantic colors
├── typography                → Font families, weights, 13 named sizes
├── borderRadius              → Escala none → full
├── shadows                   → Escala sm → xl
├── spacing                   → Base unit, scale, component spacing
├── focus                     → Focus ring specification + Tailwind pattern
├── transitions               → Duration fast/moderate/slow, easing curves
├── componentOverrides        → Per-component class overrides (CVA + classReplacements)
└── notes                     → Filosofia del DS (radius, color, typography)
```

---

## Arquitectura del Repo: Dual Color System

Este repo tiene DOS sistemas de color que trabajan juntos:

| Sistema | Archivo | Clases que genera | Usado por |
|---------|---------|-------------------|-----------|
| **Paleta numerica** | `data/config/colors.js` | `bg-primary-100` a `bg-primary-900` | Botones, CTAs, badges |
| **Variables semanticas** | `css/globals.css` | `bg-background`, `text-foreground`, `bg-card` | Cards, dialogs, inputs |
| **DS semantic tokens** | `css/globals.css` (`--ds-*`) | `bg-[--ds-interactive]`, `text-[--ds-danger]` | Estados, feedback, focus |
| **DS neutrals** | `css/globals.css` (`--ds-neutral-*`) | `bg-[--ds-neutral-50]`, etc. | Grises especificos del DS |

**En Paths 1/2**: Paleta numerica y vars semanticas se actualizan para coincidir con el brief.
**En Path 3**: Ninguno se modifica; ya contienen los tokens del DS inyectado.

---

## Archivos de Configuracion del Agente

| Archivo | Proposito |
|---------|-----------|
| `CLAUDE.md` | Instrucciones principales del agente, decision diagram |
| `.cursor/rules/clone-implementation.mdc` | Regla para Paths 1 & 2 (Clone Mode) |
| `.cursor/rules/wireframe-implementation.mdc` | Regla para Path 3 (Wireframe → HiFi) |
| `.cursor/rules/design-system-migration.mdc` | Regla para inyeccion de DS (prerequisito Path 3) |
| `.cursor/rules/design-system-brand.mdc` | Regla de identidad del DS activo (generada al inyectar) |
| `design-systems/TEMPLATE.config.json` | Template generico para crear nuevos DS |

---

## Ejemplo Completo: Path 3 con IBM Carbon

### 1. Inyectar el DS

```
Inject the IBM Carbon Design System.
Use ./design-systems/ibm-carbon/design-system.config.json
```

La inyeccion completa:
- Actualiza los 4 config files (colors, globals, tailwind, layout)
- Agrega variables `--ds-*` para semantic colors y neutrals
- Agrega clases `text-ds-*` para la typography scale
- Aplica `componentOverrides` a ~15 componentes (Button, Badge, Switch, Checkbox, Tabs, Toast, etc.)
- Corrige colores hardcodeados (bg-green-500, text-red-300, bg-black/80)
- Actualiza el patron de focus ring
- Genera `.cursor/rules/design-system-brand.mdc` con la identidad Carbon

Resultado: colores azul IBM (#0f62fe), fuente IBM Plex Sans, border-radius 0px, focus outline azul, shadows sutiles, tabs underline.

### 2. Crear wireframe en Figma

Disena un wireframe basico: cajas grises, texto placeholder, estructura de secciones.

### 3. Exportar y generar brief

Captura de pantalla del wireframe → LLM → JSON brief.

### 4. Enviar prompt de Path 3

```
Your task is to implement a new route on /dashboard, following the
wireframe brief below.

**CRITICAL: Design System Preservation**
This repo has IBM Carbon Design System configured. DO NOT modify:
- data/config/colors.js
- css/globals.css
- tailwind.config.js
- app/layout.tsx font imports

[... wireframe brief ...]
```

### 5. Resultado esperado

| Elemento | Wireframe decia | Agente implementa |
|----------|-----------------|-------------------|
| Botones | `rounded-full bg-black` | `rounded-none bg-primary-500` (IBM Blue, esquinas rectas) |
| Cards | `rounded-2xl` (20px) | `rounded-lg` (4px Carbon) |
| Color primario | Negro o generico | `#0f62fe` (azul IBM) |
| Fuente | Helvetica Neue | IBM Plex Sans |
| Sombras | Flat/none | `shadow-sm` (Carbon sutil) |
| Focus ring | Default ring | `outline-2 outline-[--ds-focus]` (azul 2px) |
| Tabs | Pill style | Underline con border-b-2 |
| Danger button | Red generico | `bg-[--ds-danger]` (#da1e28) |
