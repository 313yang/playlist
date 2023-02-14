import { usePlayer, usePlayerActions } from "@/util/store/usePlayerStore";
import styled from "styled-components";
import { IoPause, IoPlay, IoPlayBack, IoPlayForward, IoRepeat, IoShuffle } from "react-icons/io5";
import { useTrack, useTrackActions } from "@/util/store/useTrackStore";

export default function PlayerButtons() {
  const { handleNextTrack, handlePrevTrack, handleShuffleTracks } = useTrackActions();
  const track = useTrack();
  const { play, isShuffle } = usePlayer();
  const { setIsShuffle, setPlay } = usePlayerActions();

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
      <Button onClick={handlePrevTrack}>
        <IoRepeat />
      </Button>
    </Buttons>
  );
}

const Buttons = styled.div`
  margin-right: 80px;
  > button {
    display: flex;
    align-items: center;
    > svg {
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
`;
