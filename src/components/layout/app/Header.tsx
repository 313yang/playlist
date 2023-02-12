import { contentWidth } from "@/styles/GlobalStyle";
import { useSetTrack } from "@/util/store/useStore";
import styled from "styled-components";
import { useGetYoutubeId } from "@/util/hooks/useGetYoutubeId";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import PlayerButtons from "@/components/common/PlayerButtons";
import PlayerTrack from "@/components/common/PlayerTrack";

export default function Header() {
  const { handleNextTrack } = useSetTrack();
  const [progress, setProgress] = useState(0);
  const { data } = useGetYoutubeId();
  const [volumn, setVolumn] = useState(100);
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);
  useEffect(() => {
    if (data) setPlay(true);
  }, [data]);

  return (
    <HeaderStyle>
      <PlayerButtons setPlay={setPlay} play={play} />
      <PlayerTrack progress={progress} setProgress={setProgress} videoRef={videoRef} />
      <div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volumn}
          onChange={(e) => setVolumn(+e.target.value)}
        />
      </div>

      {!!data && (
        <ReactPlayer
          ref={videoRef}
          url={`https://youtu.be/${data}`}
          width="0"
          height={"0"}
          onSeek={(e) => console.log(e)}
          volume={volumn}
          playing={play}
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
