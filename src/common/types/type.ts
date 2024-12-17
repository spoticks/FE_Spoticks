import { ReactNode } from "react";

export interface MyTeamType {
  id: string;
  teamName: string;
}

export interface MenuItemProps {
  to?: string;
  onClick?: () => void;
  icon: ReactNode;
  label: string;
  isButton?: boolean;
}

export interface LeftTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
