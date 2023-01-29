import { TracList } from "@/styles/PlaylistStyle";
import Image from "next/image";

export default function TrackListComponent({ track }: { track: IPlaylist }) {
  return (
    <TracList>
      <Image width={"200"} height={"200"} src={track.image} alt={track.image} />
      <h5>{track.title}</h5>
      <h6>{track.sub}</h6>
    </TracList>
  );
}
