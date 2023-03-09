import React, { ReactElement, useEffect, Suspense, Fragment } from "react";
import Spinner from "@/components/common/Spinner";
import { getFeatured, getNewReleases, searchPlaylistKeyword } from "@/lib/spotify";
import { TrackListsStyle } from "@/styles/PlaylistStyle";
import { toast } from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import TrackSkeleton from "@/components/skeleton/TrackThumbnail";
import useThrottled from "./useThrottle";

const TrackListComponent = React.lazy(() => import("../../components/TrackListComponent"));

const apiKeyword = (keyword: string, pageParam: number) => {
  switch (keyword) {
    case "newRelease":
      return getNewReleases();
    case "featured":
      return getFeatured(pageParam);
    default:
      return searchPlaylistKeyword(keyword, pageParam);
  }
};
export default function useInfinitiScroll(keyword: string, title?: string) {
  const handleThrottle = useThrottled();
  const fetchPage = async ({ pageParam = 0 }) => {
    // API
    const data = await apiKeyword(keyword, pageParam);
    const nextPage = data?.length >= 50 ? pageParam + 1 : undefined;

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
      getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
    }
  );
  const fetchNext = () => {
    console.log("fetch Next!!");
    fetchNextPage();
  };
  const FetchTrackListComponent = (): ReactElement => {
    const [ref, inView] = useInView({
      threshold: 0,
    });

    useEffect(() => {
      if (!data) return;

      const pageLastIdx = data.pages.length - 1;
      const isLast = data?.pages[pageLastIdx].isLast;

      if (!isLast && inView) {
        handleThrottle(fetchNext);
      }
    }, [inView]);

    if (isLoading)
      return (
        <TrackListsStyle>
          <Spinner />
          {Array.from(Array(50), (_, index) => index + 1).map((list) => (
            <TrackSkeleton key={list} />
          ))}
        </TrackListsStyle>
      );

    if (error) toast.error(`Error: ${error}`);
    return (
      <>
        <TrackListsStyle>
          {data?.pages.map((page) => (
            <Fragment key={page.data[0].id}>
              {page.data?.map((list: IPlaylist) => (
                <Suspense key={list.id} fallback={<TrackSkeleton />}>
                  <TrackListComponent track={list} />
                </Suspense>
              ))}
            </Fragment>
          ))}
        </TrackListsStyle>
        <div style={{ width: 1260, margin: "20px auto" }} ref={ref}>
          {isFetchingNextPage && <p>Loading...</p>}
        </div>
      </>
    );
  };

  return {
    FetchTrackListComponent,
  };
}
