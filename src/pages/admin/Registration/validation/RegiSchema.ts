import { z } from "zod";

export const regiSchema = z.object({
  sport: z.string().min(1, "경기종목을 선택해주세요"),
  date: z.string().min(1, "경기일을 선택해주세요"),
  gameStartTime: z.string().min(1, "경기 시작 시간을 선택해주세요"),
  stadiumName: z.string().min(1, "장소를 선택해주세요"),
  homeTeamName: z.string().min(1, "홈팀을 선택해주세요"),
  awayTeamName: z.string().min(1, "어웨이팀을 선택해주세요"),
});
