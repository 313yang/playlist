import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUsePlayerStore {
  volume: number;
  playedSeconds: number;
  isShuffle: boolean;

  setVolume: (val: number) => void;
  setPlayedSeconds: (val: number) => void;
  setIsShuffle: () => void;
}
interface IUseSidebarStore {
  sidebarIsOpen: boolean;
  navbarIsOpen: boolean;
  setSidebarsidebarIsOpen: () => void;
  setNavbarsidebarIsOpen: () => void;
}
const usePlayerStore = create<IUsePlayerStore>()(
  persist(
    (set) => ({
      volume: 1,
      playedSeconds: 0,
      isShuffle: false,

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
const useSidebarStore = create<IUseSidebarStore>((set) => ({
  sidebarIsOpen: false,
  navbarIsOpen: false,
  setSidebarsidebarIsOpen: () => {
    set((state) => ({
      ...state,
      sidebarIsOpen: !state.sidebarIsOpen,
    }));
  },
  setNavbarsidebarIsOpen: () => {
    set((state) => ({
      ...state,
      navbarIsOpen: !state.navbarIsOpen,
    }));
  },
}));
export const usePlayer = () =>
  usePlayerStore((state) => ({
    volume: state.volume,
    playedSeconds: state.playedSeconds,
    isShuffle: state.isShuffle,
  }));

export const usePlayerActions = () =>
  usePlayerStore((state) => ({
    setVolume: state.setVolume,
    setPlayedSeconds: state.setPlayedSeconds,
    setIsShuffle: state.setIsShuffle,
  }));
export const useSidebar = () =>
  useSidebarStore((state) => ({
    sidebarIsOpen: state.sidebarIsOpen,
    setSidebarsidebarIsOpen: state.setSidebarsidebarIsOpen,
    navbarIsOpen: state.navbarIsOpen,
    setNavbarsidebarIsOpen: state.setNavbarsidebarIsOpen,
  }));
