import { memo } from "react";
import { SectionHeader } from "../../components/SectionHeader";
import { useStreamText } from "./useStreamText";

function StreamReaderComponent() {
  const stream = useStreamText();
  const isStreaming = stream.status === "streaming";
  const action = (
    <button onClick={stream.startStream} disabled={isStreaming}>
      {isStreaming ? "Streaming..." : "Start stream"}
    </button>
  );

  return (
    <section className="panel">
      <SectionHeader title="Streaming Response" action={action} />
      <pre className="stream-box">{stream.visibleText || "Stream output will appear here."}</pre>
      {stream.fullText && <p className="complete-note">Stream closed. Full response rendered.</p>}
    </section>
  );
}

export const StreamReader = memo(StreamReaderComponent);
