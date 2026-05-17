import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { PersonCard } from "./PersonCard";

export function PeopleVirtualList({ people }) {
  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: people.hasMore ? people.items.length + 1 : people.items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 136,
    overscan: 6,
  });
  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastVirtualIndex = virtualItems.at(-1)?.index;

  useEffect(() => {
    if (lastVirtualIndex !== undefined && lastVirtualIndex >= people.items.length - 1) {
      people.loadNext();
    }
  }, [lastVirtualIndex, people.items.length, people.loadNext]);

  if (!people.loading && !people.error && people.items.length === 0) {
    return <div className="notice list-notice">No matching profiles found.</div>;
  }

  return (
    <div ref={parentRef} className="virtual-list">
      <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: "relative" }}>
        {virtualItems.map((virtualRow) => {
          const person = people.items[virtualRow.index];

          return (
            <div
              className="virtual-row"
              key={virtualRow.key}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {person ? <PersonCard person={person} /> : <div className="notice">Loading more profiles...</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
