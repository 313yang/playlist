import { findVideo } from "@/lib/youtube";
import { useQuery } from "react-query";
import { useSetTrack } from "../store/useStore";

export const useGetYoutubeId = () => {
  const { track } = useSetTrack();
  // if (!!track)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(
    ["playTrack", track?.id],
    () => findVideo({ title: track?.title || "", artist: track?.artist || "" }),
    {
      enabled: !!track,
      retry: false,
    }
  );
};
