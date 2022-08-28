import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "../styles/InGame.module.css";

const Marq = ({ userName }) => {
  const [score, setScore] = useState([]);

  const router = useRouter();
  const data = router.query;
  const query = Object.keys(data)[0];

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

  return (
    <div className={style.sliderContainer}>
      <h2>Top Players</h2>
      <marquee className={style.slider}>
        {score ? (
          <p>
            <span style={{ color: "#9e0000" }}>
              {score[0]?.name
                ? score[0]?.name
                : `${score[0]?.address?.slice(
                    0,
                    9
                  )}...${score[0]?.address?.slice(39)}`}
            </span>
            &nbsp; made score of {score[0]?.score} pts.
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: "#9e0000" }}>
              {score[1]?.name
                ? score[1]?.name
                : `${score[1]?.address?.slice(
                    0,
                    9
                  )}...${score[1]?.address?.slice(39)}`}
            </span>
            &nbsp; made score of {score[1]?.score} pts.
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: "#9e0000" }}>
              {score[2]?.name
                ? score[2]?.name
                : `${score[2]?.address?.slice(
                    0,
                    9
                  )}...${score[2]?.address?.slice(39)}`}
            </span>
            &nbsp; made score of {score[2]?.score} pts.
          </p>
        ) : (
          <div>Loading...</div>
        )}
      </marquee>
    </div>
  );
};

export default Marq;
