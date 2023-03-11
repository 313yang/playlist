import { msToMinutesAndSeconds } from "@/util/common/durationTime";
import axios from "axios";
import { toast } from "react-hot-toast";

const MAX_REQ_NUMBER = 1000;

const config = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const api = axios.create({ baseURL: "/api", timeout: 5000 });

export const getAccessToken = async () => {
  const { data } = await api.post(
    "token",
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

  const getReleaseList = (await api.get(`new-releases`, config(token))).data.albums.items;

  const result = getReleaseList.map((list: IPlaylistDefault) => ({
    image: list.images[0].url,
    title: list.name,
    sub: list.artists.map((artist) => artist.name).join(", "),
    id: list.id,
    type: list.type,
  }));
  return result;
};
export const getFeatured = async (offset: number) => {
  const token = await getAccessToken();

  const getReleaseList = (await api.get(`featured/${offset * 50}`, config(token))).data.playlists
    .items;

  const result = getReleaseList
    // .filter((track: IPlaylistDefault) => track.images.length > 0)
    .map((track: IPlaylistDefault) => ({
      title: track.name,
      image: track.images[0].url,
      id: track.id,
      sub: track.owner.display_name,
      type: track.type,
    }));
  return result;
};
export const searchTrackById = async (id: string, searchType: string) => {
  let result = [];
  try {
    const token = await getAccessToken();

    const { data } = await api.get(
      `${searchType}/${id}${searchType === "playlist" ? "/0" : ""}`,
      config(token)
    );

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
        const getTracks = (await api.get(`${searchType}/${id}/${i * 100}`, config(token))).data
          .items;
        totalArr.push(...getTracks);
      }

      result = totalArr
        .filter((list) => !!list.track && list.track.album.images.length > 0)
        .map((list: ITrackDefault, index: number) => ({
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
  } catch (err) {
    console.log(err);
    toast.error("Error: Fail to get track lists 😥");
    return result;
  }
};

export const searchPlaylistKeyword = async (keyword: string, offset: number) => {
  try {
    const token = await getAccessToken();

    const getPlaylist = (await api.get(`search/${keyword}/${offset * 50}`, config(token))).data
      .playlists.items;

    const result = getPlaylist
      .filter((track: IPlaylistDefault) => track.images.length > 0)
      .map((track: IPlaylistDefault) => ({
        title: track.name,
        image: track.images[0].url,
        id: track.id,
        sub: track.owner.display_name,
        type: track.type,
      }));

    return result;
  } catch (err) {
    console.log(err);
    toast.error("Error: Fail to get playlists 😥");
  }
};
