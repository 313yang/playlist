import { msToMinutesAndSeconds } from "@/util/common/durationTime";
import axios from "axios";

interface ITrackDefault {
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
    sub: list.artists.map((artist) => artist.name).join(", "),
    id: list.id,
    type: list.type,
  }));
  return result;
};

export const searchTrackById = async (id: string, searchType: string) => {
  const token = await getAccessToken();

  const { data } = await axios.get(`/api/${searchType}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let result;
  if (searchType === "album") {
    console.log(data.tracks.items);
    result = data.tracks.items.map((track: ITrackDefault) => ({
      title: track.name,
      id: data.id,
      image: data.images[0].url,
      artist: track.artists.map((artist: { name: string }) => artist.name).join(", "),
      time: msToMinutesAndSeconds(track?.duration_ms || 0),
      album: data.name,
      sort: track.track_number,
    }));
    console.log(result);
  } else {
    result = data.items.map(({ track }: { track: ITrackDefault }, index: number) => ({
      title: track.name,
      id: track.id,
      image: track.album.images[0].url,
      artist: track.artists.map((artist: { name: string }) => artist.name).join(", "),
      time: msToMinutesAndSeconds(track.duration_ms),
      album: track.album.name,
      sort: index,
    }));
  }
  return result;
};

export const searchPlaylistKeyword = async (keyword: string, offset: number) => {
  const token = await getAccessToken();

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
    type: track.type,
  }));

  return result;
};
