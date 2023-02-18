import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUsePlayerStore {
  volume: number;
  progress: number;
  isShuffle: boolean;
  sidebarIsOpen: boolean;

  setVolume: (val: number) => void;
  setProgress: (val: number) => void;
  setIsShuffle: () => void;
  setSidebarsidebarIsOpen: () => void;
}
const usePlayerStore = create<IUsePlayerStore>()(
  persist(
    (set) => ({
      volume: 1,
      progress: 0,
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

      setProgress: (val: number) => {
        set({ progress: val });
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
    progress: state.progress,
    isShuffle: state.isShuffle,
    sidebarIsOpen: state.sidebarIsOpen,
  }));

export const usePlayerActions = () =>
  usePlayerStore((state) => ({
    setSidebarsidebarIsOpen: state.setSidebarsidebarIsOpen,
    setVolume: state.setVolume,
    setProgress: state.setProgress,
    setIsShuffle: state.setIsShuffle,
  }));
