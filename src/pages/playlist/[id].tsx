import Spinner from "@/components/common/Spinner";
import { searchTrackById } from "@/lib/spotify";
import { PlaylistContainer } from "@/styles/PlaylistStyle";
import { useSelectPlaylist } from "@/util/store/useStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";

export default function Playlist({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery(["playlist", id], () => searchTrackById(id));
  const [currentTrack, setCurrentTrack] = useState(0);
  const { playlist } = useSelectPlaylist();

  console.log(playlist);

  return (
    <PlaylistContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div>
            <Image src={playlist.image} alt={playlist.title} width="200" height={"200"} />
          </div>
          <Image
            src={data[currentTrack]?.image}
            alt={data[currentTrack]?.title}
            width="50"
            height={"50"}
          />
        </div>
      )}
    </PlaylistContainer>
  );
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  return { props: { id } };
};
