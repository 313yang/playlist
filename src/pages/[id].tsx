import Spinner from "@/components/common/Spinner";
import TrackTable from "@/components/TrackTable";
import { searchTrackById } from "@/lib/spotify";
import { FlatButton } from "@/styles/common/ButtonStyle";
import { CurrentTrackContainer } from "@/styles/CurrentTrack";
import { PlaylistContainer } from "@/styles/PlaylistStyle";
import { useSelectPlaylist, useSetTrack } from "@/util/store/useStore";
import Image from "next/image";
import { IoAdd, IoPlay, IoShuffle } from "react-icons/io5";
import { useEffect } from "react";
import { useGetYoutubeId } from "@/util/hooks/useGetYoutubeId";
import { useQuery } from "react-query";

export default function Playlist({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery(["playlist", id], () => searchTrackById(id));

  const { playlist } = useSelectPlaylist();
  const { setTrackNum, setRandomTracks, setTracks, tracks, track } = useSetTrack();
  const { refetch } = useGetYoutubeId();

  const handleSetTracks = () => {
    refetch();
    setTracks([...data]);
    setTrackNum(0);
    console.log(data);
  };
  const handleSetRandomTracks = () => {
    setRandomTracks([...data]);
    setTrackNum(0);
  };
  const handleSetAddTracks = () => {
    /* 기존 플레이리스트에 추가 & 트랙재생 그대로 , 플레이리스트 없는경우 다시 트랙 시작*/
    if (tracks.length > 0)
      setTracks([
        ...tracks,
        ...data.map((list: ITrack, index: number) => ({ ...list, sort: tracks.length + index })),
      ]);
    else handleSetTracks();
  };

  return (
    <PlaylistContainer>
      {!!playlist && (
        <CurrentTrackContainer>
          <Image src={playlist.image} alt={playlist.title} width={"300"} height={"300"} />
          <div>
            <h1>{playlist.title}</h1>
            <h2>{playlist.sub}</h2>
            <div>
              <FlatButton onClick={handleSetTracks}>
                <IoPlay /> Play
              </FlatButton>
              <FlatButton onClick={handleSetRandomTracks}>
                <IoShuffle />
                Random
              </FlatButton>
              <FlatButton onClick={handleSetAddTracks}>
                <IoAdd />
                Add
              </FlatButton>
            </div>
          </div>
        </CurrentTrackContainer>
      )}
      {isLoading ? <Spinner /> : <TrackTable playlist={data} />}
    </PlaylistContainer>
  );
}
export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  return { props: { id } };
};
