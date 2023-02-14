import Spinner from "@/components/common/Spinner";
import TrackTable from "@/components/TrackTable";
import { searchTrackById } from "@/lib/spotify";
import { FlatButton } from "@/styles/common/ButtonStyle";
import { CurrentTrackContainer } from "@/styles/CurrentTrack";
import { PlaylistContainer } from "@/styles/PlaylistStyle";
import Image from "next/image";
import { IoAdd, IoPlay, IoShuffle } from "react-icons/io5";
import { useQuery } from "react-query";
import { usePlaylist } from "@/util/store/usePlaylistStore";
import { useTrackActions, useTrack } from "@/util/store/useTrackStore";
import { shuffleArray } from "@/util/common/shuffleArray";

export default function Playlist({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery(["playlist", id], () => searchTrackById(id));
  const playlist = usePlaylist();
  const { tracks } = useTrack();
  const { handlePlayTracks, handleAddTracks } = useTrackActions();

  const handleSetTracks = () => {
    handlePlayTracks([...data]);
  };
  const handleSetRandomTracks = () => {
    handlePlayTracks(shuffleArray([...data]));
  };
  const handleSetAddTracks = () => {
    /* 기존 플레이리스트에 추가 & 트랙재생 그대로 , 플레이리스트 없는경우 다시 트랙 시작*/
    if (tracks.length > 0) handleAddTracks(data);
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
