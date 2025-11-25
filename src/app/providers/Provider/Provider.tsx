// src/app/providers/Provider/ui/Provider.tsx
import { ReactNode } from 'react';
import { QueryProvider } from '@/app/providers/QueryProvider/QueryProvider';
import { OnStartProvider } from '@/app/providers/OnStartProvider/OnStartProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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