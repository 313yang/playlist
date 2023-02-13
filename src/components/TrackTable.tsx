import { TableStyle, TrStyle } from "@/styles/common/TableStyle";
import { useGetYoutubeId } from "@/util/hooks/useGetYoutubeId";
import { useSetTrack } from "@/util/store/useStore";
import Image from "next/image";
import { IoPlay } from "react-icons/io5";

export default function TrackTable({ playlist }: { playlist: ITrack[] }) {
  const { setTrackNum, track: currentTrack, setTracks, tracks } = useSetTrack();
  const { refetch } = useGetYoutubeId();

  const handleSetTrack = (track: ITrack, index: number) => {
    setTracks([...tracks, { ...track, sort: tracks.length + 1 }]);
    if (tracks.length === 0) {
      setTrackNum(index);
      refetch();
    }
  };
  return (
    <>
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
            <TrStyle
              currentTrack={
                !!currentTrack && currentTrack.id === track.id && currentTrack.sort === track.sort
              }
              key={track.id}
              onClick={() => handleSetTrack(track, index)}
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
    </>
  );
}
