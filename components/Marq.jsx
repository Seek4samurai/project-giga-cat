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
      <div className={style.slider}>
        {score ? (
          <p>
            <li>
              <span style={{ color: "#ff4000" }}>
                {score[0]?.name
                  ? score[0]?.name
                  : `${score[0]?.address?.slice(
                      0,
                      9
                    )}...${score[0]?.address?.slice(39)}`}
              </span>{" "}
              made score of {score[0]?.score} pts.
            </li>
            <li>
              <span style={{ color: "#a51eae" }}>
                {score[1]?.name
                  ? score[1]?.name
                  : `${score[1]?.address?.slice(
                      0,
                      9
                    )}...${score[1]?.address?.slice(39)}`}
              </span>{" "}
              made score of {score[1]?.score} pts.
            </li>
            <li>
              <span style={{ color: "#9e0000" }}>
                {score[2]?.name
                  ? score[2]?.name
                  : `${score[2]?.address?.slice(
                      0,
                      9
                    )}...${score[2]?.address?.slice(39)}`}
              </span>{" "}
              made score of {score[2]?.score} pts.
            </li>
          </p>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Marq;
