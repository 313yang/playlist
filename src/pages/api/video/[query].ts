// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { query } = req;
    const { data } = await axios.get(`https://www.youtube.com/results?search_query=${query.query}`);

    const videoId = data.split('{"videoRenderer":{"videoId":"')[1].split('"')[0];
    return res.status(200).json(videoId);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ name: err?.toString() || "" });
  }
}
