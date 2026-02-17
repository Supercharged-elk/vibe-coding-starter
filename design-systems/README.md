# Design Systems

This directory holds Design System token manifests for injection into the repository.

## Structure

```
design-systems/
  ibm-carbon/
    design-system.config.json    <-- Token manifest (committed)
    ...cloned source files...    <-- NOT committed (.gitignore)
  polaris/
    design-system.config.json
  [your-client-ds]/
    design-system.config.json
```

## Usage

See `CUSTOM_DESIGN_INJECTION.md` in the root of this repo for the complete injection workflow.

## Quick Start

```bash
# Inject IBM Carbon (manifest already exists)
# Copy the prompt from CUSTOM_DESIGN_INJECTION.md Section 5
# Replace [DESIGN_SYSTEM_NAME] with "ibm-carbon"
```
