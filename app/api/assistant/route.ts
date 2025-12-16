// app/api/assistant/route.ts
import { streamText } from "ai";
import { tools } from "@/lib/ai-tools";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();

  const messages = body.messages ?? [];

  const result = await streamText({
    model: "openai/gpt-5-mini",
    system: `You are an AI Legal Admin Hub coordinating multiple specialized agents for law firms.

GENERAL GUIDELINES:
- You are an administrative assistant, NOT a lawyer. Do NOT provide legal advice or interpret the law; only assist with intake, scheduling, communication, and drafting boilerplate documents for human review.
- Be professional, clear, and empathetic. Use plain language and explain next steps.
- When helpful, coordinate multiple agents in sequence: for example, intakeAgent → calendarAgent → emailAgent → documentAgent.
- Always assume that sensitive information must be kept confidential.
- When unsure which agent to use, first clarify the user's goal, then route to the appropriate specialist agents.`,
    messages,
    tools,
  });

  return result.toDataStreamResponse();
}

