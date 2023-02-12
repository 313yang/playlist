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
      setTracks: (tracklist: ITrack[]) => {
        set((state: any) => ({
          ...state,
          tracks: tracklist,
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
