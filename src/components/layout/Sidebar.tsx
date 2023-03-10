import { Button } from "@/styles/common/ButtonStyle";
import { useSidebar } from "@/util/store/usePlayerStore";
import { useTrackActions, useTrack } from "@/util/store/useTrackStore";
import styled from "styled-components";
import UpNextTrackList from "../UpNextTrackList";
import UpNextTrackRender from "../UpNextTrackRender";

export default function Sidebar() {
  const { sidebarIsOpen } = useSidebar();
  const { tracks } = useTrack();
  const { handleRemoveTracks } = useTrackActions();

  return (
    <SidebarStyle sidebarIsOpen={sidebarIsOpen}>
      <div>
        <h3>Up Next</h3>
        <Button onClick={handleRemoveTracks}>
          <h4>Clear</h4>
        </Button>
      </div>
      <ul>
        {tracks.map((track, index) => (
          <UpNextTrackList draggable={true} track={track} index={index} key={track.id + track.sort}>
            <UpNextTrackRender track={track} index={index} />
          </UpNextTrackList>
        ))}
        <UpNextTrackList index={tracks.length} draggable={false} />
      </ul>
    </SidebarStyle>
  );
}

const SidebarStyle = styled.aside<{ sidebarIsOpen: boolean }>`
  position: fixed;
  width: 300px;
  height: calc(100vh - 50px);
  top: 50px;
  border-left: 1px solid #525252;
  background-color: #282828;
  z-index: 1;
  transition: all 0.2s ease-in-out;
  right: ${({ sidebarIsOpen }) => (sidebarIsOpen ? 0 : "-300px")};
  overflow: auto;
  padding: 0 20px;
  > div {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 270px;
    transition: all 0.2s ease-in-out;
    right: ${({ sidebarIsOpen }) => (sidebarIsOpen ? "15px" : "-300px")};
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
    position: absolute;
    width: 264px;
    left: 15px;
    padding: 10px 0;
    margin-top: 50px;
  }
`;
