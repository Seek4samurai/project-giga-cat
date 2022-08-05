import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import style from "../styles/InGame.module.css";

const Game = () => {
  const { Moralis, isAuthenticated, authenticate, user } = useMoralis();
  const [userAddress, setUserAddress] = useState();
  const router = useRouter();

  const handleExitGame = () => {
    const bodyTag = document.querySelector("body");
    bodyTag.classList.remove(style.body);
    router.replace("/");
  };

  const handleSwitch = () => {
    Moralis.onAccountChanged(async (chain) => {
      console.log("Account changed to:", chain);
      setUserAddress(chain);
    });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    } else {
      const bodyTag = document.querySelector("body");
      bodyTag.classList.add(style.body);

      // Account switching
      handleSwitch();
      // Ethereum global object gives undefined error when page is refreshed
      setUserAddress(user?.get("ethAddress"));
      // setUserAddress(ethereum?.selectedAddress);
    }
  }, [user, isAuthenticated, router]);

  return (
    <>
      <Script src="./scripts/main.js" async></Script>
      <Script src="./scripts/bird.js" async></Script>
      <Script src="./scripts/particles.js" async></Script>
      <Script src="./scripts/obstacle.js" async></Script>
      <div>
        <h2>
          User {userAddress?.slice(0, 6)}...{userAddress?.slice(39)}
        </h2>
        <div className={style.wrapper} id="menu">
          <div className={style.allthethings}>
            <div className={style.left}></div>
            <div className={style.single} id="single">
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

export default Game;
