import Link from "next/link";
import styled from "styled-components";

export default function Navbar() {
  return (
    <NavStyle>
      <p>Playstify</p>
      <input placeholder="search..." />
      <ul>
        <li>
          <Link href={"/"}>New Music</Link>
        </li>
        <li>
          <Link href={"/mood"}>Mood</Link>
        </li>
        <li>
          <Link href={"/genere"}>Genere</Link>
        </li>
      </ul>
    </NavStyle>
  );
}

const NavStyle = styled.nav`
  width: 220px;
  height: 100vh;
  border-right: 1px solid #525252;
  background-color: rgba(37, 37, 38, 1);
  padding: 18px;
  position: fixed;
  top: 0;
  left: 0;
  > p {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 24px;
  }
  > input {
    width: 100%;
    background: #1f1f1f;
    border: 1px solid #3b3b3c;
    border-radius: 4px;
    padding: 5px 8px;
    margin-bottom: 24px;
  }
  > ul {
    display: flex;
    flex-direction: column;
    > li {
      > a {
        font-size: 18px;
        font-weight: 800;
      }
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
`;
