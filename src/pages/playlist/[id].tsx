import Spinner from "@/components/common/Spinner";
import { searchTrackById } from "@/lib/spotify";
import { PlaylistContainer } from "@/styles/PlaylistStyle";
import Image from "next/image";
import { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";

export default function Playlist({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery(["playlist", id], () => searchTrackById(id));
  const [currentTrack, setCurrentTrack] = useState(0);
  console.log(currentTrack);
  useEffect(() => {
    console.log(data);
    if (data) setCurrentTrack(data[0]);
  }, [data]);
  return (
    <PlaylistContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <Image
          src={data[currentTrack].image}
          alt={data[currentTrack].title}
          width="300"
          height={"300"}
        />
      )}
    </PlaylistContainer>
  );
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  return { props: { id } };
};
