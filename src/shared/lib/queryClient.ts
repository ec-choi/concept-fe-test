import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

export const cachedQueryOptions = {
  staleTime: 60 * 60 * 1_000, // 60분
  gcTime: 60 * 60 * 1_000, // 60분
};
