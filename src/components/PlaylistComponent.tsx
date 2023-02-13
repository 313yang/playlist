import Spinner from "@/components/common/Spinner";
import KeywordContainer from "@/components/KeywordContainer";
import TrackListComponent from "@/components/TrackListComponent";
import { searchPlaylistKeyword } from "@/lib/spotify";
import { PlaylistContainer, TrackListsStyle } from "@/styles/PlaylistStyle";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";

interface Props {
  type: { title: string; sub: string };
  keywords: string[];
}

export default function PlaylistComponent({ type, keywords }: Props) {
  const [selected, setSelected] = useState(keywords[0]);
  const { data, isLoading, error } = useQuery([type.title, selected], () =>
    searchPlaylistKeyword(selected)
  );

  if (error) return <div>An error has occurred: </div>;
  return (
    <PlaylistContainer>
      <h1>{type.title}</h1>
      <p>{type.sub}</p>
      <KeywordContainer keywords={keywords} selected={selected} handleSelect={setSelected} />
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

export async function getServerSideProps(props: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([props.type.title, props.keywords[0]], () =>
    searchPlaylistKeyword(props.keywords[0])
  );

  return { props: { ...props, dehydratedState: dehydrate(queryClient) } };
}
