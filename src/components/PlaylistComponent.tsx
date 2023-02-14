import Spinner from "@/components/common/Spinner";
import KeywordContainer from "@/components/KeywordContainer";
import TrackListComponent from "@/components/TrackListComponent";
import { searchPlaylistKeyword } from "@/lib/spotify";
import { PlaylistContainer, TrackListsStyle } from "@/styles/PlaylistStyle";
import { Fragment, useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import useInfinitiScroll from "@/util/hooks/useInfinityScroll";
interface Props {
  type: { title: string; sub: string };
  keywords: string[];
}

export default function PlaylistComponent({ type, keywords }: Props) {
  const [selected, setSelected] = useState(keywords[0]);
  const { error, data, isLoading, ObservationComponent } = useInfinitiScroll(selected, type.title);

  if (error) return <div>An error has occurred</div>;
  return (
    <PlaylistContainer>
      <h1>{type.title}</h1>
      <p>{type.sub}</p>
      <KeywordContainer keywords={keywords} selected={selected} handleSelect={setSelected} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <TrackListsStyle>
            {data &&
              data.pages?.map((page) => (
                <Fragment key={page.data[0].id}>
                  {page.data?.map((list: IPlaylist) => (
                    <TrackListComponent track={list} key={list.id} />
                  ))}
                </Fragment>
              ))}
          </TrackListsStyle>
          {<ObservationComponent />}
        </>
      )}
    </PlaylistContainer>
  );
}

export async function getServerSideProps(props: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([props.type.title, props.keywords[0]], () =>
    searchPlaylistKeyword(props.keywords[0], 0)
  );

  return { props: { ...props, dehydratedState: dehydrate(queryClient) } };
}
