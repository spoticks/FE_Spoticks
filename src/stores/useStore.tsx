import { create } from "zustand";
import { Match } from "../type";

interface storeState {
  matches: Match[];
  addMatch: (match:Match) => void;
  updateMatch: (match:Match) => void;
}

const useStore = create<storeState>((set) => ({
  matches: [
    { id:1, date: '2024/08/01', gameStartTime: '18:00', homeTeamName: '삼성라이온즈', awayTeamName: '엔씨다이노스', sportName: '야구', reserveLink: '/reservation' },
    { id:2, date: '2024/08/02', gameStartTime: '19:00', homeTeamName: '삼성라이온즈', awayTeamName: '기아타이거즈', sportName: '야구', reserveLink: '/reservation' },
    { id:3, date: '2024/08/03', gameStartTime: '20:00', homeTeamName: '삼성라이온즈', awayTeamName: '엔씨다이노스', sportName: '야구', reserveLink: '/reservation' },
    { id:4, date: '2024/08/04', gameStartTime: '21:00', homeTeamName: '삼성라이온즈', awayTeamName: '엔씨다이노스', sportName: '야구', reserveLink: '/reservation' },
    { id:5, date: '2024/08/06', gameStartTime: '21:00', homeTeamName: '포항 스틸러스', awayTeamName: '울산 HD FC', sportName: '축구', reserveLink: '/reservation' },
    { id:6, date: '2024/08/06', gameStartTime: '21:00', homeTeamName: '포항 스틸러스', awayTeamName: '전북 현대 모터스', sportName: '축구', reserveLink: '/reservation' },
    { id:7, date: '2024/08/06', gameStartTime: '21:00', homeTeamName: '광주 FC', awayTeamName: '울산 HD FC', sportName: '축구', reserveLink: '/reservation' },
  ],
  addMatch: (match:Match) => set((state)=> ({matches: [...state.matches, match]})),
  updateMatch: (updatedMatch) => set((state)=>({
    matches: state.matches.map((match)=> match.id === updatedMatch.id ? updatedMatch : match)
  }))
}));

export default useStore;
