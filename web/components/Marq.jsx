"use client";
import { useEffect, useState } from "react";
import style from "../styles/InGame.module.css";

const Marq = ({ userName }) => {
  const [score, setScore] = useState([]);

  const fetchScores = async (query) => {
    const res = await fetch("/api/search?" + query);
    const results = await res.json();
    return results["scores"];
  };

  useEffect(() => {
    const query = localStorage.getItem("userAddress");

    // getting score from redis
    fetchScores(query).then((data) => {
      setScore(data);
    });
  }, []);

  return (
    <div className={style.sliderContainer}>
      <h2>Top Players</h2>
      <div className={style.slider}>
        {score.length > 0 ? (
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
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Marq;
