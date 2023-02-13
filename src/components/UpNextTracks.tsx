import { currentTrackCSS, textHidden } from "@/styles/GlobalStyle";
import { useSetTrack } from "@/util/store/useStore";
import Image from "next/image";
import { IoPlay } from "react-icons/io5";
import styled from "styled-components";

export default function UpNextTracks({ track, index }: { track: ITrack; index: number }) {
  const { setTrackNum, trackNum } = useSetTrack();
  return (
    <TrackListStyle currentTrack={index === trackNum} onClick={() => setTrackNum(index)}>
      <div className="currentTrack">
        <IoPlay />
      </div>
      <Image width={"40"} height="40" src={track.image} alt={track.title} />
      <div>
        <div>
          <p>{track.title}</p>
          <p>{track.artist}</p>
        </div>
        <p>{track.time}</p>
      </div>
    </TrackListStyle>
  );
}

const TrackListStyle = styled.li<{ currentTrack: boolean }>`
  display: flex;
  align-items: center;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 4px;
  padding: 5px;
  ${currentTrackCSS};
  > img {
    border-radius: 4px;
    margin-right: 10px;
  }
  p {
    font-size: 12px;
    font-weight: 500;
  }
  > div {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: ${({ currentTrack }) => !currentTrack && "1px solid #525252"};
    > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      > p {
        width: 145px;
        ${textHidden}
        :last-child {
          opacity: 0.6;
          margin-top: 5px;
        }
      }
    }
  }
`;
