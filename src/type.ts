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
