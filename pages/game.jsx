import Script from "next/script";
import { useEffect } from "react";
import style from "../styles/InGame.module.css";

const Game = () => {
  useEffect(() => {
    const bodyTag = document.querySelector("body");
    bodyTag.classList.add(style.body);
  }, []);

  return (
    <>
      <Script src="./scripts/main.js" async></Script>
      <Script src="./scripts/bird.js" async></Script>
      <Script src="./scripts/particles.js" async></Script>
      <Script src="./scripts/obstacle.js" async></Script>
      <div>
        <div className={style.wrapper} id="menu">
          <div className={style.allthethings}>
            <div className={style.left}></div>
            <div className={style.single} id="single">
              <p>PLAY</p>
            </div>
            <div className={style.options}>
              <p>OPTIONS</p>
            </div>
            <div className={style.credits}>
              <p>CREDITS</p>
            </div>
            <div className={style.right}></div>
            <div className={style.exit}></div>
            <div className={style.circle}></div>
          </div>
        </div>
        <canvas className={style.canvas1} id="canvas1"></canvas>
      </div>
    </>
  );
};

export default Game;
