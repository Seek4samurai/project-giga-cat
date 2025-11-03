import { createScore } from "../../lib/redis";

export default async function handler(req, res) {
  // console.log(req.body);
  const id = await createScore(req.body);
  res.status(200).json({ id });
}
