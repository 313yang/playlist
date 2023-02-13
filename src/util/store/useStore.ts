import { create } from "zustand";
import { persist } from "zustand/middleware";

type Nullable<T> = T | null;

interface IUseSeletPlaylistType {
  playlist: Nullable<IPlaylist>;
  setPlaylist: (playlist: IPlaylist) => void;
}
interface IUseSetTrack {
  tracks: ITrack[] | [];
  track: Nullable<ITrack>;
  trackNum: Nullable<number>;
  setTracks: (tracklist: ITrack[]) => void;
  setRandomTracks: (lsit: ITrack[]) => void;
  setTrackNum: (track: number) => void;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
}

export const useSelectPlaylist = create<IUseSeletPlaylistType>()(
  persist(
    (set) => ({
      playlist: null,
      setPlaylist: (playlist: any) => {
        set((state: any) => ({
          ...state,
          playlist: playlist,
        }));
      },
    }),

    {
      name: "playlist", // unique name
    }
  )
);
export const useSetTrack = create<IUseSetTrack>()(
  persist(
    (set) => ({
      tracks: [],
      setTracks: (list: ITrack[]) => {
        set((state: any) => ({
          ...state,
          tracks: list,
        }));
      },
      setRandomTracks: (list: ITrack[]) => {
        set((state: any) => ({
          ...state,
          tracks: list.sort(() => Math.random() - 0.5),
        }));
      },
      track: null,
      trackNum: null,
      setTrackNum: (trackNum: number) => {
        set((state: any) => ({
          ...state,
          trackNum: trackNum,
          track: state.tracks[trackNum],
        }));
      },
      handleNextTrack: () => {
        set((state: any) => ({
          ...state,
          trackNum: state.trackNum + 1,
          track: state.tracks[state.trackNum + 1],
        }));
      },
      handlePrevTrack: () => {
        set((state: any) => ({
          ...state,
          trackNum: state.trackNum === 0 ? 0 : state.trackNum - 1,
          track: state.tracks[state.trackNum === 0 ? 0 : state.trackNum - 1],
        }));
      },
    }),
    { name: "track" }
  )
);

interface IUsePlayerState {
  volume: number;
  progress: number;
  play: boolean;
  setVolume: (val: number) => void;
  setProgress: (val: number) => void;
  setPlay: (val: boolean) => void;
}
export const usePlayerState = create<IUsePlayerState>()(
  persist(
    (set) => ({
      volume: 1,
      progress: 0,
      play: false,
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
    }),
    { name: "player" }
  )
);
interface IUseSidebarToggle {
  isOpen: boolean;
  setIsOpen: () => void;
}
export const useSidebarToggle = create<IUseSidebarToggle>((set) => ({
  isOpen: false,
  setIsOpen: () => {
    set((state) => ({
      ...state,
      isOpen: !state.isOpen,
    }));
  },
}));
