# mcp-harrypotter

Harry Potter API MCP (hp-api.onrender.com) — keyless.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `list_characters` | List Harry Potter characters (wizards, witches, and other figures). Optionally filter by Hogwarts house (Gryffindor, Slytherin, Hufflepuff, Ravenclaw) and/or a name substring. |
| `list_students` | Return all Hogwarts students from the HP API (up to 60), each with name, house, species, gender, ancestry, patronus, wand, actor, date of birth, and alive status. |
| `list_staff` | Return all Hogwarts staff members (professors and employees) from the HP API, each with name, house, species, gender, ancestry, patronus, wand, actor, date of birth, and alive status. |
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

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

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

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
