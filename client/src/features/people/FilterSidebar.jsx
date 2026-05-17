import { FilterList } from "./FilterList";

export function FilterSidebar({ facets, filters, onFilterChange }) {
  return (
    <aside className="sidebar">
      <FilterList
        title="Nationalities"
        items={facets.nationalities}
        active={filters.nationality}
        onSelect={(value) => onFilterChange("nationality", value)}
      />
      <FilterList
        title="Hobbies"
        items={facets.hobbies}
        active={filters.hobby}
        onSelect={(value) => onFilterChange("hobby", value)}
      />
    </aside>
  );
}
