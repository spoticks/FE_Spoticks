import { create } from "zustand";
import { Match } from "../type";

interface storeState {
  matches: Match[];
  addMatch: (match:Match) => void;
  updateMatch: (match:Match) => void;
}

const useStore = create<storeState>((set) => ({
  matches: [],
  addMatch: (match:Match) => set((state)=> ({matches: [...state.matches, match]})),
  updateMatch: (updatedMatch) => set((state)=>({
    matches: state.matches.map((match)=> match.id === updatedMatch.id ? updatedMatch : match)
  }))
}));

export default useStore;
