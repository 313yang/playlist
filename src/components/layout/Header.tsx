import styled from "styled-components";
import PlayerVolume from "@/components/common/PlayerVolume";
import { IoList } from "react-icons/io5";
import { usePlayer, usePlayerActions } from "@/util/store/usePlayerStore";
import PlayerButtons from "../common/PlayerButtons";
import PlayerTrack from "../common/PlayerTrack";

export default function Header() {
  const { sidebarIsOpen } = usePlayer();
  const { setSidebarsidebarIsOpen } = usePlayerActions();

  return (
    <HeaderStyle sidebarIsOpen={sidebarIsOpen}>
      <PlayerButtons />
      <PlayerTrack />
      <PlayerVolume />
      <IoList onClick={setSidebarsidebarIsOpen} />
    </HeaderStyle>
  );
}
const HeaderStyle = styled.div<{ sidebarIsOpen: boolean }>`
  position: sticky;
  top: 0;
  z-index: 1;
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
  > svg {
    color: ${({ sidebarIsOpen, theme }) => (sidebarIsOpen ? theme.colors.main : "#fff")};
    margin-left: 80px;
  }
`;
