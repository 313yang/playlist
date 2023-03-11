import { usePlayer, usePlayerActions } from "@/util/store/usePlayerStore";
import styled from "styled-components";
import { IoPause, IoPlay, IoPlayBack, IoPlayForward, IoRepeat, IoShuffle } from "react-icons/io5";
import { useTrack, useTrackActions } from "@/util/store/useTrackStore";
import { MutableRefObject } from "react";

export default function PlayerButtons({
  play,
  setPlay,
  videoRef,
}: {
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  videoRef: MutableRefObject<any>;
}) {
  const { handleNextTrack, handlePrevTrack, handleShuffleTracks } = useTrackActions();
  const { track, repeat } = useTrack();

  const { setRepeat } = useTrackActions();
  const { isShuffle, playedSeconds } = usePlayer();
  const { setIsShuffle } = usePlayerActions();

  const repeatString = () => {
    switch (repeat) {
      case "none":
        return "repeat";
      case "repeat":
        return "loop";
      default:
        return "none";
    }
  };

  const repeatSvg = () => {
    switch (repeat) {
      case "none":
        return <IoRepeat />;
      case "repeat":
        return <IoRepeat className="mainColor" />;
      default:
        return (
          <div className="mainColor">
            <IoRepeat />
            <p>1</p>
          </div>
        );
    }
  };
  const handleShuffle = () => {
    setIsShuffle();
    handleShuffleTracks(isShuffle);
  };
  return (
    <Buttons>
      <Button isShuffle={isShuffle} onClick={handleShuffle}>
        <IoShuffle />
      </Button>
      <Button onClick={() => (playedSeconds > 7 ? videoRef.current.seekTo(0) : handlePrevTrack())}>
        <IoPlayBack />
      </Button>
      <Button onClick={() => setPlay(!play)}>{play && track ? <IoPause /> : <IoPlay />}</Button>
      <Button onClick={handleNextTrack}>
        <IoPlayForward />
      </Button>
      <Button onClick={() => setRepeat(repeatString())}>{repeatSvg()}</Button>
    </Buttons>
  );
}

const Buttons = styled.div`
  margin-right: 80px;
  margin-left: 120px;
  > button {
    display: flex;
    align-items: center;
    svg {
      width: 20px;
      font-size: 20px;
    }
    :nth-child(3) {
      > svg {
        width: 26px;
        font-size: 26px;
      }
    }
  }
  @media screen and (max-width: 1025px) {
    position: absolute;
    left: 50%;
    top: 48%;
    transform: translate(-50%, -50%);
    z-index: 99;
    > button {
      svg {
        width: 16px;
        font-size: 16px;
      }
      :nth-child(3) {
        > svg {
          width: 20px;
          font-size: 20px;
        }
      }
    }
  }
  @media screen and (max-width: 1025px) {
    margin-left: 61%;
    left: 0;
    transform: translate(0, -50%);
    > button {
      svg {
        width: 16px;
        font-size: 16px;
      }
      &:first-child,
      &:last-child {
        display: none;
      }

      :nth-child(3) {
        > svg {
          width: 18px;
          font-size: 20px;
        }
      }
    }
  }
`;
const Button = styled.button.attrs({ type: "button" })<{ isShuffle?: boolean }>`
  > svg {
    color: ${({ isShuffle, theme }) => (isShuffle ? theme.colors.main : "#fff")};
  }
  .mainColor {
    color: ${({ theme }) => theme.colors.main};
  }
  > div {
    position: relative;
    display: flex;
    align-items: center;

    > p {
      position: absolute;
      top: -3px;
      right: -2px;
      font-size: 8px;
    }
  }
`;
