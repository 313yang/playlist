import { TableStyle } from "@/styles/common/TableStyle";
import Image from "next/image";

export default function TrackTable({ playlist }: { playlist: ITrack[] }) {
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
          <tr key={track.id}>
            <td>
              <Image width={"40"} height={"40"} src={track.image} alt={track.time} />
              <p>{track.title}</p>
            </td>
            <td>{track.artist}</td>
            <td>{track.album}</td> <td>{track.time}</td>
          </tr>
        ))}
      </tbody>
    </TableStyle>
  );
}
