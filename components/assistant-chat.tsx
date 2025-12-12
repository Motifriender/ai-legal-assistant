// components/assistant-chat.tsx
"use client";

import { useEffect, useState } from "react";
import { useAssistant } from "ai/react";

export function AssistantChat() {
  const {
    status,
    messages,
    input,
    handleInputChange,
    submitMessage,
  } = useAssistant({
    api: "/api/assistant",
  });

  const [prefill, setPrefill] = useState<string | null>(null);

  // Listen for prefill events from the /assistant page
  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setPrefill(customEvent.detail);
    };
    window.addEventListener("assistant-prefill", handler);
    return () => window.removeEventListener("assistant-prefill", handler);
  }, []);

  useEffect(() => {
    if (prefill) {
      // Set the input to the prefill text
      handleInputChange({
        target: { value: prefill } as any,
      });
      setPrefill(null);
    }
  }, [prefill, handleInputChange]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
        {messages.length === 0 && (
          <div className="text-muted-foreground text-xs sm:text-sm">
            I can help you:
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Collect intake details from new clients</li>
              <li>Schedule or reschedule consultations</li>
              <li>Confirm what happens after an after-hours call</li>
            </ul>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-lg px-3 py-2 max-w-[85%] ${
              m.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "mr-auto bg-muted"
            }`}
          >
            <div className="whitespace-pre-wrap text-xs sm:text-sm">
              {m.display ?? m.content}
            </div>
          </div>
        ))}

        {status === "in_progress" && (
          <div className="mr-auto rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            Thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitMessage();
        }}
        className="border-t p-3 flex gap-2"
      >
        <input
          className="flex-1 border rounded-md px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me to book a consultation, reschedule, or confirm an after-hours call..."
        />
        <button
          type="submit"
          disabled={status === "in_progress"}
          className="px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm disabled:opacity-60"
        >
          Send
        </button>
      </form>
    </div>
  );
}
