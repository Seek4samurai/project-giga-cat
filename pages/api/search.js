import { searchScore } from "../../lib/redis";

export default async function handler(req, res) {
  const data = req.query;
  const query = Object.keys(data)[0];
  // console.log(query);

  const scores = await searchScore(query);
  res.status(200).json({ scores });
}
