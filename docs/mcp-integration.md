# Model Context Protocol (MCP) Integration

DesignMint ships with a native **Model Context Protocol (MCP)** server, allowing AI coding assistants (like Antigravity, Claude, Cursor) to directly query, audit, and generate design tokens and components without leaving their workflow.

---

## 🚀 Setup MCP Server

Add DesignMint to your agent's MCP settings configuration:

### Global Configuration (`~/.config/mcp/settings.json` or IDE config)

```json
{
  "mcpServers": {
    "designmint": {
      "command": "node",
      "args": ["/path/to/design-mint/packages/mcp-server/dist/index.js"]
    }
  }
}
```

Or via npx once published:

```json
{
  "mcpServers": {
    "designmint": {
      "command": "npx",
      "args": ["@designmint/mcp-server"]
    }
  }
}
```

---

## 🛠️ Available MCP Tools

### 1. `recommend_component`
Ask the agent which component best satisfies a user requirement:
- **Agent Prompt**: *"What component should I use for picking 3 filter categories?"*
- **Returns**: Recommended component (`Chip` or `Checkbox`), reasoning, alternatives, and WCAG accessibility guidelines.

### 2. `get_component`
Get complete design tokens, prop definitions, and accessibility specs for any component:
- **Agent Prompt**: *"Give me the complete specification for Modal dialog"*
- **Returns**: ARIA role, keyboard shortcuts (Escape, Tab trap), screen reader traits, and token links.

### 3. `validate_contrast`
Verify WCAG compliance between any two hex colors:
- **Agent Prompt**: *"Is #2563EB on #FFFFFF compliant with WCAG AA?"*
- **Returns**: Contrast ratio (e.g. `5.17:1`), passes normal text (≥4.5:1), passes large text (≥3.0:1).

### 4. `suggest_palette`
Generate an accessible color scale and semantic colors from a single primary brand color:
- **Agent Prompt**: *"Suggest a palette based on primary color #7C3AED"*
- **Returns**: 50–950 shade spectrum, neutral gray scale, and semantic success/warning/error colors.

### 5. `audit_accessibility`
Run an instant automated WCAG audit on a brand palette.

### 6. `export_tokens`
Generate ready-to-paste CSS, Tailwind, Swift, Compose, or Flutter code on demand.
