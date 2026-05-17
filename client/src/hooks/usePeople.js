import { useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPeople } from "../api/people";

export function usePeople(filters) {
  const queryFilters = useMemo(
    () => ({
      search: filters.search || "",
      hobby: filters.hobby || "",
      nationality: filters.nationality || "",
    }),
    [filters.hobby, filters.nationality, filters.search],
  );

  const peopleQuery = useInfiniteQuery({
    queryKey: ["people", queryFilters],
    queryFn: ({ pageParam, signal }) => getPeople({ page: pageParam, filters: queryFilters, signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => (lastPage.hasMore ? allPages.length + 1 : undefined),
  });

  const items = useMemo(
    () => peopleQuery.data?.pages.flatMap((page) => page.items) || [],
    [peopleQuery.data],
  );
  const lastPage = peopleQuery.data?.pages.at(-1);
  const loading = peopleQuery.isLoading || peopleQuery.isFetchingNextPage;
  const hasMore = peopleQuery.isLoading || peopleQuery.hasNextPage || false;

  const loadNext = useCallback(() => {
    if (peopleQuery.hasNextPage && !peopleQuery.isFetching) {
      peopleQuery.fetchNextPage();
    }
  }, [peopleQuery.fetchNextPage, peopleQuery.hasNextPage, peopleQuery.isFetching]);

  return {
    items,
    total: lastPage?.total || 0,
    hasMore,
    loading,
    error: peopleQuery.error?.message || "",
    loadNext,
  };
}
