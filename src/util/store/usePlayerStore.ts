import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUsePlayerStore {
  volume: number;
  playedSeconds: number;
  isShuffle: boolean;
  sidebarIsOpen: boolean;

  setVolume: (val: number) => void;
  setPlayedSeconds: (val: number) => void;
  setIsShuffle: () => void;
  setSidebarsidebarIsOpen: () => void;
}
const usePlayerStore = create<IUsePlayerStore>()(
  persist(
    (set) => ({
      volume: 1,
      playedSeconds: 0,
      isShuffle: false,
      sidebarIsOpen: false,
      setSidebarsidebarIsOpen: () => {
        set((state) => ({
          ...state,
          sidebarIsOpen: !state.sidebarIsOpen,
        }));
      },
      setVolume: (val: number) => {
        set({ volume: val });
      },

      setPlayedSeconds: (val: number) => {
        set({ playedSeconds: val });
      },

      setIsShuffle: () => {
        set((state: any) => ({
          ...state,
          isShuffle: !state.isShuffle,
        }));
      },
    }),
    { name: "player" }
  )
);

export const usePlayer = () =>
  usePlayerStore((state) => ({
    volume: state.volume,
    playedSeconds: state.playedSeconds,
    isShuffle: state.isShuffle,
    sidebarIsOpen: state.sidebarIsOpen,
  }));

export const usePlayerActions = () =>
  usePlayerStore((state) => ({
    setSidebarsidebarIsOpen: state.setSidebarsidebarIsOpen,
    setVolume: state.setVolume,
    setPlayedSeconds: state.setPlayedSeconds,
    setIsShuffle: state.setIsShuffle,
  }));
