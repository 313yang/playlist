import axios from "axios";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1/";

export const getAccessToken = async () => {
  const { data } = await axios.post(
    TOKEN_URL,
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
    await axios.get(`${API_URL}browse/new-releases`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data.albums.items;

  const result = getReleaseList.map((list) => ({
    image: list.images[0].url,
    title: list.name,
    sub: list.artists.map((artist) => artist.name).join(","),
    id: list.id,
  }));
  return result;
};
export const searchTrackById = async (id: string) => {
  const token = await getAccessToken();

  let { total } = (
    await axios.get(`${API_URL}playlists/${id}/tracks?limit=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
  let totalSongs = [];
  for (let i = 0; i < total / 100; i++) {
    let getSongs = (
      await axios.get(`${API_URL}playlists/${id}/tracks?offset=${i * 100}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data.items;
    let songs = await Promise.all(
      getSongs.map(async (ele) => {
        const { track } = ele;
        track && track.album.images.length !== 0
          ? totalSongs.push({
              title: track.name,
              album: {
                title: track.album.name,
                image: track.album.images[0].url,
              },
              artists: track.artists[0].name,
              // id : (await findVideo(`${track.artists[0].name} ${track.name}audio`))
            })
          : false;
      })
    );
  }
  return totalSongs;
};

export const searchPlaylistKeyword = async (keyword: string) => {
  const token = await getAccessToken();

  const getPlaylist = (
    await axios.get(`${API_URL}search?q=${keyword}&type=playlist&limit=50&offset=${0 * 50}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data.playlists.items;
  const result = getPlaylist.map((ele) => {
    return {
      title: ele.name,
      image: ele.images[0].url,
      id: ele.id,
      sub: ele.owner.display_name,
    };
  });

  return result;
};
