import styled from "styled-components";
interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function InputRange({ min, max, step, value, handleOnChange }: Props) {
  return (
    <StyleInputRange min={min} max={max} step={step} value={value} onChange={handleOnChange} />
  );
}
const StyleInputRange = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  overflow: hidden;
  width: 100%;
  height: 3px;
  background: transparent;
  cursor: pointer;
  background: #5f5f5f;
  border-radius: 0; /* iOS */
  &:focus {
    outline: none;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 3px;
    height: 3px;
    background: #b8b8b8;
    box-shadow: -100vw 0 0 100vw #b8b8b8;
    border: 0.1px solid #b8b8b8;
    cursor: pointer;
  }
`;
