import {create} from 'zustand';

interface MyTeamStore {
  myTeams: string[];
  addMyTeam: (team: string) => void;
  removeMyTeam: (team: string) => void;
}

const myTeamStore = create<MyTeamStore>((set) => ({
  myTeams: [],  
  addMyTeam: (team) => set((state) => ({
    myTeams: [...state.myTeams, team],
  })),
  removeMyTeam: (team) => set((state) => ({
    myTeams: state.myTeams.filter(t => t !== team),
  })),
}));

export default myTeamStore;
