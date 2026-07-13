# AI Factory

Turn GitHub contributions into an agentic software factory visualisation.

AI Factory generates animated SVG contribution graphs where AI agents traverse the contribution grid, representing an agentic SDLC pipeline:

```text
💡 Idea → 🧠 Planner → 🤖 Builder → 🔍 Reviewer → 🛡️ Guardian → 🚀 Deploy
```

## Repository Structure

```text
aicontribution/
├── src/
│   ├── planner-agent/    # Analyses contributions and plans work items
│   ├── builder-agent/    # Processes planned items
│   ├── review-agent/     # Reviews built items for quality
│   ├── guardian-agent/   # Security and compliance checks
│   ├── deploy-agent/     # Deploys cleared items
│   └── engine/           # SVG generation engine
├── themes/
│   ├── github            # Light theme
│   ├── github-dark       # Dark theme
│   ├── azure             # Azure-branded theme
│   └── fabric            # Fabric-branded theme
├── examples/
│   └── svg/              # Example SVG outputs
├── action.yml            # GitHub Action definition
└── README.md
```

## Usage

### CLI

```bash
node src/index.js --theme github-dark --output output/ai-factory.svg
```

### GitHub Action

Add to your profile repository workflow:

```yaml
- uses: sujithq/aicontribution@main
  with:
    theme: github-dark
    output_path: output/ai-factory.svg
```

Then reference the generated SVG in your profile README:

```markdown
![AI Factory](https://raw.githubusercontent.com/sujithq/aicontribution/output/ai-factory.svg)
```

### Themes

| Theme | Description |
|-------|-------------|
| `github` | Default light theme matching GitHub's contribution graph |
| `github-dark` | Dark theme matching GitHub's dark mode |
| `azure` | Azure-branded blue theme |
| `fabric` | Microsoft Fabric neutral theme |

## Development

```bash
# Generate SVG
npm run generate

# Run tests
npm test
```

## License

MIT
