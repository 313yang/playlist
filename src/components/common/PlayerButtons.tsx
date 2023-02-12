import { useSetTrack } from "@/util/store/useStore";
import styled from "styled-components";
import { IoPause, IoPlay, IoPlayBack, IoPlayForward, IoRepeat, IoShuffle } from "react-icons/io5";

export default function PlayerButtons({ play, setPlay }: { play: boolean; setPlay: any }) {
  const { handleNextTrack, handlePrevTrack } = useSetTrack();

  return (
    <Buttons>
      <button>
        <IoShuffle />
      </button>
      <button onClick={handlePrevTrack}>
        <IoPlayBack />
      </button>
      <button onClick={() => setPlay(!play)}>{play ? <IoPause /> : <IoPlay />}</button>
      <button onClick={handleNextTrack}>
        <IoPlayForward />
      </button>
      <button>
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
