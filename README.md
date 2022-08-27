# Nyan Cat Game

Nyan cat game is actually a music rhythm based game 🎶 I.e you start with a decent difficulty as the music in start is decent and it expect you to pass through it, after a few tries at least. 
Once you pass through the first phase of the game, you'll enter a Panic event phase, where it gets real exciting 🎸. Panic event can start anytime above the score of `50 pts`.

# Why this?
After participating in 4 previous Hackathons (actually winning non of them :P), I decided to do something really entertaining & crazy. So I came up with this idea to make a web game using [Redis](https://app.redislabs.com/) as a primary database. Thanks to [RedisOm](https://github.com/redis/redis-om-node) it got really easy to do this.
Easy to use thanks to the [Redis documentation](https://redis.io/docs/), it was a fun project to work on, and really think it's a Wacky Wildcard Project :P.

## Screenshots 📷 
![Demo-1](https://raw.githubusercontent.com/Seek4samurai/project-giga-cat/main/public/demo/Demo-1.png)
![Demo-2](https://raw.githubusercontent.com/Seek4samurai/project-giga-cat/main/public/demo/Demo-2.png)

## Check out these Demo clips of the game 🤯

<div style="display: grid; grid-template-columns: 240px 180px">
  <img src="https://github.com/Seek4samurai/project-giga-cat/blob/main/public/demo/img_1.gif" width="680" height="480"/>
  <img src="https://github.com/Seek4samurai/project-giga-cat/blob/main/public/demo/img_2.gif" width="680" height="480"/>
  <img src="https://github.com/Seek4samurai/project-giga-cat/blob/main/public/demo/img_3.gif" width="680" height="480"/>
  <img src="https://github.com/Seek4samurai/project-giga-cat/blob/main/public/demo/img_4.gif" width="680" height="480"/>
</div>

# Overview video 🎥

Here's a short video that explains the project and how it uses Redis:

[![YouTube video](https://i.ytimg.com/vi/5dCb1ebFYIs/maxresdefault.jpg)](https://www.youtube.com/watch?v=5dCb1ebFYIs)

## How it works 🤔
When it comes to working of this game, it comes down to a web application. Here I've created a Next app using `npx create-next-app`. Metamask wallet address for user Authentication, this app uses Next.js framework with Moralis SDK and Redis for querying & storing data into Redis cloud.
Here game is rendered using HTML5 canvas.

### How the data is stored: 🤔

In this application, I've something called [Redis-om](https://github.com/redis/redis-om-node) for Node.js.
Here data is stored in the form of JSON where following schema is created
```javascript
class Score extends Entity {}

const schema = new Schema(
  Score,
  {
    address: { type: "string" },
    score: { type: "number", sortable: true, textSearch: true },
  },
  { dataStructure: "JSON" }
);
```
```javascript
export const createScore = async (data) => {
  await connect();

  const repository = client?.fetchRepository(schema, client);

  const score = repository.createEntity();
  score.score = data.score;
  score.address = data.address;

  const id = await repository.save(score);

  const ttlInSeconds = 21600;
  await repository.expire(id, ttlInSeconds);

  await client.close();
  return id;
};
```
Notice I've also declared something as `const ttlInSeconds = 21600;` and then used it in `  await repository.expire(id, ttlInSeconds);` because we don't want to store any data longer than 6 hours. Yes, your scores will reset after 6 hours.
Once this is done, we can create an API route in our Next.js application.
```javascript
import { createScore } from "../../lib/redis";

export default async function handler(req, res) {
  const id = await createScore(req.body);
  res.status(200).json({ id });
}
```
Once we create it in our database, it will be stored in our database by giving data from our frontend, I've used javascript's `fetch` API for this purpose. You can [check this file](https://github.com/Seek4samurai/project-giga-cat/blob/main/lib/redis.js), where I've declared such logic.

### How the data is accessed: 🤔

Now if you've gone through the application, there is a section of leaderboard, where we have `scores` and `addresses` of players with highest pts.
To access our database and then fetch it from our Redis database, we have couple of ways like...

In our development phase, I've used `Redis Insight`, importing my database using `public endpoint` & `password`.

But in our application I've used `.env.local` file to store all API keys.
Once that is done, in our `redis.js` file we create a redis instance also called `Client()` like:
```javascript
import { Client } from "redis-om";

const client = new Client();

const connect = async () => {
  if (!client.isOpen()) {
    await client.open(process.env.NEXT_PUBLIC_REDIS_URL);
  }
};
```
Now once this is setup, we use `fetch` API to query for data.
```javascript
  const fetchScores = async () => {
    const res = await fetch("/api/search?" + query);
    const results = await res.json();
    return results["scores"];
  };
```
To do this, we also need to create an index using `await repository.createIndex();` and then we can create another API route to call this.
```javascript
import { createIndex } from "../../lib/redis";

export default async function handler(req, res) {
  await createIndex();
  res.status(200).send("Index is created");
}
```
Then we use a custom function `searchScore()` to get the data of top-3 players with highest scores, we used `RediSearch` for that purpose.
```javascript
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
```
This will get us the data we want. And we can get that data using API route as `search.js`
```javascript
import { searchScore } from "../../lib/redis";

export default async function handler(req, res) {
  const data = req.query;
  const query = Object.keys(data)[0];
  // console.log(query);

  const scores = await searchScore(query);
  res.status(200).json({ scores });
}
```
You can [check this file](https://github.com/Seek4samurai/project-giga-cat/blob/main/lib/redis.js), where I've declared such logic.

One more thing is that we are also displaying the top-3 players in the Home page of the Game. Let's dig it...
So we're doing something similar to what we did above I.e.
```javascript
const fetchScores = async () => {
    const res = await fetch("/api/search?" + query);
    const results = await res.json();
    return results["scores"];
};
```
Fetching score as an Object. Then in our separate `Marq.jsx` component we are using it as:
```javascript
{score[0]?.address?.slice(0, 9)}...{score[0]?.address?.slice(39)}
```

Refer to [Using RediSearch](https://github.com/redis/redis-om-node#-using-redisearch).

_Hope everything was clear, and if not consider checking the video. If still stuck on something feel free to contact me over my any of the social handle, I'll be happy to help you :)_

## How to run it locally? 💻

**Requirements** 📝
1. Node.js - Expected version ">=14.17.0". If you need help in installing on Linux like me [Check out](https://stackoverflow.com/questions/63312642/how-to-install-node-tar-xz-file-in-linux).
2. Yarn - 1.22.19 (I used).
3. Metamask installed on Browser - [Download here](https://metamask.io/)

**You'll need Metamask account to pass Authentication** 📝

![Demo-Image](https://raw.githubusercontent.com/Seek4samurai/project-giga-cat/main/public/demo/login.png)

Follow these steps to run on your device after `Cloning the repository` and `cd project-giga-cat` to enter the root project folder.

1. First things first, use `yarn install` to install all the dependencies.
2. In root directory of the repo, create a file `.env.local` and declare 3 env variables. But before that go to [Moralis.io](https://moralis.io/) & [Redis](https://app.redislabs.com/) and create a free account over both.
3. In Moralis dashboard, click on `Create new Dapp` and select the Environment `Testnet` and under testnets select `ETH Goerli` testnet. Select a region and give a cute name, finally proceed with it.
4. Now, create a subscription in your `Redis Cloud` and then create a database for yourself. Make sure to save their details.
5. In your `.env.local`, create 3 variables as: 
      `NEXT_PUBLIC_MORALIS_SERVER_URL`
      `NEXT_PUBLIC_MORALIS_APP_ID`
      `NEXT_PUBLIC_REDIS_URL`
and give them their values.
6. For Moralis, go to settings of your Dapp, and copy the `Dapp URL` for `SERVER_URL` & `Application ID` for `APP_ID`.
7. For Redis, go to your database and from `Security` section copy the `user password`, and also take the `public endpoint` from `General` section. Now paste them in the `.env.local` file, formatted as `NEXT_PUBLIC_REDIS_URL=redis://default:password@endpoint:port`. Note: port should be appended at the last of your `public endpoint`.
8. Now run `yarn run dev` to run the application.
9. Go to `http://localhost:3000/` and you'll see the `Connect Wallet` page.
10. Click on `Connect wallet` and for signing in, Metamask should've popped up. And you'll enter the dashboard.

If you've find any difficulty in this, Check my video! 🔥

**If you notice anything unusual try refreshing the page. If it doesn't fixes the behavior, please create a issue in Github :)**

## Deployment 🚀

Deployment is done using [Vercel](https://vercel.com/).

## Stuck? 🤔
Feel free to contact me through anywhere, LinkedIn, Gmail, or leave a create a Github issue.

## MIT

Each Soundtracks completely belongs to the respective artist & I don't own them at all.

Hope you liked the project ❤️
Made with ❤️ & Redis!
