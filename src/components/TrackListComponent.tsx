import { TrackStyle } from "@/styles/PlaylistStyle";
import Image from "next/image";
import { useRouter } from "next/router";

export default function TrackListComponent({ track }: { track: IPlaylist }) {
  const router = useRouter();
  const handleSelectPlaylist = () => {
    router.push(`/playlist/${track.id}`);
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
