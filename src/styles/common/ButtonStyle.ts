import styled from "styled-components";

export const FlatButton = styled.button.attrs({ type: "button" })`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.main};
  width: 100px;
  height: 28px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 4px;
`;
