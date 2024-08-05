import { ReactNode } from "react";

export default function TapMenu({ children }: { children: ReactNode }) {
  return <div className="flex gap-4">{children}</div>;
}
