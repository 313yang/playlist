import Spinner from "@/components/common/Spinner";
import { searchPlaylistKeyword } from "@/lib/spotify";
import { PlaylistContainer, TrackListsStyle } from "@/styles/PlaylistStyle";
import { useSetTrack } from "@/util/store/useStore";
import { useEffect } from "react";
import { useQuery } from "react-query";
import TrackListComponent from "@/components/TrackListComponent";

export default function SearchKeyword({ keyword }: { keyword: string }) {
  const { data, isLoading, error } = useQuery([keyword], () => searchPlaylistKeyword(keyword));
  const { setTracks } = useSetTrack();

  useEffect(() => {
    !!data && setTracks(data);
  }, [data]);

  return (
    <PlaylistContainer>
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

export const getServerSideProps = ({ params: { keyword } }: { params: { keyword: string } }) => {
  return { props: { keyword } };
};
