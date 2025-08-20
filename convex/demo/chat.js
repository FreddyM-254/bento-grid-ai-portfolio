import { Agent } from "@convex-dev/agent"
import { components } from "../_generated/api";
import { mutation } from "../_generated/server"
import { google } from "@ai-sdk/google"

const DEMO_USER_ID = "demo-user-123"


const myAgent = new Agent(components.agent,{
    chat: google.chat("gemini-2.0-flash"),
    instructions: "You are a helpful assistant on Freddy's portfolio website. Keep your answers concise",
    textEmbedding: google.textEmbeddingModel('text-embedding-004')
})



export const createThread = mutation({
    args: {},
    handler: async (ctx) => {
        const { threadId } = await myAgent.createThread(ctx, {
              userId: DEMO_USER_ID
          }
          ) 
          return threadId
    }
})