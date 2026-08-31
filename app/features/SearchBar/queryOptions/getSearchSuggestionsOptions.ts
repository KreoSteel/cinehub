import { queryOptions } from "@tanstack/react-query";
import { getSearchSuggestions } from "../api/GET-search";

export function getSearchSuggestionsOptions(query: string | null, enabled: boolean = false) {
  return queryOptions({
    queryKey: ["searchSuggestions", query],
    queryFn: () => getSearchSuggestions(query),
    enabled,
    placeholderData: (previousData) => previousData
  })
}