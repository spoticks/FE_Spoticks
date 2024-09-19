import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

export default function ModalPortal({ children }: PortalProps) {
  const modalElement = document.getElementById("modal");

  if (!modalElement) {
    return null;
  }

  return createPortal(<>{children}</>, modalElement);
}

