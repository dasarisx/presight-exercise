import { useQuery } from "@tanstack/react-query";
import { getFacets } from "../api/people";

const emptyFacets = { hobbies: [], nationalities: [] };

export function useFacets() {
  const facetsQuery = useQuery({
    queryKey: ["facets"],
    queryFn: ({ signal }) => getFacets({ signal }),
    staleTime: 5 * 60_000,
  });

  return {
    ...(facetsQuery.data || emptyFacets),
    error: facetsQuery.error?.message || "",
  };
}
