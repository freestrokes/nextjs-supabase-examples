import type { AppProps } from 'next/app';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log('queryCache > onError > error', error);
    },
    onSuccess: (data) => {
      console.log('queryCache > onSuccess', data);
    }
  }),
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Component {...pageProps} />
          </React.Suspense>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default MyApp;
