import { usePlayerState, useSetTrack } from "@/util/store/useStore";
import styled from "styled-components";
import { IoPause, IoPlay, IoPlayBack, IoPlayForward, IoRepeat, IoShuffle } from "react-icons/io5";
import { shuffleArray } from "@/util/common/shuffleArray";
import { useState } from "react";

export default function PlayerButtons() {
  const { handleNextTrack, handlePrevTrack, track, tracks, setTracks, setTrackNum } = useSetTrack();
  const { play, setPlay } = usePlayerState();
  const [isShuffle, setIsShuffle] = useState(false);

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle) setTracks(shuffleArray(tracks));
    else {
      const sortArr = tracks.sort((a, b) => a.sort - b.sort);
      console.table(sortArr);
      setTracks(sortArr);
    }
    setTrackNum(0);
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
