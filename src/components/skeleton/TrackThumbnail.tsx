import styled from "styled-components";

export default function TrackSkeleton() {
  return (
    <TrackThumbnail>
      <div />
      <span />
      <span />
    </TrackThumbnail>
  );
}

const TrackThumbnail = styled.li`
  display: flex;
  flex-direction: column;
  > div {
    width: 200px;
    height: 200px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.2);
  }
  > span {
    background-color: rgba(255, 255, 255, 0.2);
    display: inline-block;
    height: 12px;
    margin: 8px 0 2px;
    width: 200px;
  }
`;
