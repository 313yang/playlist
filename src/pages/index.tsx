import { PlaylistContainer } from "@/styles/PlaylistStyle";
import useInfinitiScroll from "@/util/hooks/useInfinityScroll";

export default function Home() {
  const { FetchTrackListComponent } = useInfinitiScroll("newRelease");

  return (
    <PlaylistContainer>
      <h1 style={{ marginBottom: 30 }}>New Music</h1>
      {<FetchTrackListComponent />}
    </PlaylistContainer>
  );
}
