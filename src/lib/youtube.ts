import axios from "axios";

export const findVideo = async (title: string, artist: string) => {
  const word = `${artist} ${title} audio`;
  const res = await axios.get(`https://www.youtube.com/results?search_query=${word}`);
  return res.data.split('{"videoRenderer":{"videoId":"')[1].split('"')[0];
};
