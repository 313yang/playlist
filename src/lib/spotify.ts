import { msToMinutesAndSeconds } from "@/util/common/durationTime";
import axios from "axios";

interface ITrackDefault {
  name: string;
  id: string;
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
}
export const getAccessToken = async () => {
  const { data } = await axios.post(
    "/api/token",
    {
      grant_type: "client_credentials",
    },
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return data.access_token;
};
export const getNewReleases = async () => {
  const token = await getAccessToken();

  const getReleaseList = (
    await axios.get(`/api/new-releases`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data.albums.items;

  const result = getReleaseList.map((list: ITrackDefault) => ({
    image: list.images[0].url,
    title: list.name,
    sub: list.artists.map((artist) => artist.name).join(","),
    id: list.id,
  }));
  return result;
};

export const searchTrackById = async (id: string) => {
  const token = await getAccessToken();

  const { data } = await axios.get(`/api/track/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let totalSongs = data.items.map(({ track }: { track: ITrackDefault }, index: number) => ({
    title: track.name,
    id: track.id,
    image: track.album.images[0].url,
    artist: track.artists.map((artist: { name: string }) => artist.name).join(","),
    time: msToMinutesAndSeconds(track.duration_ms),
    album: track.album.name,
    sort: index,
  }));
  return totalSongs;
};

export const searchPlaylistKeyword = async (keyword: string, offset: number) => {
  const token = await getAccessToken();
  console.log(offset, "offset");
  const getPlaylist = (
    await axios.get(`/api/search/${keyword}/${offset * 50}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data.playlists.items;

  const result = getPlaylist.map((track: ITrackDefault) => ({
    title: track.name,
    image: track.images[0].url,
    id: track.id,
    sub: track.owner.display_name,
  }));

  return result;
};
