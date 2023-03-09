import KeywordContainer from "@/components/KeywordContainer";
import { searchPlaylistKeyword } from "@/lib/spotify";
import { PlaylistContainer } from "@/styles/PlaylistStyle";
import { memo, useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import useInfinitiScroll from "@/util/hooks/useInfinityScroll";
interface Props {
  type: { title: string; sub: string };
  keywords: string[];
}

const PlaylistComponent = ({ type, keywords }: Props) => {
  const [selected, setSelected] = useState(keywords[0]);
  const { FetchTrackListComponent } = useInfinitiScroll(selected, type.title);

  return (
    <PlaylistContainer>
      <h1>{type.title}</h1>
      <p>{type.sub}</p>
      <KeywordContainer keywords={keywords} selected={selected} handleSelect={setSelected} />
      {<FetchTrackListComponent />}
    </PlaylistContainer>
  );
};

export async function getServerSideProps(props: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([props.type.title, props.keywords[0]], () =>
    searchPlaylistKeyword(props.keywords[0], 0)
  );

  return { props: { ...props, dehydratedState: dehydrate(queryClient) } };
}
export default memo(PlaylistComponent);
