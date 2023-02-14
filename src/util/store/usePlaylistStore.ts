import { create } from "zustand";
import { persist } from "zustand/middleware";

type Nullable<T> = T | null;

interface IUsePlaylistStore {
  playlist: Nullable<IPlaylist>;
  setPlaylist: (playlist: IPlaylist) => void;
}

const usePlaylistStore = create<IUsePlaylistStore>()(
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
export const usePlaylist = () => usePlaylistStore((state) => state.playlist);
export const useSetPlaylist = () => usePlaylistStore((state) => state.setPlaylist);
