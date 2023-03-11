import { findVideo } from "@/api/youtube";
import { useQuery } from "react-query";
import { useTrack } from "../store/useTrackStore";

export const useGetYoutubeId = () => {
  const { track } = useTrack();

  return useQuery(
    ["playTrack", track?.id],
    () => findVideo({ title: track?.title || "", artist: track?.artist || "" }),
    {
      enabled: !!track,
      retry: false,
    }
  );
};
