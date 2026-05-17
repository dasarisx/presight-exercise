import { useCallback, useMemo, useState } from "react";
import { useFacets } from "../../hooks/useFacets";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { usePeople } from "../../hooks/usePeople";
import { FilterSidebar } from "./FilterSidebar";
import { PeopleToolbar } from "./PeopleToolbar";
import { PeopleVirtualList } from "./PeopleVirtualList";

export function PeopleExplorer() {
  const facets = useFacets();
  const [filters, setFilters] = useState({ search: "", hobby: "", nationality: "" });
  const debouncedSearch = useDebouncedValue(filters.search, 350);
  const appliedFilters = useMemo(
    () => ({
      search: debouncedSearch,
      hobby: filters.hobby,
      nationality: filters.nationality,
    }),
    [debouncedSearch, filters.hobby, filters.nationality],
  );
  const people = usePeople(appliedFilters);

  const setFilter = useCallback((key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  }, []);

  return (
    <section className="workspace">
      <FilterSidebar facets={facets} filters={filters} onFilterChange={setFilter} />

      <main className="list-panel">
        <PeopleToolbar
          total={people.total}
          search={filters.search}
          onSearchChange={(value) => setFilter("search", value)}
        />

        {facets.error && <div className="notice error">{facets.error}</div>}
        {people.error && <div className="notice error">{people.error}</div>}
        <PeopleVirtualList people={people} />
      </main>
    </section>
  );
}
