export interface Seat {
  id: number;
  isReserved: boolean;
  isSelected: boolean;
  price: number;
}
export type SeatFormData = {
  section: string;
};

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

export interface SectionOfSeatsProps {
  seatPosition: string;
  seatPrice: number;
  availableSeat: number;
}

export interface SeatDataProps {
  game: GameProps;
  positionInfo: PositionInfoProps[];
  seat: SeatsProps[];
}
export interface GameProps {
  gameId: number;
  homeTeamName: string;
  awayTeamName: string;
  gameStartTime: string;
  stadiumName: string;
  latitude: number;
  longitude: number;
}

export interface PositionInfoProps {
  seatPosition: string;
  price: number;
}

export interface SeatsProps {
  id: number;
  status: string;
  seatPrice: number;
  seatPosition: string;
  seatRow: number;
  seatNumer: number;
}
