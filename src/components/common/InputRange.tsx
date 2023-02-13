import styled from "styled-components";
interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: any;
}
export default function InputRange({ min, max, step, value, handleOnChange, styles }: Props) {
  return (
    <StyleInputRange
      style={styles}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleOnChange}
    />
  );
}
const StyleInputRange = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
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
    border: 0.1px solid #b8b8b8;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    -webkit-appearance: none;
    width: 3px;
    height: 3px;
    background: #b8b8b8;
    border: 1px solid dodgerblue;
    cursor: pointer;
  }
`;
