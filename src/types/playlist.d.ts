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

type IPlaylistDefault = {
  name: string;
  id: string;
  type: string;
  album: {
    album: string;
    images: [{ url: string }];
    name: string;
  };
  artists: [{ name: string }];
  duration_ms: number;
  images: [{ url: string }];
  owner: {
    display_name: string;
  };
  track_number: string;
};
type ITrackDefault = {
  track: IPlaylistDefault;
  added_at: string;
};
