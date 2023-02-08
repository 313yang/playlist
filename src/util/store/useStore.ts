import create from "zustand";
import { persist } from "zustand/middleware";

interface IUseSeletPlaylistType {
  playlist: IPlaylist | null;
  setPlaylist: (playlist: IPlaylist) => void;
}

export const useSelectPlaylist = create<IUseSeletPlaylistType>(
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
