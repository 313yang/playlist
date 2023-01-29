import KeywordContainer from "@/components/KeywordContainer";
import TrackListComponent from "@/components/TrackListComponent";
import { searchPlaylistKeyword } from "@/lib/spotify";
import { PlaylistContainer, TrackListsStyle } from "@/styles/PlaylistStyle";
import { dehydrate, QueryClient, useQuery } from "react-query";

const keyword = ["coding", "study", "night", "drive", "fitness", "morning", "rainning", "bathtub"];
export default function Mood({ dehydratedState }: { dehydratedState: () => IPlaylist[] }) {
  const { data, isLoading, error } = useQuery("mood", () => dehydratedState());

  if (isLoading) return <div>Loading</div>;
  if (error) return "An error has occurred: " + error?.message;

  return (
    <PlaylistContainer>
      <h1>Mood</h1>
      <p>Playlists to match your mood.</p>
      <KeywordContainer keywords={keyword} />
      <TrackListsStyle>
        {data?.map((list) => (
          <TrackListComponent track={list} key={list.id} />
        ))}
      </TrackListsStyle>
    </PlaylistContainer>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("mood", () => searchPlaylistKeyword(keyword[0]));

  return { props: { dehydratedState: dehydrate(queryClient) } };
}
