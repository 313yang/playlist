import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shuffleArray } from "../common/shuffleArray";
import { usePlayer } from "./usePlayerStore";

type Nullable<T> = T | null;

interface IUseTrackStore {
  tracks: ITrack[] | [];
  track: Nullable<ITrack>;
  trackNum: number;
  repeat: string;

  handleShuffleTracks: (isShuffle: boolean) => void;
  handleAddOneTrack: (track: ITrack) => void;
  handleAddTracks: (tracks: ITrack[]) => void;
  handleRemoveTracks: () => void;
  handleRemoveTrack: (track: ITrack, index: number) => void;
  handlePlayTracks: (tracks: ITrack[]) => void;
  handlePlayTrack: (trackNum: number) => void;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
  setRepeat: (repeatType: string) => void;
}

const useTrackStore = create<IUseTrackStore>()(
  persist(
    (set) => ({
      tracks: [],
      track: null,
      trackNum: 0,
      repeat: "none",

      handleShuffleTracks: (isShuffle: boolean) =>
        set((state: any) => {
          const arr = !isShuffle
            ? shuffleArray(state.tracks)
            : state.tracks.sort((a: ITrack, b: ITrack) => a.sort - b.sort, 0);
          return {
            tracks: [...arr],
            trackNum: 0,
            track: [...arr][0],
          };
        }),
      handlePlayTracks: (tracks: ITrack[]) =>
        set(() => ({
          tracks: [...tracks],
          trackNum: 0,
          track: [...tracks][0],
        })),

      handlePlayTrack: (trackNum: number) =>
        set((state) => ({
          trackNum: trackNum,
          track: state.tracks[trackNum],
        })),
      handleRemoveTracks: () =>
        set({
          tracks: [],
          trackNum: 0,
          track: null,
        }),

      handleRemoveTrack: (track, index) =>
        set((state) => {
          const filterArr = state.tracks.filter(
            (li) => !(li.id === track.id && li.sort === track.sort)
          );
          const trackNum = state.trackNum > index ? state.trackNum - 1 : state.trackNum;
          return {
            tracks: [...filterArr],
            trackNum: trackNum,
            track: [...filterArr][trackNum],
          };
        }),
      handleAddOneTrack: (track: ITrack) =>
        set((state: any) => {
          const sortArr = [...state.tracks.sort((a: ITrack, b: ITrack) => a.sort - b.sort)];
          const setTracksArr = [
            ...state.tracks,
            { ...track, sort: sortArr[sortArr.length - 1]?.sort + 1 },
          ];
          return {
            tracks: setTracksArr,
            trackNum: state.tracks.length === 0 ? 0 : state.trackNum,
            track: state.tracks.length === 0 ? setTracksArr[0] : state.tracks[state.trackNum],
          };
        }),
      handleAddTracks: (tracks) =>
        set((state: any) => {
          const sortArr = [...state.tracks.sort((a: ITrack, b: ITrack) => a.sort - b.sort)];

          return {
            tracks: [
              ...state.tracks,
              ...tracks.map((list: ITrack, index: number) => ({
                ...list,
                sort: sortArr[sortArr.length - 1]?.sort + index + 1,
              })),
            ],
          };
        }),
      handleNextTrack: () =>
        set((state: any) => {
          const isRepeat = state.repeat !== "none" && state.tracks.length - 1 === state.trackNum;
          return {
            trackNum: isRepeat ? 0 : state.trackNum + 1,
            track: isRepeat ? state.tracks[0] : state.tracks[state.trackNum + 1],
          };
        }),
      handlePrevTrack: () =>
        set((state: any) => ({
          trackNum: state.trackNum === 0 ? 0 : state.trackNum - 1,
          track: state.tracks[state.trackNum === 0 ? 0 : state.trackNum - 1],
        })),
      setRepeat: (repeatType) => set({ repeat: repeatType }),
    }),
    { name: "track" }
  )
);

export const useTrack = () =>
  useTrackStore((state) => ({
    track: state.track,
    tracks: state.tracks,
    trackNum: state.trackNum,
    repeat: state.repeat,
  }));

export const useTrackActions = () =>
  useTrackStore((state) => ({
    handleNextTrack: state.handleNextTrack,
    handlePrevTrack: state.handlePrevTrack,
    handleAddOneTrack: state.handleAddOneTrack,
    handleAddTracks: state.handleAddTracks,
    handleRemoveTracks: state.handleRemoveTracks,
    handlePlayTrack: state.handlePlayTrack,
    handleShuffleTracks: state.handleShuffleTracks,
    handlePlayTracks: state.handlePlayTracks,
    handleRemoveTrack: state.handleRemoveTrack,
    setRepeat: state.setRepeat,
  }));
