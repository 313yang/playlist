import { getNewReleases } from "@/lib/spotify";
import { PlaylistContainer, TrackListsStyle, TracList } from "@/styles/PlaylistStyle";
import Image from "next/image";
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
          <TracList key={list.id}>
            <Image width="180" height={"180"} src={list.image} alt={list.image} />
            <h5>{list.title}</h5>
            <h6>{list.sub}</h6>
          </TracList>
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
