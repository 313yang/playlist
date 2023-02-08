import styled from "styled-components";
import { contentWidth } from "./GlobalStyle";

export const PlaylistContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin-left: 220px;
  > h1 {
    margin: 0 auto;
    font-size: 24px;
    font-weight: 700;
    ${contentWidth};
  }
  > p {
    margin: 5px auto;
    ${contentWidth};
    font-size: 12px;
  }
`;
export const TrackListsStyle = styled.ul`
  margin: 40px auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 40px 12px;
  ${contentWidth};
`;
export const TrackStyle = styled.li`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  > img {
    width: 200px;
    height: 200px;
    border-radius: 4px;
  }
  > h5 {
    font-size: 14px;
    margin: 10px 0 5px;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-bottom: 1px;
  }
  > h6 {
    font-size: 12px;
    opacity: 0.4;
  }
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    border-radius: 4px;
    opacity: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.2s ease;
  }
  &:hover {
    > div {
      opacity: 1;
    }
  }
`;
