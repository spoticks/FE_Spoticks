// utils/getTeamId.ts
import { teams } from "../constants";

export const getTeamId = (sport: string, teamName: string): number | null => {
  const sportTeams = teams[sport];
  if (!sportTeams) return null;

  const teamIndex = sportTeams.indexOf(teamName);
  if (teamIndex === -1) return null;

  let offset = 0;
  switch (sport) {
    case "축구":
      offset = 1;
      break;
    case "야구":
      offset = 20;
      break;
    case "농구":
      offset = 40;
      break;
    case "배구":
      offset = 50;
      break;
    default:
      return null;
  }

  return offset + teamIndex;
};
