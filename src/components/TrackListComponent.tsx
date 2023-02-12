import { TrackStyle } from "@/styles/PlaylistStyle";
import { useSelectPlaylist } from "@/util/store/useStore";
import Image from "next/image";
import { useRouter } from "next/router";

export default function TrackListComponent({ track }: { track: IPlaylist }) {
  const router = useRouter();
  const { setPlaylist } = useSelectPlaylist();
  const handleSelectPlaylist = () => {
    router.push(`/playlist/${track.id}`);
    // sessionStorage.setItem("track", JSON.stringify(track));
    setPlaylist(track);
  };
  return (
    <TrackStyle onClick={handleSelectPlaylist}>
      <div>▶</div>
      <Image width={"200"} height={"200"} src={track.image} alt={track.image} />
      <h5>{track.title}</h5>
      <h6>{track.sub}</h6>
    </TrackStyle>
  );
}
