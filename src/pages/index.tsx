import TrackListComponent from "@/components/TrackListComponent";
import { getNewReleases } from "@/lib/spotify";
import { PlaylistContainer, TrackListsStyle } from "@/styles/PlaylistStyle";
import { dehydrate, QueryClient, useQuery } from "react-query";

export default function Home({ dehydratedState }: { dehydratedState: () => IPlaylist[] }) {
  const { data, isLoading, error } = useQuery("newRelease", () => dehydratedState());

  if (isLoading) return <div>Loading</div>;
  if (error) return "An error has occurred: " + error?.message;

  return (
    <PlaylistContainer>
      <h1>New Music</h1>
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
  await queryClient.prefetchQuery("newRelease", () => getNewReleases());

  return { props: { dehydratedState: dehydrate(queryClient) } };
}
