import Spinner from "@/components/common/Spinner";
import TrackListComponent from "@/components/TrackListComponent";
import { getNewReleases, searchPlaylistKeyword } from "@/lib/spotify";
import { TrackListsStyle } from "@/styles/PlaylistStyle";
import { Fragment, ReactElement, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

export default function useInfinitiScroll(keyword: string, title?: string) {
  const fetchPage = async ({ pageParam = 0 }) => {
    // API
    let data = [];
    if (keyword === "newRelease") data = await getNewReleases();
    else data = await searchPlaylistKeyword(keyword, pageParam);
    const nextPage = data.length >= 50 ? pageParam + 1 : undefined;

    return {
      data,
      nextPage,
      isLast: !nextPage,
    };
  };
  const { data, isLoading, fetchNextPage, isFetchingNextPage, error } = useInfiniteQuery(
    !!title ? [title, keyword] : keyword,
    fetchPage,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    }
  );

  const FetchTrackListComponent = (): ReactElement => {
    const [ref, inView] = useInView();

    useEffect(() => {
      if (!data) return;

      const pageLastIdx = data.pages.length - 1;
      const isLast = data?.pages[pageLastIdx].isLast;

      if (!isLast && inView) fetchNextPage();
    }, [inView]);
    if (error) toast.error(`Error: ${error}`);
    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TrackListsStyle>
              {data?.pages.map((page) => (
                <Fragment key={page.data[0].id}>
                  {page.data?.map((list: IPlaylist) => (
                    <TrackListComponent track={list} key={list.id} />
                  ))}
                </Fragment>
              ))}
            </TrackListsStyle>
            <div style={{ width: 1260, margin: "20px auto" }} ref={ref}>
              {isFetchingNextPage && <p>Loading...</p>}
            </div>
          </>
        )}
      </>
    );
  };

  return {
    FetchTrackListComponent,
  };
}
