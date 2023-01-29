import TrackListComponent from "@/components/TrackListComponent";
import { getNewReleases } from "@/lib/spotify";
import { PlaylistContainer, TrackListsStyle } from "@/styles/PlaylistStyle";
import { dehydrate, QueryClient, useQuery } from "react-query";

export default function Home() {
  return (
    <PlaylistContainer>
      <h1>New Music</h1>
    </PlaylistContainer>
  );
}
