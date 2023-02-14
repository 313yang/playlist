import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shuffleArray } from "../common/shuffleArray";

type Nullable<T> = T | null;

interface IUseTrackStore {
  tracks: ITrack[] | [];
  track: Nullable<ITrack>;
  trackNum: number;

  setTracks: (tracklist: ITrack[]) => void;
  handleShuffleTracks: (isShuffle: boolean) => void;
  handleAddOneTrack: (track: ITrack) => void;
  handleRemoveTracks: () => void;
  handleRemoveTrack: (track: ITrack, index: number) => void;
  handlePlayTracks: (tracks: ITrack[]) => void;
  handlePlayTrack: (trackNum: number) => void;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
}

const useTrackStore = create<IUseTrackStore>()(
  persist(
    (set) => ({
      tracks: [],
      track: null,
      trackNum: 0,

      setTracks: (list: ITrack[]) =>
        set((state: any) => ({
          ...state,
          tracks: list,
        })),

      handleShuffleTracks: (isShuffle: boolean) =>
        set((state: any) => {
          const arr = !isShuffle
            ? shuffleArray(state.tracks)
            : state.tracks.sort((a: ITrack, b: ITrack) => a.sort - b.sort, 0);
          return {
            ...state,
            tracks: [...arr],
            trackNum: 0,
            track: [...arr][0],
          };
        }),
      handlePlayTracks: (tracks: ITrack[]) =>
        set((state: any) => ({
          ...state,
          tracks: [...tracks],
          trackNum: 0,
          track: [...tracks][0],
        })),

      handlePlayTrack: (trackNum: number) =>
        set((state) => ({
          ...state,
          trackNum: trackNum,
          track: state.tracks[trackNum],
        })),
      handleRemoveTracks: () =>
        set((state) => ({
          ...state,
          tracks: [],
          trackNum: 0,
          track: null,
        })),

      handleRemoveTrack: (track, index) =>
        set((state) => {
          const filterArr = state.tracks.filter(
            (li) => li.id !== track.id && li.sort !== track.sort
          );
          const trackNum = state.trackNum > index ? state.trackNum - 1 : state.trackNum;
          return {
            ...state,
            tracks: [...filterArr],
            trackNum: trackNum,
            track: [...filterArr][trackNum],
          };
        }),
      handleAddOneTrack: (track: ITrack) =>
        set((state: any) => {
          let setTracksArr = [];
          setTracksArr = [...state.tracks, { ...track, sort: state.tracks.length + 1 }];
          return {
            ...state,
            tracks: setTracksArr,
            trackNum: state.tracks.length === 0 ? 0 : state.trackNum,
            track: state.tracks.length === 0 ? setTracksArr[0] : state.tracks[state.trackNum],
          };
        }),
      handleNextTrack: () =>
        set((state: any) => ({
          ...state,
          trackNum: state.trackNum + 1,
          track: state.tracks[state.trackNum + 1],
        })),
      handlePrevTrack: () =>
        set((state: any) => ({
          ...state,
          trackNum: state.trackNum === 0 ? 0 : state.trackNum - 1,
          track: state.tracks[state.trackNum === 0 ? 0 : state.trackNum - 1],
        })),
    }),
    { name: "track" }
  )
);

export const useTracks = () => useTrackStore((state) => state.tracks);
export const useTrack = () => useTrackStore((state) => state.track);
export const useSetTracks = () => useTrackStore((state) => state.setTracks);
export const useTrackActions = () =>
  useTrackStore((state) => ({
    handleNextTrack: state.handleNextTrack,
    handlePrevTrack: state.handlePrevTrack,
    handleAddOneTrack: state.handleAddOneTrack,
    handleRemoveTracks: state.handleRemoveTracks,
    handlePlayTrack: state.handlePlayTrack,
    handleShuffleTracks: state.handleShuffleTracks,
    handlePlayTracks: state.handlePlayTracks,
    handleRemoveTrack: state.handleRemoveTrack,
  }));
