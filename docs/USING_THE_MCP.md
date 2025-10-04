# Using the KiCad MCP Server

## Important: This is a Mock Implementation

**The KiCad MCP currently uses a MOCK client** - it does NOT create actual KiCad files or interact with real KiCad software. This is because:

1. KiCad's IPC (Inter-Process Communication) protocol is not yet available
2. The server demonstrates the API and workflow for future real integration
3. All operations return simulated results for development and testing

## What The MCP Does

When you use KiCad MCP tools in Claude Desktop, the server:

- ✅ Accepts your commands and validates parameters
- ✅ Returns JSON responses confirming operations
- ✅ Maintains mock project state in memory
- ❌ Does NOT create actual `.kicad_pro`, `.kicad_sch`, or `.kicad_pcb` files
- ❌ Does NOT open KiCad software
- ❌ Does NOT generate real Gerber files or 3D models

## How to Use It

### 1. In Claude Desktop

Once configured (see main README.md), you can interact with the MCP using natural language:

```
User: Create a new KiCad project called "my-led-board"
Claude: [Uses kicad_init_project tool]
Result: JSON response confirming project creation
```

### 2. Understanding Responses

The MCP returns **JSON responses** that Claude Desktop processes. You won't see files created on disk - instead, you'll see JSON like:

```json
{
  "success": true,
  "projectPath": "./my-led-board/my-led-board",
  "message": "Project 'my-led-board' created successfully"
}
```

### 3. Common Workflows

#### Create a Project

```
"Create a 4-layer ESP32 development board project"
```

The MCP will:

- Parse your requirements (4 layers, ESP32)
- Select or create appropriate template
- Return mock project information

#### Add Components

```
"Add an ATtiny85 microcontroller at position 50,50mm"
```

The MCP will:

- Validate component parameters
- Store component in mock board state
- Return component details with auto-generated reference (e.g., "U1")

#### Run Checks

```
"Run DRC and ERC checks on the project"
```

The MCP will:

- Simulate running design rule checks
- Return mock results (usually pass with warnings)

## Viewing Results

Since this is a mock implementation:

1. **No files are created** - all project state exists only in memory
2. **No KiCad GUI opens** - the MCP doesn't launch KiCad
3. **Results are in JSON** - Claude Desktop processes and summarizes them for you
4. **State resets** - when you restart Claude Desktop, all mock projects are cleared

## What You See

- ✅ Claude will confirm actions ("Added component U1")
- ✅ Claude can list components, check results, etc.
- ❌ You won't see files in your filesystem
- ❌ KiCad won't open automatically

## When Will It Work For Real?

Once KiCad releases their IPC protocol (planned for KiCad 9+), we'll replace `MockKiCadClient` with `IPCKiCadClient`, and then:

- Real `.kicad_pcb` files will be created
- KiCad will open and show your designs
- Gerber exports will generate actual manufacturing files
- 3D models will be real STEP/VRML files

## Debugging

If you see errors like:

```
Unexpected token 'A', "Adding met"... is not valid JSON
```

This means:

1. The server outputted text before JSON (fixed in latest version)
2. Make sure you're running the latest built version: `pnpm build`
3. Restart Claude Desktop after rebuilding

## Testing the MCP

You can test the server directly:

```bash
# Test with MCP CLI
npx fastmcp dev packages/mcp-server/dist/index.js

# Inspect with MCP Inspector
npx fastmcp inspect packages/mcp-server/dist/index.js
```

## Current Capabilities (Mock Mode)

- ✅ Project creation with templates
- ✅ Component placement and listing
- ✅ DRC/ERC checks (always pass in mock)
- ✅ BOM generation (returns mock path)
- ✅ 3D model generation (returns mock path)
- ✅ Auto-routing (simulates success)
- ✅ Export operations (returns mock file paths)

## Future Capabilities (Real Mode)

When KiCad IPC is available:

- Real project file creation
- Real-time KiCad GUI updates
- Actual component placement visible in KiCad
- True DRC/ERC with real violations
- Manufacturing-ready Gerber files
- Actual STEP/VRML 3D models
- Integration with supplier APIs for BOM pricing

## FAQ

**Q: Why don't I see any files created?**
A: This is a mock implementation. Files will only be created once KiCad IPC is available.

**Q: Will KiCad open automatically?**
A: Not in mock mode. In the future with real IPC, KiCad will open and show your designs.

**Q: Can I import the mock projects into KiCad?**
A: No, they don't create actual files. This is for API demonstration only.

**Q: When will real KiCad integration be ready?**
A: It depends on when the KiCad team releases their IPC protocol (expected in KiCad 9+).

**Q: Is this useful even as a mock?**
A: Yes! It:

- Demonstrates the workflow
- Lets you plan PCB projects with AI
- Tests the MCP architecture
- Provides a development platform for when IPC arrives

## Getting Help

- 📖 [Main README](../README.md)
- 🐛 [Report Issues](https://github.com/muammar-yacoob/kicad-mcp/issues)
- 💬 [Discussions](https://github.com/muammar-yacoob/kicad-mcp/discussions)
