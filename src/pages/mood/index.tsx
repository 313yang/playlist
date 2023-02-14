import PlaylistComponent from "@/components/PlaylistComponent";

const keywords = ["coding", "study", "night", "drive", "fitness", "morning", "rainning", "bathtub"];
export default function Mood() {
  return (
    <PlaylistComponent
      type={{ title: "Mood", sub: "Playlists to match your mood." }}
      keywords={keywords}
    />
  );
}
