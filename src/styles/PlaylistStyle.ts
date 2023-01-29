import styled from "styled-components";

export const PlaylistContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin-left: 220px;
  > h1 {
    margin: 0 auto;
    width: 1140px;
    font-size: 24px;
    font-weight: 700;
  }
`;
export const TrackListsStyle = styled.ul`
  margin: 40px auto;
  width: 1140px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
`;
export const TracList = styled.li`
  display: flex;
  flex-direction: column;
  > img {
    width: 200px;
    height: 200px;
    border-radius: 4px;
  }
  > h5 {
    font-size: 14px;
    margin: 5px 0;
  }
  > h6 {
    font-size: 12px;
    opacity: 0.4;
  }
`;
