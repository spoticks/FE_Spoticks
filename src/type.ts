// Match 타입 정의
export interface Match {
  id?: number;
  gameStartTime: string;
  stadiumName: string;
  homeTeamName: string;
  awayTeamName: string;
  sportName: string;
}

export interface MatchData {
  gameId: number;
  homeTeamName: string;
  awayTeamName: string;
  sportName: string;
  gameStartTime: string;
}

export interface Content {
  gameId: number;
  homeTeamName: string;
  awayTeamName: string;
  stadiumName: string;
  gameStartTime: string;
  timeOnSale: string;
  timeOffSale: string;
}

export type SportName = {
  sport: "야구" | "축구" | "배구" | "농구"
}

export interface Seat {
  id: number;
  isReserved: boolean;
  isSelected: boolean;
  price:number;
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