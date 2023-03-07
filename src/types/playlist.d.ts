interface IPlaylist {
  image: string;
  id: readonly string;
  title: string;
  sub: string;
  type: string;
}

interface ITrack {
  image: string;
  id: readonly string;
  title: string;
  artist: string;
  time: string;
  album: string;
  sort: number;
}
