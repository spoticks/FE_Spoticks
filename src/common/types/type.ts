import { ReactNode } from "react";

// Match 타입 정의
export interface MatchType {
  content: ContentProps[];
  pageInfo: PageInfoProps;
}

export interface ContentProps {
  gameId: number;
  homeTeam: string;
  awayTeam: string;
  stadium: string;
  gameStartTime: string;
  sport: string;
  timeOnSale: string;
  timeOffSale: string;
}

export interface PageInfoProps {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface MatchData {
  gameId: number;
  homeTeamName: string;
  awayTeamName: string;
  sportName: string;
  gameStartTime: string;
}

export type SportName = {
  sport: "야구" | "축구" | "배구" | "농구";
};
export interface InformationCardProp {
  gameId: number;
  homeTeamName: string;
  awayTeamName: string;
  gameStartTime: string;
  stadiumName: string;
  reservationStatus?: boolean;
  id: number;
}

export interface Seat {
  id: number;
  isReserved: boolean;
  isSelected: boolean;
  price: number;
}
export interface seatFormData {
  section: string;
}

export interface SectionProps {
  seatPosition: string;
  seatPrice: number;
}
export interface SeatsResponse {
  homeTeamName: string;
  awayTeamName: string;
  stadiumName: string;
  gameStartTime: string;
  content: SectionProps[];
  seat: Seat[];
}

export interface sectionOfSeats {
  seatPosition: string;
  seatPrice: number;
  availableSeat: number;
}

export interface MatchDataProps {
  awayTeamName: string;
  gameId: number;
  gameStartTime: string;
  homeTeamName: string;
  id: string;
  sportName: string;
  stadiumName: string;
  timeOffSale: string;
  timeOnSale: string;
}

export interface MyTeamType {
  teamId: string;
  teamName: string;
}

export interface MenuItemProps {
  to?: string;
  onClick?: () => void;
  icon: ReactNode;
  label: string;
  isButton?: boolean;
}
