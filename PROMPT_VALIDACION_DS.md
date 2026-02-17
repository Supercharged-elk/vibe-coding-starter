# Contexto para Validación de Design System Injection

## Situación Actual

Tenemos un repositorio "Vibe Coding Starter" que usa:

- **Next.js 15** con App Router
- **React 19** + TypeScript
- **Tailwind CSS** para estilos
- **Shadcn UI** (55+ componentes base en `components/shared/ui/`)
- **Agentes de IA**: Cursor (`.cursor/rules/`) y Claude (`.claude/`, `CLAUDE.md`)

El repo funciona así:

1. Usuario pide: "Create a dashboard"
2. Agente genera frontend usando componentes Shadcn + tokens por defecto

## Lo que Intentamos Agregar

Queremos agregar **DOS FASES** al flujo:

### FASE 1: Inyección de Design System

Antes de pedir cualquier frontend, el usuario debe poder:

1. Descargar un Design System de un cliente a `./design-systems/[nombre]/`
2. Ejecutar un prompt de inyección
3. El agente transforma TODO el repo al DS del cliente:
   - Tokens (colores, tipografía, spacing)
   - CSS Variables
   - Tailwind config
   - **CRÍTICO**: Adapta los 55+ componentes Shadcn existentes manteniendo su estructura/API pero cambiando las clases Tailwind al estilo del DS
   - Crea reglas del agente para futuras generaciones

### FASE 2: Generación Normal

Después de la inyección, cuando el usuario pide:
"Create a login form"

El agente usa **automáticamente** el DS del cliente sin especificar colores.

## Archivos que Modificamos

1. **`.cursor/rules/design-system-migration.mdc`** - Guía de migración genérica
2. **`CLAUDE.md`** - Referencia a la inyección
3. **`CUSTOM_DESIGN_INJECTION.md`** - Documentación + prompt copiable

## Objetivo de esta Solicitud

1. **Validar el approach**: ¿Es correcto? ¿Falta algo? ¿Hay errores conceptuales?
2. **Corregir archivos**: Si hay problemas en los `.mdc`, `CLAUDE.md`, o `CUSTOM_DESIGN_INJECTION.md`, corrige
3. **Preparar para prueba**: Queremos probar con un DS real (ej: IBM Carbon, o cualquier otro que recomiendes que funcione bien con este flujo)
4. **Estandarizar el proceso**: Definir claramente cómo debe ser la estructura de un DS para que funcione con este flujo

## Preguntas Clave para Validar

1. ¿El flujo de "adaptar clases Tailwind mientras se preserva estructura" es viable?
2. ¿Los prompts actuales son claros para un agente?
3. ¿Qué tipo de DS funciona mejor? (¿IBM Carbon? ¿MUI? ¿Otro?)
4. ¿Falta algún paso crítico en la migración?
5. ¿Cómo manejamos componentes específicos del DS que no existen en Shadcn?

## Tu Tarea

1. **Lee** los archivos modificados (`.cursor/rules/design-system-migration.mdc`, `CLAUDE.md`, `CUSTOM_DESIGN_INJECTION.md`)
2. **Valida** si el approach es correcto o tiene fallas
3. **Corrige** los archivos si encuentras errores o mejoras
4. **Recomienda** un DS específico para probar (IBM Carbon, o mejor opción)
5. **Prepara** todo para que podamos ejecutar la prueba inmediatamente

**IMPORTANTE**: El objetivo final es tener un flujo estándar que funcione para cualquier cliente que tenga un DS, permitiendo inyectarlo y luego generar frontends automáticamente con ese estilo.

Por favor, analiza todo y devuélveme los archivos corregidos + instrucciones claras para la prueba.
