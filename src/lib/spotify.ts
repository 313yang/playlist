import { msToMinutesAndSeconds } from "@/util/common/durationTime";
import axios from "axios";

const MAX_REQ_NUMBER = 1000;

const config = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
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

  const getReleaseList = (await axios.get(`/api/new-releases`, config(token))).data.albums.items;

  const result = getReleaseList.map((list: IPlaylistDefault) => ({
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

  const { data } = await axios.get(`/api/${searchType}/${id}/0`, config(token));
  let result = [];

  if (searchType === "album") {
    result = data.tracks.items.map((track: IPlaylistDefault) => ({
      title: track.name,
      id: data.id,
      image: data.images[0].url,
      artist: track.artists.map((artist: { name: string }) => artist.name).join(", "),
      time: msToMinutesAndSeconds(track?.duration_ms || 0),
      album: data.name,
      sort: track.track_number,
    }));
  } else {
    const total = data.total > MAX_REQ_NUMBER ? MAX_REQ_NUMBER : data.total;
    const totalArr = [...data.items];

    for (let i = 1; i < total / 100; i++) {
      const getTracks = (await axios.get(`/api/${searchType}/${id}/${i * 100}`, config(token))).data
        .items;
      totalArr.push(...getTracks);
    }

    result = totalArr.map((list: ITrackDefault, index: number) => ({
      title: list.track.name,
      id: list.track.id + list.added_at + index,
      image: list.track.album.images[0].url,
      artist: list.track.artists.map((artist: { name: string }) => artist.name).join(", "),
      time: msToMinutesAndSeconds(list.track.duration_ms),
      album: list.track.album.name,
      sort: index,
    }));
  }
  return result;
};

export const searchPlaylistKeyword = async (keyword: string, offset: number) => {
  const token = await getAccessToken();

  const getPlaylist = (await axios.get(`/api/search/${keyword}/${offset * 50}`, config(token))).data
    .playlists.items;

  const result = getPlaylist.map((track: IPlaylistDefault) => ({
    title: track.name,
    image: track.images[0].url,
    id: track.id,
    sub: track.owner.display_name,
    type: track.type,
  }));

  return result;
};
