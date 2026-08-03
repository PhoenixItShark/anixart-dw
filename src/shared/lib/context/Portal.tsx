// src/shared/ui/Portal/Portal.tsx
import { ReactNode } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: ReactNode;
  containerId: string;
};

 const Portal = ({ children, containerId }: PortalProps) => {
  const container = document.getElementById(containerId);

  // Защита: если контейнер не найден — рендерим в body (или ничего)
  if (!container) {
    console.warn(`Portal container with id "${containerId}" not found`);
    return null;
  }

  return createPortal(children, container);
};
export default Portal