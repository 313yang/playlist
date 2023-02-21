import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import icon from "public/icon.svg";
import Image from "next/image";
import { useSidebar } from "@/util/store/usePlayerStore";

export default function Navbar() {
  const router = useRouter();
  const { navbarIsOpen } = useSidebar();
  const [keyword, setKeyword] = useState("");
  return (
    <NavStyle isShow={navbarIsOpen}>
      <Link href={"/"}>
        <Image src={icon} width="20" height="20" alt="logo" />
        <h1>Soundy</h1>
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search/${keyword}`);
        }}
      >
        <input
          placeholder="search..."
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
      </form>
      <ul>
        <li>
          <Link href={"/"}>New</Link>
        </li>
        <li>
          <Link href={"/mood"}>Mood</Link>
        </li>
        <li>
          <Link href={"/genre"}>Genre</Link>
        </li>
      </ul>
    </NavStyle>
  );
}

const NavStyle = styled.nav<{ isShow: boolean }>`
  width: 220px;
  height: 100vh;
  border-right: 1px solid #525252;
  background-color: ${({ theme }) => theme.colors.darkGray};
  padding: 18px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  > a {
    display: flex;
    align-items: center;
    margin-bottom: 22px;
    > img {
      margin-right: 10px;
    }
    h1 {
      font-size: 24px;
      font-weight: 900;
    }
  }

  > form > input {
    width: 100%;
    background: ${({ theme }) => theme.colors.bgColor};
    border: 1px solid #3b3b3c;
    border-radius: 4px;
    padding: 5px 8px;
    margin-bottom: 24px;
    ::placeholder {
      opacity: 0.4;
    }
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
  @media screen and (max-width: 1025px) {
    top: 50px;
    height: calc(100vh - 50px);
    left: ${({ isShow }) => (isShow ? 0 : "-220px")};
  }
`;
