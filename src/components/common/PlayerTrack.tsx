import { textHidden } from "@/styles/GlobalStyle";
import { msToMinutesAndSeconds } from "@/util/common/durationTime";
import { useGetYoutubeId } from "@/util/hooks/useGetYoutubeId";
import { usePlayer, usePlayerActions } from "@/util/store/usePlayerStore";
import { useTrackActions, useTrack } from "@/util/store/useTrackStore";
import Image from "next/image";
import { MutableRefObject, useState } from "react";
import { RiPlayListFill } from "react-icons/ri";
import ReactPlayer from "react-player";
import styled from "styled-components";
import InputRange from "./InputRange";

export default function PlayerTrack({
  play,
  setPlay,
  videoRef,
}: {
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  videoRef: MutableRefObject<any>;
}) {
  const { track, repeat } = useTrack();
  const { handleNextTrack } = useTrackActions();
  const { volume, playedSeconds } = usePlayer();
  const { setPlayedSeconds } = usePlayerActions();
  const { data } = useGetYoutubeId();
  const [progress, setProgress] = useState(0);
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
            <span className="hover_time">
              <p>{msToMinutesAndSeconds(Math.floor(playedSeconds * 1000))}</p>
              <p>{track.time}</p>
            </span>
          </div>

          <ReactPlayer
            id={"reactPlayer"}
            ref={videoRef}
            url={`https://youtu.be/${data}`}
            width="0"
            height="0"
            loop={repeat === "loop"}
            volume={volume}
            playing={play}
            onReady={() => setPlay(true)}
            onEnded={handleNextTrack}
            onProgress={(e) => {
              setProgress(e.played);
              setPlayedSeconds(e.playedSeconds);
            }}
          />
        </div>
      ) : (
        <div>
          <div style={{ backgroundColor: "#646464", width: 40, height: 40, borderRadius: 2 }} />
          <div style={{ justifyContent: "center", padding: 0 }}>
            <RiPlayListFill />
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
      position: relative;
      .hover_time {
        display: none;
        justify-content: space-between;
        position: absolute;
        bottom: 5px;
        width: 100%;
        padding: 0 5px;
        font-size: 10px;
        font-weight: 500;
        opacity: 0.4;
      }
      :hover {
        .hover_time {
          display: flex;
        }
      }
      > h6 {
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        width: 350px;
        ${textHidden}
        :nth-child(2) {
          margin-bottom: 2px;
          opacity: 0.6;
        }
      }
      > svg {
        font-size: 14px;
        opacity: 0.4;
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
  @media screen and (max-width: 1025px) {
    > div {
      > div {
        > h6 {
          text-align: start;
          width: 210px;
          margin-right: 170px;
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    width: 70vw;
    > div {
      > div {
        > h6 {
          width: 33vw;
          margin-right: 23vw;
        }
      }
    }
  }
`;
