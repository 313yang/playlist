import { searchPlaylistKeyword } from "@/lib/spotify";
import { ReactElement, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

export default function useInfinitiScroll(keyword: string, title?: string) {
  const fetchPage = async ({ pageParam = 0 }) => {
    // API
    const data = await searchPlaylistKeyword(keyword, pageParam);
    const nextPage = data.length >= 50 ? pageParam + 1 : undefined;

    return {
      data,
      nextPage,
      isLast: !nextPage,
    };
  };
  const { data, isLoading, fetchNextPage, error } = useInfiniteQuery(
    !!title ? [title, keyword] : keyword,
    fetchPage,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    }
  );

  const ObservationComponent = (): ReactElement => {
    const [ref, inView] = useInView();

    useEffect(() => {
      if (!data) return;

      const pageLastIdx = data.pages.length - 1;
      const isLast = data?.pages[pageLastIdx].isLast;

      if (!isLast && inView) fetchNextPage();
    }, [inView]);

    return <div ref={ref} />;
  };

  return {
    data,
    isLoading,
    error,
    ObservationComponent,
  };
}
