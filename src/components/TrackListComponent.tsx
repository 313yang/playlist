import { TrackStyle } from "@/styles/PlaylistStyle";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoPlay } from "react-icons/io5";
import { useSetPlaylist } from "@/util/store/usePlaylistStore";

export default function TrackListComponent({ track }: { track: IPlaylist }) {
  const router = useRouter();
  const setPlaylist = useSetPlaylist();

  const handleSelectPlaylist = () => {
    router.push(`/${track.type}/${track.id}`);
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
