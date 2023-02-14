import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUsePlayerStore {
  volume: number;
  progress: number;
  play: boolean;
  isShuffle: boolean;
  sidebarIsOpen: boolean;

  setVolume: (val: number) => void;
  setProgress: (val: number) => void;
  setPlay: (val: boolean) => void;
  setIsShuffle: () => void;
  setSidebarsidebarIsOpen: () => void;
}
const usePlayerStore = create<IUsePlayerStore>()(
  persist(
    (set) => ({
      volume: 1,
      progress: 0,
      play: false,
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

      setPlay: (val: boolean) => {
        set({ play: val });
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
    play: state.play,
    isShuffle: state.isShuffle,
    sidebarIsOpen: state.sidebarIsOpen,
  }));

export const usePlayerActions = () =>
  usePlayerStore((state) => ({
    setSidebarsidebarIsOpen: state.setSidebarsidebarIsOpen,
    setVolume: state.setVolume,
    setProgress: state.setProgress,
    setPlay: state.setPlay,
    setIsShuffle: state.setIsShuffle,
  }));
