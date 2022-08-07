import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "../styles/InGame.module.css";

const GameCanva = (userId) => {
  const [userAddress, setUserAddress] = useState();
  const router = useRouter();

  const handleExitGame = () => {
    const bodyTag = document.querySelector("body");
    bodyTag?.classList.remove("InGame_body__b_fQc");

    router.replace("/");
  };

  useEffect(() => {
    // adding body class as to add background gifs for game
    const bodyTag = document.querySelector("body");
    bodyTag.classList.add(style.body);

    const showAccount = () => {
      setUserAddress(userId.userAddress[0]);
    };
    showAccount();
  }, [router, userId.userAddress]);

  return (
    <>
      <Script src="./scripts/main.js" async></Script>
      <Script src="./scripts/bird.js" async></Script>
      <Script src="./scripts/particles.js" async></Script>
      <Script src="./scripts/obstacle.js" async></Script>
      <div>
        <h2 id="addressBar">
          User {userAddress?.slice(0, 6)}...{userAddress?.slice(39)}
        </h2>
        <div className={style.wrapper} id="menu">
          <div className={style.allthethings}>
            <div className={style.left}></div>
            <div className={style.single} id="single">
              <p>PLAY</p>
            </div>
            <a target="_blank" href="/leaderboard" rel="noopener noreferrer">
              <div className={style.options}>
                <p>High Score</p>
              </div>
            </a>
            <a
              target="_blank"
              href="https://github.com/Seek4samurai/project-giga-cat"
              rel="noopener noreferrer"
            >
              <div className={style.credits}>
                <p>Support</p>
              </div>
            </a>
            <div className={style.right}></div>
            <div className={style.exit} onClick={handleExitGame}></div>
            <div className={style.circle}></div>
          </div>
        </div>
        <canvas className={style.canvas1} id="canvas1"></canvas>
      </div>
    </>
  );
};

export default GameCanva;
