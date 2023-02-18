import { useTrack, useTrackActions } from "@/util/store/useTrackStore";
import { IoPlay, IoRemoveCircleSharp } from "react-icons/io5";
import Image from "next/image";

export default function UpNextTrackRender({ track, index }: { track: ITrack; index: number }) {
  const { handleRemoveTrack } = useTrackActions();
  const handleDeleteSelectedTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleRemoveTrack(track, index);
  };
  return (
    <>
      <button type="button" onClick={handleDeleteSelectedTrack}>
        <IoRemoveCircleSharp />
      </button>
      <div className="currentTrack">
        <IoPlay />
      </div>
      <Image width={"40"} height="40" src={track.image} alt={track.title} />
      <div>
        <div>
          <p>{track.title}</p>
          <p>{track.artist}</p>
        </div>
        <p>{track.time}</p>
      </div>
    </>
  );
}
