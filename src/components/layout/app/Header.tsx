import { contentWidth } from "@/styles/GlobalStyle";
import styled from "styled-components";

export default function Header() {
  return (
    <HeaderStyle>
      <div>Playlisy</div>
      <div>‹↺▷</div>
      <div>재생중</div>
      <div>재생목록</div>
    </HeaderStyle>
  );
}
const HeaderStyle = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c2c2c;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  /* ${contentWidth}; */
`;
