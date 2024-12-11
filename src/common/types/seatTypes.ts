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
