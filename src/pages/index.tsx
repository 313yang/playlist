import Spinner from "@/components/common/Spinner";
import TrackListComponent from "@/components/TrackListComponent";
import { getNewReleases } from "@/lib/spotify";
import { PlaylistContainer, TrackListsStyle } from "@/styles/PlaylistStyle";
import { dehydrate, QueryClient, useQuery } from "react-query";

export default function Home() {
  const { data, isLoading, error } = useQuery("newRelease", () => getNewReleases());

  return (
    <PlaylistContainer>
      <h1 style={{ marginBottom: 30 }}>New Music</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <TrackListsStyle>
          {data?.map((list: IPlaylist) => (
            <TrackListComponent track={list} key={list.id} />
          ))}
        </TrackListsStyle>
      )}
    </PlaylistContainer>
  );
}
export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("newRelease", () => getNewReleases());

  return { props: { dehydratedState: dehydrate(queryClient) } };
}
