import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import UserTile from "../components/UserTile";
import style from "../styles/InGame.module.css";

const Leaderboard = () => {
  const [score, setScore] = useState([]);
  const { isInitialized, isAuthenticated } = useMoralis();
  const router = useRouter();

  const data = router.query;
  const query = Object.keys(data)[0];

  const handleBack = () => {
    router.back();
  };

  const fetchScores = async () => {
    const res = await fetch("/api/search?" + query);
    const results = await res.json();
    return results["scores"];
  };

  useEffect(() => {
    // adding body class as to add background gifs for game
    const bodyTag = document.querySelector("body");
    bodyTag.classList.add(style.body);

    // getting score from redis
    fetchScores().then((data) => {
      setScore(data);
    });
  }, []);

  useEffect(() => {
    const isAuth = () => (!isAuthenticated ? router.push("/") : null);
    isInitialized && isAuth();
  }, [isInitialized, isAuthenticated]);

  return (
    <>
      <h2>leaderboard</h2>
      {score ? (
        score.map((data) => (
          <UserTile key={data.entityId} data={data}></UserTile>
        ))
      ) : (
        <div>Loading</div>
      )}
      <button onClick={handleBack}>Back</button>
    </>
  );
};

export default Leaderboard;
