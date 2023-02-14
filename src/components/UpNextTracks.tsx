import { currentTrackCSS, textHidden } from "@/styles/GlobalStyle";
import { useTrackActions, useTrack } from "@/util/store/useTrackStore";
import Image from "next/image";
import { IoPlay, IoRemoveCircleSharp } from "react-icons/io5";
import styled from "styled-components";

export default function UpNextTracks({ track, index }: { track: ITrack; index: number }) {
  const currentTrack = useTrack();
  const { handlePlayTrack, handleRemoveTrack } = useTrackActions();

  const handleDeleteSelectedTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleRemoveTrack(track, index);
  };
  return (
    <TrackListStyle
      currentTrack={
        !!currentTrack && currentTrack.id === track.id && currentTrack.sort === track.sort
      }
      onClick={() => handlePlayTrack(index)}
    >
      <button type="button" onClick={handleDeleteSelectedTrack}>
        <IoRemoveCircleSharp />
      </button>
      <div className="currentTrack">
        <IoPlay />
      </div>
      <Image width={"40"} height="40" src={track.image} alt={track.title} />
      <div>
        <div>
          <p>{track.title}</p>
          <p>{track.artist}</p>
        </div>
        <p>{track.time}</p>
      </div>
    </TrackListStyle>
  );
}

const TrackListStyle = styled.li<{ currentTrack: boolean }>`
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
