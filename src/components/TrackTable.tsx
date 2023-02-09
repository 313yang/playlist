import { findVideo } from "@/lib/youtube";
import { TableStyle } from "@/styles/common/TableStyle";
import Image from "next/image";
import { useMutation } from "react-query";

export default function TrackTable({ playlist }: { playlist: ITrack[] }) {
  const { mutate, isLoading, data } = useMutation(findVideo);
  console.log(data);
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
          <tr
            key={track.id}
            onClick={() => {
              mutate({ title: track.title, artist: track.artist });
            }}
          >
            <td>
              <Image width={"40"} height={"40"} src={track.image} alt={track.time} />
              <p>{track.title}</p>
            </td>
            <td>{track.artist}</td>
            <td>{track.album}</td>
            <td>{track.time}</td>
          </tr>
        ))}
        <iframe
          width="10"
          height="10"
          src={`https://www.youtube.com/embed/${data}?autoplay=1&rel=0`}
          allow="autoplay"
        />
      </tbody>
    </TableStyle>
  );
}
