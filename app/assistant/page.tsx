// app/assistant/page.tsx
"use client";

import { AssistantChat } from "@/components/assistant-chat";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

const SUGGESTED_PROMPTS = [
  "I'm a new client and I want to book a consultation.",
  "I'm an existing client and I need to reschedule my appointment.",
  "I left a message after hours. Can you confirm what happens next?",
];

export default function AssistantPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="inline-flex items-center text-sm px-3 py-1 rounded-md border hover:bg-muted transition">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </button>
              </Link>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-semibold text-sm sm:text-base">
                  AI Legal Assistant
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Quick-start prompts */}
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("assistant-prefill", { detail: prompt }),
                  )
                }
                className="border rounded-full px-3 py-1 hover:bg-muted transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          <section className="border rounded-xl bg-card shadow-sm h-[calc(100vh-240px)] flex flex-col">
            <AssistantChat />
          </section>
        </div>
      </main>
    </div>
  );
}
