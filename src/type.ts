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
  id: number;
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
