import { searchTrackById } from "@/lib/spotify";
import { TableStyle, TrStyle } from "@/styles/common/TableStyle";
import { useGetYoutubeId } from "@/util/hooks/useGetYoutubeId";
import { useSetTrack } from "@/util/store/useStore";
import Image from "next/image";
import { useEffect } from "react";
import { IoPlay } from "react-icons/io5";
import { useQuery } from "react-query";
import Spinner from "./common/Spinner";

export default function TrackTable({ playlist }: { playlist: ITrack[] }) {
  const { setTrackNum, track: curentTrack } = useSetTrack();
  const { refetch } = useGetYoutubeId();

  const handleSetTrack = (index: number) => {
    refetch();
    setTrackNum(index);
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
              currentTrack={track.id === curentTrack?.id}
              key={track.id}
              onClick={() => handleSetTrack(index)}
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
