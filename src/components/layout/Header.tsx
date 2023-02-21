import styled from "styled-components";
import PlayerVolume from "@/components/common/PlayerVolume";
import { IoClose, IoList, IoMenu } from "react-icons/io5";
import { useSidebar } from "@/util/store/usePlayerStore";
import PlayerButtons from "../common/PlayerButtons";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const PlayerTrack = dynamic(() => import("../common/PlayerTrack"), { ssr: false });

export default function Header() {
  const { sidebarIsOpen, setSidebarsidebarIsOpen, navbarIsOpen, setNavbarsidebarIsOpen } =
    useSidebar();
  const [play, setPlay] = useState(false);
  const videoRef = useRef<any>(null);

  return (
    <HeaderStyle navbarIsOpen={navbarIsOpen} sidebarIsOpen={sidebarIsOpen}>
      <button type="button" onClick={setNavbarsidebarIsOpen}>
        {navbarIsOpen ? <IoClose /> : <IoMenu />}
      </button>
      <PlayerButtons videoRef={videoRef} play={play} setPlay={setPlay} />
      <PlayerTrack videoRef={videoRef} play={play} setPlay={setPlay} />
      <PlayerVolume />
      <button type="button" onClick={setSidebarsidebarIsOpen}>
        <IoList />
      </button>
    </HeaderStyle>
  );
}
const HeaderStyle = styled.header<{ sidebarIsOpen: boolean; navbarIsOpen: boolean }>`
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
    :first-child {
      display: none;
    }
    svg {
      font-size: 20px;
      color: ${({ sidebarIsOpen, theme }) => (sidebarIsOpen ? theme.colors.main : "#fff")};
    }
  }
  @media screen and (max-width: 1025px) {
    justify-content: space-between;
    padding: 0 20px;
    > button {
      margin-left: 0;
      :first-child {
        display: flex;
        transition: all 0.2s ease;
        svg {
          color: ${({ navbarIsOpen, theme }) => (navbarIsOpen ? theme.colors.main : "#fff")};
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    padding: 0 10px;
  }
`;
