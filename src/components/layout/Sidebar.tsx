import { useSetTrack, useSidebarToggle } from "@/util/store/useStore";
import styled from "styled-components";
import UpNextTracks from "../UpNextTracks";

export default function Sidebar() {
  const { isOpen } = useSidebarToggle();
  const { tracks } = useSetTrack();
  return (
    <SidebarStyle isOpen={isOpen}>
      <h3>Up Next</h3>
      <ul>
        {tracks.map((track, index) => (
          <UpNextTracks track={track} index={index} key={track.id} />
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
  > h3 {
    position: fixed;
    width: 100%;
    background-color: #282828f0;
    padding: 23px 0 10px;
    font-size: 18px;
    font-weight: 700;
    z-index: 1;
  }
  > ul {
    padding: 5px 0;
    border-top: 1px solid #525252;
    margin-top: 53px;
  }
`;
