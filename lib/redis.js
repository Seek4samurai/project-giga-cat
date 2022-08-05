import { Client, Entity, Repository, Schema } from "redis-om";

const client = new Client();

const connect = async () => {
  if (!client.isOpen()) {
    await client.open(process.env.NEXT_PUBLIC_REDIS_URL);
  }
};

class Score extends Entity {}

const schema = new Schema(Score, {
  name: { type: "string" },
  address: { type: "string" },
  score: { type: "string" },
});

export const createScore = async (data) => {
  await connect();

  const repository = client?.fetchRepository(schema, client);

  const score = repository.createEntity();
  score.name = "Unknown";
  score.score = data;

  const id = await repository.save(score);
  return id;
};
