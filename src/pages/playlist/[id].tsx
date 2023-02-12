import Spinner from "@/components/common/Spinner";
import TrackTable from "@/components/TrackTable";
import { searchTrackById } from "@/lib/spotify";
import { FlatButton } from "@/styles/common/ButtonStyle";
import { CurrentTrackContainer } from "@/styles/CurrentTrack";
import { PlaylistContainer } from "@/styles/PlaylistStyle";
import { useSelectPlaylist, useSetTrack } from "@/util/store/useStore";
import Image from "next/image";
import { IoPlay, IoShuffle } from "react-icons/io5";
import { useEffect } from "react";
import { useQuery } from "react-query";

export default function Playlist({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery(["playlist", id], () => searchTrackById(id));
  const { playlist } = useSelectPlaylist();
  const { setTracks } = useSetTrack();

  useEffect(() => {
    !!data && setTracks(data);
  }, [data]);

  return (
    <PlaylistContainer>
      <CurrentTrackContainer>
        <Image
          src={playlist?.image || ""}
          alt={playlist?.title || ""}
          width={"300"}
          height={"300"}
        />
        <div>
          <h1>{playlist?.title}</h1>
          <h2>{playlist?.sub}</h2>
          <div>
            <FlatButton>
              <IoPlay /> Play
            </FlatButton>
            <FlatButton>
              <IoShuffle />
              Random
            </FlatButton>
          </div>
        </div>
      </CurrentTrackContainer>
      {isLoading ? <Spinner /> : <TrackTable playlist={data} />}
    </PlaylistContainer>
  );
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  return { props: { id } };
};
