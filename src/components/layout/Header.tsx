import styled from "styled-components";
import PlayerVolume from "@/components/common/PlayerVolume";
import { IoList } from "react-icons/io5";
import { usePlayer, usePlayerActions, useSidebar } from "@/util/store/usePlayerStore";
import PlayerButtons from "../common/PlayerButtons";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const PlayerTrack = dynamic(() => import("../common/PlayerTrack"), { ssr: false });

export default function Header() {
  const { sidebarIsOpen, setSidebarsidebarIsOpen } = useSidebar();
  const [play, setPlay] = useState(false);
  const videoRef = useRef<any>(null);

  return (
    <HeaderStyle sidebarIsOpen={sidebarIsOpen}>
      <PlayerButtons videoRef={videoRef} play={play} setPlay={setPlay} />
      <PlayerTrack videoRef={videoRef} play={play} setPlay={setPlay} />
      <PlayerVolume />
      <button type="button" onClick={setSidebarsidebarIsOpen}>
        <IoList />
      </button>
    </HeaderStyle>
  );
}
const HeaderStyle = styled.header<{ sidebarIsOpen: boolean }>`
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
  > button {
    margin-left: 80px;
    display: flex;
    align-items: center;
    svg {
      font-size: 20px;
      color: ${({ sidebarIsOpen, theme }) => (sidebarIsOpen ? theme.colors.main : "#fff")};
    }
  }
`;
