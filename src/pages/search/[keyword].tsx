import { PlaylistContainer } from "@/styles/PlaylistStyle";
import useInfinitiScroll from "@/util/hooks/useInfinityScroll";

export default function SearchKeyword({ keyword }: { keyword: string }) {
  const { FetchTrackListComponent } = useInfinitiScroll(keyword);

  return <PlaylistContainer>{<FetchTrackListComponent />}</PlaylistContainer>;
}

export const getServerSideProps = ({ params: { keyword } }: { params: { keyword: string } }) => {
  return { props: { keyword } };
};
