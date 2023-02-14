import { usePlayer, usePlayerActions } from "@/util/store/usePlayerStore";
import styled from "styled-components";
import { IoPause, IoPlay, IoPlayBack, IoPlayForward, IoRepeat, IoShuffle } from "react-icons/io5";
import { useTrack, useTrackActions } from "@/util/store/useTrackStore";

// const repeatTypeArr = ["none", "repeat", "loop"];

export default function PlayerButtons() {
  const { handleNextTrack, handlePrevTrack, handleShuffleTracks } = useTrackActions();
  const { track, repeat } = useTrack();

  const { setRepeat } = useTrackActions();
  const { play, isShuffle } = usePlayer();
  const { setIsShuffle, setPlay } = usePlayerActions();

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
      <Button onClick={handlePrevTrack}>
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
