import create from "zustand";
import { persist } from "zustand/middleware";

type Nullable<T> = T | null;

interface IUseSeletPlaylistType {
  playlist: Nullable<IPlaylist>;
  setPlaylist: (playlist: IPlaylist) => void;
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
      name: "track", // unique name
    }
  )
);
