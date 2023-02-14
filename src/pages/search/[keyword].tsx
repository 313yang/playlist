import Spinner from "@/components/common/Spinner";
import { PlaylistContainer, TrackListsStyle } from "@/styles/PlaylistStyle";
import TrackListComponent from "@/components/TrackListComponent";
import useInfinitiScroll from "@/util/hooks/useInfinityScroll";
import { Fragment } from "react";

export default function SearchKeyword({ keyword }: { keyword: string }) {
  const { error, data, isLoading, ObservationComponent } = useInfinitiScroll(keyword);

  if (error) return <div>An error has occurred</div>;

  return (
    <PlaylistContainer>
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

export const getServerSideProps = ({ params: { keyword } }: { params: { keyword: string } }) => {
  return { props: { keyword } };
};
