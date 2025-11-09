"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserTile from "../components/UserTile";
import style from "../styles/Leaderboard.module.css";

const Leaderboard = () => {
  const [score, setScore] = useState([]);
  const router = useRouter();

  const data = router.query;
  const query = Object.keys(data)[0];
  const handleBack = () => {
    window.location.assign(`/game?${query}`);
  };

  const fetchScores = async () => {
    const res = await fetch("/api/search");
    const results = await res.json();
    return results["scores"];
  };

  useEffect(() => {
    // getting score from redis
    fetchScores().then((data) => {
      setScore(data);
    });
  }, []);

  return (
    <div className={style.body}>
      <div className={style.container}>
        <div className={style.Header}>
          <h2>Leaderboard</h2>
          <h1 className={style.Top}>Top 3 Players 👑</h1>
        </div>
        {score ? (
          <>
            {/* score.map((data, idx) => <UserTile key={idx} score={score}></UserTile>) */}
            <UserTile score={score}></UserTile>
          </>
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
