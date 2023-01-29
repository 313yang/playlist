import styled from "styled-components";

export default function KeywordContainer({ keywords }: { keywords: string[] }) {
  return (
    <Container>
      {keywords.map((keyword) => (
        <button key={keyword}>{keyword}</button>
      ))}
    </Container>
  );
}
const Container = styled.div`
  width: 1140px;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin: 30px auto 0;
  border: 0.5px solid rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  > button {
    font-size: 14px;
    height: 7.5px;
    display: flex;
    align-items: center;
    :not(:last-child) {
      margin-right: 8px;
      padding-right: 8px;
      border-right: 1px solid rgba(255, 255, 255, 0.4);
    }
  }
`;
