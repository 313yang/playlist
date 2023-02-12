import { contentWidth } from "@/styles/GlobalStyle";
import { useSelectPlaylist, useSetTrack } from "@/util/store/useStore";
import styled from "styled-components";
import Image from "next/image";

import { useGetYoutubeId } from "@/util/hooks/useGetYoutubeId";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Header() {
  const { handleNextTrack, handlePrevTrack, track } = useSetTrack();

  const { data } = useGetYoutubeId();
  const [volumn, setVolumn] = useState(100);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (data) setPlay(true);
  }, [data]);

  // console.log(playlist, trackNum);
  return (
    <HeaderStyle>
      <div>
        <div onClick={handlePrevTrack}>이전</div>
        <div onClick={() => setPlay(!play)}>▷</div>
        <div onClick={handleNextTrack}>다음</div>
      </div>
      {!!track ? (
        <div>
          <Image width={"40"} height={"40"} src={track.image} alt={track.time} />
          <p>{track.title}</p>
          <p>{track.artist}</p>
        </div>
      ) : (
        <div>Not played</div>
      )}
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
          url={`https://youtu.be/${data}`}
          width="10px"
          height={"10px"}
          volume={volumn}
          playing={play}
          onPlay={() => setPlay(true)}
          onEnded={handleNextTrack}
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
  /* ${contentWidth}; */
`;
