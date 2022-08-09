import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import UserTile from "../components/UserTile";
import style from "../styles/Leaderboard.module.css";

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
    <div className={style.body}>
      <div className={style.container}>
        <div className={style.Header}>
          <h2>Leaderboard</h2>
          <h1 className={style.Top}>Top 3 Players 👑</h1>
        </div>
        {score ? (
          score.map((data) => (
            <UserTile key={data.entityId} data={data}></UserTile>
          ))
        ) : (
          <div>Loading</div>
        )}
        <button onClick={handleBack} className={style.Btn}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
