import { QueryClient } from '@tanstack/react-query';

const DEFAULT_STALE_TIME = 60 * 1000 * 10; // 10 minutes,
const MAX_RETRY_COUNT = 5; // max failure counts

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: DEFAULT_STALE_TIME,
      retry: MAX_RETRY_COUNT,
    },
  },
});
