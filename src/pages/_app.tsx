import type { AppProps } from 'next/app';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import '../styles/globals.css'; // This will be created later

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log('queryCache > onError > error', error);
      console.log('queryCache > onError > query', query);
      // if (query.state.data !== undefined) {
      // 	toast.error(`Query Error: ${error.message}`);
      // }
    },
    onSuccess: (data) => {
      console.log('queryCache > onSuccess', data);
    }
  }),
  defaultOptions: {
    queries: {
      retry: 0,
      // cacheTime: 0,
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
        <React.Suspense fallback={<div>Loading...</div>}>
          <Component {...pageProps} />
        </React.Suspense>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default MyApp;