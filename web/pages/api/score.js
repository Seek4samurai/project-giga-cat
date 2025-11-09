import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { name, score, address } = req.body;
      if (!name || typeof score !== "number") {
        return res.status(400).json({ error: "Invalid input" });
      }

      const memberKey = address || name;
      await redis.zadd("scores", { score, member: memberKey });

      return res.status(201).json({ message: "Score saved" });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
