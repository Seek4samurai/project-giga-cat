import { Client, Entity, Repository, Schema } from "redis-om";

const client = new Client();

const connect = async () => {
  if (!client.isOpen()) {
    await client.open(process.env.NEXT_PUBLIC_REDIS_URL);
  }
};

class Score extends Entity {}

const schema = new Schema(
  Score,
  {
    name: { type: "string" },
    address: { type: "string" },
    score: { type: "number", sortable: true, textSearch: true },
  },
  { dataStructure: "JSON" }
);

export const createScore = async (data) => {
  await connect();

  const repository = client?.fetchRepository(schema, client);

  const score = repository.createEntity();
  score.name = data.name;
  score.score = data.score;
  score.address = data.address;

  const id = await repository.save(score);

  const ttlInSeconds = 21600;
  await repository.expire(id, ttlInSeconds);

  await client.close();
  return id;
};

export const createIndex = async () => {
  await connect();

  const repository = client.fetchRepository(schema, client);

  await repository.createIndex();
  await client.close();
};
createIndex();

export const searchScore = async () => {
  await connect();

  const repository = client.fetchRepository(schema, client);

  const offset = 0;

  const count = 3;

  const scores = await repository
    .search()
    .sortDesc("score")
    .return.page(offset, count);

  return scores;
};
