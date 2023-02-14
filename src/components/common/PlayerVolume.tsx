import { usePlayer, usePlayerActions } from "@/util/store/usePlayerStore";
import { IoVolumeLow, IoVolumeMedium, IoVolumeMute } from "react-icons/io5";
import styled from "styled-components";
import InputRange from "./InputRange";

export default function PlayerVolume() {
  const { volume } = usePlayer();
  const { setVolume } = usePlayerActions();

  const handleVolumeOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVolume(+e.target.value);

  return (
    <VolumeWrap>
      {volume > 0.5 && <IoVolumeMedium />}
      {volume > 0 && volume <= 0.5 && <IoVolumeLow />}
      {volume === 0 && <IoVolumeMute />}
      <InputRange
        styles={{
          background: `linear-gradient(to right, #b8b8b8 0%, #b8b8b8 ${
            (volume || 0) * 100
          }%, #5f5f5f ${(volume || 0) * 100}%)`,
        }}
        min={0}
        max={1}
        step={0.1}
        value={volume}
        handleOnChange={handleVolumeOnChange}
      />
    </VolumeWrap>
  );
}
const VolumeWrap = styled.div`
  margin-left: 80px;
  width: 90px;
  > svg {
    margin-right: 8px;
  }
  > input {
    &::-webkit-slider-thumb {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #fff;
    }
    &::-moz-range-thumb {
      width: 11px;
      height: 11px;
      background: #fff;
      border-radius: 50%;
    }
  }
`;
