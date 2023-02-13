import axios from "axios";

export const findVideo = async ({ title, artist }: { title: string; artist: string }) => {
  const query = `${artist} ${title} audio`;
  const { data } = await axios.get(`/api/video/${query}`);

  return data.split('{"videoRenderer":{"videoId":"')[1].split('"')[0]; // video id 추출
};
