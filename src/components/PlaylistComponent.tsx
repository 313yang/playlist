import Spinner from "@/components/common/Spinner";
import KeywordContainer from "@/components/KeywordContainer";
import TrackListComponent from "@/components/TrackListComponent";
import { searchPlaylistKeyword } from "@/lib/spotify";
import { PlaylistContainer, TrackListsStyle } from "@/styles/PlaylistStyle";
import { Fragment, useEffect, useState } from "react";
import { dehydrate, QueryClient, useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
interface Props {
  type: { title: string; sub: string };
  keywords: string[];
}

export default function PlaylistComponent({ type, keywords }: Props) {
  const [selected, setSelected] = useState(keywords[0]);
  const { ref, inView } = useInView();

  const fetchPage = async ({ pageParam = 0 }) => {
    // API
    const data = await searchPlaylistKeyword(selected, pageParam);
    const nextPage = data.length >= 50 ? pageParam + 1 : undefined;

    return {
      data,
      nextPage,
      isLast: !nextPage,
    };
  };
  const { data, isLoading, fetchNextPage, error } = useInfiniteQuery(
    [type.title, selected],
    fetchPage,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    }
  );

  useEffect(() => {
    if (!data) return;

    const pageLastIdx = data.pages.length - 1;
    const isLast = data?.pages[pageLastIdx].isLast;

    if (!isLast && inView) fetchNextPage();
  }, [inView]);

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
          <div ref={ref} />
        </>
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
