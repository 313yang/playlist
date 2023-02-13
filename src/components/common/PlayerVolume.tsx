import { usePlayerState } from "@/util/store/useStore";
import InputRange from "./InputRange";

export default function PlayerVolume() {
  const { setVolume, volume } = usePlayerState();
  const handleVolumeOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVolume(+e.target.value);

  return (
    <div>
      <InputRange min={0} max={1} step={0.1} value={volume} handleOnChange={handleVolumeOnChange} />
    </div>
  );
}
