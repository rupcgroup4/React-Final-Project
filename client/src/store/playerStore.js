import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePlayersStore = create(
  persist(
    (set) => ({
      player1: null,
      player2: null,

      player1Login(player) {
        set({ player1: player });
      },

      player2Login(player) {
        set({ player2: player });
      },

      player1Logout() {
        set({ player1: null });
      },

      player2Logout() {
        set({ player2: null });
      },
      updatePlayersRole(player1Role, player2Role) {
        set((state) => ({
          player1: { ...state.player1, role: player1Role },
          player2: { ...state.player2, role: player2Role },
        }));
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

export default usePlayersStore;
