// src/app/providers/onStartProvider/onStartProvider.tsx

import { ReactNode } from 'react';


export const OnStartProvider = ({ children }: { children: ReactNode }) => {

  return (
    <>
      {children}
    </>
  );
};