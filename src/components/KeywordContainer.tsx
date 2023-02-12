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
        <Button selected={selected === keyword} onClick={() => handleSelect(keyword)} key={keyword}>
          {keyword}
        </Button>
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
`;
const Button = styled.button.attrs({ type: "button" })<{ selected: boolean }>`
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
