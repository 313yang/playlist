import { TableStyle, TrStyle } from "@/styles/common/TableStyle";
import styled from "styled-components";

export default function TrackTableSkeleton() {
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
        {Array.from(Array(50), (_, index) => index + 1).map((list) => (
          <TrackThumbnail key={list}>
            <td>
              <div />
            </td>
            <td />
            <td />
            <td />
          </TrackThumbnail>
        ))}
      </tbody>
    </TableStyle>
  );
}

const TrackThumbnail = styled.tr`
  border-radius: 4px;
  :nth-child(2n) {
    background-color: ${({ theme }) => theme.colors.darkGray};
  }
  div {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
