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
        set((state: any) => ({
          ...state,
          volume: val,
        }));
      },

      setProgress: (val: number) => {
        set((state: any) => ({
          ...state,
          progress: val,
        }));
      },

      setPlay: (val: boolean) => {
        set((state: any) => ({
          ...state,
          play: val,
        }));
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
const useVolume = () => usePlayerStore((state) => state.volume);
const useProgress = () => usePlayerStore((state) => state.progress);
const usePlay = () => usePlayerStore((state) => state.play);
const useIsShuffle = () => usePlayerStore((state) => state.isShuffle);
const useSidebarIsOpen = () => usePlayerStore((state) => state.sidebarIsOpen);

export const usePlayer = () => {
  const volume = useVolume();
  const progress = useProgress();
  const play = usePlay();
  const isShuffle = useIsShuffle();
  const sidebarIsOpen = useSidebarIsOpen();
  return { volume, progress, play, isShuffle, sidebarIsOpen };
};
export const usePlayerActions = () =>
  usePlayerStore((state) => ({
    setSidebarsidebarIsOpen: state.setSidebarsidebarIsOpen,
    setVolume: state.setVolume,
    setProgress: state.setProgress,
    setPlay: state.setPlay,
    setIsShuffle: state.setIsShuffle,
  }));
