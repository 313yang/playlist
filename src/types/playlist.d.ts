interface IPlaylist {
  image: readonly string;
  id: readonly string;
  title: readonly string;
  sub: readonly string;
  type: string;
}

interface ITrack {
  image: readonly string;
  id: readonly string;
  title: readonly string;
  artist: readonly string;
  time: readonly string;
  album: readonly string;
  sort: number;
}
