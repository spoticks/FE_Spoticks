import { create } from "zustand";
import { MatchDataProps } from "@/common/types/matchTypes";

interface storeState {
  matches: MatchDataProps[];
  addMatch: (match: MatchDataProps) => void;
  updateMatch: (match: MatchDataProps) => void;
}

const useStore = create<storeState>((set) => ({
  matches: [],
  addMatch: (match: MatchDataProps) => set((state) => ({ matches: [...state.matches, match] })),
  updateMatch: (updatedMatch) =>
    set((state) => ({
      matches: state.matches.map((match) => (match.id === updatedMatch.id ? updatedMatch : match)),
    })),
}));

export default useStore;
