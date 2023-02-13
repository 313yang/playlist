import { useGetYoutubeId } from "@/util/hooks/useGetYoutubeId";
import { usePlayerState, useSetTrack } from "@/util/store/useStore";
import Image from "next/image";
import { useRef } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import InputRange from "./InputRange";

export default function PlayerTrack() {
  const { track } = useSetTrack();
  const { handleNextTrack } = useSetTrack();
  const { progress, setProgress, volume, play, setPlay } = usePlayerState();
  const { data } = useGetYoutubeId();
  const videoRef = useRef<any>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(+e.target.value);
    videoRef.current.seekTo(+e.target.value);
  };

  return (
    <PlayerTrackWrap>
      {!!track ? (
        <div>
          <Image width={"40"} height={"40"} src={track.image} alt={track.time} />
          <div>
            <h6>{track.title}</h6>
            <h6>{track.artist}</h6>
            <InputRange
              min={0}
              max={1}
              step={0.000001}
              value={progress}
              handleOnChange={handleOnChange}
            />
          </div>

          <ReactPlayer
            ref={videoRef}
            url={`https://youtu.be/${data}`}
            width="0"
            height="0"
            volume={volume}
            playing={play}
            onReady={() => setPlay(true)}
            onEnded={handleNextTrack}
            onProgress={(e) => setProgress(e.played)}
          />
        </div>
      ) : (
        <div>
          <div style={{ backgroundColor: "#ddd", width: 40, height: 40 }} />
          <div>
            <p>Not played</p>
          </div>
        </div>
      )}
    </PlayerTrackWrap>
  );
}
const PlayerTrackWrap = styled.div`
  width: 440px;
  background-color: #4d4d4d;
  border-radius: 2px;
  > div {
    width: 100%;
    display: flex;
    > img {
      border-radius: 2px;
    }
    > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding-top: 5px;
      > h6 {
        font-size: 12px;
        font-weight: 500;
        :nth-child(2) {
          margin-bottom: 2px;
          opacity: 0.6;
        }
      }
      input {
        -webkit-appearance: none;
        overflow: hidden;
        width: 100%;
        height: 3px;
        background: transparent;
        cursor: pointer;
        background: #5f5f5f;
        border-radius: 0; /* iOS */
      }

      input:focus {
        outline: none;
      }

      input::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 3px;
        height: 3px;
        background: #b8b8b8;
        box-shadow: -100vw 0 0 100vw #b8b8b8;
        border: 0.1px solid #b8b8b8;
        cursor: pointer;
      }
    }
  }
`;
