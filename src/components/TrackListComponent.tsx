import { TrackStyle } from "@/styles/PlaylistStyle";
import { useSelectPlaylist } from "@/util/store/useStore";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoPlay } from "react-icons/io5";

export default function TrackListComponent({ track }: { track: IPlaylist }) {
  const router = useRouter();
  const { setPlaylist } = useSelectPlaylist();
  const handleSelectPlaylist = () => {
    router.push(`/${track.id}`);
    setPlaylist(track);
  };
  return (
    <TrackStyle onClick={handleSelectPlaylist}>
      <div>
        <IoPlay />
      </div>
      <Image width={"200"} height={"200"} src={track.image} alt={track.title} />
      <h5>{track.title}</h5>
      <h6>{track.sub}</h6>
    </TrackStyle>
  );
}
