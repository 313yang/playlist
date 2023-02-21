import styled from "styled-components";
import { contentWidth } from "./GlobalStyle";

export const CurrentTrackContainer = styled.div`
  ${contentWidth}
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
  > img {
    width: 300px;
    border-radius: 10px;
    margin-right: 30px;
  }
  > div {
    h1 {
      font-size: 26px;
      font-weight: 700;
      margin-bottom: 22px;
    }
    > h2 {
      opacity: 0.4;
      margin-bottom: 22px;
    }
    > div {
      display: flex;
      > button {
        > svg {
          margin-left: -6px;
        }
        :not(:last-child) {
          margin-right: 10px;
        }
      }
    }
  }
  @media screen and (max-width: 1025px) {
    width: 90%;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    > img {
      width: 200px;
      height: 200px;
      object-fit: cover;
      margin-right: 0;
      margin-bottom: 10px;
    }
    > div {
      text-align: center;
      h1 {
        margin-bottom: 12px;
      }
    }
  }
`;
