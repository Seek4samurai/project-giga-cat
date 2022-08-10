import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "../styles/InGame.module.css";

const GameCanva = (userId) => {
  const [userAddress, setUserAddress] = useState();
  const router = useRouter();

  const handleHighScore = () => {
    // removing body class as to remove background gifs from game
    const bodyTag = document.querySelector("body");
    bodyTag?.classList.remove("InGame_body__b_fQc");
  };

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
        <h2 id="addressBar" className={style.address}>
          Deploying as {userAddress?.slice(0, 6)}...{userAddress?.slice(39)}
        </h2>
        <h3 className={style.legend}>
          <div>
            &quot; Legends say it gets 10x fun after 100 &quot; <br></br>
          </div>
          <sub style={{ fontWeight: "normal" }}> - Legends themself</sub>
        </h3>
        <div className={style.wrapper} id="menu">
          <div className={style.allthethings}>
            <div className={style.left}></div>
            <div className={style.single} id="single">
              <p>PLAY</p>
            </div>
            <Link
              target="_blank"
              href={{
                pathname: "/leaderboard",
                query: userAddress,
              }}
            >
              <div className={style.options}>
                <p onClick={handleHighScore}>High Score</p>
              </div>
            </Link>
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
