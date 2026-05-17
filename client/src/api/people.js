import { getJson } from "./client";

export const PEOPLE_PAGE_SIZE = 30;

export function getPeople({ page, filters, signal }) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(PEOPLE_PAGE_SIZE),
  });

  if (filters.search) params.set("search", filters.search);
  if (filters.nationality) params.set("nationality", filters.nationality);
  if (filters.hobby) params.set("hobby", filters.hobby);

  return getJson(`/api/people?${params.toString()}`, { signal });
}

export function getFacets({ signal } = {}) {
  return getJson("/api/facets", { signal });
}
