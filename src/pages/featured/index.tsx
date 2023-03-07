import { PlaylistContainer } from "@/styles/PlaylistStyle";
import useInfinitiScroll from "@/util/hooks/useInfinityScroll";

export default function Mood() {
  const { FetchTrackListComponent } = useInfinitiScroll("featured");
  return (
    <PlaylistContainer>
      <h1 style={{ marginBottom: 30 }}>Featured</h1>
      {<FetchTrackListComponent />}
    </PlaylistContainer>
  );
}
