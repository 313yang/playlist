import styled from "styled-components";
import { contentWidth, currentTrackCSS } from "../GlobalStyle";

export const TableStyle = styled.table`
  ${contentWidth};
  th,
  td {
    text-align: start;
    font-size: 12px;
    padding: 6px;
    vertical-align: middle;
  }
  th {
    opacity: 0.7;
  }
  td {
    > img {
      border-radius: 2px;
    }
  }
  tbody tr {
  }
`;
export const TrStyle = styled.tr<{ currentTrack: boolean }>`
  border-radius: 4px;
  :nth-child(2n) {
    background-color: ${({ theme }) => theme.colors.darkGray};
  }
  :hover {
    background-color: #2c2c2c;
    cursor: pointer;
  }
  > td {
    :first-child {
      display: flex;
      align-items: center;
      > img {
        margin-right: 16px;
      }
    }
    :last-child {
      text-align: center;
    }
  }
  ${currentTrackCSS}
`;
