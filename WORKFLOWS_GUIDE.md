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
     | IMAGEN de   |  | CODIGO UI  |  | WIREFRAME   |
     | web real    |  | de cualq.  |  | de Figma    |
     | (screenshot)|  | fuente     |  | (low-fi)    |
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

### Paso a Paso (2 steps)

Todos los workflows siguen un flujo de 2 pasos. Los prompts exactos estan en **[PROMPTS.md](PROMPTS.md)**.

#### Step 1: Generar el Brief (en cualquier LLM)

Adjunta la imagen/screenshot al LLM y usa el **prompt de Step 1 de Path 1** de [PROMPTS.md](PROMPTS.md#path-1-screenshot-of-real-website--faithful-clone).

El LLM genera:
- Un **JSONC design specification** (tokens, layout, componentes)
- Un **markdown implementation prompt** (brief para el desarrollador)

Guarda ambos outputs.

#### Step 2: Implementar (en el coding agent con el repo abierto)

Usa el **prompt de Step 2 de Path 1** de [PROMPTS.md](PROMPTS.md#path-1-screenshot-of-real-website--faithful-clone), pegando los dos outputs de Step 1 en los placeholders indicados.

El prompt le dice al agente que:
- Actualice `colors.js` para coincidir con la paleta del brief
- Use tokens de Tailwind (`bg-primary-500`) en vez de valores hardcodeados
- Soporte light/dark mode y responsive
- Divida en componentes reutilizables

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

## Path 2: Codigo UI (cualquier fuente) → Clone (Replicacion Fiel)

### Cuando usarlo

Tienes **codigo de una UI** que quieres replicar. El codigo puede venir de cualquier fuente: plugin de Figma (Figma to Code, Anima, Locofy), Mobbin, Variant UI, Dribbble, CodePen, bibliotecas de componentes, o cualquier otro recurso que te de codigo React/HTML/Tailwind.

### Prerequisitos

- Codigo de UI copiado de la fuente que prefieras.
- Ninguno en el repo.

### Paso a Paso (2 steps)

Los prompts exactos estan en **[PROMPTS.md](PROMPTS.md#path-2-ui-code-from-any-source--faithful-clone)**.

#### Step 1: Analizar el codigo UI (en cualquier LLM)

1. Copia el codigo de tu fuente (Figma export, Mobbin, Variant UI, etc.)
2. Pega el codigo en un LLM con el **prompt de Step 1 de Path 2**

El LLM genera los mismos 2 outputs que Path 1 (JSONC spec + markdown brief).

#### Step 2: Implementar (en el coding agent)

Usa el **prompt de Step 2 de Path 2**, que incluye un placeholder adicional para pegar el codigo UI original como referencia estructural.

#### Paso 3: Verificar

Mismo proceso que Path 1.

### Diferencia con Path 1

La unica diferencia es que el **input** es codigo en lugar de imagen. El codigo da al agente informacion estructural mas precisa (componentes, props, layout CSS) que complementa el JSON brief. Funciona con codigo de cualquier fuente — no solo Figma.

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

### Paso a Paso (2 steps)

Los prompts exactos estan en **[PROMPTS.md](PROMPTS.md#path-3-low-fi-wireframe--design-system--high-fidelity)**.

#### Step 1: Analizar el wireframe (en cualquier LLM)

1. Crea un wireframe low-fidelity (Figma, papel, Excalidraw, lo que sea)
2. Captura de pantalla del wireframe (PNG)
3. Adjuntala a un LLM con el **prompt de Step 1 de Path 3**

La diferencia clave con Path 1/2: el prompt indica al LLM que este es un wireframe low-fi, asi que debe enfocarse en **estructura, jerarquia y comportamiento** en lugar de tokens visuales exactos.

#### Step 2: Implementar con preservacion del DS (en el coding agent)

Usa el **prompt de Step 2 de Path 3**, que incluye la seccion critica **"Design System Preservation"**:

- Le dice al agente que NO modifique los 4 config files
- Le dice que lea los tokens existentes del DS PRIMERO
- Le dice que traduzca los tokens del wireframe a tokens del DS

#### Paso 3: Verificar

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
| **Input** | Screenshot web real | Codigo UI (cualquier fuente) | Wireframe low-fi |
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

Tienes 3 opciones. Los prompts y el schema JSON completo estan en **[PROMPTS.md](PROMPTS.md#creating-a-design-system-config)**.

| Opcion | Cuando usarla |
|--------|--------------|
| **A: Extraccion con LLM** | Tienes un brand guide (PDF, Figma, URL) — pegalo al LLM con el prompt de extraccion y genera el JSON automaticamente |
| **B: Template manual** | Conoces tus tokens y quieres llenarlos directamente en el template |
| **C: Extraer de web existente** | El DS ya esta implementado en un sitio web — captura screenshots y extrae tokens |

#### Secciones del config JSON

- **Obligatorias**: `name`, `colors` (primary + secondary, 5 shades), `cssVariables` (light + dark en HSL), `typography` (fontFamily minimo), `borderRadius`, `shadows`
- **Recomendadas para alta fidelidad**: `neutrals`, `semanticColors` + `semanticColorsDark`, `focus`, `transitions`
- **Avanzadas**: `componentOverrides` — dos formatos:
  - **CVA components** (Button, Badge): definir `base`, `variants`, `sizes` con strings de clases Tailwind completos
  - **Non-CVA components** (Switch, Checkbox, Toast): definir `classReplacements` con pares find/replace

Ver `design-systems/ibm-carbon/design-system.config.json` como ejemplo completo de todas las secciones.

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

Usa el prompt de [DS Injection en PROMPTS.md](PROMPTS.md#ds-injection) con IBM Carbon.

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

Captura de pantalla del wireframe → LLM con **Step 1 de Path 3** de [PROMPTS.md](PROMPTS.md#path-3-low-fi-wireframe--design-system--high-fidelity) → JSON brief.

### 4. Enviar prompt de Path 3

Usa el **Step 2 de Path 3** de [PROMPTS.md](PROMPTS.md#path-3-low-fi-wireframe--design-system--high-fidelity), pegando el brief generado en Step 1. El prompt incluye la seccion de DS Preservation que le dice al agente que no modifique los config files y traduzca tokens del wireframe a tokens Carbon.

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
