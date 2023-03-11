import styled from "styled-components";

export const Button = styled.button.attrs({ type: "button" })``;
export const FlatButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.main};
  width: 100px;
  height: 28px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 4px;
  > svg {
    margin-right: 4px;
  }
`;
