import { create } from "zustand";

// Match 타입 정의
interface Match {
  id: number;
  date: string;
  gameStartTime: string;
  homeTeamName: string;
  awayTeamName: string;
  sportName: string;
  reserveLink: string;
}

interface storeState {
  matches: Match[];
  addMatch: (match:Match) => void;
}

const useStore = create<storeState>((set) => ({
  matches: [
    { id:1, date: '2024/08/01', gameStartTime: '18:00', homeTeamName: '삼성라이온즈', awayTeamName: '엔씨다이노스', sportName: '야구', reserveLink: '/reservation' },
    { id:2, date: '2024/08/02', gameStartTime: '19:00', homeTeamName: '삼성라이온즈', awayTeamName: '기아타이거즈', sportName: '야구', reserveLink: '#' },
    { id:3, date: '2024/08/03', gameStartTime: '20:00', homeTeamName: '삼성라이온즈', awayTeamName: '엔씨다이노스', sportName: '농구', reserveLink: '#' },
    { id:4, date: '2024/08/04', gameStartTime: '21:00', homeTeamName: '삼성라이온즈', awayTeamName: '엔씨다이노스', sportName: '배구', reserveLink: '#' }
  ],
  addMatch: (match:Match) => set((state)=> ({matches: [...state.matches, match]}))
}));

export default useStore;
