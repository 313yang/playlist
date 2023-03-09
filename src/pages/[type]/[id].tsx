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
import { toast } from "react-hot-toast";
import TrackTableSkeleton from "@/components/skeleton/TrackTableThumbnail";

export default function Playlist({ id, type }: { id: string; type: string }) {
  const { data, isLoading, error } = useQuery([type, id], () => searchTrackById(id, type));
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
  if (error) toast.error(`Error : ${error}`);

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
      {isLoading ? <TrackTableSkeleton /> : <TrackTable playlist={data} />}
    </PlaylistContainer>
  );
}
export const getServerSideProps = async ({
  params: { id, type },
}: {
  params: { id: string; type: string };
}) => {
  console.log(type, id);
  return { props: { id, type } };
};
