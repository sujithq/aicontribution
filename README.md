# AI Contribution Factory

This repository contains the AI Factory logic that generates contribution
artifacts.

## Repository Boundaries

- `sujithq/aicontribution`: source of truth for AI Factory code, templates, and
  generation workflows.
- `sujithq/sujithq`: consumer repository for generated profile output,
  profile-specific assets, and contribution visualizations.

Keeping generation logic here and consumption logic in the profile repository
keeps responsibilities clean and allows each repository to evolve independently.
