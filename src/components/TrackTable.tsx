import { TableStyle } from "@/styles/common/TableStyle";
import { useGetYoutubeId } from "@/util/hooks/useGetYoutubeId";
import { useSetTrack } from "@/util/store/useStore";
import Image from "next/image";

export default function TrackTable({ playlist }: { playlist: ITrack[] }) {
  const { setTrackNum } = useSetTrack();
  const { refetch } = useGetYoutubeId();

  const handleSetTrack = (index: number) => {
    refetch();
    setTrackNum(index);
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
        {playlist.map((track, index) => (
          <tr key={track.id} onClick={() => handleSetTrack(index)}>
            <td>
              <Image width={"40"} height={"40"} src={track.image} alt={track.title} />
              {track.title}
            </td>
            <td>{track.artist}</td>
            <td>{track.album}</td>
            <td>{track.time}</td>
          </tr>
        ))}
      </tbody>
    </TableStyle>
  );
}
