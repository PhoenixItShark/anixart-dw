// src/app/providers/Provider/ui/Provider.tsx
import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import OnStartProvider from './InitProvider';
import QueryProvider from './QueryProvider';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <OnStartProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </OnStartProvider>
    </QueryProvider>
  );
};

export default Provider;