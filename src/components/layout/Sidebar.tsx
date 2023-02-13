import { useSetTrack, useSidebarToggle } from "@/util/store/useStore";
import styled from "styled-components";
import UpNextTracks from "../UpNextTracks";

export default function Sidebar() {
  const { isOpen } = useSidebarToggle();
  const { tracks, setTracks } = useSetTrack();
  return (
    <SidebarStyle isOpen={isOpen}>
      <div>
        <h3>Up Next</h3>
        <button type="button" onClick={() => setTracks([])}>
          <h4>Clear</h4>
        </button>
      </div>
      <ul>
        {tracks.map((track, index) => (
          <UpNextTracks track={track} index={index} key={track.id + track.sort} />
        ))}
      </ul>
    </SidebarStyle>
  );
}

const SidebarStyle = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  width: 300px;
  height: calc(100vh - 50px);
  top: 50px;
  border-left: 1px solid #525252;
  background-color: #282828;
  z-index: 1;
  transition: all 0.2s ease-in-out;
  right: ${({ isOpen }) => (isOpen ? 0 : "-300px")};
  overflow: auto;
  padding: 0 20px;
  > div {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 240px;
    background-color: #282828f0;
    padding: 23px 0 10px;
    z-index: 1;
    h3 {
      font-size: 18px;
      font-weight: 700;
    }
    h4 {
      color: ${({ theme }) => theme.colors.main};
    }
  }
  > ul {
    padding: 5px 0;
    border-top: 1px solid #525252;
    margin-top: 53px;
  }
`;
