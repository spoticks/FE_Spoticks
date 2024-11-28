export interface seatDataProps {
  game: gameProps;
  positionInfo: positionInfoProps[];
  seat: seatsProps[];
}
export interface gameProps {
  gameId: number;
  homeTeamName: string;
  awayTeamName: string;
  gameStartTime: string;
  stadiumName: string;
  latitude: number;
  longitude: number;
}

export interface positionInfoProps {
  seatPosition: string;
  price: number;
}

export interface seatsProps {
  id: number;
  status: string;
  seatPrice: number;
  seatPosition: string;
  seatRow: number;
  seatNumer: number;
}
