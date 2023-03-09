import { TableStyle, TrStyle } from "@/styles/common/TableStyle";
import { useTrack, useTrackActions } from "@/util/store/useTrackStore";
import Image from "next/image";
import { IoPlay } from "react-icons/io5";

export default function TrackTable({ playlist }: { playlist: ITrack[] }) {
  const { track: currentTrack } = useTrack();
  const { handleAddOneTrack } = useTrackActions();

  const handleSetTrack = (track: ITrack) => {
    handleAddOneTrack(track);
  };
  return (
    <TableStyle>
      <thead>
        <tr>
          <th>Song</th>
          <th>Artist</th>
          <th>Album</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {playlist.map((track) => (
          <TrStyle
            currentTrack={
              !!currentTrack && currentTrack.id === track.id && currentTrack.sort === track.sort
            }
            key={track.id}
            onClick={() => handleSetTrack(track)}
          >
            <td>
              <div className="currentTrack">
                <IoPlay />
              </div>
              <Image width={"40"} height={"40"} src={track.image} alt={track.title} />
              {track.title}
            </td>
            <td>{track.artist}</td>
            <td>{track.album}</td>
            <td>{track.time}</td>
          </TrStyle>
        ))}
      </tbody>
    </TableStyle>
  );
}
