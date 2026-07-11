import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { createMcpHandler } from 'agents/mcp'
import { z } from 'zod'

export default {
  fetch: (req, env, ctx) => {
    const authHeader = req.headers.get('Authorization')
    const apiKey = authHeader?.replace('Bearer ', '')

    if (env.MCP_API_KEY && apiKey !== env.MCP_API_KEY) {
      return new Response('Unauthorized', { status: 401 })
    }

    const server = new McpServer({ name: 'GitHub Stars', version: '0.0.2' })
    server.registerTool(
      'search_github_stars',
      {
        description: 'Search GitHub Starred Repositories',
        inputSchema: { query: z.string() },
      },
      async ({ query }) => {
        const answer = await env.AI.autorag(env.AUTO_RAG_NAME).search({
          query,
        })

        return {
          content: [{ type: 'text', text: JSON.stringify(answer.data) }],
        }
      },
    )

    return createMcpHandler(server, { route: '/' })(req, env, ctx)
  },
}
