import { contentWidth } from "@/styles/GlobalStyle";
import { usePlayerState, useSetTrack } from "@/util/store/useStore";
import styled from "styled-components";
import { useGetYoutubeId } from "@/util/hooks/useGetYoutubeId";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import PlayerButtons from "@/components/common/PlayerButtons";
import PlayerTrack from "@/components/common/PlayerTrack";
import PlayerVolume from "@/components/common/PlayerVolume";

export default function Header() {
  const { handleNextTrack } = useSetTrack();
  const { setProgress, volume } = usePlayerState();
  const { data } = useGetYoutubeId();
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);

  return (
    <HeaderStyle>
      <PlayerButtons setPlay={setPlay} play={play} />
      <PlayerTrack videoRef={videoRef} />
      <PlayerVolume />

      {!!data && (
        <ReactPlayer
          ref={videoRef}
          url={`https://youtu.be/${data}`}
          width="0"
          height={"0"}
          onSeek={(e) => console.log(e)}
          volume={volume}
          playing={play}
          onReady={() => setPlay(true)}
          onPlay={() => setPlay(true)}
          onEnded={handleNextTrack}
          onProgress={(e) => setProgress(e.played)}
        />
      )}
    </HeaderStyle>
  );
}
const HeaderStyle = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c2c2c;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  > div {
    display: flex;
    align-items: center;
  }
  /* ${contentWidth}; */
`;
