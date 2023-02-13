import styled from "styled-components";
import dynamic from "next/dynamic";
// import PlayerButtons from "@/components/common/PlayerButtons";
// import PlayerTrack from "@/components/common/PlayerTrack";
import PlayerVolume from "@/components/common/PlayerVolume";

const PlayerButtons = dynamic(() => import("@/components/common/PlayerButtons"), { ssr: false });
const PlayerTrack = dynamic(() => import("@/components/common/PlayerTrack"), { ssr: false });

export default function Header() {
  return (
    <HeaderStyle>
      <PlayerButtons />
      <PlayerTrack />
      <PlayerVolume />
    </HeaderStyle>
  );
}
const HeaderStyle = styled.div`
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
`;
