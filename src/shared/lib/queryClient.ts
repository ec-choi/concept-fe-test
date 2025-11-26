import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 10 * 60 * 1_000,
      // gcTime: 10 * 60 * 1_000,
      // retry: 2,
      refetchOnWindowFocus: true,
    },
  },
});
