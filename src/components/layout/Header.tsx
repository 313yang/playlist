import styled from "styled-components";
import dynamic from "next/dynamic";
// import PlayerButtons from "@/components/common/PlayerButtons";
// import PlayerTrack from "@/components/common/PlayerTrack";
import PlayerVolume from "@/components/common/PlayerVolume";
import { IoList } from "react-icons/io5";
import { useSidebarToggle } from "@/util/store/useStore";

const PlayerButtons = dynamic(() => import("@/components/common/PlayerButtons"), { ssr: false });
const PlayerTrack = dynamic(() => import("@/components/common/PlayerTrack"), { ssr: false });

export default function Header() {
  const { setIsOpen, isOpen } = useSidebarToggle();
  return (
    <HeaderStyle isOpen={isOpen}>
      <PlayerButtons />
      <PlayerTrack />
      <PlayerVolume />
      <IoList onClick={setIsOpen} />
    </HeaderStyle>
  );
}
const HeaderStyle = styled.div<{ isOpen: boolean }>`
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
    color: ${({ isOpen, theme }) => (isOpen ? theme.colors.main : "#fff")};
    margin-left: 80px;
  }
`;
