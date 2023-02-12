import PlaylistComponent from "@/components/PlaylistComponent";

const keywords = [
  "pop",
  "jazz",
  "hip-hop",
  "r&b",
  "rock",
  "k-pop",
  "j-pop",
  "dance",
  "reggae",
  "lofi",
  "citypop",
  "classic",
  "ost",
];

export default function Genre() {
  return (
    <PlaylistComponent
      type={{ title: "Genre", sub: "Playlists to match genre." }}
      keywords={keywords}
    />
  );
}
