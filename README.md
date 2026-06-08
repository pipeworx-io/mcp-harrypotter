# mcp-harrypotter

Harry Potter API MCP (hp-api.onrender.com) — keyless.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 776+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `list_students` | List all Hogwarts students from the Harry Potter universe. |
| `list_staff` | List all Hogwarts staff (professors and other employees) from the Harry Potter universe. |
| `list_spells` | List Harry Potter spells with their effects. Optionally filter by a spell-name substring. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "harrypotter": {
      "url": "https://gateway.pipeworx.io/harrypotter/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 776+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Harrypotter data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
