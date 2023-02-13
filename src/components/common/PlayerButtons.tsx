import { usePlayerState, useSetTrack } from "@/util/store/useStore";
import styled from "styled-components";
import { IoPause, IoPlay, IoPlayBack, IoPlayForward, IoRepeat, IoShuffle } from "react-icons/io5";

export default function PlayerButtons() {
  const { handleNextTrack, handlePrevTrack, track } = useSetTrack();
  const { play, setPlay } = usePlayerState();

  return (
    <Buttons>
      <button type="button" onClick={handlePrevTrack}>
        <IoShuffle />
      </button>
      <button type="button" onClick={handlePrevTrack}>
        <IoPlayBack />
      </button>
      <button type="button" onClick={() => setPlay(!play)}>
        {play && track ? <IoPause /> : <IoPlay />}
      </button>
      <button type="button" onClick={handleNextTrack}>
        <IoPlayForward />
      </button>
      <button type="button" onClick={handlePrevTrack}>
        <IoRepeat />
      </button>
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
