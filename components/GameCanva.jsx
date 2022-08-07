import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import style from "../styles/InGame.module.css";

const GameCanva = (userId) => {
  const { isAuthenticated, user, account } = useMoralis();
  const [userAddress, setUserAddress] = useState();
  const router = useRouter();

  const handleExitGame = () => {
    const bodyTag = document.querySelector("body");
    bodyTag?.classList.remove("InGame_body__b_fQc");

    router.replace("/");
  };

  // Authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    } else {
      // adding body class as to add background gifs for game
      const bodyTag = document.querySelector("body");
      bodyTag.classList.add(style.body);

      const showAccount = () => {
        setUserAddress(userId.userAddress[0]);
      };
      showAccount();
    }
  }, [user, isAuthenticated, router, account, userId.userAddress]);

  const handleScripts = () => {
    console.log("CLICK");
    return (
      <Head>
        <script src="./scripts/main.js" async></script>
        <script src="./scripts/bird.js" async></script>
        <script src="./scripts/particles.js" async></script>
        <script src="./scripts/obstacle.js" async></script>
      </Head>
    );
  };

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
            <div className={style.single} id="single" onClick={handleScripts}>
              <p>PLAY</p>
            </div>
            <div className={style.options}>
              <p>CHECK AUTH</p>
            </div>
            <div className={style.credits}>
              <p>CREDITS</p>
            </div>
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
