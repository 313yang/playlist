import KeywordContainer from "@/components/KeywordContainer";
import TrackListComponent from "@/components/TrackListComponent";
import { searchPlaylistKeyword } from "@/lib/spotify";
import { PlaylistContainer, TrackListsStyle } from "@/styles/PlaylistStyle";
import { dehydrate, QueryClient, useQuery } from "react-query";

const keyword = [
  "pop",
  "jazz",
  "hip-hop",
  "R&B",
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

export default function Genre({ dehydratedState }: { dehydratedState: () => IPlaylist[] }) {
  const { data, isLoading, error } = useQuery("genre", () => dehydratedState());

  if (isLoading) return <div>Loading</div>;
  if (error) return "An error has occurred: " + error?.message;

  return (
    <PlaylistContainer>
      <h1>Genre</h1>
      <p>Playlists to match genre.</p>
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
  await queryClient.prefetchQuery("genre", () => searchPlaylistKeyword(keyword[0]));

  return { props: { dehydratedState: dehydrate(queryClient) } };
}
