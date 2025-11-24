import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyle } from '@/shared/styles/GlobalStyle';
import { router } from '@/app/routes/router';
import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/queryClient';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <GlobalStyle />
    </QueryClientProvider>
  </StrictMode>,
);
