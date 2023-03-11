import { Button } from "@/styles/common/ButtonStyle";
import { contentWidth } from "@/styles/GlobalStyle";
import styled from "styled-components";

export default function KeywordContainer({
  keywords,
  handleSelect,
  selected,
}: {
  keywords: string[];
  handleSelect: (key: string) => void;
  selected: string;
}) {
  return (
    <Container>
      {keywords.map((keyword) => (
        <StyleButton
          selected={selected === keyword}
          onClick={() => handleSelect(keyword)}
          key={keyword}
        >
          {keyword}
        </StyleButton>
      ))}
    </Container>
  );
}
const Container = styled.div`
  ${contentWidth};
  height: 32px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin: 30px auto;
  border: 0.5px solid rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  @media screen and (max-width: 1025px) {
    width: 90%;
    flex-wrap: wrap;
    height: fit-content;
    gap: 16px 0;
  }
`;
const StyleButton = styled(Button)<{ selected: boolean }>`
  font-size: 14px;
  height: 7.5px;
  display: flex;
  align-items: center;
  :not(:last-child) {
    margin-right: 8px;
    padding-right: 8px;
    border-right: 1px solid rgba(255, 255, 255, 0.4);
  }
  opacity: ${({ selected }) => (selected ? 1 : 0.4)};
`;
