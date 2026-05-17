import { useState } from "react";
import { apiBase } from "../../api/client";

export function useStreamText() {
  const [visibleText, setVisibleText] = useState("");
  const [fullText, setFullText] = useState("");
  const [status, setStatus] = useState("idle");

  async function startStream() {
    setVisibleText("");
    setFullText("");
    setStatus("streaming");

    const response = await fetch(`${apiBase}/api/stream`);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let completeText = "";

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      completeText += chunk;

      for (const char of chunk) {
        setVisibleText((current) => current + char);
        await new Promise((resolve) => setTimeout(resolve, 8));
      }
    }

    setFullText(completeText);
    setVisibleText(completeText);
    setStatus("complete");
  }

  return {
    visibleText,
    fullText,
    status,
    startStream,
  };
}
