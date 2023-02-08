import { msToMinutesAndSeconds } from "@/util/common/durationTime";
import axios from "axios";

const API_URL = "https://api.spotify.com/v1/";

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
// export const getNewReleases = async () => {
//   const token = await getAccessToken();

//   const getReleaseList = (
//     await axios.get(`${API_URL}browse/new-releases`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//   ).data.albums.items;

//   const result = getReleaseList.map((list) => ({
//     image: list.images[0].url,
//     title: list.name,
//     sub: list.artists.map((artist) => artist.name).join(","),
//     id: list.id,
//   }));
//   return result;
// };
export const searchTrackById = async (id: string) => {
  const token = await getAccessToken();

  const { data } = await axios.get(`${API_URL}playlists/${id}/tracks?limit=100`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let totalSongs = data.items.map(({ track }) => ({
    title: track.name,
    id: track.id,
    image: track.album.images[0].url,
    sub: track.artists.map((artist: { name: string }) => artist.name).join(","),
    time: msToMinutesAndSeconds(track.duration_ms),
  }));

  return totalSongs;
};

export const searchPlaylistKeyword = async (keyword: string) => {
  const token = await getAccessToken();

  const getPlaylist = (
    await axios.get(`api/search/${keyword}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data.playlists.items;
  const result = getPlaylist.map((track) => ({
    title: track.name,
    image: track.images[0].url,
    id: track.id,
    artist: track.owner.display_name,
    album: track.album.name,
  }));

  return result;
};
