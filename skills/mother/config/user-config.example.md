# mother: user config (example)

Copy this file to `user-config.md` in the same folder, or let the skill fill it on first run.
`user-config.md` is git-ignored: your details never get committed.

Mother scans whatever skills, plugins, subagents and MCP servers you have installed, so it needs no
list of them here. It needs the two tools it uses to inspect the references you share, plus your
policy for external tools and where to install them.

| Placeholder | What it means | What the skill sends and expects back | Example tools (not required) |
|---|---|---|---|
| `{{TOOL_WEB_RESEARCH}}` | Fetching and searching the web, used to inspect reference URLs (competitor sites, design refs, docs). | Sends a URL or a search query. Expects the page text or a ranked list of results with URLs. | The agent's built-in web fetch and web search, Exa MCP, Firecrawl |
| `{{TOOL_POLICY}}` | Which external tools Mother may recommend and install. A hard gate on every app, CLI or model in a kit. | Not a tool: a rule Mother applies. | `free and local only`, `free (cloud OK)`, `any, prefer open source` |
| `{{INSTALL_ROOT}}` | Folder where approved local tools are installed, one subfolder per category and tool. | Not a tool: a path. | `D:\Tools`, `~/Tools` |
| `{{TOOL_DESIGN_FILE_ACCESS}}` | Reading a shared design file, used to pull palette, type and layout anchors from it. | Sends a design-file link or node id. Expects frame structure, styles and a rendered image of the frame. | Figma MCP server, Penpot MCP server, an exported PNG or PDF read directly |

## My values

TOOL_WEB_RESEARCH: {{TOOL_WEB_RESEARCH}}
TOOL_DESIGN_FILE_ACCESS: {{TOOL_DESIGN_FILE_ACCESS}}
TOOL_POLICY: {{TOOL_POLICY}}
INSTALL_ROOT: {{INSTALL_ROOT}}
