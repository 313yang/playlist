import styled from "styled-components";
import { contentWidth, currentTrackCSS, textHidden } from "./GlobalStyle";

export const PlaylistContainer = styled.main`
  display: flex;
  flex-direction: column;
  padding-left: 220px;
  margin-top: 40px;
  margin-bottom: 40px;
  width: calc(100% - 220px);
  > h1 {
    font-size: 24px;
    font-weight: 700;
    ${contentWidth};
  }
  > p {
    margin: 5px auto;
    ${contentWidth};
    font-size: 12px;
  }
  ${({ theme }) => theme.device.tablet} {
    width: 100%;
    padding-left: 0;
    > h1,
    > p {
      width: 90%;
    }
  }
`;
export const TrackListsStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 40px 12px;
  ${contentWidth};
  margin-bottom: 20px;
  ${({ theme }) => theme.device.tablet} {
    display: flex;
    flex-wrap: wrap;
    flex-grow: inherit;
    width: 90%;
  }
`;

export const TrackStyle = styled.li`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  > img {
    width: 200px;
    height: 200px;
    object-fit: cover;
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
    font-size: 28px;
  }
  &:hover {
    > div {
      opacity: 1;
    }
  }
  ${({ theme }) => theme.device.tablet} {
    flex-grow: 1;
    max-width: 230px;
    > img {
      width: 100%;
    }
    > h5 {
      max-width: 230px;
    }
  }
  ${({ theme }) => theme.device.mobile} {
    max-width: 160px;
    > img {
      height: 160px;
    }
    > h5 {
      width: 160px;
    }
    > div {
      width: 160px;
    }
  }
`;
export const TrackListStyle = styled.li<{ currentTrack: boolean }>`
  display: flex;
  align-items: center;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 4px;
  padding: 5px;
  position: relative;
  ${currentTrackCSS};
  > button {
    position: absolute;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 3;
    padding: 0;
    background-color: #fff;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    top: 0;
    left: 0;

    > svg {
      color: ${({ theme }) => theme.colors.main};
      font-size: 20px;
    }
  }
  :hover {
    > button {
      display: flex;
    }
  }
  > img {
    border-radius: 4px;
    margin-right: 10px;
  }
  p {
    font-size: 12px;
    font-weight: 500;
  }
  > div {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: ${({ currentTrack }) => !currentTrack && "1px solid #525252"};
    > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      > p {
        width: 145px;
        ${textHidden}
        :last-child {
          opacity: 0.6;
          margin-top: 5px;
        }
      }
    }
  }
`;
