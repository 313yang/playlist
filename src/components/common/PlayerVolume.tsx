import { usePlayer, usePlayerActions } from "@/util/store/usePlayerStore";
import { useState } from "react";
import { IoVolumeLow, IoVolumeMedium, IoVolumeMute } from "react-icons/io5";
import styled from "styled-components";
import InputRange from "./InputRange";

export default function PlayerVolume() {
  const { volume } = usePlayer();
  const { setVolume } = usePlayerActions();
  const [beforeVolume, setBeforeVolume] = useState(volume);

  const handleVolumeOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVolume(+e.target.value);
  const handleMute = () => {
    if (volume > 0) {
      setBeforeVolume(volume);
      setVolume(0);
    } else {
      setVolume(beforeVolume);
    }
  };
  return (
    <VolumeWrap>
      <button type="button" onClick={handleMute}>
        {volume > 0.5 && <IoVolumeMedium />}
        {volume > 0 && volume <= 0.5 && <IoVolumeLow />}
        {volume === 0 && <IoVolumeMute />}
      </button>

      <InputRange
        styles={{
          background: `linear-gradient(to right, #b8b8b8 0%, #b8b8b8 ${
            (volume || 0) * 100
          }%, #5f5f5f ${(volume || 0) * 100}%)`,
        }}
        min={0}
        max={1}
        step={0.01}
        value={volume}
        handleOnChange={handleVolumeOnChange}
      />
    </VolumeWrap>
  );
}
const VolumeWrap = styled.div`
  margin-left: 80px;
  width: 110px;
  > button {
    display: flex;
    align-items: center;
    margin-right: 8px;
    > svg {
      font-size: 14px;
    }
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
