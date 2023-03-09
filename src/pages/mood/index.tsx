import { memo } from "react";
import PlaylistComponent from "@/components/PlaylistComponent";

const keywords = ["coding", "study", "night", "drive", "fitness", "morning", "rainning", "bathtub"];
const Mood = () => {
  return (
    <PlaylistComponent
      type={{ title: "Mood", sub: "Playlists to match your mood." }}
      keywords={keywords}
    />
  );
};
export default memo(Mood);
