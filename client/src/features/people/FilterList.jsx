import { SectionHeader } from "../../components/SectionHeader";

export function FilterList({ title, items, active, onSelect }) {
  const clearButton = active ? <button onClick={() => onSelect("")}>Clear</button> : null;

  return (
    <section className="filter-section">
      <SectionHeader title={title} action={clearButton} />
      <div className="filter-list">
        {items.map((item) => (
          <button
            className={active === item.name ? "filter active" : "filter"}
            key={item.name}
            onClick={() => onSelect(active === item.name ? "" : item.name)}
          >
            <span>{item.name}</span>
            <small>{item.count}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
